/**
 * Created by zhouzilong on 2016/8/17.
 */
define(function(require, exports, module){
	// 引入util模块
    /*var util = require('util');
    util.log("I'm main module, i allready is ok'");
    util.mathMin(12, 20);
    util.mathMin(12, 20);*/

    var $ = require('jquery');
    // var jquery = require('jquery');
    $(function () {
      var a = $('.js-example-basic-single').val();
      console.log(a)
    })
    // require('select2')($);

})