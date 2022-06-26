import path from 'path';
import {Configuration} from 'webpack';

import {IS_DEV, DIST_DIR, SRC_DIR, ENV_PATH} from './env';

// import webpackBundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import LoadablePlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

import Dotenv from 'dotenv-webpack';
import ALIAS from './alias';

const ASSET_PATH = process.env.ASSET_PATH || '/';

const envType = IS_DEV ? 'development' : 'production';

// const ANALYZE_OPTIONS = IS_DEV ?
//   {} :
//   {
//     analyzeMode: 'disabled',
//     generateStatsFile: true,
//   };

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
    alias: ALIAS,
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
        test: /\.(mp3)$/i,
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
    // IS_DEV ? new webpackBundleAnalyzerPlugin.BundleAnalyzerPlugin() : null,
    new FaviconsWebpackPlugin({
      logo: './src/static/img/favicon.png',
      cache: true,
      prefix: 'favicon',
      mode: 'webapp',
    }),
    new MiniCssExtractPlugin({filename: '[name].css'}),
    new LoadablePlugin() as { apply(...args: any[]): void; },
    new Dotenv({path: ENV_PATH}),
    new WorkboxPlugin.GenerateSW({
      exclude: [/(?:)/],
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: 'index.html',
      runtimeCaching: [
        {
          urlPattern: (options) => options.sameOrigin && options.request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
          },
        },
        {
          urlPattern: /\.(?:bundle.js)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'scripts',
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
          },
        },
        {
          urlPattern: /\.(?:woff|woff2|ttf)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
          },
        },
      ],
    }),
  ].filter((el) => el !== null),
  devtool: 'source-map',
}

export default config;
