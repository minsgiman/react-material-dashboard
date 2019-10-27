# Redux

***

### Redux는?

  - Javascript App에서 data-state와 UI-state를 관리해주는 도구
  - Flux 디자인패턴을 편하게 사용할 수 있도록 해주는 라이브러리
  
### MVC패턴의 단점
  
  - Model과 View가 늘어날수록 수많은 Model과 View사이의 바인딩 관계가 얽혀서 복잡도가 증가한다.
  - 어떤 Model이 View를 건들이고, 그 View가 어떤 또 다른 Model을 건들이고 하는 양방향 데이터 바인딩
  - 양방향 데이터 바인딩이 있기 때문에 한 Model을 업데이트 한 뒤 다른 Model을 업데이트 해야하는 순차적인 업데이트 발생하고, 이것이 늘어나면 사용자 인터랙션의 결과를 예측하기 어렵다.
  - 반면, Flux와 같이 일방적인 데이터 흐름에서 일어나는 데이터 변화는 훨씬 더 예측하기 쉽다. (Flux의 Dispatcher가 모든 데이터 흐름을 관리하는 허브역할)
  
### Flux 패턴

  - Action -> Dispatcher -> Store -> View
  - 시스템에서 어떠한 Action을 받았을 때 Dispatcher가 받은 Action들을 통제하여 Store에 있는 Data를 업데이트한다. 그리고 변동된 Data가 있으면 View에 리렌더링한다.
  - View에서 Dispatcher로 Action을 보낼 수도 있다.
  - Dispatcher는 작업이 중첩되지 않도록 해준다. 즉, 어떤 Action이 Dispatcher를 통하여 Store에 있는 Data를 처리하고 있는 동안 다른 Action들을 대기시킨다.
  - Flux는 Store가 비대해지면 다수의 Store로 분리하는 반면에 Redux는 **단일 Store, 다수의 Reducer** 전략을 택하여, Redux에서 Store는 컴포넌트와 Reducer를 연결하는 얇은 레이어일뿐이다. (상태를 처리하는 행위는 Reducer가 책임진다.) 
  
### Redux의 3가지 원칙

  - Single Source of Truth : Redux는 App의 state를 위해 단 한개의 store를 사용한다. 모든 state가 한 곳에 있다.
  - State is read-only : 컴포넌트등에서 직접 state를 변경할 수 없다. state를 변경하기 위해서는 action이 dispatch되어야 한다.
  - Changes are made with Pure Functions : 받아온 action객체를 처리하는 함수를 Reducer라고 부른다. action은 어떤 변화가 일어나야 할지 알려주고, Reducer는 그 정보를 받고 App의 상태를 어떻게 바꿀지 정의한다.
  
### 3번째 원칙 - Reducer는 순수함수로만 작성되어야 한다.
 
  - 외부네트워크 혹은 DB에 접근하지 않아야 한다. (외부상태에 영향받지 않는다.)
  - return값은 오직 parameter 값에만 의존되어야 한다.
  - 인수는 변경되지 않아야 한다.
  - 순수하지 않은 API호출을 하지 말아야 한다. (Date 및 Math의 함수 등)
  
### Redux Data-flow

  - 1) 뷰가 Action을 생성한다. Action 생성자가 포맷을 변환한 뒤 돌려준다.
  - 2) 뷰가 Store에게 Action을 보낸다.
  - 3) Store가 Action을 받는다. 그러면 Store가 현재 App의 상태트리와 Action을 Root Recuer에게 보낸다.
  - 4) Root Reducer가 상태트리를 조각으로 나눈 뒤 알맞은 서브 Reducer로 상태조각들을 넘겨준다.
  - 5) 서브 Reducer는 받은 상태조각을 복사한 뒤, 그 복사본을 변경한다. Root Reducer에게 변경된 복사본을 돌려준다.
  - 6) Root Reducer는 이 상태조각들을 한데 모아 상태트리로 만든 뒤 스토어에게 돌려준다. 스토어는 새로운 상태트리를 옛날 상태트리와 바꾼다.
  - 7) Store는 뷰 레이어 바인딩에게 상태가 변경되었다는 것을 알려준다.
  - 8) 뷰 레이어 바인딩은 스토어에게 새로운 상태를 보내달라고 요청한다.
  - 9) 새로운 상태를 받아서 뷰 레이어 바인딩은 뷰에게 화면의 특정 부분을 업데이트 하라고 한다. 

.

### Redux Code - Action

 - Action Type을 정의한다.
 - Action 생성자를 만든다.

        /* actionTypes.js */
        export const INCREMENT = "INCREMENT";
        export const DECREMENT = "DECREMENT";
        export const SET_COLOR = "SET_COLOR";
        
        /* actions.js */
        import * as types from './actionTypes';
        
        export function increment() {
            return {
                type : types.INCREMENT
            };
        }
        
        ...
        export function setColor(color) {
            return {
                type : types.SET_COLOR,
                color
            };
        }
            

.

### Redux Code - Reducer

 - 이전 상태와 액션을 받아서 다음 상태를 반환한다.
 - reducer 파일을 여러개로 분리할 때에 redux에서 제공하는 combineReducers를 통해 하나로 합쳐서 사용한다.

        /* reducers.js */
        import * as types from '../actions/actionTypes';
        
        const initialState = {
            number : 0
        };
        
        export default function counter (state = initialState, action) {
            switch (action.type) {
                case types.INCREMENT:
                    return {
                        ...state,
                        number: state.number + 1
                    };
                case types.DECREMENT:
                    return {
                        ...state,
                        number: state.number - 1
                    };
                default:
                    return state;
            }
        }
                         
.
                         
### Redux Code - Store

 - dispatch(action) : action을 reducer로 보낸다. 현재의 상태와 함께.
 - getState() : 현재상태를 반환한다.
 - subscribe(listener) : state가 바뀔때마다 실행될 콜백을 등록한다. unsubscribe function을 리턴한다.
 
        /* store.js */
        import { createStore } from 'redux';
        import reducers from './reducers';
        import * as types from './actions';
        
        const store = createStore(reducers);
        
        /* state 변경시 실행될 콜백 등록 */
        const unsubscribe = store.subscribe(() => console.log(store.getState()));
        
        /* reducer로 action을 보내고, reducer에서 리턴한 state로 변경된다. */
        store.dispatch(action.increment());
        store.dispatch(action.increment());
        store.dispatch(action.decrement());
        store.dispatch(action.setColor([200, 200, 200]));
        
        /* 위에서 등록한 state변경 콜백을 끊는다 */
        unsubscribe();
 
. 
  
### Redux Code - React컴포넌트에 redux연결

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

   