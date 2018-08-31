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
fs.readFile('../lib/common.js', function(err, data) {
  if(err) return console.log(err);
  console.log(data)
})