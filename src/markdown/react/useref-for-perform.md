# useRef를 활용한 React App 성능 개선

[useRef](https://reactjs.org/docs/refs-and-the-dom.html)는 일반적인 declarative한 React data flow에서 벗어나서<br>
DOM 엘리먼트에 접근할 수 있는 방법을 제공하여 imperative하게 DOM을 제어할 수 있게 해준다.<br>
공식문서에는 다음과 같은 상황에서 useRef를 사용하는 것을 좋은 예로 들고 있다.<br>

> * Managing focus, text selection, or media playback.<br>
> * Triggering imperative animations.<br>
> * Integrating with third-party DOM libraries.

<br>

그러나 위의 DOM Ref 기능 뿐 아니라, useRef hook은 [mutable value를 저장할 수 있는 container](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) 로도 사용 가능하다.<br>
바로 이 useRef hook의 mutable value container 기능을 통해 React App의 불필요한 re-rendering 을 줄일 수 있는 방법에 대해 소개한다.

<br>

## 이슈

useContext 를 통해 사용하는 Context의 value가 변경되면, 해당 Context를 useContext 하고 있는 컴포넌트들은 모두 re-rendering 된다.<br>
**비록 변경되는 value에 dependancy가 없더라도 말이다.**<br>
아래 예제에서 FireButton을 통해 setFire를 호출하면 Title, FireText, FireButton 모두가 re-rendering 된다.<br>
그렇다고 Context를 사용하지 않으면 FireButton이 형제 컴포넌트 FireText의 value를 변경하기가 어려워진다.

```js
// FireProvider.js
const FireProvider = ({ children }) => {
  const [fire, setFire] = useState("this is fire");

  const value = {
    fire,
    setFire
  };

  return <FireContext.Provider value={value}>{children}</FireContext.Provider>;
};

export default FireProvider;
```
```js
// App.js
<FireProvider>
  <div className="App">
    <Title />
    <FireText />
    <FireButton />
  </div>
</FireProvider>
``` 
```js
// FireButton.js
export default function FireButton() {
  const { setFire } = useContext(FireContext);

  function onClick() {
    setFire("fire button click");
  }

  return <button onClick={onClick}>Button</button>;
}
```
```js
// FireText.js
export default function FireText() {
  const { fire } = useContext(FireContext);

  return <h1>{fire}</h1>;
}
```
```js
// Title.js
export default function Title() {
  useContext(FireContext);

  return <h1>Title</h1>;
}
```

<br>

## 개선방법

**useRef의 current property가 변경되더라도 re-rendering을 발생시키지 않는다는 부분을 이용하여 개선한다.**<br>
이 방법은 형제 컴포넌트가 update function 외에 state에 의존성을 가지고 있다면 사용할 수 없다. (state가 변경되더라도 형제 컴포넌트는 re-rendering 되지 않기 때문에)<br>

1. 기존의 Provider에 있던 \[fire, setFire\] useState를 fire state value에 의존성이 있는 FireText 컴포넌트로 옮긴다.
2. Provider에서는 useRef를 통해 ref를 만들어서 value로 제공한다.
3. FireText 로 옮긴 \[setFire\] 를 형제 컴포넌트에서도 접근할 수 있도록 provider의 ref.current에 reference를 연결한다.
4. 형제 컴포넌트 FireButton 에서는 ref.current.setFire 로 접근한다.
```js
// FireProvider.js
const FireProvider = ({ children }) => {
  const fireTextRef = useRef();

  return (
    <FireContext.Provider value={{ fireTextRef }}>
      {children}
    </FireContext.Provider>
  );
};
```
```js
// FireButton.js
export default function FireButton() {
  const { fireTextRef } = useContext(FireContext);
  let clickNum = 0;

  function onClick() {
    clickNum += 1;

    if (fireTextRef.current && fireTextRef.current.setFire) {
      fireTextRef.current.setFire(`fire button click ${clickNum} times`);
    }
  }

  return <button onClick={onClick}>Button</button>;
}
```
```js
// FireText.js
export default function FireText() {
  const { fireTextRef } = useContext(FireContext);
  const [fire, setFire] = useState("this is fire");

  fireTextRef.current = { setFire };

  return <h1>{fire}</h1>;
}
```

이제 FireButton 을 클릭하면 FireText 에서만 re-rendering이 발생한다.<br>
위의 FireText 가 re-rendering 될 때 마다 fireTextRef.current 는 새로 바뀐다. 그러나 이 부분이 re-rendering을 발생시키지는 않는다.

<br>

***

### 참조

* [How to useRef to Fix React Performance Issues](https://medium.com/antlerglobal/how-to-useref-to-fix-react-performance-issues-886dec9edb03#f356)