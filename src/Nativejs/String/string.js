/**
 * Created by zzl81cn on 2017/3/14.
 */
// substr()
/**substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
 * Syntax:
 * stringObject.substr(start,length)
 * Params:
 * start	必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
 * length	可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
 * */
var str1 = "Hello World!";
document.write(str1.substr(3));