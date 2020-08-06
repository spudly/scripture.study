import webpack from 'webpack';
import path from 'path';
import express, {Handler} from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import queryRoute from './api/query/[query]';
import mutationRoute from './api/mutation/[mutation]';
import webpackConfig from './webpack.config.js';
import {logger, requestLogger} from './utils/logger';
import csurf from 'csurf';
import helmet from 'helmet';
import React from 'react';
import session from 'express-session';
import {renderToStaticNodeStream} from 'react-dom/server';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import hasRole from './utils/hasRole';

const PORT = process.env.PORT;

const publicDir = path.join(__dirname, '../public');

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN!,
      clientID: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      callbackURL: process.env.AUTH0_CALLBACK_URL!,
    },
    (_accessToken, _refreshToken, _extraParams, rawProfile, done) => {
      const {_json, _raw, ...profile} = rawProfile;
      const roles =
        _json['https://wikimarks/app_metadata']?.authorization?.roles;
      done(null, {...profile, roles});
    },
  ),
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const authorize = (role: string | null = null): Handler => (
  req,
  resp,
  next,
) => {
  if (req.user && (role == null || hasRole(req.user, role))) {
    return next();
  }
  req.session!.returnTo = '/';
  resp.redirect('/auth/login');
};

const app = express()
  .use(helmet())
  .use(cookieParser())
  .use(csurf({cookie: true}))
  .use(
    session({
      secret: process.env.SESSION_SECRET!,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
      },
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(requestLogger)
  .use(
    process.env.NODE_ENV === 'development'
      ? webpackDevMiddleware(webpack(webpackConfig), {
          publicPath: '/',
        })
      : (_, __, next) => next(),
  )
  .use(express.static(publicDir, {index: false}))
  .get(
    '/auth/login',
    passport.authenticate('auth0', {scope: 'openid email profile'}),
    (_req, resp) => {
      resp.redirect('/');
    },
  )
  .get('/auth/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/auth/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        const returnTo = req.session!.returnTo;
        delete req.session!.returnTo;
        res.redirect(returnTo || '/');
      });
    })(req, res, next);
  })
  .get('/auth/logout', (req, resp) => {
    req.logout();
    const port = req.connection.localPort;
    const returnTo = `${req.protocol}://${req.hostname}${
      port !== undefined && port !== 80 && port !== 443 ? `:${port}` : ''
    }`;
    const logoutURL = `https://${
      process.env.AUTH0_DOMAIN
    }/v2/logout?client_id=${encodeURIComponent(
      process.env.AUTH0_CLIENT_ID!,
    )}&returnTo=${encodeURIComponent(returnTo)}`;
    resp.redirect(String(logoutURL));
  })
  .get('/auth/user', (req, resp, next) => {
    const user = req.user;
    if (user) {
      resp.json(user);
      return;
    }
    resp.json(null);
  })
  .get('/api/query/:query', queryRoute)
  .post(
    '/api/mutation/:mutation',
    authorize('author'),
    bodyParser.json(),
    mutationRoute,
  )
  .get('*', (req, resp) => {
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<!doctpe html>');
    renderToStaticNodeStream(
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#bee3f8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="CSRF-Token" content={req.csrfToken()} />
          <link rel="apple-touch-icon" href="/icons/loco-192.png" />
        </head>
        <body>
          <div id="root"></div>
          <script src="/index.client.js"></script>
        </body>
      </html>,
    ).pipe(resp);
  });

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
