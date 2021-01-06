# MobX와 React hooks 함께 사용하기

## 사용 Version
* mobx: 6.0.4
* mobx-react: 7.0.5
<br><br>

## inject를 대체할 useStores hook

store를 가져오기 위한 helper함수를 만든다.<br>
**React.useContext** API는 파라미터로 전달된 Context의 현재 값을 반환한다.<br>
useContext와 함께 **MobXProviderContext**를 사용하면 mobx-react의 **Provider**가 제공하는 store객체를 가져올 수 있다.<br><br>

/src/stores/useStores.tsx
```javascript
import React from 'react';
import { MobXProviderContext } from 'mobx-react';

export function useStores() {
  return React.useContext(MobXProviderContext);
}
```

/src/App.tsx
```javascript
import React from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import { LoginStore, UserStore } from './stores';
import UserInfo from './components/userInfo';

const user = new UserStore(['paul', 'mike']);
const login = new LoginStore();

const App = () => {
	return (
          <Provider user={user} login={login}>
            <div>lorem</div>
            <UserInfo />
          </Provider>
	);
};

export default App;
```
<br>

## react 컴포넌트에서 store 사용
컴포넌트를 observer로 래핑해준다. 그러면 컴포넌트에서 의존성이 있는 mobx observable의 변화를 감지하고 리렌더링을 할 수 있다.<br>
앞에서 만든 useStores 헬퍼 함수를 사용해서 store객체를 가져온다.<br><br>

/src/components/userInfo.tsx 
```javascript
import { observer } from 'mobx-react';
import { useStores } from '../stores';

const UserInfo = observer(() => {
	const { user } = useStores();
	const addItem = () => {
		user.addName('added');
	};
	const updateText = () => {
		user.updateText('updated');
	};

	return (
            <div>
              <h2>{user.text}</h2>
              <button onClick={updateText}>update</button>
              {user.names.map((name: string, index: number) => {
                return <p key={`${name} + ${index}`}>{name}</p>;
              })}
              <button onClick={addItem}>add</button>
            </div>
	);
});

export default UserInfo;
```
<br>

## MobX Store 구현
**makeAutoObservable(this)**를 사용해서 해당 클래스를 옵저버블한 상태로 만든다.

/src/stores/UserStore.ts
```javascript
import { makeAutoObservable } from 'mobx';

export class UserStore {
    names: string[] = [];
    text: string = 'teststr';
    
    constructor(names: string[]) {
        this.names = names;
        makeAutoObservable(this);
    }
    
    addName = (name: string) => {
        this.names.push(name);
    };
    
    updateText = (text: string) => {
        this.text = text;
    };
}
```

