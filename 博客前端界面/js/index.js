$(function () {

    //胖虎动画暂停和开始
    $('.controlbox li:first').click(function () {
        $('.panghu_moving img').css({animationPlayState:'running'});
    });

    $('.controlbox li:eq(1)').click(function () {
        $('.panghu_moving img').css({animationPlayState:'paused'});
    });

    //根据屏幕滚动显示切换饼图的按钮,显示回到顶部的按钮
    $(window).scroll(function() {
        var nowTop = $(document).scrollTop();

        if (nowTop > 300 && nowTop < 750) {
            $('#changeBox').css({opacity:1});
        }
        else {
            $('#changeBox').css({opacity:0});
        }
        if (nowTop>400) {
            $('.totop').fadeIn(1000);
        }
        else{
            $('.totop').fadeOut(1000);
        }
    });

    //点击切换饼图
    $('#changeBox').click(function () {
        if($('#changeBox').css('right') == '0px'){
            $('#changeBox').css({right:'-110%'});
            $('#changeBox span').removeClass('glyphicon-indent-left').addClass('glyphicon-indent-right');
            $('.tmtimeline').css({left:'-110%'});
            $('.pages').hide();
        }
        else {
            mychart.setOption(option);
            $('#changeBox').css({right:0});
            $('#changeBox span').removeClass('glyphicon-indent-right').addClass('glyphicon-indent-left');
            $('.tmtimeline').css({left:0});
            $('.pages').show();
        }
    });

    //分页点击
    $('.pages a').click(function () {
        $('.pages a').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });

    $('.totop').click(function(){
        //animate不只可以加css属性
        //html和body都写是为了兼容性
        $('html,body').animate({scrollTop:0});
    })

});