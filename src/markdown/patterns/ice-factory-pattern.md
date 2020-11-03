# Ice Factory Pattern

Javascript Class 키워드로 생성한 객체는 가끔 다음과 같이 의도치 않게 동작할 수 있다.<br>

* Class의 method가 re-assign 될 수 있다.
* Class method 내부에서 사용하는 this가 해당 인스턴스가 아니라 다른것으로 바뀔 수 도 있다. (class의 method를 click EventListener로 등록한다거나..)

<br>

이러한 기존 Javascript Class에서 발생할 수 있는 문제를 막고자 Ice Factory Pattern 을 활용한다.
<br>

(Ice Factory Pattern)
```js
function createShoppingCart({ db }) {
    return Object.freeze({
      addProduct,
      empty,
      getProducts,
      removeProduct
    })

    function addProduct (product) {
        db.push(product)
    }

    function empty () {
        db = []
    }

    function getProducts () {
        return Object.freeze([...db])
    }

    function removeProduct (id) {
      // remove a product
    }
}

const db = []
const cart = createShoppingCart({ db })
cart.addProduct({
    name: 'foo',
    price: 9.99
})
``` 

Class 사용과 비교하여 Ice Factory Pattern에서 바뀐 부분은 다음과 같다.

* 객체를 생성할 때 new 키워드를 더 이상 사용하지 않는다. factory method만 호출하여 객체를 생성할 수 있다.

* 객체 내부에서 this를 더 이상 사용하지 않는다. 파라미터로 전달받은 db 변수에 직접 접근하여 사용한다. (Closure를 이용)

* 생성한 객체는 immutable하다. Object.freeze 를 사용하여 새로운 property추가나, 기존 property 변경을 할 수 없게 만들어서 리턴하였다.

<br>

또한 아래와 같이 private멤버(secret) 추가도 쉽게 할 수 있다.

```js
function makeThing(spec) {
    const secret = 'shhh!'

    return Object.freeze({
      doStuff
    })

    function doStuff () {
        // We can use both spec
        // and secret in here 
    }
}
```
<br>

#### 상속대신 합성

코드 재사용을 위하여 상속보다는 합성을 이용한다.

아래와 같이 ProductList 팩토리 메소드가 있다.
```js
function createProductList({ productDb }) {
    return Object.freeze({
        addProduct,
        empty,
        getProducts,
        removeProduct
    )}
    
    //...
}
```

ShoppingCart 팩토리에서 ProductList를 합성으로 전달받아 items property에 넣어 리턴한다.
```js
function createShoppingCart(productList) {
    return Object.freeze({
      items: productList,
      //...
    })
    
    //...
)}
```

ShoppingCart 인스턴스 cart에서 ProductList의 addProduct method를 items property를 통해 호출한다.
```js
const productDb = []
const productList = createProductList({ productDb })
const cart = createShoppingCart(productList)

cart.items.addProduct()
```
<br>

물론 Ice Factory를 사용하는데에는 trade-off가 있다.<br>
Class를 사용하는 것보다 Ice Factory는 더 느리고, memory를 더 많이 사용한다. (prototype 사용 X)<br>
그렇지만 아주 많은 수의 인스턴스를 생성하는 것이 아니라면, 그 차이는 크지 않을 것이다.<br>
그때 상황에 맞게 개발자가 어떤 옵션을 사용할지 결정되면 될 것이다.<br>

