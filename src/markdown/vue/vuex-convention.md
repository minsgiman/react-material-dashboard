# Vuex 사용 및 Naming 컨벤션

### Module 

* Vuex는 단일 상태 트리를 사용하기 때문에 App의 모든 상태가 하나의 큰 객체 안에 포함된다. 그러나 규모가 커짐에 따라 저장소가 비대해질 수 있다.<br>
    이를 위해 Vuex는 저장소를 **Module**로 나눌 수 있다. 각 **Module**은 자체 state, getter, action, mutation 을 가진다.
    
* Naming Good example

        - products
        - product
        - user
        - checkout
        - compare-products
        - notifications
        - order

* Naming Bad example

        - next-module
        - compare (because it’s not saying what its compare)
<br>

### State

* Vuex State의 naming은 심플해야 하며, 중첩된 구조를 사용하지 않는다. 그리고 underscore-case 로 작성한다.
 
* Naming Good example

        - categories_map
        - current_category_id
        - order
        - product_parent_id

* Naming Bad example

        - list
        - elements
 <br>
 
### Getters

* Getter 는 의도한 action을 포함하여 naming을 한다. 다음의 룰을 참고한다.

    - Start from **"is"** when returns Boolean, or **"get"** otherwise
    - Answer to question **what am I returning?**
    - Contain **module name** to ensure that getter is unique through whole Vuex, but it doesn’t have to start with that name
    
* Naming Good example

        - For state user -> isUserLoggedIn, getUser
        - For state availableFilters -> getAvailableCategoryFilters (category is module name)
        - For state currentProductId -> getCurrentProduct (because it gets product object from map), getCurrentProductId
    
* Naming Bad example

        - totals
        - product
        - current
        - list
<br>

### Actions

* actions는 module 외부에서 해당 module의 state 변경을 요청하는 방법이다. actions는 다음과 같은 의도를 가진다.

    - Fetch something from the server(or cache)—in this case, they have to be asynchronous (return promise).
    - Mutate state of current module.
    - Dispatch actions from the same module (to avoid repeating logic).
    - Dispatch actions from another module (only if it’s absolutely required).
    
* 다음은 asynchronous (return promise) Action을 처리하는 예제 코드이다.

        /* action return promise */ 
        actions: {
          actionA ({ commit }) {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                commit('someMutation')
                resolve()
              }, 1000)
            })
          }
        }
        
        /* store.dispatch handle promise */
        store.dispatch('actionA').then(() => {
          // ...
        })
        
        /* use asynchronous action in another action */
        actions: {
          // ...
          actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
              commit('someOtherMutation')
            })
          }
        }
        
        /* use async/await */
        // getData() 및 getOtherData()가 Promise를 반환한다고 가정합니다.
        actions: {
          async actionA ({ commit }) {
            commit('gotData', await getData())
          },
          async actionB ({ dispatch, commit }) {
            await dispatch('actionA') // actionA가 끝나기를 기다립니다.
            commit('gotOtherData', await getOtherData())
          }
        }
        
* Naming Good example

        - fetchProduct - Gets product by ID from server or cache, sets it in products map, and returns it by getter.
        - findProducts - Fetches products by specific query, sets them in products map, and returns them as array.
        - setCurrentProduct - Param could be ID, it could dispatch fetchProduct, mutate it to productsMap, and mutate its ID to currentProductId. Also if productId is null, then it removes currentProduct.
        - addCartItem
        - toggleMicrocart
    
* Naming Bad example

        - products
        - reset
<br>
    
### Mutations

* 직접적인 state의 변경은 mutations를 통해서만 이루어진다. mutation은 logic을 갖지 않으며, 같은 module의 actions를 통해서만 호출된다.<br>
    mutations의 naming은 다음과 같이 시작한다. (SET, ADD, REMOVE)<br>
    ADD, REMOVE 는 array 또는 map type의 state에서 element를 추가/삭제 할때 사용된다.  

* Naming Good example

        - ADD_PRODUCT
        - SET_CURRENT_PRODUCT_ID
        - ADD_CATEGORY_FILTER
        - REMOVE_WISHLIST_PRODUCT_ID
    
* Naming Bad example

        - CATEGORY_UPD_CURRENT_CATEGORY
        - TAX_UPDATE_RULES
<br>
     
***
 
### 참조
 
* Vuex conventions<br>
  <https://docs.vuestorefront.io/guide/vuex/vuex-conventions.html#module>
  
* Vuex guide<br>
  <https://vuex.vuejs.org/kr/>