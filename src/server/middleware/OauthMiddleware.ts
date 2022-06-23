import Routes from 'Constants/Routes';
import url from 'url';

// Отлавливаем редиректы с Oauth и посылаем их на страничку Oauth
export function OauthMiddleware(req, res, next) {
  console.log('OauthMiddleware');
  // Если пришел код от Oauth
  // Если мы уже не на странице OAUTH
  if (req.query.code && !req.originalUrl.match(Routes.OAUTH)) {
    res.redirect(url.format({
      pathname: Routes.OAUTH,
      query: req.query,
    }))
    return
  }
  next();
}
