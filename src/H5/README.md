##
### 滚动加载
``` javascript
    // 滚动加载
    // 初始页数为1，ajax完成后将"是否结束滚动翻页"设置为"true"，用"滚动条"到顶部的距离 大于 （整个文档高度 减 视口高度 减 50）
    $(window).scroll(function (){
        if(!_t.isEndScroll && ($(window).scrollTop() > $(document).height() - $(window).height() - 50)){
            _t.pageNo++;
            _t.ajaxFun();
            $(window).scrollTop($(document).height()-$(window).height()-50);
        }
    });

```