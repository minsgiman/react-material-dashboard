# Vue Atomic Design

Atomic Design에 대한 설명은 다음 Link를 참고한다.<br>
[Atomic Design](/#/markdown?url=%2Ffrontend%2Fatomic-design.md&devId=frontend&devTitle=Frontend)

<br>

## Atoms 구현

#### atom button
```html
<template>
    <b-button
        v-on="$listeners"
        :variant="color"
        :disabled="disabled"
    >{{text}}</b-button>
</template>
<script>
import { BButton } from 'bootstrap-vue';

export default {
    components: {
        BButton
    },
    props: {
        text: {
            type: String,
            default: 'Button'
        },
        color: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
```

#### atom title
```html
<template>
    <component :is="tag">{{ content }}</component>
</template>

<script>
    export default {
        props: {
            tag: {
                type: String,
                default: 'h2'
            },
            content: {
                type: String,
                default: ''
            }
        }
    };
</script>
```
<br>

## Molecules 구현

#### molecule card
```html
<template>
    <div class="m-card">
        <a-title tag="h2" :content="title"></a-title>
        <a-text :text="text"></a-text>
    </div>
</template>

<script>
    import { aTitle } from './../../atoms/title'
    import { aText } from './../../atoms/text'

    export default {
        components: {
            aTitle,
            aText
        },
        props: {
            text: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        }
    };
</script>
```

#### molecule links
```html
<template>
    <ul>
        <li v-for="(link, index) in links" :key="link.name + index">
            <aLink :url="link.url" :name="link.name"/>
        </li>
    </ul>
</template>
<script>
    import { aLink } from '../../atoms/link';

    export default {
        components: {
            aLink
        },
        props: {
            links: {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    }
</script>
```

<br>

## Organisms 구현

#### organism header
```html
<template>
    <header>
        <div>
            <m-links :links="links"></m-links>
        </div>
        <div>
            <a-button text="Button"></a-button>
        </div>
    </header>
</template>

<script>
    import { aButton } from '../../atoms/button';
    import { mLinks } from '../../molecules/links';

    export default {
        components: {
            aButton,
            mLinks
        },
        props: {
            links: {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    };
</script>
```

#### organism card-grid
```html
<template>
    <div class="card-grid">
        <div v-for="card in cards" :key="card.id">
            <m-card :title="card.title" :text="card.text"></m-card>
        </div>
    </div>
</template>

<script>
    import { mCard } from '../../molecules/card';

    export default {
        components: {
            mCard
        },
        props: {
            cards: {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    };
</script>
```

<br>

## Templates 구현

#### home template
```html
<template>
    <section>
        <o-header :links="links"></o-header>
        <div>
            <m-banner></m-banner>
            <div>
                <o-card-grid :cards="cards"></o-card-grid>
            </div>
        </div>
        <o-footer :fLinks="fLinks" :sLinks="sLinks"></o-footer>
    </section>
</template>

<script>
    import { oHeader } from '../../organisms/header';
    import { oFooter } from '../../organisms/footer';
    import { mBanner } from '../../molecules/banner';
    import { oCardGrid } from '../../organisms/card-grid';

    export default {
        components: {
            mBanner,
            oHeader,
            oFooter,
            oCardGrid
        },
        props: {
            links: {
                type: Array,
                default: function () {
                    return []
                }
            },
            cards: {
                type: Array,
                default: function () {
                    return []
                }
            },
            fLinks: {
                type: Array,
                default: function () {
                    return []
                }
            },
            sLinks: {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    };
</script>
```

<br>

## Pages 구현

#### home page
```html
<template>
    <t-home
            :links="links"
            :cards="cards"
            :fLinks="fLinks"
            :sLinks="sLinks"
    />
</template>

<script>
    import { tHome } from '../../templates/home';

    export default {
        components: {
            tHome
        },
        data: () => {
            return {
                links: [
                    {url: '/', name: 'h1'},
                    {url: '/', name: 'h2'},
                    {url: '/', name: 'h3'}
                ],
                cards: [
                    {id: '1', title: 'Title1', text: 'Text1'},
                    {id: '2', title: 'Title2', text: 'Text2'},
                    {id: '3', title: 'Title3', text: 'Text3'},
                    {id: '4', title: 'Title4', text: 'Text4'},
                ],
                fLinks: [
                    {url: '/', name: 'f1-1'},
                    {url: '/', name: 'f1-2'},
                    {url: '/', name: 'f1-3'}
                ],
                sLinks: [
                    {url: '/', name: 'f2-1'},
                    {url: '/', name: 'f2-2'},
                    {url: '/', name: 'f2-3'}
                ]
            }
        }
    };
</script>
```
<br>

위의 구현은 다음 Github에서 전체 코드를 확인할 수 있다.<br>
[Vue Atomic Design](https://github.com/minsgiman/vue-atomic-design)

***

### 참조
* VueFront for Developers<br>
<https://vuefront.com/develop/>

* How to structure a Vue.js app using Atomic Design and TailwindCSS<br>
<https://vuedose.tips/how-to-structure-a-vue-js-app-using-atomic-design-and-tailwindcss/>