import path from 'path';
import {Configuration} from 'webpack';
import nodeExternals from 'webpack-node-externals';

import {IS_DEV, DIST_DIR, SRC_DIR} from './env';
// import HtmlWebpackPlugin from 'html-webpack-plugin';

const ASSET_PATH = process.env.ASSET_PATH || '/';

const envType = IS_DEV ? 'development' : 'production';

const config: Configuration = {
  name: 'server',
  target: 'node',
  node: {__dirname: false},
  entry: path.resolve(SRC_DIR, 'server.ts'),
  mode: envType,
  output: {
    libraryTarget: 'commonjs2',
    publicPath: ASSET_PATH,
    filename: 'server.js',
    path: DIST_DIR,
  },
  resolve: {
    alias: {
      '~': path.join(SRC_DIR),
      'Pages': path.join(SRC_DIR, 'pages'),
      'Constants': path.join(SRC_DIR, 'constants'),
      'Components': path.join(SRC_DIR, 'components'),
      'Utils': path.join(SRC_DIR, 'utils'),
      'Static': path.join(SRC_DIR, 'static'),
      'Api': path.join(SRC_DIR, 'api'),
      'Controllers': path.join(SRC_DIR, 'controllers'),
      'Store': path.join(SRC_DIR, 'store'),
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
        loader: 'null-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        loader: 'null-loader',
      },
      {
        test: /\.pcss$/i,
        loader: 'null-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
  externals: ['@loadable/component', nodeExternals({allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]})],
  optimization: {nodeEnv: false},
}

export default config;
