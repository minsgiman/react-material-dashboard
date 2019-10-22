# Socket 서버 구현 3 (Logging)
 
***

#### 1. Winston 모듈

 - winston 모듈을 사용하여 1일 기준으로 로그 파일이 로테이션 되도록 설정하였다.
 - 로그파일은 'control_2018-02-12.log' 와 같이 생성된다.
  
 
        var winston = require('winston');
 
        logger = new winston.Logger( {
             transports: [
               new winston.transports.DailyRotateFile( {
                 filename: __dirname + '/../../logs/control_',
                 datePattern: 'yyyy-MM-dd.log',
                 level: 'debug',
                 handleExceptions: true,
                 json: false,
                 colorize: true,
                 maxFiles: 10,
                 maxsize: 1*1024*1024*1024,
                 timestamp: function() {
                   var date = new Date();
                   var tz = date.getTime() + (date.getTimezoneOffset() * 60000) + (9 * 3600000);
                   date.setTime(tz);
            
                   var curr_hour = pad(date.getHours());
                   var curr_min = pad(date.getMinutes());
                   var curr_sec = pad(date.getSeconds());
                   var curr_msec = pad2(date.getMilliseconds());
            
                   return curr_hour+":"+curr_min+":"+curr_sec+"."+curr_msec;
                 },
                 formatter: function(options) {
                   return '['+ options.timestamp() +' '+ options.level.toUpperCase() +']'+ (undefined !== options.message ? options.message : '') +
                     (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
                 }
               }),
               new winston.transports.Console({
                 level: 'debug',
                 handleExceptions: true,
                 json: false,
                 colorize: true,
                 timestamp: function() {
                   var date = new Date();
                   var tz = date.getTime() + (date.getTimezoneOffset() * 60000) + (9 * 3600000);
                   date.setTime(tz);
            
                   var curr_hour = pad(date.getHours());
                   var curr_min = pad(date.getMinutes());
                   var curr_sec = pad(date.getSeconds());
                   var curr_msec = pad2(date.getMilliseconds());
            
                   return curr_hour+":"+curr_min+":"+curr_sec+"."+curr_msec;
                 },
                 formatter: function(options) {
                   return '['+ options.timestamp() +' '+ options.level.toUpperCase() +']'+ (undefined !== options.message ? options.message : '') +
                     (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
                 }
               })
             ],
             exitOnError: false
        });
 
.

#### 2. Master로 Log메시지 전송 및 Master의 Logging 관리

 - winston을 통하여 logging 파일을 생성하고, 기록하는 일은 Master Process 한 곳에서 관리한다.
 - Worker Process들 에서는 IPC 통신으로 Master에 Log메시지를 전송하고, Master에서 Log메시지를 받아 파일에 기록한다.
 
     
         /** Master Process 코드 **/
    
         var processLoggingMsg = function (message) {
             if (message && message.data) {
               switch (message.data.type) {
                 case 'debug':
                   logging.debugLog(message.data.log);
                   break;
                 case 'info':
                   logging.infoLog(message.data.log);
                   break;
                 case 'warning':
                   logging.warningLog(message.data.log);
                   break;
                 case 'error':
                   logging.errorLog(message.data.log);
                   break;
                 default:
                   break;
               }
             }
         };
     
         var masterMessageListener = function (message) {
             if (message && message.data) {
               switch(message.data.type) {
                 case 'kafka':
                   processKafkaMsg(message.data);
                   break;
                 case 'logging':
                   processLoggingMsg(message.data);
                   break;
                 .....
                 .....
                 .....
                 default:
                   break;
               }
             }
         };
    
         process.on('message', masterMessageListener);