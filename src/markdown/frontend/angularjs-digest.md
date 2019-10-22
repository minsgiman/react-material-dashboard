# AngularJS의 $watch, $apply, $digest 동작

<br><br>

## $watch list
***
<br>
1) UI와 무언가를 바인딩하게 되면 반드시 $watch list(목록)에 $watch를 넣는다  
<br><br>
2) $watch는 모델(model)에 변경이 있는지를 항시 감시하는 역할을 한다
<br><br>
3) user와 pass에 대한 model 변경을 감시하기 위하여 두개의 $watch가 만들어져서 $watch list에 첨부된다

```js
User: <input type="text" ng-model="user" />
Password: <input type="password" ng-model="pass" />
```
  
<br>
4) $scope에 모델을 두개 만들고, html에서 한개의 model만 사용할 경우는 $watch가 한개만 만들어져서 $watch list에 첨부된다 

```js
//script
app.controller('MainCtrl', function($scope) {
    $scope.foo = "Foo";
    $scope.world = "World";
});
//html
Hello, {{world}}
``` 
 
<br>
5) Directives 만들 때도 바인딩이 있으면 당연히 $watch가 생성된다. 그럼 언제일까? template이 로딩될때 즉, linking 절차일때 필요한 $watcher가 생성된다 
<br><br><br>

## $digest loop
***
<br>
1) 브라우져가 "angular context"에 의하여 관리되어 질 수 있는 이벤트를 받게 될 때, $digest loop 가 작동되어 진다<br> 

&nbsp;&nbsp;&nbsp; **("angular context" 안으로 들어간 모든 이벤트는 $digest loop를 수행한다)**

<br> 
2) $digest loop은 두개의 작은 루프로 만들어진다. 하나는 $evalAsync queue를 처리하고, 다른 하나는 $watch list를 처리한다.
<br><br>
3) $digest는 $watch list를 루핑돌면서 model 변경을 체크하고, $watch에 등록된 listener handler를 수행한다
<br><br>
4) 이때 dirty-checking이 이루어지는데, 하나가 변경되면 모든 $watch를 루핑돌고 다시 체크해 보고 변화가 없을 때가지 루핑을 돈다
<br><br>
5) 그러나 무한 루프를 방지하기 위하여 기본적으로 최대 10번의 루핑을 돈다.
<br><br>
6) 그리고 나서 $digest loop가 끝났을 때 DOM을 업데이트 한다. (즉, 변경감지시 즉시 DOM 반영이 아닌 Loop끝났을 때 반영함) 
<br><br><br>

## $apply를 통하여 angular context로 들어가기
***
<br>

* Angular 외부 이벤트가 발생할 때 $apply를 호출하게 되면, 이벤트는 "angular context"로 들어가고, $digest loop를 수행한다.

<br>

* 그런데 $apply를 호출하지 않으면 "angular context" 밖에서 이벤트는 수행하게 되고, $digest loop를 수행하지 않는다.

<br>

* 기존 ng-click 같은 이미 만들어져 있는 Directive들은 이벤트를 $apply 안에 랩핑한다.

<br> 

* Jquery 이벤트를 "angular context"로 들어가서 처리하게 해주는 방법

```js
element.bind('click', function() {
    scope.foo++;
    scope.bar++;
    scope.$apply();
});
```

<br><br><br>

***

<br>

### 참조
<br>

 * AngularJS watch-how-the-apply-runs-a-digest<br>
<http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/>
<br>
