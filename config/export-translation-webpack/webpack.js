const path = require('path')
const WebpackBar = require('webpackbar')
const DashboardPlugin = require('webpack-dashboard/plugin')
const configFile = require('../../service/translation-service/config.json')

module.exports = {
  entry: {
    [configFile.frontendJsonFileName.split('.').shift()]:
      './src/export-translation/translation.js'
  },
  output: {
    charset: true,
    path: path.resolve(
      __dirname,
      '../../service/translation-service',
      configFile.exportDir
    ),
    filename: './[name].js',
    clean: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../../src/')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['thread-loader', 'babel-loader']
      }
    ]
  },
  plugins: [
    new DashboardPlugin(),
    new WebpackBar({
      color: '#85d',
      basic: false,
      profile: false
    })
  ]
}
