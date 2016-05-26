function addEventHandler(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	}else if (ele.attachEvent) {
		ele.attachEvent("on" + event, handler);
	}else {
		ele["on" + event] = handler;
	}
}

var traversalResult = [];
var timer = null;

function reset() {
	if (traversalResult.length != 0) { //还没有遍历结束
        var div = document.getElementsByTagName("div");
        for (var i = 0; i < div.length; i++) {
            div[i].style.backgroundColor = "#fff"; //重置背景颜色
        }
	}
    traversalResult = []; //重置遍历结果
    clearTimeout(timer);
}

//先序遍历 
function preOrder(node) {
	if (node != null) {
		traversalResult.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

//中序遍历
function inOrder(node) {
    if (node != null) {
    	inOrder(node.firstElementChild);
    	traversalResult.push(node);
    	inOrder(node.lastElementChild);
    }
}

//后序遍历
function postOrder(node) {
    if (node != null) {
    	postOrder(node.firstElementChild);
    	postOrder(node.lastElementChild);
    	traversalResult.push(node);
    }
}

//层次遍历
function levelOrder(node) {
	var queue = [];
	if (node != null) {
		queue.push(node);
		traversalResult.push(node);
	}

	while (queue.length != 0) {
		var currentTree = queue.shift();
		for (var i = 0; i < currentTree.childNodes.length; i++) {
            if (currentTree.childNodes[i].nodeType == "1") {
			    queue.push(currentTree.childNodes[i]);
			    traversalResult.push(currentTree.childNodes[i]);
            }
		} 
	}
}

//渲染
function render() {
	var head = traversalResult.shift();
    
	if (head) {	
        head.style.backgroundColor = "blue"; //存在背景显示    
	    //动态变化
	    timer = setTimeout(function () {
           head.style.backgroundColor = "#fff";
           render();
	    }, 1000);
	}else {
        clearTimeout(timer);
    }
}

//事件绑定
window.onload = function () {
    choose = document.getElementById("choose");
    addEventHandler(choose, "click", function (e) {
        var newchoose = e.target || e.srcElement;
        var root = document.getElementsByClassName("root")[0];

        switch (newchoose.id) {
        	case "preOrder":
        	    reset();
        	    preOrder(root);
        	    render();
        	    break;
        	case "inOrder":
        	    reset();
        	    inOrder(root);
        	    render();
        	    break;
        	case "postOrder":
        	    reset();
        	    postOrder(root);
        	    render();
        	    break;
        	case "levelOrder":
        	    reset();
        	    levelOrder(root);
        	    render();
        	    break;
        }
    });
}