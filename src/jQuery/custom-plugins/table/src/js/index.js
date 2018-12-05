/**
 * @author zzl81cn
 * @since 2018-10-18
 * @desc 表格插件示例，还需要增加初始化插件时，根据不同数据源结构可配置不同表头的处理逻辑
  */
;(function($) {
  var MyTable = function(elem, options) {
    this.elem = elem; /* 1 */
    this.$elem = $(elem); /* 2 */
    this.options = options; /* 3 */
    // this.url = options.url || ''; /* URL */
  };

  MyTable.prototype = {
    defaults: {
      bordered: false
    },
    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      // this.renderTable();
      this.fetchData();
    },
    renderTable: function(data) {
      // var $target = $(target);
      this.$elem.addClass('table');
      if (this.config.bordered) {
        this.$elem.css('border', '1px solid #ccc');
      } if (this.config.bordered) {
        this.$elem.addClass('table-border')
      } else {}
      var $tableBody = $(
        '<thead>'
        + '<tr><th>xx</th><th>xx</th></tr></thead>'
        + '<tbody><tr><td>1</td><td>7</td></tr>'
        + '</tbody>').appendTo(this.elem);
      // console.log('tableBody is: ', $tableBody);
      return this.$elem;
    },
    fetchData: function() {
      var that = this;
      console.log('fetch data.')
      $.ajax({
        type: 'GET',
        url: this.config.url,
        dataType: 'JSON',
        success: function(data) {
          console.log('data is: ', data.data.length);
          if(data.data.length) {
            that.renderTable(data);
          }
        },
        error: function() {
          console.log('Table ajax is error.')
        }
      })
    },
  }
  
  MyTable.defaults = MyTable.prototype.defaults;

  $.fn.myTable = function(options) {
    return this.each(function() {
      new MyTable(this, options).init();
    })
  };

})(jQuery);