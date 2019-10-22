# tcpdump 사용
 
***

### 1. tcpdump란?

 - tcpdump는 주어진 조건 식을 만족하는 네트워크 인터페이스를 거치는 패킷들의 헤더들을 출력해주는 프로그램이다.
 
.
 
### 2. tcpdump 옵션

 - -i device : 어느 인터페이스를 경유하는 패킷들을 잡을지 지정한다. 지정되지 않으면 시스템의 인터페이스 리스트를 뒤져서 가장 낮은 번호를 가진 인터페이스를 선택한다. (이 때 loopback은 제외된다.) 
 
 - dst host HOST : packet의 IP destination 항목이 HOST일 때 참이 된다.
 
 - src host HOST : packet의 IP source 항목이 HOST일 때 참이 된다.
 
 - host HOST : IP source, IP destination 항목 중 어느 하나라도 HOST이면 참이다.
 
 - dst port PORT : 패킷이 ip/tcp, ip/udp 프로토콜의 패킷이고, destination port의 값이 PORT일 때 참이다.
 
 - src port PORT : 패킷의 source port의 값으로 PORT를 가지면 참이다.
 
 - port PORT : 패킷의 source, destination port 중에 하나라도 PORT이면 참이다.
 
 - -w : 캡쳐한 패킷들을 분석해서 출력하는 대신에 그대로 파일에 저장한다.

.
 
### 3. 사용 예 
 
     sudo tcpdump -i eth0 dst port 10020
     
     sudo tcpdump -i eth1 dst port 10020
     
     sudo tcpdump -i eth1 -w dump dst port 10020
     
     ls -l
    
     scp ./dump xxx.xxx.com:~/    
     
     //패킷 저장된 dump 파일은 wireShark를 통해 분석한다.