/**
 * Created by zhouzilong on 2016/8/18.
 */

/**
 * 这个例子是一个比较简单的闭包，解释如下：
 * (1)定义了一个普通函数A
 * (2)在A中定义了普通函数B
 * (3)在A中返回B（确切的讲，在A中返回B的引用）
 * (4)执行A(),把A的返回结果赋值给变量 c
 * (5)执行 c()
 * 当一个内部函数被其外部函数之外的变量引用时，就形成了一个闭包。
 * */

function simpleClosure(){
    function innerFunc(){
        console.log("Hello zzl81cn");
		// or
		document.write('Hello zzl81cn!');
    }
    return innerFunc;
}
var c = simpleClosure();
c();//Hello zzl81cn


function recycleClosure(){
    var count = 0;
    function innerRecycle(){
        count++;
        console.log(count);
        document.write(count+'<br/>');
    }
    return innerRecycle;
}

var recycle = recycleClosure();
recycle();//1
recycle();//2
recycle();//3

(function(document){
    var viewport;
    var obj = {
        init:function(id){
            viewport = document.querySelector("#"+id);
        },
        addChild:function(child){
            viewport.appendChild(child);
        },
        removeChild:function(child){
            viewport.removeChild(child);
        }
    }
    window.jView = obj;
})(document);

var f = function(document){
    var viewport;
    var obj = {
        init:function(id){
            viewport = document.querySelector("#"+id);
        },
        addChild:function(child){
            viewport.appendChild(child);
        },
        removeChild:function(child){
            viewport.removeChild(child);
        }
    }
    window.jView = obj;
};
f(document);