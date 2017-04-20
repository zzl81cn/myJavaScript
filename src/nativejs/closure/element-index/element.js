/**
 * Created by zzl81cn on 2017/4/20.
 */
/*function aaa() {
 var a = 1;
 return function () {
 alert(a++);
 }
 }
 var fun = aaa();
 fun();
 fun();
 fun = null;*/

// 全局变量的累加
/*var a = 1;
 function globalA() {
 a++;
 alert(a);
 }
 // 2
 globalA();
 // 3
 globalA();*/

// 局部变量
/*function scopeA() {
 var a = 1;
 a++;
 alert('ScopeA '+ a);
 }
 // 2
 scopeA();
 // 2
 scopeA();*/

// 局部变量累加
/*function outerA() {
 var a = 1;
 return function () {
 a++;
 alert(a);
 }
 }
 var out = outerA();
 // var out = outerA.call();
 // 2
 out();
 // 3
 out();*/

// 模块化代码，减少全局变量污染
// outerA为外部匿名函数的返回值
/*var outerA = (function () {
 var a = 1;
 return function () {
 a++;
 alert(a);
 }
 })();
 // 调用一次outerA函数，其实是调用里面内部函数的返回值
 outerA();
 outerA();*/

// Private member exist
/*var privateA = (function () {
 var a = 1;
 function aaa() {
 a++;
 alert(a);
 };
 function bbb() {
 a++;
 alert(a);
 };
 // json construction
 return {
 a:aaa,
 b:bbb
 }
 })();
 // 2
 privateA.a();
 // 3
 privateA.b();*/

// 使用匿名函数实现累加
function box() {
	var age = 100;
	return function () {          //匿名函数
		age++;
		return age;
	};
}

var b = box();
//即alert(box()())；
console.log(b());
console.log(b());
console.log(b());
console.log(b);
// function () {
// 	age++;
// 	return age;
// }

b = null;  //解除引用，等待垃圾回收

//在循环中直接找到对应元素的索引
/*window.onload = function () {
 var aLi = document.getElementsByTagName('li');
 for(var i = 0; i<aLi.length; i++) {
 // alert(i);
 // 当点击时for循环已经结束
 aLi[i].onclick = function () {
 alert(i);
 }
 }
 }*/
// 利用闭包重写
window.onload = function () {
	var aLi = document.getElementsByTagName('li');
	for (var i = 0; i < aLi.length; i++) {
		(function (i) {
			aLi[i].onclick = function () {
				alert(i);
			}
		})(i)
	}
}
