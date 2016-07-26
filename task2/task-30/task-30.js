function addEventHandler(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler);
	}else if (ele.attachEvent) {
		ele.attachEvent("on" + event, handler);
	}else {
		ele["on" + event] = handler;
	}
}

function verifyForm() {
	var inputIdList = ["name", "password", "confirm-pw", "email", "tel"];
	var infoList = [
	                  {id: "name-info", hint: "必填，长度为4~16个字符",right:"名称格式正确", wrong: "名称格式错误", isOK: false},
	                  {id: "password-info", hint: "必填，长度为6~16个字符，包含字母和数字", right: "密码可用", wrong: "密码不可用", isOK: false},
	                  {id: "confirm-pw-info", hint: "必填，必须和前面密码一致", right: "密码输入一致", wrong: "密码输入不一致", isOK: false},
	                  {id: "email-info", hint: "填写正确的邮箱格式", right: "邮箱格式正确", wrong: "邮箱格式错误", isOK: false},
	                  {id: "tel-info", hint:"填写正确的手机号码", right: "手机格式正确", wrong: "手机格式错误", isOK: false}
                   ];
	var verifyById = function(id) {
        var input = document.getElementById(id);
        var index = inputIdList.indexOf(id);
        var value = input.value;
        var info = document.getElementById(id + "-info");
        var flag = false;
        switch (id) {
        	case "name":     	    
        	    flag = /^[a-zA-Z0-9_]{4,16}$/.test(value.replace(/[\u4e00-\u9fa5]/g, "aa"));
        	    break;
            case "password":
                flag = /^[a-zA-Z0-9]{6,16}$/.test(value); 
                break;
            case "confirm-pw":
                flag = document.getElementById("password").value === value;
                break;
            case "email":
                flag = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value);
                break; 
            case "tel":
                flag = /^1[0-9]{10}$/.test(value); 
                break;   
        }

        if (flag) {
            input.style.borderColor = "green";
            info.innerHTML = infoList[index].right;
            info.style.color = "green";
            infoList[index].isOK = true;
        }else {
        	input.style.borderColor = "red";
        	info.innerHTML = infoList[index].wrong;
            info.style.color = "red";
            infoList[index].isOK = false;
        }
    };
    
    for (var i = 0; i < inputIdList.length; i++) {
    	var inputId = inputIdList[i];
    	var input = document.getElementById(inputId);
    	var hint = infoList[i].hint;
    	addEventHandler(input, "focus", function() {
            info = document.getElementById(this.id + "-info");
            info.innerHTML = hint;
            info.style.visibility = "visible";
            //input.style.borderColor = "gray";
            info.style.color = "#888";

    	});
    	
    	addEventHandler(input, "blur", function() {
    		verifyById(this.id);
    	});
    }
    addEventHandler(document.getElementById("submit"), "click", function(e) {
		e.preventDefault();
		var list = [];
		var i = 0;
		//验证所有isOK
		inputIdList.forEach(function(v) {
			info = document.getElementById(v + "-info");
            info.style.visibility = "visible";
			verifyById(v);
			list.push(infoList[i++].isOK);
		});
                
		if (list.indexOf(false) == -1) {
			alert("提交成功");
		}else {
			alert("提交失败");
		}
	});
}

window.onload = function() {
	verifyForm();
}
