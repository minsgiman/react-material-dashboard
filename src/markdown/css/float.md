# float 속성 이해

*** 

#### float 속성 동작 (left, right, inherit, none)

 - html의 normal flow에서 block element는 화면의 위에서 아래로 차곡차곡 배치된다. float속성이 적용된 요소들도 normal flow에 따라 왼쪽 또는 오른쪽 끝으로 배치된다.
 - 단, 배치된 다음에는 normal flow의 흐름에서 제외된다.
 - normal flow의 흐름에서 제외되기 때문에 다음에 배치되는 block요소는 float적용된 요소가 없는 것으로 간주하고 배치된다.
 - float이 적용되지 않은 요소는 위에서 아래로 순차적으로 배치되는 반면에, float 적용되면 좌측이든 우측이든 비어있는 공간이 있으면 그 자리에 배치된다.
 
#### clear 속성 동작 (left, right, both, inherit, none)

 - left값이 적용된 clear속성을 가지는 요소는 float속성값이 left인 요소의 아래에 배치된다. 즉 앞의 float속성이 같은 요소를 normal flow에서 제외하지 않고, 배치된다.
 - both는 left, right의 float속성을 가지는 요소 둘 다의 아래에 배치된다.
 
#### Collapsing

 - Collapsing은 float된 element들이 float되지 않은 요소들로 덮이지 않는 경우 발생한다.
 - 이 경우 float된 요소들은 올바른 영역을 확보하지 못하여 부모 요소 밖으로 넘어가거나 한다.
 - 빠른 해결책은 float요소를 먼저 배치하는 것이다.
 - 다른 해결책은 부모요소에 overflow:hidden을 사용하거나, :after 를 사용하는 방법이 있다. 
 
***         
         
### 참조

 - float속성의 모든 것
 
   <http://itux.tistory.com/entry/CSS-Float%EC%86%8D%EC%84%B1%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83>
