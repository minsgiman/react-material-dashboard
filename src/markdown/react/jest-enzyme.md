# Jest, Enzyme 을 사용한 React 컴포넌트 테스트

***

### Jest, Enzyme 을 사용한 이유

 - Jest (JavaScript unit testing framework. Jest as the test runner, assertion library, and mocking library)
 
   * 간단한 설정
   * 스냅샷 테스트
   * 변경 사항에 대한 테스트만 재실행하는 Interactive한 감시모드
   * 유용한 Fail Message
   * Mocks와 Spies
   
 - Enzyme (JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components’ output) 
 
   * Enzyme은 얕은 렌더링, 정적 렌더링 된 마크 업 또는 DOM 렌더링 Method를 지원
   * 엘리먼트를 찾고(find), 컴포넌트의 props 등을 읽는 것이 편리함    
  
.  

### Setup

 - Install Jest
 
   *  npm install --save-dev jest jest-mock

 - Install Enzyme
 
   *  npm install --save-dev enzyme enzyme-adapter-react-16 enzyme-to-json 

 - Update package.json
 
 
           "scripts": {
               "test": "jest"
           },
           ...
           "jest": {
               "setupFiles": [
                 "./src/setupTests.js"
               ],
               "snapshotSerializers": [
                 "enzyme-to-json/serializer"
               ]
           }

       
 - Create a setupTests.js file at ./src/setupTests.js:
       

            import { configure} from 'enzyme';
            import Adapter from 'enzyme-adapter-react-16';
            
            configure({ adapter: new Adapter() });
        
       
 - Test 파일 생성
   
    * Jest는 test코드 파일을 다음위치에서 찾는다.
    
      - Files with .js suffix in \_\_tests\_\_ folders.
      
      - Files with .test.js suffix.
      
      - Files with .spec.js suffix.            

.

### Enzyme을 통한 컴포넌트 렌더링

  - enzyme에는 세 가지 렌더링 Method가 있다. 
  
   * shallow : 간단한 컴포넌트를 메모리 상에 렌더링한다. 단일 컴포넌트를 테스트할 때 유용하다.

   * mount : 자식 컴포넌트를 포함하여 전부 렌더링한다. 다른 컴포넌트와의 관계를 테스트하거나 DOM API 및 React lifecycle method를 사용하는 컴포넌트를 테스트할 때 유용하다.
   
   * render : 자식 컴포넌트를 포함하여 정적인 html로 렌더링한다. React lifecycle method는 테스트할 수 없다.


            import { mount } from 'enzyme';
            
            ...
            let component = null;
            
            beforeEach(() => {
                component = mount(<SelectDlg onDlgClose={()=>alert('close')}
                                             title={title}
                                             message={message}
                                             onSelect={selectFn}
                                             firstvalue={okValue}
                                             secondvalue={nokValue}/>);
            });
            
            afterEach(() => {
                component.unmount();
            });

.

### 스냅샷 테스트

 - Jest에서 지원하는 스냅샷 테스트는, 테스트완료시 렌더링결과를 스냅샷을 찍어서 만들어놓고 (\_\_snapshots\_\_ 폴더), 다음 테스트시 렌더링결과를 이전 스냅샷과 비교한다. 렌더링 결과가 달라졌다면, 테스트 실패를 발생시킨다.
 
 - 스냅샷 테스트 실패가 발생하였을 때, 개발자는 현재 결과가 제대로 된것이라면 "u" 키를 눌러서 스냅샷을 현재 결과물로 업데이트 할 수 있다.


        it('match snapshot', () => {
            expect(component).toMatchSnapshot();
        });

.

### Props 테스트

 - Enzyme에서는 컴포넌트 인스턴스에 접근할 수 있다. 
 
 - 컴포넌트의 Props를 조회한다.
 
 - find를 사용하여 DOM Element를 선택할 수 있다.
 
 
        it('renders title and message', () => {
            expect(component.props().title).toBe(title);
            expect(component.props().message).toBe(message);
            expect(component.find('h2').contains(title)).toBe(true);
            expect(component.find('p').text()).toBe(message);
        });

.

### 이벤트 시뮬레이션 테스트

 - simulate Method를 통해 이벤트를 시뮬레이트 할 수 있다.
 
 - Jest-mock을 통해 가짜 함수(mock function)를 생성하여 simulate 이벤트 콜백을 테스트한다.
 
 - mock function은 테스트가 실행되는 동안 가짜함수에 어떤일들이 발생했는지를 기억하기 때문에 가짜함수가 내부적으로 어떻게 사용되는지 검증할 수 있다.


        import jest from 'jest-mock';
        
        ...
        const okValue = 'ok';
        const nokValue = 'nok';
        const selectFn = jest.fn();
        let component = null;
        
        beforeEach(() => {
            component = mount(<SelectDlg onDlgClose={()=>alert('close')}
                                         title={title}
                                         message={message}
                                         onSelect={selectFn}
                                         firstvalue={okValue}
                                         secondvalue={nokValue}/>);
        });
    
        ...
        ...
    
        it('click select button', () => {
            const firstBtn = component.find('button:first-child');
            firstBtn.simulate('click');
            expect(selectFn).toBeCalledWith(okValue);
        });


.   
 
***
 
### 참조
 
  - Testing React components with Jest and Enzyme
  
  <https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f#.smlkmw7m1>
  
  
  - Testing React with Jest and Enzyme I
  
  <https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675>
  
  - Jest docs
  
  <https://jestjs.io/docs/en/getting-started>
  
  - Enzyme docs
  
  <https://airbnb.io/enzyme/>