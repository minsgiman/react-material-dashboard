# React.lazy 실패 시 retry하기

React에서 Page 단위로 JS 번들을 분리할 때 다음과 같이 Page 컴포넌트 번들의 lazy loading을 구현한다.

```js
import React, { lazy } from 'react';

const MenuMain = lazy(() => import(/* webpackChunkName: "MenuMain" */ '@pages/MenuMain')
// ...

export default function Menu() {
  return (
    <Switch>
      <Route path={ROUTES.MENU} component={MenuMain} />
    </Switch>
  );
}
```

### React.lazy 실패 처리

그런데, 초기 번들파일을 로드한 이후 중간에 Network연결이 끊긴 상태에서 페이지 이동을 한다면? <br>
해당 페이지의 번들파일 lazy load에 실패하고, 사용자는 에러화면을 보게 될 것이다. <br>
이런 경우 단순하게 사용자가 Network 연결 후 새로고침을 하게 할 수도 있지만, <br>
그러면 진행했던 flow가 날라가게 되거나 모바일 웹뷰에서는 사용자 경험 측면에서 좋지 않은 방법이 될 것이다.<br>
그러면 어떤 해결책이 있을까? <br>
App 전체를 refresh 하지 않고, 실패한 해당 페이지의 번들 로드만 네트워크 연결후에 다시 retry하여 진행하고 있는 flow를 그대로 진행할 수 있게 해주어야 한다.


### retryableLazy 구현

아래의 retryableLazy는 다음과 같이 동작한다.

 1. lazy load 를 수행하는 **lazyImport**와 lazy component를 set하는 **setComponent**를 Param으로 전달받는다.
 2. React.lazy 컴포넌트를 생성하여 component 변수에 할당한다. (setComponent를 통해서)
 3. import promise가 reject 되면 Network Error Page를 띄우고, 재시도 버튼을 눌렀을 때 호출할  콜백함수를 전달한다.
 4. 3번의 재시도 콜백함수가 호출되면 retryableLazy를 재귀로 호출하여 2번을 다시 수행한다.
 5. component에 새로운 React.lazy 컴포넌트가 할당되고 페이지를 re-rendering한다.

```js
import React, { lazy } from 'react';
import { ErrorUtility, logger } from '@utils';

type IDynamicImportType = () => Promise<{ default: React.ComponentType<any> }>;
type ISetComponentType = (component: React.ComponentType) => void;

export default function retryableLazy(lazyImport: IDynamicImportType, setComponent: ISetComponentType) {
  setComponent(
    lazy(
      () =>
        lazyImport().catch((error) => {
          logger.error(error, 'Dynamic component load error');
          ErrorUtility.showNetworkErrorPage(() => {
            retryableLazy(lazyImport, setComponent);
          });
        }) as ReturnType<IDynamicImportType>
    )
  );
}
```

### retryableLazy 사용

처음의 lazy load 코드는 retryableLazy를 사용하여 다음과 같이 변경된다.

```js
import React from 'react';

import { retryableLazy } from '@components-common/lazyLoad';

let MenuMain;

retryableLazy(
  () => import(/* webpackChunkName: "MenuMain" */ '@pages/MenuMain'),
  (component) => {
    MenuMain = component;
  }
);
// ...

export default function Menu() {
  return (
    <Switch>
      <Route path={ROUTES.MENU} component={MenuMain} />
    </Switch>
  );
}
```

### 참조
 
* React.lazy retry a rejected promise <br>
  <https://github.com/facebook/react/issues/14254#issuecomment-441717770>


