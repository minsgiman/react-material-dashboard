# Polymer Observe

*** 

### Simple Observer

 - 각 property의 observer에 콜백을 연결해준다. 

         Polymer({
           is: 'x-custom',
         
           properties: {
             disabled: {
               type: Boolean,
               observer: '_disabledChanged'
             },
           },
         
           _disabledChanged: function(newValue, oldValue) {
             this.toggleClass('disabled', newValue);
             this.highlight = true;
           },

.

### Complex Observer

 - observers를 선언하여, parameter로 property들의 path를 지정해주면, 여러개의 property를 동시에 감시할 수 있다.
 - 여러개를 동시에 감시하는 경우 하나의 property value만 변경되어도 콜백이 불린다.

        Polymer({
        
          is: 'x-custom',
        
          properties: {
            preload: Boolean,
            src: String,
            size: String
          },
        
          observers: [
            'updateImage(preload, src, size)'
          ],
        
          updateImage: function(preload, src, size) {
            // ... do work using dependent values
          }
        
        });
        
 - object property의 sub-property 또한 path를 parameter로 지정하면 변경을 감시할 수 있다.
 
        Polymer({
          is: 'x-sub-property-observer',
          properties: {
            user: {
              type: Object,
              value: function() {
                return {};
              }
            }
          },

          observers: [
            'userNameChanged(user.name)'
          ],
          
          btnClicked: function() {
            this.user = {'name' : 'msk'}; 
          },

          userNameChanged: function(name) {
            console.log('new name: ' + name);
          },
        });

