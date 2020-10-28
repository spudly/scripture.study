export interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

export interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
}
