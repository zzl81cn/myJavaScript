/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-08 23:30:56
 * @version $Id$
 */

// 讲解之前先来讲讲性能.
// 如果一个整体页面里有大量的按钮.我们就要为每一个按钮绑定事件处理程序.这样就会影响性能了.
// 首先每个函数都是对象,对象就会占用很多内存.内存中的对象越多,性能就越差.
// 其次,dom访问次数增多,就会导致延迟加载页面.事实上,从如何来利用好事件处理程序,还是有很好的解决方案的.
// 一、事件委托
// 对事件处理程序过多的问题解决的方案就是事件委托技术.
// 事件委托技术利用了事件冒泡.只需指定一个事件处理程序.
// 我们可以为某个需要触发事件的父元素来绑定事件处理程序.
// HTML代码:
/*<ul id="mylist">
        <li id="li_1">sdsdsd</li>
        <li id="li_2">sdsdsd</li>
        <li id="li_3">sdsdsd</li>
</ul>
*/
// 现在我们要为这3个li绑定事件处理程序..
// 只需要在ul绑定事件处理程序.
// js代码:

obj.eventHandler($("mylist"),"click",function(e){
                    e = e || window.event;
                    switch(e.target.id){    //大家应该还记得target是事件目标,只要点击了事件的目标元素就会弹出相应的alert.
                        case "li_1":
                        alert("li_1");
                        break;
                        case "li_2":
                        alert("li_2");
                        break;
                        case "li_3":
                        alert("li_3");
                        break
                    }
                })

// 如果在一个复杂的web应用程序中,.这种事件委托是非常实用的.
// 如果不采用这种方式的话,一个一个去绑定那就是数不清的事件处理程序.
// 好了.就讲解到这里.