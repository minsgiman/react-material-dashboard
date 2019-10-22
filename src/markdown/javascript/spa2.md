# MVW framework없이 Single Page App 만들기 2

***

## Page 구현 (Event Procedure)

 - UI화면 단위로 Page를 구분하였지만, 
 - 실제 구현내용은 각각의 Event Procedure(이벤트처리함수)로 분리한 것이다.
 - WIN32 API의 메시지루프에서 각 메시지 처리 함수로 메시지를 보내주고 이를 처리하는 구조와 비슷하다.
 
##### 1. 각 Page 마다 자신의 Event Procedure를 가지고 있다. 
#####   다음 우선순위 Procedure에 이벤트를 보내줄지 아니면 여기서 이벤트처리를 끊을 것인지는 consumed로 결정한다.
 
    eventHandler : function(event) {
        var consumed = false;
 
        switch (event.type) {
            case hx.eventName.CREATE:
                fnCreate();
                consumed = true;
                break;
            case hx.eventName.DESTROY:
                 fnDestroy();
                 consumed = true;
                 break;
            case hx.eventName.CONNECTED_DEVICES:
                 ...
                 consumed = false;
                 break;
             ...
         }
         return consumed;
    }
 
##### 2. 각 Page 생성시 Event Procedure를 등록해 놓고, Service 모듈등에서 fireEvent를 호출하면, fireEvent내에서 순차적으로 등록해 놓은 Procedure에 Event를 보내는 구조다.

    fireEvent : function(event, targetPageName) {
        var i, len = pageList.length, pageData;
        var consumed = false;
        
        if (targetPageName) {
            pageData = fnFindPage(targetPageName);
            if (pageData && pageData.page) {
                pageData.page.eventHandler(event);
            }
        } else {
            for (i = len - 1; i >= 0; i-=1) {
                consumed = pageList[i].eventHandler(event);
                if (consumed === true) {
                    break;
                }
            }
        }
    }
    
##### 3. Page는 동시에 여러개가 떠 있을 수 있다.
##### 단, hash 값이랑 매핑되는 Page는 한순간에 하나만 운영되어야 해서, Center Page로 지정하고, 새로운 Center Page가 만들어지면 기존의 Center Page는 Destroy한다.
 
    changeCenterPage : function(pageName, data, loadCb) {
        var that = this;
        var currentCenterPageName;

        if (lastPageName === pageName) {
            console.log("already same page");
            return;
        }
        if (currentCenterPage) {
            currentCenterPageName = currentCenterPage.getPageName();
            if (currentCenterPageName === pageName) {
                console.log("already same page");
                return;
            }
            that.destroyPage(currentCenterPageName);
        }
        that.createPage(pageName, data, true, loadCb);
    }
 
 