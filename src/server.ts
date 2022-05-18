import express from 'express';
import webpack from 'webpack';
// import ssrMiddleware from './middleware/server-render-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import '@babel/polyfill';

import webpackConfig from '../webpack/client.config';
const compiler = webpack(webpackConfig);

const app = express();

app.use(
    webpackMiddleware(compiler, {
      serverSideRender: true,
    })
);

export {app};
