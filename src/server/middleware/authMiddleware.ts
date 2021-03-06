import {authApi} from 'Api/auth-api';
import Routes from 'Constants/Routes';
import RoutesRight from 'Constants/RoutesRight';

function checkRight(origin) {
  // eslint-disable-next-line guard-for-in
  for (const routeId in RoutesRight) {
    const route = RoutesRight[routeId];
    if (origin.match(route.match)) {
      return route;
    }
  }

  return null;
}

export function authMiddlewareServer(req, res, next) {
  const route = checkRight(req.originalUrl);
  // Если не нашли маршрут - кидаем ошибку
  if (route === null) {
    res.redirect(Routes.ERROR_404);
    return;
  }
  // Если маршрут не приватный - двигаем туда
  if (!route?.private) {
    next();
    return;
  }
  // Если нет cookie - отсылаем на ошибку
  if (req.cookies.authCookie) {
    // Если нет маршрута - значит страницы не существует
    // Если маршрут приватный - проверяем пользователя
    authApi.serverGet(req.cookies)
        .then(() => {
          next();
        })
        .catch(() => {
          res.redirect(Routes.LOGIN);
        })
  } else {
    res.redirect(Routes.LOGIN);
  }
}

export function authMiddlewareApi(req, res, next) {
  // Заглушка для отдачи статики на локальной машине без cookie
  if (req.headers.host.match('localhost')) {
    next();
    return;
  }

  // Тут всегда проверяем права, нет публичных данных в апи
  if (req.cookies.authCookie) {
    authApi.serverGet(req.cookies)
        .then(() => {
          next();
        })
        .catch(() => {
          res.statusCode = 401;
        })
  } else {
    res.statusCode = 401;
    res.send('FAIL');
  }
}
