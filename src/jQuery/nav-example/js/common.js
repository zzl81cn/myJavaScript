/**
 * Created by zzl81cn on 2017/4/1.
 */
var public = {
	nav: function () {
		var $pages = $('body').data('page'),
			$navElement = $('#mainNav').find('li');
		switch ($pages) {
			case 'index':
				$navElement.eq(0).addClass('active');
				break;
			case 'about':
				$navElement.eq(1).addClass('active');
				break;
			// default:
			// 	return;
		}
	}
};
public.nav();