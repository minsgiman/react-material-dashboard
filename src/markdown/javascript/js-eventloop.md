# Javascript의 Event Loop

***

### 1. Javascript Engine의 call stack

.

    /* main.js */
    var firstFunction = function () {  
      console.log("I'm first!");
    };
    
    var secondFunction = function () {  
      firstFunction();
      console.log("I'm second!");
    };
    
    secondFunction();

.

##### 1) 위 코드 수행 결과 아래와 같이 call stack이 쌓이고, 위에서부터 순차적으로 실행될 것이다.

![object](./../images/develop/callstack1.png "object")

.

##### 2) firstFunction이 먼저 수행되고, call stack에서 지워진다.

![object](./../images/develop/callstack2.png "object")

.

.

***

### 2. Event Loop와 Event Table 그리고 Event Queue가 하는 일

.
 
    var firstFunction = function () {  
        console.log("I'm first!");
    };
    
    var secondFunction = function () {  
        setTimeout(firstFunction, 5000);
        console.log("I'm second!");
    };
    
    secondFunction();
   
.
   
##### 1) 위 코드 수행 중, 아래는 setTimeout이 실행되기 전까지의 call stack이다. **Event Table**과 **Event Queue**는 비어있는 상태이다.
 
![object](./../images/develop/callstack3.png "object")

.

##### 2) setTimeout이 실행되면, 브라우저는 setTimeout의 콜백을 **Event Table**에 등록한다. **Event Table**에 등록된 콜백은 해당하는 이벤트가 발생하기를 기다린다.  
 
![object](./../images/develop/callstack4.png "object")

.

##### 3) 5초후, 기존에 call stack에 쌓여있던 것들은 모두 수행되어 제거되고, **Event Table**의 콜백은 이벤트가 발생하여 **Event Queue**로 옮겨진다.
 
![object](./../images/develop/callstack5.png "object")

.

##### 4) **Event Loop**가 하는 일은 call stack이 비어있는지 계속해서 체크한다. call stack이 비어있다면, **Event Loop**는 **Event Queue**에 실행을 기다리고 있는 function이 있는지 체크한다. 만약 있다면, **Event Loop**는 이것을 call stack으로 옮긴다.

![object](./../images/develop/callstack6.png "object")

.

***
 
### 참조
 
  - What is the JavaScript Event Loop?
  
  <http://altitudelabs.com/blog/what-is-the-javascript-event-loop/>