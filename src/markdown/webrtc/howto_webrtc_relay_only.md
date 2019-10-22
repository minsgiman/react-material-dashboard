# WebRTC relay로만 동작하도록 변경하기
 
***

.

#### 1. WebRTC relay로만 동작하도록 변경하는 이유

 - 기본적으로 candidate들을 통한 p2p 직접연결 시도를 먼저 시도해보고 실패하였을 때, TURN서버를 통한 relay 통신을 하게된다.
 
 - 이 때 직접 연결이 실패하게 되면, 앞에서 연결시도를 여러 번 하였으므로 relay를 통한 webRTC 연결성공까지 시간이 오래 걸린다.
 
 - 그래서 모든 경우에 대해 연결시간을 줄이기 위해서 아예 처음부터 바로 relay 연결시도만 하도록 수정할 수 있다.
 
. 
 
#### 2. ice Transport Policy 수정

 - peerConnectionConfig에서 iceTransportPolicy: 'relay' 를 추가한다.
 
 
        configValue = {
            peerConnectionConfig: {
                iceServers: [
                    // {"url": "stun:23.21.150.121"},
                    // {"url": "stun:stun.l.google.com:19302"},
                ],
                iceTransportPolicy: 'relay'
            },
            peerConnectionConstraints: {
                optional: [
                    {"DtlsSrtpKeyAgreement": true}
                ]
            }
        },

 - peerConnectionConfig 의 iceServers 설정에서 STUN 서버는 모두 빼고 TURN 서버만 넣는다.
 
 
        configValue.peerConnectionConfig.iceServers = [];
        var i, len;
        if (message.stunserver) {
            // for (i = 0, len = message.stunserver.length; i < len; i+=1) {
            //     configValue.peerConnectionConfig.iceServers.push(message.stunserver[i]);
            // }
        }
        if (message.turnserver) {
            for (i = 0, len = message.turnserver.length; i < len; i+=1) {
                configValue.peerConnectionConfig.iceServers.push(message.turnserver[i]);
            }
        } 