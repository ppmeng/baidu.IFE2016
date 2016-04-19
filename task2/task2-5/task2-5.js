function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof oldonload != "function") {
    window.onload = func;
  }
  else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

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
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */

/*function getTitle() {
  switch (pageState.nowGraTime) {
    case "day":
      return "每天";
    case "week":
      return "周平均";
    case "month":
      return "月平均";
  }
}*/


function renderChart() {  
  var color = "",text = "";
  var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  aqiChartWrap.innerHTML = ""; 
  for (var item in chartData) {
    color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    //不兼容IE 
    var aqibar = document.createElement("div");
    aqibar.setAttribute("class", "aqibar");
    var titletext = item + "AQI:" + chartData[item];
    aqibar.setAttribute("title", titletext);
    aqibar.style.height = chartData[item] + "px";
    aqibar.style.backgroundColor = color;
    aqiChartWrap.appendChild(aqibar);  
    /*text += '<div class="aqibar" title="'+item+"AQI:"+chartData[item]+'" style="height:'+
            chartData[item]+'px; background-color:'+color+'"></div>';*/
  }
 // aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  //var value = window.radio.value;
  if (pageState.nowGraTime == this.value) {
    return;
  }
  else {
    pageState.nowGraTime = this.value;
  }
  // 设置对应数据    
  initAqiChartData(); 
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数,和上面函数逻辑一致实现略有不同
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if (pageState.nowSelectCity == this.value) {
    return;
  }
  else{
    pageState.nowSelectCity = this.value;
  }
  // 设置对应数据  
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radios = document.getElementById("form-gra-time").getElementsByTagName("input");
  for (var i = 0; i < radios.length; i++) {
    addEventHandler(radios[i], "click", graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  var citylist = "";
  for (var item in aqiSourceData) {
    citylist += "<option>" + item + "</option>";
  }
  citySelect.innerHTML = citylist;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(citySelect, "change", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var nowCityData = aqiSourceData[pageState.nowSelectCity];
  // 处理好的数据存到 chartData 中
  //nowCityData用来存储当前选择的城市的92天的天气数据
  if (pageState.nowGraTime == "day") {
    chartData = nowCityData;
  }
  if (pageState.nowGraTime == "week") {
    chartData = {};
    var countsum = 0, daysum = 0, week = 0;
    for (var item in nowCityData) {
      countsum += nowCityData[item];
      daysum ++;
      if ((new Date(item)).getDay() == 6) {
        if(month && (month-1) != (new Date(item)).getMonth()) {
          week = 1;
        }else {
          week++;
        } 
        month = (new Date(item)).getMonth() + 1;
        chartData[month + "月第" + week + "周"] = Math.floor(countsum / daysum);
        countsum = 0;
        daysum = 0;
      }
    }
    //若每个月最后剩余的天数不足一周的时候按周计算
    if (daysum != 0) {
      week++;
      month = (new Date(item)).getMonth() + 1;
      chartData[month + "月第" + week + "周"] = Math.floor(countsum / daysum);
    }
  }
  if (pageState.nowGraTime == "month") {
    chartData = {};
    var countsum = 0, daysum = 0, month = 0;
    for (var item in nowCityData) {
      countsum += nowCityData[item];
      daysum++;
      if ((new Date(item)).getMonth() != month) {
        month ++;
        var showmonth = (new Date(item)).getMonth();
        chartData["第" + showmonth + "月"] = Math.floor(countsum / daysum);
        countsum = 0;
        daysum = 0;
      }
    }
    if (daysum != 0) {
      month ++;
      chartData["第" + month + "月"] = Math.floor(countsum / daysum);
    }   
  }
}

function init() {
  initCitySelector();
  initGraTimeForm();  
  initAqiChartData();
  renderChart();
}
addLoadEvent(init);