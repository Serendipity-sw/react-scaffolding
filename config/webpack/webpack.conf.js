const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const WebpackBar = require('webpackbar')
const configFile = require('../../package.json')

module.exports = {
  cache: true,
  entry: './src/app.jsx',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './images/[contenthash][ext][query]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          filename: './font/[contenthash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new WebpackBar({
      color: '#85d',
      basic: false,
      profile: false
    }),
    new HtmlWebpackPlugin({
      title: configFile.description,
      template: path.resolve(__dirname, '../../template.html'),
      filename: 'index.html',
      inject: 'body',
      chunks: ['main']
    })
  ]
}
