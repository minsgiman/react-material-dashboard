# nginx 로그 포맷 설정

### nginx.conf 에 로그포맷과 로그파일 경로를 다음과 같이 설정한다.

```javascript

/* nginx.conf */
log_format main '$remote_addr - $remote_user [$time_local] "$request" "$scheme" "$host" '
                        '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

include     log.conf;
...
...

/* log.conf */
error_log /home/logs/nginx/error.log;
access_log /home/logs/nginx/access.log main;
```
<br>

### access.log 파일에 다음과 같이 로그가 쌓인다.

```javascript
/* access.log */
196.52.43.100 - - [10/Apr/2020:14:53:29 +0900] "GET / HTTP/1.1" "http" "133.186.133.33"
301 178 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3602.2 Safari/537.36" "-"
```
<br>

### nginx 에러 로그 레벨은 다음과 같이 notice 레벨로 설정할 수 있다.
```javascript
error_log /home/logs/nginx/error.log notice;
```
![object](/images/develop/nginx-error-level.png "object")

<br>

### nginx 로그 포맷 변수들은 다음 링크를 참고한다.

* nginx 로그 포맷 설정<br>
<https://emessell.tistory.com/m/101?category=712465>

* Module ngx_http_core_module<br>
<http://nginx.org/en/docs/http/ngx_http_core_module.html>
