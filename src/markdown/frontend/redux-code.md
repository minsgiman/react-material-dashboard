# Redux Code 구현

***

### Action

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

### Reducer

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
                         
### Store

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