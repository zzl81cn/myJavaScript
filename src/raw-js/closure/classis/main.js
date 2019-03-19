/**
 * Created by zzl81cn on 2017/6/12.
 */
/**
 * 经典同步、异步结合闭包的面试题
 * 因为执行优先级是：同步>异步>回调
 * 所以是ｆｏｒ循环部分先执行，然后ｃｏｎｓｏｌｅ．ｌｏｇ被提出来优先执行了，最后才是执行ｓｅｔＴｉｍｅｏｕｔ部分。
 * */
const arr = [10, 12, 13, 15];

function question() {
	for(var i = 0; i < arr.length; i++) {
		setTimeout(function () {
			console.log(i)
		}, 1000);
	}
}
question(); // 4 ... 4 ... 4 ... 4

function resolveClosure() {
	for(var i = 0;i<arr.length;i++){
		// 给每个函数传入变量 i 让其能访问正确的索引
		setTimeout(function(is){
			return function(){
				console.log(is)
			}
			//console.log(is)
		}(i), 3000)
	}
};
resolveClosure(); // 0 ... 1 ... 2 ... 3 ... 4

function resolveES6() {
	for (let i = 0; i < arr.length; i++) {
		// 使用 ES6 中的 let 关键字，它会在函数调用时创建一个新的绑定
		// 了解更多：http://exploringjs.com/es6/ch_variables.html#sec_let-const-loop-heads
		setTimeout(function () {
			console.log(i);
		}, 1000)
	}
}

function syncAsync() {
	for(var i = 0; i< 5;i++) {
		setTimeout(function () {
			// console.log(i);
			window.alert(i)
		}, 1000)
	}
}

document.addEventListener('click', function (e) {
	var id = e.target.id;
	console.log(id);
	switch(id) {
		case('question'):
			question();
			break;
		case('resolveClosure'):
			resolveClosure();
			break;
		case('resolveES6'):
			resolveES6();
			break;
		case('syncAsync'):
			syncAsync();
			break;
		default:
			console.log('HoHo');
	}
})