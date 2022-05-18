import path from 'path';
import {Configuration} from 'webpack';

import {IS_DEV, DIST_DIR, SRC_DIR} from './env';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import Dotenv from 'dotenv-webpack';

const ASSET_PATH = process.env.ASSET_PATH || '/';

const envType = IS_DEV ? 'development' : 'production';

const config: Configuration = {
  name: 'client',
  entry: './src/index.tsx',
  mode: envType,
  output: {
    publicPath: ASSET_PATH,
    filename: '[name].bundle.js',
    path: DIST_DIR,
  },
  resolve: {
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `./.env.${envType}`,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: path.resolve(SRC_DIR, 'static/img/favicon.ico'),
      meta: {},
      minify: true,
    }),
  ],
}

export default config;
