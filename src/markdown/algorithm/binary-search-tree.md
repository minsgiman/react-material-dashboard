# Javascript로 이진탐색트리 구현하기

이진탐색트리(Binary Search Tree)는 다음과 같은 속성이 있는 이진트리 자료구조이다.

* 노드의 왼쪽 서브트리에는 그 노드의 값보다 작은 값들을 지닌 노드들로 이루어져 있다.

* 노드의 오른쪽 서브트리에는 그 노드의 값과 같거나 큰 값들을 지닌 노드들로 이루어져 있다.

* 좌우 하위 트리는 각각이 다시 이진 탐색 트리여야 한다.
<br><br>

이진탐색트리를 구현하고 삽입, 삭제, 중위순회(Inorder traversal)를 테스트하였다.

```javascript
const LEFT = 0;
const RIGHT = 1;

class TreeNode {
    constructor(value) {
        this.value = value;
        this.descendents = {};
        this.meta = {};
        this.parent = null;
    }

    get left() {
        return this.descendents[LEFT];
    }

    set left(node) {
        this.descendents[LEFT] = node;
        if (node) {
            node.parent = this;
            node.isParentLeftChild = true;
        }
    }

    get right() {
        return this.descendents[RIGHT];
    }

    set right(node) {
        this.descendents[RIGHT] = node;
        if (node) {
            node.parent = this;
            node.isParentLeftChild = false;
        }
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    add(value) {
        const newNode = new TreeNode(value);

        if (this.root) {
            const { found, parent } = this.findNodeAndParent(value);
            if (found) { // value already exist on the tree
                found.meta.multiplicity = (found.meta.multiplicity || 1) + 1;
            } else if (value < parent.value) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        } else {
            this.root = newNode;
        }

        this.size += 1;
        return newNode;
    }

    findNodeAndParent(value) {
        let node = this.root;
        let parent;

        while (node) {
            if (node.value === value) {
                break;
            }
            parent = node;
            node = ( value > node.value ) ? node.right : node.left;
        }

        return { found: node, parent };
    }

    find(value) {
        let node = this.root;
        let found;

        while (node) {
            if (node.value === value) {
                found = node;
                break;
            }
            node = ( value > node.value ) ? node.right : node.left;
        }
        return found;
    }

    remove(value) {
        const nodeToRemove = this.find(value);
        if (!nodeToRemove) return false;

        // Combine left and right children into one subtree without nodeToRemove
        const nodeToRemoveChildren = this.combineLeftIntoRightSubtree(nodeToRemove);
        console.log('nodeToRemoveChildren val : ' + nodeToRemoveChildren.value);

        if (nodeToRemove.meta.multiplicity && nodeToRemove.meta.multiplicity > 1) {
            nodeToRemove.meta.multiplicity -= 1;
        } else if (nodeToRemove === this.root) {
            this.root = nodeToRemoveChildren;
            this.root.parent = null;
        } else {
            const parent = nodeToRemove.parent;
            if (nodeToRemove.isParentLeftChild) {
                parent.left = nodeToRemoveChildren;
            } else {
                parent.right = nodeToRemoveChildren;
            }
        }

        this.size -= 1;
        return true;
    }

    combineLeftIntoRightSubtree(node) {
        if (node.right) {
            const leftmost = this.getLeftmost(node.right);
            leftmost.left = node.left;
            return node.right;
        }
        return node.left;
    }

    getLeftmost(node) {
        if (node.left) {
            let leftmost = node.left;
            while (leftmost.left) {
                leftmost = leftmost.left;
            }
            return leftmost;
        }
        return node;
    }

    inOrderTraversal(node = this.root) {
        if (!node) {
            return;
        }
        if (node.left) { this.inOrderTraversal(node.left); }
        console.log(node.value);
        if (node.right) { this.inOrderTraversal(node.right); }
    }
}

const bst = new BinarySearchTree();

bst.add(5);
bst.add(2);
bst.add(7);
bst.add(6);
bst.add(8);
bst.add(4);
bst.add(1);
bst.add(3);
bst.remove(5);

bst.inOrderTraversal();
```

결과 : 1 2 3 4 6 7 8

<br>

***

### 참조
* Tree Data Structures in JavaScript for Beginners<br>
<https://adrianmejia.com/data-structures-for-beginners-trees-binary-search-tree-tutorial/>


