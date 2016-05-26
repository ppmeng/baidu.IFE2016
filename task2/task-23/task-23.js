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
        if (node && node.nodeType == "1") {
            nodelist.push(node);
            BFS(node.nextElementSibling, nodelist);
            var node = nodelist[index++];
            BFS(node.firstElementChild, nodelist);
        }
    })(node, traversalResult);
}


function $(ele) {
    return document.querySelector(ele);
}

//渲染动画
function animation(nodelist, input) {
    lock = true;
    var input = input || null;
    //console.log(input);
    (function render() {
        var next = nodelist.shift();
        if (next) {
            alert(next.firstChild.nodeValue.replace("/(^\s*) | (\s*$)/g"), "");
            next.style.backgroundColor = "blue";
            setTimeout(function() {
                if (!input || next.firstChild.nodeValue.replace(("/(^\s*)|(\s*$)/g"), "") !== input) {
                    next.style.backgroundColor = "#fff";
                    render();
                }else {
                    next.style.backgroundColor = "red";
                    return;
                }
            }, 500);
        }else {
            lock = false;
        }
    })();
}

//复用函数以及变量
var lock; //布尔值，表示是否正在遍历
function addEventHandler(ele, event, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(event, handler, false); //false 事件在冒泡阶段执行
    }else if (ele.attachEvent) { //早期IE等
        ele.attachEvent("on" + event, handler);
    }else {
        ele["on" + event] = handler;
    }
}

function traverse(selectOperator) {
    var rootNode = $(".root");
    var input = document.getElementById("input").value;
    console.log(input);
    traversalResult = [];
    if (selectOperator.id == "DFS") {
        traversalDF(rootNode, traversalResult);
        //console.log(traversalResult.length);
    }else if (selectOperator.id == "BFS") {
        traversalBF(rootNode, traversalResult);
        //console.log(traversalResult.length);  //不知道为什么长度为21，多了一个
    }else if (selectOperator.id == "search") {
        traversalDF(rootNode, traversalResult); //默认查询方式为DFS
    }else if (selectOperator.id == "insert") {

    }else if (selectOperator.id == "delete") {

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
}