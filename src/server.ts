import path from 'path';
import express from 'express';
import webpack from 'webpack';
import compression from 'compression';
import serverRenderMiddleware from './server/middleware/serverRenderMiddleware';
import webpackMiddleware from 'webpack-dev-middleware';
import '@babel/polyfill';

import webpackConfig from '../webpack/client.config';
const compiler = webpack(webpackConfig);

const app = express();

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')));

app.use(
    webpackMiddleware(compiler, {
      serverSideRender: true,
    })
);

app.get('*', serverRenderMiddleware);

export {app};
