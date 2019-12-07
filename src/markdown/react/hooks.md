# React Hooks

React Hooks는 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 
<br>
그리고 React 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 useEffect 기능 등을 제공하여
<br> 
기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해준다.
<br><br>

### Hooks가 만들어진 이유

* 기존 상태를 갖는 로직(stateful logic)을 다른 컴포넌트가 재사용하기 어렵다.
    
    - 로직을 재사용하기 위해 HOC 패턴을 사용하는데, 이는 wrapper hell 문제를 발생시킨다.
    - 복잡한 계층구조는 코드를 추적하기 어렵게 만든다.

* 기존 컴포넌트가 복잡하여 이해하기 어렵게 된다.

    - 여러 로직이 componentWillUnmount, componentDidMount 등의 React life cycle에 흩어지게 되고, 연관없는 코드들이 섞이게 된다.
    - class 에서의 this 사용은 혼동을 불러일으키기 쉽다. 
        
* Hooks는 컴포넌트의 기존 구조를 변경하지 않고 상태를 갖는 로직을 재사용할 수 있게 하며, 컴포넌트를 작은 함수로 분리해 단순화할 수 있게 한다.   
        
<br>

### State Hook

* useState는 파라미터로 초기값을 받고, 현재 상태와 현재상태를 업데이트 할 수 있는 함수를 반환해준다.

        const [count, setCount] = useState(0);

* 기존 Class 컴포넌트 코드

        import React from 'react';
    
        class Example extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              count: 0
            };
          }
        
          render() {
              return (
                  <div>
                    <p>You clicked {this.state.count} times</p>
                    <button onClick={() => this.setState({ count : this.state.count + 1 })}>
                      Click me
                    </button>
                  </div>
              );
          }
        }

* useState 코드

        import React, { useState } from 'react';
        
        function Example() {
          // "count"라는 새로운 상태 값을 정의합니다.
          const [count, setCount] = useState(0);
        
          return (
            <div>
              <p>You clicked {count} times</p>
              <button onClick={() => setCount(count + 1)}>
                Click me
              </button>
            </div>
          );
        }
<br>

### Effect Hook

* useEffect의 첫번째 파라미터 effect는 렌더링 될 때마다 호출된다.

        function useEffect(effect: EffectCallback, inputs?: InputIdentityList)

* 두번째 파라미터에 빈 배열 [] 을 전달하면 기존의 componentDidMount와 동일하게 동작하다. (처음 렌더링 시에만 effect가 호출된다.)
        
* 두번째 파라미터인 inputs로 특정 state가 변경될 때마다 effect가 실행되게 할 수있다.

        useEffect(() => func(), [count]); // count state가 변경될 때마다 func 실행

* 기존 Class 컴포넌트 코드

        import React from 'react';

        class Data extends React.Component {
          constructor(props) {
            super(props);
            this.state = { item : null };
            this.setData = this.setData.bind(this);
          }
        
          componentDidMount() {
            API.getData()
              .then((response) => { this.setData(response) });
          }
        
          setData(data) {
            this.setState({ item: data });
          }
        
          render() {
            const isLoading = (this.state.item == null);
            return { isLoading ? "Loading..."  : this.state.item }
          }
        }

* useEffect 코드

        import React, { useState, useEffect } from 'react';
        
        function Data() {
          const [data, setData] = useState(null);
        
          useEffect(() => {
            API.getData()
              .then((response) => { setData(response) });
          }, []);
        
          const isLoading = (data == null);
          return { isLoading ? "Loading..."  : data }
        }
<br>

### Custom Hooks

* custom hooks를 만들어서 사용하는 것 또한 가능하다.<br>
 <https://ko.reactjs.org/docs/hooks-custom.html>
<br>

### 다른 내장 Hook

* useContext, useReducer 와 같은 다른 내장 Hook들도 사용할 수 있다.<br>
 <https://reactjs.org/docs/hooks-reference.html>
<br><br>

***
 
### 참조
 
* hooks-overview<br>
  <https://ko.reactjs.org/docs/hooks-overview.html>