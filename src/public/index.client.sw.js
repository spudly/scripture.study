!(function (e) {
  var t = {};
  function a(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = {i: o, l: !1, exports: {}});
    return e[o].call(r.exports, r, r.exports, a), (r.l = !0), r.exports;
  }
  (a.m = e),
    (a.c = t),
    (a.d = function (e, t, o) {
      a.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o});
    }),
    (a.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
        Object.defineProperty(e, '__esModule', {value: !0});
    }),
    (a.t = function (e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (a.r(o),
        Object.defineProperty(o, 'default', {enumerable: !0, value: e}),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          a.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r),
          );
      return o;
    }),
    (a.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return a.d(t, 'a', t), t;
    }),
    (a.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (a.p = ''),
    a((a.s = 28));
})({
  1: function (e, t, a) {
    'use strict';
    a.d(t, 'b', function () {
      return n;
    }),
      a.d(t, 'a', function () {
        return s;
      });
    var o = a(4);
    const r = (e, ...t) => {
        const a = '/api/query/' + e,
          r = t.map((e) => 'arg=' + encodeURIComponent(e)).join('&'),
          n = `${a}${r ? '?' : ''}${r}`;
        return Object(o.a)(n);
      },
      n = {
        getAllVolumes: () => r('getAllVolumes'),
        getVolumeByTitle: (e) => r('getVolumeByTitle', e),
        getAllBooksByVolumeId: (e) => r('getAllBooksByVolumeId', e),
        getChapterById: (e, t) => r('getChapterById', e, t),
        getBookById: (e, t) => r('getBookById', e, t),
        getBookByTitle: (e, t) => r('getBookByTitle', e, t),
        getAllChaptersByBookId: (e, t) => r('getAllChaptersByBookId', e, t),
        getChapterByBookIdAndNumber: (e, t, a) =>
          r('getChapterByBookIdAndNumber', e, t, a),
        getAllVersesByChapterId: (e, t) => r('getAllVersesByChapterId', e, t),
        queryPrevChapterUrl: (e, t) => r('queryPrevChapterUrl', e, t),
        queryNextChapterUrl: (e, t) => r('queryNextChapterUrl', e, t),
        getAllSpeakers: () => r('getAllSpeakers'),
        getAllMarksByChapterId: (e, t) => r('getAllMarksByChapterId', e, t),
        getAllMarksByVolumeId: (e) => r('getAllMarksByVolumeId', e),
        getAllUpdatedMarksByVolumeId: (e, t) =>
          r('getAllUpdatedMarksByVolumeId', e, t),
      },
      s = {
        createOrUpdateMarks: async (e) =>
          (async (e, t) => {
            const a = await fetch('/api/mutation/' + e, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(t),
            });
            if (!a.ok) throw new Error(a.statusText);
          })('createOrUpdateMarks', e),
      };
  },
  26: function (e, t) {},
  28: function (e, t, a) {
    'use strict';
    a.r(t);
    var o = a(1),
      r = a(4);
    const n = async (e, t, a, o = []) => {
        const {
          oldVersion: r,
          target: {result: n, transaction: s},
        } = e;
        r < 1
          ? await ((e, t, a, o = []) =>
              new Promise((r, n) => {
                const s = e.createObjectStore(t, {keyPath: a});
                o.forEach((e) => {
                  s.indexNames.contains(e.name) ||
                    s.createIndex(e.name, e.keyPath);
                }),
                  s.transaction.addEventListener('complete', () => r(s)),
                  s.transaction.addEventListener('error', (e) =>
                    n(e.target.error),
                  );
              }))(n, t, a, o)
          : (async (e, t, a) => {
              const o = e.objectStore(t);
              a.forEach((e) => {
                o.indexNames.contains(e.name) ||
                  o.createIndex(e.name, e.keyPath);
              });
            })(s, t, o);
      },
      s = (e) =>
        n(e, 'marks', 'id', [
          {name: 'verseId', keyPath: 'verseId'},
          {name: 'chapterId', keyPath: 'chapterId'},
          {name: 'lastUpdated', keyPath: 'lastUpdated'},
        ]),
      l = (e) => n(e, 'meta', 'key'),
      i = (e) =>
        n(e, 'books', 'id', [
          {name: 'title', keyPath: 'title'},
          {name: 'sortPosition', keyPath: 'sortPosition'},
          {name: 'volumeId', keyPath: 'volumeId'},
        ]),
      c = (e) =>
        n(e, 'chapters', 'id', [
          {name: 'number', keyPath: 'number'},
          {name: 'volumeId', keyPath: 'volumeId'},
          {name: 'bookId', keyPath: 'bookId'},
          {name: 'bookId+number', keyPath: ['bookId', 'number']},
        ]),
      d = (e) =>
        n(e, 'verses', 'id', [
          {name: 'number', keyPath: 'number'},
          {name: 'volumeId', keyPath: 'volumeId'},
          {name: 'bookId', keyPath: 'bookId'},
          {name: 'chapterId', keyPath: 'chapterId'},
        ]),
      u = new Map(),
      y = (e) => async (t, a = !1) => {
        const o = u.get(t);
        if (o) return o;
        if (!a) {
          if (!(await indexedDB.databases()).some((e) => e.name === t))
            throw new Error(`db does not exist: [${t}]`);
        }
        const r = new Promise((a, o) => {
          const r = indexedDB.open(t, 8);
          r.addEventListener('error', () => o('failed to open db')),
            r.addEventListener('upgradeneeded', (a) => {
              console.log(`UPGRAGING ${t} db`),
                e(a),
                console.log('UPGRADE_NEEDED', t);
            }),
            r.addEventListener('success', (e) => {
              const t = e.target.result;
              t.addEventListener('error', (e) => console.error('db error', e)),
                a(t);
            });
        });
        return u.set(t, r), r;
      },
      m = async (e) => {
        await ((e) =>
          n(e, 'volumes', 'id', [
            {name: 'title', keyPath: 'title'},
            {name: 'sortPosition', keyPath: 'sortPosition'},
          ]))(e);
        const t = await Object(r.a)('/data/volumes.json');
        await g(e.target.result, 'volumes', t);
      },
      p = (e = !1) => y(m)('main', e),
      w = y(async (e) => {
        await Promise.all([l(e), i(e), c(e), d(e), s(e)]);
      }),
      g = async (e, t, a) => {
        const o = e.transaction([t], 'readwrite'),
          r = o.objectStore(t);
        return (
          await Promise.all(
            a.map((e) =>
              (async (e, t) =>
                new Promise((a, o) => {
                  const r = e.add(t);
                  r.addEventListener('success', () => a()),
                    r.addEventListener('error', (e) =>
                      o({error: e.target.error, value: t}),
                    );
                }))(r, e),
            ),
          ),
          new Promise((e, t) => {
            o.addEventListener('complete', () => {
              e();
            }),
              o.addEventListener('error', (e) => t(e.target.error));
          })
        );
      },
      h = async (e, t, a) => {
        const o = e.transaction([t], 'readwrite'),
          r = o.objectStore(t);
        return (
          await Promise.all(
            a.map((e) =>
              (async (e, t) =>
                new Promise((a, o) => {
                  const r = e.put(t);
                  r.addEventListener('success', () => a()),
                    r.addEventListener('error', (e) =>
                      o({error: e.target.error, value: t}),
                    );
                }))(r, e),
            ),
          ),
          new Promise((e, t) => {
            o.addEventListener('complete', () => {
              e();
            }),
              o.addEventListener('error', (e) => t(e.target.error));
          })
        );
      },
      k = async ({volume: e, books: t, chapters: a, verses: o}) => {
        const r = await w(e.id, !0);
        await Promise.all([
          g(r, 'books', t),
          g(r, 'chapters', a),
          g(r, 'verses', o),
        ]);
      },
      v = async (e, t, a, o) =>
        new Promise((r, n) => {
          const s = e.transaction([t]);
          try {
            const e = a
              ? s.objectStore(t).index(a).get(o)
              : s.objectStore(t).get(o);
            e.addEventListener('error', (e) => n(e.target.error)),
              e.addEventListener('success', (e) => r(e.target.result));
          } catch (e) {
            throw (console.log({error: e, storeName: t, index: a, q: o}), e);
          }
        }),
      I = (e) => async (...t) => {
        const a = await e(...t);
        if (null == a) throw new Error('null result');
        return a;
      },
      b = async (e, t, a, o) => {
        const r = await v(e, t, a, o);
        if (null == r)
          throw new Error(
            `get: null result (storeName: ${t}, index: ${a}, query: ${o})`,
          );
        return r;
      },
      f = async (e, t, a, o) =>
        new Promise((r, n) => {
          const s = e.transaction([t]),
            l = a
              ? s.objectStore(t).index(a).getAll(o)
              : s.objectStore(t).getAll(o);
          l.addEventListener('error', (e) => n(e.target.error)),
            l.addEventListener('success', (e) => {
              r(e.target.result);
            });
        }),
      B = async (e, t) => v(await w(e), 'books', 'sortPosition', t),
      P = I(B),
      E = async (e, t) => {
        const a = await C(e, t);
        if (a.number > 1) return N(e, a.bookId, a.number - 1);
        const o = await A(e, a.bookId);
        if (o.sortPosition > 1) {
          return (async (e, t) => {
            const a = await f(await w(e), 'chapters', 'bookId', t);
            return a.find((e) => e.number === a.length);
          })(e, (await P(e, o.sortPosition - 1)).id);
        }
        return null;
      },
      C = async (e, t) => b(await w(e), 'chapters', null, t),
      A = async (e, t) => b(await w(e), 'books', null, t),
      S = async (e) => {
        const t = await (async (e) => b(await p(), 'volumes', null, e))(
            e.volumeId,
          ),
          a = await A(e.volumeId, e.bookId);
        return `/${t.title.replace(/\s/g, '.')}/${a.title.replace(
          /\s/g,
          '.',
        )}/${e.number}`;
      },
      U = async (e, t, a) =>
        v(await w(e), 'chapters', 'bookId+number', [t, Number(a)]),
      N = I(U);
    p(!0);
    const O = {
        getAllVolumes: async () => f(await p(), 'volumes'),
        getVolumeByTitle: async (e) => b(await p(), 'volumes', 'title', e),
        getAllBooksByVolumeId: async (e) =>
          f(await w(e), 'books', 'volumeId', e),
        getBookById: A,
        getBookByTitle: async (e, t) => b(await w(e), 'books', 'title', t),
        getChapterById: C,
        getAllChaptersByBookId: async (e, t) =>
          f(await w(e), 'chapters', 'bookId', t),
        getChapterByBookIdAndNumber: N,
        getAllVersesByChapterId: async (e, t) =>
          f(await w(e), 'verses', 'chapterId', t),
        queryPrevChapterUrl: async (e, t) => {
          const a = await E(e, t);
          return a ? S(a) : null;
        },
        queryNextChapterUrl: async (e, t) => {
          const a = await (async (e, t) => {
            const a = await C(e, t),
              o = await U(e, a.bookId, a.number + 1);
            if (o) return o;
            const r = await A(e, a.bookId);
            console.log({book: r});
            const n = await B(e, r.sortPosition + 1);
            if ((console.log({nextBook: n}), n)) {
              const t = N(e, n.id, 1);
              return console.log({nextChapter: t}), t;
            }
            return null;
          })(e, t);
          return a ? S(a) : null;
        },
        getAllSpeakers: async () => f(await p(), 'speakers'),
        getAllMarksByChapterId: async (e, t) => {
          const a = await w(e);
          return (await f(a, 'marks', 'chapterId', t)).filter(
            (e) => e.isActive,
          );
        },
        getAllMarksByVolumeId: async (e) => {
          const t = await w(e);
          return (await f(t, 'marks')).filter((e) => e.isActive);
        },
        getAllUpdatedMarksByVolumeId: async (e, t) => {
          const a = await w(e);
          return (
            await f(a, 'marks', 'lastUpdated', IDBKeyRange.lowerBound(t))
          ).filter((e) => e.isActive);
        },
      },
      T = async (e, t = !0) => {
        const [a] = e;
        a &&
          (await (async (e, t) => {
            const a = await w(e);
            await h(a, 'marks', t);
          })(a.volumeId, e));
      };
    a(26);
    const x = [
        '/',
        '/manifest.json',
        '/favicon.ico',
        '/index.client.js',
        '/api/query/getAllVolumes',
      ],
      M = [/getAllMarksByChapterId/],
      j = async (e) => {
        var t, a;
        return (null !==
          (a =
            null !==
              (t = await (async (e) => {
                var t, a;
                const o = new URL(e.url),
                  [, r] =
                    null !== (t = o.pathname.match('^/api/query/(\\w+)')) &&
                    void 0 !== t
                      ? t
                      : [];
                if ((console.log('QUERY:', r), r && r in O)) {
                  console.log(`QUERY: ${r} is idb query`);
                  const t =
                      null !== (a = o.searchParams.getAll('arg')) &&
                      void 0 !== a
                        ? a
                        : [],
                    n = O[r];
                  if (!n)
                    throw (
                      (console.log(`QUERY: ${r} is not a valid query`),
                      new Error(r + ' is not a valid query'))
                    );
                  let s;
                  try {
                    s = await n(...t);
                  } catch (t) {
                    return (
                      console.log(
                        `QUERY: ${r} INDEXDB MISS (threw error): ${e.url}`,
                        t,
                      ),
                      null
                    );
                  }
                  return console.log('INDEXDB HIT: ' + e.url), L(s);
                }
                return (
                  console.log('not an idb query: ' + r),
                  console.log('INDEXDB MISS: ' + e.url),
                  null
                );
              })(e)) && void 0 !== t
              ? t
              : await (async (e) => {
                  const t = await caches.match(e);
                  return (
                    console.log(`CACHE ${t ? 'HIT' : 'MISS'}: ${e.url}`), t
                  );
                })(e)) && void 0 !== a
          ? a
          : await (async (e) => {
              const t = await fetch(e);
              if (t.ok && 'basic' === t.type && !M.some((t) => t.test(e.url))) {
                console.log('CACHE ADD: ' + e.url);
                (await caches.open('shuoink')).put(e, t.clone());
              } else console.log('DO NOT CACHE: ' + e.url);
              return t;
            })(e)
        ).clone();
      },
      L = (e) =>
        null != e
          ? new Response(JSON.stringify(e), {
              status: 200,
              statusText: 'OK',
              headers: {'Content-Type': 'application/json'},
            })
          : new Response(null, {status: 204, statusText: 'No Content'}),
      q = async (e) => {
        console.log('SYNC: ' + e);
        const t = await (async (e) => {
            var t;
            const a = await w(e),
              o = await v(a, 'meta', null, 'lastUpdated');
            return null !== (t = null == o ? void 0 : o.value) && void 0 !== t
              ? t
              : 0;
          })(e),
          a = Date.now(),
          r = await O.getAllUpdatedMarksByVolumeId(e, t);
        r.length
          ? (await o.a.createOrUpdateMarks(r),
            console.log(`SYNC: pushed local marks to server (${e})`))
          : console.log(`SYNC: no local marks to sync (${e})`);
        const n = await o.b.getAllUpdatedMarksByVolumeId(e, t);
        console.log(`SYNC: fetched remote marks (${e})`),
          n.length
            ? (await T(n), console.log(`SYNC: merged remote marks (${e})`, n))
            : console.log(`SYNC: no remote marks to merge (${e})`),
          await (async (e, t) => {
            const a = await w(e);
            return await h(a, 'meta', [{key: 'lastUpdated', value: t}]);
          })(e, a),
          console.log(`SYNC: volume ${e} synced`);
      };
    self.addEventListener('install', (e) => {
      e.waitUntil(
        (async () => {
          const e = await caches.open('shuoink');
          await e.addAll(x);
        })(),
      );
    }),
      self.addEventListener('fetch', (e) => {
        switch (
          (console.log('FETCH REQUEST:', e.request.method, e.request.url),
          e.request.method)
        ) {
          case 'GET':
            return void e.respondWith(j(e.request));
          case 'POST':
            return void e.respondWith(
              (async (e) => {
                const {pathname: t} = new URL(e.url);
                switch (t) {
                  case '/api/mutation/createOrUpdateMarks': {
                    const t = await e.clone().json();
                    return (
                      await T(t),
                      console.log('OPTIMISTIC RESPONSE: createOrUpdateMarks'),
                      L()
                    );
                  }
                  default:
                    throw new Error(
                      'Unhandled POST request in service worker: ' + e.url,
                    );
                }
              })(e.request),
            );
          default:
            console.log('NOT GET OR POST', e.request.method, e.request.url),
              e.respondWith(fetch(e.request));
        }
      }),
      self.addEventListener('sync', async (e) => {
        'sync-marks' === e.tag &&
          e.waitUntil(
            (async () => {
              try {
                console.log('SYNC: Syncing...');
                const e = (await indexedDB.databases()).flatMap((e) =>
                  'main' === e.name ? [] : [e.name],
                );
                await Promise.all(e.map(q)), console.log('SYNC: Complete');
              } catch (e) {
                console.log('SYNC: Failed', e);
              }
            })(),
          );
      }),
      self.addEventListener('backgroundfetchsuccess', (e) => {
        const t = e.registration;
        e.waitUntil(
          (async () => {
            const a = await t.matchAll();
            await Promise.all([
              ...a.map(async (e) => {
                const t = await e.responseReady,
                  {
                    volume: a,
                    books: o,
                    chapters: r,
                    verses: n,
                  } = await t.json();
                await Promise.all([
                  k({volume: a, books: o, chapters: r, verses: n}),
                  q(a.id),
                ]);
              }),
            ]),
              console.log('Background Fetch Complete'),
              e.updateUI({title: 'Download Complete!'});
          })(),
        );
      }),
      self.addEventListener('backgroundfetchclick', (e) => {
        self.clients.openWindow('/');
      });
    t.default = void 0;
  },
  4: function (e, t, a) {
    'use strict';
    t.a = async (...e) => {
      const t = await fetch(...e);
      if (!t.ok) throw new Error(t.statusText);
      return t.json();
    };
  },
});
