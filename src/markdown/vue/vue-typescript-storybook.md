# Vue + Typescript 환경에서 Storybook 사용하기

* <https://qiita.com/kecy/items/83e5aad3f7dd1e2fc2ff>
<br>
.storybook/config.js

        import { configure } from '@storybook/vue';
        
        // automatically import all files ending in *.stories.ts
        const req = require.context('../src/stories', true, /.stories.ts$/);
        function loadStories() {
            req.keys().forEach((filename) => req(filename));
        }
        
        configure(loadStories, module);
<br>
.storybook/webpack.config.js
        
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
/src/stories/index.stories.ts

        import { storiesOf } from '@storybook/vue';
        
        import components from './components.vue';
        import dialogs from './dialogs.vue';
        import camlist from './camlist.vue';
        
        storiesOf('components', module)
            .add('components', () => ({
                components: { components },
                template: `<components/>`,
            }))
            .add('dialogs', () => ({
                components: { dialogs },
                template: '<dialogs/>'
            }))
            .add('camlist', () => ({
                components: { camlist },
                template: '<camlist/>'
            }));