/**
 * Created by zhouzilong on 2016/8/17.
 */
var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

var COUNT = process.argv[2] - 0;
//console.log(COUNT);

var data = [];
for (var i = 0; i < COUNT; i++) {
    data.push('string');
}

suite.add('Plain concatenation', function() {
    var res = '';
    for (var i = 0; i < COUNT; i++) {
        res += data[i];
    }
})
    .add('String array join()', function() {
        data.join('')
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });