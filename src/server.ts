import path from 'path';
import express from 'express';
import https from 'https';
import * as fs from 'fs';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {logger, errorLogger} from './server/middleware/logger';
import sequalize from './server/db';
import * as models from './server/models/model';
import router from './server/routes/index';
import serverRenderMiddleware from './server/middleware/serverRenderMiddleware';
import authMiddleware from './server/middleware/authMiddleware';
import '@babel/polyfill';

const app = express();
app.use(logger());
app.use(errorLogger());
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')));
// Сначала Api потом отлавливаем все запросы в SSR midleware
app.use('/api', authMiddleware, router);
app.get('*', authMiddleware, serverRenderMiddleware);

// TODO: Без вызова models не обновляется sequalize, придумать метод лучше
// @ts-ignore
for (const model in models);


const key = fs.readFileSync(path.resolve(__dirname, '../certs', 'local.ya-praktikum.tech-key.pem'));
const cert = fs.readFileSync(path.resolve(__dirname, '../certs', 'local.ya-praktikum.tech.pem'));

const options = {
  key: key,
  cert: cert,
}

const server = https.createServer(options, app);

async function start(port) {
  try {
    await sequalize.authenticate();
    await sequalize.sync({alter: true});
    await server.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
}

export {start};
