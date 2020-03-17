# React에서 MobX 사용하기

MobX를 React와 사용하면 쉽게 State를 관리할 수 있고, setState도 사용하지 않아도 된다.
<br><br>

### MobX 설치 및 decorator 설정

* npm install mobx mobx-react

* npm @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators

* decorator를 사용하기 위해 .babelrc를 수정해준다.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
```
<br>

### MobX Store 구현

***src/stores/index.js***
 * RootStore를 만들어서 import한 스토어들을 생성할 때 this로 RootStore를 전달해주면 RootStore를 통해서 다른 Store에 접근할 수 있다.

```javascript
import CounterStore from './counter';
import MarketStore from './market';

class RootStore {
    constructor() {
        this.counter = new CounterStore(this);
        this.market = new MarketStore(this);
    }
}

export default RootStore;
```
<br>

***src/stores/counter.js***
* this.root.market.list 와 같이 market store의 list에 접근할 수 있다.

```javascript
import { observable, action } from 'mobx';

export default class CounterStore {
    @observable number = 0;

    constructor(root) {
        this.root = root;
    }

    @action increase = () => {
        this.number += 1;
    }

    @action decrease = () => {
        this.number -= 1;
    }
}
```
<br>

***src/index.js***
* React 프로젝트에 MobX 스토어를 적용할 때는 Provider 컴포넌트를 사용한다.
* root store에 있는 counter, market 스토어를 Provider에 전달한다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.less';
import App from './App';
import RootStore from './stores';

const root = new RootStore();

ReactDOM.render(
    <Provider {...root}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
```
<br>

### React 컴포넌트에 Store 주입

 * mobx-react의 inject를 통해 컴포넌트에서 store에 접근할 수 있다. store에 있는 값을 컴포넌트의 props 로 주입해준다.
 
 * setState를 사용하지 않아도 mobx-react의 observer가 observable 값이 변할 때 컴포넌트의 forceUpdate를 호출하게 함으로써 변화가 화면에 반영된다. 

```javascript
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject(({ market }) => ({ total: market.total }))
@observer
class TotalPrice extends Component {
  render() {
    const { total } = this.props;
    return (
      <div>
        <hr />
        <p>
          {total}
        </p>
      </div>
    );
  }
}

export default TotalPrice;
```
<br>

### MobX의 React 컴포넌트 최적화

* 리스트를 렌더링할 때는 컴포넌트에 리스트 관련 데이터만 Props로 넣는다.

* 세부참조는 최대한 내부의 컴포넌트에서 한다.

```javascript
@observer class MyComponent extends Component {
    render() {
        const {todos, user} = this.props;
        return (<div>
            {user.name}
            <ul>
                {todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
            </ul>
        </div>)
    }
}
```
위에서 user.name observable만 변경되어도 컴포넌트가 리렌더링되기 때문에, 리스트는 다음과 같이 따로 분리시키는 것이 좋다.

```javascript
@observer class MyComponent extends Component {
    render() {
        const {todos, user} = this.props;
        return (<div>
            {user.name}
            <TodosView todos={todos} />
        </div>)
    }
}

@observer class TodosView extends Component {
    render() {
        const {todos} = this.props;
        return (<ul>
            {todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
        </ul>)
    }
}
``` 