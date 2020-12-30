# React.memo 사용하기

### React.memo와 렌더링 성능

UI 성능을 증가시키기 위해, React는 고차 컴포넌트(Higher Order Component, HOC) React.memo()를 제공한다.<br>
렌더링 결과를 메모이징(Memoizing)함으로써, 불필요한 리렌더링을 건너뛴다.

React는 먼저 컴포넌트를 렌더링(rendering) 한 뒤, 이전 렌더된 결과와 비교하여 DOM 업데이트를 결정한다.<br>
만약 렌더링 결과가 이전과 다르다면, React는 DOM을 업데이트한다.<br>
다음 렌더링 결과와 이전 결과의 비교는 빠르다. 하지만 어떤 상황에서는 이 과정의 속도를 좀 더 높일 수 있다.<br>
<br>
컴포넌트가 React.memo()로 래핑 될 때, React는 컴넌트를 렌더링하고 결과를 메모이징(Memoizing)한다.<br>
그리고 다음 렌더링이 일어날 때 **props가 같다면, React는 메모이징(Memoizing)된 내용을 재사용한다.**<br>

```js
export function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  );
}

export const MemoizedMovie = React.memo(Movie);
```
메모이징 한 결과를 재사용 함으로써, React에서 리렌더링을 할 때 가상 DOM에서 달라진 부분을 확인하지 않아 성능상의 이점을 누릴 수 있다.
<br><br>

### props 비교 커스터마이징

React.memo()는 props 혹은 props의 객체를 비교할 때 얕은(shallow) 비교를 한다.<br>
비교 방식을 수정하고 싶다면 React.memo() 두 번째 매개변수로 비교함수를 만들어 넘겨주면 된다.

```js
const Checks = ({
    checkList,
    labels,
    onCheck}) => {
    return (
        <ul>
            {labels.map((label, idx) => (
                <li key={idx}>
                    <label>
                        <input
                            type='checkbox'
                            checked={checkList[idx]}
                            onChange={() => {}}
                            onClick={() => onCheck(idx)}
                        />
                    </label>
                </li>
            ))}
        </ul>
    )
};

export default React.memo(Checks, (prevProp, nextProp) => {
    let i, len = nextProp.checkList.length;

    for (i = 0; i < len; i+=1) {
        if (prevProp.checkList[i] !== nextProp.checkList[i]) {
            return false;
        }
    }
    return true;
});
```
비교 함수가 false를 리턴하면 props가 변경된 것으로 보고 리렌더링을 한다.
<br><br>

### React.memo는 언제 사용해야 하나

React.memo()를 사용하기 좋은 케이스는 함수형 컴포넌트가 같은 props로 자주 렌더링이 발생할 것으로 예상 될 때이다.<br>
일반적으로 부모 컴포넌트에 의해 하위 컴포넌트가 같은 props로 리렌더링 될 때가 있다.<br>
이 때 React.memo()를 사용하면 성능을 개선할 수 있다.<br>

위와 같은 상황이 아니라면 React.memo를 사용하지 않는다.<br>
불필요하게 React.memo를 사용한다면 메모이제이션으로 인한 메모리점유, 불필요한 props비교 로직수행으로 성능이 오히려 안 좋아질 수 있다.
<br><br>

### React.memo와 콜백함수

부모 컴포넌트가 자식 컴포넌트의 콜백 함수를 정의한다면, 리렌더링을 할 때 마다 부모함수가 다른 콜백 함수의 인스턴스를 넘길 수 있다.<br>
그러면 자식 컴포넌트가 전달받는 다른 props들에 변화가 없더라도 콜백 함수의 인스턴스가 다르기 때문에 리렌더링이 발생할 수 있다. 

```js
function Logout({ username, onLogout }) {
  return <div onClick={onLogout}>Logout {username}</div>;
}

const MemoizedLogout = React.memo(Logout);

function MyApp({ store, cookies }) {
  return (
    <div className="main">
      <header>
        <MemoizedLogout
          username={store.username}
          onLogout={() => cookies.clear()}
        />
      </header>
      {store.content}
    </div>
  );
}
```
<br>
위 문제를 해결하려면 onLogout prop의 값을 매번 동일한 콜백 인스턴스로 설정해야만 한다.<br>
useCallback()을 이용해서 콜백 인스턴스를 보존시킨다.<br><br>

```js
const MemoizedLogout = React.memo(Logout);

function MyApp({ store, cookies }) {
  const onLogout = useCallback(() => {
    cookies.clear();
  }, []);
  return (
    <div className="main">
      <header>
        <MemoizedLogout username={store.username} onLogout={onLogout} />
      </header>
      {store.content}
    </div>
  );
}
```
useCallback(() => { cookies.clear() }, []) 는 항상 같은 함수 인스턴스를 반환한다.<br> 
MemoizedLogout의 메모이제이션이 정상적으로 동작하도록 수정되었다.
<br><br>

### 메모이제이션 성능 측정

마지막으로 메모이제이션의 성능상 이점을 측정하기 위해 [profiling](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab) 을 사용한다.
<br><br>

***
 
### 참조
 
* [React.memo() 현명하게 사용하기](https://ui.toast.com/weekly-pick/ko_20190731)
 
