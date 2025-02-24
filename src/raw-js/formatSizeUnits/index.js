/**
 * @description 只写后台管理的前端要怎么提升自己 https://www.jianshu.com/p/5e8fc96f5b7b 2025????(20250224)
 * @param {*} kb 
 * @returns 
 */

/* 类似的单位转换，后端返回一个数字，单位是kb，而我要展示成KB，MB 等形式。大概写一个工具函数（具体怎么写的忘记了，不过功能比这个复杂点）： */
function formatSizeUnits(kb) {
  let units = ['KB', 'MB', 'GB', 'TB', 'PB'];
  let unitIndex = 0;

  while (kb >= 1024 && unitIndex < units.length - 1) {
    kb /= 1024;
    unitIndex++;
  }

  return `${kb.toFixed(2)} ${units[unitIndex]}`;
}

/* 而在此之前，是一个后端同学写的代码（说起来，后台管理系统前端人力不够后端帮忙写好像是常规操作，后端总觉得写前端简单，而我只能说你们那代码写的，一言难尽……），如下： */
function formatSizeUnits(kb) {

  var result = '';

  if (kb < 1024) {

    result = kb + ' KB';

  } else if (kb < 1024 * 1024) {

    result = (kb / 1024).toFixed(2) + ' MB';

  } else if (kb < 1024 * 1024 * 1024) {

    result = (kb / 1024 / 1024).toFixed(2) + ' GB';

  } else {

    result = (kb / 1024 / 1024 / 1024).toFixed(2) + ' TB';

  }

  return result;

}