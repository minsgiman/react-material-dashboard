# flexbox를 이용한 grid 구현

#### flex container로 grid item 요소들을 감싸면 이 flex container 속에 들어간 자식요소들은 가로 세로 유연하게 배치된다.
* display: flex 속성을 적용한 요소는 flex container가 된다.

#### flex-direction
* 주축 방향을 설정한다. 
* default는 row이고, 위에서 아래로 향하게 하려면 column으로 설정한다.

#### justify-content
* 주축을 기준으로 flex item 수평 정렬 방법을 설정한다.
* flex-start(default) : 주축의 시작 부분을 기준으로 flex item을 정렬한다.
* center : 주축의 중앙을 기준으로 flex item을 정렬한다.
* flex-end : 주축의 끝부분을 기준으로 flex item을 정렬한다.
* space-around : 주축을 기준으로 flex item을 일정한 간격으로 정렬한다.
* space-between : 첫 번째와 마지막 flex item은 주축의 시작 부분과 끝부분에 정렬하고 나머지 flex item을 일정한 간격으로 정렬한다.

#### align-content
* flex item이 여러 줄로 나열되어 있을 때 주축을 기준으로 수직 정렬 방법을 설정한다.
* stretch(default): flex item의 높이를 늘려 flex container의 전체 높이를 채운다.
* flex-start: 교차축의 시작 부분을 기준으로 정렬한다.
* center: 교차축의 중앙을 기준으로 정렬한다.
* flex-end: 교차축의 끝부분을 기준으로 정렬한다.
* space-around: 교차축을 기준으로 flex-item을 일정한 간격으로 정렬한다.
* space-between: 첫 번째와 마지막 flex item은 교차축의 시작 부분과 끝부분에 정렬하고 나머지 flex item을 일정한 간격으로 정렬한다.

#### align-items 
* align-content와 비슷하다. flex-item이 한 줄로 나열되어 있을 때 주축을 기준으로 수직 정렬 방법을 설정한다.

#### flex-wrap
* flex item이 flex container를 벗어났을 때 줄을 바꾸는 속성.
* default는 nowrap이고, 줄을 바꿔 여러줄로 배치하려면 wrap으로 설정한다.

#### flex-flow
* flex-direction 속성과 flex-wrap 속성을 flex-flow 속성으로 단축해서 사용할 수 있다.
* ex) flex-flow: column wrap;

#### flexbox grid example
```css
.pool_list_wrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
}
.pool_list_wrap .pool_item {
    width: 10%;
    padding: 0 4px;
    margin-bottom: 8px;
    box-sizing: border-box;
    cursor: pointer;
}
.pool_list_wrap .pool_item img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
```