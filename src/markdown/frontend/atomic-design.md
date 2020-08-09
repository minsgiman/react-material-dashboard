# Atomic Design

디자인은 일관성이 있어야 한다. 한 사이트 내에 버튼, 입력 폼 등 요소들의 일관성이 없으면, 사용자는 사이트를 한 번에 파악하기 어렵고 불편을 느낄 것이다.<br>
만일 사이트에서 버튼들의 배경색이 초록색이었는데, 갑자기 특정한 버튼만 보라색으로 나오거나 다른 디자인으로 되어있다면 사용자는 어색함을 느낄 것이다.<br>
Atomic Design은 일관되고 재사용 가능한 디자인 설계 시스템을 구축하는 방법론이다.<br>
웹사이트 레이아웃을 기본 구성 요소로 분해한 다음, 사이트 전체에서 재사용 가능하게 만든다.

<br>

### Atomic Design 5단계

아토믹 디자인은 총 5개의 단계가 있으며, 이 단계가 서로 연결되어 사이트를 완성한다.

#### 1. Atoms(원자)

* Atoms는 물질의 기본 구성으로써, 다른 컴포넌트를 include 하지 않은 가장 작은 컴포넌트 단위이다. Vue에서 slot field 또한 포함하지 않는다.

* 어플리케이션의 Logic 을 포함하지 않는다.

* button, link, icon, image 등과 같은 HTML 태그이다.

#### 2. Molecules(분자)

* Molecules는 원자들로 구성된 집합이다. Molecules는 자신의 특성을 가지고 디자인 시스템의 중추 역할을 한다.

* 텍스트, 입력 폼, 버튼 등은 그 원자 자체로는 유용하지 않지만, Molecules라는 형태로 함께 결합되어 유용한 기능을 하게 된다.

* Atoms 또는 Molecules를 include 할 수 있으며, Vue에서 slot field 를 포함할 수 있다.

* Atoms 와 마찬가지로 어플리케이션의 Logic 을 포함하지 않는다.

* banner, card, dropdown, input-group, table 등이 있다.

#### 3. Organisms(유기체)

* Organisms는 원자들과 분자들로 구성된 집합이다. 뚜렷한 인터페이스를 형성한다.

* Organisms 은 login-form 과 같이 어플리케이션의 Logic 을 포함하고 있다.

* 대부분 style이나 html은 Atoms, Molecules를 include 하여 구성한다.

* login-form, post-grid, header, footer 등이 있다.

#### 4. Templates

* Template에서는 데이터를 연결하기 이전의 레이아웃을 생성한다. 템플릿은 원자, 분자, 유기체 모두가 하나로 합쳐진 것이며, 우리는 레이아웃이 실제로 어떻게 보이는지 확인할 수 있다.

* Template을 통해 반복적인 작업을 자동화하고 프로젝트나 고객의 요구에 따라 Template을 유용하게 사용할 수 있다.

#### 5. Pages

* Page는 템플릿의 특정 인스턴스이다.

* 템플릿으로 구성된 레이아웃에 데이터를 삽입하여 페이지가 만들어진다.

* 이미지가 템플릿에서 placeholder 컨텐츠로 보였다면, Page에서는 실제 컨텐츠로 대체된다.

<br>

### Atomic Design 장점

* 구성 요소를 혼합하여 일관성 있는 디자인을 만들 수 있다.

* 스타일 가이드를 간단하게 만들 수 있다.

* 레이아웃을 이해하기 쉬워진다.

* 보다 일관성 있는 코드를 작성할 수 있다.

* 신속한 프로토 타이핑을 할 수 있다.

* 디자인을 쉽게 추가, 수정, 제거할 수 있다.

<br>

### 이해와 노력

프로젝트에 참여하는 모두는 아토믹 디자인을 올바르게 알아야 한다.<br>
만일 아토믹 디자인에 대해 개발자만 이해하고 적용한다면, 개발자는 페이지 단위의 디자인을 요소까지 어떻게 만들지 끊임없이 고민하고 생각해야 한다.<br>
자연스럽게 기술 부채와 개발 기간은 늘어나고 디자인 시스템의 일관성은 떨어질 것이다.<br>
그럼으로 기획과 디자인부터 개발까지 모든 구성원이 디자인 시스템을 적용하기 위한 이해와 노력이 필요하다.

<br>

***

### 참조
* atomic-web-design<br>
<https://bradfrost.com/blog/post/atomic-web-design/>

* Finding the perfect component file structure for our VueJS App.<br>
<https://medium.com/@vuefront/finding-the-perfect-component-file-structure-for-out-vuejs-app-b808a69dacac>
