/**
 * Created by zhouzilong on 2016/8/17.
 */
//CMD
define(function(require, exports, module){
    var _prefix = "I want speak";
    module.exports = {
    	/**
		 * Console.log info
		 * */
        log: function(msg){
            console.log(_prefix + msg);
        },
		/**
		 * Caculate min value and DOM write
		 * */
		mathMin: function (x, y) {
			document.write(Math.min(x, y),'<br/>');
		}
    }
})