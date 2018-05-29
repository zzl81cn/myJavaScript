/**
 * Created by zzl81cn on 2017/4/20.
 * https://segmentfault.com/a/1190000000652891
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
	alert('ScopeA ' + a);
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
		a: aaa,
		b: bbb
	}
})();
// 2
privateA.a();
// 3
privateA.b();*/

// 使用匿名函数实现累加
function box() {
	var age = 100;
	//匿名函数
	return function () {
		age++;
		return age;
	};
}
/*var b = box();
//即alert(box()())；
alert(b());
alert(b());
alert(b);*/
var anonymousTarget = document.getElementById('anonymous');
anonymousTarget.addEventListener('click', function () {
	// alert(box()());
	var b = box();
	alert(b());
	alert(b());
});
// function () {
// 	age++;
// 	return age;
// }
//解除引用，等待垃圾回收
b = null;


// 在循环中直接找到对应元素的索引
// https://app.yinxiang.com/shard/s27/nl/6509927/661c35c3-7558-4e21-9176-80a98873e431?title=(1)%E8%AF%A6%E8%A7%A3js%E9%97%AD%E5%8C%85%20-%20trigkit4%20-%20SegmentFault
/*window.onload = function () {
	var aLi = document.getElementsByTagName('li');
	for (var i = 0; i < aLi.length; i++) {
		// alert(i);
		// 当点击时for循环已经结束
		aLi[i].onclick = function () {
			alert(i);
		}
	}
};*/
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
};


// GC
function closureUnGC() {
	// oDiv用完之后一直驻留在内存中
	var oDiv = document.getElementById('oDiv');
	oDiv.onclick = function() {
		// 这里用oDiv导致内存泄露
		alert('oDiv innerHTML');
	}
}
closureUnGC();

function clusureGC() {
	var oDivGC = document.getElementById('oDivGC');
	var test = oDivGC.innerHTML;
	oDivGC.onclick = function () {
		alert(test);
	}
	oDivGC = null;
}
clusureGC();


// https://app.yinxiang.com/shard/s27/nl/6509927/1690bfd9-a44a-4f64-b6fe-395ef15dcec5?title=80%25%20%E5%BA%94%E8%81%98%E8%80%85%E9%83%BD%E4%B8%8D%E5%8F%8A%E6%A0%BC%E7%9A%84%20JS%20%E9%9D%A2%E8%AF%95%E9%A2%98
function normalClosure() {
	for(var i = 0; i < 5; i++) {
		setTimeout(function () {
			console.log(new Date, i);
		}, 1000)
	}
	console.log(new Date, i);
}
// 利用 IIFE（Immediately Invoked Function Expression：声明即执行的函数表达式）来解决闭包造成的问题
function toClosure() {
	for(var i = 0; i < 5; i++){
		(function (j) {
			setTimeout(function () {
				console.log(new Date, j)
			})
		})(i)
	}
}
// 利用 JS 中基本类型（Primitive Type）的参数传递是按值传递（Pass by Value）的特征
function priClosure() {
	var output = function(i){
		setTimeout(function(){
			console.log(new Date, i);
		}, 1000)
	};
	for(var i = 0; i<5; i++){
		output(i);
	}
	console.log(new Date, i);
}

