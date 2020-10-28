import path from 'path';
import express, {Handler} from 'express';
import {v4 as uuid} from 'uuid';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {requestLogger} from '../utils/logger';
import csurf from 'csurf';
import helmet from 'helmet';
import React from 'react';
import compression from 'compression';
import {renderToStaticNodeStream} from 'react-dom/server';
import hasRole from '../utils/hasRole';
import Page from '../app/Page';
import manifest from '../manifest';
import {
  Answer,
  Book,
  Chapter,
  Event,
  List,
  ListItem,
  makeCreateRecord,
  makeDeleteRecord,
  makeUpdateRecord,
  Mark,
  Person,
  PersonLink,
  Place,
  Question,
  Thing,
  Verse,
  Volume,
  getAllMarksByChapterId,
  getAdjacentChaptersById,
  getVersesAndMarksBySpeakerId,
  countVersesBySpeakerId,
  sql,
} from './api.postgres';
import {
  ID,
  BulkMutationRequestBody,
  BulkMutationResponseBody,
  RoleName,
  UserWithRoles,
  Unsaved,
  GetAllResponseBody,
  MarkRecordPlus,
} from '../types';
import {
  googleCallbackMiddleware,
  googleLoginMiddleware,
  logout,
} from './middleware/auth';
import session from 'express-session';
import SessionStore from './SessionStore';
import {Model, ModelCtor} from 'sequelize/types';
import sequelize from 'sequelize';
import sanitizeAuthRedirectUrl from '../utils/sanitizeAuthRedirectUrl';

const publicDir = path.join(__dirname, '../../public');

const authorize = (role: RoleName | null = null): Handler => (
  req,
  resp,
  next,
) => {
  if (req.user && (role == null || hasRole(role, req.user))) {
    return next();
  }
  if (req.url.startsWith('/api')) {
    resp.status(401).json({
      error: 'You must be logged in to access this resource!',
    });
  }
  req.session!.authRedirectUrl = sanitizeAuthRedirectUrl(req.url);
  resp.redirect('/auth/google');
  return;
};

const makeGetAllRoute = <RECORD extends {id: ID}>(
  ModelClass: ModelCtor<Model<RECORD, RECORD>>,
): Handler => async (req, resp, next) => {
  try {
    const {limit, offset, sortBy, sortOrder, ...where} = req.query;
    const models = await ModelClass.findAll({
      where: where as Partial<RECORD>,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: sortBy
        ? [[sortBy as string, sortOrder === 'DESC' ? 'DESC' : 'ASC']]
        : [],
    });
    const count = await ModelClass.count({where: where as Partial<RECORD>});
    const body: GetAllResponseBody<RECORD> = {
      count,
      limit: limit ? Number(limit) : null,
      offset: offset ? Number(offset) : 0,
      items: models.map((m) => m.get()),
    };
    resp.json(body);
  } catch (error) {
    req.log.error({error}, 'error');
    next(error);
  }
};

const makeGetOneByIdRoute = <RECORD extends {id: ID}>(
  ModelClass: ModelCtor<Model<RECORD, RECORD>>,
): Handler => async (req, resp, next) => {
  try {
    const {id} = req.params;
    const model = await ModelClass.findOne({
      where: {id},
    });
    if (!model) {
      next();
      return;
    }
    resp.json(model.get());
  } catch (error) {
    req.log.error({error}, 'error');
    next(error);
  }
};

