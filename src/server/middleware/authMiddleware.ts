import Routes from 'Constants/Routes';

export default function authMiddleware(req, res, next) {
  if (req.cookies.authCookie) {
    next();
  }

  next();
}
