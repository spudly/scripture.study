// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {UserWithRoles} from './records';

declare global {
  namespace Express {
    interface User extends UserWithRoles {}
    interface SessionData {
      user: UserWithRoles;
    }
  }

  interface CSSStyleDeclaration {
    overscrollBehaviorX: string;
  }
}
