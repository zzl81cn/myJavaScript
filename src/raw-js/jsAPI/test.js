/**
 * Created by zhouzilong on 2016/8/17.
 */

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// 添加测试
suite.add('RegExp#test', function() {
    /o/.test('Hello World!');
})
    .add('String#indexOf', function() {
        'Hello World!'.indexOf('o') > -1;
    })
// add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
// run async
    .run({ 'async': true });