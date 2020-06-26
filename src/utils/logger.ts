import pino from 'pino';
import pinoHttp from 'pino-http';
import {IncomingMessage} from 'http';

export const logger = pino();

export const requestLogger = pinoHttp({
  reqCustomProps: (req: IncomingMessage & {cookies?: Object}) => ({
    cookies: req.cookies,
  }),
} as any);
