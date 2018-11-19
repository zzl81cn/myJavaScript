;(function($) {
  var MyTable = function(elem, options) {
    this.elem = elem; /* 1 */
    this.$elem = $(elem); /* 2 */
    this.options = options; /* 3 */
  };

  MyTable.prototype = {
    defaults: {
      bordered: false
    },
    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.renderTable();
    },
    renderTable: function() {
      // var $target = $(target);
      this.$elem.addClass('table');
      if(this.config.bordered) {
        this.$elem.addClass('table-border')
      } else {}
      var $tableBody = $(
        '<thead>'
        + '<tr><th>xx</th><th>xx</th></tr></thead>'
        + '<tbody><tr><td>1</td><td>5</td></tr>'
        + '</tbody>').appendTo(this.elem);
      // console.log('tableBody is: ', $tableBody);
      return this.$elem;
    },
  }

  function renderTable(target, options) {
    var $target = $(target);
    $target.addClass('table');
    if(options.bordered) {
      $target.addClass('table-border')
    } else {}
    /* $target.html(function () {
      var tableStr = '';
      tableStr += '<thead><tr><th>xx</th><th>xx</th></tr></thead>';
      tableStr += '<tbody><tr><td>1</td><td>2</td></tr></tbody>'
      return tableStr;
    }) */
    var $tableBody = $('<thead><tr><th>xx</th><th>xx</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody>').appendTo(target);
    // console.log('tableBody is: ', $tableBody);
    return target;
  };

  
  /* $.fn.myTable = function(options) {
    var opts = $.extend({}, $.fn.myTable.defaults, options);
    return this.each(function() {
      var target = $(this);
      renderTable(target, options);
    })
  }; */
  MyTable.defaults = MyTable.prototype.defaults;

  $.fn.myTable = function(options) {
    // var opts = $.extend({}, $.fn.myTable.defaults, options);
    return this.each(function() {
      new MyTable(this, options).init();
      // var target = $(this);
      // renderTable(target, options);
    })
  };

  $.fn.myTable.defaults = {
    bordered: true
  }
})(jQuery);