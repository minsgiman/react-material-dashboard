# Signaling Server 구현
 
***

.

#### 1. 시그널링이란?

 - WebRTC를 시작하기 위해서는 Peer(Caller, Callee)간의 네트워크, 코덱 등등의 메타데이터를 교환하는 과정이 필요. 이를 시그널링(Signalling)이라 함. 


.

#### 2. 시그널링 프로토콜 구현 

 - caller가 먼저 callee에게 "webrtc_request" 메시지를 보내, webRTC가 가능한 상태인지 물어본다. (코드)
 
 - offer SDP, answer SDP 를 주고받는다. (코드, 이 안에 어떤 정보?)
 
 - candidate를 주고받는다. (코드, 이 안에 어떤 정보?)
 
 - iceframework 에 의한 연결 성공 
 
  