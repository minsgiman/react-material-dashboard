# Map & Set


### Map

기존의 Object의 Key는 반드시 Symbol이나 문자열이어야 했다.<br>
또한 prototype 체인 때문에 의도하지 않은 연결이 생길 수 있다.<br>
Map에서는 기존 Object의 단점을 해결하였다.<br>
객체를 키로 사용할 수 있으며, 의도치 않은 연결은 발생하지 않는다.
```js
const symbol = Symbol();
const string2 = 'string2';
const regularObject = {
    string1: 'value1',
    [string2]: 'value2',
    [symbol]: 'value3'
}

const func = () => null;
const object = {};
const array = [];
const bool = false;
const map = new Map();
map.set(func, 'value1');
map.set(object, 'value2');
map.set(array, 'value3');
map.set(bool, 'value4');
map.set(NaN, 'value5');
```
<br>

Object는 직접적으로 iterate 할 수 없어서 다음 method들을 사용해서 key - value를 iterate 할 수 있다.<br>
(Object.keys(), Object.values(), Object.entries(), for ... in loop)<br>

또한 for ... in loop 에는 제약사항이 있는데, 순서가 보장되지 않고 Symbol key는 조회 할 수 없다.

Map에서는 순서를 보장하면서 아래 예제와 같이 직접 iterate 할 수 있다.<br>
key - value 의 개수는 map.size 를 통해서 조회할 수 있다. (Object에서는 Object.keys({}).length)
```js
for (let [key, value] of map) {
  console.log(key);
  console.log(value);
};
map.forEach((key, value) => {
  console.log(key);
  console.log(value);
});
```
<br>

### Map과 Object의 성능

대량의 데이터를 순차적으로 set하고 get할 때 성능을 비교하면, Map의 set이 Object의 set보다는 약 2배정도 성능이 느리다.<br>
그러나 get에서는 Map이 Object보다 10배 빠르다.

```text
<Set성능>
Object의 경우 데이터가 순차적으로 적재되지 않는다. 
브라우저는 Object에서 set활동이 일어나면 아무곳에 공간을 만들어서 값을 넣어버린다.
Map은 key-value 형식으로 구성되어 있으며 순차적으로 데이터를 적재한다. 
여기서 발생되는 추가적인 활동(데이터 재배치, 정렬 등)이 set 처리에 대해 일부 성능저하를 발생시킨다.
```
```text
<Get성능>
Object의 경우 Object.keys 를 사용하여 key 값을 별도로 가져와야하며,
각 key를 사용하여 데이터를 직접적으로 찾아와야한다.
그러나 map의 경우 순차적으로 놓여져 있는 데이터를 순회만 하면 되기 때문에 조회 속도 면에서는 우위를 가져간다.
```
<br>

### WeakMap

WeakMap은 아래의 3가지의 차이점을 제외하면 맵과 같다.
* 키는 반드시 객체여야 한다
* WeakMap의 키는 가비지 콜렉션에 포함될 수 있다.
* WeakMap은 이터러블이 아니며 Clear() 메서드도 없다.

JS는 코드 어딘가에서 객체를 참조하는 한 그 객체를 메모리에 계속 유지한다.<br>
만약 Map의 키인 객체 o 가 존재한다면 Map이 존재하는 이상 객체 o도 메모리에 계속 유지된다.

WeakMap은 그렇지 않다. 따라서 이터러블이 될 수 없다. (가비지 컬렉션 중인 객체를 노출할 위험이 크기 때문)<br>
이러한 특징들 덕에 WeakMap은 객체 인스턴스의 전용키를 저장하기에 알맞다.
```js
const SecretHolder = (function () {
    const secrets = new WeakMap();
    return class {
        setSecret(secret){
            secrets.set(this, secret);
        }
        getSecret(){
            return secrets.get(this);
        }
    }
})();

const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

console.log(a.getSecret());
console.log(b.getSecret());
```
<br>

### Set

Set은 중복을 허용하지 않는 데이터 집합이다.
동일한 값에 대해서 단 한번만 기록되어야 하는 경우에 사용된다.
```js
const roles = new Set();

roles.add('1');
roles.add('xxx');

roles.size; // 2

roles.add('1');
roles.size; // 2. 중복이라면 아무일도 일어나지 않는다.

roles.delete('xxx');
roles;      // Set ["1"]
roles.size; // 1
roles.delete('xxx'); // False
```

Set 또한 for...of나 forEach를 사용해서 iterate 할 수 있다.
```js
let set = new Set(["oranges", "apples", "bananas"]);
for (let value of set) alert(value);

set.forEach((value, valueAgain, set) => {
  alert(value);
});
```
forEach에서 첫번째 Parameter와 동일한 value를 두번째에서도(valueAgain) 전달받는다.<br>
이렇게 구현된 이유는 Map과의 호환성 때문이다. 동일한 인터페이스를 제공하기 때문에 쉽게 Set을 Map으로 교체하기 쉽다. 

<br>

***
 
### 참조
 
* Map and Set<br>
  <https://javascript.info/map-set>

* How JavaScript Maps Can Make Your Code Faster<br>
  <https://medium.com/@bretcameron/how-javascript-maps-can-make-your-code-faster-90f56bf61d9d>
  
* How to make your code faster using JavaScript Sets
  <https://medium.com/@bretcameron/how-to-make-your-code-faster-using-javascript-sets-b432457a4a77>

