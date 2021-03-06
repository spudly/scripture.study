// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {UserWithRoles} from './records';

declare module 'express-session' {
  interface SessionData {
    user: UserWithRoles;
    authRedirectUrl: string;
  }
}

declare global {
  const IS_DEV: boolean;
  const IS_PROD: boolean;
  const IS_TEST: boolean;

  namespace Express {
    interface User extends UserWithRoles {}
  }

  interface CSSStyleDeclaration {
    overscrollBehaviorX: string;
  }
}
