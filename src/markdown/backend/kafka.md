# 분산 메시징 시스템 Kafka
 
***
.

#### kafka의 특징

 - 대용량의 실시간 로그처리에 특화되어 설계된 메시징 시스템으로써 기존 범용 메시징 시스템대비 TPS가 매우 우수하다.
  
  - 분산 시스템을 기본으로 설계되어 기존 메시징 시스템에 비해 분산 및 복제 구성을 손쉽게 할 수 있다.
  
  - Producer가 broker에게 다수의 메시지를 전송할 때 각 메시지를 개별적으로 전송하는 기존 메시징시스템과 달리, 다수의 메시지를 batch형태로 broker에게 한 번에 전달할 수 있어 TCP/IP 라운드트립 횟수를 줄일 수 있다.
  
  - 메시지를 기본적으로 메모리에 저장하는 기존 메시징 시스템과 달리 메시지를 파일 시스템에 저장한다. 따라서 메시지를 많이 쌓아두어도 성능이 크게 감소하지 않는다.
  
  - 기존 메시징 시스템은 broker가 consumer에게 메시지를 push해주는 방식인데, Kafka는 consumer가 broker로부터 직접 메시지를 가지고 가는 pull 방식으로 동작. 따라서 broker의 consumer와 메시지 관리에 대한 부담이 경과되었다.

.  

#### kafka의 기본 구성 요소와 동작 

 - Kafka는 publish-subscribe 모델을 기반으로 동작하며, 크게 producer, consumer, broker 로 구성된다.
 
 - Kafka의 broker는 topic을 기준으로 메시지를 관리한다. Broker가 전달받은 메시지를 topic별로 분류하여 쌓아놓으면, 해당 topic을 구독하는 consumer들이 메시지를 가져가서 처리하게 된다.
  
.
   
#### Topic

 - Topic은 메시지의 논리적 그룹. 카프카에 저장되는 데이터를 토픽이라는 이름으로 구분하기 위해서 사용합니다.
 
. 
 
#### Partition

 - Kafka Topic의 병렬처리 단위 
 
 - partition 분할을 통해 데이터 용량의 확장과 병렬처리의 잇점을 얻을 수 있다.
 
. 
 
#### Partition의 복제

 - Kafka에서는 고가용성을 위하여 각 partition을 복제하여 클러스터에 분산시킬 수 있다.
 
 - topic의 replication factor를 3으로 설정할 경우, 각 partition들은 3개의 replica를 가지며 각 replica는 P0-R0, P0-R1, P0-R2 과 같이 표시되어 각각의 broker에 들어간다.
 
 - Replication factor를 N으로 설정할 경우 N개의 replica는 1개의 leader와 N-1개의 follower로 구성된다.
 
 - 각 partition에 대한 읽기와 쓰기는 모두 leader에서 이루어지며, follower는 단순히 leader를 복제하고, 만약 leader에 장애가 발생할 경우 follower중 하나가 새로운 leader가 된다. 
 

.

#### Cluster 

 - Kafka는 확장성과 고가용성을 위하여 broker들이 클러스터로 구성되어 동작하도록 설계됨. 심지어 broker가 1개 밖에 없을 때에도 클러스터로써 동작
 
 - 클러스터 내의 broker에 대한 분산처리는 ZooKeeper가 담당
 
. 
 
#### 파일 시스템을 활용한 고성능 디자인

 - 하드디스크의 순차적 읽기 성능은 메모리에 대한 랜덤 읽기 성능보다 뛰어나며 메모리의 순차적 읽기 성능보다 7배정도 느리다.
 
 - Kafka의 메시지는 하드디스크로부터 순차적으로 읽혀지기 때문에 하드디스크의 랜덤 읽기 성능에 대한 단점을 보완함과 동시에 OS 페이지 캐시를 효과적으로 활용한다.
 
  