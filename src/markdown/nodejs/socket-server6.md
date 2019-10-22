# Socket 서버 구현 6 (http Request)
 
***

#### 1. request 모듈

 - HTTP Request를 생성하는 모듈로 request 모듈을 사용하였다.
 - request 모듈은 Node 내장모듈인 http 모듈을 사용하기 쉽게 wrapping 하였다.
 - request option에는 url, method, headers, form 이 있다.
 - 아래와 같이 request(options, callback) 또는 request.get(options, callback), request.post(options, callback) 등으로 사용할 수 있다.
 
 
        request(
            {
                url: "https://www.xxx.com",
                method: "GET"
                headers: {
                    'content-type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }, function (error, response, body) {
                console.log('status : ' + response.statusCode);
                console.log(JSON.parse(body));
            });
            
        request.post(
            {
                url: "https://www.xxx.com",
                form : {
                    email: 'xxx@email.com',
                    password: 'xxxx'
                }                     
            }, callback); 
 
.

#### 2. stream 연결

 - 각 request method는 http 요청의 response가 사이즈가 큰 경우 stream으로 pipe시킬 수 있다.
 
 
        var fileStream = fs.createWriteStream('xxx.png');
        request('https://xxx/images/white.png').pipe(fileStream);
        
.

#### 3. SwiftStack Authentication

 - request를 통한 SwiftStack Authentication을 요청하고, 파일을 업로드하였다.
 
 
        request.get(
            {
                headers:{
                    "X-Auth-User": 'Username',
                    "X-Auth-Key": 'Password',
                    "Accept": "application/json"
                },
                url: 'http://www.xxx.com/auth/v1.0'
            }, function(error, response, body) {
                authToken = response.headers['x-auth-token'];
                storageURL = response.headers['x-storage-url'];
            });
            
        
        file.pipe(
            request.put(
                {
                    headers: {
                        "X-Auth-Token": authToken,
                        "Content-Type": "image/jpeg",
                        "Content-Length" : length
                    },
                    url: uploadURL
                }, function (error, response, body) { 
                   console.log(response.statusCode);
                }
            );
        );
            