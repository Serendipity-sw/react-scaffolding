const fs = require('fs'),
  path = './dist/build-time.txt',
  dayjs = require('dayjs'),
  packageInfo = require('./package.json')

fs.writeFile(
  path,
  `${dayjs().format('YYYY-MM-DD HH:mm:ss')} ${packageInfo.version}`,
  err => {
    if (err) {
      console.log('write build-time err!', err)
    } else {
      console.log('write build-time success!')
    }
  }
)
