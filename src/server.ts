import path from 'path';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {logger, errorLogger} from './server/middleware/logger';
import sequalize from './server/db';
import * as models from './server/models/model';
import router from './server/routes/index';
import serverRenderMiddleware from './server/middleware/serverRenderMiddleware';
import {authMiddlewareServer, authMiddlewareApi} from './server/middleware/authMiddleware';
import {OauthMiddleware} from './server/middleware/OauthMiddleware';
import '@babel/polyfill';

const app = express();
app.use(logger());
app.use(errorLogger());
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')));

app.get('/ping', function(req, res) {
  res.send('OK');
});

app.use('/api', authMiddlewareApi, router);
app.use(OauthMiddleware)
app.get('*', authMiddlewareServer, serverRenderMiddleware);

// TODO: Без вызова models не обновляется sequalize, придумать метод лучше
// @ts-ignore
for (const model in models);

async function start(port) {
  try {
    await sequalize.authenticate();
    await sequalize.sync({alter: true});
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
}

export {start};
