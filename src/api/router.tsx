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
import {
  queries as q,
  mutations as m,
  Answer,
  Event,
  List,
  ListItem,
  Mark,
  Person,
  Place,
  Question,
  Thing,
  Volume,
  PersonLink,
} from './api.postgres';
import {
  ID,
  BulkMutationRequestBody,
  BulkMutationResponseBody,
  RoleName,
  UserWithRoles,
  Unsaved,
  ListRecord,
  Audited,
  AnswerRecord,
  EventRecord,
  MarkRecord,
  PlaceRecord,
  PersonRecord,
  QuestionRecord,
  ThingRecord,
  VolumeRecord,
  PersonLinkRecord,
} from '../utils/types';
import {googleCallbackMiddleware, googleLoginMiddleware} from './google-auth';
import session from 'express-session';
import SessionStore from './SessionStore';
import {Model, ModelCtor} from 'sequelize/types';

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

const publicDir = path.join(__dirname, '../../public');

const authorize = (role: RoleName | null = null): Handler => (
  req,
  resp,
  next,
) => {
  if (req.user && (role == null || hasRole(role, req.user))) {
    return next();
  }
  // req.session!.returnTo = '/';
  if (!req.url.startsWith('/api')) {
    resp.redirect('/auth/google');
    return;
  }
  resp.status(401).json({
    error: 'You must be logged in to access this resource!',
  });
};

const getRoute = <RECORD extends {id: ID}>(
  ModelClass: ModelCtor<Model<RECORD, RECORD>>,
): Handler => async (req, resp, next) => {
  try {
    const {limit, offset, sortBy, sortOrder, ...where} = req.query;
    console.log({
      query: req.query,
      where: where as Partial<Audited<RECORD>>,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: sortBy
        ? [[sortBy as string, sortOrder === 'DESC' ? 'DESC' : 'ASC']]
        : [],
    });
    const models = await ModelClass.findAll({
      where: where as Partial<Audited<RECORD>>,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: sortBy
        ? [[sortBy as string, sortOrder === 'DESC' ? 'DESC' : 'ASC']]
        : [],
    });
    resp.json(models.map((m) => m.get()));
  } catch (error) {
    req.log.error({error}, 'error');
    next(error);
  }
};

const mutationRoute = <RECORD extends {id: ID}>(
  createFn?: (record: Unsaved<RECORD>, user?: UserWithRoles) => Promise<ID>,
  updateFn?: (record: RECORD, user?: UserWithRoles) => Promise<void>,
  deleteFn?: (id: ID, user?: UserWithRoles) => Promise<void>,
): Handler => async (req, resp, next) => {
  const actions: BulkMutationRequestBody<RECORD> = req.body;
  const result: BulkMutationResponseBody = {};
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
    // TODO: commit transaction
  } catch (error) {
    // TODO: rollback transaction
    next(error);
    return;
  }
  resp.json(result);
};

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

const router = express.Router();
router.use(helmet());
router.use(cookieParser());
router.use(csurf({cookie: true}));
router.use(
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
);
router.use((req, _resp, next) => {
  req.user = req.session?.user;
  next();
});
router.use(requestLogger);
router.use(express.static(publicDir, {index: false}));
router.get('/auth/google', googleLoginMiddleware);
router.get('/auth/google/callback', googleCallbackMiddleware);
router.get('/auth/user', sendCurrentUser);
router.get('/api/query/:query', queryRoute);
router
  .route('/api/answers')
  .get(getRoute<AnswerRecord>(Answer))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createAnswer, m.updateAnswer, m.deleteAnswer),
  );
router
  .route('/api/events')
  .get(getRoute<EventRecord>(Event))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createEvent, m.updateEvent, m.deleteEvent),
  );
router
  .route('/api/lists')
  .get(getRoute<ListRecord>(List))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createList, m.updateList, m.deleteList),
  );
router
  .route('/api/list-items')
  .get(getRoute<ListRecord>(ListItem))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createListItem, m.updateListItem, m.deleteListItem),
  );
router
  .route('/api/marks')
  .get(getRoute<MarkRecord>(Mark))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createMark, m.updateMark, m.deleteMark),
  );
router
  .route('/api/people')
  .get(getRoute<PersonRecord>(Person))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createPerson, m.updatePerson, m.deletePerson),
  );
router
  .route('/api/places')
  .get(getRoute<PlaceRecord>(Place))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createPlace, m.updatePlace, m.deletePlace),
  );
router
  .route('/api/questions')
  .get(getRoute<QuestionRecord>(Question))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createQuestion, m.updateQuestion, m.deleteQuestion),
  );
router
  .route('/api/things')
  .get(getRoute<ThingRecord>(Thing))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createThing, m.updateThing, m.deleteThing),
  );
router
  .route('/api/people-links')
  .get(getRoute<PersonLinkRecord>(PersonLink))
  .post(
    authorize('author'),
    bodyParser.json(),
    mutationRoute(m.createPersonLink, m.updatePersonLink, m.deletePersonLink),
  );

router.route('/api/volumes').get(getRoute<VolumeRecord>(Volume));
router.get('/manifest.json', (_req, resp) => {
  resp.status(404).send('');
});

router.get('*', sendHtml); // TODO: whitelist html urls so that other stuff can respond w/404

export default router;
