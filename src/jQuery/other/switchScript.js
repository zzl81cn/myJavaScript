/**
 * Created by zhouzilong on 2016/8/17.
 */
var fnJsLoad = function(url, callback) {
    callback = callback || function() {};

    var eleScript = document.createElement('script');

    eleScript.onload = function() {
        if (!eleScript.isInited) {
            eleScript.isInited = true;
            callback();
        }
    };
    // 一般而言，低版本IE走这个
    eleScript.onreadystatechange = function() {
        if (!eleScript.isInited && /^loaded|complete$/.test(eleScript.readyState)) {
            eleScript.isInited = true;
            callback();
        }
    };

    eleScript.src = url;

    document.getElementsByTagName('head')[0].appendChild(eleScript);
};
// IE10+加载zepto.js
// IE7-IE9加载jQuery
var URLLIB = '../zepto.js';

if (!history.pushState) {
    URLLIB = '../jquery.js';
}

fnJsLoad(URLLIB, function() {
    // 业务脚本初始化
    init();
});