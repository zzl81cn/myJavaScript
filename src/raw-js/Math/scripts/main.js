/**
 * Created by zzl81cn_pre on 2017/1/24.
 */
require.config({
	paths: {
		math: 'math',
		test: 'test'
	}
});
require(['math'], function (m) {
	document.getElementById('calcBindBtn').onmousedown = function () {
		m.calcTwoMin();
	};
	// document.getElementById('calcListenBtn').addEventListener('click', m.calcTwoMin, false);
});
require(['test'], function (t) {
	document.getElementById('calcListenBtn').addEventListener('click', t.calcTwoMin, false);
});
