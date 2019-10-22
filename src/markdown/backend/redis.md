# Redis 사용 이점
 
***

#### 1. 메모리를 사용하면서 데이터를 보존한다.
 
 - 1) Redis는 "REmote DIctionary System"의 약자로 메모리 기반의 Key/Value Store 이다. 모든 데이타는 메모리에 저장되고, 이로 인하여 매우 빠른 write/read 속도를 보장한다.
 
 - 2) 스냅샷(기억장치) 기능을 제공하여 메모리의 내용을 *.rdb 파일로 저장하여 해당 시점으로 복구할 수 있다.
  
 - 3) 커맨드로 삭제하거나, expire를 설정하지 않으면 데이터를 삭제하지 않는다.
 
 - 4) 여러 프로세스에서 동시에 같은 key에 대한 갱신을 요청할 경우, 데이터 Atomic처리 함수를 제공.

.

#### 2. 리스트, 배열 형식의 데이터 처리에 특화됨.

 - 1) redis가 Key/Value Store이기는 하지만 저장되는 Value가 단순한 Object가 아니라 자료구조를 갖기 때문에 Memcached와 큰 차이를 보인다.
 
 - 2) Value가 일반적인 string 뿐만 아니라, set,list,hash와 같은 집합형 데이타 구조를 지원한다.

 - 3) 리스트형 데이터의 입력과 삭제가 MySQL에 비하여 10배정도 빠르다.
 
.

#### 3. Pub/Sub Model 지원

 - 1) redis는 메세징에도 활용할 수 있는데, 1:1 형태의 Queue 뿐만 아니라 1:N 형태의 Publish/Subscribe 메세징도 지원한다.(Publish/Subscribe 구조에서 사용되는 Queue를 일반적으로 Topic이라고 한다.)

 - 2) redis에서는 pattern matching을 통해서 다수의 Topic에서 message 를 subscribe할 수도 있다. (ex. Subscribe Ch:*)

.

#### 4. Master/Slave replication

 - 1) Master/Slave Replication이란, redis의 master node에 write된 내용을 복제를 통해서 slave node에 복제 하는 것을 정의한다.

 - 2) 이 master/slave 간의 복제는 Non-blocking 상태로 이루어진다. 즉 master node에서 write나 query 연산을 하고 있을 때도 background로 slave node에 데이타를 복사하고 있다는 이야기고, 이는 master/slave node간의 데이타 불일치성을 유발할 수 있다는 이야기이기도 하다.

 - 3) Redis Sentinel은 마스터와 슬레이브를 감시하고 있다가 마스터가 다운되면 이를 감지해서 관리자의 개입없이 자동으로 슬레이브를 마스터로 승격시켜준다.

.

#### 5. Redis Cluster 지원

 - 1) Redis 3.0.0 버전 이상부터 지원하여, 데이터를 여러 노드에 자동으로 분배해준다.
 
 - 2) 레디스 서버는 마스터 또는 클론(슬레이브)이다. 한 마스터 다운 시 다른 마스터들이 장애조치(failover)를 진행한다. 따라서 레디스 클러스터에서는 별도의 센티널이 필요하지 않다.

 - 3) 노드 추가, 삭제 시 레디스 클러스터 전체를 중지할 필요 없고, 키 이동 시에만 해당 키에 대해서만 잠시 멈출 수 있다.

***

### 참조

 - Redis Documentation
 
  <https://redis.io/documentation>

