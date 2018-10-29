require('../libs/bootstrap-3.3.6/build/css/bootstrap.css');
require('../libs/ace-1.4.0/build/css/ace.min.css');
require('../libs/ace-1.4.0/build/css/ace-skins.min.css');
require('../assets/css/base.css');
require('../assets/css/common.css');
require('../assets/css/index.css');

require('../libs/bootstrap-3.3.6/build/js/bootstrap.js');
require('../libs/ace-1.4.0/build/js/ace.min.js');
require('../libs/ace-1.4.0/build/js/ace-elements.min.js');
require('../libs/ace-1.4.0/build/js/ace-extra.min.js');

// $('h1').append('<div>Hello World haha1</div>');

// console.log('index page.')

$(function() {
  $("#J_ajaxContent").ace_ajax({
      content_url: function(hash) {
        //   return "/views/" + hash + ".html";
          return "../views/" + hash + ".html";
        //   return hash + ".html";
      },
      default_url: "icon",
      loading_icon: "fa fa-refresh blue"
  });
  console.log('content append is ok')
})
