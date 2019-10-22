# React컴포넌트에 redux연결하기

***

### 전체 App의 container 컴포넌트 구현

 - 전체 App의 최상위 container 컴포넌트에서 store의 변경 이벤트를 구독하고, 하위 컴포넌트에 데이터를 전달한다.

        import React, { Component } from 'react';
        import { bindActionCreators } from 'redux';
        import Header from './Header';
        import MainSection from './MainSection';
        import * as TodoActions from '../actions/todos';
        import todoStore from '../store/todoStore';
        
        var actions = bindActionCreators(TodoActions, todoStore.dispatch);
        
        class TodoApp extends Component {
            constructor (props, context) {
                super(props, context);
                todoStore.subscribe(this._onChange.bind(this));
            }
            
            _onChange() {
                this.forceUpdate();
            }
            
            render() {
                return {
                    <div>
                       <Header addTodo={actions.addTodo} />
                       <MainSection todos={todoStore.getState()} actions={actions} />
                    </div>
                };
            }
        }

 - store가 변경될때 마다 forceUpdate를 실행하여 변경된 스토어 상태를 화면에 반영한다.
 - 화면에 업데이트 방법으로 react-redux패키지에서 shouldComponentUpdate()를 사용하는 방법도 있다.
 - Redux에서 제공하는 bindActionCreators 메서드를 사용하면 스토어의 dispath와 액션생성자를 바인딩하여 액션을 생성한 후 자동으로 디스패처에 전달해준다.

.

***
 
### 참조
 
  - Flux와 Redux
  
  <https://taegon.kim/archives/5288>


