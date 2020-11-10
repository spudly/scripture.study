declare global {
  interface ServiceWorkerEventMap extends AbstractWorkerEventMap {
    statechange: Event;
    fetch: FetchEvent;
    install: ExtendableEvent;
    activate: ExtendableEvent;
  }

  interface Client {
    postMessage(message: any, transfer: any): void;
    readonly id: string;
    readonly type: 'window' | 'worker' | 'sharedworker';
    readonly url: string;
  }

  interface WindowClient {
    focus(): Promise<WindowClient>;
    navigate(url: string): Promise<WindowClient>;
    readonly focused: boolean;
    readonly visibilityState: 'hidden' | 'visible' | 'prerender';
  }

  interface Clients {
    get(id: string): Promise<Client>;
    matchAll(options: {
      includeUncontrolled?: boolean;
      type?: 'window' | 'worker' | 'sharedworker' | 'all';
    }): Promise<Client>;
    openWindow(url: string): Promise<WindowClient | null>;
    claim(): Promise<undefined>;
  }

  interface ServiceWorker {
    skipWaiting(): Promise<void>;
    clients: Clients;
  }
}

export interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

export interface FetchEvent extends ExtendableEvent {
  request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
}
