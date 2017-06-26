/**
 * Created by zzl81cn on 2017/6/26.
 *
 * 在javascript中，1与Number(1)有什么区别
 * https://segmentfault.com/q/1010000007552319?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly
 */

/**
 * 数字、字符串、布尔三者，在JS中称为原始的(primitives)资料类型，再加上null与undefined也是。除了这些类型外，其他的都是对象。(注: ES6的Symbol是新加的原始资料类型)
 * 对象中有一类是Number, String, Boolean这三个对象，分别对应数字、字符串、布尔类型，我们称它们为包装对象或包装类型(Wrappers)，很少会直接使用到它们，在很多情况下也尽量避免使用它们。
 * */

/**
 * 包装类型与原始资料类型之间的正确转换方式如下:

 原始->包装: new Number(123)
 包装->原始: (new Number(123)).valueOf()
 包装对象是个对象，所以它与原始资料类型并不相同，用typeof与instanceof都可以检测出来:
 * */
typeof 123;
// "number"

typeof new Number(123);
// "object"

123 instanceof Number;
// false

(new Number(123)) instanceof Number;
// true

123 === new Number(123);
// false

// 作为对象来进行比较，因为对象是参照的，不同的对象不可能相等:
var a = new Number(123);
var b = a;
a === b;
// true
var c = new Number(123);
a === c;
// false

var a = 123;
var b = 123;
a === b; // true
a == b; // true

/**
 * 原始资料类型的方法与属性是"借"来的
 * 一个原始的资料类型值，并没有如对象会有属性或方法，原始的资料类型在运算时用的属性与方法，是向包装对象"借来"的用的，这是JS中的设计。例如一个数字的(123).toFixed()，toFixed()实际上是在Number对象原型(prototype)中声明的方法。这可以用简单的代码判断出来:
 * */

(123).toFixed === Number.prototype.toFixed;
// true
"abc".charAt === String.prototype.charAt;
// true


//JS总是会求值出原始资料，而不是包装对象

