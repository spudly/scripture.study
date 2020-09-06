import path from 'path';
import express, {Handler} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import queryRoute from './api/query/[query]';
import mutationRoute from './api/mutation/[mutation]';
import {logger, requestLogger} from './utils/logger';
import csurf from 'csurf';
import helmet from 'helmet';
import React from 'react';
import session from 'express-session';
import {renderToStaticNodeStream} from 'react-dom/server';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import hasRole from './utils/hasRole';
import Page from './components/Page';
import {StaticRouter} from 'react-router';
import {queries} from './data-sources/mongo';
import App from './App';
import refToTitle from './utils/refToTitle';
import refToNumber from './utils/refToNumber';
import pick from './utils/pushpop/pick';

logger.info(
  pick([
    'PORT',
    'AUTH0_CALLBACK_URL',
    'AUTH0_CLIENT_ID',
    'AUTH0_CLIENT_SECRET',
    'AUTH0_DOMAIN',
    'MONGO_PASSWORD',
    'MONGO_USER',
    'NODE_MODULES_CACHE',
    'SESSION_SECRET',
  ])(process.env as Record<string, string | undefined>),
  'env',
);

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

const getAppData = async (
  volumeRef?: string,
  bookRef?: string,
  chapterRef?: string,
) => {
  const volumes = await queries.getAllVolumes();
  const volume = volumeRef
    ? await queries.getVolumeByTitle(refToTitle(volumeRef))
    : undefined;
  const books = volume ? await queries.getAllBooksByVolumeId(volume.id) : [];
  const book =
    volume && bookRef
      ? await queries.getBookByTitle(volume.id, refToTitle(bookRef))
      : undefined;
  const chapters =
    volume && book
      ? await queries.getAllChaptersByBookId(volume.id, book.id)
      : [];
  const chapter =
    volume && book && chapterRef
      ? await queries.getChapterByBookIdAndNumber(
          volume.id,
          book.id,
          refToNumber(chapterRef),
        )
      : undefined;

  const verses =
    volume && chapter
      ? await queries.getAllVersesByChapterId(volume.id, chapter.id)
      : [];
  const marks =
    volume && chapter
      ? await queries.getAllMarksByChapterId(volume.id, chapter.id)
      : [];
  const prev =
    volume && chapter
      ? (await queries.queryPrevChapterUrl(volume.id, chapter.id)) ?? undefined
      : undefined;
  const next =
    volume && chapter
      ? (await queries.queryNextChapterUrl(volume.id, chapter.id)) ?? undefined
      : undefined;

  return {
    volumes,
    volume,
    books,
    book,
    chapters,
    chapter,
    verses,
    marks,
    prev,
    next,
  };
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
  .get('/read/:volumeRef?/:bookRef?/:chapterRef?', async (req, resp) => {
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<!doctpe html>');
    const {volumeRef, bookRef, chapterRef} = req.params;
    const appData = await getAppData(volumeRef, bookRef, chapterRef);
    renderToStaticNodeStream(
      <Page csrfToken={req.csrfToken()} data={appData}>
        <StaticRouter location={req.url}>
          <App initialData={appData} />
        </StaticRouter>
      </Page>,
    ).pipe(resp);
  })
  .get('*', async (req, resp) => {
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<!doctpe html>');
    const appData = await getAppData();
    renderToStaticNodeStream(
      <Page csrfToken={req.csrfToken()} data={appData}>
        <StaticRouter location={req.url}>
          <App initialData={appData} />
        </StaticRouter>
      </Page>,
    ).pipe(resp);
  });

export default router;
