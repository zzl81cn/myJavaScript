//pagination.js creat by zhaojing0401@gmail.com at 20161031

/**
 *  depends on jquery or zepto
 *  opt = {
 *            $ele      : $("#J_pagination"),//页码$dom对象
 *            totalPage : 0, //总页数
 *            shownPage : 0, //显示出来的页数
 *            showFirstAndLastPage :false,  //是否显示首页和尾页按钮
 *            callbackFn:function(){} //切换页面后的callbackFn
 *         }
 */
!(function(name,factory){
    var hasDefine  = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;
    if(hasDefine){
        define(factory);
    }else if(hasExports){
        module.exports = factory();
    }else{
        this[name] = factory();
    }
})('Pagination',function(){
    function Pagination(opt){
        return (this instanceof Pagination) ? this.init(opt) : new Pagination(opt);
    }
    Pagination.prototype={
        constructor:Pagination,
        init:function(opt){
            var $ele = opt.$ele
                ,totalPage = opt.totalPage || 0
                ,shownPage = opt.shownPage || 0
                ;
            if(!$ele || !$ele.get(0)) return ;

            this.$pageDom = $ele;

            if(totalPage<shownPage){
                shownPage = totalPage;
            }
            this.totalPage = totalPage;//总页数为默认为0
            this.shownPage = shownPage;//显示页码

            this.showFirstAndLastPage = opt.showFirstAndLastPage || true;
            this.callbackFn = opt.callbackFn || function(){return true};

            if(totalPage<=0){
                this.currentPageNum = 0; //当前页
                this.shownFirstPage =  0; //当前显示的最左边页码
                this.shownLastPage =  0;//当前显示的最右边页码
            }else{
                this.currentPageNum = opt.currentPageNum || 1; //当前页
                this.shownFirstPage =  1; //当前显示的最左边页码
                this.shownLastPage =  this.shownPage;//当前显示的最右边页码
            }
            this.ifRenderPage()
            this.render();
            this.bindEvent();
        },
        bindEvent:function(){
            var _this = this;
            _this.$pageDom.undelegate();
            _this.$pageDom.delegate(".j-pageNum","click",function(){_this.changePage(this,_this)});
            _this.$pageDom.delegate(".j-pagePre","click",function(){_this.prePage(this,_this)});
            _this.$pageDom.delegate(".j-pageNext","click",function(){_this.nextPage(this,_this)});
            _this.$pageDom.delegate(".j-pageFirst","click",function(){_this.firstPage(this,_this)});
            _this.$pageDom.delegate(".j-pageLast","click",function(){_this.lastPage(this,_this)});
        },
        // 判断是否需要重新拼接页码
        ifRenderPage:function(){
            var _this = this;
            var tempPage = parseInt(_this.shownPage/2);
            var firstPage = _this.currentPageNum - tempPage;
             var lastPage = firstPage + _this.shownPage -1;
            if(firstPage < 1) {
                firstPage = 1;
                lastPage = _this.shownPage;
            }
            if(lastPage > _this.totalPage){
                lastPage = _this.totalPage;
                firstPage = lastPage - _this.shownPage + 1;
            }
            if(firstPage == _this.shownFirstPage) return false;

            _this.shownFirstPage = firstPage;
            _this.shownLastPage = lastPage;
            return true;
        },
        // 设置当前页样式
        setCurrentPageStyle:function($dom){
            $dom.addClass("current").siblings("a").removeClass("current");
        },
        // 设置 （上一页，下一页，首页，尾页） 样式：type：start or end or auto
        setControlPageStyle:function(type){
            var $pagePre = this.$pageDom.find(".j-pagePre")
                ,$pageNext = this.$pageDom.find(".j-pageNext")
                ,$pageFirst = this.$pageDom.find(".j-pageFirst")
                ,$pageLast = this.$pageDom.find(".j-pageLast")
                ;
            if(type=="start"){
                $pageFirst.addClass("dispage");
                $pagePre.addClass("dispage");
                $pageNext.removeClass("dispage");
                $pageLast.removeClass("dispage");
            }else if(type=="end"){
                $pageFirst.removeClass("dispage");
                $pagePre.removeClass("dispage");
                $pageNext.addClass("dispage");
                $pageLast.addClass("dispage");
            }else{
                $pageFirst.removeClass("dispage");
                $pagePre.removeClass("dispage");
                $pageNext.removeClass("dispage");
                $pageLast.removeClass("dispage");
            }
        },
        // 页面切换后的动作
        pagePlay:function(type,$curPageDom){
            var _this = this;
            if(this.shownPage > 0 && _this.ifRenderPage()){
                _this.render();
            }else{
                _this.setControlPageStyle(type);
                if($curPageDom.get(0)) {
                    _this.setCurrentPageStyle($curPageDom);
                }
            }
            _this.callbackFn();
        },
        // 切换页面
        changePage:function(dom,scope){
            var _this = scope,$this = $(dom);
            var currentPage = parseInt($.trim($this.text()));
            if(_this.currentPageNum == currentPage) return;
            _this.currentPageNum = currentPage;
            var type = "auto";
            if(_this.currentPageNum==1) type = "start";
            if(_this.currentPageNum==_this.totalPage) type = "end";
            _this.pagePlay(type,$this);
        },
        // 切换上一页
        prePage:function(dom,scope){
            var _this = scope,$this = $(dom);
            if(_this.currentPageNum <= 1) return;
            _this.currentPageNum--;
            var type = "auto";
            if(_this.currentPageNum==1) type = "start";
            _this.pagePlay(type,_this.$pageDom.find(".j-pageNum.current").prev("a"));
        },
        // 切换下一页
        nextPage:function(dom,scope){
            var _this = scope,$this = $(dom);
            if(_this.currentPageNum >= _this.totalPage) return;
            _this.currentPageNum++;
            var type = "auto";
            if(_this.currentPageNum==_this.totalPage) type = "end";
            _this.pagePlay(type,_this.$pageDom.find(".j-pageNum.current").next("a"));
        },
        // 切换首页
        firstPage:function(dom,scope){
            var _this = scope,$this = $(dom);
            if(_this.currentPageNum == 1) return;
            _this.currentPageNum = 1;
            var type = "start";
            _this.pagePlay(type,_this.$pageDom.find(".j-pageNum").eq(0));
        },
        // 切换尾页
        lastPage:function(dom,scope){
            var _this = scope,$this = $(dom);
            if(_this.currentPageNum == _this.totalPage) return;
            _this.currentPageNum = _this.totalPage;
            var type = "end";
            _this.pagePlay(type,_this.$pageDom.find(".j-pageNum").eq(_this.shownPage-1));
        },
        // 加载分页
        render:function() {
            var _this = this;
            var totalPage = _this.totalPage
                , shownPage = _this.shownPage
                , currentPage = _this.currentPageNum
                , shownLastPage = _this.shownLastPage
                , shownFirstPage = _this.shownFirstPage
                , html = []
                ;
            if (totalPage > 0) {
                if (_this.showFirstAndLastPage) {
                    html.push('<a href="javascript:void(0);" class="j-pageFirst ', currentPage == shownFirstPage ? 'dispage' : '', '"><span class="pt">首页</span></a>');
                }
                html.push('<a href="javascript:void(0);" class="j-pagePre ', currentPage == shownFirstPage ? 'dispage' : '', '"><span class="pi"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTJmYmUwNC03MTczLThiNGUtYTdlYi0zOTI5YTc5MGYxOTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTFEMEU1ODE5RkEzMTFFOEIzOEFGNUI1NkY4MzQ0OUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTFEMEU1ODA5RkEzMTFFOEIzOEFGNUI1NkY4MzQ0OUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJjYTNjNGFjLTE3YWQtNmQ0Ny05NTQzLWVlMGEwZjcwMzVhOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTJmYmUwNC03MTczLThiNGUtYTdlYi0zOTI5YTc5MGYxOTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ZM81yAAAAZ0lEQVR42mL8//8/AwzMmjXLBUh1AHEFC5rgKiDuTEtL28MI0gEUDIWqnAUU7AQpZJaSkgKpnIgsCJbYvHnzvbNnz3IC2eVA+qyxsfE9kAQjzHKgceVAKg1kMVDnakY0V8Ek0wECDADFRC9by3VpMgAAAABJRU5ErkJggg==" /></span></a>');

                for (var i = shownFirstPage; i <= shownLastPage; i++) {
                    html.push('<a href="javascript:void(0);" class="j-pageNum ',
                        i == currentPage ? 'current' : '',
                        '"><span>', i, '</span></a>');
                }
                html.push(' <a href="javascript:void(0);" class="j-pageNext ', currentPage == shownLastPage ? 'dispage' : '', '"><span class="pi"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTJmYmUwNC03MTczLThiNGUtYTdlYi0zOTI5YTc5MGYxOTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTFEMEU1ODU5RkEzMTFFOEIzOEFGNUI1NkY4MzQ0OUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTFEMEU1ODQ5RkEzMTFFOEIzOEFGNUI1NkY4MzQ0OUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJjYTNjNGFjLTE3YWQtNmQ0Ny05NTQzLWVlMGEwZjcwMzVhOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTJmYmUwNC03MTczLThiNGUtYTdlYi0zOTI5YTc5MGYxOTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5q5T20AAAAZklEQVR42kyM0Q2AIAxEC27BPKzgCnUEHUE+/WxHwBXcDe+SYmxyJdxdXzKzKiIndKjqIzE5PjfU3b1+ARfChocyhCu9NMaYJYG5swdt+WcSw8CJz2Hy3IgLrCylFDavaLZJeAUYAJthIvhDyjpaAAAAAElFTkSuQmCC" /></span></a>');
                if (_this.showFirstAndLastPage) {
                    html.push('<a href="javascript:void(0);" class="j-pageLast ', currentPage == shownLastPage ? 'dispage' : '', '"><span class="pt">尾页</span></a>');
                }
            }
            _this.$pageDom.html(html.join(''));

        },
        getCurrentPage:function(){
            return this.currentPageNum;
        }
    };
    return Pagination;
});