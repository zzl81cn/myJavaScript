/**
 * Created by zhouzilong on 2016/8/17.
 */
/**
 *
 * @authors zzl81cn
 * @date    2016-01-25 12:57:44
 * @version $Id$
 */
// financial sort bar
$(function(){
    $(".financial-sort-wrap li a").click(function(){
        $(this).parent().addClass("active").siblings().removeClass("active");
        // console.log($(this).text());
        $(this).toggleClass("up");
        // console.log($(this).text());
        return false;
    })
// });


    // 改用属性替代
    // 用户中心侧边导航动态悬浮
    // if($('.main-menu')) {
    //  $(this).affix({
    //      offset: {
    //          top: $('.main-menu').offset().top,
    //          bottom: $('#footer').outerHeight(true) + 190
    //      }
    //  });

    // };

    // 回到顶部
    var jump = '<ul class="jump">'
        +'<li><a href=""><i class="fa fa-question"></i></a></li>'
        +'<li><a id="toTop" href=""><i class="fa fa-chevron-up"></i></a></li>'
        +'</ul>';
    if($("#footer")) {
        $(jump).insertAfter("#footer");
    };

    $(window).scroll(function(){
        if($(window).scrollTop() > 200) {
            $(".jump li:eq(-1)").fadeIn(800);
        } else {
            $(".jump li:eq(-1)").fadeOut(500);
        }
    });
    $("#toTop").click(function(){
        $("html,body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

$(function(){
    $(".ps-bg-list li:first-child").css({"background-image":"url(images/slide-bg-list-01.jpg)","opacity":"1"});
    // window.console.log("zzz");
});
// 轮播图
$(function(){
    var length,
        currentIndex = 0,
        interval,
        hasStarted = false, //是否已经开始轮播
        t = 3000; //carousel interval
    length = $('.slider-panel').length;

    //hide no first picture
    $('.slider-panel:not(:first)').hide();
    //set the first slider-item is actived
    $('.slider-item:first').addClass('slider-item-selected');
    //hide pre,next button
    $('.slider-page').hide();

    //mouse over display pre next button,stop()，mouse leave hide pre,next btn start carousel
    $('.slider-panel, .slider-pre, .slider-next')
        .hover(
        function() {
            stop();
            $('.slider-page').show();
        }, function() {
            $('.slider-page').hide();
            start();
        }
    );

    $('.slider-item').hover(function(e) {
        stop();
        var preIndex = $(".slider-item").filter(".slider-item-selected").index();
        currentIndex = $(this).index();
        play(preIndex, currentIndex);
    }, function() {
        start();
    });

    $('.slider-pre').unbind('click');
    $('.slider-pre').bind('click', function() {
        pre();
    });
    $('.slider-next').unbind('click');
    $('.slider-next').bind('click', function() {
        next();
    });

    /**
     * 向前翻页
     */
    function pre() {
        var preIndex = currentIndex;
        currentIndex = (--currentIndex + length) % length;
        play(preIndex, currentIndex);
    }
    /**
     * 向后翻页
     */
    function next() {
        var preIndex = currentIndex;
        currentIndex = ++currentIndex % length;
        play(preIndex, currentIndex);
    }
    /**
     * 从preIndex页翻到currentIndex页
     * preIndex 整数，翻页的起始页
     * currentIndex 整数，翻到的那页
     */
    function play(preIndex, currentIndex) {
        $('.slider-panel').eq(preIndex).fadeOut(500)
            .parent().children().eq(currentIndex).fadeIn(1000);
        $('.slider-item').removeClass('slider-item-selected');
        $('.slider-item').eq(currentIndex).addClass('slider-item-selected');
    }

    /**
     * 开始轮播
     */
    function start() {
        if(!hasStarted) {
            hasStarted = true;
            interval = setInterval(next, t);
        }
    }
    /**
     * 停止轮播
     */
    function stop() {
        clearInterval(interval);
        hasStarted = false;
    }

    //开始轮播
    start();
});
$(function () {
    var options = {
        animation: true,
        trigger: 'hover' //触发tooltip的事件
    }
    $('.user').tooltip(options);
});

// 分类菜单
$(function (){
    (function(){
        var time;
        var hoverItem = $(".cate-tit-list .cate-m"),
            popWrap = $(".cate-content-list");
        popContent = $(".cate-content-list .cate-mc");

        hoverItem.on('mouseenter', function() {
            clearTimeout(time);
            $(this).addClass("active").siblings().removeClass("active");
            for(var i = 0; i < hoverItem.length; i++){
                if(hoverItem.eq(i).hasClass("active")){
                    popWrap.show();
                    popContent.eq(i).show().siblings().hide();
                }
            }
        });

        hoverItem.on('mouseleave', function() {
            time = setTimeout(function() {
                popWrap.hide();
            }, 500)
            // console.log(time);
        });

        popWrap.on('mouseenter', function() {
            clearTimeout(time);
        });

        popWrap.on('mouseleave', function() {
            popWrap.hide();
        });

    }());
});

// 用户中心添加、删除银行卡效果
$(function() {
    $(".card-box").hover(
        function() {
            // console.log($(this));
            $(this).children(".card-operation").slideToggle("fast");
        }
    )
});
// financial-product box
$(function() {
    $(".financial-box").hover(
        function() {
            // console.log($(this));
            $(this).children(".financial-operation").slideToggle("fast");
        }
    )
});

// 用户中心 eye-toggle
$(function() {
    $(".eye-toggle").click(function() {
        // return false;
        $(this).toggleClass('show');
    })
});

// 筛选数据结果
$(function() {
    $("#messageDropDown a").click(function() {
        console.log($(this).text());
        $("#messageTrigger").html($(this).text());
        // return false;

    })
});

// 保险切换
$(function() {
    $('#inputRelation').change(function() {
        // console.log($(this).val());
        if ($(this).val() >=2) {
            $('.switch-type').fadeIn();
        } else {
            $('.switch-type').fadeOut();
        }

        // switch ($(this).val()) {
        // 	case '2':
        // 	$('.switch-type').fadeIn();
        // 	break;

        // 	default:
        // 	$('.switch-type').fadeOut();
        // }
    })
});
function toggleModal() {
    var tempVal = $('input[name="optionsRadios"]:checked').val();
    if (tempVal == 1) {
        $("#payPwdModal").modal('show');
    } else {
        $("#payVerModal").modal('show');
    }
    // switch(tempVal) {
    // 	case 1:
    // 	$("#payPwdModal").modal('show');
    // 	break;
    // 	default:
    // 	$("#payVerModal").modal('show');
    // };
    // window.console.log(tempVal);
};

// 支付页切换银行卡列表
$(function() {
    var $bank_collapse = $('.bank-card-collapse'),
        $card = $('.bank-card-list li'),
        $curBank = $('#currentBank');
    $bank_collapse.click(function() {
        $(this).toggleClass('active');
    })
    $card.click(function() {
        console.log($(this).html());
        $curBank.html($(this).html());
    });
});
