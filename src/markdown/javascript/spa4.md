# MVW framework없이 Single Page App 만들기 4

***

## COMPONENT 구현

 - Data변경에 따른 Dom제어 및 EventHandler연결 제공
 - 특정 단위의 DOM Tree 선언 편이제공
 - 특정 UI의 시나리오가 반영되지 않은 범용적으로 사용할 수 있는 기능만을 공통으로 구현
 
##### 1. 컴포넌트 생성 - 컴포넌트 모듈에서 생성자를 제공한다. 
 
    objTable = new cmpBasic.table({
        'class' : 'table-protocols',
        'tableHead' : ['Aplicação', 'Porta'],
        'tableData' : [['HTTP', '80'], ['FTP', '21']]
    });
    
##### 2. 컴포넌트 API를 통해 EventHandler연결, Data Get, Set등을 제공한다.

    /* EventHandler 연결 */
    //event 처리할 대상(버튼 등)이 동적으로 바뀌지 않을 경우
    //해당 버튼 등에 eventHandler를 직접 연결해주는 component API
    objForm.setSubmitHandler(function(event) {
        srvService.deleteAllPortForwardingRules();
        event.preventDefault();
    });
    
    //event 처리할 대상(버튼 등)이 동적으로 바뀔 경우
    //부모에게 이벤트를 위임해서 처리하도록 하는 component API
    objList.setBtnEventDelegator(fnRuleRemoveBtnHandler);
    
    /* 컴포넌트 Data Set */
    objForm.setValueWithId('input', SETUP_TAG_ID, data.destination);
    
##### 3. 컴포넌트의 DOM Tree연결은 생성한 컴포넌트의 최상위 요소인 $element를 통해서 연결하도록 구현.

    if (objForm) {
        $collumnLeftBox.append(objForm.$element);
    }
    
##### 4. 컴포넌트끼리 부모 자식 관계를 형성할 수 있다.

    objInfoList = new cmpBasic.list({
        'class' : 'list',
        ...
    });

    objForm = new cmpForm({
        'name' :  'seguranca-controle-dos-pais-registro-local',
        'data' : [
            {'type' : 'element', 'element' : objInfoList.$element},
        ]
    });
    