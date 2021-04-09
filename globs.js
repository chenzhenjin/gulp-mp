/*
 * @Author: chenzhenjin
 * @Email: BrotherStudy@163.com
 * @Date: 2021-04-07 16:06:24
 * @LastEditTime: 2021-04-08 20:19:02
 * @Descripttion: 模块描述
 */
const gulp = require('gulp')
const src = './src'
const dist = "./dist";
const since = (task) => (file) =>
  gulp.lastRun(task) > file.stat.ctime ? gulp.lastRun(task) : 0;
//无需针对wxss js压缩，微信开发工具可选择
const globs = {
  dist,
  since,
  config: {
    sourcemap: { less: true},
    compress: true
  },
  ts: [`${src}/**/*.ts`, './typings/index.d.ts'],
  less: `${src}/**/*.less`,
  image: `${src}/**/*.{png,jpg,gif}`,
  wxml: `${src}/**/*.wxml`,
  json: `${src}/**/*.json`,
  other: [`${src}/**`, `!${src}/**/*.less`, `!${src}/**/variable.less`, `!${src}/**/*.wxml`]
}

module.exports = globs