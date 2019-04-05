require.config({
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min'
        // jquery: '../libs/jquery'
    }
});

require(['jquery'], function($) {
    alert($().jquery);
});