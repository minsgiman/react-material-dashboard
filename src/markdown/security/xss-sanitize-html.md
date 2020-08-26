# XSS와 sanitize-html

### Cross-Site Scripting (XSS) (크로스 사이트 스크립팅)
* 신뢰할 수 없는 데이터가 응용 프로그램의 새 웹 페이지에 포함되거나 사용자가 제공한 데이터로 JavaScript 작성 기능이 있는 브라우저 API를 사용하여 기존의 웹 페이지가 업데이트될 때 발생하는 취약점
* 침입자는 이 방법을 통해서 브라우저에 스크립트를 삽입하고 실행할 수 있다.
* 공격자가 희생자의 브라우저 사용자 세션을 도용하거나, 웹 사이트를 변조시키거나, 악성 사이트로 리다이렉션 시킴

<br>

### 대응 (sanitize-html)
게시판이라는 웹 서비스가 있을 때, 누군가가 본문의 내용으로 &lt;script&gt; 공격 코드 &lt;/script&gt; 를 작성했다고 생각해보자.<br>
서버 단에서 아무런 조치를 취하지 않았다면, 다른 서비스 이용자가 해당 게시물에 접근했을 때 곧바로 공격이 이루어질 수 있다.<br>
따라서 &lt;script&gt;와 같은 위험한 태그들을 사전에 예방해야 한다.

XSS를 막는 방법으로 Parameter, input 등의 입력값을 제한하거나, 입력된 특수문자를 치환하는 방법이 있다.<br>
치환된 문자는 브라우저가 렌더링하여 특수문자로 보여지지만 스크립트로 실행되지 않게 방어할 수 있다.
```text
< → &lt;
> → &gt;
" → &quot;
' → &#39;
```
<br>

JS에서 XSS에 대응하기 위한 모듈로 [sanitize-html](https://www.npmjs.com/package/sanitize-html)이 있다.<br>
sanitize-html은 script 태그를 제거하고 HTML 태그를 허용하는 경우에는 화이트리스트를 선정하여 해당 Tag 및 Attribute만 입력 가능하도록 설정하는 기능 등이 있다.<br>
웹프론트와 NodeJS에서 모두 사용할 수 있다.

```js
import sanitizeHtml from 'sanitize-html';

var dirty = "<script>some really tacky HTML<" + "/script><h1>H1 Title</h1>";
console.log(dirty);

var clean1 = sanitizeHtml(dirty);
console.log(clean1);

var clean2 = sanitizeHtml(dirty, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'h1'],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com']
});
console.log(clean2);

// <script>some really tacky HTML</script><h1>H1 Title</h1>
// H1 Title
// <h1>H1 Title</h1>
```



