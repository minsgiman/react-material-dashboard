# d.ts 파일을 통한 타입선언

d.ts 파일은 기존의 .js에서 구현한 모듈을 Typescript에서 사용하기 위해 기존 .js 모듈의 타입정보를 선언해주는 역할을 한다.
<br><br>

### d.ts 모듈 설치

 * 패키지에서 타입 선언만 포함하는 모듈을 다음과 같이 제공해준다.
 
            npm install @types/modules-name 
            
            ex) npm install @types/jquery
            
 * 물론 제공하지 않는 경우도 많다. 이런 경우 모듈의 사용하는 부분만 선언해서 만든다.
<br><br>
 
### tsconfig의 typeRoots, types

 * typeRoots는 컴파일시에 자동으로 포함될 타입선언 패키지의 경로를 지정한다.
 
 * 다음과 같이 설정하면 "./node_modules/@types"와 "./@types" 아래의 모든 패키지가 컴파일시에 포함된다. default는 "node_modules/@types" 이다.
 
        {
            "compilerOptions" : {
                "typeRoots" : ["./node_modules/@types", "./@types"]
            }
        } 
 
 * types를 지정할 경우 나열된 패키지만 포함되고 typeRoots의 자동포함은 동작하지 않는다.
 
 * 다음과 같이 설정하면 "./node_modules/@types/node", "./node_modules/@types/lodash" 및 "./node_modules/@types/express"만 포함된다.
 
        {
            "compilerOptions" : {
                "types" : ["node", "lodash", "express"]
            }
        } 
<br>

### d.ts 작성

타입스크립트로 작성중인 코드에서 다음과 같이 모듈을 사용할때 

        import moduleA from 'moduleA'
        
해당 모듈에 대한 타입선언을 찾을 수 없다는 에러를 만나고, @types/moduleA 패키지도 npm에 존재하지 않는다면 직접 타입선언을 정의해야 한다. 

        Could not find a declaration file for module ‘moduleA’. ...
        
다음 파일을 typeRoots로 지정된 디렉터리에 저장한다.

        // moduleA.d.ts
        declare module 'moduleA' {
            function createElement(
                type: string
            ): HTMLElement;
           
            export default createElement;
        }
<br>

### 

***
 
### 참조
 
* 타입스크립트 컴파일러가 모듈 타입 선언을 참조하는 과정<br>
 <https://medium.com/naver-fe-platform/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC%EA%B0%80-%EB%AA%A8%EB%93%88-%ED%83%80%EC%9E%85-%EC%84%A0%EC%96%B8%EC%9D%84-%EC%B0%B8%EC%A1%B0%ED%95%98%EB%8A%94-%EA%B3%BC%EC%A0%95-5bfc55a88bb6>
 
* typescript tsconfig.json<br>
 <https://typescript-kr.github.io/pages/tsconfig.json.html>



    
 