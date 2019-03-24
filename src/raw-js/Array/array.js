/**
 * Created by zzl81cn on 2016/9/28.
 * Modifyy Array[[],[]] 2017/3/24.
 * Add ES6.
 */

/**
 * constructor	返回对创建此对象的数组函数的引用。
 * length	设置或返回数组中元素的数目。
 * prototype	使您有能力向对象添加属性和方法。
 * */
/**
 * Quesion:
 * 1.数组去重，普通数组去重，ES6版本；<2017.3, 2019.3>
 * 2.数组排序，普通版本排序，ES6版本；<2017.5>
 */

/**
 * Array对象方法：
 * concat()	连接两个或更多的数组，并返回结果。
 * indexOf()方法，返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
 * join()	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
 * pop()	删除并返回数组的最后一个元素
 * map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
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
 * ES6: 
 * - find();
 * - findIndex();
 * - filter();
 * */


 /* 
 　3、请阐述forEach与map两个循环方法的差别。如果选择？
　　为了方便理解这两个方法，让我们分别来看这两个方法的功能。

　　forEach

遍历数组中的每个元素
为每个元素执行一个回调函数
不会有任何返回值
复制代码
1 const a = [1, 2, 3];
2 const doubled = a.forEach((num, index) => {
3   // Do something with num and/or index.
4 });
5 
6 // doubled = undefined
复制代码
　　

　　map

遍历数组中的每个元素
为每个元素执行改函数，并对应生成一个新元素，最终返回一个新数组
复制代码
1 const a = [1, 2, 3];
2 const doubled = a.map(num => {
3   return num * 2;
4 });
5 
6 // doubled = [2, 4, 6]
复制代码
　　所以这两个方法最主要的区别就在于map会返回一个新数组。如果你需要接收处理结果，并且不修改原始数组，那么map就是最合适的选择。如果你只是希望单独循环一个数组的元素，那么forEach可以胜任。

　　引用文档：

　　https://codeburst.io/javascript-map-vs-foreach-f38111822c0f
 */

// ## API
//    http://www.w3school.com.cn/jsref/jsref_splice.asp
var arr = [];
arr[0] = "apple";
arr[1] = "sumsung";
console.log(arr);
// ["apple", "sumsung"];

// Array.indexOf(searchElement, fromIndex),link:(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1


// Array.splice()方法在指定第二个参数为0时，相当于在第一个索引位置插入一个新元素，这样就可以实现在任意位置插入新元素的操作，如果第二位参数与第一位相同，则是删除原数组指定索引元素
let arr = ["apple", "sumsung"];
arr.splice(1, 0, "meizu");
console.log(arr); // ["apple", "meizu", "sumsung"]
arr.splice(1, 1); // ["apple", "sumsung"]


// Array.pop()，删除并返回最后一个元素
let arrPop = [1, 2, 3, 4];
console.log(arrPop.pop()); // 4
console.log(arrPop.join(",")); // 1,2,3


// Array.push()，向数组尾部增加一个元素，并返回当前数组长度
let arrPush = [1, 2, 3];
arrPush.push(5);
// 4

arrReverse = [1,2,3];
arrReverse.reverse();
// [3,2,1]

arrShift = [1,2,3];
arrShift.shift();
// 1


// Array.slice() 方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。params: begin, end-从 begin 到 end 的所有元素（包含begin，但不包含end）（骨头不顾尾）。
var abc = ["apple", "oneplus", "sumsung"];
var newAbc = abc.slice(0,2);
console.log(newAbc); // ["apple", "oneplus"]
console.log(abc); // ["apple", "oneplus", "sumsung"]， 元素组未改变


// ## 实战应用
// 利用apply()方法查找数组最大值、最小值
var def = [3, 43, 99];
Math.max.apply(Math, def); // 99
Math.min.apply(Math, def); // 3


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
}
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
 * arr2的每一个元素都是一个数组，作为concat方法的参数，数组中的每一个子元素又都会被独立插入进新数组。利用concat方法，我们将双重循环简化为了单重循环。
 * */


