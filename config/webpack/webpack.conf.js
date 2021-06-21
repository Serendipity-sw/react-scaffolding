const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const path = require('path');
const open = require('open');
const Webpack = require('webpack');
const WebpackBar = require('webpackbar');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: './src/app.jsx',
  output: {
    charset: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: './js/[name].bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
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
                localIdentName: "[path]__[name]__[local]--[hash:base64:12]",
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: './static/[name].[hash:8].[ext]',
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        loader: 'file-loader',
        options: {
          name: './static/[name].[hash:8].[ext]',
        }
      }
    ],
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: 'advanced',
        },
      }),
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        test: /.js$/,
        workerCount: 2,
        uglifyJS: {
          output: {
            beautify: false,
            comments: false
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        },
      }),
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),  //打包优化检查
    new WebpackBar({}),
    new Webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].bundle.css',
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, '../../template.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new EncodingPlugin({
      encoding: 'UTF-8'
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    open: false,
    after() {
      open('http://localhost:' + this.port);
    }
  }
};
