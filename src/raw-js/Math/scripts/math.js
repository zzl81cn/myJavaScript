/**
 * Created by zzl81cn_pre on 2017/1/21.
 */
define('math',function () {
	return {
		calcTwoMin: function () {
			var a = document.getElementById('A'),
				b = document.getElementById('B');
			var x = a.value,
				y = b.value;

			// var tmpMinValueNode = '';
			// tmpMinValueNode += Math.min(x, y);
			// 节点需要使用'document.createTextNode()'进行包装，否则在'document.appendChild()'时会导致参数不合法
			var tmpMinValueNode = document.createTextNode(Math.min(x, y));
			console.info(tmpMinValueNode);
			var tmpElement = document.createElement('p');
			tmpElement.appendChild(tmpMinValueNode);
			document.getElementById('result').appendChild(tmpElement);
		},
		// 用第一个参数对比第二个参数的长度（位数）
		isLength: function(n, length) {
			return n.length == length;
		},
		// 浮点数的精确乘法计算（含小数点后精度参数）
		accMul: function accMul(arg1, arg2, fixed) {
			var m = 0,
				s1 = arg1.toString(),
				s2 = arg2.toString();
			// 因为是乘法计算，需要将小数点后面的位数累计追加给m，方便利用Math.pow用x的y次幂的方式得出除数
			try {
				m += s1.split(".")[1].length
			} catch(e) {}
			try {
				m += s2.split(".")[1].length
			} catch(e) {}
			var result = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
			return result.toFixed(fixed);
		},
		
	}
});