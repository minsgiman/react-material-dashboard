# flexbox를 사용한 Image 중앙에 위치시키기

*** 

### 아래의 horizontal div에서는 row방향으로 중앙정렬하고 vertical div에서는 column방향으로 중앙정렬하여 이미지가 중앙에 위치된다.


        div.horizontal {
            display: flex;
            justify-content: center;
        }
        
        div.vertical {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        <div class="horizontal">
            <div class="vertical">
                <img src="img-source"/>
            </div>
        </div>
