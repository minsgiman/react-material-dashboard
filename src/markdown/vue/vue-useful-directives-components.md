# Vue Useful Directives and Components 

## v-hotkey
* 전역에서 발생하는 단축키 이벤트 핸들러를 연결해준다.
* Github : <https://github.com/Dafrok/v-hotkey>
* Example
```js
import VueHotKey from 'v-hotkey'
Vue.use(VueHotKey)

export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    show () {
      this.show = true
    },
    hide () {
      this.show = false
    }
  },
  computed: {
    keymap () {
      return {
        // 'esc+ctrl' is OK.
        'ctrl+esc': this.toggle,
        'enter': {
          keydown: this.hide,
          keyup: this.show
        }
      }
    }
  }
}
```
```html
<template>
  <span v-hotkey="keymap" v-show="show"> Press `ctrl + esc` to toggle me! Hold `enter` to hide me! </span>
</template>
```
<br>

## v-click-outside
* 특정 Element의 외부에서 Click 이벤트가 발생하였을 때, 핸들러를 연결해준다. 
* Github : <https://github.com/ndelvalle/v-click-outside>
* Example
```js
import VClickOutside from 'v-click-outside'
Vue.use(VClickOutside)

export default {
  data () {
    return {
      vcoConfig: {
          handler: this.handler,
          middleware: this.middleware,
          events: ['dblclick', 'click'],
          // Note: The default value is true, but in case you want to activate / deactivate
          //       this directive dynamically use this attribute.
          isActive: true
      },
    }
  },
  methods: {
    onClickOutside (event) {
      console.log('Clicked outside. Event: ', event)
    },
    handler () {
      console.log('Clicked outside (Using config), middleware returned true :)')
    },
    // Note: The middleware will be executed if the event was fired outside the element.
    //       It should have only sync functionality and it should return a boolean to
    //       define if the handler should be fire or not
    middleware (event) {
      return event.target.className !== 'click_area'
    }
  }
}
```
```html
<template>
    <div class="click_area" v-click-outside="onClickOutside">onClickOutside</div>
    <div class="click_area" v-click-outside="vcoConfig">vcoConfig</div>
</template>
```
<br>

## v-clipboard
* 특정 Element Click시, v-clipboard의 value를 클립보드로 복사한다.
* Github : <https://github.com/euvl/v-clipboard>
* Example
```js
import Clipboard from 'v-clipboard'
Vue.use(Clipboard)

export default {
  data () {
    return {
      valueStatic: 'This is copy'
    }
  },
  methods: {
    dynamicCopy () {
      return this.valueStatic + ' dynamically'
    }
  }
}
```
```html
<template>
    <button v-clipboard="valueStatic">
      Static Copy to clipboard
    </button>
    <button v-clipboard="dynamicCopy">
      Dynamic Copy to clipboard
    </button>
</template>
```
<br>

## vue-scrollto
* Element 클릭 시 v-scroll-to의 value(선택자)에 해당하는 Element로 스크롤 해준다. 또한 scrollTo Method를 제공해준다.
* Github : <https://github.com/rigor789/vue-scrollTo>
* Example
```js
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)
```
```html
<template>
    <button v-scroll-to="'#element'">
      Scroll to #element
    </button>
    <div style="height:2000px;"></div>
    <h1 id="element">Hi. I'm element</h1>
    <div style="height:2000px;"></div>
</template>
```
```js
/* Programmatically */
var VueScrollTo = require('vue-scrollto');

var options = {
    container: '#container',
    easing: 'ease-in',
    offset: -60,
    force: true,
    cancelable: true,
    onStart: function(element) {
      // scrolling started
    },
    onDone: function(element) {
      // scrolling is done
    },
    onCancel: function() {
      // scrolling has been interrupted
    },
    x: false,
    y: true
}

var cancelScroll = VueScrollTo.scrollTo(element, duration, options)

// or alternatively inside your components you can use
cancelScroll = this.$scrollTo(element, duration, options)

// to cancel scrolling you can call the returned function
cancelScroll()
```
<br>

## v-tooltip
* Element Hover시 tooltip을 제공한다.
* Github : <https://github.com/Akryum/v-tooltip>
* Example
```js
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

export default {
  data () {
    return {
      tooltipMsg: 'This is a button.'
    }
  }
}
```
```html
<template>
    <button v-tooltip.top-center="tooltipMsg">Hover me</button>
</template>
```
<br>

