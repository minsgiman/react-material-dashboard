# vue에서 컴포넌트 강제 re-rendering 하기 

***

### 컴포넌트의 key attribute 변경을 통한 re-rendering

  - Vue에서는 컴포넌트 변경을 추적하기 위해 key attribute를 제공한다. 
  
  - key가 변경되면 Vue는 해당 컴포넌트에 업데이트가 일어난 것으로 간주하고, 강제로 re-rendering을 수행한다. 
  
  - 첫번째 예제와 같이 key를 index로 지정하게 되면, 리스트 중간에 item이 삽입되거나 빠지면, Vue는 index가 바뀐 모든 컴포넌트를 re-rendering한다.
   
  - 따라서, 두번째 예제와 같이 key를 item의 unique한 ID로 지정해야 리스트 중간에 item이 삽입되더라도 불필요한 re-rendering을 막을 수 있다.

        
        //Re-render too much
        <locale_item_cell v-for="(item, index) in translateList"
                          :pId="item.id" :pLocaleObj="item.locale" :key="index">
        </locale_item_cell>
    
    
        //Re-render only changed
        <locale_item_cell v-for="(item, index) in translateList"
                          :pLocaleObj="item.locale" :key="item.id">
        </locale_item_cell>
        
.


***
 
### 참조
 
  - The correct way to force Vue to re-render a component
  
  <https://michaelnthiessen.com/force-re-render>
  
  - Vue List Rendering
  
  <https://vuejs.org/v2/guide/list.html#Caveats>