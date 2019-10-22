# Socket 서버 구현 4 (Redis Client)
 
***

#### 1. Redis 사용

 - Redis는 NoSQL 데이타 베이스의 한 종류로, mongoDB 처럼 전체 데이타를 영구히 저장하기 보다는 캐쉬처럼 휘발성이나 임시성 데이타를 저장하는데 많이 사용된다.
 - 디스크에 데이타를 주기적으로 저장하기는 하지만, 이 기능은 백업이나 복구용으로 주로 사용할뿐 데이타는 모두 메모리에 저장되며, Key/value 방식으로 빠른 접근 속도를 자랑한다.
 - 구현한 소켓 서버는 Cluster로 구성하고, L4 를 통해 로드밸런싱을 하였다. 그래서 Cluster 서버 전체로 메시지를 broadcast 하기 위하여, Redis Publish/Subscribe를 사용하였다.
 - 세션과 같은 휘발성 정보와 일부 캐시가 필요한 데이터들의 저장소로 사용하였다.
 
.

#### 2. ioredis 모듈

 - redis는 node.js 호환모듈이 잘 지원되어서 사용하기 편하다. ioredis 모듈을 사용하였다.
 - 아래 예제와 같이 Cluster로 구성된 Redis 서버의 client를 간단하게 생성할 수 있다.
 - redis에서는 pattern matching을 통해서 다수의 Topic에서 message 를 subscribe할 수 있다. (예제 코드 'ch:*')
 - redis커맨드 사용방법은 아래 redis공식 홈페이지에서 확인한다. <https://redis.io/commands>
 
            
            var redis = require("ioredis");
            
            /** Redis Cluster Client 생성 코드 **/
            var pClient = new redis.Cluster([
                {
                    port: constants.REDIS_MASTER1_PORT,
                    host: constants.REDIS_MASTER1_IP
                },
                {
                    port: constants.REDIS_MASTER2_PORT,
                    host: constants.REDIS_MASTER2_IP
                },
                {
                    port: constants.REDIS_MASTER3_PORT,
                    host: constants.REDIS_MASTER3_IP
                }
            ]);
            
            /** Redis Subscribe 코드 **/
            pClient.psubscribe('ch:*', function (err, count) {
            });
            pClient.on('pmessage', subscribeListener);
            
            function subscribeListener (pattern, channel, message) {
                ...
            }
            
            /** Redis Publish코드 **/
            pClient.publish('ch:message', messageJSON);

            /** Redis get,set,hget,expire 등의 Redis 커맨드 사용코드 **/
            pClient.hget('config', value, function (err, reply) {
                ...
            });
            
            pClient.get("key", function (err, reply) {
                ...           
            });

.

#### 3. Master의 Redis subscribe 및 Worker로 전달

 - redis client는 실행시킨 모든 프로세스에서 생성하지 않고, Master Process 한곳에서만 생성한다.
 - Master가 subscribe 메시지를 받으면 메시지의 내용을 보고, 어떤 Worker 프로세스에서 필요한 메시지인지 확인하고, 해당 Worker로 IPC통신으로 subscribe 메시지를 보내도록 구현하였다.

