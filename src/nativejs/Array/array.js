/**
 * Created by admin on 2016/9/28.
 * Modifyy Array[[],[]] 2017/3/24.
 */

/**
 * constructor	返回对创建此对象的数组函数的引用。
 * length	设置或返回数组中元素的数目。
 * prototype	使您有能力向对象添加属性和方法。
 * */

/**
 * Array对象方法：
 * concat()	连接两个或更多的数组，并返回结果。
 * join()	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
 * pop()	删除并返回数组的最后一个元素
 * push()	向数组的末尾添加一个或更多元素，并返回新的长度。
 * reverse()	颠倒数组中元素的顺序。
 * shift()	删除并返回数组的第一个元素
 * slice()	从某个已有的数组返回选定的元素
 * sort()	对数组的元素进行排序
 * splice()	删除元素，并向数组添加新元素。
 * toSource()	返回该对象的源代码。
 * toString()	把数组转换为字符串，并返回结果。
 * toLocaleString()	把数组转换为本地数组，并返回结果。
 * unshift()	向数组的开头添加一个或更多元素，并返回新的长度。
 * valueOf()	返回数组对象的原始值*
 * */

//    http://www.w3school.com.cn/jsref/jsref_splice.asp
var arr = [];
arr[0] = "apple";
arr[1] = "sumsung";
console.log(arr);
// ["apple", "sumsung"];

// splice()方法在指定第二个参数为0时，相当于在第一个索引位置插入一个新元素，这样就可以实现在任意位置插入新元素的操作，如果第二位参数与第一位相同，则是删除原数组指定索引元素
arr.splice(1,0,"meizu");
console.log(arr);
// ["apple", "meizu", "sumsung"];

arrPop = [1,2,3,4];
console.log(arrPop.pop());
// 4
console.log(arrPop.join(","));
// 1,2,3

arrPush = [1,2,3];
arrPush.push(5);
// 4

arrReverse = [1,2,3];
arrReverse.reverse();
// [3,2,1]

arrShift = [1,2,3];
arrShift.shift();
// 1

// slice()方法是返回一个新数组，并不会影响原数组
var abc = ["apple", "oneplus", "sumsung"];
var newAbc = abc.slice(0,2);
console.log(newAbc);
// ["apple", "oneplus"]
console.log(abc);
// ["apple", "oneplus", "sumsung"]


// 利用apply()方法查找数组最大值、最小值
var def = [3,43,99];
Math.max.apply(Math, def);
// 99
Math.min.apply(Math, def);
// 3


// 查找数组第二大值
function sortNumber(a, b) {
	// 第二大
	return a - b;
	// 第二小
	// return b-a;
}
var arrSortFind = [1, 4, 2, 3, 5];
arrSortFind.sort(sortNumber);

console.log(arrSortFind[arrSortFind.length - 2]);


// 数组去重
// https://www.toobug.net/article/array_unique_in_javascript.html
var arrUnique = [1,1,'1', 2, '2',6];
// 双重for循环
function uniqueDoubleFor(arr) {
	var ret = [];
	var len = arr.length;
	var isRepeat;
	for (var i = 0; i < len; i++) {
		isRepeat = false;
		for (var j = i + 1; j < len; j++) {
			if (arr[i] === arr[j]) {
				isRepeat = true;
				break;
			}
		}
		if (!isRepeat) {
			ret.push(arr[i]);
		}
	}
	return ret;
}
uniqueDoubleFor(arrUnique);
// [1, "1", 2, "2", 6]


// Optimize version 双重遍历还有一个优化版本，但是原理和复杂度几乎完全一样
function uniqueOptimize(arr) {
	var ret = [];
	var len = arr.length;
	for(var i=0; i<len; i++){
		for(var j=i+1; j<len; j++){
			if(arr[i] === arr[j]){
				j = ++i;
			}
		}
		ret.push(arr[i]);
	}
	return ret;
}


