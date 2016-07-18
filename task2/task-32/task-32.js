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
        validator: function () {...},    // 表单验证规
        rules: '必填，长度为4-16个字符',    // 填写规则提示
        success: '格式正确',              // 验证通过提示
        fail: '名称不能为空'               // 验证失败提示
    }
*/

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
  * 联动部分
  */
function fieldsetDispaly() {
	var formType = document.getElementsByName("type");
    var ruleBox = document.getElementById("rule-box");
    var optionBox = document.getElementById("option-box");
    var lengthBox = document.getElementById("length-box");

	for (var i = 0; i < formType.length; i++) {
		addEventHandler(formType[i], "click", function() {
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
	/*switch (formType){
		case: "text";
	    case: "textarea";
	    case: "file";
	    case: "radio";
	    case: "checkbox";
	    case: "select";
	}*/
	    
}
fieldsetDispaly();
