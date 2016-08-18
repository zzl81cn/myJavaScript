/**
 * Created by zhouzilong on 2016/8/17.
 */
//CMD
define(function(require, exports, module){
    var _prefix = "I want speak";
    module.exports = {
        log: function(msg){
            console.log(_prefix + msg)}
    }
})