var jia = document.getElementById('jia');
var sou = document.querySelector('.sou');
var yi_xia = document.querySelector('.yi-xia');
var wei_xia = document.querySelector('.wei-xia');
var an1 = document.querySelector('.yi-nav-after');
var an2 = document.querySelector('.wei-nav-after')
var all_list = new Array('');
var f1 = 0,
f2 = 0;
jia.onclick = function () {
    var hMid = document.querySelector('.h-mid');
    var h_mid1 = document.querySelector('.h-mid1');
    hMid.style.display = 'block';
    h_mid1.style.display = 'none';
}
sou.onclick = function () {
    var hMid = document.querySelector('.h-mid');
    var h_mid1 = document.querySelector('.h-mid1');
    hMid.style.display = 'none';
    h_mid1.style.display = 'block';
}
// 下拉按钮
an1.onclick = function () {
    if(f1 === 0) {
        an1.className = 'yi-nav-after yi-dian';
        yi_xia.style.display = 'block';
        f1 = 1;
    } else {
        an1.className = 'yi-nav-after';
        yi_xia.style.display = 'none';
        f1 = 0;
    }
}
an2.onclick = function () {
    if(f2 === 0) {
        an2.className = 'wei-nav-after yi-dian';
        wei_xia.style.display = 'block';
        f2 = 1;
    } else {
        an2.className = 'wei-nav-after';
        wei_xia.style.display = 'none';
        f2 = 0;
    }
}
// function enter() {
//     var va = write.value;
//     if (va !== ''){
//         // 按下enter添加ToDo
//         document.onkeydown = function (ev) {
//             var e= ev || window.event || arguments.callee.caller.arguments[0];
//             if(e && e.keyCode == 13) {
//                 an1.className = 'yi-nav-after yi-dian';
//                 yiXia.style.display = 'block';
//                 var xia = document.createElement("div");
//                 var a = document.createElement('a');
//                 yiXia.appendChild(xia);
//                 xia.appendChild(a);
//                 xia.innerHTML = va;
//                 xia.className = 'xia';
//                 a.innerHTML = '删除';
//                 a.className = 'clear';
//                 // an1.click();
//             }
//         }
//     }
//     else {
//         alert('不能为空');
//     }
// }
// window.onload = function (){
//     write.addEventListener("focus", enter);
// }

