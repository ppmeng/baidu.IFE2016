/* 
    1:联动---除表单标签以及必填选填一直显示外，
                   单行文本域显示表单验证规则以及填写规则提示
                   单选 多选 下拉 均显示选项
                   其他类型默认显示
    2：选项部分参考之前队列的练习（间隔 显示 删除）
    3：尽量表单配置 生成 样式 验证逻辑之间耦合足够低，易扩展以及复用
    4: 表单配置数据参考：
    {
        label: '名称',                    // 表单标签
        type: 'input',                   // 表单类型
        validator: function () {...},    // 表单验证规则
        rules: '必填，长度为4-16个字符',    // 填写规则提示
        success: '格式正确',              // 验证通过提示
        fail: '名称不能为空'               // 验证失败提示
    }
*/
function addLoadEvent(func) {
	var oldOnload = window.load;
	if (typeof oldOnload !== "function") {
        window.onload = func;
	}else {
        window.onload = function () {
        	oldfunc();
        	func();
        }
	}
}

function addEventHandler(ele, event, handler) {
	if(ele.addEventListener) {
		ele.addEventListener(event, handler, false);//事件在冒泡阶段进行(默认)
	}else if(ele.attachEvent) {
		ele.attachEvent("on" + event, handler); //for lt IE8 and lt Opera7.0
	}else {
		ele["on" + event] = handler;
	}
}

/**
  * 联动部分,利用click操作设置display
  */
function fieldsetDisplay() {
	var typeBox = document.getElementById("type-box");
	var formType = document.getElementsByName("type");
    var ruleBox = document.getElementById("rule-box");
    var optionBox = document.getElementById("option-box");
    var lengthBox = document.getElementById("length-box");

    for (var i = 0; i < formType.length; i++) {
		addEventHandler(formType[i], "click", function() {
			typeBox.className = this.id;
            switch (this.id) {
            	case "text":
            	    ruleBox.style.display = "block";
                    optionBox.style.display = "none";
                    lengthBox.style.display = "block";
                    break;
                case "textarea":
                case "file":
                    ruleBox.style.display = "none";
                    optionBox.style.display = "none";
                    lengthBox.style.display = "none";
                    break;
                case "radio":
                case "checkbox":
                case "select":
                    ruleBox.style.display = "none";
                    optionBox.style.display ="block";
                    lengthBox.style.display = "none";
                    break;
            }
		});
	}
	var ruleList = document.getElementsByName("rule");
	for (var j = 0; j < ruleList.length; j++) {
        addEventHandler(ruleList[j], "click", function() {
        	ruleBox.className = this.id.split("-")[0];
            if (this.id === "text-rule" || this.id === "number-rule" || this.id === "password-rule") {
                lengthBox.style.display = "block";
            }else {
            	lengthBox.style.display = "none";
            }
        });
	}

	var tips = document.getElementsByName("required");
    for (var i = 0; i < tips.length; i++) {
    	addEventHandler(tips[i], "click", function() {
            document.getElementById("tip-box").className = this.id;
    	});
    }
}	    
addLoadEvent(fieldsetDisplay);


/**
  * 选项部分 触发-查重-渲染-删除（参考21，所以提前预设若为多行文本域的话只需要改动触发条件即可）
  * 二次修改，虽然使用对象存储的话会避免重复，但是会出现遍历的顺序不可控
  * 导致增减删除都出现bug，改用数组存储，加上去重的方法
  */
function ShowTag(inputbox, sepReg, showbox) {
    this.inputbox = inputbox;
    this.sepReg = sepReg;
    this.showbox = showbox;
    this.list = [];  //2：换用数组存储，原因见上，使用对象的话参考task21
    this.maxlength = 10; //超过10个选项会从头开始删除保证最多有10个选项
}

