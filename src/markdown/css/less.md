# LESS (The dynamic stylesheet language) 

#### LESS는 stylesheet를 작성하는 데 있어 Variable, Mixin, Nested Rule, Operation, Function과 같은 Script 기능을 제공한다.

#### 또한 LESS 임포트 (@import "lib.less";)를 통하여 외부 less 혹은 css를 쉽게 import할 수 있다.

.

## 1. Variable

 - 변수를 선언하여 사용가능하다.

        @lightCyan: #73cbdc;
        
        #container {
            color: @lightCyan;
        }
    
.

## 2. Mixin
 
 - 믹스인(Mixin)은 한 클래스 안에서 하나의 속성 이름으로 지정하는 방식을 통해 다른 클래스의 모든 속성들을 포함시킬 수 있게 해준다.
 - 이것은 마치 변수들 같지만 사실은 클래스 전체를 의미한다. 믹스인은 또한 함수처럼 변수도 받아들인다.
 
        .rounded-corners (@radius: 5px) {
            border-radius: @radius;
            -webkit-border-radius: @radius;
            -moz-border-radius: @radius;
        }
        
        #header {
            .rounded-corners;
        }
        #footer {
            .rounded-corners(10px);
        }
        
.

## 3. Nested Rule
        
 - Nested Rule로 상위선택자를 반복해서 안써도 된다.
 - CSS에서 DOM구조 추적이 쉽다
 - 부모 선택자를 참조하는 경우에 & 를 사용할 수 있다. (&:hover)
        
        #contents {
            h2 {
                font-size: 24px;
            }
            p {
                font-size: 12px;
                a {
                    text-decoration: none;
                    &:hover {
                        color: #73cbdc;
                    }
                }
            }
        }
   
.

## 4. Operation

 - LESS에서 사칙연산이 가능하다. 크기 및 색상과 관련된 속성에 적용가능하다.
 
        @base-font-size: 12px;
        @base-font-color: #2e2d2c;
        
        body {
            font: @base-font-size/1.5 "나눔 고딕";
            color: @base-font-color;
        }
 
        .article {
            font-size: @base-font-size * 1.2;
            border: 1px solid (@base-font-color + #909090);
        }

.

## 5. Function

 - Function을 사용하여 값을 손쉽게 변경 가능하다.
 
        @base-font-size: 12px;
        @base-font-color: #2e2d2c;
            
        .article {
            font-size: @base-font-size * 1.2;
            border: 1px solid lighten(@base-font-color, 15%);
        }