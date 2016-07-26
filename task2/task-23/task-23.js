<<<<<<< HEAD
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

var root = document.getElementsByClassName("root")[0];
var tree = new Tree(root);
tree.DFS;
console.log(tree.traversalNodes);
=======
//复用函数以及变量
var lock; //布尔值，表示是否正在遍历
var choose = []; //标记选定的节点(用于添加和删除)

function addEventHandler(ele, event, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(event, handler, false); //false 事件在冒泡阶段执行
    }else if (ele.attachEvent) { //早期IE等
        ele.attachEvent("on" + event, handler);
    }else {
        ele["on" + event] = handler;
    }
}

function clearColor(tree) {
	var traversalResult = [];
    traversalDF(tree, traversalResult);
    traversalResult.forEach(function(ele) {
    	ele.style.backgroundColor = "#fff";
    })
}

/**
 * DFS深度优先搜索
 */
function traversalDF(node, traversalResult) {
    if (node && node.nodeType == "1") {
        traversalResult.push(node);
        for (var i = 0, len = node.childNodes.length; i < len; i++) {
            traversalDF(node.childNodes[i], traversalResult);
        }
    }
}

/**
 * BFS广度优先搜索
 */
function traversalBF(node, traversalResult) {
    var index = 0;
    (function BFS(node, nodelist) {
        if (node && node.nodeName.toLowerCase() == "div") { //根节点有兄弟节点<script>
            nodelist.push(node);
            BFS(node.nextElementSibling, nodelist);
            var node = nodelist[index++];
            BFS(node.firstElementChild, nodelist);
        }
    })(node, traversalResult);
}

/**
 * 添加节点
 */
function insertNode(choose, input) {
    for (var i = 0, len = choose.length; i < len; i++) {
    	var divNode = document.createElement("div");
        divNode.innerHTML = input;
        divNode.style.border = "1px solid #888";
    	choose[i].appendChild(divNode);
    }
}

function deleteNode(nodes) {
    if (nodes.length == 0) return false;
    var length = nodes.length;
    for (var i = 0; i < length; i++) {
        nodes[i].parentNode.removeChild(nodes[i]);
    }
    return true;
}
/**
 * 删除节点
 */

function $(ele) {
    return document.querySelector(ele);
}

//渲染动画
function animation(nodelist, input) {
    lock = true; //遍历中
    var input = input || null;
    (function render() {
        var next = nodelist.shift();
        //console.log(next.attributes); //注意和script和root为兄弟节点
        if (next != null) {
        	next.style.backgroundColor = "blue";
            //模糊查询，忽略所有空格以及大小写
            var currentNodevalue = next.firstChild.nodeValue.replace(/\s+/g, "");
            input = input.replace(/\s+/g, "");
            var equal = (currentNodevalue.toLowerCase() == input.toLowerCase());

            setTimeout(function() {
                if (equal) {
                	next.style.backgroundColor = "red";
                    //return false; //若只想查询第一个指定文本的节点则直接返回
                }else {
                    next.style.backgroundColor = "#fff"; 
                }
                render();
            }, 500);
        }else {
            lock = false; //遍历结束
        }
    })();
}

function traverse(selectOperator) {
    var rootNode = $(".root");
    var input = document.getElementById("input").value;
    //console.log(input);
    traversalResult = [];
    if (selectOperator.id == "DFS") {
    	clearColor($(".root"));
        traversalDF(rootNode, traversalResult);
        //console.log(traversalResult.length);
    }else if (selectOperator.id == "BFS") {
    	clearColor($(".root"));
        traversalBF(rootNode, traversalResult);
    }else if (selectOperator.id == "search") {
    	clearColor($(".root"));
    	if (input) {
            traversalDF(rootNode, traversalResult); //默认查询方式为DFS
        }else {
        	alert("请输入查询的节点内容");
        }
    }else if (selectOperator.id == "insert") {
    	if (!input) {
    		alert("请输入要插入的节点内容")
        }else {
            insertNode(choose, input);
        }
    }else if (selectOperator.id == "delete") {
    	if (confirm("确定将选中节点以及其下子节点全部删除？")) {
            deleteNode(choose);
            choose = [];
        }
    }
   animation(traversalResult, input);
}

//事件绑定
window.onload = function () {
    var operator = document.getElementsByName("button");
    for (var i = 0, len = operator.length; i < len; i++) {
        //console.log(operator[i].id); //可以正确显示
        (function(i) {
            addEventHandler(operator[i], "click", function() {
                if (lock == true) {
                    alert("正在遍历中！");
                }else {
                    traverse(operator[i]);
                    //console.log(operator[i].id); //形成闭包,开始时没在意发现不能传递正确的i             
                }
            });
        })(i);
    }

    addEventHandler($(".root"), "click", function(e) {
        if (e.target || e.target.nodeName.toLowerCase() == "div") {
        	//点击一次选定节点，点击两次取消
        	if (!e.target.style.backgroundColor) {
        	    e.target.style.backgroundColor = "#888";
        	    choose.push(e.target);
        	}else {
                e.target.style.backgroundColor = "";
                choose.splice(choose.indexOf(e.target), 1);               
        	}
        } 
    });

}
>>>>>>> master
