/**
 * Created by zzl81cn on 2017/2/4.
 */
// document.body.clientHeight, document.body.scrollHeight) - document.body.scrollTop
var outputArea = document.getElementById('text');
document.getElementById('clientHeight').onmousedown = function () {
	// document.write(document.body.clientHeight);
	var	text = document.createTextNode(document.body.clientHeight);
	console.info(text);
	outputArea.appendChild(text);
};
document.getElementById('scrollHeight').addEventListener('click', function () {
	var text = document.createTextNode(document.body.scrollHeight);
	outputArea.innerHTML = text.textContent;
});
document.getElementById('scrollTop').addEventListener('click', function () {
	var text = document.createTextNode(document.body.scrollTop);
	outputArea.innerText = text.textContent;
})