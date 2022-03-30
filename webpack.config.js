const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  let envType = env.development ? 'development' : 'production';


  return {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: `./.env.${envType}`
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    client: {
      progress : true,
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    hot : true,
    compress: true,
    port: 9000,
  }
}};
