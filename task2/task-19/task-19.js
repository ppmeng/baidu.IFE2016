function $(ele) {
     return document.querySelector(ele);
 }
 var queue = [];
 var snapshots = []; //快照集合
 //var interval = $("#interval").value;

$("#chart").addEventListener("click", function(e) {
    var node = e.target;
    if (node && node.className.toLowerCase() === "bar") {
        var index = [].indexOf.call(node.parentNode.childNodes, node);
        queue.splice(index, 1);
        node.parentNode.removeChild(node);
    }
});

function initData(number) {
    queue = [];
    for (var i = 0; i < number; i++) {
        queue.push(Math.floor(Math.random() * 90 + 10));
    }
    return queue;
}

function init() {
    initData(50);
    render();
}

window.onload = function() {
    init();
}

function getInputValue() {
    if (queue.length >= 60) {
        throw new Error("已经满60个数字了，点击可视区域条形图可任意删除其中数字");
    }
    //trim消除空格
    var input = document.getElementsByTagName("input")[0].value.trim();
    if (!input || parseFloat(input) != input) {
        throw new Error("输入不合法，请再次输入数字");
    }
    if (input < 10 || input > 100) {
        throw new Error("输入越界，请输入10-100内数字");
    }
    return input;  
}

function changeAlgorithm() {
    var algorithm = $("#algorithm");
    var nowAlgorithm = algorithm.value;
    if (nowAlgorithm == "bubbleSort") {
        return bubbleSort(queue);
    }
    else if (nowAlgorithm == "binaryInsert") {
        return binaryInsert(queue);
    }
    else if (nowAlgorithm == "directInsert") {
        return directInsert(queue);
    }
    else if (nowAlgorithm == "simpleSelect") {
        return simpleSelect(queue);
    }
    else if (nowAlgorithm == "quickSort") {
        return quickSort(queue);
    }
}

function interval() {
    var speed = parseInt($("#interval").value);
    return speed;
}

$("#sort").onclick = function() {
    if (queue.length == 0) return alert("队列为空");
    changeAlgorithm();
    var sort = $("#sort");
    var speed = interval();
    sort.timer = setInterval(paint, speed); //定时绘制,属性
    function paint() {
        var snapshot = snapshots.shift() || [];
        if (snapshot.length !== 0) {
             render(snapshot);
        } 
        else {
            clearInterval(sort.timer); //绘制结束
            return;
        }
    }
}

//左侧输入
 $("#left-in").onclick = function() {
     try {
         queue.unshift(getInputValue());
     } catch (e) {
         alert(e.message);
     }
     render();
 }
 //右侧输入
 $("#right-in").onclick = function() {
     try {
         queue.push(getInputValue());
     } catch (e) {
         alert(e.message);
     }
     render();
 }
 //左侧输出
 $("#left-out").onclick = function() {
     if (queue.length === 0) return alert("队列为空");
     queue.shift();
     render();
 }
 //右侧输出
 $("#right-out").onclick = function() {
     if (queue.length === 0) return alert("队列为空");
     queue.pop();
     render();
 }
 //随机产生
 $("#random").onclick = function() {
     initData(50);
     render();
 }
 //清空
$("#clear").onclick = function() {
    if (queue.length == 0) {
        alert("已经全部清空啦");
        return;
    }
    queue = [];
    render();
}

//排序算法
function bubbleSort(arr) {
    snapshots = [];
    if (arr.length <= 1) {
        return arr;
    }
    var temp;
    for (var i = arr.length; i >= 2; i--) {
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                snapshots.push(JSON.parse(JSON.stringify(arr))); // 记录快照
            } 
        }
    }
    return arr;
}

//直接插入排序算法
function directInsert(arr) {
    snapshots = [];
    var temp, i, j;
    if (arr.length <= 1) {
        return arr;
    }
    for (i = 1; i < arr.length; i++) {
        temp = arr[i];
        j = i - 1;
        while (j >= 0 &&　temp < arr[j]) {
            arr[j + 1] = arr[j];
            j--; 
        }
        arr[j + 1] = temp;
        snapshots.push(JSON.parse(JSON.stringify(arr)));
    }
    return arr;
} 
//折半插入
function binaryInsert(arr) {
    snapshots = [];
    var  temp, i , j; 
    if (arr.length <= 1) {
        return arr;
    }
    for (var i = 1; i < arr.length; i++) {
        var low = 0, high = i - 1, mid;
        var temp = arr[i];
        while (low <= high) {
            mid = Math.floor((low + high) / 2); 
            if (temp < arr[mid]) {
                high = mid - 1;
            }
            else {
                low = mid + 1;
            }
        }
        for (var j = i - 1; j > high; j--) {
            arr[j + 1] = arr[j];
        }
        arr[high + 1] = temp;
        snapshots.push(JSON.parse(JSON.stringify(arr)));
    }
}

function simpleSelect(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    for (var i = 0; i < arr.length; i++) {
        var temp;
        var minele = i;
        //选出最小元素
        for (var k = minele + 1; k < arr.length; k++) {
            if (arr[minele] > arr[k]) {
                minele = k;
            }
        }
        //将最小元素和无序列表的首个数字交换
        temp = arr[i];
        arr[i] = arr[minele];
        arr[minele] = temp;
        snapshots.push(JSON.parse(JSON.stringify(arr)));
    }
}

function quickSort(arr) {
    sort = function (left, right, sortlist) {
        if (left >= right) return;
        var idx = sort_partition(left, right, sortlist);
        if (left < idx - 1) {
            sort(left, idx - 1,sortlist);
        }
        if (idx < right) {
            sort(idx + 1, right,sortlist);
        }
    }
    sort(0, arr.length-1, arr);
}
function sort_partition(left, right, data) {
    var p = data[left];
    while (left < right) {
        while (left < right && data[right] >= p) {
            right--;
        }
        data[left] = data[right];
        while (left < right && data[left] <= p) {
            left++;
        }
        data[right] = data[left];
    }
    data[left] = p
    snapshots.push(JSON.parse(JSON.stringify(data)));
    return left;
}

//渲染数组
function render(arr) {
    var array = arr || queue;
    var content = array.map(function(v) {
        var color = '#' + Math.ceil((v/100).toFixed(1) * 0xffffff).toString(16);
        return "<div class='bar' title = "+v+" style='height:" + (v * 4) + "px; background-color:"+color+"'></div>";
    }).join("");
    $("#chart").innerHTML = content;
}

