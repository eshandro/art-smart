const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';

const PATHS = {
    client: path.join(__dirname, 'src/client'),
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    publicStyle: path.join(__dirname, 'public/style'),
    publicJS: path.join(__dirname, 'public/js'),
    publicJSLib: path.join(__dirname, 'public/js/lib'),
};

// const htmlPlugin = new HtmlWebPackPlugin({
//     template: `${PATHS.src}/index.html`,
//     filename: `${PATHS.dist}/index.html`
// });

// const cleanPlugin = new CleanWebpackPlugin([`${PATHS.dist}/scripts`, `${PATHS.dist}/styles`, `${PATHS.dist}/index.html`]);
const cleanPlugin = new CleanWebpackPlugin();

const hashedModuleIdsPlugin = new webpack.HashedModuleIdsPlugin();

module.exports = {
    entry: {
        bundle: [`${PATHS.client}/index.js`]
    },
    output: {
        path: devMode ? PATHS.dist : PATHS.publicJS,
        publicPath: ASSET_PATH,
        filename: devMode ? 'scripts/[name].js' : 'scripts/[name].[contenthash].js',
        chunkFilename: devMode ? 'scripts/[name].js' : 'scripts/[name].[contenthash].js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/
                }
            }
        },
        minimizer: [
            // new OptimizeCSSAssetsPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //         devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },
            // {
            // 	test: /\.html?/,
            // 	use: [
            // 		{
            // 			loader: "html-loader"
            // 		}
            // 	]
            // }
        ]
    },
    devServer: {
        contentBase: PATHS.dist,
        watchContentBase: true,
        publicPath: "/",
        proxy: {
            "/api": "http://localhost:8000"
        }
    },
    plugins: [
        cleanPlugin,
        // htmlPlugin,
        // miniCssPlugin,
        hashedModuleIdsPlugin
    ]
};