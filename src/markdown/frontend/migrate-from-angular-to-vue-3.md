# AngularJS에서 Vue로 점진적으로 넘어가기 3 (상태관리 With Vuex)

***

 - vuex 를 사용하여 상태관리를 제공한다.

.

### AngularJS 안에서 Store module 정의하고 사용하기

 - 1) vuex script를 로드한다.


            <script src="/resources/vendor/vue/vuex.min.js"></script>
 
.           
            
 - 2) Store 각 모듈의 State, Action, Mutation 을 정의하고, 구현한다.
 
      vue component에서 Store 각 모듈의 state에 접근하고, action을 dispatch한다.

      
            /**** Mutation Definition ****/
            app.factory('vMutations', [function() {
                return {
                    DECREMENT_MAIN_COUNTER : 'DECREMENT_MAIN_COUNTER',
                    INCREMENT_MAIN_COUNTER : 'INCREMENT_MAIN_COUNTER'
                };
            }]);
      
      
            /**** Car Store Module ****/
            app.factory('vModuleCar', ['vMutations', function(vMutations) {
                var state = {
                    main: 0
                };
            
                var mutations = {};
                mutations[vMutations.INCREMENT_MAIN_COUNTER] = function (state) {
                    state.main += 1;
                };
                mutations[vMutations.DECREMENT_MAIN_COUNTER] = function (state) {
                    state.main -= 1;
                };
            
                var actions = {
                    increaseMainCounter: function(context) {
                        context.commit(vMutations.INCREMENT_MAIN_COUNTER);
                    },
                    decreaseMainCounter: function(context) {
                        context.commit(vMutations.DECREMENT_MAIN_COUNTER);
                    }
                };
            
                return {
                    namespaced: true,
                    state : state,
                    mutations : mutations,
                    actions : actions
                };
            }]);
            
            
            /**** Store Code ****/
            app.factory('vStore', ['vModuleProducts', 'vModuleCar', function(vModuleProducts, vModuleCar) {
                //Vue.use(Vuex);
                var store = new Vuex.Store({
                    modules : {
                        products: vModuleProducts,
                        car: vModuleCar
                    }
                });
            
                return store;
            }]);
      
      
            /**** Component Code ****/
            app.factory('vHello', ['vStore', 'vCompManager', function(vStore, vCompManager) {
            ...
                var _vConstructor = {
                    ...
                    computed : {
                        productsMainState: function() {
                            return vStore.state.products.main;
                        },
                        carMainState: function() {
                            return vStore.state.car.main;
                        }
                    },
                    ...
                    methods: {
                        clickHello: function() {
                            vStore.dispatch('car/increaseMainCounter');
                        }
                    }
                }
            };

.

***
 
### 참조
 
  - Vuex modules
  
  <https://vuex.vuejs.org/kr/guide/modules.html>
