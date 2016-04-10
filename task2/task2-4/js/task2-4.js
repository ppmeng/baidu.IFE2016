//初始化
var aqiData = {};

//按照指定的格式存储并完成输入验证
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var values = document.getElementById("aqi-value-input").value.trim();
    if (!city || !values) {
    	alert("输入不能为空");
    	return false;
    }
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
    	alert("城市名必须为中英文字符");
    	return false;
    }
    if (!values.match(/\d+/g)) {
    	alert("空气质量指数必须为整数");
    	return false;
    }
    aqiData[city] = values;
}

//渲染aqi-table表格
function renderAqiList() {
    var aqi_table = document.getElementById("aqi-table");
    aqi_table.innerHTML = "";
    for (var city in aqiData) {
        if (aqi_table.childNodes.length === 0) {
            aqi_table.innerHTML = "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";
        }
        var list_tr = document.createElement("tr");
        var citystr = document.createElement("td");
        var citystr_text = document.createTextNode(city);
        citystr.appendChild(citystr_text);
        var valuestr = document.createElement("td");
        valuestr.innerHTML = aqiData[city];
        var button = document.createElement("td");
        button.innerHTML = "<button>删除</button>";
        list_tr.appendChild(citystr);
        list_tr.appendChild(valuestr);
        list_tr.appendChild(button);
        aqi_table.appendChild(list_tr);
    }
}

function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

function delBtnHandle(button) {
	var clicktr = button.parentNode.parentNode;
    var city = clicktr.childNodes[0].innerHTML;
    delete aqiData[city];
    renderAqiList();
}

function init() {
    //给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").onclick = addBtnHandle;

    // 给所有删除button绑定点击事件，点击时触发delBtnHandle函数
	var aqi_table = document.getElementById("aqi-table");
    if (aqi_table.addEventListener) {
        aqi_table.addEventListener("click", function(event) {
            if (event.target && event.target.nodeName.toLowerCase() === "button") {
                delBtnHandle(event.target);
            }
        })
    }
    //兼容IE 8 之前版本
    else if (aqi_table.attachEvent) {
        aqi_table.attachEvent("onclick", function(event) {
            if (event.target && event.target.nodeName.toLowerCase() === "button") {
                delBtnHandle(event.target);
            }
        })
    }
}

init();


