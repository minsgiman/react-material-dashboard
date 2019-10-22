# TURN/STUN Server 설정
 
***

.

#### 1. TURN/STUN Server란?

 - STUN Server는 peer들이 NAT 환경 안에 있어서 서로의 네트워크 주소를 알 수 없을 때, 외부 네트워크 주소를 얻는 데 사용되는 서버이다. 
 
 - TURN Server는 STUN server로부터 외부 네트워크 주소를 얻는 것까지 실패하였을 때, 중간에서 webRTC 트래픽을 중계해주는 역할을 한다.

 - TURN/STUN Server 오픈소스는 centOS 7 환경 위에서 coturn 4.5.0.6을 사용하였고, turnserver.conf 파일을 통해 설정한다. (기본경로: /usr/local/etc/turnserver.conf)

.

#### 2. TURN 서버 프로토콜 설정 

 - 클라이언트가 TURN 서버와 연결할때 wireshark로 통신 내용을 볼 수 있다. 데이터 중 TURN credential password가 SHA1으로 암호화되기는 하지만, ID를 포함한 다른정보들이 노출되기 때문에 안전하지 않다.

 - TCP, UDP 프로토콜 뿐 아니라 TURN서버는 보안성을 위해, TCP위에서 동작하는 TLS와 UDP위에서 동작하는 DTLS 프로토콜을 지원한다.
 
 - TLS와 DTLS 프로토콜을 사용하기 위해서 클라이언트, 서버 양쪽에서 명시적 설정이 필요하다.
 
 - 클라이언트 설정 
 
   1) TCP 또는 UDP 사용시 RTCPeerConnection의 iceServers 설정을 "turn:" 으로 설정한다.
 
 
        RTCPeerConnectionConfig: {
            iceServers: [
                {"url": "stun:stun.l.google.com:19302"},
                {"url": "turn:xxx.xxx.com:10088?transport=udp", "username": "test", "credential": "test"},
                {"url": "turn:xxx.xxx.com:10088?transport=tcp", "username": "test", "credential": "test"}
            ]
        }
    
   2) TLS 또는 DTLS 사용시 RTCPeerConnection의 iceServers 설정을 "turns:" 로 설정한다.
     
     
        RTCPeerConnectionConfig: {
            iceServers: [
                {"url": "stun:stun.l.google.com:19302"},
                {"url": "turns:xxx.xxx.com:10088?transport=udp", "username": "test", "credential": "test"},
                {"url": "turns:xxx.xxx.com:10088?transport=tcp", "username": "test", "credential": "test"}
            ]
        }
 
 - 서버 설정
 
    1) **no-tcp, no-udp, no-tls, no-dtls** option 들로 TCP, UDP, TLS, DTLS Client Listener 를 각각 비활성화 할 수 있다. (default는 모두 활성화)
    
    2) **listening-port** 로 UDP, TCP Listener port를 설정하고 (default는 3478) **tls-listening-port** 로 TLS, DTLS Listener port를 설정 할 수 있다. (defualt는 5349)

    3) TLS, DTLS 를 사용시, **cert, pkey** 옵션에 인증서 경로를 설정해주고, **pkey-pwd**에 인증서 key 패스워드를 설정한다. (ex: cert=/usr/local/etc/cert.pem, pkey=/usr/local/etc/key.pem, pkey-pwd=1234)
    
    
 - 여기서의 프로토콜 설정은 TURN서버와 연결에 사용되는 것이고, TURN서버를 통한 peer들 사이의 오디오/비디오/데이터 스트리밍 relay는 이와는 다른 방법으로 암호화된다. 
    
.

#### 2. IP 설정

 - **listening-ip** 로 TURN서버 Client Listener IP address를 설정한다. 공인 IP로 설정 한다. (ex: listening-ip=172.17.19.101)
 
 - **relay-ip** 로 패킷 relay에 사용할 IP address를 설정한다. **listening-ip**와 동일하게 설정해도 된다. (ex: relay-ip=172.17.19.101)
 
. 
 
#### 3. Long-term Credential mechanism 설정

 - 아무 client나 TURN서버에 접속하지 않도록 Long-term Credential mechanism 설정을 하여, ID/PW를 검사한다.
 
 - **lt-cred-mech**로 long-term credential mechanism 을 활성화한다.
 
 - **user**로 long-term credential에 ID/PW를 등록한다. (ex: user=username1:password1)
 
 - **realm**을 통하여 ID/PW가 관리될 realm을 설정한다. (ex: realm=mycompany.org)
 
 - 설정 이후 turnadmin을 통하여 ID/PW를 관리할 수 있다. (기본적으로 ID/PW는 SQLite에 저장된다.)
 
.

#### 4. 그 외 설정들 (대부분 default로 사용했다..)

 - **relay-threads**는 relay thread 개수를 설정한다. 0으로 설정하면, single thread. 따로 설정하지 않으면 OS default 알고리즘으로 설정된다.
 
 - **verbose**는 TURN 서버를 'normal' 'moderate' verbose mode로 동작하게 한다.
 
 - **no-auth**는 아무 client나 TURN서버에 접속하도록 lt-cred-mech를 비활성화한다.
 
 - **no-tlsv1, no-tlsv1_1, no-tlsv1_2**는 허용하지 않을 TLS 프로토콜 버전을 설정한다.
 
 - **stun-only**는 TURN은 사용하지 않고, STUN만 사용하도록 설정한다.
 
 - **no-stun**은 STURN은 사용하지 않고, TURN만 사용하도록 설정한다.
 
 - **max-bps**은 TURN session이 허용할 Max bps bandwidth를 설정한다.
 
 - **log-file**은 TURN서버 로그파일 경로를 설정한다. 기본적으로 파일은 하루단위로 rotation된다. (ex: log-file=/home/xxx/coturn_logs/coturn)

.

***

### 참조

 - Coturn Wiki
 
  <https://github.com/coturn/coturn/wiki/turnserver>

