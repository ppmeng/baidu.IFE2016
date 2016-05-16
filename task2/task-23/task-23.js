function Tree(node) {
	this.traversalNodes = [];
	this.root = node;
}

/**
 * DFS深度优先搜索
 */
Tree.prototype.DFS = function(callback) {
	var list = [];
	(function recurse(currentNode) {
        list.push(currentNode);
        for (var i = 0; i < currentNode.children.length; i++) {
        	recurse(curentNode.children[i]);
        }
        callback ? callback(currentNode) : null;
	})(this.root);
	this.traversalNodes = list;
};

Tree.prototype.BFS = function(callback) {
    var list = [],
        currentNode = this.root;
    this.traversalNodes = [];
    this.traversalNodes.push(currentNode);
    while (currentNode) {
    	var len = currentNode.childNodes.length;
    	for (var i = 0; i < len; i++) {
    		list.push(currentNode.childNodes[i]);
    	}
    	callback ? callback(currentNode) : null;
    	currentNode = list.shift();
    }
};