## v-scroll-lock
* 전체 페이지 (body) scroll을 Lock / Unlock 한다.
* Github : <https://github.com/phegman/v-scroll-lock>
* Example
```js
import VScrollLock from 'v-scroll-lock'
Vue.use(VScrollLock, {
  bodyScrollOptions: {
    // body scroll이 차지하고 있던 영역이 사라진 만큼 Element들이 움직이는 것을 방지하기 위한 옵션
    // body에 padding-right: 15px 스타일을 적용한다.
    reserveScrollBarGap: true 
  }
})

export default {
  data () {
    return {
      open: false
    }
  },
  methods: {
    closeModal () {
      this.open = false
    },
    openModal () {
      this.open = true
    }
  }
}
```
```html
<template>
    <button @click="closeModal">UnLock</button>
    <button @click="openModal">Lock</button>
    <div v-scroll-lock="open"></div>
</template>
```
<br>

## vue-infinite-scroll
* List Scroll시 loadMore 구현을 지원한다.   
* Github : <https://github.com/ElemeFE/vue-infinite-scroll>
* Example
```js
import InfiniteScroll from 'vue-infinite-scroll'
Vue.use(InfiniteScroll)

let count = 0;

export default {
  data () {
    return {
      listData: [],
      busy: true
    }
  },
  mounted: function() {
    this.loadMore();
  },
  methods: {
    loadMore () {
      this.busy = true;

      if (count > 100) {
        return;
      }
      setTimeout(() => {
        for (let i = 0, j = 10; i < j; i+=1) {
          this.listData.push({ name: count, id: count });
          count+=1;
        }
        this.busy = false;
      }, 500);
    }
  }
}
```
```html
<template>
    <div class="list-wrap"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <p v-for="(item) in listData" :key="item.id">{{item.name}}</p>
    </div>
</template>
<!--
   infinite-scroll-distance 옵션은 v-infinite-scroll method 가 호출되기 위한 viewport의 bottom과 element의 bottom간의 최소 간격이다.
   default는 0
-->
<style>
.list-wrap {
    width: 300px; 
    height: 500px; 
    margin: 30px auto; 
    overflow-y: auto;
}
</style>
```
<br>

## vue-ripple-directive
* Element에 Ripple Effect를 줄 수 있다. v-ripple의 value로 effect color를 설정한다. 
* Github : <https://github.com/PygmySlowLoris/vue-ripple-directive>
* Example
```js
import Ripple from 'vue-ripple-directive'
Vue.directive('ripple', Ripple);
```
```html
<template>
    <div v-ripple class="white-btn">
      This is a button
    </div>
    <div v-ripple="'rgba(255, 255, 255, 0.35)'" class="blue-btn">
      I have different color
    </div>
</template>
<style>
.white-btn {
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: 10px auto;
    background: #fff;
    border: 1px solid #cccccc;
    color: #555555;
}
.blue-btn {
    width:200px;
    height: 50px;
    line-height: 50px;
    margin: 10px auto;
    background:#0783f4;
    color:#ffffff;
}
</style>
```
<br>

## vue-focus
* Element Focus 컨트롤을 지원한다.
* Github : <https://github.com/simplesmiler/vue-focus>
* Example
```js
import { focus } from 'vue-focus';

export default {
  directives: { focus: focus },
  methods: {
    moveDown: function() {
      this.focused = Math.min(this.focused + 1, this.items.length - 1);
    },
    moveUp: function() {
      this.focused = Math.max(this.focused - 1, 0);
    },
  },
  data () {
    return {
      focused: null,
      items: [
          { value: 'hello' },
          { value: 'world' },
          { value: '' },
          { value: 'hello' },
          { value: 'world' },
          { value: '' },
      ],
    }
  }
}
```
```html
<template>
    <div id="example3">
      <div><pre>{{ { focused: focused } }}</pre></div>
      <p v-for="(item, index) in items" :key="index">
        <input type="text"
               v-model="item.value"
               @keydown.down.prevent="moveDown"
               @keydown.up.prevent="moveUp"
               v-focus="index === focused"
               @focus="focused = index"
               @blur="focused = null"
        >
      </p>
      <p>NOTE: move the focus with ↑ and ↓ keys.</p>
    </div>
</template>
```
<br>

