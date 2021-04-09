/*
 * @Author: chenzhenjin
 * @Email: BrotherStudy@163.com
 * @Date: 2021-04-08 10:00:40
 * @LastEditTime: 2021-04-08 11:07:22
 * @Descripttion: 模块描述
 */
const gulp = require("gulp");
const { json, since, config, dist  } = require("../globs.js");
const gulpIf = require("gulp-if");
const gulpPrettyData = require("gulp-pretty-data");

const task = (file) => {
  console.log('jsonfile', file)
  gulp.src(json, { since: since(task) })
  .pipe(
    gulpIf(config.compress, gulpPrettyData({
      type: 'minify'
    }))
  )
  .pipe(gulp.dest(dist))
}

module.exports = task