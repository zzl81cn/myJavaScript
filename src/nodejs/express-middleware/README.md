# express
## router.get() & router.post(), this result look inside res.send&res.json || res.render() method
``` bash
res.render() -> page&data
res.send()&res.json() -> data&?

```

---

# eastlending_frontend(branch of investor)

## flow-map
``` bash
      DoubbleClient <-- HessianProxy <-- proxy
            |
            V
         service
            |
            V
           Biz
            |
            V
          router   --->   views
                            ^
            |               | (webpack)
                         xx.js(public/js/app/src)
                            ^
                            |
                     xxView.js(public/js/app/views) 操作DOM等
                            ^
                            |
                    xxModel.js(public/js/app/models)ajax获取数据等
```

# sales website host apiURLConfig
``` bash
appConfig.json
        |
        V
    xx-view>common>common.js
    getApiURL: function() {return global.appConfig.apiURL}
            |
            V
            runnable>startup.js
            init app configs > global.appConfig.apiURL = appConfig.apiURL || "http://testyx.com";
                |
                V
                const serviceCommon = require('../../common/common');
                const host = serviceCommon.getApiURL();

```

## invest
### investBiz.js

### eastlending-node-p2ph5\routes\investRouter.js
> 对于node通过request调用接口，并再以接口的形式供前台使用
``` javascript
router.post('/listP2PLoans', function (req, res, next) {
    var page = req.body.page;
    investBiz.listP2PLoans(page).then(function (data) {
        if (!data.loanList.results){
            res.json({ success: false, data: data })
        }
        else {
            res.json({ success: true, data: data })
        }
    }).catch(function (msg) {
        res.json({ success: false, data: msg });
        logger.error(msg);
    })
});

router.get('/agreement', function (req, res, next) {
    console.log(123);
    res.render('invest/agreement.swig',{req:req})
});
// 获取服务器时间
router.get('/serviceTime', function (req, res, next){
    res.json({time:new Date().getTime()});
});
module.exports = router;

```

## login
### eastlending-node-p2ph5\biz\login\loginBiz.js
> 通过Promis请求引入的“service/login/loginService”Dubbo对象，调用接口，返回所需数据；
``` javascript
var  LoginService = require("../../service/login/loginService");

var LoginBiz = function(){
    /**
     * 用户登录
     * @param loginName
     * @param password
     * @param ip 记录用户登录IP地址
     * @param channelName 渠道码
     * @return
     */
    this.loginWithSentMessage = function(loginName,password,ip,channelName){
        <strong>return new Promise(function(resolve, reject){</strong>
            LoginService.loginWithSentMessage(loginName,password,ip,channelName).then(function(data){
                logger.info(data);
                resolve(data);
            }).catch(function(msg){
                logger.error("this is loginWithSentMessage :catch"+msg);
                logger.error(msg);
                reject(msg);
            })
        })
    };
    ...
};
module.exports = new LoginBiz();
```

### eastlending-node-p2ph5\routes\loginRouter.js
> 
``` javascript
let LoginBiz = require('../biz/login/loginBiz');
//登录接口
router.post('/loginWithSentMessage',function(req, res, next){
    var params = req.body;
});
module.exports = router;
```

### loginService
> Dubble 的配置
``` javascript
var DubboClient = require('../../dubbo/DubboClient');

var LoginService = function(){

    let _packageName = "com.coamctech.eastlending.service.user.UserLoginService";


    this.loginWithSentMessage = function(loginName,password,ip,channelName){
        let dubboVersion = common.getDubboVersion();
        return DubboClient.invokeService(dubboVersion,_packageName,'loginWithSentMessage',[loginName,password,ip,channelName]);
    };
    /**
     * 根据token更新缓存
     * @param token
     */
    this.flushSession = function(token){
        let dubboVersion = common.getDubboVersion();
        return DubboClient.invokeService(dubboVersion,_packageName,'flushSession',[token]);
    };
};

module.exports = new LoginService();
```

### DubbleClient
> 引入hessian-proxy自定义库
``` javascript
let Proxy = require('./hessian/HessianProxy').Proxy;
var DubbleClient = function() {
    let zkClient = global.zkclient;
}
module.exports = new DubboClient();
```


### HessianProxy
> 引入各个配置
``` javascript
module.exports.Proxy = require('./proxy');
...
```

### proxy
> 具体作用不清楚，会有多个类似文件
``` javascript
var url = require('url');
function Proxy(uri, username, password, proxy) {
	...
}
util.inherits(Proxy, events.EventEmitter);
Proxy.prototype.invoke = function(method, args, callback) {
	...
}
module.exports = proxy;
```

---

# coamc (branch of dev)
## webpack
> 处理common.js的引入： common.js public\js\common\common.js
``` javascript
/* webpack */
let entry = getEntry( path.resolve(__dirname,'public/js/app/src'));
let outputPath = path.resolve(__dirname, 'public/dist');

;function getEntry(){
    let args = Array.prototype.slice.call(arguments)
        ,dir = args[0]
        ,_files = args[1]
        ,matchs=[]
        ,dirList = fs.readdirSync(dir)
        ;
    if(typeof(_files)=='undefined'){
      _files={};
      _files[md5("common")] = path.resolve(path.resolve(__dirname)+'/public/js/common/common');
    }
    ...
    return _files;
}
```

### tpl
使用的mustcache模板引擎语法，来降低小碎片HTML的编写复杂度
``` javascript
{
    test: /\.(tpl)$/,
    loader: 'mustache-loader?noShortcut'
}
```

---

# eastlending-node (branch of myaccount)
## 3rdAct1View (eastlending-node-activity\public\app\main\views\3rdAct1View.js)
``` javascript
DOM operator
...
``

## 3rdAct1Model.js (eastlending-node-activity\public\app\main\models\3rdAct1Model.js)
``` javascript
ajax
...
```
## 3rdRouter.js (eastlending-node-activity\routes\3rdRouter.js)
``` javascript
express router
...
```

## req
``` javascript
视图js请求参数要与node发送参数对应。
```

# style
## fade
``` bash
.ani {
    animation-duration: 0.5s;
    animation-fill-mode: both;
}
.top-bar-fixed {
    position: fixed;
    top: 0;
    z-index: 100;
    background: #F8F8F8;
    box-shadow: 0 2px 4px #ACACAC;
    left: 0px;
  }
```

