const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
console.log(webpackConfig);
const compiler = webpack(webpackConfig);
const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';
/** Возможность прокидывания порта из CLI */
const port = process.env.PORT || PORT;
const host = process.env.IP || HOST;

app.use(
    middleware(compiler, {
    // webpack-dev-middleware options
    })
);

app.use(express.static('dist'));

// Стартовая страница
app.get('*', function(req, res) {
  res.status(200).sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, host, () => console.log(`Server started on port ${port}`));
