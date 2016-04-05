function getData() {
    var source = document.getElementById("source");
    var allli = source.getElementsByTagName("li");
    for (var i = 0; i < allli.length; i++) {
    	var data[i][0] = allli[i].firstChild.value;
    }
}

function sortAqiData(data) {

}

function render(data) {

}