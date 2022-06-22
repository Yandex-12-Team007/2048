import path from 'path';
import express from 'express';
import cors from 'cors';
import sequalize from './server/db';
import * as models from './server/models/model';
import router from './server/routes/index';
import compression from 'compression';
import serverRenderMiddleware from './server/middleware/serverRenderMiddleware';
import '@babel/polyfill';

const app = express();
app.use(cors())
app.use(express.json())

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')));

// Сначала Api потом отлавливаем все запросы в SSR midleware
app.use('/api', router);

app.get('/ping', function(req, res) {
  res.send('OK');
});

app.get('*', serverRenderMiddleware);

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
