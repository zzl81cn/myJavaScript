/**
 * Created by admin on 2016/9/28.
 */

//    http://www.w3school.com.cn/jsref/jsref_splice.asp
var abc = [];
abc[0] = "apple";
abc[1] = "sumsung";
console.log(abc);
// ["apple", "sumsung"];
abc.splice(1,0,"meizu");
console.log(abc);
// ["apple", "meizu", "sumsung"];