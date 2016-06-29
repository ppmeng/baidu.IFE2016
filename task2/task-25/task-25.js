/***还是直接写好测试数据然后完成以下功能比较方便.最后改成在js里面直接生成测试数据
 **1: 实现添加节点----最后加上两个图片分别表示文件夹和文件，修改添加节点时
 **2：实现删除节点---若有子节点一并删除---删除前加上警告--和23类似
 **3：实现折叠和展开---点击时交替显示折叠状态和展开状态--类比23点击变色和恢复白色
 **4：实现模糊查找以及高亮显示结果，若其父节点为折叠状态则展开---还需要改进
 **5：实现重命名--统一文本节点class
 **6：添加右键功能来选择新建文件类型----有时间再改
 **/
//复用函数
function addEventHandler(ele, event, handler) {
    if (ele.addEventListener) {
    	ele.addEventListener(event, handler);
    }else if (ele.attachEvent) {
    	ele.attachEvent("on" + event, handler);
    }else {
    	ele["on" + event] = handler;
    }
}
function addClassName(target, name) {
    if (target.className == "") {
    	target.className = name;
    }else {
    	var oldClass = target.className;
    	var newClass = oldClass + " " + name;
    	target.className = newClass;
    }
}

function TreeNode(obj) {
	this.data = obj.data;
	this.parent = obj.parent;
	this.childs = obj.childs || [];
	this.selfElement = obj.selfElement;
	this.selfElement.TreeNode = this;
}

function Tree() {
	this.root = null;
	this.searchResalt = [];
}

Tree.prototype = {
	//遍历构造的树形结构而不是dom树
    search: function (data) {
    	this.clear();
    	if (data.trim() === "") {
    		alert("请输入要查找的文件名(不区分大小写)");
    		return false;
    	}
    	var treeRoot = this.root;
    	var rootValue = treeRoot.data;
        var input = data.replace(/\s+/g, "").toLowerCase();
        //console.log(input);
        
        var queue = [];
        
        queue.push(treeRoot);
        while (queue.length > 0) {
            var current = queue.shift();
            //console.log(current.data);
            if (current.data.replace(/\s+/g, "").toLowerCase() == input) {
            	//检查是否折叠
            	if (current.isFolded()) {
            		var domNode = current;
                    while (domNode.selfElement.id !== "root" && domNode.selfElement.className.indexOf("treeNode") !== -1) {
                    	domNode.toggleFold();
                    	domNode = domNode.parent;
                    }   
    	        }
            	//高亮显示data
            	current.highlight();
                //current.selfElement.style.backgroundColor = "red";
                this.searchResalt.push(current);
            }
            for (var i = 0; i < current.childs.length; i++) {
            	queue.push(current.childs[i]);
            }
        }
        var resalt = document.getElementById("resalt");

        if (this.searchResalt.length == 0) {
        	resalt.innerHTML = "没有找到匹配文件";
        }else {
        	resalt.innerHTML = "一共找到" + this.searchResalt.length + "个匹配文件";
        }
    },

    clear: function () {
    	var list = this.searchResalt;
    	for (var i = 0; i < list.length; i++) {
            list[i].nohighlight();
    	}
    	this.searchResalt = [];
    	document.getElementById("resalt").innerHTML = "";
    }
}
TreeNode.prototype = {
	constructor: TreeNode,
	//折叠展开高亮
	//是否为叶子节点
	highlight: function() {
        //高亮显示TreeNode里面的文本
        var text = this.selfElement.getElementsByClassName("treeNodeText")[0];
        text.style.backgroundColor = "yellow";
	},

	nohighlight: function() {
		var text = this.selfElement.getElementsByClassName("treeNodeText")[0];
        text.style.backgroundColor = "#fff";
	},

    toFold: function() {
        var list = this.childs;
        for (var i = 0; i < list.length; i++) {
            addClassName(list[i].selfElement, "hidden");
        }
    },

    toggleFold: function() {
    	var list = this.childs;
        for (var i = 0; i < list.length; i++) {
            list[i].selfElement.className = list[i].selfElement.className.replace(/hidden/g, "");
        }
    },

	isLeaf: function() {
		return this.childs.length == 0;
	},

	isFolded: function() {
		if (this.selfElement.className.indexOf("hidden") === -1) {
			return false;
		}
		return true;
	},

	//增加子节点 
    addChild: function (type, data) {
    	if (data.trim() == "") {
    		alert("节点内容不能为空！");
    		return this;
    	}
        if (this.isFolded) {
        	this.toggleFold();
        }
		var newNode = document.createElement("div");
		newNode.className = "treeNode";
		var para = document.createElement("p");
		para.className = "treelevel";
		var icon = document.createElement("span");
		var arrow = document.createElement("span");
		var fficon = document.createElement("span");
		icon.className = "icon";
		if (type == "folder") {
            fficon.className = "folder";
            var add = document.createElement("span");
		    add.className = "add visible";
		}else if(type == "file") {
			fficon.className = "file";
		}
		if (this.childs.length == 0 && this.selfElement.id !== "root") {
			var arrowicon = this.selfElement.getElementsByClassName("icon")[0].getElementsByTagName("span")[0];
			arrowicon.className = "arrow-down";
		}
		icon.appendChild(arrow);
		icon.appendChild(fficon);
		
		var treeNodeText = document.createElement("span");
		treeNodeText.innerHTML = data;
		treeNodeText.className = "treeNodeText";
		
		var del = document.createElement("span");
		del.className = "delete visible";
        
        para.appendChild(icon);
		para.appendChild(treeNodeText);
		if (type == "folder") {
            para.appendChild(add);
		}
        para.appendChild(del);
        newNode.appendChild(para);
        this.selfElement.appendChild(newNode);

        var addTreeNode = new TreeNode({data: data, parent: this, childs: [], selfElement: newNode});
        this.childs.push(addTreeNode);
        //console.log(this);
        return this;
	},

	//删除节点
    deleteSelf: function () {
        if (!this.isLeaf()) {
        	if (confirm("点击确定将删除此文件夹以及内部所有文件")) {
        		    for (var i = 0; i < this.childs.length; i++) {
        		    this.childs[i].deleteSelf();
        	    }
        	}else {
        		return false;
        	}
        }
        this.parent.selfElement.removeChild(this.selfElement);
        var index = this.parent.childs.indexOf(this);
        this.parent.childs.splice(index, 1);
        //console.log(this.parent.childs);

        if (this.parent.selfElement.id !== "root" && this.parent.childs.length == 0) {
            var arrowicon = this.parent.selfElement.getElementsByClassName("icon")[0].getElementsByTagName("span")[0];
			arrowicon.className = "";
        }
        //console.log(this.parent);      
    }
}


