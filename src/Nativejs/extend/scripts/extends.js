/**
 * Created by zzl81cn_pre on 2017/1/24.
 */
function Parent(name) {
	this.name = name;
	this.sayName = function (name) {
		console.info('Parent name is: ', name);
	}
}
/*function ext() {
	this.name = 'ext';
	var parent = new Parent();
	this.sayName = function () {
		parent.sayName(this.name);
	}
};*/
// ext();
new Parent('123');