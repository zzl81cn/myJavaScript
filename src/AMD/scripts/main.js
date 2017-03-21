/**
 * Created by zzl81cn_pre on 2017/1/20.
 * http://javascript.ruanyifeng.com/tool/requirejs.html
 */
require.config({
	// baseUrl: './src/AMD',
	baseUrl: './',
	paths: {
		'jquery': '../../jQuery/jquery',
		'hello': 'hello',
		'getMallData': 'getMallData'
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