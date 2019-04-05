/**
 * Created by zzl81cn_pre on 2017/1/20.
 * http://javascript.ruanyifeng.com/tool/requirejs.html
 */
require.config({
	// baseUrl: './src/AMD',
	baseUrl: './',
	paths: {
		'jquery': 'libs/jquery',
		'hello': 'scripts/hello',
		'getMallData': 'scripts/getMallData'
		// ,'executeRep': 'scripts/executeReplace'
	},
	shim: {
		'jquery': {
			exports: '$'
		}
	}
});
var reqUrl = {
	datasource: {
		// url: ' /goods/faverGoods?type=1&catId=101',
		url: 'https://easy-mock.com/mock/5a0d2eb685e6ba3feeead78c/example/promise-aticle-item',
		methodType: 'GET'
	}
};

require(['hello'], function (hello) {
	hello.replace('#hello', 'Hello RequireJS & AMD');
});
require(['getMallData'], function (getMallData) {
	getMallData.getMallOne(reqUrl.datasource.url, reqUrl.datasource.methodType, function (data) {
		$('#hello').after('<p>' + data.timestamp + '</p>');
	})
});
