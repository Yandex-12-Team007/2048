import React from 'react';
import {renderToString} from 'react-dom/server';
import {Request, Response} from 'express';
import {Provider} from 'react-redux';
import {configureStore} from '../../store/';
import {StaticRouter} from 'react-router-dom';
import {StaticRouterContext} from 'react-router';
import {ChunkExtractor} from '@loadable/server';
import App from '../../App';
import path from 'path';
import {getInitialState, IRootState} from '../../Interface/IRootState';
import {renderObject} from 'Utils/renderObject';

// В этой middleware мы формируем первичное состояние приложения на стороне сервера
// Попробуйте её подебажить, чтобы лучше разобраться, как она работает
export default function serverRenderMiddleware(req: Request, res: Response) {
  const location = req.url;
  const context: StaticRouterContext = {};
  const store = configureStore(getInitialState());

  const statsFile = path.resolve('./dist/loadable-stats.json');
  const chunkExtractor = new ChunkExtractor({statsFile});

  const jsx = chunkExtractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
  );

  const reactHtml = renderToString(jsx);
  const reduxState = store.getState();


  if (context.url) {
    res.redirect(context.url);
    return;
  }

  res
      .status(context.statusCode || 200)
      .send(getHtml(reactHtml, reduxState, chunkExtractor));
}

function getHtml(reactHtml: string, reduxState: IRootState, chunkExtractor: ChunkExtractor) {
  const scriptTags = chunkExtractor.getScriptTags();
  const linkTags = chunkExtractor.getLinkTags();
  const styleTags = chunkExtractor.getStyleTags();

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="title" content="Default Title" data-react-helmet="true">
  <meta name="description" content="App Description" data-react-helmet="true">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>2048</title>
  <meta charset="UTF-8"/>
  <meta name="description" content="Та самая 2048 !">
  ${linkTags}
  ${styleTags}
</head>
<body>
<noscript>
    You need to enable JavaScript to run this app.
</noscript>
  <div id="root">${reactHtml}</div>
  <script>
    window.__INITIAL_STATE__ = ${renderObject(reduxState)}
  </script>
  ${scriptTags}
</body>
</html>
    `;
}
