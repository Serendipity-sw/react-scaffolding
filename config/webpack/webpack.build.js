const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

let config = merge(baseWebpackConfig, {
  cache: false,
  output: {
    charset: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: './js/[name].bundle.[contenthash].js',
    clean: true,
    asyncChunks: true
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
                localIdentName: '[hash]'
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
  performance: {
    hints: false
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        minify: TerserPlugin.terserMinify,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          },
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
    new DashboardPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].bundle.[chunkhash].css'
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../public/'),
          to: path.resolve(__dirname, `../../dist/public/`)
        }
      ]
    }),
    new webpack.DefinePlugin({
      INDEXED_DB_STORE_KEY: JSON.stringify('react-scaffolding')
    })
  ]
})

module.exports = config
