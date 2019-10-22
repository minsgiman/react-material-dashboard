couchbase 구조

vBucket과 노드 구조

노드의 상세 구조

데이터 쓰기와 복제 

Sharding (Data를 분산하여 관리 - partition)

What is sharding?
샤딩이란 단일의 논리적 데이터셋을 다수의 데이터베이스에 쪼개고 나누는 방법. 
이렇게 쪼갬으로써 데이터베이스 시스템의 클러스터에서 큰 데이터셋을 저장하고 추가적인 요청을 처리할 수 있다. 샤딩이란 데이터셋이 단일 데이터베이스에서 저장하기에 너무 클때 필수적이다. 게다가, 많은 샤딩 전략들이 추가적인 머신들이 붙을 수 있도록 만든다. 샤딩은 데이터베이스 클러스터가 디비의 데이터와 트래픽 증가와 함께 스케일을 확장할 수 있게 한다.

카우치베이스는 실제데이타와 물리서버간의 맵핑을 vBucket이라는 것을 이용해서 관리한다. 
카우치베이스에서 vBucket은 데이터 샤딩의 단위
structure for organizing data in the Couchbase Sever; these structures are called vBuckets, an abbreviation for ‘virtual buckets.’ vBuckets are roughly functional equivalents of database shards for traditional relational databases. 


Rebalance

Couchbase 가 기본적으로 Sharding 을 지원하기 때문에 장비가 늘어나면 늘어날수록 문서(Document)가 각 서버에 분산 배치되어 처리되기 때문에 서버가 늘어날수록 요청이 서버수만큼 분산되어 전체 처리량을 늘릴 수 있게 되기 때문입니다.


http://bcho.tistory.com/934?category=534534

http://kingbbode.tistory.com/29

