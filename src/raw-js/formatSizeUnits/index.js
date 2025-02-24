/**
 * @description 只写后台管理的前端要怎么提升自己 https://www.jianshu.com/p/5e8fc96f5b7b 2025????(20250224)
 * @param {*} kb 
 * @returns 
 */

function formatSizeUnits(kb) {
  let units = ['KB', 'MB', 'GB', 'TB', 'PB'];
  let unitIndex = 0;

  while (kb >= 1024 && unitIndex < units.length - 1) {
    kb /= 1024;
    unitIndex++;
  }

  return `${kb.toFixed(2)} ${units[unitIndex]}`;
}
