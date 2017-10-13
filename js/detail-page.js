/**
 * Created by SnowShadow on 2017/10/12.
 */
/**
 * Created by SnowShadow on 2017/9/28.
 */

$(function () {
    $(".small-banner").each(function () {
        RotationDetail(this)
    })
});

/**
 * 该方法为构造轮播器对象的方法
 * @param {*} div 此处为包裹轮播的div
 * @return {*} r 返回一个轮播器对象
 * 结构为 {
 * num : 当前显示图像的下标
 * size : 里面的图像个数
 * div : 包裹图像的div
 * init : 初始化方法
 * startInterval : 设置轮播方法
 * start : 开始方法
 * intarval : interval对象,用于停止和开始,由start方法初始化
 * }
 */
const RotationDetail = function (pdiv) {
    let r = {
        num : 1,
        size : 0,
    };
    r.pHover = function (onHover) {
        //圆点的hover事件
        //关闭定时器
        $(onHover).find("img").css("border", "2px solid #fc7b9a");
        $(onHover).siblings().find("img").css("border", "1px solid #cccccc");
        this.num = $(onHover).index();
        $(this.div).find(".pic li").eq(this.num).show().siblings().hide();
    };
    r.init = function () {
        let o = this;
        this.div = pdiv;
        this.size = $(this.div).find(".pic li").length;
        //start开始了
        //注册点hover事件
        $(this.div).find(".pager li").hover(function () {
            o.pHover(this)
        }, function () {
            o.start(o)
        });
    };
    r.init();

    return r
};