ShowTag.prototype = {
    addToList: function() {
        /*如果想设置成全部输入结束后再按照输入分离每个选项的话修改触发方法就可以*/
        var segList = this.inputbox.value.trim().split(this.sepReg);
        
        for (var i = 0; i < segList.length; i++) {
        	var vel = segList[i];
            if (vel != "") {
        		this.list.push(vel);
        	}
        }
    },
    
    delRepeat: function() {
        for (var i = 0; i < this.list.length; i++) {
        	for (var j = i + 1; j < this.list.length; j++) {
                if (this.list[i] === this.list[j]) {
                	this.list.splice(j, 1);
                	j--;
                }
        	}
        }
	},
    
    render: function() {
		var optionwarn = document.getElementById("option-warn");
        if (this.list.length >= this.maxlength) {
        	optionwarn.innerHTML = "最多可设定" + this.maxlength + "个选项"; 
        	optionwarn.style.color = "red";
        	for (var i = 0 ; i < this.list.length; i++) {
        		if (this.list.length > this.maxlength) {
        			this.list.pop();
        		}
        	}  	
        }else {
            optionwarn.innerHTML = "选项可以通过点击逗号，句号，分号(半角全角均可)，顿号，回车，空格分隔开";
            optionwarn.style.color = "#888";
        }

        //console.log(this.list);
    	this.showbox.innerHTML = "";
    	//根据ES5，对象的遍历顺序是没有被规定的，所以在遵循ECMA262第五版的浏览器下并不是按照属性构建的先后顺序渲染
		for (var i in this.list) {
            var span = document.createElement("span");
            span.className = "optiontag";
            span.innerHTML = this.list[i];
            this.showbox.appendChild(span);
		}
	},
    //单行文本域触发条件
	show: function() {
		var value = this.inputbox.value;
		if (this.sepReg.test(value)|| event.keyCode === 13) {
			this.addToList();
			this.delRepeat();
			this.render();
            this.inputbox.value = ""; //输入框置空
		}
	},
    //事件绑定
	init: function() {
        addEventHandler(this.inputbox, "keyup", this.show.bind(this));
        
        addEventHandler(this.showbox, "mouseover", function(e) {
        	var target = e.target || e.srcElement;
            if (target && target.nodeName.toLowerCase() === "span") {
                target.innerHTML = "点击删除" + target.innerHTML;
                target.style.backgroundColor = "red";
            }
        });

        addEventHandler(this.showbox, "mouseout", function(e) {
        	var target = e.target || e.srcElement;
        	if (target && target.nodeName.toLowerCase() === "span") {
        		target.innerHTML = target.innerHTML.toString().substr(4);
        		target.style.backgroundColor = "blue";
        	}
        });
        var showtag = this;
        addEventHandler(this.showbox, "click", function(e) {
        	var target = e.target || e.srcElement;
            if (target && target.nodeName.toLowerCase() === "span") {
                var index = showtag.list.indexOf(target.innerHTML.substr(4));
                showtag.list.splice(index, 1);
                showtag.render();
            }
        })
	}	
}
var input = document.getElementById("write-option");
var showbox = document.getElementById("option-wrap");
var showtag = new ShowTag(input, /[,;.，；。、\s\n\r]+/, showbox);//\n 10 换行；\r 13 回车
showtag.init();



//表单数据生成以及展示
 /*{
    label: '名称',                    // 表单标签
    type: 'input',                   // 表单类型
    validator: function () {...},    // 表单验证规则
    rules: '必填，长度为4-16个字符',    // 填写规则提示
    success: '格式正确',              // 验证通过提示
    fail: '名称不能为空'               // 验证失败提示
}
*/
function FormData(showdatabox) {
	this.type = document.getElementById("type-box").className;
	this.label = document.getElementById("label").value;
	this.style = document.getElementById("style").value;
	this.rule = document.getElementById("rule-box").className;
	this.option = showtag.list;
	this.minlength = document.getElementById("min-len").value;
	this.maxlength = document.getElementById("max-len").value;
	this.showdatabox = document.getElementById(showdatabox);
}

FormData.prototype = {
	tip: function() {
    	var tipBox = document.getElementById("tip-box");
	    var str = document.getElementById(tipBox.className).nextElementSibling.innerHTML;
	    str += ",长度为" + this.minlength + "到" + this.maxlength + "个字符";
	    return str;
    },
    
    render: function() {
    	var databox = document.createElement("div");
    	databox.id = "box" + index;
        
        var inner = "";
        var id = "form" + index;
    	switch (this.type) {
    		case "text":
    		    inner = "<label for = '"+id+"'>" + this.label + "</label><input type='"+this.type+"' id='"+id+"'>";
    		    break;
    		case "textarea":
                inner = "<label for = '"+id+"'>" + this.label + "</label><textarea id='"+id+"'></textarea>"
    		    break;
            case "file":
                inner = "<label for = '"+id+"'>" + this.label + "</label><input type='"+this.type+"' id='"+id+"'>";
                break;
            case "radio":
            case "checkbox":
                inner += "<label>" + this.label + '</label>';
                for (var i = 0; i < this.option.length; i++) {
                	console.log(this.type);
                	inner += "<input type='"+this.type+"' name='"+id+"' id='"+(id+i)+"'>";
                	inner += "<label for = '"+(id+i)+"'>" + this.option[i] + "</label>";
                }
                break;
            case "select": 
                inner += "<label for='form"+index+"'>" + this.label + "</label>";
                inner += "<select id='form"+index+"'>";
                for (var i = 0; i < this.option.length; i++) {
                	inner += "<option>" +this.option[i]+ "</option>";
                }
                break;
    	}
        databox.innerHTML = inner;
        this.showdatabox.appendChild(databox);
        index++;
        return databox;
    },

    validator: function() {
    	switch(this.rule) {
            case "text": 
                
                break;
            case "number": break;
            case "password": break;
            case "email": break; 
            case "tel": break;
    	}
    },


  /*  Limitlength: function() {

    }*/


}
   
var index = 0;
addEventHandler(document.getElementById("add-button"), "click", function() {
	var data = new FormData("form-wrap");
	/*console.log(data);
	console.log(data.type);
	console.log(data.label);
	console.log(data.style);
	console.log(data.rule);
	console.log(data.option);
	console.log(data.minlength);
	console.log(data.maxlength);
	console.log(data.tip());*/
	console.log(data.render());
});



