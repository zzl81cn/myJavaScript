// 普通table
// 渲染普通表格
;(function() {
  function ThisModule() {
    return (this instanceof ThisModule) ? this.init() : new ThisModule();
  };
  ThisModule.prototype = {
    init: function() {
      //
    },
    defineData: function() {
      let tableListDataSource = [];
      let date = new Date();
      for (let i = 0; i < 10; i += 1) {
        tableListDataSource.push({
          key: i,
          no: 'TradeCode' + i,
          /* accountNo: `0200012 ${i}`, */
          accountNo: '0200012'+ i,
          owner: 'xx',
          titles: 'xx' + i,
          description: '这是一段描述',
          callNo: Math.floor(Math.random() * 1000),
          email: Math.random().toString(36).substr(2) + '@coamc.com',
          status: Math.floor(Math.random() * 10) % 4,
          validity: date.getFullYear() + 3 +
            '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) +
            '-' + (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()),
          gender: i % 6 === 0,
          progress: Math.ceil(Math.random() * 100),
        });
      }
    },
    asData: function() {
      $.ajax({
        url: "../static/json/standardTable.json",
        type: "GET",
        success: function(data) {
          drawTable(data);
        },
        error: function(error) {
          console.log('is error')
        }
      });
    },
    renderTable: function(data) {
      // console.log('table ok')
      var htmlStr = '',
          data = data;
      $('#tableNormal tbody').html(function () {
        $.each(data, function (i, n) {
          htmlStr += '<tr>'
            + '<td>' + n.key + '</td>'
            + '<td>' + n.accountNo + '</td>'
            + '<td>' + n.owner + '</td>'
            + '<td>' + n.titles + '</td>'
            + '<td>' + n.status + '</td>'
            + '<td>' + n.validity + '</td>'
            + '<td>' + n.callNo + '</td>'
            + '<td>' + n.email + '</td>'
            + '<td>' + n.callNo + '</td>'
            + '<td>' + n.gender + '</td>'
            + '</tr>'
        });
        return htmlStr;
      });
    }
  },

  ThisModule();
})()
