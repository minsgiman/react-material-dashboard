# Jquery의 Effect Queue

***

### Jquery의 animate 함수는 내부적으로 effect queue를 사용한다.

 - 일반적으로 Jquery의 animate를 아래와 같이 순차적으로 호출하면 animation이 차례대로 일어난다
 - 왜냐하면, Animate 내부적으로 effect queue를 사용하기 때문에 앞에서 일어난 animation이 끝나고 다음것이 수행된다.

        $('#box').animate({width:'500px', opacity:0.4}, 1000)
                 .animate({height:'300px'}, 1000);

.

### queue옵션을 false로 설정 

 - 아래와 같이 queue 옵션을 false로 주게 되면 animation이 동시에 일어난다.

        $('#box').animate({width:'500px', opacity:0.4}, 1000)
                         .animate({height:'300px'}, {duration:1000, queue:false});
                         
.
                         
### queue함수의 활용

 - 아래와 같이 .queue()를 활용하여 순차적으로 애니매이션을 적용할 수 도 있다.

        $('#one').fadeOut().queue(function() {
           $('#two').fadeOut().queue(function() {
                $('#three').fadeOut();
           });
        });