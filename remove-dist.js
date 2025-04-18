const fs = require('fs')

const emptyDir = filePath => {
  const files = fs.readdirSync(filePath) //读取该文件夹
  files.forEach(file => {
    const nextFilePath = `${filePath}/${file}`
    const states = fs.statSync(nextFilePath)
    if (states.isDirectory()) {
      emptyDir(nextFilePath)
    } else {
      fs.unlinkSync(nextFilePath)
      console.log(`del file ${nextFilePath} success`)
    }
  })
}

const rmEmptyDir = filePath => {
  const files = fs.readdirSync(filePath)
  if (files.length === 0) {
    fs.rmdirSync(filePath)
    console.log(`del dir ${filePath} success`)
  } else {
    let tempFiles = 0
    files.forEach(file => {
      tempFiles++
      const nextFilePath = `${filePath}/${file}`
      rmEmptyDir(nextFilePath)
    })
    //删除母文件夹下的所有字空文件夹后，将母文件夹也删除
    if (tempFiles === files.length) {
      fs.rmdirSync(filePath)
      console.log(`del dir ${filePath} success!`)
    }
  }
}

const rmDir = './dist',
  buildDir = './build'

if (fs.existsSync(rmDir)) {
  emptyDir(rmDir)
  rmEmptyDir(rmDir)

  console.log('remove file success!')
} else {
  console.log('dir is not find!')
}

if (fs.existsSync(buildDir)) {
  emptyDir(buildDir)
  rmEmptyDir(buildDir)

  console.log('remove file success!')
} else {
  console.log('dir is not find!')
}
