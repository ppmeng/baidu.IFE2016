function addEventHandler(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler);
	} else if (ele.attachEvent) {
		ele.attachEvent("on" + event, handler);
	} else {
		ele["on" + event] = handler;
	}
}

var cityAndSchool = {
	                 "北京":["北京大学", "清华大学", "北京人民大学", "北京航空航天"],
                     "上海":["复旦大学", "上海交通大学", "同济大学"],
                     "武汉":["武汉大学", "华中科技大学", "武汉理工大学"],
                     "广州":["中山大学","华南理工大学"]
                    };
var pageState = {
	radioSelect: "student",
    citySelect: "北京"
}

function renderCity() {
	var city = document.getElementById("city");
	city.innerHTML = "";
    for (var item in cityAndSchool) {
    	var option = document.createElement("option");
    	option.innerHTML = item;
        city.appendChild(option);
    }
}

function renderSchools() {
    var city = document.getElementById("city").value;
    var shoolwrap = document.getElementById("schools");
    schools.innerHTML = "";
    var allschool = cityAndSchool[city];
    for (var i = 0; i < allschool.length; i++) {
    	var option = document.createElement("option");
    	option.innerHTML = allschool[i];
    	schools.appendChild(option);
    }
}

function statusChange() {
	var forStudent = document.getElementById("for-student");
    var forNotStudent = document.getElementById("for-not-student");
    if (this.value === "student") {
    	forStudent.style.display = "block";
    	forNotStudent.style.display = "none";
    }else if (this.value === "not-student"){
    	forStudent.style.display = "none";
    	forNotStudent.style.display = "block";
    }
}

function citySelectChange() {
	if (pageState.citySelect === this.value) {
		return;
	}else {
		pageState.citySelect = this.value
		renderSchools();
	}
}

window.onload = function() {
    renderCity();
    renderSchools();
    var radios = document.getElementById("status").getElementsByTagName("input");
    for (var i = 0; i < radios.length; i++) {
        addEventHandler(radios[i], "click", statusChange);
    }
    var city = document.getElementById("city");
    addEventHandler(city, "change", citySelectChange);
}

		