const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const path = require( 'path' )
const WebpackBar = require( 'webpackbar' )
const portFinderSync = require( 'portfinder-sync' )

module.exports = {
    entry: './src/app.jsx',
    output: {
        charset: true,
        path: path.resolve( __dirname, '../../dist' ),
        filename: './js/[name].bundle.[chunkhash].js',
        clean: true
    },
    resolve: {
        alias: {
            src: path.resolve( __dirname, '../../src/' )
        },
        extensions: [ '.js', '.jsx', '.json' ]
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
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    }
                },
                generator: {
                    // 打包到 image 文件下
                    filename: './images/[contenthash][ext][query]',
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    }
                },
                generator: {
                    // 打包到 image 文件下
                    filename: './images/[contenthash][ext][query]',
                }
            }
        ]
    },
    plugins: [
        new WebpackBar( {} ),
        new MiniCssExtractPlugin( {
            filename: './css/[name].bundle.[chunkhash].css'
        } ),
        new HtmlWebpackPlugin( {
            title: '低代码平台',
            template: path.resolve( __dirname, '../../template.html' ),
            filename: 'index.html',
            inject: 'body'
        } )
    ],
    devServer: {
        host: '127.0.0.1',
        port: portFinderSync.getPort( 3000 ),
        hot: true,
        open: true,
        client: {
            overlay: true,
            progress: true
        }
    }
}
