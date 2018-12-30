const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const curPath = path.join(__dirname);
const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'public');

module.exports = () => {
    const fileEnv = dotenv.config({ path: path.join(curPath, '.env') }).parsed;
    
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    envKeys['process.env.NODE_ENV'] = JSON.stringify('production');

    return {
        devtool: 'cheap-module-source-map',
        entry: ['babel-polyfill', path.join(srcPath, 'index.js')],
        output: {
            path: buildPath,
            filename: '[name].[chunkhash].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{loader: 'babel-loader'}]
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', options: { minimize: true } },
                            'postcss-loader'
                        ]
                    })
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.[chunkhash].js',
                minChunks (module) {
                    return module.context &&
                        module.context.indexOf('node_modules') >= 0;
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                }
            }),
            new webpack.HashedModuleIdsPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.ejs'),
                path: buildPath,
                excludeChunks: ['base'],
                filename: 'index.html',
                minify: {
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true
                }
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new ExtractTextPlugin({
                filename: '[name].[contenthash].css',
                allChunks: true
            }),
            new StyleExtHtmlWebpackPlugin({
                minify: true
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new CopyPlugin([
                { from: path.join(srcPath, 'pwa'), to: buildPath }
            ])
        ]
    };
};