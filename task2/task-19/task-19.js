function $(ele) {
     return document.querySelector(ele);
 }
 var queue = [];
 var snapshots = []; //快照集合
<<<<<<< HEAD
 var inAnimation = false; //若正在渲染则为true，否则为false
=======
 //var interval = $("#interval").value;
>>>>>>> master

$("#chart").addEventListener("click", function(e) {
    var node = e.target;
    if (node && node.className.toLowerCase() === "bar") {
        var index = [].indexOf.call(node.parentNode.childNodes, node);
        queue.splice(index, 1);
        node.parentNode.removeChild(node);
    }
});

<<<<<<< HEAD

function init() {
    queue = [];
    for (var i = 0; i < 50; i++) {
=======
function initData(number) {
    queue = [];
    for (var i = 0; i < number; i++) {
>>>>>>> master
        queue.push(Math.floor(Math.random() * 90 + 10));
    }
    return queue;
}

<<<<<<< HEAD
window.onload = function() {
    init();
    render();
=======
function init() {
    initData(50);
    render();
}

window.onload = function() {
    init();
>>>>>>> master
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

<<<<<<< HEAD
=======
function interval() {
    var speed = parseInt($("#interval").value);
    return speed;
}

>>>>>>> master
$("#sort").onclick = function() {
    if (queue.length == 0) return alert("队列为空");
    changeAlgorithm();
    var sort = $("#sort");
<<<<<<< HEAD
    var speed = parseInt($("#interval").value);
=======
    var speed = interval();
>>>>>>> master
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
<<<<<<< HEAD
     init();
=======
     initData(50);
>>>>>>> master
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
<<<<<<< HEAD
            //renderRangeColor(j, i);
=======
>>>>>>> master
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
    if (arr.length <= 1) {
        return arr;
    }
    var sort = function (arr, left, right) {
        if (left < right) {
            var stop = recurse(arr, left, right);
            sort(arr, left, stop - 1);
            sort(arr, stop + 1, right);
        }
    }
    sort(arr, 0, arr.length - 1);

    function recurse(arr, left, right) {
        var temp = arr[left];
        while(left != right) {
            while (left < right && arr[right] >= temp) {
                right--;
            }
            if (left < right) {
                arr[left] = arr[right];
                left++;
            }
            while (left < right && arr[left] <= temp) {
                left++;
            }
            if (left < right) {
                arr[right] = arr[left];
                right--;
            }
        }
        arr[left] = temp;
        console.log(arr);
        snapshots.push(JSON.parse(JSON.stringify(arr)));
        return left;
    }
}

//渲染数组
function render(arr) {
    var array = arr || queue;
    var content = array.map(function(v) {
<<<<<<< HEAD
        return "<div class='bar' title = "+v+" style='height:" + (v * 4) + "px'></div>";
=======
        var color = '#' + Math.ceil((v/100).toFixed(1) * 0xffffff).toString(16);
        return "<div class='bar' title = "+v+" style='height:" + (v * 4) + "px; background-color:"+color+"'></div>";
>>>>>>> master
    }).join("");
    $("#chart").innerHTML = content;
}

<<<<<<< HEAD
function renderRangeColor(left, right) {
    for (var i = left; i <= right; i++) {
        $("#chart").childNodes[i].style.backgroundColor = "red";  
    }
}

function renderChangeColor(i, j) {

}
=======
>>>>>>> master
