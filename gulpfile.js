const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const zip = require('gulp-zip');
const moment = require('moment-kirk');
const packageInfo = require('./package.json');
const request = require('gulp-request');
const qs = require('qs')
/* 生成构建时间 存放在 生产目录里*/
gulp.task('buildTime', done => {
    fs.writeFile(path.resolve('./dist') + '/buildTime.txt', moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' ' + packageInfo.version, function (err) {
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
      .pipe(zip('pc-[' + packageInfo.version + ']-[' + moment(new Date()).format('YYYY-MM-DD HH-mm-ss') + '].zip'))
      .pipe(gulp.dest('backup'));
    done();
  }
);

const uploadFunc = unzipPath => {
  let zipName = `pc-[${packageInfo.version}]-[${moment(new Date()).format('YYYY-MM-DD HH-mm-ss')}].zip`;
  gulp.src(path.resolve('./dist/**'))
    .pipe(zip(zipName))
    .pipe(gulp.dest('backup'))
    .pipe(request({
      url: `http://localhost${qs.stringify({
        isUnZip: 1,
        path: unzipPath
      }, {addQueryPrefix: true})}`,
      paramName: 'file',
      fs: {
        path: `./backup/${zipName}`
      }
    }));
}

/* 上传文件目录到测试环境  */
gulp.task('uploadDevelop', done => {
  uploadFunc('/home/admin/vue-scaffolding/develop-fix')
  done();
});

/* 上传文件目录到测试环境  */
gulp.task('uploadRelease', done => {
  uploadFunc('/home/admin/vue-scaffolding/release')
  done();
});
