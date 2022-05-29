import path from 'path';
import express from 'express';
import compression from 'compression';
import serverRenderMiddleware from './server/middleware/serverRenderMiddleware';
import '@babel/polyfill';

const app = express();

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', serverRenderMiddleware);

export {app};