// ES6
function unique(arr){
	var set = new Set(arr);
	return Array.from(set);
}

unique(arrUnique);
// [1, "1", 2, "2", 6]

// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素, 元素索引, 原数组本身.
// parseInt 利用map和parseInt方法将字符串元素数组内转换为数字元素数组
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
function returnInt(element){
	return parseInt(element,10);
}

["1", "2", "3"].map(returnInt);
// (3) [1, 2, 3]


// 降维数组操作
// http://web.jobbole.com/85129/
// 直接暴力转为字符串降维数组，但是性能应该不会好
/*var arr3 = [1,2,[3,4],[1,[3,4],9],10];
 var str2 = arr3.toString();
 var arr = str2.split(",");
 console.log(arr);*/

// 使用for循环嵌套
var arr1 = [[1,3,5],[2,4],[7]];

function reduceDimFor(arr) {
	var arrResult = [];
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0;j<arr[i].length; j++) {
			arrResult.push(arr[i][j]);
		}
	}
	return arrResult;
};
console.log(reduceDimFor(arr1));
// var arr2 = reduceDimFor(arr1);
// console.log(arr2);

// 此方法思路简单，利用双重循环遍历二维数组中的每个元素并放到新数组中。

//利用concat转换
var arr2 = [[1,3,5],[2,4],[7]];
function reduceDimConcat(arr) {
	var arrResut = [];
	for(var i = 0, tmpLength = arr.length; i < tmpLength; i++) {
		arrResut = arrResut.concat(arr[i]);
	}
	return arrResut;
}
console.log(reduceDimConcat(arr2));

/**
 * 先来回顾一下MDN上对于该方法的介绍：
 * “concat creates a new array consisting of the elements in the object on which it is called, followed in order by, for each argument, the elements of that argument (if the argument is an array) or the argument itself (if the argument is not an array).”
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
 *
 * 即如果concat方法的参数是一个元素，该元素会被直接插入到新数组中；如果参数是一个数组，该数组的各个元素将被插入到新数组中；将该特性应用到代码中：
 *
 * arr的每一个元素都是一个数组，作为concat方法的参数，数组中的每一个子元素又都会被独立插入进新数组。利用concat方法，我们将双重循环简化为了单重循环。
 * */


// 利用apply和concat转换
/**
 * 按照惯例，先来回顾一下MDN上对于apply方法的介绍：
 “The apply() method calls a function with a given this value and arguments provided as an array.”
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

 即apply方法会调用一个函数，apply方法的第一个参数会作为被调用函数的this值，apply方法的第二个参数（一个数组，或类数组的对象）会作为被调用对象的arguments值，也就是说该数组的各个元素将会依次成为被调用函数的各个参数；将该特性应用到代码中：
 另有bind()方法()：https://app.yinxiang.com/shard/s27/nl/6509927/7567f1c5-6167-4530-9b36-39d095f93d61?title=setTimeout%E6%94%B9%E5%8F%98this%E6%8C%87%E5%90%91(****************************************)%20-%20%E6%9C%80%E9%AA%9A%E7%9A%84%E5%B0%B1%E6%98%AF%E4%BD%A0%20-%20%E5%8D%9A%E5%AE%A2%E5%9B%AD
 * */
var arr4 = [1,2,[3,4],[1,[3,4],9],10];
function reduceDim(arr) {
	return Array.prototype.concat.apply([], arr);
}
console.log(reduceDim(arr4));

/**
 * arr作为apply方法的第二个参数，本身是一个数组，数组中的每一个元素（还是数组，即二维数组的第二维）会被作为参数依次传入到concat中，效果等同于[].concat([1,2], [3,4], [5,6])。
 利用apply方法，我们将单重循环优化为了一行代码，很简洁有型有木有啊~

 读者也可参照本文思路，自己利用递归实现N维数组降维的逻辑。
 * */


// 深层嵌套的多维数组如何降维成为一维数组
/*可以考虑使用递归的方式，反复检查是否还有数组元素*/

