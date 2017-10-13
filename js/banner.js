/**
 * Created by SnowShadow on 2017/10/11.
 */
/**
 * Created by SnowShadow on 2017/9/28.
 */

$(function () {
    RotationHome($("#banner"))
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
const RotationHome = function (pdiv) {
    let r = {
        num : 1,
        size : 0,
    };
    r.startInterval = function (time) {
        time = time || 2000;
        let o = this;
        let i = setInterval(function () {
            if (o.num == o.size){
                o.num=0
            }
            console.log($(o.div).find("li").eq(o.num))
            $(o.div).find("li").eq(o.num).show().siblings().hide();
            o.num++
        }, time);
        return i
    };

    r.start = function (o) {
        o.interval = o.startInterval()
    };

    r.iHover = function (onHover) {
        clearInterval(this.interval);
        this.num = $(this).index();
    };

    r.init = function () {
        let o = this;
        this.div = pdiv;
        this.size = $(this.div).find("li").length;
        //start开始了
        this.start(this);

        $(this.div).find("li").hover(function () {
            o.iHover(this)
        }, function () {
            o.start(o)
        });
    };
    r.init();

    return r
};