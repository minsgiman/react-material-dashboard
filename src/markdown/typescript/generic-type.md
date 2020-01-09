# 제네릭(Generic) 타입

### Generic을 사용하는 이유

* 제네릭은 어떠한 클래스 혹은 함수에서 사용할 타입을 그 함수나 클래스를 사용할 때 결정하는 프로그래밍 기법을 말한다.

* 특정 타입을 위해 만들어진 클래스나 함수는 다른 타입을 위해 재사용할 수가 없다. 제네릭을 사용하면 다양한 타입을 처리하여 범용적으로 사용할 수 있다.

<br>

### Generic을 사용한 Class 구현

* 아래는 타입 변수 'T' 를 사용하는 Stack Class 이다. 해당 클래스를 사용하는 시점에 타입 변수 'T'에 원하는 타입을 바인딩 할 수 있다.  

        class Stack<T> {
            private data: T[] = [];
    
            constructor() {}
    
            push(item: T): void {
                this.data.push(item);
            }
    
            pop(): T {
                return <T>this.data.pop();
            }
        }

* 위에서 정의한 Stack Class를 사용하면서 <type\> 을 지정해주고 있다. 지정한 <type\>과 다른 타입을 push하면 컴파일 에러가 발생한다.

        const numberStack = new Stack<number>();
        const stringStack = new Stack<string>();
        numberStack.push(1);
        stringStack.push('a'); 

<br>

### Generic 함수 구현

* 함수 호출시 타입을 지정해준다.

        function first<T>(arr: T[]): T {
            return arr[0];
        }
    
        first<number>([1, 2, 3]); // 1

* 두 개 이상의 타입변수를 사용

        function toPair<T, U>(a: T, b: U): [ T, U ] {
            return [ a, b ];
        }
    
        toPair<string, number>('1', 1); // [ '1', 1 ]
        toPair<number, number>(1, 1); // [ 1, 1 ]
        
<br>

### Generic 제약조건 (Generic Constraints)

* 아래 예제에서 arg의 length 프로퍼에 접근하려고 하지만 컴파일러는 모든 타입이 length 속성을 가지고 있음을 알 수 없다.

        function loggingIdentity<T>(arg: T): T {
            console.log(arg.length);  // 오류 : T는 .length 메소드를 가지고 있지 않습니다.
            return arg;
        }
        
* 위 예제에서 모든 타입으로 작업하는 대신 length 프로퍼티를 가진 모든 타입에서 동작하도록 제한을 걸어야 한다.

* 타입변수 상속을 통하여 제약조건을 걸어서 이 문제를 해결 할 수 있다.

        interface Lengthwise {
            length: number;
        }
        
        function loggingIdentity<T extends Lengthwise>(arg: T): T {
            console.log(arg.length);  // 이제 .length 프로퍼티가 있으므로 더이상 오류가 없습니다.
            return arg;
        }
        
        loggingIdentity({length: 10, value: 3}); // length가 필수 프로퍼티 이므로 같이 전달해야 한다.
<br>

### 

***
 
### 참조
 
* Typescript Generics<br>
 <https://github.com/typescript-kr/typescript-kr.github.io/blob/master/pages/Generics.md>