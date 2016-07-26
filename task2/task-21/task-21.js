<<<<<<< HEAD
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

function $(ele) {
	return document.querySelector(ele);
}
//事件绑定
window.onload = function () {
	addEventHandler($("#tag"), "keyup", showTag);
	addEventHandler($("#sure"), "click", showInterest);
	addEventHandler($("#tag-wrap"), "mouseover", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
        	e.target.innerHTML = "点击删除" + e.target.innerHTML;
        	e.target.style.backgroundColor = "#FF0000";
        }
	});
	addEventHandler($("#tag-wrap"), "mouseout", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
        	e.target.innerHTML = e.target.innerHTML.substr(4);
        	e.target.style.backgroundColor = "#78BCFB";
        }
	});
	addEventHandler($("#tag-wrap"), "click", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
        	var attr = e.target.innerHTML.substr(4);
        	delete tagObj[attr];
        	render(tagObj, $("#tag-wrap"));
        }
	});
}

function strToObj (str, Obj) {
	//将输入的字符串用之间的逗号句号分号顿号空白以及换行键分开
    var segmentList = str.trim().split(/[,;.，；。、\s\n]+/);
    for (var i = 0; i < segmentList.length; i++) {
        var vel = segmentList[i];
        if (vel != "") {
            Obj[vel] = vel;
        }
    }
   //超过十个删除
   for (var a in Obj) {
   	    if (Object.getOwnPropertyNames(Obj).length > 10) { 
        	delete Obj[a];
        }	
    }
    return Obj;
}

//渲染
function render(Obj, divWrap) {
	divWrap.innerHTML = "";
    for(e in Obj) {
    	var span = document.createElement("span");
    	span.innerHTML = e;
    	divWrap.appendChild(span);
    }
}

//初始化变量
var tagObj = {}, interestObj = {};

//标签
function showTag() {
	var tagInput = $("#tag").value;
	var tagWrap = $("#tag-wrap");
	if ((/[,.;，。；、\s\n]+/).test(tagInput) || event.keyCode == 13) {
		tagObj = strToObj(tagInput, tagObj);
		render(tagObj, tagWrap);
		$("#tag").value = "";
	}
}   

//兴趣爱好
function showInterest() {
	var interestInput = $("#interest").value;
	var interestWrap = $("#interest-wrap");
	interestObj = strToObj(interestInput, interestObj);
	render(interestObj, interestWrap);
	$("#interest").value = "";
=======
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

function $(ele) {
	return document.querySelector(ele);
}
//事件绑定
window.onload = function () {
	addEventHandler($("#tag"), "keyup", showTag);
	addEventHandler($("#sure"), "click", showInterest);
	addEventHandler($("#tag-wrap"), "mouseover", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
        	e.target.innerHTML = "点击删除" + e.target.innerHTML;
        	e.target.style.backgroundColor = "#FF0000";
        }
	});
	addEventHandler($("#tag-wrap"), "mouseout", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
        	e.target.innerHTML = e.target.innerHTML.substr(4);
        	e.target.style.backgroundColor = "#78BCFB";
        }
	});
	addEventHandler($("#tag-wrap"), "click", function(e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
        	var attr = e.target.innerHTML.substr(4);
        	delete tagObj[attr];
        	render(tagObj, $("#tag-wrap"));
        }
	});
}

function strToObj (str, Obj) {
	//将输入的字符串用之间的逗号句号分号顿号空白以及换行键分开
    var segmentList = str.trim().split(/[,;.，；。、\s\n]+/);
    for (var i = 0; i < segmentList.length; i++) {
        var vel = segmentList[i];
        if (vel != "") {
            Obj[vel] = vel;
        }
    }
   //超过十个删除
   for (var a in Obj) {
   	    if (Object.getOwnPropertyNames(Obj).length > 10) { 
        	delete Obj[a];
        }	
    }
    return Obj;
}

//渲染
function render(Obj, divWrap) {
	divWrap.innerHTML = "";
    for(var e in Obj) {
    	var span = document.createElement("span");
    	span.innerHTML = e;
    	divWrap.appendChild(span);
    }
}

//初始化变量
var tagObj = {}, interestObj = {};

//标签
function showTag() {
	var tagInput = $("#tag").value;
	var tagWrap = $("#tag-wrap");
	if ((/[,.;，。；、\s\n]+/).test(tagInput) || event.keyCode == 13) {
		tagObj = strToObj(tagInput, tagObj);
		render(tagObj, tagWrap);
		$("#tag").value = "";
	}
}   

//兴趣爱好
function showInterest() {
	var interestInput = $("#interest").value;
	var interestWrap = $("#interest-wrap");
	interestObj = strToObj(interestInput, interestObj);
	render(interestObj, interestWrap);
	$("#interest").value = "";
>>>>>>> master
}