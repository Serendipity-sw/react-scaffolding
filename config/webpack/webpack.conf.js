const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' )
const ParallelUglifyPlugin = require( 'webpack-parallel-uglify-plugin' )
const path = require( 'path' )
const Webpack = require( 'webpack' )
const WebpackBar = require( 'webpackbar' )
const CompressionWebpackPlugin = require( 'compression-webpack-plugin' )
const TerserPlugin = require( 'terser-webpack-plugin' )
const portFinderSync = require( 'portfinder-sync' )
const DashboardPlugin = require( 'webpack-dashboard/plugin' )

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
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
                loader: 'url-loader',
                options: {
                    name: './static/[name].[chunkhash].[ext]'
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                loader: 'url-loader',
                options: {
                    name: './static/[name].[chunkhash].[ext]'
                }
            }
        ]
    },
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin( ),
            new ParallelUglifyPlugin( {
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
                }
            } )
        ]
    },
    plugins: [
        new WebpackBar( {} ),
        new Webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin( {
            filename: './css/[name].bundle.[chunkhash].css'
        } ),
        new HtmlWebpackPlugin( {
            title: '低代码平台',
            template: path.resolve( __dirname, '../../template.html' ),
            filename: 'index.html',
            inject: 'body'
        } ),
        new DashboardPlugin(),
        new CompressionWebpackPlugin( {
            algorithm: 'gzip'
        } )
    ],
    devServer: {
        host: '127.0.0.1',
        port: portFinderSync.getPort( 3000 ),
        hot: false,
        open: true,
        client: {
            overlay: true,
            progress: true
        }
    }
}
