# Socket 서버 구현 5 (Zookeeper Client, Kafka Producer)
 
***

#### 1. Zookeeper Client 사용

 - Zookeeper 서버로부터 연동서버들의 IP주소, Port, 상태정보를 읽어오는 목적으로 사용하였다.
 - Zookeeper 서버에 현재서버의 IP주소, Port, 상태정보를 업데이트 하는 목적으로 사용하였다.

.

#### 2. Zookeeper Client 구현

 - node-zookeeper-client 모듈을 사용하였다.
 - Zookeeper Client를 통해 Zookeeper에서 트리형태로 관리하고 있는 노드 데이터를 읽어오고, 업데이트한다. (zclient.exists, zclient.setData, zclient.getChildren)
 
 
        var zooKeeper = require ("node-zookeeper-client");
        
        this.zookeeperClientInit = function () {
              var that = this;
              zclient = zooKeeper.createClient('' + constants.ZOOKEEPER_URL, { sessionTimeout: 10000, spinDelay : 1000, retries : 10000 });
        
              zclient.once('expired', function () {
                that.zookeeperClientInit();
              });
        
              zclient.once('connected', function () {
                isInit = true;
                var sInfo = '' + constants.MY_SERVER_IP + ':' + constants.MY_SERVER_PORT;
                var sData = '{cpu:20}';
                var sPath = '/status/MyServer/' + sInfo;
                zclient.exists(sPath, function (error, stat) {
                  if (error) {
                    logger.errorLog(' ZooKeeper Init - ' + error.stack);
                    return;
                  }
                  if (stat) {
                    zclient.setData(sPath, new Buffer(sData), function (error, stat) {
                      if (error) {
                        console.log(error.stack);
                        logger.errorLog(' ZooKeeper Init - ' + error.stack);
                        return;
                      }
                    });
                    getServerInfo('/status/Was');
                  } else {
                    zclient.create(sPath, new Buffer(sData), zooKeeper.CreateMode.EPHEMERAL, function (error, path) {
                      if (error) {
                        logger.errorLog(' ZooKeeper Init - Failed to create node (' + path + '), error (' + error + ')');
                        return;
                      } else {
                        logger.debugLog(' ZooKeeper Init - node (' + path + ') is successfully created, set data (' + sData + ')');
                        getServerInfo('/status/Was');
                      }
                    });
                  }
                });
              });
              zclient.connect();
        };
            
            
        function getServerInfo (path){
          zclient.getChildren(
            path,
            null,
            function (error, children, stat) {
              if (error) {
                return;
              }
              var serverList = children;
            }
          );
        }
 
.

#### 3. Kafka Producer

 - Kafka Producer API를 사용해 Kafka Broker에 메시지를 보낸다.
 - node-rdkafka 모듈을 사용하였다. 메시지를 모아서 배치로 전송가능하다.
 - producer.produce(topic, partition, msg, key, timestamp, opaque) 로 메시지를 전송한다.
 
 
        var kafka = require('node-rdkafka');
 
        producer = new kafka.Producer({
                'client.id': 'my_server',
                'metadata.broker.list': constants.KAFKA_BROKER_LIST,
                "broker.version.fallback" : "0.8.2",
                //'compression.codec': 'gzip',
                'retry.backoff.ms': 200,
                'message.send.max.retries': 10,
                'socket.keepalive.enable': true,
                'queue.buffering.max.messages': 100000,
                'queue.buffering.max.ms': 1000,
                'batch.num.messages': 1000000,
                'statistics.interval.ms' : 1000,
                'dr_msg_cb': true,
                'event_cb' : true
            },
            {
                'request.required.acks': 1,
                'produce.offset.report': true
            });

        producer.setPollInterval(100);

        producer.on('event.stats', function(stats) {
            var message = JSON.parse(stats.message), currentTime;
            if (message) {
                currentTime = new Date().getTime();
                if (currentTime > (lastLogTime + 20 * 1000)) {
                    lastLogTime = currentTime;
                    logger.debugLog(" Kafka(qsize) : " + message.msg_cnt);
                }
            } else {
                logger.debugLog(" Kafka(qsize) : message parse error");
            }
        });
        
        producer.on('event.log', function (log) {
            logger.debugLog(" Kafka(I) : " + JSON.stringify(log));
        });
        
        producer.on('event.error', function (err) {
            logger.debugLog(" Kafka(ERR1) : " + err);
        });
        
        producer.on('delivery-report', function (err, report) {
            if (err)
                logger.debugLog(" Kafka(ERR2) : " + err);
        });

        producer.connect();

        producer.on('ready', function () {
            connected = true;
            logger.debugLog(' complete to initiate Kafka ' + producer.isConnected());
        });
        
        this.sendData = function (topic, partition, data, callback) {
            if(connected == true) {
                var msg = JSON.stringify(data);
                try {
                    var res = producer.produce(topic, partition, new Buffer(msg), null, Date.now());
                    if (res == true) {
                        logger.debugLog(" Kafka(S) : topic(" + topic + ") msg(" + msg + ")");
                        callback(0);
                    } else {
                        logger.debugLog(" Kafka(S) Fail: " + msg);
                        callback(1);
                    }
                } catch (err) {
                    logger.debugLog(" Kafka(ERR3) : " + err);
                    callback(1);
                }
            } else {
                logger.debugLog(" Kafka not connected!");
                callback(1);
            }
        };

.