// 获取用户输入
function add_su(e) {
    var todo_list = {
        todo: '',
        done: false,
        start_time: '',
        time: ''
    }
    var write = document.getElementById('write');
    var time = document.getElementById('time');
    var write1 = write.value.trim();
    if (write1 === ''){
        alert('输入不能为空');
        return;
    }
    todo_list.todo = write.value;
    todo_list.time = time.value;
    all_list.push(todo_list);
    // 保存数据到localStorge
    saveData(all_list);
    write.value = '';
    time.value = '';
    // 将数据添加到dom
    load();
    write.focus();
    time.focus();
}
// 将输入添加至html
function load() {
    var todo_count = document.getElementById('todocout');
    var done_count = document.getElementById('donecout'),
    todo_string = '',
    done_string = '',
    todo_Count = 0,
    done_Count = 0;
    var date = new Date();
    document.getElementById('write').focus();
    all_list = loadData(); //获取本地数据
    if (all_list != null){
        for(var i =0; i < all_list.length; i++) {
            if(!all_list[i].done) {
                todo_string += '<div class="xia">'+'<input type="checkbox" onchange="update('+i+',\'done\',true)">'+'<p id="p-'+i+'" onclick="edit('+i+')">'+all_list[i].todo+'</p>'+'<span class="mit">'+all_list[i].time+'分钟</span>'+'<a class="clear"'+i+' onclick="remove('+i+')">删除</a>'+'<a class="start"'+i+' onclick="start('+i+'),dao_shu('+i+')">开始</a>'+'</div>';
                todo_Count++;
            }
            // " onclick="edit('+i+')"
            // '<input type="checkbox" onchange="update('+i+',\'done\',false)">'+    
            else {
                done_string += '<div class="xia">'+'<p id="p-'+i+'">'+all_list[i].todo+'</p>'+'<span class="start-date1">开始时间: '+all_list[i].start_time+'</span>'+'<span class="date">完成时间: '+date.getHours()+'点'+date.getMinutes()+'分</span>'+'<a class="clear"'+i+' onclick="remove('+i+')">删除</a>'+'</div>';
                done_Count++;
            }
        }
        yi_xia.innerHTML = todo_string;
        wei_xia.innerHTML = done_string;
        todo_count.innerHTML = todo_Count;
        done_count.innerHTML = done_Count;
        // bang();
    }
    else {
        yi_xia.innerHTML = '';
        wei_xia.innerHTML = '';
        todo_count = 0;
        done_count = 0;
    }
}
function bang() {
    if(yi_xia.style.display === 'none'){
        an1.className = 'yi-nav-after';
        f1 = 0;
    } else {
        an1.className = 'yi-nav-after yi-dian';
        f1 = 1;
    }
    if(wei_xia.style.display === 'none'){
        an2.className = 'wei-nav-after';
        f2 = 0;
    } else {
        an2.className = 'wei-nav-after yi-dian';
        f2 = 1;
    }
}
function dao_shu(i) {
    var mit = document.querySelectorAll('.mit');
    // var amit = mit[i].innerText.split('');
    all_list = loadData(); //获取本地数据
    var su = parseInt(all_list[i].time)*60;
    var flag = 0;
    // 判断开始的位置: i-已完成的list
    for (var j = 0; j < all_list.length; j++) {
        if (all_list[j].done) {
            flag++;
        }
    }
    var min;
    var miao;
    var set = setInterval(fen,1000);
    function fen() {
        if(su !== 0){
            su--;
            miao = su%60;
            min = Math.floor(su/60);
            if(miao === 0 && min>0){
                min--;
                miao = '0'+su%60;
            } else if (miao<10){
                miao = '0'+su%60;
            }
        }
        else{
            clearInterval(set);
            // mit.innerHTML = 0+':'+miao;
        }
        mit[i-flag].innerHTML = min+':'+miao;
    }

}
function edit(i) {
    var p = document.getElementById('p-'+i),
    p_Content = p.innerHTML,
    inputId;
    function confirm() {
        if(inputId.value === '') {
            p.innerHTML = p_Content;
            alert('输入不能为空');
        }
        else {
            update(i,'todo',inputId.value);
        }
    }
    function enter(e) {
        if(e.keyCode === 13) {
            confirm();
        }
    }
    p.innerHTML = '<input type="text" id="input'+i+'" value='+p_Content+'>';
    inputId = document.getElementById('input'+i);
    inputId.focus();
    inputId.setSelectionRange(0,inputId.value.length);
    inputId.onblur = confirm;
    inputId.onkeypress = enter;
}
// 更新页面,移动已未完成
function update(i,field,value) {
    all_list[i][field] = value;
    saveData(all_list);
    load();
}
function start(i) {
    var time = new Date();
    var the_time = '';
    if (time.getMinutes().length === 1){
        the_time = time.getHours()+'点0'+time.getMinutes()+'分';
    } else {
        the_time = time.getHours()+'点'+time.getMinutes()+'分';
    }
    all_list[i].start_time = the_time;
    saveData(all_list);
    load();
}
// 删除操作
function remove(i) {
    all_list.splice(i,1);
    saveData(all_list);
    load();
}
function saveData(data) {
    // js数据转换为json数据存入数据库
    localStorage.setItem('my_todo_list',JSON.stringify(data));
}
//从本地缓存获取数据
function loadData() {
    var hisTory = localStorage.getItem('my_todo_list');
    if(hisTory != null) {
        return JSON.parse(hisTory);
    }
    else {
        return [];
    }
}
// 清除本地缓存
function clear() {
    localStorage.clear();
    load();
}
window.addEventListener('load',load); //页面加载完毕调用load函数
// document.getElementById('clearbutton').onclick = clear;
document.getElementById('time').onkeypress = function (e) {
    if(e.keyCode === 13) {
        add_su();
        an1.className = 'yi-nav-after yi-dian';
        yi_xia.style.display = 'block';
        f1 = 1;
    }
};