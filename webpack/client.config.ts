import path from 'path';
import {Configuration} from 'webpack';

import {IS_DEV, DIST_DIR, SRC_DIR} from './env';

import LoadablePlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const CopyPlugin = require("copy-webpack-plugin");

import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const ASSET_PATH = process.env.ASSET_PATH || '/';

const envType = IS_DEV ? 'development' : 'production';
// const envPath = IS_DEV ? './.env.development' : './.env.production';
const envPath = IS_DEV ? './.env' : './.env';

const config: Configuration = {
  name: 'client',
  entry: path.join(SRC_DIR, 'client'),
  mode: envType,
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR,
    publicPath: ASSET_PATH,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      '~': path.resolve(SRC_DIR),
      'Pages': path.resolve(SRC_DIR, 'pages'),
      'Constants': path.resolve(SRC_DIR, 'constants'),
      'Components': path.resolve(SRC_DIR, 'components'),
      'Utils': path.resolve(SRC_DIR, 'utils'),
      'Static': path.resolve(SRC_DIR, 'static'),
      'Api': path.resolve(SRC_DIR, 'api'),
      'Controllers': path.resolve(SRC_DIR, 'controllers'),
      'Store': path.resolve(SRC_DIR, 'store'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'},
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pcss$/i,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css'}),
    new LoadablePlugin() as { apply(...args: any[]): void; },
    new Dotenv({path: envPath}),
    new CopyPlugin({
      patterns: [
        {from: './src/static/audio/**.mp3', to: 'audio/[name][ext]'},
      ],
    }),
  ],
  devtool: 'source-map',
}

export default config;
