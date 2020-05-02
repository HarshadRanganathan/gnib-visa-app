const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const srcPath = path.join(__dirname, "src");
const buildPath = path.join(__dirname, "public");

module.exports = () => {
  return {
    mode:'development',
    entry: ["@babel/polyfill", path.join(srcPath, "index.js")],
    output: {
      path: buildPath,
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: "babel-loader" }]
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "postcss-loader" }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.ejs"),
        path: buildPath,
        excludeChunks: ["base"],
        filename: "index.html",
        minify: {
          collapseInlineTagWhitespace: true,
        }
      }),
      new CopyPlugin([{ from: path.join(srcPath, "pwa"), to: buildPath }])
    ]
  };
};
