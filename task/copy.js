/*
 * @Author: chenzhenjin
 * @Email: BrotherStudy@163.com
 * @Date: 2021-04-08 11:11:28
 * @LastEditTime: 2021-04-08 11:15:15
 * @Descripttion: 模块描述
 */
const gulp = require("gulp");
const { other, since, dist } = require("../globs.js");

const task = (file) => {
  console.log("copy", file);
  gulp.src(other, { since: since(task) }).pipe(gulp.dest(dist));
};

module.exports = task;
