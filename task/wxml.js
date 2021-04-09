/*
 * @Author: chenzhenjin
 * @Email: BrotherStudy@163.com
 * @Date: 2021-04-07 18:02:02
 * @LastEditTime: 2021-04-08 19:21:37
 * @Descripttion: 模块描述
 */
const gulp = require("gulp");
const globs = require("../globs.js");
const gulpIf = require("gulp-if");
const gulpPrettyData = require("gulp-pretty-data");
const gulpRename = require("gulp-rename");

const task = (file) => {
  console.log("wxmlTask", file);
  gulp
    .src(globs.wxml, { since: globs.since(task) })
    .pipe(
      gulpIf(
        globs.config.compress,
        gulpPrettyData({
          type: "minify",
          extensions: {
            wxml: 'xml'
          }
        })
      )
    )
    .pipe(gulp.dest(globs.dist));
};
module.exports = task;
