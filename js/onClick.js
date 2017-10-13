/**
 * Created by SnowShadow on 2017/9/24.
 */
$(function () {
    //查找 .navigation-bar .bar 下的所有 li 绑定一个点击事件
    $("#bar").find("li").click(function () {
        //选择当前点中的li 下的 d1 并 添加 .li-selected的类
        $(this).find(".bar-a").addClass("li-selected");
        //把除了刚才选中的 li 下的 d1 删除 .li-selected类
        $(this).siblings().find(".bar-a").removeClass("li-selected")
    })
});