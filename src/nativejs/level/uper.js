/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-26 17:10:24
 * @version $Id$
 * http://www.cnblogs.com/xxcanghai/p/5189353.html
 */

function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();//2
getName();//4
Foo().getName();//1
getName();//1
new Foo.getName();//2
new Foo().getName();//3
new new Foo().getName();//3