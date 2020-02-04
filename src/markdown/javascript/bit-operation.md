# Javascript bit 연산


### Javascript bit 연산 Example

```javascript
    //--- Masks ---//
    
    var vote = 1 << 0; //1
    var add = 1 << 1; //2
    var remove = 1 << 2; //4
    var manage = 1 << 3; //8
    var comment = 1 << 4; //16
    var publish = 1 << 25; //33554432
     
    //--- Sets ---//
     
    var user1 = vote | remove | manage; //can "vote", "remove", "manage"
    var user2 = user1 | publish; //all `user1` plus "publish"
    var user3 = user2 ^ manage; //all `user2` minus "manage"
     
    //--- Matches ---//
     
    console.log("USER 1 : "+ user1); //13
     
    console.log(user1 & vote); //1 : TRUE
    console.log(user1 & add); //0 : FALSE
    console.log(user1 & remove); //4 : TRUE
    console.log(user1 & manage); //8 : TRUE
    console.log(user1 & comment); //0 : FALSE
    console.log(user1 & publish); //0 : FALSE
     
    console.log("USER 2 : "+ user2); //33554445
     
    console.log(user2 & vote); //1 : TRUE
    console.log(user2 & add); //0 : FALSE
    console.log(user2 & remove); //4 : TRUE
    console.log(user2 & manage); //8 : TRUE
    console.log(user2 & comment); //0 : FALSE
    console.log(user2 & publish); //33554432 : TRUE
     
    console.log("USER 3 : "+ user3); //33554437
     
    console.log(user3 & vote); //1 : TRUE
    console.log(user3 & add); //0 : FALSE
    console.log(user3 & remove); //4 : TRUE
    console.log(user3 & manage); //0 : FALSE
    console.log(user3 & comment); //0 : FALSE
    console.log(user3 & publish); //33554432 : TRUE
```

<br>

***

### 참조
* Javascript Bitwise_Operators<br>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators/>