# MVW framework없이 Single Page App 만들기 6

***

## Service 구현

 - Service는 REST API 사용정의를 종류별로 나눈 모듈이다.
 - REST API Call에 대한 response Data를 fireEvent하여서 현재 등록되어 있는 Page들에게 순차적으로 전달한다.
 
##### 1. 해당 Service를 사용하는 곳에서 의존성 정의를 해주고 API를 Call하면 된다.

    define(['service-service'], function(srvService) {
        ...        
        ...
        srvService.updateDDNSInfo(updateData);

##### 2. Service내에서 REST API Call에 대한 response를 fireEvent 한다.

     var fnUpdateDDNSInfo = function(updateData) {
        var setting = {
                url : hx.serverIP + "/api/v1/service/ddns",
                type : 'PUT',
                contentType : 'application/json',
                headers : {
                    'Content-Language' : 'en',
                    'Access-Token' : srvGateway.getToken()
                },
                data : JSON.stringify(updateData)
            },
            successCb = function(data) {
                pageManager.fireEvent({
                    type : hx.eventName.UPDATE_DDNS_INFO,
                    success : true,
                    data : data
                });
            },
            errorCb = function(response, textStatus, errorThrown) {
                pageManager.fireEvent({
                    type : hx.eventName.UPDATE_DDNS_INFO,
                    success : false
                });
            };
    
        hx.util.callAjax(setting, successCb, errorCb);
     };