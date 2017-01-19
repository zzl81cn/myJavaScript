/**
 * Created by zzl81cn_pre on 2017/1/19.
 */
define('getMallData', ['require', 'exports', 'jquery'], function (exports, $) {
	exports.getData = function (url, type, success, error) {
		$.ajax({
			url: url,
			// data: data,
			type: type,
			success: function (data) {
				// success(data);
				console.info(data);
			},
			error: function (status) {
				error(status)
			}
		})
	}
});