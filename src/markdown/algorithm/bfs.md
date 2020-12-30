# 너비 우선 탐색 (BFS, Breadth-First Search)

그래프 탐색 알고리즘 중 하나인 너비 우선 탐색(BFS)에 대하여 알아본다.
<br><br>

### BFS 소개

- BFS는 루트노드(혹은 다른 임의의 노드)에서 시작해서 인접한 노드를 먼저 탐색하는 방법이다.

- 시작 정점으로부터 가까운 정점을 먼저 방문하고 멀리 떨어져 있는 정점을 나중에 방문하는 순회 방법이다.

- 즉, 깊게 탐색하기 전에 넓게 탐색하는 것이다.

- 큐(Queue)를 사용하여 구현한다.

- 최단 경로를 찾을 때 사용한다.

![object](/images/develop/bfs.gif 'object')
<br>

### 시간 복잡도

- 인접 리스트를 사용할 때 시간 복잡도 : O(V + E)

- 인접 행렬을 사용할 때 시간 복잡도 : O(V^2)

접점(V), 간선(E)
<br><br>

### Javascript로 BFS 구현

```javascript
class Queue {
  constructor() {
    this._arr = [];
  }
  enqueue(item) {
    this._arr.push(item);
  }
  dequeue() {
    return this._arr.shift();
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

  BFS(node) {
    const queue = new Queue();
    const visitedMap = {};
    queue.enqueue(node);
    visitedMap[node] = true;

    while (!queue.isEmpty()) {
      let headNode = queue.dequeue();
      console.log(headNode);

      this.edges[headNode]
        .filter(edge => !visitedMap[edge.node])
        .forEach(edge => {
          queue.enqueue(edge.node);
          visitedMap[edge.node] = true;
        });
    }
  }
}

let g = new Graph();
g.addNode('A');
g.addNode('B');
g.addNode('C');
g.addNode('D');
g.addNode('E');
g.addNode('F');
g.addNode('G');

g.addEdge('A', 'C');
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('B', 'G');

g.BFS('A');
```

결과 : A C B D G E F
