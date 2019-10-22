# AngularJS에서 Vue로 점진적으로 넘어가기 1 (Vue component 생성 및 마운트)

***

 - AngularJS를 통해 load 되는 모든 template들은 Angular 구문으로 해석되고, 바인딩하는 과정을 거친다. 따라서, Angular의 template과 Vue의 template은 혼용해서 사용할 수 없다.
 
 - AngularJS App 안에서 Vue를 사용하기 위해서는, AngularJS App runtime 중 필요할때마다 Vue Component를 생성해서 적절한 위치의 tag에 Mount해주어야 한다.


.

### AngularJS 안에서 Vue Component 사용하기

 - 1) vue script를 로드한다.


            <script src="/resources/vendor/vue/vue.min.js"></script>
           
.
            
 - 2) 각 vue component에 대한 구현부와 templateURL이 정의되어 있는 Angular Service와
 
      vue component의 생성 및 소멸, 객체를 관리해주는 vue component manager Angular Service를 구현한다.
      
      
            /**** Content Play Dialog Vue Component *****/
            app.factory('vContentPlayDlg', ['vCompManager', 'vModalDlg', function(vCompManager, vModalDlg) {
                var _templateUrl = '/vue_templates/content_play_dlg.html';
                var _vConstructor = {
                    props: ['dlgStyle', 'webmUrl', 'mp4Url'],
                    created : function () {
                    },
                    beforeDestroy : function() {
                        $(this.$el).detach();
                    },
                    destroyed : function () {
                    },
                    methods: {
                        onCloseDialog: function() {
                            var uid = this.$el.getAttribute('data-uid');
                            vCompManager.destroyComponent(uid);
                        }
                    },
                    components: {
                        modal_dlg: {}
                    }
                };
            
                return {
                    createComponent: function(targetId, props) {
                        var getCompPromises = [], subComponents = [];
                        getCompPromises.push(vModalDlg.getConstructor());
                        subComponents.push(_vConstructor.components.modal_dlg);
            
                        return vCompManager.createComponent(targetId, props, _vConstructor, null, _templateUrl, getCompPromises, subComponents);
                    },
                    destroyComponent: function(uid) {
                        vCompManager.destroyComponent(uid);
                    },
                    getConstructor: function() {
                        return vCompManager.getConstructor(_vConstructor, _templateUrl);
                    }
                };
            }]);
            
            
            /**** Vue Component Manager ****/
            app.factory('vCompManager', ['$q', '$templateRequest', function($q, $templateRequest) {
                var _compMap = {};
            
                function _makeComponent (targetId, props, vConstructor, vI18n) {
                    var vExtendConstructor = Vue.extend(vConstructor);
                    var vComponent = new vExtendConstructor({
                        i18n: vI18n,
                        propsData: props
                    }).$mount('#' + targetId);
            
                    var uid = vComponent._uid;
                    _compMap[uid] = vComponent;
            
                    if (vComponent.$el) {
                        vComponent.$el.setAttribute('data-uid', uid);
                    }
                    return uid;
                }
            
                return {
                    createComponent: function(targetId, props, vConstructor, vI18n, templateUrl, getCompPromises, subComponents) {
                        var promises = [], uid, deferred = $q.defer();
            
                        if (vConstructor.template) {
                            uid = _makeComponent(targetId, props, vConstructor, vI18n);
                            deferred.resolve(uid);
                        } else {
                            //Load Template & sub Components
                            promises.push($templateRequest(templateUrl));
                            if (getCompPromises && getCompPromises.length) {
                                getCompPromises.forEach(function(promise) {
                                    promises.push(promise);
                                });
                            }
                            $q.all(promises).then(function(res) {
                                vConstructor.template = res[0];
                                if (subComponents && subComponents.length) {
                                    subComponents.forEach(function(component, index) {
                                        $.extend(component, res[index + 1]);
                                    });
                                }
                                uid = _makeComponent(targetId, props, vConstructor, vI18n);
                                deferred.resolve(uid);
                            });
                        }
            
                        return deferred.promise;
                    },
                    destroyComponent: function(uid) {
                        if (_compMap[uid]) {
                            _compMap[uid].$destroy();
                            _compMap[uid] = null;
                        }
                    },
                    getConstructor: function(vConstructor, templateUrl) {
                        var deferred = $q.defer();
            
                        if (vConstructor.template) {
                            deferred.resolve(vConstructor);
                        } else {
                            $templateRequest(templateUrl).then(function(template) {
                                vConstructor.template = template;
                                deferred.resolve(vConstructor);
                            });
                        }
            
                        return deferred.promise;
                    },
                    getMixin: function(data, methods) {
                        return {
                            data: data,
                            methods: methods
                        };
                    }
                };
            }]);
            
.

 - 3) Angular Controller 에서 각 vue component Angular Service에서 제공하는 createComponent, destroyComponent 를 호출하여 vue component를 생성하고, 마운트한다.
 
      create시에 마운트할 tag의 id와 props를 전달하고, destroy시에는 component의 uid를 전달한다.
 
 
            vContentPlayDlg.createComponent(wrapperName, {
                'dlgStyle' : {
                    width: '1160px', height: '705px', padding: '60px', boxSizing: 'border-box'
                },
                'webmUrl' : 'https://xxx/CF/video/biz_app_final.webm',
                'mp4Url' : 'https://xxx/CF/video/biz_app_final.mp4'
            }).then(function(uid) {
                vContentPlayDlgCompId = uid;
            });
            
            ...
            ...
            
            $scope.$on('$destroy', function () {
                ...
                ...
                vContentPlayDlg.destroyComponent(vContentPlayDlgCompId);
            });

.

***
 
### 참조
 
  - Progressively migrating from AngularJS to Vue.js at Unbabel
  
  <https://medium.com/unbabel/progressively-migrating-from-angularjs-to-vue-js-at-unbabel-581eb4ae022d>


