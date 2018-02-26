# 事件委托

## 起因
> 昨天在项目中发现一个问题：在DOM加载之后为标签绑定的事件对于新加进来的标签并不起作用，通过查找发现事件并没有绑定到新加入的标签，因此今天特意总结一下这种问题的解决方案。
> 在jquery中，我们通常是在DOM加载完成后，再对元素绑定事件。以下面的情景为例：制作一个表格，每一栏最后有个button可以删除这一栏。然后还有一个添加按钮，可以给表格添加一栏。代码如下：
``` html
<table>
  <thead>
    <tr>
      <th>学号</th>
      <th>成绩</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>100</td>
      <td>98</td>
      <td><button class="del">删除</button></td>
    </tr>
  </tbody>
</table>
<button class="add">添加</button>
```

> 上述代码在DOM加载完后，通过jquery向class="del"的删除按钮添加了一个click事件，用于删除该栏。通过运行测试我们可以发现，给删除按钮添加的点击事件对DOM中存在的前三栏是起作用，但是如果我们再点击添加按钮添加一栏，则新增的这一栏中的删除按钮并没有绑定点击事件。

## 分析
js的事件监听跟css不一样，我们知道css只要设定好了样式，不论是原来就有的还是新添加的，都有一样的表现。而事件监听不是，新增加的虽然设置了相同的class，但是并没有绑定事件，你必须给每一个元素单独绑定事件。

这种问题的处理方法主要有三种：

* 第一种：重复绑定

		重复绑定法：DOM加载时，先对DOM中存在的元素进行事件绑定，每次新增的元素时，再对新增元素绑定一次事件，jquery代码如下：-->
* 第二种：省略
* 第三种：事件委托

通过查看jquery API文档，发现有个live()事件，对live()事件的概述如下：“jQuery 给所有匹配的元素附加一个事件处理函数，即使这个元素是以后再添加进来的也有效。”但是很不幸的是，live()在jquery 1.7之后就不推荐使用了。

因此我们需要另外找路，通过查看文档我们发现：.live() 方法能对一个还没有添加进DOM的元素有效，是由于使用了事件委托：绑定在祖先元素上的事件处理函数可以对在后代上触发的事件作出回应。传递给 .live() 的事件处理函数不会绑定在元素上，而是把他作为一个特殊的事件处理函数，绑定在 DOM 树的根节点上。

既然知道了原理，那么我们可以自己实现事件委托，我们不在button上直接绑定事件，而在把事件绑定在tbody上，通过判断事件的目标event.target对象的某些属性来判断这个对象是不是我们要找的事件触发的对象。

下面，我们通过className来判断是否是我们的目标对象：

``` html
<script type="text/javascript" src="../jquery.js"></script>
```
``` javascript
$(function(){
  $('.del').click(function(){
    $(this).parents("tr").remove();
  });
  $('.add').click(function() {
    $("<tr><td>103</td><td>68</td><td><button class='del'>删除</button></td></tr>").appendTo('tbody');
  });
});
```

### 重复绑定
``` javascript
$(function(){
		$('.del').click(deleteTr);
		$('.add').click(function() {
			$("<tr><td>103</td><td>68</td><td><button class='del'>删除</button></td></tr>").find(".del").click(deleteTr).end().appendTo('tbody');
		});
		function deleteTr(){
			$(this).parents("tr").remove();
		}
  });
```

这里有一点需要注意就是onclick='deleteTr(this)'中的deleteTr()函数不能定义在$(function(){});中，如果定义在$(function(){});中，在解析HTML时，无法调用，因此需要定义在外面。

``` javascript
$('tbody').click(function (e) {
  if(e.target.className == "del") {
    $(e.target).parents('tr').remove();
  }
})
```
