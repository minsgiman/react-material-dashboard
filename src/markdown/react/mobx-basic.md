# MobX 사용 및 장단점

MobX는 State관리 라이브러리이다. 장단점 및 사용방법에 대하여 정리하였다. 

### 장단점

#### 장점
 * 러닝커브가 적다.
 * Redux의 Component와 State를 연결하는 번잡한 보일러플레이트 코드들을 decorator 제공으로 깔끔하게 해결한다. (적은 코드 작성)
 * 상태관리 논리를 객체지향으로 구현하는데 적합하다.
 
#### 단점
 * Redux의 경우 reducer, action 등을 체계적으로 분리해서 개발하지만, MobX는 그렇지 않고 자유도가 높아서 크고 복잡한 프로젝트에서는 구조를 잘 잡지 않으면 유지보수가 어려워질 수 있다.
 * redux(redux devtools)에 비해 디버깅 툴이 현재는 부족하다.
<br><br>

### 사용방법
MobX는 일관성 없는 상태를 만들 수 없도록 주요 문제를 해결하여 상태 관리를 간단하게 만들었다. 이를 위한 전략은 간단하다.<br>
*** Application 상태로부터 파생될 수 있는 모든 것들을 자동으로 파생되도록 하였다. *** 
![object](/images/develop/mobx-flow.png "object")

#### observable
observable은 Observable State를 만들며, 다음과 같이 사용한다.
```
 * observable(value)
 * @observable classProperty = value
```
<br>

다음과 같이 Observable State를 만들면 MobX가 이 객체에 변화가 일어나면 탐지할 수 있다.
```javascript
const person = observable({
    firstName: "Clive Staples",
    lastName: "Lewis"
})
```
<br>

#### computed
computed는 연산된 값이 필요할 때 사용한다. 의존하는 값이 변경될 때 계산해놓고, 조회할 때는 캐싱된 데이터를 사용한다.
```javascript
class Foo {
    @observable length = 2
    @computed get squared() {
        return this.length * this.length
    }
    set squared(value) {
        //this is automatically an action, no annotation necessary
        this.length = Math.sqrt(value)
    }
}
const foo = new Foo();
autorun(() => console.log('foo squared : ' + foo.squared));
foo.squared = 9;
// foo squared : 4
// foo squared : 9
```
<br>

#### autorun
autorun은 전달받는 콜백에서 사용되는 State를 자동으로 관찰하여, 변경이 생기면 콜백을 실행한다.
<br>
autorun을 실행하면 disposer를 리턴한다. disposer를 실행하면 autorun을 중단한다.
```javascript
var numbers = observable([1, 2, 3])
var sum = computed(() => numbers.reduce((a, b) => a + b, 0))

var disposer = autorun(() => console.log(sum.get()))
// prints '6'
numbers.push(4)
// prints '10'

disposer()
numbers.push(5)
// won't print anything, nor is `sum` re-evaluated
```
<br>

#### reaction
reaction은 Observable State에 변경이 일어날 때, 특정작업을 할 수 있다. 다음과 같이 사용한다.
```
 * reaction(() => data, (data, reaction) => { sideEffect }, options?)
```
<br>

두 번째 인자로 넘겨지는 effect function은 2개의 인자를 받는다.<br> 
첫번째는 data function에서 리턴하는 값이고, 두번째 인자 reaction은 해당 reaction을 dispose하는 용도로 사용될 수 있다.
```javascript
const counter = observable({ count: 0 })

// invoke once of and dispose reaction: reacts to observable value.
const reaction3 = reaction(
    () => counter.count,
    (count, reaction) => {
        console.log("reaction 3: invoked. counter.count = " + count)
        reaction.dispose()
    }
)

counter.count = 1
// prints:
// reaction 3: invoked. counter.count = 1

counter.count = 2
// prints:
// (There are no logging, because of reaction disposed. But, counter continue reaction)

console.log(counter.count)
// prints:
// 2
```
<br>

#### action
action은 Observable State에 변화를 일으킨다.

action을 호출할 때마다 reaction이 발생하는데, 여러 action들을 transaction으로 묶어서 호출하면 transaction으로 묶은 action들이 모두 끝나고 난 다음에 reaction이 발생한다.
```javascript
import { observable, computed, reaction, autorun, action, transaction } from 'mobx'

class Foo{
    @observable datas = [];

    @computed
    get total() {
        console.log('calculating..');
        return this.datas.reduce((prev, curr) => prev + curr.value, 0);
    }

    @action
    add(id, value) {
        this.datas.push({ id, value });
    }
}

const foo = new Foo();
autorun(() => console.log('autorun total : ' + foo.total));

transaction(() => {
    foo.add('a', 4);
    foo.add('b', 8);
    foo.add('c', 9);
});

console.log('result total : ' + foo.total);
// calculating..
// autorun total : 0
// calculating..
// autorun total : 21
// result total : 21
```
<br>

***

### 참조
* MobX Home<br>
<https://mobx.js.org/README.html>


 
 