/**
 * 创建demo数据
 */
var tree = new Tree();
//创建树形组件的根节点
;
var treebox = document.getElementById("treebox");

var rootNode = document.createElement("div");
rootNode.setAttribute("id", "root");
rootNode.className = "treeNode";
var head = document.createElement("h2");
head.className = "treelevel";
var rootText = document.createElement("span");
rootText.className = "treeNodeText";
rootText.innerHTML = "计算机";
var add = document.createElement("span");
add.className = "add visible";

head.appendChild(rootText);
head.appendChild(add);
rootNode.appendChild(head);

treebox.appendChild(rootNode);
//创建树形组件的根对象
var treeRoot = new TreeNode({data: rootText.innerHTML, parent: null, childs: [], selfElement: rootNode});
tree.root = treeRoot;

treeRoot.addChild("folder", "C盘").addChild("folder", "D盘").addChild("folder", "E盘");
treeRoot.childs[0].addChild("file", "Windows").addChild("file", "Program Files").addChild("file", "ProgramData");
treeRoot.childs[1].addChild("file", "FireFox").addChild("file", "Program Files").addChild("file", "DownLoad");
treeRoot.childs[2].addChild("file", "JavaScript").addChild("file", "jQuery").addChild("file", "node.js");

/**
 * 事件绑定
 */
window.onload = function () {
	//重命名
	var allname = document.getElementsByClassName("treeNodeText"); 
	for (var i = 0; i < allname.length; i++) {
		addEventHandler(allname[i], "dblclick", function(e) {
			var treenodetext = this;
			var oldtext = treenodetext.innerHTML;
            this.innerHTML = "<input type='text'>";
            var input = treenodetext.getElementsByTagName("input")[0];
            input.value = oldtext;
            input.focus();
            input.onblur = function () {
            	var newtext = input.value;
            	if (newtext.trim() === "" || newtext == oldtext) {
            		treenodetext.innerHTML = oldtext;
            	}else {
            		treenodetext.innerHTML = newtext;
            	}
            	treenodetext.parentNode.parentNode.TreeNode.data = treenodetext.innerHTML; 
            }
        });
	}
	
	//search
    addEventHandler(document.getElementById("search"), "click", function(e) {
        tree.search(document.getElementById("searchText").value);
    });
    //clear
    addEventHandler(document.getElementById("clear"), "click", function(e) {
        document.getElementById("searchText").value = "";
        tree.clear();
    });
    
    addEventHandler(treeRoot.selfElement, "click", function(e) {
        var target = e.target || e.srcElement;
        var domNode = target;
        
    	while (domNode.className.indexOf("treeNode") == -1) {
    		domNode = domNode.parentNode;
    	}

    	//add and delete
        if (target && target.className.indexOf("delete") !== -1) {
            domNode.TreeNode.deleteSelf();
        }
        if (target && target.className.indexOf("add") !== -1) {
        	var type = prompt("新建一个新的文件夹?(默认新建文件夹，更改为file新建文件", "folder");
        	if (type!== null) {
        		domNode.TreeNode.addChild(type, prompt("请输入子结点的内容："));
        	}
        } 

    	//交替折叠和展开
    	if (target && target.className.indexOf("arrow-right") !== -1) {
        	target.className = target.className.replace(/arrow-right/g, "arrow-down");
        	domNode.TreeNode.toggleFold();
        }else if (target && target.className.indexOf("arrow-down") !== -1) {
        	target.className = target.className.replace(/arrow-down/g, "arrow-right");
        	domNode.TreeNode.toFold();
        }
    });
}


