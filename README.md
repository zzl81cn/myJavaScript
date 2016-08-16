# myJavaScript
> origin&amp;js framework project.

## module

### mutiple select

### picture zoom

### water fall layout

#### 原理
第一次进入的时候，根据浏览器宽度以及每列宽度计算出列表个数，然后不管三七二十一，每列先加载个5张图片再说。

当滚动的时候，对每一列的底部位置做检测，如果在屏幕中或屏幕上方，则立即append一个新图片（注意：为了简化代码，提高性能，同时便于演示等，这里只append了一个）。因为，滚动时连续的，因此，我们实际看到的效果是图片不断load出来。

当浏览器宽度改变的时候，页面上有个id为waterFallDetect空span标签，这个标签作用有两个：一是实现两端对齐效果，二是用来检测瀑布流布局是否需要刷新。

检测原理如下：
该span标签宽度与一个列表宽度一致，当浏览器宽度变小的时候，如果小到一定程度，显然，浏览器最右边的列表就会跑到下一行，把空span挤到后面去，空span发生较大的水平位移，显然，可以通知脚本，布局需要刷新；当浏览器宽度变大的时候，如果变大的尺寸超过一列的宽度，显然，这个空span灰跑到第一行去，同样是发生较大的水平位移，因此，又可以通知脚本刷新瀑布流布局了。

这个方法的好处是几乎没有计算就可以一点不差地知道何时瀑布流布局需要刷新。这显然要比设置resize定时器+位置尺寸计算要简单高性能地多。

#### 特点
简单：最大限度利用了浏览器的流体特性进行布局，省去了很多计算的麻烦；新人更易懂和上手
更好的性能：这个体现在多处，如浏览器宽度改变，瀑布流刷新时候的效率等
无需知晓尺寸：如果是要绝对定位实现瀑布流，必须知道每个小模块的高度以及宽度（否则无法定位），而基于列表的布局则无需知道高宽
