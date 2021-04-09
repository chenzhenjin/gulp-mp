/*
 * @Author: chenzhenjin
 * @Email: BrotherStudy@163.com
 * @Date: 2021-04-07 16:02:48
 * @LastEditTime: 2021-04-07 18:08:26
 * @Descripttion: 模块描述
 */
const gulp = require("gulp");
const gulpImage = require("gulp-image");
const gulpCache = require("gulp-cache");
const globs = require("../globs.js");

const task = (file) => {
  console.log("imageTask", file);
  gulp
    .src(globs.image, { since: globs.since(task) })
    .pipe(gulpCache(gulpImage()))
    .pipe(gulp.dest(globs.dist));
};
module.exports = task;
