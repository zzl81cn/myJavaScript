> http://purplebamboo.github.io/2015/01/17/javascript-module/

但凡是比较成熟的服务端语言，都会有模块或者包的概念。模块化开发的好处就不用多说了。由于javascript的运行环境（浏览器）的特殊性。js很早之前一直都没有模块的概念。经过一代代程序猿们的努力。提供了若干的解决方案。

# 基本对象

为了解决模块化的问题。早期的程序员会把代码放到某个变量里。做一个最简单的命名空间的划分。

比如一个工具模块：util

var util = {
    _prefix:'我想说：',
    log:function(msg){ console.log(_prefix +msg)}
    /*
    其他工具函数
    */
}

这样所有的工具函数都托管在util这个对象变量里，极其简陋的弄了个伪命名空间。这样的局限性很大，因为我们可以随意修改。util不存在私有的属性。_prefix这个私有属性，后面可以随意修改。而我们很难定位到到底在哪边被修改了。

# 闭包立即执行

后来，一些程序员想到了方法解决私有属性的问题，有了下面这种写法：

var util = (function(window){

    var _prefix = '我想说：';
    return {
        log:function(msg){ console.log(_prefix +msg)}
    }

})(window)

主要使用了匿名函数立即执行的技巧，这样 _prefix 是一个匿名函数里面的局部变量，外面无法修改。但是log这个函数里面又因为闭包的关系可以访问到_prefix。只把公用的方法暴露出去。

这是后来模块划分的主要技巧，各大库比如jQuery，都会在最外层包裹这样一个匿名函数。

但是这只是在同一个文件里面的技巧，如果我们把util单独写到一个文件util.js。而我们程序的主代码是main.js那我们需要在页面里面一起用script标签引入：

<script src="main.js"></script>
<script src="util.js"></script>

这会有不少问题，最典型的比如如果我们的main.js如下

util.log('我是模块主代码，我加载好了')

这个就执行不了，因为我们的util.js是在main.js后面引入的。所以执行main.js的内容的时候util还没定义呢。
不止这个问题，再比如如果引入了其他的js文件，并且也定义了util这个变量。就会混乱。

# 模块加载器


node作为javascript服务端的一种应用场景，加入了文件模块的概念，主要是实现的CommonJS规范。

后来一些程序员就想，服务端可以有文件模块。浏览器端为什么就不可以呢。但是CommonJS规范是设计给服务端语言用的，不适合浏览器端的js。

于是出现了amd规范，并且在这个基础上出现了实现amd规范的库requirejs。

后来国内的大神玉伯由于多次给requirejs提建议（比如用时定义）一直不被采纳。于是另起炉灶制作了seajs。慢慢的也沉淀出了seajs的cmd规范。

关于模块规范的具体历史，可以参考：https://github.com/seajs/seajs/issues/588

两个规范差别并不是很大，可能由于写node习惯了，个人更喜欢cmd的编写方式。

首先我们看看基于cmd规范（其实就是seajs）后我们怎么写代码：