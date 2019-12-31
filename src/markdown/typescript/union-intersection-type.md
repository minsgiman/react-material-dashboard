# Typescript Union & Intersection 타입

### Intersection Types

* Intersection 타입은 여러 타입을 하나로 결합한다. 타입 간에 '&'를 사용하여 정의한다.

* 아래 코드에서 employee는 Animal, Person, Employee의 property들을 모두 가져야 한다.

            interface Animal {
              kind: string;
            }
            interface Person {
              firstName: string;
              lastName: string;
              age: number;
            }
            interface Employee {
              employeeCode: string;
            }
            let employee: Animal & Person & Employee = {
              kind: 'human',
              firstName: 'Jane',
              lastName: 'Smith',
              age: 20,
              employeeCode: '123'
            }
<br>

### Union Types

* Union 타입은 여러 타입들을 Intersection 타입과는 다른 방식으로 결합한다. Union은 결합된 각 타입의 property들을 가질 수도 있고 갖지 않을 수도 있다.<br> 
     타입 간에 '|'를 사용하여 정의한다.
    
* 아래 코드에서 employee는 Animal, Person, Employee의 property들을 가질수도 있고, 갖지 않을 수도 있다.

            interface Animal {
              kind: string;
            }
            interface Person {
              firstName: string;
              lastName: string;
              age: number;
            }
            interface Employee {
              employeeCode: string;
            }
            let employee: Animal | Person | Employee = {
              kind: 'human',
              firstName: 'Jane',
              lastName: 'Smith',
              age: 20  
            }
            console.log(employee)
            
* 하지만, employee의 멤버에 접근하려면 Union의 모든 타입에 공통으로 가지고 있는 멤버만 접근할 수 있다.<br>
    아래의 코드에서는 ERROR가 발생한다.<br>
    컴파일러는 Animal에는 kind가 있음을 알지만, Animal | Person | Employee 에는 kind가 있음을 확신할 수 없기 때문이다.<br>
    ERROR를 수정하려면 모두 kind를 넣어주거나 타입단언(Type Assertion) 또는 타입가드(Type Guard)를 사용해야 한다.

            ERROR
            Property 'kind' does not exist on type 'Animal | Person | Employee'.
            Property 'kind' does not exist on type 'Person'.(2339)
<br>

            interface Animal {
              kind: string;
            }
            interface Person {
              firstName: string;
              lastName: string;
              age: number;
            }
            interface Employee {
              employeeCode: string;
              age: string;
            }
            let employee: Animal | Person | Employee = {
              kind: 'human',
              firstName: 'Jane',
              lastName: 'Smith',
              age: '20'
            }
            console.log(employee.kind)
<br>

***
 
### 참조
 
* TypeScript Advanced Types<br>
      <https://github.com/typescript-kr/typescript-kr.github.io/blob/master/pages/Advanced%20Types.md>