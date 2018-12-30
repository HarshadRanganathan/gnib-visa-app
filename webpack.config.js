const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    
    return {
        entry: ['babel-polyfill', path.join(srcPath, 'index.js')],
        output: {
            path: buildPath,
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{ loader: 'babel-loader' }]
                }, 
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
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
            new CopyPlugin([
                { from: path.join(srcPath, 'pwa'), to: buildPath }
            ])
        ]
    };
};