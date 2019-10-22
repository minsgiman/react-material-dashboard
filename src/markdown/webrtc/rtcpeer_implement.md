# WebRTC Peer 구현
 
***

.

#### 1. WebRTC Peer API

 - WebRTC는 표준화된 프로토콜과 Javascript API를 통해서, 3rd party 플러그인을 사용하지 않고 브라우저를 통해 peer간의 audio, video, data를 통신할 수 있게 해준다.
 - 브라우저는 WebRTC를 지원하기 위해 다음의 주요 API들을 제공한다. 
 
 
        * getUserMedia : local audio와 video stream을 가져온다.
        * MediaStream : audio와 video stream을 객체화 한다.
        * MediaStreamTrack : MediaStream을 구성하는 각각의 track.
        * RTCPeerConnection : peer-to-peer연결과 audio와 video data의 통신을 지원.
        * RTCDataChannel : application data 통신을 지원.
      
.

#### 2. getUserMedia API

- getUserMedia를 통해서 application에서 필요한 audio와 video stream을 가져올 수 있다. (constraints를 통해 필요한 stream을 제한 또는 설정할 수 있다.)


        <video autoplay></video> 
        
        <script>
          var constraints = {
            audio: true, 
            video: { 
              mandatory: {  
                width: { min: 320 },
                height: { min: 180 }
              },
              optional: [  
                { width: { max: 1280 }},
                { frameRate: 30 },
                { facingMode: "user" }
              ]
            }
          }
        
          navigator.getUserMedia(constraints, gotStream, logError);  
        
          function gotStream(stream) { 
            var video = document.querySelector('video');
            video.src = window.URL.createObjectURL(stream);
          }
        
          function logError(error) { ... }
        </script>


.

#### 3. RTCPeerConnection API

- **RTCPeerConnection API**는 peer-to-peer 연결의 전체 life cycle을 담당하는 API이다.

![object](./../images/develop/RTCPeerConnection.png "object")

- **Session Description Protocol (SDP)** 을 통해, peer간의 교환할 미디어타입(video, audio, app data), 코덱정보, bandwidth정보, 그밖의 메타데이터 등을 교환한다. 

- SDP는 signalling 채널을 통해 offer, answer 로 peer간에 교환한다. (전송하는 SDP는 setLocalDescription, 전달받는 SDP는 setRemoteDescription 으로 설정한다.)

- SDP 교환후에 RTCPeerConnection의 **ICE agent**는 peer 간의 연결과 연결상태 관리를 담당한다.

    1) ICE agent는 os에 local IP 주소들을 물어봐서 candidate에 추가한다.
    
    2) ICE agent는 STUN 서버로부터 peer의 public IP, port를 물어봐서 candidate에 추가한다.
    
    3) ICE agent는 TURN서버를 last candidate로 추가하고, peer간의 직접 연결이 실패할 경우 TURN 서버를 통해 data가 relay된다.
        
- offer, answer, candidate 을 교환하는 signalling 과정이 끝나면 **ICE agent**를 통해 peer-to-peer 연결이 이루어지고, peer간의 통신을 시작한다.
        
        
        /**** Caller Code ****/
        <video id="local_video" autoplay></video> 
        <video id="remote_video" autoplay></video> 
        
        <script>
          var ice = {"iceServers": [
            {"url": "stun:stunserver.com:12345"},
            {"url": "turn:turnserver.com", "username": "user", "credential": "pass"}
          ]};
        
          var signalingChannel = new SignalingChannel(); 
          var pc = new RTCPeerConnection(ice); 
        
          navigator.getUserMedia({ "audio": true, "video": true }, gotStream, logError); 
        
          function gotStream(evt) {
            pc.addStream(evt.stream); 
        
            var local_video = document.getElementById('local_video');
            local_video.src = window.URL.createObjectURL(evt.stream); 
        
            pc.createOffer(function(offer) { 
              pc.setLocalDescription(offer);
              signalingChannel.send(offer.sdp);
            });
          }
        
          pc.onicecandidate = function(evt) { 
            if (evt.candidate) {
              signalingChannel.send(evt.candidate);
            }
          }
        
          signalingChannel.onmessage = function(msg) { 
            if (msg.answer) {
              pc.setRemoteDescription(msg.answer);
            } else if (msg.candidate) {
              pc.addIceCandidate(msg.candidate);
            }
          }
        
          pc.onaddstream = function (evt) { 
            var remote_video = document.getElementById('remote_video');
            remote_video.src = window.URL.createObjectURL(evt.stream);
          }
          
          pc.oniceconnectionstatechange = function(evt) { 
            logStatus("ICE connection state change: " + evt.target.iceConnectionState);
          }
        
          function logError() { ... }
        </script>



        /**** Callee Code ****/
        <video id="local_video" autoplay></video>
        <video id="remote_video" autoplay></video>
        
        <script>
          var signalingChannel = new SignalingChannel();
        
          var pc = null;
          var ice = {"iceServers": [
            {"url": "stun:stunserver.com:12345"},
            {"url": "turn:turnserver.com", "username": "user", "credential": "pass"}
          ]};
        
          signalingChannel.onmessage = function(msg) {
            if (msg.offer) { 
              pc = new RTCPeerConnection(ice);
              pc.setRemoteDescription(msg.offer);
        
              pc.onicecandidate = function(evt) {
                if (evt.candidate) {
                  signalingChannel.send(evt.candidate);
                }
              }
        
              pc.onaddstream = function (evt) {
                var remote_video = document.getElementById('remote_video');
                remote_video.src = window.URL.createObjectURL(evt.stream);
              }
        
              navigator.getUserMedia({ "audio": true, "video": true },
                gotStream, logError);
        
            } else if (msg.candidate) { 
              pc.addIceCandidate(msg.candidate);
            }
          }
        
          function gotStream(evt) {
            pc.addStream(evt.stream);
        
            var local_video = document.getElementById('local_video');
            local_video.src = window.URL.createObjectURL(evt.stream);
        
            pc.createAnswer(function(answer) { 
              pc.setLocalDescription(answer);
              signalingChannel.send(answer.sdp);
            });
          }
        
          function logError() { ... }
        </script>

.

***

### 참조

 - WebRTC browser APIS and Protocols
 
  <https://hpbn.co/webrtc/>

 - WebRTC in the real world
 
  <https://www.html5rocks.com/ko/tutorials/webrtc/infrastructure/>

