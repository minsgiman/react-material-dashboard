# HTTP Security Header

Security Header는 웹사이트 보안의 가장 기본적인 부분이다.<br>
이 헤더를 통해 여러 공격 유형인 XSS, injection, clickjacking 등으로부터 보호될 수 있다.<br>
<br>

## 점검
다음 사이트를 통해 Security Header가 제대로 설정되어 있는지 점검 해볼 수 있다.<br>
[Mozilla Observatory 테스트](https://observatory.mozilla.org/)<br>
[Security Headers Sponsored by netsparker 테스트](https://securityheaders.com/)<br>
<br>

## Security Header 종류

다음의 Security Header에 대하여 알아보았다.<br>
* Content-Security-Policy
* X-Frame-Option
* X-Content-Type-Options
* Strict-Transport-Security
* X-XSS-Protection

<br>

#### 1. Content-Security-Policy

브라우저에 XXS와 관련된 공격을 막아주는 헤더<br>
브라우저는 기본적으로 페이지에서 요청하는 모든 코드를 다운로드하여 실행한다.<br>
하지만 CSP를 설정함으로써 브라우저에 어떠한 조건의 리소스만 실행하거나 렌더링 하도록 지시를 내릴 수 있다. (whitelist)<br>
지시문의 종류는 default-src, script-src, child-src등 다양하게 존재한다.<br>
또한 각 지시문에는 다음 4개의 키워드를 선택 적용할 수 있다.<br>
* 'none' : 어떤 것도 허용하지 않는다.
* 'self' : 현재 출처에서는 허용하지만 하위 도메인에서는 허용되지 않는다.
* 'unsafe-inline' : 인라인 자바스크립트 &lt;script&gt; ... &lt;/script&gt;, 인라인 스타일 &lt;style&gt; ... &lt;/style&gt;을 허용한다.
* 'unsafe-eval' : eval과 같은 텍스트 - 자바스크립트 메커니즘을 허용한다.
<br><br>

(Content-Security-Policy 예시 1)
```text
Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net;
img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'
```
1. default-src 'none'<br>
    기본적으로 모든 리소스를 차단한다. 이것만 설정되는 경우 사이트는 아무것도 동작하지 않는다.<br>
2. script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net;<br>
    script, style, img는 cdn.mybank.net을 통해 다운로드 되는 리소스만 허용한다.<br>
3. connect-src https://api.mybank.com;<br>
    외부로의 데이터 요청(xhr)등은 api.mybank.com에서 응답 받은 내용만 가능하다.<br>
4. child-src 'self'<br>
    iframe등의 하위요소는 동일 도메인(서브 도메인도 허용되지 않음)만 가능하다.<br>
    
위와 같이 설정하면 inline으로 작성된 &lt;script&gt;&lt;/script&gt; 안의 내용은 모두 실행되지 않는다.<br>
모든 script는 외부 js 파일에 담겨 있어야 동작한다.<br>
&lt;style&gt;&lt;/style&gt;도 물론 처리되지 않는다.
<br><br>

(Content-Security-Policy 예시 2)
```text
Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline' 'unsafe-eval';
style-src https: 'unsafe-inline'
```
1. default-src https:<br>
    https:로 시작하는 모든 요청을 허용한다.<br>
2. script-src https: 'unsafe-inline' 'unsafe-eval'<br>
    https:로 시작하는 script를 허용하며 페이지 내에 선언된 &lt;script&gt; ... &lt;/script&gt; 와 element에 추가된 onclick과 같은 script가 허용된다.<br>
<br>

#### 2. X-Frame-Option
X-Frame-Options 헤더는 clickjacking attack을 방지하기 위해 사용하는 헤더이다.<br>
&lt;iframe&gt, &lt;embed&gt or &lt;object&gt tag에 페이지 렌더링을 허용할지 말지를 정의 할 수 있다.
* SAMEORIGIN : 동일한 출처에 대한 것만 표시한다.
* DENY : 렌더링을 허용하지 않는다.
* ALLOW FROM https://www.google.com : https://www.google.com에 대해서만 허용한다.

<br>

#### 3. X-Content-Type-Options
X-Content-Type-Options 헤더는 리소스를 다운로드할 때 해당 리소스의 MIMETYPE이 일치하지 않는 경우 차단을 할 수 있다.
```text
X-Content-Type-Options: nosniff
``` 
위 처럼 설정하는 경우 styleSheet는 MIMETYPE이(Content-Type 헤더 참조) text/css와 일치할 때 까지 styleSheet를 로드하지 않는다.<br>
또한 공격자가 다른 확장자(jpg)로 서버에 파일을 업로드 한 후 script태그등의 src의 경로를 변경하여 script를 로드하는 등의 공격을 막아준다.

<br>

#### 4. Strict-Transport-Security
[HSTS](https://rsec.kr/?p=315) 설정 헤더이다.
사용자가 최초로 사이트에 접속시도를 하게 되면 웹서버는 Strict-Transport-Security 헤더를 통해 HSTS 설정에 대한 정보를 브라우저에 응답한다.<br>
브라우저는 이 응답을 근거로 일정시간(max-age) 동안 HSTS 응답을 받은 웹사이트에 대해서 https 접속을 강제화 하게 된다. 
```text
Strict-Transport-Security: max-age=31536000;includeSubDomains;preload
```
Client에서 https로 강제 하기 때문에 Plain Text(HTTP)를 이용한 연결 자체가 최초부터 시도되지 않으며 Client 측에서 차단되는 장점이 있다.

<br>

#### 5. X-XSS-Protection
X-XSS-Protection는 공격자가 XSS공격을 시도할 때 브라우저의 내장 XSS Filter를 통해 공격을 방지할 수 있는 헤더이다.<br>
```text
X-XSS-Protection: 1;mode=block
```
위 처럼 설정한 경우 브라우저가 XSS공격을 감지하면 자동으로 내용을 치환한다.<br> 
mode=block 유무에 따라 내용만 치환하고 사용자화면에 보여주거나 페이지 로드 자체를 block할 수 있다.<br>
위 헤더는 브라우저의 내장 XSS Filter에 의해 처리 되므로 각 브라우저마다 처리 방식이 다를 수 있다.<br> 
모든 공격을 막을 수는 없기 때문에 추가적으로 Filter를 설정하여 방어해야 한다. 


