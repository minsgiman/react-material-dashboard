# window.requestAnimationFrame()의 이해

requestAnimationFrame은 브라우저가 frame을 그릴 준비가 되었을 때, Parameter로 전달한 애니매이션 프레임 콜백을 호출하는 함수다.
<br><br>

### setTimeout 및 setInterval으로 구현한 애니매이션의 문제점
 * 항상 콜백함수를 호출하기 때문에 브라우저의 다른 탭이 선택된 경우와 같이 실제 화면을 다시 그릴 필요가 없는 경우에도 화면을 다시 그린다. (시스템의 리소스 낭비)
 * 디스플레이 갱신 전에 캔버스를 여러 번 고치더라도 디스플레이 갱신 바로 직전의 캔버스 상태만 적용이 되기 때문에, 프레임 손실이 발생할 수 있다. 
<br><br>

### requestAnimationFrame 호출과 Event Loop

* requestAnimationFrame을 호출하면 콜백을 Animation Frames(Queue)에 등록한다.

![object](/images/develop/reqanim1.png "object")

* Call Stack이 빈 상태가 되면 Animation Frames(Queue)에서 Event Loop가 콜백을 꺼내서 Call stack에 올리고 실행한다.<br>
  보통 16.7ms(60fps) 마다 리페인트가 trigger 되므로, Animation Frames에 콜백이 있는지 확인하는 주기도 최소 16.7ms이다.
  
![object](/images/develop/reqanim2.png "object")
<br><br>

### requestAnimationFrame 사용

requestAnimationFrame의 브라우저 지원을 위해 requestAFrame, cancelAFrame을 정의하였다.<br>
requestAnimationFrame을 지원하지 않는 브라우저인 경우에는 setTimeout을 사용한다.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Script-based animation using requestAnimationFrame</title>
    <style type="text/css">
        div { position: absolute; left: 10px; top:100px; padding: 50px;
            background: crimson; color: white; }
    </style>
    <script type="text/javascript">
      var requestId = 0;
      var startime = 0;
      var lpos = 0;
      var elm;

      function init() {
        elm = document.getElementById("animated");
      }

      function render() {
        elm.style.left = ((lpos += 3) % 600) + "px";
        requestId = window.requestAFrame(render);
      }

      function start() {
        if (window.performance.now) {
          startime = window.performance.now();
        } else {
          startime = Date.now();
        }
        requestId = window.requestAFrame(render);
      }

      function stop() {
        if (requestId)
          window.cancelAFrame(requestId);
      }

      // handle multiple browsers for requestAnimationFrame()
      window.requestAFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          // if all else fails, use setTimeout
          function (callback) {
            return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
          };
      })();

      // handle multiple browsers for cancelAnimationFrame()
      window.cancelAFrame = (function () {
        return window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          window.oCancelAnimationFrame ||
          function (id) {
            window.clearTimeout(id);
          };
      })();
    </script>
</head>
<body onload="init();">
    <div id="animated">Hello there.</div>
    <button onclick="start()">Start</button>
    <button onclick="stop()">Stop</button>
</body>
</html>
```