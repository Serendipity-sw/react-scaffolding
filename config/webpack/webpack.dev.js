const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const portFinderSync = require('portfinder-sync')
const { WebpackOpenBrowser } = require('webpack-open-browser')
const path = require('path')

const port = portFinderSync.getPort(3000)

let config = merge(baseWebpackConfig, {
  cache: true,
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.(css|pcss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path]__[name]__[local]'
              },
              esModule: false,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../../public'),
      publicPath: '/public'
    },
    host: '0.0.0.0',
    port,
    hot: true,
    open: false,
    compress: true,
    client: {
      overlay: false,
      progress: true
    },
    proxy: []
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].bundle.css'
    }),
    new WebpackOpenBrowser({ url: `http://localhost:${port}` })
  ]
})

module.exports = config
