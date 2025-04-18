const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.build')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

let config = merge(baseWebpackConfig, {
  plugins: [new BundleAnalyzerPlugin()]
})

module.exports = config
