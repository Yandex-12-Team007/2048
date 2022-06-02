import path from 'path';
import express from 'express';
import sequalize from './server/db';
// @ts-ignore
import * as models from './server/models/model';
import router from './server/routes/index';
import compression from 'compression';
import serverRenderMiddleware from './server/middleware/serverRenderMiddleware';
import '@babel/polyfill';

const app = express();

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', serverRenderMiddleware);

app.use('/api', router)

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
