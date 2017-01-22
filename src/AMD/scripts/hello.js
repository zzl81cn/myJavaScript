/**
 * Created by zzl81cn_pre on 2017/1/19.
 */
define('hello', ['jquery'], function ($) {
	return {
		replace: function (selector1, text) {
			var $hello = $(selector1);
			// 为了解决js替换文本及更改字体族过程中的闪动，先将标题文本隐藏，待操作完成后再显示文本
			$hello
				.html(function () {
					return text;
				})
				.removeClass('invisible')
				.css({'font-family': 'MT Extra', 'font-size': '12px'});
		}
	}
});