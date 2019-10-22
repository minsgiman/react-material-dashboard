# AngularJS에서 Vue로 점진적으로 넘어가기 4 (Vue Component 상속)

***

 - vue에서 template상속은 slot element를 통해서 할 수 있다. slot element는 상속받은 컴포넌트에서 구현한 내용으로 대체된다.
 
 - vue mixins를 통해 vue object를 상속받을 수 있다.

.

### Slot을 통한 template 상속
            
 - 1) 상속해줄 template에 slot element를 추가한다. name을 지정하여 여러개를 추가할 수 있다.
 
      상속받는 component에서 template element를 통해 대체될 template 내용을 구현한다.

      
            /**** modal dialog template ****/
            <div class="v_modal_dialog">
                <div class="dlg_wrap">
                    <div class="content" :style="dlgStyle">
                        <slot name="content"></slot>
                        <a class="btn_close" @click="closeDialog"></a>
                    </div>
                </div>
            </div>
      
      
            /**** video dialog template ****/
            <div class="video_modal_dialog">
                <modal_dlg @destroy="onCloseDialog" :dlgStyle="dlgStyle">
                    <template slot="content">
                        <div class="video_area is_layer">
                            <video width="" height="" class="video_cont" controls="">
                                <source :src="webmUrl" type="video/webm">
                                <source :src="mp4Url" type="video/mp4">
                            </video>
                        </div>
                    </template>
                </modal_dlg>
            </div>

.

### Mixins를 통한 vue object 상속

 - 1) Vue object 생성시 Mixins 를 통해 상속 object를 설정할 수 있다.
 
 
        /*********** Data inherit *************/
        var mixin = {
          data: function () {
            return {
              message: 'hello',
              foo: 'abc'
            }
          }
        }
        
        new Vue({
          mixins: [mixin],
          data: function () {
            return {
              message: 'goodbye',
              bar: 'def'
            }
          },
          created: function () {
            console.log(this.$data)
            // => { message: "goodbye", foo: "abc", bar: "def" }
          }
        })   


        /************** Method inherit ****************/
        var mixin = {
          methods: {
            foo: function () {
              console.log('foo')
            },
            conflicting: function () {
              console.log('from mixin')
            }
          }
        }
        
        var vm = new Vue({
          mixins: [mixin],
          methods: {
            bar: function () {
              console.log('bar')
            },
            conflicting: function () {
              console.log('from self')
            }
          }
        })
        
        vm.foo() // => "foo"
        vm.bar() // => "bar"
        vm.conflicting() // => "from self"

.

***
 
### 참조
 
  - vue components-slots
  
  <https://vuejs.org/v2/guide/components-slots.html>
  
  - vue mixins
  
  <https://vuejs.org/v2/guide/mixins.html>
