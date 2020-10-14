# express에서 JWT사용하기

JWT 는 JSON Web Token의 약자로 클라이언트와 서버, 서비스와 서비스 사이 통신 시 권한 인가(Authorization)를 위해 사용하는 토큰이다.<br>
URL-safe(URL로 이용할 수있는 문자 만 구성된)하기 때문에 HTTP 어디든(URL, Header, ...) 위치할 수 있다.

<br>

## JWT 토큰 구성

JWT는 헤더 (Header), 페이로드 (Payload), 서명 (Sinature) 세 파트로 나누어지며, Json형태인 각 부분은 Base64로 인코딩된다.<br>
각 파트는 점으로 구분하여 xxxxx.yyyyy.zzzzz 이런식으로 표현된다.

#### Header
Header는 토큰의 타입(typ)과 Signature를 해싱하기 위한 알고리즘(alg)으로 이루어진다.
* typ: 토큰의 타입을 지정 ex) JWT
* alg: 해시 알고리즘 방식을 지정한다. ex) SHA256, RSA

#### Payload
Payload에는 토큰에 담을 클레임(claim)정보를 포함한다. 클라이언트와 서버 간 주고 받기로 한 값들로 구성된 JSON형태로 이루어져 있다.

#### Signature
점(.)을 구분자로 해서 헤더와 페이로드를 합친 문자열을 서명한 값이다.<br>
서명은 헤더의 alg에 정의된 알고리즘과 비밀키를 이용해 생성하고 Base64로 인코딩한다.

```text
signature = base64UrlEncode(
    Sign(
        'ES256',
        '${PRIVATE_KEY}',
        base64UrlEncode(header) + "." + base64UrlEncode(payload)
    )
)
``` 

<br>

## JWT의 장점과 단점

#### 장점

* JWT에는 필요한 모든 정보를 토큰에 포함하기 때문에 서버에서 인증시 DB 조회 비용을 줄일 수 있다.

* 세션정보를 서버에서 저장하고 있지 않아도 된다.

* 분산 마이크로 서비스 환경에서 중앙집중식 인증 서버에 의존하지 않아도 된다.

* 쿠키를 사용하지 않기 때문에 여러 도메인에서 API를 제공하더라도 문제가 발생하지 않는다. (Secret Key만 공유하면 된다.)

#### 단점

* 토큰은 클라이언트에 저장되어 서버에서 제어가 불가능하다. (토큰 만료시간을 꼭 넣어 주어야 한다.)

* 필드가 많이 추가되면 토큰이 커질 수 있으며, 데이터 트래픽 크기에 영향을 미칠 수 있다.

* Payload는 암호화가 아니라 Base64로 인코딩되었기 때문에, 중간에 탈취하여 데이터를 볼 수 있다. (Payload에 중요 데이터를 넣지 않아야 한다.)

<br>

## JWT 구현

#### 1. 서버 로그인 구현 (토큰 발급)
1) db에서 user정보를 찾아 password가 일치하는지 확인한다. (bcrypt를 사용하여 password를 암호화하여 저장하고 해싱한다.)<br>
2) SecretKey를 사용하여 jwt 토큰을 생성한다. 토큰만료는 7일로 설정하였다.<br>
3) jwt 토큰을 클라이언트에 전달한다.
```js
module.exports = {
  authenticate: async(req, res, next) => {
      if (!req.body || !req.body.id || !req.body.password) {
          return res.send({'code' : 'nok', 'error' : 'wrong parameter'});
      }
  
      try {
          const user = await userModel.findOne({id: req.body.id}).exec();
          if (user && bcrypt.compareSync(req.body.password, user.password)) {
              const token = jwt.sign({
                  id: user.id,
                  admin: user.admin
              }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
              return res.send({ code: 'ok', user: {id: user.id, admin: user.admin}, token: token });
          }
          return res.send({ code: 'nok', message: 'Invalid id or password' });
      } catch(err) {
          return next(err);
      }
  }
}
```

#### 2. 토큰 인증 구현
1) 클라이언트에서 API를 요청할 때 Authorization header에 다음과 같이 토큰을 보낸다. 
```json
{
  "Authorization": "Bearer {생성된 토큰 값}"
}
```
2) 서버는 인증이 필요한 경로에 접근할 때 JWT Signature를 체크하고 Payload로부터 사용자 정보를 확인한다.
 
```js
app.use('/translates', validateUser, translates);

function validateUser(req, res, next) {
    if (req.method === 'OPTIONS') {
        return res.send({ code: 'ok' });
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(" ")[1] : null;
    if (!token) {
        return res.status(401).json({code: 'nok', message: 'Unauthorized'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
        if (err) {
            return res.status(403).json({code: 'nok', message: 'Forbidden'});
        }
        req.user = user;
        next();
    });
}
```

