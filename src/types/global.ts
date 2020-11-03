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

  interface WorkerLocation {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    toString(): string;
  }

  interface ServiceWorker {
    location: WorkerLocation;
  }
}
