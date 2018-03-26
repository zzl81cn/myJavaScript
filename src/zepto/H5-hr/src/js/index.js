
// 触屏
(function ($) {
  // 缓存选择器
  var _wrapperHome = $('#wrapperHome')
      _wrapperCompany = $('#wrapperCompany');
  var _windowHeight = $(window).height();
  // console.log('window height ', _windowHeight);
  
  // 首屏
  
  _wrapperHome.on('touchstart', function(e){
    e.preventDefault();
    console.log('touch start.');
  });
  $('#joinBtn').on('tap', function(e) {
    e.preventDefault();
    console.log('touch swipeUp.');
    _wrapperHome.animate({
      'margin-top': '-' + _windowHeight + 'px'
    }, 300,
    'ease-out')
  });
  // 第二屏
  _wrapperCompany.on('touchstart', function(e){
    e.preventDefault();
    console.log('touch start.');
  });
  _wrapperCompany.on('swipeDown', function(e) {
    e.preventDefault();
    console.log('touch swipeDown.');
    _wrapperHome.animate({
      'margin-top': '0px'
    }, 300,
    'ease-out')
    console.log($(window).scrollTop())
  });
  _wrapperCompany.on('swipUp', function(e) {
    e.preventDefault();
  });

  /* _wrapperHome.on('touchmove', function(e) {
    e.preventDefault();
    let touchpros = e.touches[0];
    // console.log('touchpros ', touchpros.screenY);
  });
  _wrapperHome.on('touchend', function(e) {
    e.preventDefault();
    // let touchpros = e.touches;
    console.log('Touch end.');
    
  }) */
  $('.jobsHandle').on('tap', function(e) {
    // e.preventDefault();
      console.log('sdfdf')    
    $('#wrapperJobs').animate({
      // scrollTop: $(window).scrollTop() + _wrapperCompany.height() + 'px'
      'margin-top': -1377 + 'px',
      'z-index': 11
    }, 300,
    'ease-out')
    // $("body").scrollTo( {toT : 500} );
    console.log($(window).scrollTop())
    
  })
//手风琴
/* $("#wrapperJobs .job_request:eq(0)").show();
$("#wrapperJobs .job_name").on('click',function(){
    $(this).next("div.job_request").slideToggle(300).siblings("div.job_request").slideUp("slow");
}); */
})(Zepto);
