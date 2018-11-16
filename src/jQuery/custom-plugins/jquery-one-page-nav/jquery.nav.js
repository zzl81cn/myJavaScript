/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

	// our plugin constructor
	/**
	 * 定义OnePageNav对象：1.设置参数, 2.定义变量, 3.定义私有方法；
	 * 这里定义一个对象 OnePageNav ，在调用插件的时候用new可以创建一个原对象的实例对象。我们注意到参数加了$符号的表示的是jQuery对象，没有加$符号表示的是DOM对象，这是一个很好的习惯，在使用它们的时候就不需要做DOM对象和jQuery对象之间的转换。
	 * 需要分解我们的实现代码为多个函数，该怎么办？有很多原因：设计上的需要；这样做更容易或更易读的实现；而且这样更符合面向对象。
	 * @param {*} elem 
	 * @param {*} options 
	 */
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// 定义OnePageNav对象的方法：1.调用私有方法， 2.处理DOM； the plugin prototype
	OnePageNav.prototype = {
		/**
		 * 设置默认参数
		 * 所有的插件几乎都会有自己的默认参数，所以在调用的时候即使不传递option也可以，在OnePageNav 的原型中的默认参数如下。
	   */
		defaults: {
			navItems: 'a', //默认<a>标签
			currentClass: 'current', //默认当前标签的样式名
			changeHash: false, 
			easing: 'swing',
			filter: '', //标签过滤
			scrollSpeed: 750, //速度
			scrollThreshold: 0.5, //占面积比
			begin: false, //开始回调函数
			end: false, //结束回调函数
			scrollChange: false //市场改变的回调函数
		},

		/**
		 * 初始化
		 * 注意到 $.fn.onePageNav方法中的这句话new OnePageNav(this, options).init(); 调用了OnePageNav的init方法进行初始化，现在来看看初始化都做了什么工作。可以概括为这几部分：
		 * 1、extend 函数用于将一个或多个对象的内容合并到目标对象，把默认设置和自定义设置合并起来。
		 * 2、将标签进行过滤 ，比如像下面这样我们要过滤掉最后一个标签，可以在option中加入  filter: ':not(.exception)', 
		 * 3、给过滤后的标签绑定click方法，点击click可以 scroll 到对应的内容。
		 * 4、获取标签对应内容的位置，并都放在 this.sections 中。
		 * 5、添加一个间隔性触发定时器，目的是为了在滑动鼠标滚轮的时候根据当前显示内容，更改导航标签的class=current。
		 * 6、每次窗体大小改变时重新获取标签对应内容的位置。
				<ul id="nav">
          <li><a href="#nr">内容一</a></li>
          <li><a href="#nt">内容二</a></li>
          <li><a href="#ny">内容三</a></li>
          <li><a href="#nu">内容四</a></li>
          <li><a class="exception" href="#top">返回顶部</a></li>
        </ul>
		 */
		init: function() {
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			/* $elem就是将初始化插件传进来的“nav标记”包装为jquery对象，在此基础上向下找“defaults.navItems”，这个就是自身默参的“a标签”，那么结果就是a标签的jquery对象。 */
			this.$nav = this.$elem.find(this.config.navItems);

			//Filter any links out of the nav
			if(this.config.filter !== '') {
				this.$nav = this.$nav.filter(this.config.filter);
			}

			//Handle clicks on the nav
			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

			//Get the section positions
			this.getPositions();

			//Handle scroll changes
			this.bindInterval();

			//Update the positions on resize too
			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

			return this;
		},

		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function() {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});

			self.t = setInterval(function() {
				docHeight = self.$doc.height();

				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},

		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;

			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos);
				}
			});
		},

		/* 
							---------------------------
							|    init(){}			    		
							|this(OnePageNav instance)
							|  adjustNav:func(){}
							|  bindIntervel:func(){}
							|  getHash:func(){}
							|  getPositions:func(){}
							|  ...
							|    ------------------
							|    |                |
							|    |getPosition     |
							|    |  self(p>this)  |
							|    |                |
		
		*/
		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},
		/**
		 * 功能的实现
		 * 其他的方法都是添加到OnePageNav.prototype上的，比较好理解，可以自己看代码。这里特别说一下回调函数。比如说下面这句话，默认值是 begin:
				false, 
				如果调用的时候option设置了
				 begin: function() {
				        //I get fired when the animation is starting
				    },
				每次单击导航标签的时候就会调用这个方法。如果没有设置begin，自然也不会出问题。
		 * @param {*} e 
		 */
		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);

			if(!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if(self.config.begin) {
					self.config.begin();
				}

				//Change the highlighted nav item
				self.adjustNav(self, $parent);

				//Removing the auto-adjust on scroll
				self.unbindInterval();

				//Scroll to the correct position
				self.scrollTo(newLoc, function() {
					//Do we need to change the hash?
					if(self.config.changeHash) {
						window.location.hash = newLoc;
					}

					//Add the auto-adjust on scroll back in
					self.bindInterval();

					//End callback
					if(self.config.end) {
						self.config.end();
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();

				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);

					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},

		scrollTo: function(target, callback) {
			var offset = $(target).offset().top;

			$('html, body').animate({
				scrollTop: offset
			}, this.config.scrollSpeed, this.config.easing, callback);
		},

		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;
	/**
	 * 从上面的结构可以很清晰地看到，将重要的变量定义到对象的属性上，在对象中使用变量定义私有方法，在对象的方法中可以调用私有方法从而访问变量，当需要加入新功能新方法是，只需要向对象添加新的变量和私有方法即可，然后在对象的方法中访问调用私有方法，再通过插件里实例化的对象调用该方法即可。这样的好处有：
	 * 1.代码结构清晰，方便管理、维护
	 * 2.不会影响到外部命名空间，因为变量和方法都是在对象内部
	 * 3.对代码的改动并不会影响插件的调用，让$.fn可以专注于插件的调用
	 */
	/**
	 * 定义插件onePageNav，在插件中使用 onePageNav 对象
	 * (jQuery.fn即$.fn是指jQuery的命名空间，所有的对象方法应当附加到就jQuery.fn对象上。这样写之后外部就可以通过这种方式调用它$('#nav').onePageNav(option）我们遵循jQuery的规范，插件应该返回一个jQuery对象，以保证插件的可链式操作。假设$('.nav')可能是一个数组，可以通过this.each来遍历所有的元素。这种情况可以用于一个页面有多个导航的时候。)
	  */
	$.fn.onePageNav = function(options) {
		return this.each(function() {
			// 创建 onePageNav 的实体
			new OnePageNav(this, options).init();
		});
	};

})( jQuery, window , document );