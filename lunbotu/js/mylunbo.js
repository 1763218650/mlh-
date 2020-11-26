// window.onload = function () {
//     var img_list = document.getElementById('img-list');
//     var img = img_list.children;
//     var nav_buttons = document.getElementById('nav-btns').children;
//     nav_buttons[0].style.backgroundColor = 'black';
//     var index = 0;
//     for (var i = 0; i < nav_buttons.length; i++) {
//         nav_buttons[i].num = i;
//         nav_buttons[i].onclick = function () {
//             for (var i = 0; i < nav_buttons.length; i++) {
//                 nav_buttons[i].style.backgroundColor = '';
//             }
//             this.style.backgroundColor = 'black';
//             index = this.num;
//             var lang = -520 * index;
//             var speed = 40;
//             var current = parseInt(getComputedStyle(img_list,null).left);
//             if(current > lang ) {
//                 speed = -speed;
//             }
//             var timer = setInterval(function () {
//                 var old_lang = parseInt(getComputedStyle(img_list,null).left);
//                 var new_lang = old_lang+speed;
//                 if((speed < 0 && new_lang < lang)||(speed > 0 && new_lang > lang)){
//                     new_lang = lang;
//                 }
//                 img_list.style.left = new_lang + 'px';
//                 if(new_lang === lang) {
//                     clearInterval(timer);
//                 }
//             }, 30);
//
//         };
//     }
// }
$(function () {
    $('#img-list').css({
        width: $('#img-list li').length * 520 + 'px'
    })
    var i = 0;
    var abu = $('#nav-btns a');
    // for (var j = 0; j < abu.length; j++) {
    //     abu.eq(j).attr('index',j);
    // }
    for (var j = 0; j < abu.length; j++) {
        abu.eq(j).attr('index',j);
        abu.eq(j).click(function () {
            clearInterval(lun_bo);
            if ( i > 3){
                i = parseInt($(this).attr('index'));
                if( i === 0) {
                    i = 5;
                }
            } else {
                i = parseInt($(this).attr('index'));
            }
            move();
            on();
            ai_move();
        });
        // lun_bo();
    }
    ai_move();
    var lun_bo;
    function ai_move() {
        lun_bo = setInterval(function () {
            i++;
            move();
            on();
        }, 3000);
    }
    function move() {
        var img_list = $('#img-list');
        if (i === $('#img-list li').length) {
            i = 1;
            img_list.css({left: 0});
        }
        img_list.stop().animate({
            left: -520 * i + 'px'
        }, 250);
    }
    abu.eq(0).addClass('on');
    function on() {
        if (i < $('#img-list li').length - 1) {
            abu.eq(i).addClass('on').siblings().removeClass('on');
        } else {
            abu.eq(0).addClass('on').siblings().removeClass('on');
        }
    }
})