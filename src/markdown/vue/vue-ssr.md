



![object](/images/develop/ssr.png "object")


nginx에 요청이 80포트로 들어오면 Vue 렌더링 서버가 대기하고 있는 3000포트로 포워딩 해준다.
```javascript
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://127.0.0.1:3000/;
    proxy_redirect off;
  }
}
```

vue-server-renderer 모듈의 renderToString 을 통하여 전달받은 url의 스냅샷을 렌더링하고 클라이언트로 반환한다. 
```javascript
/* server.js */
const { createBundleRenderer } = require('vue-server-renderer')

let distDir = 'dist';
const bundle = fs.readFileSync(`${distDir}/server.js`, 'utf8')
const renderer = createBundleRenderer(bundle)

app.get('*', (req, res) => {
  const context = {
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === '404') {
        res.status(404).end('404 Not Found')
      } else {
        res.status(500).end('Internal Server Error')
      }
      return
    }

    const { title, link, style, script, meta } = context.meta.inject()

    res.write(`
      ${meta.text()}
      ${title.text()}
      ${link.text()}
      ${style.text()}
      ${script.text()}
      ${html}
      <script>
        window.__INITIAL_COMPONENTS_STATE__ = ${JSON.stringify(context.initialComponentsState)}
        window.__INITIAL_VUEX_STATE__ = ${JSON.stringify(context.initialVuexState)}
      </script>
    `)

    res.end()
  })
})

app.listen(config.ssrPort, () => {
  console.log(`server started at port ${config.ssrPort}`) // eslint-disable-line
})
```

renderToString 함수가 실행되면 vue-server-renderer는 서버 쪽 엔트리 파일인 server-entry.js 파일을 찾게된다.
```javascript
/* server-entry.js */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export default context => {
  router.push(context.url)

  const matchedComponents = router.getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) return Promise.reject({ code: '404' })

  // Call prefetch hooks on components matched by the route.
  return Promise.all(matchedComponents.map(component => {
    if (component.prefetch) {
      return component.prefetch(router.currentRoute, store).then(data => {
        component.__INITIAL_STATE__ = data
        return data
      })
    } else {
      return null
    }
  })).then(initialComponentsState => {
    context.initialComponentsState = initialComponentsState
    context.initialVuexState = store.state
    const app = new Vue(App)
    context.meta = app.$meta()
    return app
  })
}
```



```javascript
/* client-entry.js */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

if (window.__INITIAL_VUEX_STATE__) store.replaceState(window.__INITIAL_VUEX_STATE__)

const app = new Vue(App)
router.onReady(() => app.$mount('#app'))
```


https://ko.nuxtjs.org/guide
https://ssr.vuejs.org/guide/structure.html#avoid-stateful-singletons
https://medium.com/aha-official/%EC%95%84%ED%95%98-%ED%94%84%EB%A1%A0%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EA%B8%B0-1-spa%EC%99%80-ssr%EC%9D%98-%EC%9E%A5%EB%8B%A8%EC%A0%90-%EA%B7%B8%EB%A6%AC%EA%B3%A0-nuxt-js-cafdc3ac2053

