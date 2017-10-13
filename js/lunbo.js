/**
 * Created by SnowShadow on 2017/9/28.
 */

$(function () {
    $(".small-banner").each(function () {
        RotationLun(this)
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
const RotationLun = function (pdiv) {
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
            $(o.div).find(".pic li").eq(o.num).show().siblings().hide();
            $(o.div).find(".pager li").eq(o.num).find("img").css("border-color", "#DEDEDE");
            $(o.div).find(".pager li").eq(o.num).siblings().find("img").css("border-color", "gray");
            o.num++
        }, time);
        return i
    };

    r.start = function (o) {
        o.interval = o.startInterval()
    };

    r.pHover = function (onHover) {
        //圆点的hover事件
        //关闭定时器
        clearInterval(r.interval);
        $(onHover).find("img").css("border-color", "#DEDEDE");
        $(onHover).siblings().find("img").css("border-color", "gray");
        this.num = $(onHover).index();
        $(this.div).find(".pic li").eq(this.num).show().siblings().hide();
    };

    r.iHover = function (onHover) {
        clearInterval(this.interval);
        this.num = $(this).index();
    };

    r.lClick = function () {
        clearInterval(r.interval);
        this.num--;
        //判断是否，已经是第一张图
        if (this.num < 0){
            this.num = this.size-1;
        }
        $(this.div).find(".pic li").eq(this.num).show().siblings().hide();
        $(this.div).find(".pager li").eq(this.num).find("img").css("border-color", "#DEDEDE")
        $(this.div).find(".pager li").eq(this.num).siblings().find("img").css("border-color", "gray");
    };

    r.rClick = function () {
        clearInterval(this.interval);
        this.num++;
        //判断是否，已经是第一张图
        if (this.num >= this.size){
            this.num = 0
        }
        $(this.div).find(".pic li").eq(this.num).show().siblings().hide();
        $(this.div).find(".pager li").eq(this.num).find("img").css("border-color", "#DEDEDE")
        $(this.div).find(".pager li").eq(this.num).siblings().find("img").css("border-color", "gray");
    };

    r.init = function () {
        let o = this;
        this.div = pdiv;
        this.size = $(this.div).find(".pic li").length;
        //start开始了
        this.start(this);
        //注册点hover事件
        $(this.div).find(".pager li").hover(function () {
            o.pHover(this)
        }, function () {
            o.start(o)
        });
        //注册图hover事件
        $(this.div).find(".pic li").hover(function () {
            o.iHover(this)
        }, function () {
            o.start(o)
        });
        //注册箭头点击事件
        $(this.div).find(".pager-left").click(function () {
            o.lClick()
        });
        $(this.div).find(".pager-right").click(function () {
            o.rClick()
        })
    };

    r.init();

    return r
};