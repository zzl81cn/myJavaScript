/**
 * Created by zzl81cn_pre on 2017/1/20.
 */
require.config({
	// baseUrl: './src/AMD',
	baseUrl: './',
	paths: {
		'jquery': 'libs/jquery-2.2.4/dist/jquery',
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
		url: '/mockjsdata/11697/categorylist',
		methodType: 'get'
	}
};

require(['hello'], function (hello) {
	hello.replace('#hello', 'Hello RequireJS & AMD');
});
require(['getMallData'], function (getMallData) {
	getMallData.getMallOne(reqUrl.datasource.url, reqUrl.datasource.methodType)
});