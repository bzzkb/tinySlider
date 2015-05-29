# tinySlider
仿淘宝的无限循环----幻灯片

#html结构

        <div class="tiny-slider" data-name="tiny-slider">
            <ul>
                <li class="tiny-slider-item"><a href="javascript:;"><img src="images/1.jpg" alt="" /></a></li>
                <li class="tiny-slider-item" ><a href="javascript:;"><img src="images/2.jpg" alt="" /></a></li>
                <li class="tiny-slider-item"><a href="javascript:;"><img src="images/3.jpg" alt="" /></a></li>
            </ul>
            <a class="tiny-slider-prev" href="javascript:;" style="z-index: 5"></a>
            <a class="tiny-slider-next" href="javascript:;" style="z-index: 5"></a>
        </div>
        
#调用方式
  $('[data-name=tiny-slider]').tinySlider();
