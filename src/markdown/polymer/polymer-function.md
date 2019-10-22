# Polymer Function

*** 

### Local DOM 내에서의 querySelector

 - 1. $$ function을 이용한다.
 
            this.$$('.login-btn span')
        
 - 2. Polymer.dom에 this.root로 지정하여, Local DOM내에서의 querySelector가 가능하다.
 
            Polymer.dom(this.root).querySelector('.login-btn')