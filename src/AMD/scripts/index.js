/**
 * Created by zzl81cn_pre on 2017/1/20.
 * http://javascript.ruanyifeng.com/tool/requirejs.html
 */
require(['hello'], function (hello) {
	hello.replace('#hello', 'requreiJS, this is helloworld!');
});
