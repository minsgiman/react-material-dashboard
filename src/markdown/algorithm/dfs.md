# 깊이 우선 탐색 (DFS, Depth-First Search)

그래프는 정점과 간선으로 이루어져 있는데 간선을 통해서 모든 정점을 방문하는 것을 그래프를 탐색한다고 한다.<br>
그래프 탐색 알고리즘 중 하나인 깊이 우선 탐색(DFS)에 대하여 알아본다.
<br><br>

### DFS 소개

* DFS는 Root Node 혹은 다른 임의의 Node에서 다음 분기(Branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방법이다.

* Stack 혹은 재귀함수로 구현된다.

* 경로를 탐색할 때 한 방향으로 갈 수 있을 때까지 계속 가다가 더 이상 갈 수 없게되면 다른 방향으로 다시 탐색을 진행한다.

* 모든 노드를 방문하는 경우 그리고 백트래킹(DFS에 가지치기를 통해 가도되지 않는 루트는 고려하지 않고 탐색하는 완전탐색 기법)에 사용한다.

![object](/images/develop/dfs.gif "object")
<br>

### 사용 예

* 한 노드에서 다른 노드로 가는 경로를 찾을 때 사용한다.

* 그래프의 사이클을 찾을 때 사용한다. back edge 즉, 순환을 만들어 주는 마지막 edge가 있으면 사이클이 있다고 판단한다.
<br><br>
 
### 시간 복잡도

* 그래프의 연결관계를 두 가지 자료구조(인접 리스트, 인접 행렬)로 구현할 수 있다.

* 인접행렬은 그래프의 연결관계를 이차원배열로 나타낸다. 예를들어 ad\[i\]\[j\]의 값은 노드 i에서 노드 j로 가는 간선이 있으면 1, 아니면 0이다.

* 인접리스트는 그래프의 연결관계를 배열로 나타낸다. 예를 들어 ad\[i\]은 노드 i에 연결된 노드들의 리스트를 가지고 있다. 

* 인접 리스트를 사용할 때 시간복잡도 : O(V + E)

* 인접 행렬을 사용할 때 시간복잡도 : O(V^2)

접점(V), 간선(E)
<br><br>

### Javascript로 DFS 구현

```javascript
class Stack {
    constructor() {
        this._arr = [];
    }
    push(item) {
        this._arr.push(item);
    }
    pop() {
        return this._arr.pop();
    }
    isEmpty() {
        return !this._arr.length;
    }
}

class Graph {
    constructor() {
        this.edges = {};
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
        this.edges[node] = [];
    }

    addEdge(node1, node2, weight = 1) {
        this.edges[node1].push({ node: node2, weight: weight });
        this.edges[node2].push({ node: node1, weight: weight });
    }

    DFS(node) {
        const stack = new Stack();
        const visitedMap = {};
        stack.push(node);
        visitedMap[node] = true;

        while (!stack.isEmpty()) {
            let topNode = stack.pop();
            console.log(topNode);

            this.edges[topNode]
                .filter(edge => !visitedMap[edge.node])
                .forEach(edge => {
                    stack.push(edge.node);
                    visitedMap[edge.node] = true;
                });
        }
    }
}

let g = new Graph();
g.addNode("A");
g.addNode("B");
g.addNode("C");
g.addNode("D");
g.addNode("E");
g.addNode("F");
g.addNode("G");

g.addEdge("A", "C");
g.addEdge("A", "B");
g.addEdge("A", "D");
g.addEdge("D", "E");
g.addEdge("E", "F");
g.addEdge("B", "G");

g.DFS("A");
```

결과 : A D E F B G C
