function Tree(node) {
	this.traversalNodes = [];
	this.root = node;
}
Tree.prototype.DFS = function(node) {
	if (node) {
		var head = node.childNodes;
		for (var i = 0; i < head.length; i++) {
			console.log(123);
			if (head[i].nodeType === "1") {
				tree.traversalNodes.push(head[i]);
				DFS(head[i]);
			}
		}
	}
}

