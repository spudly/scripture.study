import path from 'path';
import express, {Handler} from 'express';
import {v4 as uuid} from 'uuid';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {requestLogger} from '../utils/logger';
import csurf from 'csurf';
import helmet from 'helmet';
import React from 'react';
import {renderToStaticNodeStream} from 'react-dom/server';
import hasRole from '../utils/hasRole';
import Page from '../app/Page';
import {queries as q, mutations as m} from './api.postgres';
import {
  ID,
  MutationRequestBody,
  MutationResponseBody,
  RoleName,
  UserWithRoles,
  Unsaved,
} from '../utils/types';
import {googleCallbackMiddleware, googleLoginMiddleware} from './google-auth';
import session from 'express-session';
import SessionStore from './SessionStore';

const queryRoute: Handler = async (req, resp) => {
  requestLogger(req, resp);
  const query = (req as any).params?.query ?? req.query.query;
  const arg = req.query.arg;
  const queryFn: Function = q[query as keyof typeof q];
  const args: any = Array.isArray(arg) ? arg : arg != null ? [arg] : [];
  req.log.info({query, args}, 'Query');
  const result = await queryFn(...args);
  resp.json(result);
};

const publicDir = path.join(__dirname, '../public');

const authorize = (role: RoleName | null = null): Handler => (
  req,
  resp,
  next,
) => {
  if (req.user && (role == null || hasRole(role, req.user))) {
    return next();
  }
  // req.session!.returnTo = '/';
  if (req.url.startsWith('/api')) {
    resp.redirect('/auth/google');
    return;
  }
  resp.status(401).json({
    error: 'You must be logged in to access this resource!',
  });
};

const mutationRoute = <RECORD extends {id: ID}>(
  createFn?: (record: Unsaved<RECORD>, user?: UserWithRoles) => Promise<ID>,
  updateFn?: (record: RECORD, user?: UserWithRoles) => Promise<void>,
  deleteFn?: (id: ID, user?: UserWithRoles) => Promise<void>,
): Handler => async (req, resp, next) => {
  const actions: MutationRequestBody<RECORD> = req.body;
  const result: MutationResponseBody = {};
  // TODO: start transaction
  try {
    if (actions.create && createFn) {
      result.createdIds = await Promise.all(
        actions.create.map((r) => createFn(r, req.user)),
      );
    }
    if (actions.update && updateFn) {
      await Promise.all(actions.update.map((r) => updateFn(r, req.user)));
      result.updatedIds = actions.update.map((r) => r.id);
    }
    if (actions.delete && deleteFn) {
      await Promise.all(actions.delete.map((id) => deleteFn(id, req.user)));
      result.deletedIds = actions.delete;
    }

    if (actions.approve && hasRole('moderator', req.user)) {
      await Promise.all(actions.approve.map((id) => m.approve(id, req.user)));
      result.approvedIds = actions.approve;
    }
    if (actions.disapprove && hasRole('moderator', req.user)) {
      await Promise.all(actions.disapprove.map((id) => m.disapprove(id)));
      result.disapprovedIds = actions.disapprove;
    }
    // TODO: commit transaction
  } catch (error) {
    // TODO: rollback transaction
    next(error);
    return;
  }
  resp.json(result);
};

// const mySession = session({
//   secret: process.env.SESSION_SECRET!,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: true,
//   },
//   resave: false,
//   saveUninitialized: true,
// });

const sendCurrentUser: Handler = (req, resp, next) => {
  const user = req.user;
  if (user) {
    resp.json(user);
    return;
  }
  resp.json(null);
};

const sendHtml: Handler = async (req, resp) => {
  resp.setHeader('Content-Type', 'text/html');
  resp.write('<!doctpe html>');
  renderToStaticNodeStream(<Page csrfToken={req.csrfToken()} />).pipe(resp);
};

const router = express
  .Router()
  .use(helmet())
  .use(cookieParser())
  .use(csurf({cookie: true}))
  .use(
    session({
      store: new SessionStore(),
      genid: () => uuid(),
      secret: process.env.SESSION_SECRET!,
      cookie: {
        secure: process.env.NODE_ENV !== 'development',
      },
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use((req, _resp, next) => {
    req.user = req.session?.user;
    next();
  })
  .use(requestLogger)
  .use(express.static(publicDir, {index: false}))
  .get('/auth/google', googleLoginMiddleware)
  .get('/auth/google/callback', googleCallbackMiddleware)
  .get('/auth/user', sendCurrentUser)
  .get('/api/query/:query', queryRoute)
  .post(
    '/api/answers',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createAnswer, m.updateAnswer, m.deleteAnswer),
  )
  .post(
    '/api/events',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createEvent, m.updateEvent, m.deleteEvent),
  )
  .post(
    '/api/lists',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createList, m.updateList, m.deleteList),
  )
  .post(
    '/api/list-items',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createListItem, m.updateListItem, m.deleteListItem),
  )
  .post(
    '/api/marks',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createMark, m.updateMark, m.deleteMark),
  )
  .post(
    '/api/people',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createPerson, m.updatePerson, m.deletePerson),
  )
  .post(
    '/api/places',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createPlace, m.updatePlace, m.deletePlace),
  )
  .post(
    '/api/questions',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createQuestion, m.updateQuestion, m.deleteQuestion),
  )
  .post(
    '/api/things',
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createThing, m.updateThing, m.deleteThing),
  )
  .post(
    '/api/approve',
    authorize('moderator'),
    bodyParser.json(),
    mutationRoute(),
  )
  .post(
    '/api/disapprove',
    authorize('moderator'),
    bodyParser.json(),
    mutationRoute(),
  )
  .get('/manifest.json', (_req, resp) => {
    resp.status(404).send('');
  })
  .get('*', sendHtml); // TODO: whitelist html urls so that other stuff can respond w/404

export default router;
