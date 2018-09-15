$(function () {

    //胖虎动画暂停和开始
    $('.controlbox li:first').click(function () {
        $('.panghu_moving img').css({animationPlayState:'running'});
    });

    $('.controlbox li:eq(1)').click(function () {
        $('.panghu_moving img').css({animationPlayState:'paused'});
    });

    //根据屏幕滚动显示切换饼图的按钮	 和上升到顶部的按钮
    $(window).scroll(function() {
        var nowTop = $(document).scrollTop();

        if (nowTop > 300 && nowTop < 750) {
            $('#changeBox').css({opacity:1});
        }
        else {
            $('#changeBox').css({opacity:0});
        }
    });
});
