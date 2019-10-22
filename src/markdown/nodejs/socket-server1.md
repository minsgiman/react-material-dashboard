# Socket 서버 구현 1 (Master & Worker Cluster 관리)
 
***

#### 1. pm2 를 통한 Master & Worker Process 생성

 - exec_mode는 cluster로 설정한다. cluster모드로 설정하면, cluster 모듈을 사용하여 워커를 생성하였을 때처럼 서버의 포트를 공유하고, Round Robin 방식으로 로드밸런싱을 pm2에서 관리 해준다.
 - out_file과 error_file을 /dev/null 로 설정하여 자동 로깅을 diable한다.
 

        pm2.start( {
            "name" : "Master",
            "script" : "master.js",
            "args" : ["master"],
            "exec_mode" : 'cluster',
            "instances" : 1,
            "out_file": "/dev/null",
            "error_file": "/dev/null"
        }, function (err, app) {
            if (err) {
                console.log('master start error!');
                return;
            }
            var i, len = 20, workerId;
        
            for (i = 0; i < len; i += 1) {
                workerId = "" + (i + 1);
                pm2.start({
                    "name": "Worker",
                    "script": "worker.js",
                    "args": [workerId],
                    "exec_mode" : 'cluster',
                    "instances" : 1,
                    "out_file": "/dev/null",
                    "error_file": "/dev/null"
                }, function (err, app) {
                });
            }
        });

.        
        
#### 2. Master & Worker 간의 Communication

 - IPC(Inter Process Communication)로 process간에 통신이 가능하다.
 - pm2.list를 통해 pm2에서 관리하는 master process와 자신(worker process)의 pm_id를 찾는다. (pm2를 통한 IPC에 사용)
 - pm2.sendDataToProcessId를 통해 process끼리 통신을 한다.
 - Worker가 Master에 Message를 보낼 때 해당 메시지에 대한 hashKey를 생성하고, hashKey를 Key로 가지는 콜백을 캐시해놓는다. 이후 Master로부터 응답이 왔을때 hashKey를 통해 해당 메시지에 대한 콜백을 찾아서 실행한다.
 
 
        var getPID = function (callback) {
              pm2.list(function(err, list) {
                  var i, len = list.length;
        
                  for (i = 0; i < len; i+=1) {
                      if (list[i].name === 'Master') {
                          masterPID = list[i].pm2_env.pm_id;
                      } else if (process.pid === list[i].pid) {
                          processPID = list[i].pm2_env.pm_id;
                          processNumber = list[i].pm2_env.args[0];
                      }
                  }
        
                  if (masterPID === null || processPID === null) {
                      callback(new Error('Fail to Get masterPID or processPID'), null);
                  } else {
                      callback(null);
                  }
              });
        };
          
        pm2.sendDataToProcessId(masterPID, {
                type : 'process:msg',
                data : {
                  processId : processPID,
                  msgKey : keyValue,
                  type : message.type,
                  data : message.data
                },
                topic : 'message'
              },
              function(err, res) {
                if (err) {
                  var regex = /unknown/g;
                  if (regex.exec(err)) {
                      setTimeout(function() {
                          process.exit(0);
                      }, 3000);
                  } else {
                      targetCallback = replyMessageCallbackList[keyValue];
                      if (targetCallback) {
                        targetCallback('error');
                      }
                      delete replyMessageCallbackList[keyValue];
                      callback(new Error('Message Send Error'), null);
                  }
                } else {
                  callback(null);
                }
              }
        );

.
 
#### 3. Mater 또는 Worker 가 죽는 경우 처리

 - Master 또는 Worker Process가 죽는 경우, pm2에 의해 재실행된다.
 - Master가 죽는경우, Worker들은 Master에게 메시지를 보내는데 실패한다. 실패하면, Worker도 스스로 Process를 죽이고 재시작한다.
 - Worker가 죽어서 다시 재실행될때, Master에게 'restart' 메시지를 보낸다. Master는 'restart' 메시지를 받으면 Master에서 관리하는 해당 Worker Process의 Data를 초기화한다.