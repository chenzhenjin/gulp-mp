/*
 * @Author: chenzhenjin
 * @Email: BrotherStudy@163.com
 * @Date: 2021-04-07 15:11:08
 * @LastEditTime: 2021-04-08 16:38:16
 * @Descripttion: 模块描述
 */
const gulp = require("gulp");
const globs = require("./globs.js");
const gulpWatch = require("gulp-watch");
const imageTask = require("./task/image.js");
const wxmlTask = require("./task/wxml.js");
const jsonTask = require("./task/json.js");
const copyTask = require("./task/copy.js");
const lessTask = require("./task/less.js");
//收集stream，并执行至少两个
const pump = require("pump");
//清除文件和目录
const gulpClean = require("gulp-clean");
//清缓存
const gulpCache = require("gulp-cache");

gulp.task("watch", () => {
  gulpWatch(globs.image, imageTask);
  gulpWatch(globs.wxml, wxmlTask);
  gulpWatch(globs.json, jsonTask);
  gulpWatch(globs.other, copyTask);
  gulpWatch(globs.less, lessTask);
});

const clean = (cb) => {
  pump([gulp.src(globs.dist), gulpClean()], cb);
};
gulp.task("clean", clean);
const clear = (cb) => {
  gulpCache.clearAll();
  cb();
};
gulp.task("clear", clear);
// //配置
// let config = {
//   sourcemap: true,
//   compress: false,
// };
// //并发执行任务
// const parallel = gulp.parallel(wxmlTask, imageTask);
// //开发模式
// const build = gulp.series(clean, parallel, "watch");
