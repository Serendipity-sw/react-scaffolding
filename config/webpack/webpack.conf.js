const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const WebpackBar = require('webpackbar')

module.exports = {
  entry: './src/app.jsx',
  output: {
    charset: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: './js/[name].bundle.[chunkhash].js',
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
        use: [
          'cache-loader',
          'thread-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024 // 25kb
          }
        },
        generator: {
          // 打包到 image 文件下
          filename: './images/[contenthash][ext][query]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024 // 25kb
          }
        },
        generator: {
          // 打包到 image 文件下
          filename: './images/[contenthash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new WebpackBar({
      color: "#85d",
      basic: false,
      profile: false
    }),
    new HtmlWebpackPlugin({
      title: '低代码平台',
      template: path.resolve(__dirname, '../../template.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
