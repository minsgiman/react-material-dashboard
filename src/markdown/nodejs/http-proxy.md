# http proxy 서버 구현하기

express와 함께 http-proxy 라이브러리를 사용하여 구현하였다.
<br><br>

**/json/\*** Request들을 'https://xxx.azurewebsites.net' 으로 보낸다.
```javascript
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({changeOrigin: true});

app.all('/json/*', function(req, res) {
  proxy.web(req, res, { target: 'https://xxx.azurewebsites.net'});
});
```
<br>

proxyReq 이벤트 핸들러를 통해 bodyDecoder-middleware를 적용해주어야 post Request시에 에러가 발생하지 않는다.
```javascript
proxy.on( 'proxyReq', ( proxyReq, req, res, options ) => {
  if ( !req.body || !Object.keys( req.body ).length ) {
    return;
  }

  let contentType = proxyReq.getHeader( 'Content-Type' );
  let bodyData;

  if ( contentType.includes( 'application/json' ) ) {
    bodyData = JSON.stringify( req.body );
  }

  if ( contentType.includes( 'application/x-www-form-urlencoded' ) ) {
    bodyData = queryString.stringify( req.body );
  }

  if ( bodyData ) {
    proxyReq.setHeader( 'Content-Length', Buffer.byteLength( bodyData ) );
    proxyReq.write( bodyData );
  }
});
```
<br>

서버 전체 코드
```javascript
/** server.js **/
const createError = require('http-errors');
const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const queryString = require('querystring');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('myexpressapp:server');
const http = require('http');
const app = express();

if (process) {
    process.on('uncaughtException', function (err) {   // Exception Handler
        console.log('Error Worker Caught exception: ' + err);
    });
}

app.disable('x-powered-by');
app.use(function(req, res, next) {
    let protocol = req.headers['x-forwarded-proto'] || req.protocol;
    if (protocol == 'https') {
        next();
    } else {
        let from = `${protocol}://${req.hostname}${req.url}`;
        let to = `https://${req.hostname}${req.url}`;
        res.redirect(to);
    }
});

app.use(function(req, res, next) {
    if (req.url.indexOf('/json') === -1 && req.url.indexOf('/install') === -1) {
      if (req.url === '/') {
          res.header('Cache-Control', 'no-store');
      } else {
          res.header('Cache-Control', 'public, max-age=86400');
      }
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const proxy = httpProxy.createProxyServer({changeOrigin: true});

proxy.on('proxyRes', function (proxyRes, req, res) {
  const cookies = proxyRes.headers['set-cookie'];
  if (cookies && cookies.length) {
    proxyRes.headers['set-cookie'] = cookies.map(cookie => {
      return cookie.replace(/Domain=.*;\s/,'Domain=xxx.com;');
    });
  }
});

proxy.on( 'proxyReq', ( proxyReq, req, res, options ) => {
  if ( !req.body || !Object.keys( req.body ).length ) {
    return;
  }

  let contentType = proxyReq.getHeader( 'Content-Type' );
  let bodyData;

  if ( contentType.includes( 'application/json' ) ) {
    bodyData = JSON.stringify( req.body );
  }

  if ( contentType.includes( 'application/x-www-form-urlencoded' ) ) {
    bodyData = queryString.stringify( req.body );
  }

  if ( bodyData ) {
    proxyReq.setHeader( 'Content-Length', Buffer.byteLength( bodyData ) );
    proxyReq.write( bodyData );
  }
});

app.all('/json/*', function(req, res) {
  proxy.web(req, res, { target: 'https://xxx.azurewebsites.net'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

```javascript
/** package.json **/
{
  ...
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "^3.0.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "http-proxy": "^1.18.0",
    "http-proxy-middleware": "^1.0.3",
    "morgan": "~1.9.1",
    "pm2": "^4.2.3",
    "pug": "2.0.0-beta11",
    "querystring": "^0.2.0"
  }
}
```
<br>

***

### 참조

 - node-http-proxy<br>
   <https://github.com/http-party/node-http-proxy>

 - node-http-proxy bodyDecoder-middleware<br>
   <https://github.com/http-party/node-http-proxy/blob/master/examples/middleware/bodyDecoder-middleware.js>