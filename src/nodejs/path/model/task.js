const path = require('path');

console.log('__dirname: ', __dirname);
console.log('__filename: ', __filename);
console.log('process.cwd:', process.cwd());
console.log('path.resolve: ', path.resolve('./'));
console.log('path.join(__dirname, \'task.js\'): ', path.join(__dirname, 'task.js'));
/* 
PS D:\workspaces\javascript\raw-js\myJavaScript\src\nodejs\path\model> node .\task.js
__dirname:  D:\workspaces\javascript\raw-js\myJavaScript\src\nodejs\path\model
__filename:  D:\workspaces\javascript\raw-js\myJavaScript\src\nodejs\path\model\task.js
process.cwd: D:\workspaces\javascript\raw-js\myJavaScript\src\nodejs\path\model
path.resolve:  D:\workspaces\javascript\raw-js\myJavaScript\src\nodejs\path\model
path.join():  D:\workspaces\javascript\raw-js\myJavaScript\src\nodejs\path\model\task.js
zero里讲的跟实际的对比join，resolve
*/

const fs = require('fs');

const common = require('../lib/common');
// In path for model，只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径。
// 其实原因很简单，require的路径必须是相对于当前执行文件的，否则你引用的node_module，它的require路径肯定不能够正确识别了呀。
// fs.readFile('../lib/common.js', function(err, data) {
// fs.readFile(path.resolve(__dirname, '../lib/common.js'), function(err, data) {

// 对于文件地址的凭借更推荐使用path.join，可以屏蔽各个操作系统之前的差异
fs.readFile(path.join(__dirname, '../lib/common.js'), function(err, data) {
  if(err) return console.log(err);
  console.log(data)
})