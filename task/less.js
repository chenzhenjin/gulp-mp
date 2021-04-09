/*
 * @Author: chenzhenjin
 * @Email: BrotherStudy@163.com
 * @Date: 2021-04-08 11:53:53
 * @LastEditTime: 2021-04-08 20:36:08
 * @Descripttion: 模块描述
 */
const gulp = require("gulp");
const gulpLess = require("gulp-less");
const { less, since, config, dist } = require("../globs.js");
const gulpIf = require("gulp-if");
const gulpPrettyData = require("gulp-pretty-data");
const gulpRename = require("gulp-rename");
const through2 = require("through2");
// const gulpSourcemaps = require("gulp-sourcemaps");
const pump = require("pump");

const hide = (cssFilterFiles) => {
  return through2.obj(function (file, encoding, cb) {
    console.log('hide')
    let content = file.contents.toString();
    const reg = /@import\s+['|"](.+)['|"];/g;
    // ￥1是匹配到的内容 $2是子正则找到的内容
    const str = content.replace(reg, ($1, $2) => {
      // console.log('$2',$2)
      const hasFilter = cssFilterFiles.filter((item) => $2.indexOf(item) > -1);
      // console.log('hasFilter', hasFilter)
      let path = hasFilter <= 0 ? `/** less: ${$1} **/` : $1;
      return path;
    });
    file.contents = Buffer.from(str, "utf8");
    this.push(file);
    cb();
  });
};

const recover = () => {
  return through2.obj(function (file, encoding, cb) {
    console.log('recover')
    let content = file.contents.toString();
    const regNotes = /\/\*\* less: @import\s+['|"](.+)['|"]; \*\*\//g;
    const reg = /@import\s+['|"](.+)['|"];/g;
    console.log('content',content)
    const str = content.replace(regNotes, ($1, $2) => {
      console.log('$1', $1)
      let less = "";
      $1.replace(reg, ($3) => {
        less = $3;
      });
      return less.replace(/\.less/g, '.wxss')
    });
    file.contents = Buffer.from(str, "utf8");
    this.push(file);
    cb();
  });
};

const task = (file) => {
  console.log("less task", file);
  gulp
    .src(less, { since: since(task) })
    .pipe(hide(["variable.less"]))
    .pipe(gulpLess())
    // .pipe(gulpRename({ extname: ".wxss" }))
    .pipe(recover())
    .pipe(
      gulpIf(
        config.compress,
        gulpPrettyData({ type: "minify", extensions: { less: "css" } })
      )
    )
    .pipe(gulp.dest(dist));
};

module.exports = task;
