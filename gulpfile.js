const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const zip = require('gulp-zip');
const moment = require('moment');
const packageInfo = require('./package.json');
/* 生成构建时间 存放在 生产目录里*/
gulp.task('buildTime', done => {
    fs.writeFile(path.resolve('./dist') + '/buildTime.txt', moment().format('YYYY-MM-DD HH:mm:ss') + ' ' + packageInfo.version, function (err) {
      if (err) {
        return console.log(err);
      }
    });
    done();
  }
);
/* 打包生产目录 */
gulp.task('zip', done => {
    gulp.src(path.resolve('./dist/**'))
      .pipe(zip('pc-[' + packageInfo.version + ']-[' + moment().format('YYYY-MM-DD HH-mm-ss') + '].zip'))
      .pipe(gulp.dest('backup'));
    done();
  }
);