## v-blur
* Element에 동적으로 blur효과를 적용한다.
* Github : <https://github.com/ndelvalle/v-blur>
* Example
```js
import vBlur from 'v-blur'
Vue.use(vBlur)

export default {
  methods: {
    toggleBlur: function() {
      this.blurConfig.isBlurred = !this.blurConfig.isBlurred;
      this.isBlurred = !this.isBlurred;
    }
  },
  data () {
    return {
      isBlurred: true,
      blurConfig: {
        isBlurred: true,
        opacity: 0.3,
        filter: 'blur(1.2px)',
        transition: 'all .5s linear'
      }
    }
  }
}
```
```html
<template>
    <button @click="toggleBlur">Toggle Blur</button>
    <div v-blur="isBlurred">blur1</div>
    <div v-blur="blurConfig">blur2</div>
</template>
```
<br>

## vuelidate
* Vue Component data의 validation을 지원한다. 
* Github : <https://github.com/vuelidate/vuelidate>
* Example
```js
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import { required, minLength, between } from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      name: '',
      age: 0
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      between: between(20, 30)
    }
  },
}
```
```html
<template>
    <div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
          <label class="form__label">Name</label>
          <input class="form__input" v-model.trim="$v.name.$model"/>
      </div>
      <div class="error" v-if="!$v.name.required">Field is required</div>
      <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
      <br>
      <div class="form-group" :class="{ 'form-group--error': $v.age.$error }">
          <label class="form__label">Age</label>
          <input class="form__input" v-model.trim.lazy="$v.age.$model"/>
      </div>
      <div class="error" v-if="!$v.age.between">Must be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</div>
      <span tabindex="0">Blur to see changes</span>
    </div>
</template>
```
<br>

## vue-multiselect
* 다양한 select solution을 제공한다.
* Github : <https://github.com/shentao/vue-multiselect>
* Example
```js
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  data () {
    return {
      svalue: '',
      soptions: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],

      cvalue: { title: 'Explorer', desc: 'Discovering new species!', img: '/images/creatures.png' },
      coptions: [
        { title: 'Space Pirate', desc: 'More space battles!', img: '/images/fleet.png' },
        { title: 'Merchant', desc: 'PROFIT!', img: '/images/trading_post.png' },
        { title: 'Explorer', desc: 'Discovering new species!', img: '/images/creatures.png' },
        { title: 'Miner', desc: 'We need to go deeper!', img: '/images/resource_lab.png' }
      ]
    }
  },
  components: {
    Multiselect
  },
}
```
```html
<template>
    <div style="width:400px">
      <label class="typo__label">Single select</label>
      <multiselect v-model="svalue" :options="soptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value"></multiselect>
      <pre class="language-json"><code>{{ svalue }}</code></pre>
    </div>
    
    <div style="width:500px; margin-top:30px;">
      <label class="typo__label">Custom option template</label>
      <multiselect v-model="cvalue" placeholder="Fav No Man’s Sky path" label="title" track-by="title" :options="coptions" :option-height="104" :custom-label="customLabel" :show-labels="false">
        <template slot="singleLabel" slot-scope="props">
          <img class="option__image" :src="props.option.img" alt="No Man’s Sky">
          <span class="option__desc">
            <span class="option__title">{{ props.option.title }}</span>
          </span>
        </template>
        <template slot="option" slot-scope="props">
          <img class="option__image" :src="props.option.img" alt="No Man’s Sky">
          <div class="option__desc">
            <span class="option__title">{{ props.option.title }}</span>
            <span class="option__small">{{ props.option.desc }}</span>
          </div>
        </template>
      </multiselect>
      <pre style="text-align:left;"><code>{{ cvalue }}</code></pre>
    </div>
</template>
```
<br>

## vuedraggable
* Drag & Drop 구현을 지원한다.
* Github : <https://github.com/SortableJS/Vue.Draggable>
* Example
```js
import draggable from 'vuedraggable';

export default {
  components: {
      draggable
  },
  data () {
      return {
        drag: false,
        myArray: [{id: 11, name: 'item1'}, {id: 12, name: 'item2'}, {id: 13, name: 'item3'}, {id: 14, name: 'item4'}],
      }
  }
}
```
```html
<template>
    <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
      <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
    </draggable>
</template>
```
<br>

## vue-lazyload
* Listening 이벤트에 따른 리소스 Lazy load를 지원한다.
* GitHub : <https://github.com/hilongjw/vue-lazyload>
<br>
