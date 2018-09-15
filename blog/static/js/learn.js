$(function () {
    //分页点击
    $('.pages a').click(function () {
        $('.pages a').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });
     
    var colorList = ['#F65087','#329768','#FB8052','#3693CA','#68C999','#109691'];

    $('.sort li').each(function (i) {
        $(this).css({background:colorList[i%5]});
    });
});
