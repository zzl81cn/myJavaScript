/**
 * Created by zzl81cn_pre on 2017/1/19.
 */
define('hello', ['jquery'], function ($) {
	$('#hello').html(function () {
		return 'Hello RequireJS';
	});
	$('#hello').css({'font-family': 'MT Extra', 'font-size': '12px'});
});