# Redis Cluster 서버 이전 프로세스
 
***

#### 1. 새로운 Redis서버 실행 및 Cluster에 추가

.
 
 - 1) 새로운 Redis를 실행한다. 마스터와 슬레이브 모두 실행시킨다. (**redis-server redis.conf**)
 
.
 
 - 2) Redis가 실행된 것을 확인한다. (**ps –ef | grep redis**)
  
  
          xxx  2918    1  0 Jun29 ?  07:24:20 /usr/local/bin/redis-server xx.xxx.xx.xx:10000 [cluster]
          xxx  29694   1  0 Jun12 ?  06:03:01 /usr/local/bin/redis-server xx.xxx.xx.xx:10001 [cluster]

.

 - 3) 새로 실행시킨 Redis를 기존의 Cluster에 추가한다. (새로 실행시킨 Redis master, slave 연결이 서버끼리 서로 교차되도록 추가한다.)
 
      (1) Master추가 : **./redis-trib.rb add-node “새로운마스터IP:Port” “기존마스터IP:Port”**
      
      (2) Slave추가 : **./redis-trib.rb add-node --slave --master-id “연결할마스터ID” "새로운슬레이브IP:Port" “기존마스터IP:Port”**

.

 - 4) Cluster에 master(3개), slave(3개)가 추가되었는지 확인한다. (**redis-cli -h “서버IP” -p “서버Port” -c cluster nodes**)
 
 
          12ff8f59819a xx.xxx.xx.27:10000 master - 0 1513662526246 30 connected 0
          34ef6f85a9ae xx.xxx.xx.28:10000 master - 0 1513662525244 36 connected 0
          124d5c93e2d8 xx.xxx.xx.28:10001 slave 12ff8f59819a 0 1513662526746 30 connected
          56491c39daff xx.xxx.xx.29:10000 master - 0 0 34 connected 0
          3412fd99e36c xx.xxx.xx.29:10001 slave 34ef6f85a9ae 0 1513662525745 36 connected
          560ddf5739c8c xx.xxx.xx.27:10001 slave 56491c39daff 0 1513662527248 34 connected

.

.

#### 2. 새로 추가된 Redis로 슬롯 및 연동서버 이동.

.

 - 1) 새로 추가된 Redis master 3개에 기존의 슬롯을 일부 할당한다. (1000개씩)
 
    (1) 슬롯분배 : **./redis-trib.rb reshard “기존마스터IP:Port”  ->  이후 커맨드에서 slot은 1000, receiving node ID, Source node ID를 입력해준다.**

.
 
 - 2) NodeJS 테스트 페이지를 만들어서 새로 추가된 Redis의 ip, port로 매핑했을 때 get, set, pub/sub동작등에 이상이 없는지 체크한다.
 
. 
 
 - 3) Redis를 사용하는 다른 서버들도 새로 추가된 redis의 ip, port로 매핑하고, 재시작시킨다.

.

 - 4) 기존 Redis master들의 슬롯을 모두 새로 추가된 Redis master들로 옮긴다. (1번과 동일 작업)
 
. 
 
 - 5) Redis Cluster에서 총 16384개의 슬롯이 모두 이동된 것을 확인한다. (**redis-cli -h “서버IP” -p “서버Port” -c cluster nodes**)
 
 
        12ff8f59819a xx.xxx.xx.27:10000 master - 0 1513662526246 30 connected 10923-16383
        34ef6f85a9ae xx.xxx.xx.28:10000 master - 0 1513662525244 36 connected 5461-10922
        56491c39daff xx.xxx.xx.29:10000 master - 0 0 34 connected 0-5460
    
.

.

#### 3. 기존 Redis노드 제거

.

 - 1) 기존 Redis 노드를 Cluster에서 제거하고, 내린다. 
    
    (1) Cluster에서 Redis노드 제거 : **./redis-trib.rb del-node "새로운마스터IP:Port" "제거할마스터노드ID”**
    
    (2) RedisCluster확인 : **redis-cli -h “서버IP” -p “서버Port” -c cluster nodes**
  
