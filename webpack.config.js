const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Dotenv = require('dotenv-webpack');

//const TITLE = require(path.resolve(__dirname, 'src/constants/title.ts'));

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = (env) => {
  let envType = env.development ? 'development' : 'production';

  return {
  entry: "./src/index.tsx",
  output: {
    publicPath: ASSET_PATH,
    filename: '[name].bundle.js',
    path: path.join(__dirname, "/dist"),
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, 'src'),
      Pages: path.resolve(__dirname, 'src/pages'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Components: path.resolve(__dirname, 'src/components'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Static: path.resolve(__dirname, 'src/static'),
    },
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
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pcss$/i,
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
      template: "./public/index.html",
      favicon: "./src/static/img/favicon.ico",
      meta: {

      },
      minify: true
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
