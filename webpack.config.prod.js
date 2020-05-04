const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin")
const srcPath = path.join(__dirname, "src");
const buildPath = path.join(__dirname, "public");

module.exports = () => {
  return {
    mode: 'production',
    entry: ["@babel/polyfill", path.join(srcPath, "index.js")],
    output: {
      path: buildPath,
      filename: "[name].[contenthash].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: "babel-loader" }]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,// main use to remove duplication
              options: {
                esModule: true, // to support import syntax
              },
            },
            
            'css-loader'
          ]
        }
      ]
    },
    optimization:{
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          uglifyOptions: {
            ie8: true,

          }
      })],
      splitChunks:{
        minChunks: 1,
        chunks: 'async'
      }
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.ejs"),
        path: buildPath,
        excludeChunks: ["base"],
        filename: "index.[hash].html",
        minify: {
          collapseInlineTagWhitespace: true,
        }
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "defer"
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as(entry) {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.woff$/.test(entry)) return 'font';
          if (/\.png$/.test(entry)) return 'image';
          return 'script';
        }
      }),
      new InterpolateHtmlPlugin({
        'NODE_ENV': 'production'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        allChunks: true
      }),
      new StyleExtHtmlWebpackPlugin({
        minify: true
      }),
      new CompressionPlugin({
        filename: '[path].gz[query]',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
      }),
      new CopyPlugin([
        { from: path.join(srcPath, "pwa"), to: buildPath },
        { from: path.join(__dirname, "ads.txt"), to: buildPath }
      ])
    ],
    performance: {
      hints: false
    }
  };
};
