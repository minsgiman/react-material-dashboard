# Socket 서버 구현 2 (Socket Server 실행 및 Socket Router 구현)
 
***

#### 1. https서버 생성

 - https, express 모듈을 사용하여 https서버를 만든다. 
 - key, cert, passphrase option 으로 인증서 설정을 해준다. 
 

        var expressApp = express();
        expressApp.set('views', path.join(__dirname, 'views'));
        expressApp.set('view engine', 'ejs');
        expressApp.use(bodyParser.urlencoded({ extended: false }));
        expressApp.use(bodyParser.json());
        expressApp.use(express.static(path.join(__dirname, 'public')));
        
        var options = {
            key: fs.readFileSync(constants.SSL_KEY),
            cert: fs.readFileSync(constants.SSL_CERT),
            passphrase: constants.SSL_PASSWD,
            requestCert: true
        };
        
        var httpsServer = https.createServer(options, expressApp)
                            .listen(constants.SERVER_PORT, function () {});

.        
        
#### 2. socket.io 서버 생성

 - socket.io 모듈을 사용하여 https서버를 socket.io 서버로 upgrade한다.
 - pingTimeout, pingInterval을 통해 heartbeat timeout과 interval을 설정한다.
 
    (server와 client는 주기적으로 발생하는 heartbeat을 통해 커넥션이 유지되고 있는지 체크하며 연결을 유지한다. heartbeat timeout 시간동안 heartbeat이 들어오지 않으면 연결을 끊는다.) 
 
 
        // upgrade https server to socket.io server
        io = require('socket.io').listen(httpsServer, {
            'pingTimeout': (constants.PING_TIMEOUT) * 1000,
            'pingInterval': (constants.PING_INTERVAL) * 1000
        });

.
 
#### 3. socketWildcard를 사용한 Socket Router 구현

 - socketWildcard를 사용하면, socket 메시지 이벤트 처리에서 wildcard를 사용할 수 있다. -> socket.on('*', ...)
 - 'disconnect', 'heartbeat' 이벤트는 wildcard 로 들어오지 않고, socket 메시지 이벤트만 wildcard로 들어온다.
 - socketMsgRouter 모듈을 만들어서 socket connection시 전달받는 socket을 router로 보낸다. 
 - router 모듈에서 전달받은 socket에 wildcard 이벤트 핸들러를 설정한다.
 - wildcard 이벤트 핸들러에서 발생하는 event명을 보고, 해당 event를 처리하는 controller로 메시지를 보낸다.
 
 
        //worker.js
        var socketWildcard = require('socketio-wildcard')();
        
        io.use(socketWildcard);
 
        io.on('connection', function(socket) {
            require('./router/socketMsgRouter.js')(socket);
        });
        
        
        //socketMsgRouter.js
        module.exports = function socketMsgRouter (socket) {
        
            socket.on('*', function(sioRawMessageJSON) {
                var controller, controllerName, eventMessageObj;
                
                //sioRawMessage 소켓이벤트로 들어온 raw메시지이고, sioEventMessage는 소켓이벤트 메시지.
                if (sioRawMessageJSON && sioRawMessageJSON.data) {
                    //logger.debugLog('sioRawMessageJSON.data : ' + JSON.stringify(sioRawMessageJSON.data));
                    var event = sioRawMessageJSON.data[0], sioEventMessageJSON = sioRawMessageJSON.data[1];
                    ...
                    ...
                }
                
                eventMessageObj = {
                    event : event,
                    socketId : socket.id,
                    messageJSON : sioEventMessageJSON
                };
                ...
                ...
                // event명을 보고, 해당 event를 처리하는 controller로 보낸다.
                if (eventMessageObj && eventMessageObj.event) {
                    var event = eventMessageObj.event,
                        clientEventMap = require('./clientEventMap');
                    controllerName = eventControllerMap[eventMessageObj.event];
    
                    if (clientEventMap[eventMessageObj.event]) { 
                        if (controllerName) {
                            controller = require('./../controllers/' + controllerName);
                            if (controller) {
                                controller(eventMessageObj, controllerResultCallback)
                            }
                        }
                    }
                }
            });
            ...
            ...
        };    