[link](https://github.com/imsobear/blog/issues/48)
[nodejs.org api](http://nodejs.cn/api/path.html#path_path_resolve_paths)

# 一、挖坑 & 掉坑：
缘起一段这样的代码：
``` javascript
fs.readFile('./docs/use.md', function (err, buffer) {
  if (err) {
    return console.log('error: ', err);
  }

  console.log('OK');
});
```

本地运行时一切 OK，线上部署时却死活找不到 ./docs/use.md 这个文件，后来才发现是因为线上启动应用时不是从当前目录启动了，不过为什么启动脚本的位置也会影响这个路径呢，且往下看。

# 二、填坑：
Node 中的文件路径大概有 __dirname, __filename, process.cwd(), ./ 或者 ../，前三个都是绝对路径，为了便于比较，./ 和 ../ 我们通过 path.resolve('./')来转换为绝对路径。

先看一个简单的栗子：

假如我们有这样的文件结构：
``` bash
app/
    -lib/
        -common.js
    -model
        -task.js
        -test.js
```

在 task.js 里编写如下的代码：

``` javascript
var path = require('path');

console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
```
在 model 目录下运行 node task.js 得到的输出是：

``` bash
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model/task.js
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model
```
然后在 app 目录下运行 node model/task.js，得到的输出是：

``` bash
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model/task.js
/Users/guo/Sites/learn/app
/Users/guo/Sites/learn/app
```
那么，不好意思不是问题来了~T_T,我们可以得出一些肤浅的结论了：

__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
__filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
./: 跟 process.cwd() 一样、一样、一样的吗？
我明明记得在 require('../lib/common') 里一直都是各种相对路径写，也没见报什么错啊，我们还在再来个栗子吧，还是上面的结构，'model/task.js' 里的代码改成：

``` javascript
var fs = require('fs');
var common = require('../lib/common');

fs.readFile('../lib/common.js', function (err, data) {
    if (err) return console.log(err);
    console.log(data);
});
```
在 model 目录下运行 node task.js，一切 Ok，没有报错。然后在 app 目录下运行 node model/task.js，然后很果断滴报错了:



那么这下问题真的都是来了，按照上面的理论，在 app 下运行时，../lib/common.js 会被转成 /Users/guo/Sites/learn/lib/common.js，这个路径显然是不存在的，但是从运行结果可以看出 require('../lib/common') 是 OK 的，只是 readFile 时报错了。

那么关于 ./ 正确的结论是：

在 require() 中使用是跟 __dirname 的效果相同，不会因为启动脚本的目录不一样而改变，在其他情况下跟 process.cwd() 效果相同，是相对于启动脚本所在目录的路径。

# 三、总结：
只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径，如下：

// 当前目录下
path.dirname(__filename) + '/test.js';
// 相邻目录下
path.resolve(__dirname, '../lib/common.js');
四、参考链接：
What is the difference between __dirname and ./ in node.js
nodejs API
以上😄。


----
一、path模块的引入。

直接引用。node中自带的模块

const path = require('path');
二、path.join(path1，path2，path3.......)

  作用：将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报错。

const path = require('path');
let myPath = path.join(__dirname,'/img/so');
let myPath2 = path.join(__dirname,'./img/so');
let myPath3=path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');


console.log(__dirname);           
console.log(myPath);    
console.log(myPath2);   
console.log(myPath3);  


三、path.resolve([from...],to)

作用：把一个路径或路径片段的序列解析为一个绝对路径。相当于执行cd操作。

/被解析为根目录。

let myPath = path.resolve(__dirname,'/img/so');
let myPath2 = path.resolve(__dirname,'./img/so');
let myPath3=path.resolve('/foo/bar', './baz');
let myPath4=path.resolve('/foo/bar', '/tmp/file/');

console.log(__dirname);           
console.log(myPath);    
console.log(myPath2);   
console.log(myPath3);  
console.log(myPath4); 