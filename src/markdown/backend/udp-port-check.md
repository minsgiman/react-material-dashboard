# netcat을 사용한 udp 포트 연결 체크 (centos)
 
***

### 1. netcat

 - netcat은 TCP, UDP 프로토콜을 사용하는 네트워크 연결에서 데이터를 읽고 쓰는 간단한 유틸리티이다.
 
 - cat이 파일을 읽듯이 netcat은 network connection 즉 네트워크 연결상태를 읽거나 쓸때 사용된다.

.

### 2. netcat을 사용하여 udp 포트가 열려있는지 체크하는 방법 (centos)

 - 1) client와 server 양쪽에 netcat을 설치한다. : **yum install nc**
 
 - 2) server에서 listen 모드로 nc를 띄우고, UDP연결을 사용하도록 한다. : **nc -ul 6111**
 
 - 3) client에서 server로 연결한다. : **nc -u <server> 6111**
 
 - 4) client에서 아무글자나 입력하고 enter를 누르고, server에서 입력한 글자를 전달받았는지 확인한다.
 
