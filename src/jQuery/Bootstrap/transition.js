/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap') // 创建一个自定义标签做测试

    var transEndEventNames = { // 用于检测 css3 结束时的回调事件
      WebkitTransition : 'webkitTransitionEnd', // webkit浏览器事件
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend' // 其他浏览器事件
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) { // 如果支持动画事件，则返回动画字面量，如果没有，则返回undefind
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) { // 触发动画事件
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration) // 根据传入的延迟、毫秒数，再触发
    return this
  }

  $(function () {
    $.support.transition = transitionEnd() // 全局赋值
    // 判断 参见：“lib\Bootstrap-3.3.7-scss\assets\javascripts\bootstrap\modal.js”

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
