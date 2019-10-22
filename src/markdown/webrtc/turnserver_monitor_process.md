# TURN Server monitor Process 구현
 
***

.

#### 1. TURN Server monitor Process의 역할

 - TURN credential id, pw가 외부로 노출될 경우를 대비해, turnadmin을 직접 호출하여 TURN credential id, pw를 주기적으로 갱신해준다.
 
 - REST서버를 내부적으로 실행하여 client의 TURN credential id, pw 요청을 처리한다. (Get turncredential API 제공) 
 
 - Zookeeper에 TURN서버 정보와 물리적 서버의 트래픽 정보를 업데이트한다. (분산처리)

 - TURN 서버를 child process로 실행시키고, TURN 서버가 죽는 경우 재실행 시켜준다. (자신이 죽는 경우는 pm2에 의해서 재실행된다.)

.

#### 2. TURN credential id, pw 관리 구현

 - turadmin을 통한 TURN credential id, pw 의 주기적인 갱신 및 Get turncredential API 제공 


        function addUserByTurnAdmin(userId, password, callback) {
            exec("sudo turnadmin -a -b " + constants.TURN_DB_PATH + " -u " + userId + " -r " + constants.TURN_REALM + " -p " + password, function (error, stdout, stderr) {
                if (error !== null) {
                    logger.errorLog('exec turnadmin add/update user error: ' + error);
                    callback(-1);
                } else {
                    logger.debugLog('turnadmin add/update id : ' + userId + ', realm : ' + constants.TURN_REALM + ', password : ' + password + ', db_path : ' + constants.TURN_DB_PATH);
                    callback(0);
                }
            });
        }
        
        function removeUserByTurnAdmin(userId, callback) {
            exec("sudo turnadmin -d -u " + userId + " -r " + constants.TURN_REALM, function (error, stdout, stderr) {
                if (error !== null) {
                    logger.errorLog('exec turnadmin add/update user error: ' + error);
                    callback(-1);
                } else {
                    logger.debugLog('turnadmin delete id : ' + userId + ', realm : ' + constants.TURN_REALM);
                    callback(0);
                }
            });
        }
        
        expressApp.route('/turncredential').get(function (req, res, next) {
            var userid = '', password = '', expired_time = 0, credentialJSON = turncredential.getActiveCredential();
        
            if (credentialJSON) {
                userid = credentialJSON.userid;
                password = credentialJSON.password;
                expired_time = credentialJSON.expired_time;
            }
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write("{ \"type\" : \"result\", \"code\" : \"ok\", \"userid\" : " + '\"' + userid + '\"' + ", \"password\" : " + '\"' + password + '\"' + ", \"expired_time\" : " + expired_time + " }");
            res.end();
        });

.

#### 3. Zookeeper에 TURN서버 정보와 서버트래픽 정보 업데이트 구현

 - Signalling 서버에서는 Zookeeper를 통해 TURN서버 리스트를 불러오고, 이 중 여유 트래픽이 있는 서버를 라운드로빈 방식으로 Client에 할당한다. 


        /* 트래픽 계산 */
        var checkTraffic = function (callback) {
            exec("cat /sys/class/net/bond0/statistics/rx_bytes", function (error, stdout, stderr) {
                var rxbyte = stdout;
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                logger.debugLog('Get rxbyte : ' + rxbyte);
                callback(rxbyte);
            });
        };
        
        checkTraffic(function(rxbyte) {
            var freeTraffic;
            if (!prevRxByte) {
                rxBytePer10Sec = 0;
            } else {
                rxBytePer10Sec = rxbyte - prevRxByte;
            }
            prevRxByte = rxbyte;
            freeTraffic = ((constants.MAX_TRAFFIC_BPS - ((rxBytePer10Sec * 8) / 10)) / 1000000).toFixed(1);  //calc freetraffic by Mbps
            sData = '{\"freeTraffic\":' +  freeTraffic + ', \"restAddr\":' + '\"' + constants.TURN_MONITOR_SERVER_IP + ':' + constants.TURN_MONITOR_SERVER_PORT + '\"' + '}';
            
            /* ZooKeeper에 업데이트 */
            if (stat) {
                zclient.setData(sPath, new Buffer(sData), function (error, stat) {
                    if (error) {
                        logger.errorLog(' ZooKeeper sendSummary - '+ error.stack);
                        return;
                    }
                    logger.debugLog(' ZooKeeper SendSumary - node ('+sPath+'), data ('+sData+') set');
                });
            } else {
                zclient.create(sPath, new Buffer(sData), zooKeeper.CreateMode.EPHEMERAL, function (error, path) {
                    if (error) {
                        logger.debugLog(' ZooKeeper SendSummary - failed to create node ('+path+'), due to ('+error+')');
                        return;
                    } else {
                        logger.debugLog(' ZooKeeper SendSummary - node('+path+') is successfully created. Data is set ('+sData+')');
                    }
                });
            }
        });

.

#### 4. TURN서버를 child process로 실행, TURN서버가 죽는 경우 재실행 구현

 - TURN 서버를 child process로 실행시키고, child process가 죽는 경우 3초후에 다시 실행시킨다.
 
 - monitor process 자신이 죽는 경우, Zookeeper에서 해당 TURN server정보를 빼고, child turn process도 죽인후에 shutdown된다. 이 후 monitor process는 pm2에 의해 다시 살아난다.
 

        function start() {
            global.turnProcess = child_process.spawn('turnserver');
        
            global.turnProcess.stdout.on('data', function(data) {
                //logging.debugLog(data.toString());
            });
        
            global.turnProcess.stderr.on('data', function(data) {
                //logging.debugLog(data.toString());
            });
        
            global.turnProcess.on('exit', function (code) {
                logging.debugLog('child process exited with code ' + code);
                setTimeout(start, 3000);
            });
        }
        
        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
        
        var gracefulShutdown = function () {
            logging.debugLog('gracefulShutdown !!');
            zookeeper.removeNode(function(code) {
                var credentialJSON = turncredential.getActiveCredential();
                var currentTime = new Date().getTime();
                if (credentialJSON && credentialJSON.userid && credentialJSON.password && credentialJSON.expired_time > currentTime) {
                    var writeData = "{\"userid\" : " + '\"' + credentialJSON.userid + '\"' + ", \"password\" : " + '\"' + credentialJSON.password + '\"' + ", \"expired_time\" : " + credentialJSON.expired_time + "}";
                    fs.writeFile("./credential", writeData, function (error) {
                        if (global.turnProcess) {
                            global.turnProcess.kill();
                        }
                        process.exit();
                    });
                } else {
                    if (global.turnProcess) {
                        global.turnProcess.kill();
                    }
                    process.exit();
                }
            });
        };