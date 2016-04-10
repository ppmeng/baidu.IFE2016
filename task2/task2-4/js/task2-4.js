/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var aqi_city = document.getElementById("aqi-city-input");
var aqi_value = document.getElementById("aqi-value-input");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = aqi_city.value.trim();
    var values = aqi_value.value.trim();
    if (!city || !values) {
    	alert("输入不能为空");
    	return;
    }
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
    	alert("城市名必须为中英文字符");
    	return;
    }
    if (!values.match(/\d+/g)) {
    	alert("空气质量指数必须为整数");
    	return;
    }
    aqiData[city] = values;
}

//渲染aqi-table表格
function renderAqiList() {
    var aqiList = document.getElementById("aqi-table");
    aqiList.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var city in aqiData) {
       	aqiList.innerHTML += "<tr><td>" + city + "</td><td>" + aqiData[city]
       	                      + "</td><td><button>删除</button></td></tr>";
    }
}

function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

function delBtnHandle(e) {
	var clicktr = e.parentNode.parentNode;;
    var city = clicktr.childNodes[0].innerHTML;
    delete aqiData[city];
    renderAqiList();
}

function init() {
    //给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").onclick = addBtnHandle;

    // 给所有删除button绑定点击事件，点击时触发delBtnHandle函数
	var aqiList = document.getElementById("aqi-table");
    aqiList.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })
}

init();

