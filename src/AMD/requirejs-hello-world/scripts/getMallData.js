/**
 * Created by zzl81cn_pre on 2017/1/19.
 */
define('getMallData', ['jquery'], function ($) {
	return {
		getMallOne: function (url, type, success) {
			$.ajax({
				url: url,
				type: type,
				// data: data,
				success: function (data) {
					console.info(data);
					success(data);
				}/*,
				 error: function (status) {
				 	error(status)
				 }*/
			})

		}
	}
});