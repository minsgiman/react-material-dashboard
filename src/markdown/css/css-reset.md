# CSS Reset

box-sizing default 값인 content-box대신 border-box를 사용<br>
(width, height, padding, border, margin 계산을 쉽게 하기 위함)
```css
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```
<br>

margin, padding을 모두 제거한다.<br>
element에 따라 default로 margin, padding이 설정되어 있는 경우가 있음
```css
/* Reset margins and paddings on most elements */
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
pre,
blockquote,
figure,
hr {
  margin: 0;
  padding: 0;
}
```
<br>

unordered list의 default style인 disc style을 사용하지 않는다.
```css
/* Removes discs from ul */
ul {
  list-style: none;
}
``` 
<br>

대부분 form elements(input, select, textarea, button)는 font style을 부모로 부터 상속받지 않는다.<br>
(default로 font property가 "400 11px system-ui" 로 설정되어 있다.)<br>
부모로부터 상속받도록 설정한다. 그리고 border style도 browser마다 다르므로 초기화해준다.
```css
input,
textarea,
select,
button {
  color: inherit; 
  font: inherit; 
  letter-spacing: inherit; 
}

input,
textarea,
button {
  border: 1px solid gray; 
}
```
<br>

button에 초기화 속성을 추가한다.
```css
button {
  border-radius: 0; 
  padding: 0.75em 1em;
  background-color: transparent;
  cursor:pointer;
}
```
<br>

button 내부의 element에는 pointer-events: none을 설정하여 click, hover, active 등의 커서 이벤트들을 비활성화한다.<br>
button 내부 element를 클릭했을 때, 이벤트 콜백에서 event.target이 button이 아니라 클릭한 내부 element가 되기 때문이다.
```css
button * {
  pointer-events: none;
}
```
<br>

images, videos, objects, iframes, embed와 같은 Media element들은 container의 width를 넘어가지 않도록 초기화한다.<br>
그리고 display default 값이 inline인데 이런 경우 container의 line-height 때문에<br> 
아래쪽에 원치않는 빈공간이 생길 수 있다. 그래서 display: block 을 설정한다.
```css
embed,
iframe,
img,
object,
video {
  display: block;
  max-width: 100%;
}
```
<br>

table에 초기화 속성을 추가한다.
```css
table {
  table-layout: fixed;
  width: 100%;
}
```
<br>

hidden 속성을 가진 경우 display: none을 설정한다.
```css
[hidden] {
  display: none !important;
}
```
<br>
