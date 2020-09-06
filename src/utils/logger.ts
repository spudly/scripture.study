import pino from 'pino';
import pinoHttp from 'pino-http';
import {IncomingMessage} from 'http';

export const logger = pino();

export const requestLogger = pinoHttp({
  reqCustomProps: (
    req: IncomingMessage & {cookies?: Object; sessionId?: string},
  ) => ({
    cookies: req.cookies,
    sessionId: req.sessionId,
  }),
} as any);
