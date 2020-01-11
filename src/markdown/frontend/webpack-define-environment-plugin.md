# Webpack을 통한 App Config 설정하기 (DefinePlugin, EnvironmentPlugin)

Webpack을 통한 빌드시 App의 Config를 설정하는 방법에 대하여 정리하였다.   

### DefinePlugin

* Webpack에서 제공하는 DefinePlugin은 App의 전역에서 접근이 가능한 환경변수를 생성해준다.

* 다음은 DefinePlugin을 통하여 App Config를 설정하는 예제이다.

            // webpack.config.js
            const argv = require('yargs').argv;
            const webpack = require('webpack');
            const alphaConfig = require('./config/config.alpha.json');
            const betaConfig = require('./config/config.beta.json');
            const realConfig = require('./config/config.real.json');
            
            const ENV = argv.env || 'alpha';
            
            function composeConfig(env) {
                if (env === 'alpha') {
                    return { ...alphaConfig };
                } else if (env === 'beta') {
                    return { ...betaConfig };
                } else if (env === 'real') {
                    return { ...realConfig };
                }
            }
            
            module.exports = {
                ...
                plugins: [
                    new webpack.DefinePlugin({
                        __APP_CONFIG__: JSON.stringify(composeConfig(ENV))
                    })
                ]
            }
            
            // config.js
            const config = __APP_CONFIG__;
            
            export default config;
            
* DefinePlugin을 통해 선언한 환경변수를 브라우저의 콘솔에서 출력하려고 하면 not defined 에러가 발생한다.<br>
 이 환경변수는 Webpack이 코드를 빌드하는 동안에만 사용되고, 런타임에는 정의한 value로 대체되기 때문이다.
<br><br>

### EnvironmentPlugin

* Webpack에서 제공하는 EnvironmentPlugin은 Node의 런타임에서 process.env에 저장되는 환경변수를 등록하기 위한 Plugin이다.

* 다음과 같이 EnvironmentPlugin을 사용할 수 있다.

            /* webpack.config.js */
            const webpack = require('webpack');
            
            module.exports = {
              plugins: [
                new webpack.DefinePlugin({
                  APP_NAME: JSON.stringify('My app'),
                  VERSION: JSON.stringify('v0.1')
                }),
                new webpack.EnvironmentPlugin(['DEBUG'])
                /* new webpack.EnvironmentPlugin({ DEBUG: 'off' }) -> Default is 'off' */
              ]
            };
            
            /* src/index.js */
            if (process.env.DEBUG === 'on') {
              console.log(`APP_NAME:`, APP_NAME);
              console.log(`VERSION:`, VERSION);
            }
            
            /* console */
            $ DEBUG=on npm run build
<br>

***

### 참조

* Webpack definePlugin<br>
  <https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin>
  
* Webpack environmentPlugin<br>
  <https://github.com/webpack/docs/wiki/list-of-plugins#environmentplugin>
