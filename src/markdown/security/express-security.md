# Express 보안

## 더 이상 사용되지 않거나 취약성이 있는 버전의 Express를 사용 중지
Express 2.x 및 3.x에 대한 보안 및 성능 관련 유지보수는 더 이상 이루어지지 않는다.<br>
4 버전을 사용하지 않고 있다면 [마이그레이션](https://expressjs.com/ko/guide/migrating-4.html)하는 것이 좋다.

<br>

## TLS 사용
앱이 민감한 데이터를 다루거나 전송하는 경우에는 전송 계층 보안(TLS)을 사용하여 연결 및 데이터를 보호해야 한다.<br>
데이터를 클라이언트로부터 서버로 전송하기 전에 암호화하여 해킹을 방지한다.

<br>

## Helmet 사용
[Helmet](https://www.npmjs.com/package/helmet)을 이용하면 HTTP 헤더를 적절히 설정하여 몇 가지 잘 알려진 웹 취약성으로부터 App을 보호할 수 있다.<br>
Helmet은 보안 관련 HTTP 헤더를 설정하는 다음 미들웨어 함수들의 모음이다.

* csp : Content-Security-Policy 헤더를 설정하여 XSS(Cross-site scripting) 공격 및 기타 교차 사이트 인젝션을 예방한다.
* hidePoweredBy : X-Powered-By 헤더를 제거한다.
* hsts : 서버에 대한 안전한(SSL/TLS를 통한 HTTP) 연결을 적용하는 Strict-Transport-Security 헤더를 설정한다.
* ieNoOpen : IE8 이상에 대해 X-Download-Options를 설정한다.
* noCache : Cache-Control 및 Pragma 헤더를 설정하여 클라이언트 측에서 캐싱을 사용하지 않도록 한다.
* noSniff : X-Content-Type-Options 를 설정하여, 선언된 콘텐츠 유형으로부터 벗어난 응답에 대한 브라우저의 MIME 가로채기를 방지한다.
* frameguard : X-Frame-Options 헤더를 설정하여 clickjacking에 대한 보호를 제공한다.
* xssFilter : X-XSS-Protection을 설정하여 대부분의 최신 웹 브라우저에서 XSS(Cross-site scripting) 필터를 사용하도록 한다.

#### 설치
```text
npm install --save helmet
```

#### 사용
```js
var helmet = require('helmet')
app.use(helmet())
```

#### 적어도 X-Powered-By 헤더는 사용하지 않도록 설정
Helmet을 사용하지 않는다면 적어도 X-Powered-By 헤더는 사용하지 않도록 설정한다.<br>
공격자는 이 헤더(기본적으로 사용하도록 설정되어 있음)를 이용해 Express를 실행하는 앱을 발견한 후 특정한 대상에 대한 공격을 실행할 수 있다.<br>
다음과 같이 app.disable() 메소드를 이용해 이 헤더를 끈다.
```js
app.disable('x-powered-by')
```
<br>

## 쿠키를 안전하게 사용
쿠키로 인해 앱이 악용에 노출되지 않도록 하기 위해 기본 세션 쿠키 이름을 사용하지 않고 쿠키 보안 옵션을 적절히 설정해야 한다.<br>
두 개의 기본 미들웨어 쿠키 세션 모듈은 다음과 같다.<br>
* [express-session](https://www.npmjs.com/package/express-session)
* [cookie-session](https://www.npmjs.com/package/cookie-session)

두 모듈의 주요 차이점은 쿠키 세션 데이터 저장방식이다.<br>
express-session은 세션 데이터를 서버에 저장하며, 쿠키 자체에는 세션 ID만 저장한다.<br>
cookie-session은 세션 키가 아니라 세션 데이터 전체를 쿠키에 저장한다. 따라서 세션 데이터의 크기가 상대적으로 작으며 원시 값으로 쉽게 인코딩 가능할때만 사용해야 한다.<br>

#### 기본 세션 쿠키 이름을 사용하지 않음
기본 세션 쿠키 이름을 사용하면 앱을 공격에 노출시킬 수 있다.<br>
이로 인해 제기되는 보안 문제는 X-Powered-By와 유사하며, 잠재적인 공격자는 이를 이용해 서버의 지문을 채취한 후 이에 따라 공격 대상을 설정할 수 있다.<br> 
이러한 문제점을 피하려면 일반적인 쿠키 이름을 사용한다. express-session 미들웨어를 이용해 다음과 같이 설정한다.
```js
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

#### 쿠키 보안 옵션 설정
다음과 같은 쿠키 옵션을 설정하여 보안을 강화한다.
* secure : 브라우저가 HTTPS를 통해서만 쿠키를 전송하도록 합니다.
* httpOnly : 쿠키가 클라이언트 JavaScript가 아닌 HTTP(S)를 통해서만 전송되도록 하며, 이를 통해 XSS(Cross-site scripting) 공격으로부터 보호할 수 있다.
* domain : 쿠키의 도메인을 표시한다. URL이 요청되고 있는 서버의 도메인에 대해 비교할 때 사용한다. 두 도메인이 일치하는 경우에는 그 다음으로 경로 속성을 확인한다.
* path : 쿠키의 경로를 표시한다. 요청 경로에 대해 비교할 때 사용한다. 이 경로와 도메인이 일치하는 경우에 쿠키를 전송한다.
* expires : 쿠키의 유효기간을 설정하는 데 사용된다.

#### cookie-session 미들웨어를 사용한 예
```js
var session = require('cookie-session')
var express = require('express')
var app = express()

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))
```
<br>

## 사용하는 npm 모듈이 안전한지 확인
사용 중인 패키지에는 애플리케이션에 영향을 미칠 수 있는 치명적인 보안 취약성이 포함되어 있을 수도 있다.<br>
앱의 보안성은 종속 항목 내의 “가장 약한 링크”의 보안성에 따라 결정된다.<br>
npm@6부터 npm은 자동으로 모든 설치 요청을 검사한다. 또한 npm audit을 이용해 의존성 트리의 보안 취약성을 검사할 수 있다.
```text
npm audit
```

더 강한 보안 검사를 원한다면, [snyk](https://snyk.io/)를 사용한다.
```text
npm install -g snyk
cd your-app
```

아래 명령으로 어플리케이션의 취약점을 검사한다.
```text
snyk test
```

아래 명령으로 찾은 취약점을 고치는 패치나 업데이트를 받는 설치 마법사를 실행한다.
```text
snyk wizard
```

<br>

***

### 참조
 * Express Production Best Practices: Security<br>
<https://expressjs.com/en/advanced/best-practice-security.html>   
