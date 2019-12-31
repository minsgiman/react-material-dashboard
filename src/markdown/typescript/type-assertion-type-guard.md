# 타입단언(Type Assertion)과 타입가드(Type Guard)

### Type Assertion

* 타입 단언(Type Assertion)은 프로그래머가 수동적으로 컴파일러에게 특정변수에 대해 타입 힌트를 주는 것이다.
    
* 아래 코드는 컴파일 에러를 낸다. Character 클래스에는 fireBall, attack 메소드가 선언조차 되어있지 않기 때문이다.<br>
 하지만 프로그래머 입장에서 바라보면 isWizard라는 메소드를 통해 확실히 그 캐릭터가 Wizard 인스턴스라는 걸 보장할 수 있다면,<br>
 if 블록 안에서는 fireBall이라는 메소드를 사용할 수 있어야 한다.

                class Character {
                    hp: number = 100;
                    runAway() {
                        /* ... */
                    }
                    isWizard() {
                        /* ... */
                    }
                    isWarrior() {
                        /* ... */
                    }
                }
            
                class Wizard extends Character {
                    fireBall() {
                        /* ... */
                    }
                }
            
                class Warrior extends Character {
                    attack() {
                        /* ... */
                    }
                }
            
                function battle(character: Character) {
                    if (character.isWizard()) {
                        character.fireBall(); // ERROR: Property 'fireBall' does not exist on type 'Character'.
                    } else if (character.isWarrior()) {
                        character.attack(); // ERROR: Property 'attack' does not exist on type 'Character'.
                    } else {
                        character.runAway();
                    }
                }
                
* 위의 컴파일 에러를 타입단언을 통해 수정할 수 있다.

                function battle(character: Character) {
                  if (character.isWizard()) {
                    (character as Wizard).fireBall(); // or (<Wizard>character).fireBall()
                  } else if (character.isWarrior()) {
                    (character as Warrior).attack(); // or (<Warrior>character).attack();
                  } else {
                    character.runAway();
                  }
                }
            
* 하지만 타입단언을 많이 사용할수록 Typescript를 사용해서 얻는 장점이 점차 사라지기 때문에 가능한 적게 주의해서 사용해야 한다. 
<br><br>

### Type Guard

* 타입 가드는 타입 단언을 좀 더 깔끔하게 할 수 있도록 도와준다.<br> 
 앞의 예제에서 isWizard라는 메소드로 해당 인스턴스가 해당 타입이라는 사실을 확정했다.<br>
 하지만 이건 런타임에서만 알 수 있는 사실이고 TypeScript 컴파일러는 알 수 없었다.<br>
 타입 가드는 이러한 런타임에서의 타입 체크를 컴파일러에게 알려주는 기능이다.<br>
 아래와 같이 런타임에서 실제 타입검사를 하는 메소드의 리턴타입으로 {variable} is {Type} 문법을 사용해 선언해주면 된다.

            class Character {
              isWizard(): this is Wizard {
                return this instanceof Wizard;
              }
              isWarrior(): this is Warrior {
                return this instanceof Warrior;
              }
            }
<br>

***
 
### 참조
 
* TypeScript Advanced Types<br>
      <https://github.com/typescript-kr/typescript-kr.github.io/blob/master/pages/Advanced%20Types.md>