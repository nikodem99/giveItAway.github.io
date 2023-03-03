const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "none",
  entry: `./app.js`,
  devtool: "inline-source-map",
  output: {
    filename: "./app.js",
    path: path.resolve(__dirname, `build`),
    clean: true,
  },
  devServer: {
    open: true,
    hot: true,
    static: [
      {
        directory: __dirname,
        publicPath: "/",
        serveIndex: true,
      },
    ],
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    port: 3001,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/images/",
          outputPath: "/images/",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
};
