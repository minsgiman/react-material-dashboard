# AngularJS에서 Vue로 점진적으로 넘어가기 2 (다국어 적용 with vue-i18n)

***

 - vue-i18n의 사용방법은 최상위 태그에 vue root component를 마운트 시킬 때, vue-i18n 객체를 전달해주면 된다.
 
 - 하지만 Angular App 안에서 vue를 사용하게 되면, 따로 vue root component를 가지고 있는 것이 아니라, Angular App runtime 중 필요한 위치에 각각의 vue component를 마운트시켜야 한다.
 
 - 따라서, vue component에서 사용하는 다국어들을 각각의 vue component 안에서 관리하고 있어야 한다. (나중에 vue로 완전히 넘어갈 때 이 부분은 하나로 합치도록 한다.) 

.

### AngularJS 안에서 vue component에 vue-i18n 적용하기

 - 1) vue-i18n script를 로드한다.


            <script src="/resources/vendor/vue/vue-i18n.min.js"></script>
            
.
           
 - 2) vue component를 관리하는 싱글톤 서비스안에 해당 컴포넌트에서 사용하는 다국어를 정의하고, vue-18n 객체를 생성한다.
      
 
            var _messages = {
                ja: {
                    hello: 'Hellow, hi'
                },
                ko: {
                    hello: '안녕, 안녕'
                }
            };
            var _i18n = new VueI18n({
                locale: 'ko',
                messages: _messages
            });

.

 - 3) vue component 생성시 vue-18n 객체를 전달하고, template에서 사용한다.
 
 
            function _makeComponent (targetId, props, vConstructor, vI18n) {
                var vExtendConstructor = Vue.extend(vConstructor);
                var vComponent = new vExtendConstructor({
                    i18n: vI18n,
                    propsData: props
                }).$mount('#' + targetId);
        
                var uid = vComponent._uid;
                _compMap[uid] = vComponent;
        
                return uid;
            }
            
            ...
            ...
            
            <p>{{ $t("hello") }}</p>