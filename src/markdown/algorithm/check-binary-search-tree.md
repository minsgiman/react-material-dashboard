# 이진트리가 이진탐색트리인지 판별하기

정순회(Inorder traversal)를 시행하며 마지막으로 검사했던 노드를 저장해두고 다음에 그 다음 노드와 비교한다.

```javascript
let last_checked = null;
function checkBST(treeNode) {
  if (!treeNode) {
    return true;
  }
  
  if (!checkBST(treeNode.left)) {
    return false;
  }
  
  if (last_checked !== null && treeNode.data <= last_checked) {
    return false;
  }
  last_checked = treeNode.data;
  
  if (!checkBST(treeNode.right)) {
    return false;
  }
  
  return true;
}
```


