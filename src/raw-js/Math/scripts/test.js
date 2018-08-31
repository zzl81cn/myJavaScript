/**
 * Created by zzl81cn_pre on 2017/1/24.
 */
define('test', function () {
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
		}
	}
});