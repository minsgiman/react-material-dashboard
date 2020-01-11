# tsconfig의 lib 옵션

Typescript로 컴파일시 아래와 같은 Promise 에러가 발생하게 되었다.<br>

    TS2585: 'Promise' only refers to a type, but is being used as a value here. ...
    
tsconfig.json의 lib 옵션 설정을 통해 이를 해결하게 되어 lib 옵션에 대해 정리하였다.<br><br>

### lib 옵션의 의미

* lib 옵션은 컴파일에 포함될 라이브러리 목록이다. 필요한 라이브러리 목록을 다음과 같이 정의한다.

            {
              "compilerOptions": {
                "outDir": "./built/",
                "sourceMap": true,
                "strict": true,
                "module": "esnext",
                "moduleResolution": "node",
                "target": "es5",
                ...
                "lib": [
                  "dom",
                  "es5",
                  "es2015.promise"
                ]
              }
            }

* lib 옵션을 선언하지 않으면 target 에서 지정한 ECMAScript의 버전에 따라 default값이 정해진다.

        target es5 -> dom, es5, scripthost
        target es6 -> dom, dom.iterable, es6, scripthost
        
* target을 es5로 선언하고, es6에서 등장한 Promise를 사용하려면 "es2015.promise" 라이브러리를 추가해주어야 한다.
<br><br>
        
### lib 옵션에서 사용가능한 Library 목록

        ES5
        ES6
        ES2015
        ES7
        ES2016
        ES2017
        ESNext
        DOM
        DOM.Iterable
        WebWorker
        ScriptHost
        ES2015.Core
        ES2015.Collection
        ES2015.Generator
        ES2015.Iterable
        ES2015.Promise
        ES2015.Proxy
        ES2015.Reflect
        ES2015.Symbol
        ES2015.Symbol.WellKnown
        ES2016.Array.Include
        ES2017.object
        ES2017.SharedMemory
        ES2017.TypedArrays
        esnext.asynciterable
        esnext.array
        esnext.promise