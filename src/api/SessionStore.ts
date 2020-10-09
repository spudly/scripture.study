import {Store} from 'express-session';
import {Op} from 'sequelize';
import {Session} from './api.postgres';
import {logger} from '../utils/logger';
import sequelize from 'sequelize';

type SessionMap = {[sessionId: string]: Express.SessionData};

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const PRUNE_INTERVAL = 5 * MINUTE;
const SESSION_DURATION = 3 * HOUR;

class SessionStore extends Store {
  constructor() {
    super();
    setInterval(() => this.prune(), PRUNE_INTERVAL);
  }

  async prune() {
    const numPruned = await Session.destroy({
      where: {
        expirationDate: {[Op.lt]: sequelize.fn('NOW')},
      },
    });
    logger.info(
      {numPruned},
      `[SessionStore]: Pruned ${numPruned} expired sessions`,
    );
  }

  all = async (
    callback: (
      error: Error | null | undefined,
      sessionMap: SessionMap | null | undefined,
    ) => void,
  ): Promise<void> => {
    let sessions: SessionMap | undefined = undefined;
    let error: Error | undefined = undefined;
    try {
      const sessionModels = await Session.findAll({where: {}});
      sessions = sessionModels.reduce<SessionMap>((prev, model) => {
        const {id, data} = model.get();
        return {
          ...prev,
          [id]: data,
        };
      }, {});
    } catch (err) {
      logger.error('[SessionStore] failed to get all sessions');
      error = err;
    }
    callback(error, sessions);
  };

  /**
   * Used to destroy/delete a session from the store given a session ID (sid).
   * The callback should be called as callback(error) once the session
   * is destroyed.
   */

  destroy = async (
    sessionId: string,
    callback?: (error?: Error | undefined) => void,
  ) => {
    let error: Error | undefined = undefined;
    try {
      logger.info('[SessionStore] destroyed session');
      await Session.destroy({where: {id: sessionId}});
    } catch (err) {
      logger.error('[SessionStore] failed to destroy session');
      error = err;
    }
    callback?.(error);
  };

  /**
   * Used to delete all sessions from the store. The callback should be called
   * as callback(error) once the store is cleared.
   */
  clear = async (callback?: (error?: Error) => void) => {
    let error: Error | undefined = undefined;
    try {
      logger.ingo('[SessionStore] destroyed all sessions');
      await Session.destroy({where: {}});
    } catch (err) {
      logger.error('[SessionStore] failed to destroy all sessions');
      error = err;
    }
    callback?.(error);
  };

  /**
   * Used to get the count of all sessions in the store. The callback should
   * be called as callback(error, len).
   */
  length = async (
    callback: (error?: Error, length?: number | null) => void,
  ) => {
    let error: Error | undefined = undefined;
    let length: number | null | undefined = undefined;
    try {
      length = await Session.count({where: {}});
      logger.info({num: length}, '[SessionStore} number of active sessions');
    } catch (err) {
      logger.error('[SessionStore] failed to get number of active sessions');
      error = err;
    }
    callback(error, length);
  };

  /**
   * Get a session from the store given a session ID (sid). The callback should
   * be called as callback(error, session).
   *
   * The session argument should be a session if found, otherwise null or
   * undefined if the session was not found (and there was no error). A special
   * case is made when error.code === 'ENOENT' to act like callback(null, null).
   */
  get = async (
    sessionId: string,
    callback: (error?: Error, session?: Express.SessionData | null) => void,
  ) => {
    let error: Error | undefined = undefined;
    let data: Express.SessionData | null | undefined = undefined;
    try {
      const model = await Session.findOne({where: {id: sessionId}});
      data = model?.get().data;
      logger.info('[SessionStore] session data');
    } catch (err) {
      logger.error('[SessionStore] failed to get session data');
      error = err;
    }
    callback(error, data);
  };

  /**
   * Upsert a session into the store given a session ID (sid) and session
   * (session) object. The callback should be called as callback(error) once
   * the session has been set in the store.
   */
  set = async (
    sessionId: string,
    data: Express.SessionData,
    callback?: (error?: Error) => void,
  ) => {
    let error: Error | undefined = undefined;
    try {
      const model = await Session.findOne({where: {id: sessionId}});
      const expirationDate = Date.now() + SESSION_DURATION;
      if (model) {
        await model.update({data, expirationDate});
        logger.info('[SessionSture] updated session');
      } else {
        await Session.create({id: sessionId, data, expirationDate});
        logger.info('[SessionStore] created session');
      }
    } catch (err) {
      logger.error('[SessionStore] failed to create/update session');
      error = err;
    }
    callback?.(error);
  };

  /**
   * This recommended method is used to "touch" a given session given a
   * session ID (sid) and session (session) object. The callback should be
   * called as callback(error) once the session has been touched.
   *
   * This is primarily used when the store will automatically delete idle
   * sessions and this method is used to signal to the store the given session
   * is active, potentially resetting the idle timer.
   */
  touch = async (
    sessionId: string,
    _session: Express.SessionData,
    callback?: (error?: Error) => void,
  ) => {
    let error: Error | undefined = undefined;
    try {
      const model = await Session.findOne({where: {id: sessionId}});
      if (!model) {
        throw new Error('[SessionStore] Session not found');
      }
      const expirationDate = Date.now() + SESSION_DURATION;
      await model.update({expirationDate});
      logger.info({expirationDate}, '[SessionStore] touched session');
    } catch (err) {
      logger.error('[SessionStore] failed to touch session');
      error = err;
    }
    callback?.(error);
  };
}

export default SessionStore;
