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

### 

***
 
### 참조
 
* Typescript Generics<br>
      <https://github.com/typescript-kr/typescript-kr.github.io/blob/master/pages/Generics.md>
      
      
          <https://hyunseob.github.io/2017/01/14/typescript-generic/>