/**
 * Created by zzl81cn on 2017/3/21.
 */
$(function () {
	var demo = $("#marquee")[0];
	var demo1 = $("#marquee-list1")[0];
	var demo2 = $("#marquee-list2")[0];
	var speed = 10;    //滚动速度值，值越大速度越慢
	var nnn = 300 / demo1.offsetWidth;
	// 21
	console.log(demo1.offsetWidth);
	/*for (i = 0; i < nnn; i++) {
		// demo1.innerHTML += "<br />" + demo1.innerHTML
		demo1.innerHTML += demo1.innerHTML
	}*/
	//克隆demo2为demo1
	demo2.innerHTML = demo1.innerHTML;
	console.log('demo.scrollLeft is: ', demo.scrollLeft);
	console.log('demo2.offsetLeft is: ', demo2.offsetLeft);
	function Marquee() {
		//当滚动至demo1与demo2交界时
		if (demo2.offsetLeft - demo.scrollLeft <= 0) {
			//demo跳到最顶端
			demo.scrollLeft -= demo1.offsetWidth;
			console.log('ha!');
		} else {
			//console.log('oh!');
			// 每次加1
			demo.scrollLeft++;
//					console.log('demo.scrollTop', demo.scrollTop);
		}
	}

	var MyMar = setInterval(Marquee, speed);        //设置定时器
	demo.onmouseover = function () {
		clearInterval(MyMar)
	}    //鼠标经过时清除定时器达到滚动停止的目的
	demo.onmouseout = function () {
		MyMar = setInterval(Marquee, speed)
	}    //鼠标移开时重设定时器
});
