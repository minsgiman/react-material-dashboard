# Javascript Proxy 객체

[Proxy객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)의 역할은 다음과 같이 정의한다.

> The Proxy object enables you to wrap the target object and <br>
by doing that we can intercept and redefine fundamental operations for that object.

<br>

위 정의를 통해 Proxy객체의 역할을 아래와 같이 해석할 수 있다.<br>
* 특정 Object를 Proxy객체가 wrapping하여 해당 Object에 대한 접근을 통제하고, 접근 시 기본 동작을 재정의 한다.<br>
<br>

다음 라이브러리들도 ([MobX](https://github.com/mobxjs/mobx), [Vue](https://github.com/vuejs/vue), [Immer](https://github.com/immerjs/immer)) 이와 같은 Proxy 객체를 사용하고 있다.<br>
추가로 Proxy Design Pattern의 정의에 대해서 알아보려면 다음 링크를 참고하면 된다. [Wikipedia Proxy Pattern](https://en.wikipedia.org/wiki/Proxy_pattern)<br>
<br>

### Proxy 객체 파라미터
 
Proxy 객체는 target, handler 두 개의 파라미터를 받는다.
* ***target***: wrapping할 target object 
* ***handler***: 어떤 operation을 가로채서 기본동작을 재정의 할 것인지 명시하는 object<br>
<br>

### Proxy 사용 예제 1 (Logging)

target object의 balance를 get할 때 console.log를 찍도록 handler에서 정의하였다.
```js
const bankAccount = {
    balance: 2020,
    name: 'Georgy Glezer'
};

const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'balance') {
            console.log(`Current Balance Of: ${target.name} Is: ${target.balance} `);
        }

        return target[prop];
    }
};

const wrappedBankAcount = new Proxy(bankAccount, handler);

console.log(wrappedBankAcount.balance); // access to the balance

// OUTPUT:
// Current Balance Of: Georgy Glezer Is: 2020
// 2020
```
<br>

### Proxy 사용 예제 2 (Validations)

target object의 balance를 set할 때 console.log를 찍고, balance가 음수가 되는 것을 허용하지 않도록 제약사항을 추가했다.
```js
const bankAccount = {
    balance: 2020,
    name: 'Georgy Glezer'
};

const handler = {
    set: function (obj, prop, value) {
        console.log(`Current Balance: ${obj.balance}, New Balance: ${value}`);

        if (value < 0) {
            console.log(`We don't allow Negative Balance!`);
            return false;
        }
        obj[prop] = value;

        return true;
    }
};

const wrappedBankAcount = new Proxy(bankAccount, handler);

wrappedBankAcount.balance -= 2000; // access to the balance
console.log(wrappedBankAcount.balance);

wrappedBankAcount.balance -= 50; // access to the balance
console.log(wrappedBankAcount.balance);

// OUTPUT:
// Current Balance: 2020, New Balance: 20
// 20
// Current Balance: 20, New Balance: -30
// We don't allow Negative Balance!
// 20
```
<br>

### Proxy 사용 예제 3 (Caching)

매번 target의 dollars에 접근할 때 마다 곱하기 연산을 하지 않고, dollars가 의존성을 갖는 balance가 변하지 않았다면 caching value를 사용한다.
```js
const bankAccount = {
    balance: 10,
    name: 'Georgy Glezer',
    get dollars() {
        console.log('Calculating Dollars');
        return this.balance * 3.43008459;
    }
};

let cache = {
    currentBalance: null,
    currentValue: null
};

const handler = {
    get: function (obj, prop) {
        if (prop === 'dollars') {
            let value = cache.currentBalance !== obj.balance ? obj[prop] : cache.currentValue;
            
            cache.currentValue = value;
            cache.currentBalance = obj.balance;
            
            return value;
        }
        
        return obj[prop];
    }
};

const wrappedBankAcount = new Proxy(bankAccount, handler);

console.log(wrappedBankAcount.dollars);
console.log(wrappedBankAcount.dollars);
console.log(wrappedBankAcount.dollars);
console.log(wrappedBankAcount.dollars);

// OUTPUT:
// Calculating Dollars
// 34.3008459
// 34.3008459
// 34.3008459
// 34.3008459
```
<br>

### Proxy 사용 예제 4 (Dom Manipulation)

set할 때 지정한 ID의 dom element html을 target object의 text로 같이 업데이트 한다.
```js
const bankAccount = {
  balance: 2020,
  name: "Georgy Glezer",
  get text() {
    return `${this.name} Balance Is: ${this.balance}`;
  }
};

const objectWithDom = (object, domId) => {
  const handler = {
    set: function (obj, prop, value) {
      obj[prop] = value;

      document.getElementById(domId).innerHTML = obj.text;

      return true;
    }
  };

  return new Proxy(object, handler);
};

// create a dom element with id: bank-account
const wrappedBankAccount = objectWithDom(bankAccount, "bank-account");

wrappedBankAccount.balance = 26;
wrappedBankAccount.balance = 100000;
```
<br>

위의 예제들에서 본 것 처럼 Proxy 객체는 활용 방법이 매우 많고, 우리가 알고 있는 (Vue, MobX 등) 많은 라이브러리들도 이를 사용하여 구현되었다.<br>
Proxy 객체를 잘 활용한다면 강력한 도구가 될 것이다.

<br>

***

### 참조
 * [The Amazing Power of JavaScript Proxies](https://levelup.gitconnected.com/the-amazing-power-of-javascript-proxies-aa27c6d06bcb)