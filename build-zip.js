const fs = require('fs'),
  configFile = require('./package.json'),
  path = require('path'),
  dayjs = require('dayjs'),
  archiver = require('archiver'),
  params = process.argv.slice(2),
  defaultZipName = `./backup/${configFile.description}-[${configFile.version}]-[${dayjs().format('YYYY-MM-DD_HH-mm-ss')}].zip`,
  archive = archiver('zip', {
    zlib: { level: 9 }
  }),
  backUpDir = './backup',
  buildDir = './build'

let zipName = defaultZipName

if (params.length > 0) {
  zipName = `./build/deepos-${params.pop()}.zip`
}

zipName = path.resolve(__dirname, zipName)

if (!fs.existsSync(backUpDir)) {
  fs.mkdirSync(backUpDir, { recursive: true })
}

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true })
}

let output = fs.createWriteStream(zipName)

output.on('close', _ => {
  console.log((archive.pointer() / 1024).toFixed(0), 'KB total')
  console.log(
    'archiver has been finalized and the output file descriptor has closed. '
  )
  console.log('output:', zipName)
})

output.on('end', _ => {
  console.log('Data has been drained')
})

archive.on('warning', err => {
  if (err.code === 'ENOENT') {
    console.warn('build zip err!', err.toString())
  } else {
    console.error('build zip error!', err.toString())
    throw err
  }
})

archive.on('error', err => {
  console.error('build zip error!', err.toString())
  throw err
})

archive.pipe(output)

archive.directory('dist/', false)

archive.finalize()

fs.writeFileSync('./push-file-name', zipName)

console.log('zip file write success!')