// 利用apply和concat转换
/**
 * 按照惯例，先来回顾一下MDN上对于apply方法的介绍：
 “The apply() method calls a function with a given this value and arguments provided as an array.”,( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
 即apply方法会调用一个函数，apply方法的第一个参数会作为被调用函数的this值，apply方法的第二个参数（一个数组，或类数组的对象）会作为被调用对象的arguments值，也就是说该数组的各个元素将会依次成为被调用函数的各个参数；将该特性应用到代码中：
 另有bind()方法()--setTimeout改变this指向：https://app.yinxiang.com/shard/s27/nl/6509927/7567f1c5-6167-4530-9b36-39d095f93d61?title=setTimeout%E6%94%B9%E5%8F%98this%E6%8C%87%E5%90%91(****************************************)%20-%20%E6%9C%80%E9%AA%9A%E7%9A%84%E5%B0%B1%E6%98%AF%E4%BD%A0%20-%20%E5%8D%9A%E5%AE%A2%E5%9B%AD
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

/* ES6 */
// Array.find()
// 该方法主要应用于查找第一个符合条件的数组元素。它的参数是一个回调函数。在回调函数中可以写你要查找元素的条件，++当条件成立为true时，返回该元素++。如果没有符合条件的元素，返回值为undefined。
// 回调函数有三个参数。value：当前的数组元素。index：当前索引值。arr：被查找的数组。
const myArr = [1, 2, 3, 4, 5, 6];
var v = myArr.find(value => value > 4);
console.log(v); // 5
var v = myArr.find(value => value > 40);
console.log(v); // undefined

// 查找索引值为4的元素
const myArr = [1, 2, 3, 4, 5, 6];
var v = myArr.find((value, index, arr) => {
	return index == 4
});
console.log(v); // 5


// Array.findIndex()与find()的使用方法相同，只是当条件为true时findIndex()返回的是索引值，而find()返回的是元素。如果没有符合条件元素时findIndex()返回的是-1，而find()返回的是undefined。findIndex()当中的回调函数也是接收三个参数，与find()相同。
const bookArr=[
    {
        id:1,
        bookName:"三国演义"
    },
    {
        id:2,
        bookName:"水浒传"
    },
    {
        id:3,
        bookName:"红楼梦"
    },
    {
        id:4,
        bookName:"西游记"
    }
];
var i = bookArr.findIndex(value => value.id == 2);
console.log(i); // 1
i = bookArr.findIndex(item => item.id >5);
console.log(i); // -1


// Array.filter
// filter()与find()使用方法也相同。同样都接收三个参数。不同的地方在于返回值。filter()返回的是数组，数组内是所有满足条件的元素，而find()只返回第一个满足条件的元素。如果条件不满足，filter()返回的是一个空数组，而find()返回的是undefined
var userArr = [
    { id:1,userName:"laozhang"},
    { id:2,userName:"laowang" },
    { id:3,userName:"laoliu" },
]
console.log(userArr.filter(item => item.id > 1)); // [{id: 2, userName: "laowang"}, {id: 3, userName: "laoliu"}]
console.log(userArr.filter(item => item.id > 3)) // []

// 去掉空数组空字符串、undefined、null
var arr1 = ['1', '2', undefined, '3.jpg', undefined]
var newArr = arr.filter(item => item)
console.log(newArr)

var arr2 = ['1', '2', null, '3.jpg', null]
var newArr = arr.filter(item => item)
console.log(newArr)

// 空字符串里面不能包含空格
var arr3 = ['1', '2', '', '3.jpg', '']
var newArr = arr.filter(item => item)
console.log(newArr);

/* 实战 */
// 数组去重：
// 1.[需要去重的数组].filter((item, index ,arr)=>arr.indexOf(item) === index)，意思是，对于重复的元素 传入indexOf方法，输出的是数组中第一次出现的下标而非它本身的下标。[参见Array.indexOf(searchElement, fromIndex)]
// 2.利用ES6的map数据结构去重<2017.2>
var arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 7, 8, 8, 0, 8, 6, 3, 4, 56, 2];
var arr2 = arr.filter((x, index, self) => self.indexOf(x) === index)
console.log(arr2); //[1, 2, 3, 4, 5, 6, 7, 8, 0, 56]