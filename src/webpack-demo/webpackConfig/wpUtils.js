/**
 * @author zzl81cn
 * @since 2019-03-08
 * @description webpack utils
 */
const path = require('path');
const glob = require("glob");

let wpUtils = {
    /* 返回多入口文件遍历结果数组（主文件名部分，不含扩展名） */
    getRoot: (viewsPath) => {
        let files = glob.sync(viewsPath);
        let entries = [];
        let entry, basename, extname;

        for (let i = 0; i < files.length; i++) {
            entry = files[i];
            extname = path.extname(entry); // 扩展名 eg: .html
            basename = path.basename(entry, extname); // eg: index
            entries.push(basename);
        }
        return entries;
    }
};

module.exports = wpUtils;