# tinySlider
仿淘宝的无限循环----幻灯片

#html结构

        <div class="tiny-slider" data-name="tiny-slider">
            <ul>
                <li class="tiny-slider-item"><a href="javascript:;"><img data-src="images/1.jpg" src="images/loading.gif" alt="" /></a></li>
                <li class="tiny-slider-item" ><a href="javascript:;"><img data-src="images/2.jpg" src="images/loading.gif"  alt="" /></a></li>
                <li class="tiny-slider-item"><a href="javascript:;"><img data-src="images/3.jpg" src="images/loading.gif"  alt="" /></a></li>
            </ul>
            <a class="tiny-slider-prev" href="javascript:;" style="z-index: 5"></a>
            <a class="tiny-slider-next" href="javascript:;" style="z-index: 5"></a>
        </div>
        
#调用方式
  $('[data-name=tiny-slider]').tinySlider();

#还有许多功能待完成....

在线演示：http://115.29.111.37/slider/
