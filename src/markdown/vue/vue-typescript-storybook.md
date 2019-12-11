# Vue + Typescript 환경에서 Storybook 사용하기

Storybook은 App과 독립적인 환경에서 UI 컴포넌트를 개발할 수 있는 환경을 제공해준다.<br>
컴포넌트 각각 독립적으로 개발하기 때문에 다른 코드와의 Coupling을 낮출 수 있고, 컴포넌트를 더욱 체계적으로 설계할 수 있다.<br>
Storybook은 React, Vue, Angular 등 다양한 Library를 지원하고, 여기서는 그 중 Typescript로 작성한 Vue 컴포넌트를 테스트하는 방법에 대하여 정리하였다. 

### 1. 필요한 package를 설치한다.

* npm install @storybook/vue babel-preset-vue fork-ts-checker-webpack-plugin

        "@storybook/vue": "^5.2.6",
        "babel-preset-vue": "^2.0.2",
        "fork-ts-checker-webpack-plugin": "^3.1.1",
<br>
    
### 2. Storybook config 와 webpack.config 를 작성한다.

* /.storybook directory를 만든다.

* /.storybook/config.js 를 작성한다.

        import { configure } from '@storybook/vue';
        
        // automatically import all files ending in *.stories.ts
        const req = require.context('../src/stories', true, /.stories.ts$/);
        function loadStories() {
            req.keys().forEach((filename) => req(filename));
        }
        
        configure(loadStories, module);

* /.storybook/webpack.config.js 를 작성한다.

        const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
        
        module.exports = async ({ config, mode }) => {
            config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html');
            config.module.rules.push({
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true // used with ForkTsCheckerWebpackPlugin
                        },
                    }
                ],
            });
        
            config.module.rules.push({ test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] });
        
            config.plugins.push(new ForkTsCheckerWebpackPlugin());
        
            return config;
        };
<br>

### 3. Vue 컴포넌트 테스트를 위한 stories 코드를 작성한다.

* /src/stories 폴더를 만든다.

* /src/stories/index.stories.ts 를 작성한다.

        import { storiesOf } from '@storybook/vue';
        
        import HelloWorld from '../components/HelloWorld.vue';
        
        storiesOf('HelloWorld', module)
          .add('simple', () => ({
            components: { HelloWorld },
            template: `<HelloWorld msg="Welcome to Your Vue.js + TypeScript + Storybook App"/>`,
          }));
<br>

### 4. package.json에 command를 작성한다.

* package.json

        {
          "scripts": {
            "storybook": "start-storybook"
          }
        }
        
* npm run storybook