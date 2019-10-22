# Image 회전 Animation 적용

*** 

### @keyframes 사용

  - @keyframes 규칙을 통하여 애니매이션 특정 시점의 상태를 기술할 수 있다.
  - 특정 시점의 상태를 기술하면 각 키프레임 사이의 애니매이션은 자동으로 구현된다.
  - from {}은 시작지점을 의미하며, 0% {} 로 선언할 수도 있다.
  - to {}는 종료지점을 의미하며, 100% {} 로 선언할 수도 있다.
  
        @keyframes slidein {
          from {
            margin-left: 100%;
            width: 300%
          }
        
          to {
            margin-left: 0%;
            width: 100%;
          }
        }
  
        @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
        @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }

.

### animation 설정

 - animation:spin 4s linear infinite 은 차례대로 애니메이션이름, 진행시간, 속도형태, 반복횟수를 설정하였다.
 - 애니매이션 이름으로 지정한 spin은 keyframes의 이름이다. 
 - linear는 일정하게, infinite는 무한반복의 의미이다.
 - animation-name, animation-duration, animation-timing-function, animation-iteration-count 로도 설정할 수 있다.
   
        .msgbox .msgWrap .msgLoading {
            ....
            background: url("../img/loading.gif") no-repeat center center;
            -webkit-animation:spin 4s linear infinite;
            -moz-animation:spin 4s linear infinite;
            animation:spin 4s linear infinite;
        }
         
***         
         
### 참조

 - CSS 애니메이션 사용하기
 
   <https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations>
