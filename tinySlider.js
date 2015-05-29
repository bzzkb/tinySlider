(function ($, win, doc) {
    "use strict";
    var PLUGIN_NAME = "tinySlider";
    var Slider = function (element, options) {
        this.$element = $(element);
        this.defaults = $.extend({}, Slider.defaults);
        this.options = $.extend({}, Slider.defaults, $.isPlainObject(options) ? options : {});
        this.init();
    };

    Slider.defaults = {
        delay: 700
    };

    Slider.prototype = {
        Constructor: Slider,
        triggerPic: function (targetIndex) {
            // 方向每次都是需要确定的，所以为局部
            var direction = null;
            // 判断是否是首尾位置
            var isBoundary = null;
            // 逆向是需要取反的
            var reverse = null;
            // 转换为组件后的缓存：
            var imgTotal = this.imgTotal;
            var currentIndex = this.currentIndex;
            var screenWidth = this.screenWidth;
            // 说明，是next方向的，当前位置是最后一张，目标图片位置是第一张，
            if (targetIndex === imgTotal) {
                targetIndex = 0;
                direction = true;
            }
            // 说明点击的是prev，说明当前位置是第一张，期望去往最后一张，因为prev 是 currentIndex - 1 ，所以 0 -1 === -1 ，方向为false，纠正目标位置为 图片总数减一
            else if (targetIndex < 0) {
                targetIndex = imgTotal - 1;
                direction = false;
            }
            // 正常情况下，targetIndex 应该为 0 1 2 ，假设图片总数为3张，所以不需要纠正targetIndex目标位置，但是方向可能是2个：
            // 这里又会出现2种情况，比如当前在第二张 1的位置，如果点击next，方向为真，点击prev，方向为假
            else {
                direction = targetIndex > currentIndex;
            }

            if (direction) {
                isBoundary = !targetIndex;
                reverse = screenWidth;
            }
            else {
                isBoundary = targetIndex === imgTotal - 1;
                reverse = -screenWidth;
            }
            this.router(targetIndex, currentIndex, isBoundary, reverse, this.options.delay);

            this.currentIndex = targetIndex;
        },
        
        router: function (targetIndex, currentIndex, position, screenWidth, delay) {        
            // 组件时，缓存
            var $sliderItem = this.$sliderItem;
            var imgTotal = this.imgTotal;

            // 目标位置的引用
            var $targetItem = $sliderItem.eq(targetIndex);
            // 当前位置的引用
            var $currentItem = $sliderItem.eq(currentIndex);
            var $sliderItemFirst = $sliderItem.eq(0);

            $sliderItemFirst.css("z-index", position ? imgTotal : "");
            // 每次运动的时候，先设置初始位置,然后必须都要显示，然后在运动
            $targetItem.css({
                left: screenWidth,
                display: "block"
            });
            $currentItem.css({
                left: 0,
                display: "block"
            });

            $targetItem.stop(true).animate({"left": 0}, delay);
            // 当前位置显示过去后，要隐藏自己
            $currentItem.stop(true).animate({"left": -screenWidth}, delay, function () {
                $(this).hide();
            });
        },
        
        init: function () {
            // 获取各种引用
            var that = this;
            var $slider = this.$element;
            this.$sliderItem = $(".tiny-slider-item", $slider);
            this.$sliderPrev = $(".tiny-slider-prev", $slider);
            this.$sliderNext = $(".tiny-slider-next", $slider);
            this.imgTotal = this.$sliderItem.length;
            this.currentIndex = 0;
            // 这个应该由最外层的元素决定
            this.screenWidth = $slider.width();
            this.$sliderPrev.on("click", function(){
                that.triggerPic(that.currentIndex - 1);
            });
            this.$sliderNext.on("click", function () {
                that.triggerPic(that.currentIndex + 1);
            });
            
            //初始化的时候，让第一张显示，其他隐藏
            this.$sliderItem.first().show()
                    .siblings().hide();
        }
    };

    $.fn[PLUGIN_NAME] = function (options) {
        var that = null;
        var method = null;
        var args = [].slice.call(arguments, 1);
        this.each(function () {
            var $this = $(this);
            var data = $this.data(PLUGIN_NAME);
            if (!data) {
                $this.data(PLUGIN_NAME, (data = new Slider(this, options)));
            }
            if (typeof options === "string" && typeof (method = data[options]) === "function") {
                that = method.apply(data, args);
            }
        });
        return (that ? that : this);
    };

    $(document).ready(function(){
        $("[data-name=tiny-slider]")[PLUGIN_NAME]();
    });
})(jQuery, window, document);

