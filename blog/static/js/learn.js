$(function () {
    //分页点击
    $('.pages a').click(function () {
        $('.pages a').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });
});