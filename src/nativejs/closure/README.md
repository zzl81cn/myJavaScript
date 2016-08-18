# 案例

/*这个例子是一个比较简单的闭包，解释如下：

  (1)定义了一个普通函数A
  (2)在A中定义了普通函数B
  (3)在A中返回B（确切的讲，在A中返回B的引用）
  (4)执行A(),把A的返回结果赋值给变量 c
  (5)执行 c()
  当一个内部函数被其外部函数之外的变量引用时，就形成了一个闭包。*/

  function simpleClosure(){
      function innerFunc(){
          console.log("Hello zzl81cn");
      }
      return innerFunc;
  }
  var c = simpleClosure();
  c();//Hello zzl81cn

# 作用

在上述例子中，B定义在A中，因此B依赖于A,而外部变量 c 又引用了B, 所以A间接的被 c 引用，也就是说，A不会被回收，会一直保存在内存中。为了证明我们的推理，上面的例子稍作改进。也可以看我之前闭包文章中的例子：http://www.haorooms.com/post/js_bb 第一个案例。