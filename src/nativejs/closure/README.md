> http://www.haorooms.com/post/js_bbtwo

# 案例

/*这个例子是一个比较简单的闭包，解释如下：

  (1)定义了一个普通函数A
  (2)在A中定义了普通函数B
  (3)在A中返回B（确切的讲，在A中返回B的引用）
  (4)执行A(),把A的返回结果赋值给变量 c
  (5)执行 c()
  当一个内部函数被其外部函数之外的变量引用时，就形成了一个闭包。*/

  ```javascript
  function simpleClosure(){
      function innerFunc(){
          console.log("Hello zzl81cn");
      }
      return innerFunc;
  }
  var c = simpleClosure();
  c();//Hello zzl81cn
  ```

# 作用

在上述例子中，innerFunc()定义在simpleClosure()中，因此innerFunc()依赖于simpleClusure(),而外部变量 c 又引用了innerFunc(), 所以simpleClosure间接的被 c 引用，也就是说，A不会被回收，会一直保存在内存中。为了证明我们的推理，上面的例子稍作改进。也可以看我之前闭包文章中的例子：http://www.haorooms.com/post/js_bb 第一个案例。

```javascript
function recycleClosure(){
    var count = 0;
    function innerRecycle(){
        count++;
        console.log(count);
    }
    return innerRecycle;
}

var recycle = recycleClosure();
recycle();//1
recycle();//2
recycle();//3
```
>count是A中的一个变量，它的值在B中被改变，函数B每执行一次，count的值就在原来的基础上累加1。因此，A中的count一直保存在内存中。
这就是闭包的作用，有时候我们需要一个模块中定义这样一个变量：希望这个变量一直保存在内存中但又不会“污染”全局的变量，这个时候，我们就可以用闭包来定义这个模块。

# 常见的闭包写法

前面我的文章中多次提及“自调用匿名函数”，例如：http://www.haorooms.com/post/js_jquery_chajian 其实，大部分自调用匿名函数都是闭包的一种应用和写法。

例如下面的例子

```javascript
(function(document){
    var viewport;
    var obj = {
        init:function(id){
           viewport = document.querySelector("#"+id);
        },
        addChild:function(child){
            viewport.appendChild(child);
        },
        removeChild:function(child){
            viewport.removeChild(child);
        }
    }
    window.jView = obj;
})(document);
```

以上代码可以改写成如下代码：

```javascript
var f = function(document){
    var viewport;
    var obj = {
        init:function(id){
            viewport = document.querySelector("#"+id);
        },
        addChild:function(child){
            viewport.appendChild(child);
        },
        removeChild:function(child){
            viewport.removeChild(child);
        }
    }
    window.jView = obj;
};
f(document);
```

在这段代码中似乎看到了闭包的影子，但 f 中没有任何返回值，似乎不具备闭包的条件，注意这句代码：

```javascript
window.jView = obj;
```

obj 是在 f 中定义的一个对象，这个对象中定义了一系列方法， 执行window.jView = obj 就是在 window 全局对象定义了一个变量 jView，并将这个变量指向 obj 对象，即全局变量 jView 引用了 obj 。而 obj 对象中的函数又引用了 f 中的变量 viewport ,因此 f 中的 viewport 不会被回收，会一直保存到内存中，所以这种写法满足闭包的条件。 另外，我们把obj赋值给window.jView ，那么，我们在整个window中可以直接调用obj 中的函数，但是函数内部的变量不会被收回，例如我们调用obj的init函数可以这么写：
```javascript
window.jView.init("haorooms")
```

# 小结

以上是对闭包最简单的理解。当然闭包还有更深入的理解。例如执行环境(execution context)、活动对象(activation object)以及作用域(scope)和作用域链(scope chain)的运行机制等等。当然，我们理解闭包先从简单开始，写的多了，理解的就越深了。本文也是对闭包的最简单的入门，希望通过这篇文章，大家对闭包有了一定的理解。