const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.conf')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const portFinderSync = require('portfinder-sync')
const {WebpackOpenBrowser} = require('webpack-open-browser')

const port = portFinderSync.getPort(3000)

let config = merge(baseWebpackConfig, {
  // devtool: 'eval-cheap-module-source-map',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].bundle.[chunkhash].css'
    }),
    new WebpackOpenBrowser({url: `http://localhost:${port}`}),
    new webpack.DefinePlugin({
      Gloomy_env: JSON.stringify('development')
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port,
    hot: true,
    open: false,
    compress: true,
    client: {
      overlay: true,
      progress: true
    }
  }
})

module.exports = config