const makeBulkRoute = <RECORD extends {id: ID}>(
  createFn: (
    record: Unsaved<RECORD>,
    user: UserWithRoles,
    transaction?: sequelize.Transaction,
  ) => Promise<RECORD>,
  updateFn: (
    record: RECORD,
    user: UserWithRoles,
    transaction?: sequelize.Transaction,
  ) => Promise<RECORD>,
  deleteFn: (
    id: ID,
    user: UserWithRoles,
    transaction?: sequelize.Transaction,
  ) => Promise<void>,
): Handler => async (req, resp, next) => {
  const actions: BulkMutationRequestBody<RECORD> = req.body;
  const result: BulkMutationResponseBody<RECORD> = {};
  try {
    await sql.transaction(async (t: sequelize.Transaction) => {
      if (actions.create) {
        result.created = await Promise.all(
          actions.create.map((r) => createFn(r, req.user!, t)),
        );
      }
      if (actions.update) {
        result.updated = await Promise.all(
          actions.update.map((r) => updateFn(r, req.user!, t)),
        );
      }
      if (actions.delete) {
        await Promise.all(
          actions.delete.map((id) => deleteFn(id, req.user!, t)),
        );
        result.deleted = actions.delete;
      }
    });
  } catch (error) {
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
  resp.write('<!doctype html>');
  renderToStaticNodeStream(<Page csrfToken={req.csrfToken()} />).pipe(resp);
};

const provideUserFromSession: Handler = (req, _resp, next) => {
  req.user = req.session?.user;
  next();
};

const sessionMiddleware = session({
  store: new SessionStore(),
  genid: () => uuid(),
  secret: process.env.SESSION_SECRET!,
  cookie: {
    secure: process.env.NODE_ENV !== 'development',
  },
  resave: false,
  saveUninitialized: true,
});

const makeTableRouter = <RECORD extends {id: ID}>(
  ModelClass: ModelCtor<Model<RECORD, RECORD>>,
  initRouter?: (router: express.Router) => express.Router | void,
) => {
  const router = express.Router();
  initRouter?.(router);

  const createFn = makeCreateRecord(ModelClass);
  const updateFn = makeUpdateRecord(ModelClass);
  const deleteFn = makeDeleteRecord(ModelClass);

  router.get('/', makeGetAllRoute<RECORD>(ModelClass));
  router.post('/', async (req, resp, next) => {
    const record = await createFn(req.body, req.user!);
    resp.json(record);
  });
  router.post('/bulk', makeBulkRoute(createFn, updateFn, deleteFn));
  router.get('/:id', makeGetOneByIdRoute<RECORD>(ModelClass));
  router.put('/:id', async (req, resp, next) => {
    const record = await updateFn(req.body, req.user!);
    resp.json(record);
  });
  router.delete('/:id', async (req, resp, next) => {
    const id = req.params.id;
    await deleteFn(id);
    resp.json(id);
  });
  return router;
};

const router = express
  .Router()
  .use(compression())
  .use(helmet())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(csurf({cookie: true}))
  .use(sessionMiddleware)
  .use(provideUserFromSession)
  .use(requestLogger)
  .use(express.static(publicDir, {index: false}))
  .get('/manifest.json', (req, resp) => resp.json(manifest))
  .get('/auth/google', googleLoginMiddleware)
  .get('/auth/google/callback', googleCallbackMiddleware)
  .get('/auth/user', sendCurrentUser)
  .get('/auth/logout', logout)
  .post('*', authorize('author'))
  .put('*', authorize('author'))
  .delete('*', authorize('author'))
  .use('/api/answers', makeTableRouter(Answer))
  .use('/api/books', makeTableRouter(Book))
  .use(
    '/api/chapters',
    makeTableRouter(Chapter, (r) =>
      r.get('/:chapterId/adjacent', async (req, resp, next) => {
        resp.json(await getAdjacentChaptersById(req.params.chapterId));
      }),
    ),
  )
  .use('/api/events', makeTableRouter(Event))
  .use('/api/list-items', makeTableRouter(ListItem))
  .use('/api/lists', makeTableRouter(List))
  .use(
    '/api/marks',
    makeTableRouter(Mark, (r) =>
      r.get('/byChapterId/:chapterId', async (req, resp, next) => {
        resp.json(await getAllMarksByChapterId(req.params.chapterId));
      }),
    ),
  )
  .use('/api/people-links', makeTableRouter(PersonLink))
  .use('/api/people', makeTableRouter(Person))
  .use('/api/places', makeTableRouter(Place))
  .use('/api/questions', makeTableRouter(Question))
  .use('/api/things', makeTableRouter(Thing))
  .use(
    '/api/verses',
    makeTableRouter(Verse, (r) =>
      r.get('/bySpeakerId/:speakerId', async (req, resp, next) => {
        const {speakerId} = req.params;
        const {limit, offset} = req.query;
        const [count, items] = await Promise.all([
          countVersesBySpeakerId(speakerId),
          getVersesAndMarksBySpeakerId(
            speakerId,
            // TODO: adding limit/offset here makes the query take 20s. figure out why
            limit ? Number(limit) : undefined,
            offset ? Number(offset) : undefined,
          ),
        ]);
        const body: GetAllResponseBody<MarkRecordPlus> = {
          count,
          limit: limit ? Number(limit) : null,
          offset: offset ? Number(offset) : 0,
          items,
        };
        resp.json(body);
      }),
    ),
  )
  .use('/api/volumes', makeTableRouter(Volume))
  .use('/api', (req, resp, next) => {
    resp.status(404).json(`404 Not Found: ${req.url}`);
  })
  .get('/manifest.json', (_req, resp) => {
    resp.status(404).send('');
  })
  .get('*', sendHtml); // TODO: whitelist html urls so that other stuff can respond w/404?

export default router;
