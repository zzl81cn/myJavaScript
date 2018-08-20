> http://www.cnblogs.com/xxcanghai/p/5189353.html

此题是我综合之前的开发经验以及遇到的JS各种坑汇集而成。此题涉及的知识点众多，包括变量定义提升、this指针指向、运算符优先级、原型、继承、全局变量污染、对象属性及原型属性优先级等等。

此题包含7小问，分别说下。

# 第一问

先看此题的上半部分做了什么，首先定义了一个叫Foo的函数，之后为Foo创建了一个叫getName的静态属性存储了一个匿名函数，之后为Foo的原型对象新创建了一个叫getName的匿名函数。之后又通过函数变量表达式创建了一个getName的函数，最后再声明一个叫getName函数。

第一问的 Foo.getName 自然是访问Foo函数上存储的静态属性，自然是2，没什么可说的。

# 第二问

第二问，直接调用 getName 函数。既然是直接调用那么就是访问当前上文作用域内的叫getName的函数，所以跟1 2 3都没什么关系。此题有无数面试者回答为5。此处有两个坑，一是变量声明提升，二是函数表达式。

## 变量声明提升

即所有声明变量或声明函数都会被提升到当前函数的顶部。

例如下代码:

```javascript
console.log('x' in window);//true
var x;
x = 0;
```

代码执行时js引擎会将声明语句提升至代码最上方，变为：

```javascript
var x;
console.log('x' in window);//true
x = 0;
```