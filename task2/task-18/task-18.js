function addEventHandler(elenode, event, handler) {
    if (elenode.addEventListener) {
        elenode.addEventListener(event, handler, false);
    }
    else if (elenode.attachEvent) {
        elenode.attachEvent("on" + event, handler);
    }
    else {
        elenode["on" + event] = handler;
    }
}
window.onload = function() {
    var leftIn = document.getElementById("leftIn");
    var rightIn = document.getElementById("rightIn");
    var leftOut = document.getElementById("leftOut");
    var rightOut = document.getElementById("rightOut");

    //四种点击事件
    addEventHandler(leftIn, "click", LIhandler);
    addEventHandler(rightIn, "click", RIhandler);
    addEventHandler(leftOut, "click", LOhandler);
    addEventHandler(rightOut, "click", ROhandler);
}

var list = new Array();
function LIhandler() {
    var input = document.getElementsByTagName("input")[0].value;
    //检查输入是否合法
    if (parseInt(input) != input) {
        alert ("输入不合法，请点击确定后再次输入整数，中间不要带有空格");
    }
    else {
        list.unshift(input);
        renderbox(list);
    }
}

function RIhandler() {
    var input = document.getElementsByTagName("input")[0].value;
    //检查输入是否合法
    if (parseInt(input) != input) {
        alert ("输入不合法，请点击确定后再次输入整数，中间不要带有空格");
    }
    else {
        list.push(input);
        renderbox(list);
    }
}

function LOhandler() {
    var firstnum = list.shift();
    //判断队列是否为空
    if (!firstnum) {
        alert ("已经没有数字啦");
    }
    else{
        alert(firstnum);
        renderbox(list);
    }
}

function ROhandler() {
    lastnum = list.pop();
    //判断队列是否为空
    if (!lastnum) {
        alert ("已经没有数字啦");
    }
    else {
        alert(lastnum);
        renderbox(list);
    }
}

//重绘队列
var boxlist = document.createElement("div");
document.body.appendChild(boxlist);
function renderbox(list) {
    boxlist.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var box = document.createElement("div");
        box.setAttribute("class", "box");
        box.innerHTML = list[i];
        boxlist.appendChild(box);
        /*字符串拼接方法
        var text = ["<div class='box'>", list[i], "</div>"].join("");
        boxlist.innerHTML += text;*/
    }
    //点击时删除节点
    boxlist.onclick = function() {
        //call,改变this的指向，event.target不兼容IE,IE下换用event.srcElement
        var nownode = event.target || event.srcElement;
        var theindex = [].indexOf.call(nownode.parentNode.childNodes, nownode);
        list.splice(theindex, 1);
        renderbox(list);
    }
}

