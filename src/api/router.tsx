import path from 'path';
import express, {Handler} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {logger, requestLogger} from '../utils/logger';
import csurf from 'csurf';
import helmet from 'helmet';
import React from 'react';
import session from 'express-session';
import {renderToStaticNodeStream} from 'react-dom/server';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import hasRole from '../utils/hasRole';
import Page from '../app/Page';
import {queries, mutations} from './api.server';
import {Mutations} from '../utils/types';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';

const queryRoute = async (req: ExpressRequest, resp: ExpressResponse) => {
  requestLogger(req, resp);
  const query = (req as any).params?.query ?? req.query.query;
  const arg = req.query.arg;
  const queryFn: Function = queries[query as keyof typeof queries];
  const args: any = Array.isArray(arg) ? arg : arg != null ? [arg] : [];
  req.log.info({query, args}, 'Query');
  const result = await queryFn(...args);
  resp.json(result);
};

const mutationRoute = async (req: ExpressRequest, resp: ExpressResponse) => {
  requestLogger(req, resp);
  const mutation = (req as any).params?.mutation ?? req.query.mutation;
  req.log.info({mutation, body: req.body}, 'Mutation');
  resp.json(await mutations[mutation as keyof Mutations](req.body));
};

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
        _json['https://wikimarks/app_metadata']?.authorization?.roles; // TODO: rename wikimarks to "scripture.study"
      logger.info({profile, roles, _json, _raw}, 'Auth0 profile');
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

const router = express
  .Router()
  .use(helmet())
  .use(cookieParser())
  .use(csurf({cookie: true}))
  .use(
    session({
      secret: process.env.SESSION_SECRET!,
      cookie: {
        // GOTCHA: setting secure:true in production breaks Auth0
        // secure: process.env.NODE_ENV === 'production',
      },
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(requestLogger)
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
      logger.info({error: err, user, info}, 'auth callback');
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
  .get('*', async (req, resp) => {
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<!doctpe html>');
    renderToStaticNodeStream(<Page csrfToken={req.csrfToken()} />).pipe(resp);
  });

export default router;
