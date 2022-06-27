import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {logger, errorLogger} from 'Server/middleware/logger';
import {sequelize} from 'Server/db';
import * as models from 'Server/models/model';
import router from 'Server/routes/index';
import serverRenderMiddleware from 'Server/middleware/serverRenderMiddleware';
import {authMiddlewareServer, authMiddlewareApi} from 'Server/middleware/authMiddleware';
import {OauthMiddleware} from 'Server/middleware/OauthMiddleware';
import '@babel/polyfill';

const app = express();
app.use(logger());
app.use(errorLogger());
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/ping', function(req, res) {
  res.send('OK');
});

app.use('/api', authMiddlewareApi, router);
app.use(OauthMiddleware)
app.get('*', authMiddlewareServer, serverRenderMiddleware);

// TODO: Без вызова models не обновляется sequelize, придумать метод лучше
// @ts-ignore
for (const model in models);

async function start(port) {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
}

export {start};
