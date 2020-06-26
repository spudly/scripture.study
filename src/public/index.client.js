!(function (e) {
  var n = {};
  function t(r) {
    if (n[r]) return n[r].exports;
    var o = (n[r] = {i: r, l: !1, exports: {}});
    return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  (t.m = e),
    (t.c = n),
    (t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: r});
    }),
    (t.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
        Object.defineProperty(e, '__esModule', {value: !0});
    }),
    (t.t = function (e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e;
      if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (t.r(r),
        Object.defineProperty(r, 'default', {enumerable: !0, value: e}),
        2 & n && 'string' != typeof e)
      )
        for (var o in e)
          t.d(
            r,
            o,
            function (n) {
              return e[n];
            }.bind(null, o),
          );
      return r;
    }),
    (t.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(n, 'a', n), n;
    }),
    (t.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.p = ''),
    t((t.s = 27));
})([
  function (e, n, t) {
    'use strict';
    e.exports = t(13);
  },
  function (e, n, t) {
    'use strict';
    t.d(n, 'b', function () {
      return a;
    }),
      t.d(n, 'a', function () {
        return i;
      });
    var r = t(4);
    const o = (e, ...n) => {
        const t = '/api/query/' + e,
          o = n.map((e) => 'arg=' + encodeURIComponent(e)).join('&'),
          a = `${t}${o ? '?' : ''}${o}`;
        return Object(r.a)(a);
      },
      a = {
        getAllVolumes: () => o('getAllVolumes'),
        getVolumeByTitle: (e) => o('getVolumeByTitle', e),
        getAllBooksByVolumeId: (e) => o('getAllBooksByVolumeId', e),
        getChapterById: (e, n) => o('getChapterById', e, n),
        getBookById: (e, n) => o('getBookById', e, n),
        getBookByTitle: (e, n) => o('getBookByTitle', e, n),
        getAllChaptersByBookId: (e, n) => o('getAllChaptersByBookId', e, n),
        getChapterByBookIdAndNumber: (e, n, t) =>
          o('getChapterByBookIdAndNumber', e, n, t),
        getAllVersesByChapterId: (e, n) => o('getAllVersesByChapterId', e, n),
        queryPrevChapterUrl: (e, n) => o('queryPrevChapterUrl', e, n),
        queryNextChapterUrl: (e, n) => o('queryNextChapterUrl', e, n),
        getAllSpeakers: () => o('getAllSpeakers'),
        getAllMarksByChapterId: (e, n) => o('getAllMarksByChapterId', e, n),
        getAllMarksByVolumeId: (e) => o('getAllMarksByVolumeId', e),
        getAllUpdatedMarksByVolumeId: (e, n) =>
          o('getAllUpdatedMarksByVolumeId', e, n),
      },
      i = {
        createOrUpdateMarks: async (e) =>
          (async (e, n) => {
            const t = await fetch('/api/mutation/' + e, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(n),
            });
            if (!t.ok) throw new Error(t.statusText);
          })('createOrUpdateMarks', e),
      };
  },
  function (e, n, t) {
    var r;
    /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function () {
      'use strict';
      var t = {}.hasOwnProperty;
      function o() {
        for (var e = [], n = 0; n < arguments.length; n++) {
          var r = arguments[n];
          if (r) {
            var a = typeof r;
            if ('string' === a || 'number' === a) e.push(r);
            else if (Array.isArray(r) && r.length) {
              var i = o.apply(null, r);
              i && e.push(i);
            } else if ('object' === a)
              for (var l in r) t.call(r, l) && r[l] && e.push(l);
          }
        }
        return e.join(' ');
      }
      e.exports
        ? ((o.default = o), (e.exports = o))
        : void 0 ===
            (r = function () {
              return o;
            }.apply(n, [])) || (e.exports = r);
    })();
  },
  function (e, n, t) {
    'use strict';
    function r(e, n) {
      (e.prototype = Object.create(n.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = n);
    }
    t.d(n, 'a', function () {
      return r;
    });
  },
  function (e, n, t) {
    'use strict';
    n.a = async (...e) => {
      const n = await fetch(...e);
      if (!n.ok) throw new Error(n.statusText);
      return n.json();
    };
  },
  function (e, n, t) {
    e.exports = t(17)();
  },
  ,
  function (e, n, t) {
    'use strict';
    (function (e) {
      var r = t(0),
        o = t.n(r),
        a = t(3),
        i = t(5),
        l = t.n(i),
        u =
          'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof window
            ? window
            : void 0 !== e
            ? e
            : {};
      function c(e) {
        var n = [];
        return {
          on: function (e) {
            n.push(e);
          },
          off: function (e) {
            n = n.filter(function (n) {
              return n !== e;
            });
          },
          get: function () {
            return e;
          },
          set: function (t, r) {
            (e = t),
              n.forEach(function (n) {
                return n(e, r);
              });
          },
        };
      }
      var s =
        o.a.createContext ||
        function (e, n) {
          var t,
            o,
            i,
            s =
              '__create-react-context-' +
              ((u[(i = '__global_unique_id__')] = (u[i] || 0) + 1) + '__'),
            f = (function (e) {
              function t() {
                var n;
                return (
                  ((n = e.apply(this, arguments) || this).emitter = c(
                    n.props.value,
                  )),
                  n
                );
              }
              Object(a.a)(t, e);
              var r = t.prototype;
              return (
                (r.getChildContext = function () {
                  var e;
                  return ((e = {})[s] = this.emitter), e;
                }),
                (r.componentWillReceiveProps = function (e) {
                  if (this.props.value !== e.value) {
                    var t,
                      r = this.props.value,
                      o = e.value;
                    (
                      (a = r) === (i = o)
                        ? 0 !== a || 1 / a == 1 / i
                        : a != a && i != i
                    )
                      ? (t = 0)
                      : ((t = 'function' == typeof n ? n(r, o) : 1073741823),
                        0 !== (t |= 0) && this.emitter.set(e.value, t));
                  }
                  var a, i;
                }),
                (r.render = function () {
                  return this.props.children;
                }),
                t
              );
            })(r.Component);
          f.childContextTypes = (((t = {})[s] = l.a.object.isRequired), t);
          var d = (function (n) {
            function t() {
              var e;
              return (
                ((e = n.apply(this, arguments) || this).state = {
                  value: e.getValue(),
                }),
                (e.onUpdate = function (n, t) {
                  0 != ((0 | e.observedBits) & t) &&
                    e.setState({value: e.getValue()});
                }),
                e
              );
            }
            Object(a.a)(t, n);
            var r = t.prototype;
            return (
              (r.componentWillReceiveProps = function (e) {
                var n = e.observedBits;
                this.observedBits = null == n ? 1073741823 : n;
              }),
              (r.componentDidMount = function () {
                this.context[s] && this.context[s].on(this.onUpdate);
                var e = this.props.observedBits;
                this.observedBits = null == e ? 1073741823 : e;
              }),
              (r.componentWillUnmount = function () {
                this.context[s] && this.context[s].off(this.onUpdate);
              }),
              (r.getValue = function () {
                return this.context[s] ? this.context[s].get() : e;
              }),
              (r.render = function () {
                return ((e = this.props.children), Array.isArray(e) ? e[0] : e)(
                  this.state.value,
                );
                var e;
              }),
              t
            );
          })(r.Component);
          return (
            (d.contextTypes = (((o = {})[s] = l.a.object), o)),
            {Provider: f, Consumer: d}
          );
        };
      n.a = s;
    }.call(this, t(19)));
  },
  function (e, n, t) {
    var r = t(20);
    (e.exports = p),
      (e.exports.parse = a),
      (e.exports.compile = function (e, n) {
        return l(a(e, n), n);
      }),
      (e.exports.tokensToFunction = l),
      (e.exports.tokensToRegExp = d);
    var o = new RegExp(
      [
        '(\\\\.)',
        '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))',
      ].join('|'),
      'g',
    );
    function a(e, n) {
      for (
        var t, r = [], a = 0, i = 0, l = '', s = (n && n.delimiter) || '/';
        null != (t = o.exec(e));

      ) {
        var f = t[0],
          d = t[1],
          p = t.index;
        if (((l += e.slice(i, p)), (i = p + f.length), d)) l += d[1];
        else {
          var m = e[i],
            h = t[2],
            g = t[3],
            v = t[4],
            b = t[5],
            y = t[6],
            w = t[7];
          l && (r.push(l), (l = ''));
          var x = null != h && null != m && m !== h,
            k = '+' === y || '*' === y,
            E = '?' === y || '*' === y,
            T = t[2] || s,
            C = v || b;
          r.push({
            name: g || a++,
            prefix: h || '',
            delimiter: T,
            optional: E,
            repeat: k,
            partial: x,
            asterisk: !!w,
            pattern: C ? c(C) : w ? '.*' : '[^' + u(T) + ']+?',
          });
        }
      }
      return i < e.length && (l += e.substr(i)), l && r.push(l), r;
    }
    function i(e) {
      return encodeURI(e).replace(/[\/?#]/g, function (e) {
        return '%' + e.charCodeAt(0).toString(16).toUpperCase();
      });
    }
    function l(e, n) {
      for (var t = new Array(e.length), o = 0; o < e.length; o++)
        'object' == typeof e[o] &&
          (t[o] = new RegExp('^(?:' + e[o].pattern + ')$', f(n)));
      return function (n, o) {
        for (
          var a = '',
            l = n || {},
            u = (o || {}).pretty ? i : encodeURIComponent,
            c = 0;
          c < e.length;
          c++
        ) {
          var s = e[c];
          if ('string' != typeof s) {
            var f,
              d = l[s.name];
            if (null == d) {
              if (s.optional) {
                s.partial && (a += s.prefix);
                continue;
              }
              throw new TypeError('Expected "' + s.name + '" to be defined');
            }
            if (r(d)) {
              if (!s.repeat)
                throw new TypeError(
                  'Expected "' +
                    s.name +
                    '" to not repeat, but received `' +
                    JSON.stringify(d) +
                    '`',
                );
              if (0 === d.length) {
                if (s.optional) continue;
                throw new TypeError(
                  'Expected "' + s.name + '" to not be empty',
                );
              }
              for (var p = 0; p < d.length; p++) {
                if (((f = u(d[p])), !t[c].test(f)))
                  throw new TypeError(
                    'Expected all "' +
                      s.name +
                      '" to match "' +
                      s.pattern +
                      '", but received `' +
                      JSON.stringify(f) +
                      '`',
                  );
                a += (0 === p ? s.prefix : s.delimiter) + f;
              }
            } else {
              if (
                ((f = s.asterisk
                  ? encodeURI(d).replace(/[?#]/g, function (e) {
                      return '%' + e.charCodeAt(0).toString(16).toUpperCase();
                    })
                  : u(d)),
                !t[c].test(f))
              )
                throw new TypeError(
                  'Expected "' +
                    s.name +
                    '" to match "' +
                    s.pattern +
                    '", but received "' +
                    f +
                    '"',
                );
              a += s.prefix + f;
            }
          } else a += s;
        }
        return a;
      };
    }
    function u(e) {
      return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
    }
    function c(e) {
      return e.replace(/([=!:$\/()])/g, '\\$1');
    }
    function s(e, n) {
      return (e.keys = n), e;
    }
    function f(e) {
      return e && e.sensitive ? '' : 'i';
    }
    function d(e, n, t) {
      r(n) || ((t = n || t), (n = []));
      for (
        var o = (t = t || {}).strict, a = !1 !== t.end, i = '', l = 0;
        l < e.length;
        l++
      ) {
        var c = e[l];
        if ('string' == typeof c) i += u(c);
        else {
          var d = u(c.prefix),
            p = '(?:' + c.pattern + ')';
          n.push(c),
            c.repeat && (p += '(?:' + d + p + ')*'),
            (i += p = c.optional
              ? c.partial
                ? d + '(' + p + ')?'
                : '(?:' + d + '(' + p + '))?'
              : d + '(' + p + ')');
        }
      }
      var m = u(t.delimiter || '/'),
        h = i.slice(-m.length) === m;
      return (
        o || (i = (h ? i.slice(0, -m.length) : i) + '(?:' + m + '(?=$))?'),
        (i += a ? '$' : o && h ? '' : '(?=' + m + '|$)'),
        s(new RegExp('^' + i, f(t)), n)
      );
    }
    function p(e, n, t) {
      return (
        r(n) || ((t = n || t), (n = [])),
        (t = t || {}),
        e instanceof RegExp
          ? (function (e, n) {
              var t = e.source.match(/\((?!\?)/g);
              if (t)
                for (var r = 0; r < t.length; r++)
                  n.push({
                    name: r,
                    prefix: null,
                    delimiter: null,
                    optional: !1,
                    repeat: !1,
                    partial: !1,
                    asterisk: !1,
                    pattern: null,
                  });
              return s(e, n);
            })(e, n)
          : r(e)
          ? (function (e, n, t) {
              for (var r = [], o = 0; o < e.length; o++)
                r.push(p(e[o], n, t).source);
              return s(new RegExp('(?:' + r.join('|') + ')', f(t)), n);
            })(e, n, t)
          : (function (e, n, t) {
              return d(a(e, t), n, t);
            })(e, n, t)
      );
    }
  },
  function (e, n, t) {
    'use strict';
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
        Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      a = Object.prototype.propertyIsEnumerable;
    function i(e) {
      if (null == e)
        throw new TypeError(
          'Object.assign cannot be called with null or undefined',
        );
      return Object(e);
    }
    e.exports = (function () {
      try {
        if (!Object.assign) return !1;
        var e = new String('abc');
        if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var n = {}, t = 0; t < 10; t++)
          n['_' + String.fromCharCode(t)] = t;
        if (
          '0123456789' !==
          Object.getOwnPropertyNames(n)
            .map(function (e) {
              return n[e];
            })
            .join('')
        )
          return !1;
        var r = {};
        return (
          'abcdefghijklmnopqrst'.split('').forEach(function (e) {
            r[e] = e;
          }),
          'abcdefghijklmnopqrst' === Object.keys(Object.assign({}, r)).join('')
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Object.assign
      : function (e, n) {
          for (var t, l, u = i(e), c = 1; c < arguments.length; c++) {
            for (var s in (t = Object(arguments[c])))
              o.call(t, s) && (u[s] = t[s]);
            if (r) {
              l = r(t);
              for (var f = 0; f < l.length; f++)
                a.call(t, l[f]) && (u[l[f]] = t[l[f]]);
            }
          }
          return u;
        };
  },
  function (e, n, t) {
    'use strict';
    e.exports = t(21);
  },
  function (e, n, t) {
    'use strict';
    !(function e() {
      if (
        'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      ) {
        0;
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (e) {
          console.error(e);
        }
      }
    })(),
      (e.exports = t(14));
  },
  function (e, n, t) {
    'use strict';
    var r = t(10),
      o = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      a = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      i = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      l = {};
    function u(e) {
      return r.isMemo(e) ? i : l[e.$$typeof] || o;
    }
    (l[r.ForwardRef] = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    }),
      (l[r.Memo] = i);
    var c = Object.defineProperty,
      s = Object.getOwnPropertyNames,
      f = Object.getOwnPropertySymbols,
      d = Object.getOwnPropertyDescriptor,
      p = Object.getPrototypeOf,
      m = Object.prototype;
    e.exports = function e(n, t, r) {
      if ('string' != typeof t) {
        if (m) {
          var o = p(t);
          o && o !== m && e(n, o, r);
        }
        var i = s(t);
        f && (i = i.concat(f(t)));
        for (var l = u(n), h = u(t), g = 0; g < i.length; ++g) {
          var v = i[g];
          if (!(a[v] || (r && r[v]) || (h && h[v]) || (l && l[v]))) {
            var b = d(t, v);
            try {
              c(n, v, b);
            } catch (e) {}
          }
        }
      }
      return n;
    };
  },
  function (e, n, t) {
    'use strict';
    /** @license React v0.0.0-experimental-e5d06e34b
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = t(9),
      o = 60103,
      a = 60106;
    (n.Fragment = 60107), (n.StrictMode = 60108), (n.Profiler = 60114);
    var i = 60109,
      l = 60110,
      u = 60112;
    (n.Suspense = 60113), (n.SuspenseList = 60120);
    var c = 60115,
      s = 60116,
      f = 60121;
    if ('function' == typeof Symbol && Symbol.for) {
      var d = Symbol.for;
      (o = d('react.element')),
        (a = d('react.portal')),
        (n.Fragment = d('react.fragment')),
        (n.StrictMode = d('react.strict_mode')),
        (n.Profiler = d('react.profiler')),
        (i = d('react.provider')),
        (l = d('react.context')),
        (u = d('react.forward_ref')),
        (n.Suspense = d('react.suspense')),
        (n.SuspenseList = d('react.suspense_list')),
        (c = d('react.memo')),
        (s = d('react.lazy')),
        (f = d('react.block'));
    }
    var p = 'function' == typeof Symbol && Symbol.iterator;
    function m(e) {
      for (
        var n = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
          t = 1;
        t < arguments.length;
        t++
      )
        n += '&args[]=' + encodeURIComponent(arguments[t]);
      return (
        'Minified React error #' +
        e +
        '; visit ' +
        n +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    var h = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      g = {};
    function v(e, n, t) {
      (this.props = e),
        (this.context = n),
        (this.refs = g),
        (this.updater = t || h);
    }
    function b() {}
    function y(e, n, t) {
      (this.props = e),
        (this.context = n),
        (this.refs = g),
        (this.updater = t || h);
    }
    (v.prototype.isReactComponent = {}),
      (v.prototype.setState = function (e, n) {
        if ('object' != typeof e && 'function' != typeof e && null != e)
          throw Error(m(85));
        this.updater.enqueueSetState(this, e, n, 'setState');
      }),
      (v.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
      }),
      (b.prototype = v.prototype);
    var w = (y.prototype = new b());
    (w.constructor = y), r(w, v.prototype), (w.isPureReactComponent = !0);
    var x = {current: null},
      k = Object.prototype.hasOwnProperty,
      E = {key: !0, ref: !0, __self: !0, __source: !0};
    function T(e, n, t) {
      var r,
        a = {},
        i = null,
        l = null;
      if (null != n)
        for (r in (void 0 !== n.ref && (l = n.ref),
        void 0 !== n.key && (i = '' + n.key),
        n))
          k.call(n, r) && !E.hasOwnProperty(r) && (a[r] = n[r]);
      var u = arguments.length - 2;
      if (1 === u) a.children = t;
      else if (1 < u) {
        for (var c = Array(u), s = 0; s < u; s++) c[s] = arguments[s + 2];
        a.children = c;
      }
      if (e && e.defaultProps)
        for (r in (u = e.defaultProps)) void 0 === a[r] && (a[r] = u[r]);
      return {
        $$typeof: o,
        type: e,
        key: i,
        ref: l,
        props: a,
        _owner: x.current,
      };
    }
    function C(e) {
      return 'object' == typeof e && null !== e && e.$$typeof === o;
    }
    var S = /\/+/g;
    function P(e, n) {
      return 'object' == typeof e && null !== e && null != e.key
        ? (function (e) {
            var n = {'=': '=0', ':': '=2'};
            return (
              '$' +
              e.replace(/[=:]/g, function (e) {
                return n[e];
              })
            );
          })('' + e.key)
        : n.toString(36);
    }
    function _(e, n, t, r, i) {
      var l = typeof e;
      ('undefined' !== l && 'boolean' !== l) || (e = null);
      var u = !1;
      if (null === e) u = !0;
      else
        switch (l) {
          case 'string':
          case 'number':
            u = !0;
            break;
          case 'object':
            switch (e.$$typeof) {
              case o:
              case a:
                u = !0;
            }
        }
      if (u)
        return (
          (i = i((u = e))),
          (e = '' === r ? '.' + P(u, 0) : r),
          Array.isArray(i)
            ? ((t = ''),
              null != e && (t = e.replace(S, '$&/') + '/'),
              _(i, n, t, '', function (e) {
                return e;
              }))
            : null != i &&
              (C(i) &&
                (i = (function (e, n) {
                  return {
                    $$typeof: o,
                    type: e.type,
                    key: n,
                    ref: e.ref,
                    props: e.props,
                    _owner: e._owner,
                  };
                })(
                  i,
                  t +
                    (!i.key || (u && u.key === i.key)
                      ? ''
                      : ('' + i.key).replace(S, '$&/') + '/') +
                    e,
                )),
              n.push(i)),
          1
        );
      if (((u = 0), (r = '' === r ? '.' : r + ':'), Array.isArray(e)))
        for (var c = 0; c < e.length; c++) {
          var s = r + P((l = e[c]), c);
          u += _(l, n, t, s, i);
        }
      else if (
        'function' ==
        typeof (s = (function (e) {
          return null === e || 'object' != typeof e
            ? null
            : 'function' == typeof (e = (p && e[p]) || e['@@iterator'])
            ? e
            : null;
        })(e))
      )
        for (e = s.call(e), c = 0; !(l = e.next()).done; )
          u += _((l = l.value), n, t, (s = r + P(l, c++)), i);
      else if ('object' === l)
        throw (
          ((n = '' + e),
          Error(
            m(
              31,
              '[object Object]' === n
                ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                : n,
              '',
            ),
          ))
        );
      return u;
    }
    function N(e, n, t) {
      if (null == e) return e;
      var r = [],
        o = 0;
      return (
        _(e, r, '', '', function (e) {
          return n.call(t, e, o++);
        }),
        r
      );
    }
    function O(e) {
      if (-1 === e._status) {
        var n = e._result;
        (n = n()),
          (e._status = 0),
          (e._result = n),
          n.then(
            function (n) {
              0 === e._status &&
                ((n = n.default), (e._status = 1), (e._result = n));
            },
            function (n) {
              0 === e._status && ((e._status = 2), (e._result = n));
            },
          );
      }
      if (1 === e._status) return e._result;
      throw e._result;
    }
    function M(e) {
      return {
        $$typeof: f,
        _data: e.load.apply(null, e.args),
        _render: e.render,
      };
    }
    var z = {current: null};
    function I() {
      var e = z.current;
      if (null === e) throw Error(m(321));
      return e;
    }
    var R = {suspense: null},
      L = {
        ReactCurrentDispatcher: z,
        ReactCurrentBatchConfig: R,
        ReactCurrentOwner: x,
        IsSomeRendererActing: {current: !1},
        assign: r,
      };
    (n.Children = {
      map: N,
      forEach: function (e, n, t) {
        N(
          e,
          function () {
            n.apply(this, arguments);
          },
          t,
        );
      },
      count: function (e) {
        var n = 0;
        return (
          N(e, function () {
            n++;
          }),
          n
        );
      },
      toArray: function (e) {
        return (
          N(e, function (e) {
            return e;
          }) || []
        );
      },
      only: function (e) {
        if (!C(e)) throw Error(m(143));
        return e;
      },
    }),
      (n.Component = v),
      (n.PureComponent = y),
      (n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L),
      (n.block = function (e, n) {
        return void 0 === n
          ? function () {
              return {$$typeof: f, _data: void 0, _render: e};
            }
          : function () {
              return {
                $$typeof: s,
                _payload: {load: n, args: arguments, render: e},
                _init: M,
              };
            };
      }),
      (n.cloneElement = function (e, n, t) {
        if (null == e) throw Error(m(267, e));
        var a = r({}, e.props),
          i = e.key,
          l = e.ref,
          u = e._owner;
        if (null != n) {
          if (
            (void 0 !== n.ref && ((l = n.ref), (u = x.current)),
            void 0 !== n.key && (i = '' + n.key),
            e.type && e.type.defaultProps)
          )
            var c = e.type.defaultProps;
          for (s in n)
            k.call(n, s) &&
              !E.hasOwnProperty(s) &&
              (a[s] = void 0 === n[s] && void 0 !== c ? c[s] : n[s]);
        }
        var s = arguments.length - 2;
        if (1 === s) a.children = t;
        else if (1 < s) {
          c = Array(s);
          for (var f = 0; f < s; f++) c[f] = arguments[f + 2];
          a.children = c;
        }
        return {$$typeof: o, type: e.type, key: i, ref: l, props: a, _owner: u};
      }),
      (n.createContext = function (e, n) {
        return (
          void 0 === n && (n = null),
          ((e = {
            $$typeof: l,
            _calculateChangedBits: n,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = {$$typeof: i, _context: e}),
          (e.Consumer = e)
        );
      }),
      (n.createElement = T),
      (n.createFactory = function (e) {
        var n = T.bind(null, e);
        return (n.type = e), n;
      }),
      (n.createMutableSource = function (e, n) {
        return {
          _getVersion: n,
          _source: e,
          _workInProgressVersionPrimary: null,
          _workInProgressVersionSecondary: null,
        };
      }),
      (n.createRef = function () {
        return {current: null};
      }),
      (n.forwardRef = function (e) {
        return {$$typeof: u, render: e};
      }),
      (n.isValidElement = C),
      (n.lazy = function (e) {
        return {$$typeof: s, _payload: {_status: -1, _result: e}, _init: O};
      }),
      (n.memo = function (e, n) {
        return {$$typeof: c, type: e, compare: void 0 === n ? null : n};
      }),
      (n.unstable_useOpaqueIdentifier = function () {
        return I().useOpaqueIdentifier();
      }),
      (n.unstable_withSuspenseConfig = function (e, n) {
        var t = R.suspense;
        R.suspense = void 0 === n ? null : n;
        try {
          e();
        } finally {
          R.suspense = t;
        }
      }),
      (n.useCallback = function (e, n) {
        return I().useCallback(e, n);
      }),
      (n.useContext = function (e, n) {
        return I().useContext(e, n);
      }),
      (n.useDebugValue = function () {}),
      (n.useDeferredValue = function (e, n) {
        return I().useDeferredValue(e, n);
      }),
      (n.useEffect = function (e, n) {
        return I().useEffect(e, n);
      }),
      (n.useImperativeHandle = function (e, n, t) {
        return I().useImperativeHandle(e, n, t);
      }),
      (n.useLayoutEffect = function (e, n) {
        return I().useLayoutEffect(e, n);
      }),
      (n.useMemo = function (e, n) {
        return I().useMemo(e, n);
      }),
      (n.useMutableSource = function (e, n, t) {
        return I().useMutableSource(e, n, t);
      }),
      (n.useReducer = function (e, n, t) {
        return I().useReducer(e, n, t);
      }),
      (n.useRef = function (e) {
        return I().useRef(e);
      }),
      (n.useState = function (e) {
        return I().useState(e);
      }),
      (n.useTransition = function (e) {
        return I().useTransition(e);
      }),
      (n.version = '16.13.1-experimental-e5d06e34b');
  },
  function (e, n, t) {
    'use strict';
    /** @license React v0.0.0-experimental-e5d06e34b
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = t(0),
      o = t(9),
      a = t(15);
    function i(e) {
      for (
        var n = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
          t = 1;
        t < arguments.length;
        t++
      )
        n += '&args[]=' + encodeURIComponent(arguments[t]);
      return (
        'Minified React error #' +
        e +
        '; visit ' +
        n +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    if (!r) throw Error(i(227));
    function l(e, n, t, r, o, a, i, l, u) {
      var c = Array.prototype.slice.call(arguments, 3);
      try {
        n.apply(t, c);
      } catch (e) {
        this.onError(e);
      }
    }
    var u = !1,
      c = null,
      s = !1,
      f = null,
      d = {
        onError: function (e) {
          (u = !0), (c = e);
        },
      };
    function p(e, n, t, r, o, a, i, s, f) {
      (u = !1), (c = null), l.apply(d, arguments);
    }
    var m = null;
    function h(e, n, t) {
      var r = e.type || 'unknown-event';
      (e.currentTarget = m(t)),
        (function (e, n, t, r, o, a, l, d, m) {
          if ((p.apply(this, arguments), u)) {
            if (!u) throw Error(i(198));
            var h = c;
            (u = !1), (c = null), s || ((s = !0), (f = h));
          }
        })(r, n, void 0, e),
        (e.currentTarget = null);
    }
    var g = null,
      v = {};
    function b() {
      if (g)
        for (var e in v) {
          var n = v[e],
            t = g.indexOf(e);
          if (!(-1 < t)) throw Error(i(96, e));
          if (!w[t]) {
            if (!n.extractEvents) throw Error(i(97, e));
            for (var r in ((w[t] = n), (t = n.eventTypes))) {
              var o = void 0,
                a = t[r],
                l = r;
              if (x.hasOwnProperty(l)) throw Error(i(99, l));
              x[l] = a;
              var u = a.phasedRegistrationNames;
              if (u) {
                for (o in u) u.hasOwnProperty(o) && y(u[o], n, l);
                o = !0;
              } else
                a.registrationName
                  ? (y(a.registrationName, n, l), (o = !0))
                  : (o = !1);
              if (!o) throw Error(i(98, r, e));
            }
          }
        }
    }
    function y(e, n, t) {
      if (k[e]) throw Error(i(100, e));
      (k[e] = n), (E[e] = n.eventTypes[t].dependencies);
    }
    var w = [],
      x = {},
      k = {},
      E = {};
    function T(e) {
      var n,
        t = !1;
      for (n in e)
        if (e.hasOwnProperty(n)) {
          var r = e[n];
          if (!v.hasOwnProperty(n) || v[n] !== r) {
            if (v[n]) throw Error(i(102, n));
            (v[n] = r), (t = !0);
          }
        }
      t && b();
    }
    var C = !(
        'undefined' == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      ),
      S = null,
      P = null,
      _ = null;
    function N(e) {
      if ((e = Mt(e))) {
        if ('function' != typeof S) throw Error(i(280));
        var n = e.stateNode;
        n && ((n = It(n)), S(e.stateNode, e.type, n));
      }
    }
    function O(e) {
      P ? (_ ? _.push(e) : (_ = [e])) : (P = e);
    }
    function M() {
      if (P) {
        var e = P,
          n = _;
        if (((_ = P = null), N(e), n)) for (e = 0; e < n.length; e++) N(n[e]);
      }
    }
    function z(e, n) {
      return e(n);
    }
    function I(e, n, t, r, o) {
      return e(n, t, r, o);
    }
    function R() {}
    var L = z,
      A = !1,
      j = !1;
    function D() {
      (null === P && null === _) || (R(), M());
    }
    function F(e, n, t) {
      if (j) return e(n, t);
      j = !0;
      try {
        return L(e, n, t);
      } finally {
        (j = !1), D();
      }
    }
    var U = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      B = Object.prototype.hasOwnProperty,
      $ = {},
      V = {};
    function W(e, n, t, r, o, a, i) {
      (this.acceptsBooleans = 2 === n || 3 === n || 4 === n),
        (this.attributeName = r),
        (this.attributeNamespace = o),
        (this.mustUseProperty = t),
        (this.propertyName = e),
        (this.type = n),
        (this.sanitizeURL = a),
        (this.removeEmptyString = i);
    }
    var H = {};
    'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
      .split(' ')
      .forEach(function (e) {
        H[e] = new W(e, 0, !1, e, null, !1, !1);
      }),
      [
        ['acceptCharset', 'accept-charset'],
        ['className', 'class'],
        ['htmlFor', 'for'],
        ['httpEquiv', 'http-equiv'],
      ].forEach(function (e) {
        var n = e[0];
        H[n] = new W(n, 1, !1, e[1], null, !1, !1);
      }),
      ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (
        e,
      ) {
        H[e] = new W(e, 2, !1, e.toLowerCase(), null, !1, !1);
      }),
      [
        'autoReverse',
        'externalResourcesRequired',
        'focusable',
        'preserveAlpha',
      ].forEach(function (e) {
        H[e] = new W(e, 2, !1, e, null, !1, !1);
      }),
      'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
        .split(' ')
        .forEach(function (e) {
          H[e] = new W(e, 3, !1, e.toLowerCase(), null, !1, !1);
        }),
      ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
        H[e] = new W(e, 3, !0, e, null, !1, !1);
      }),
      ['capture', 'download'].forEach(function (e) {
        H[e] = new W(e, 4, !1, e, null, !1, !1);
      }),
      ['cols', 'rows', 'size', 'span'].forEach(function (e) {
        H[e] = new W(e, 6, !1, e, null, !1, !1);
      }),
      ['rowSpan', 'start'].forEach(function (e) {
        H[e] = new W(e, 5, !1, e.toLowerCase(), null, !1, !1);
      });
    var Q = /[\-:]([a-z])/g;
    function q(e) {
      return e[1].toUpperCase();
    }
    'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
      .split(' ')
      .forEach(function (e) {
        var n = e.replace(Q, q);
        H[n] = new W(n, 1, !1, e, null, !1, !1);
      }),
      'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
        .split(' ')
        .forEach(function (e) {
          var n = e.replace(Q, q);
          H[n] = new W(n, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
        }),
      ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
        var n = e.replace(Q, q);
        H[n] = new W(
          n,
          1,
          !1,
          e,
          'http://www.w3.org/XML/1998/namespace',
          !1,
          !1,
        );
      }),
      ['tabIndex', 'crossOrigin'].forEach(function (e) {
        H[e] = new W(e, 1, !1, e.toLowerCase(), null, !1, !1);
      }),
      (H.xlinkHref = new W(
        'xlinkHref',
        1,
        !1,
        'xlink:href',
        'http://www.w3.org/1999/xlink',
        !0,
        !1,
      )),
      ['src', 'href', 'action', 'formAction'].forEach(function (e) {
        H[e] = new W(e, 1, !1, e.toLowerCase(), null, !0, !0);
      });
    var K = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Y(e, n, t, r) {
      var o = H.hasOwnProperty(n) ? H[n] : null;
      (null !== o
        ? 0 === o.type
        : !r &&
          2 < n.length &&
          ('o' === n[0] || 'O' === n[0]) &&
          ('n' === n[1] || 'N' === n[1])) ||
        ((function (e, n, t, r) {
          if (
            null == n ||
            (function (e, n, t, r) {
              if (null !== t && 0 === t.type) return !1;
              switch (typeof n) {
                case 'function':
                case 'symbol':
                  return !0;
                case 'boolean':
                  return (
                    !r &&
                    (null !== t
                      ? !t.acceptsBooleans
                      : 'data-' !== (e = e.toLowerCase().slice(0, 5)) &&
                        'aria-' !== e)
                  );
                default:
                  return !1;
              }
            })(e, n, t, r)
          )
            return !0;
          if (r) return !1;
          if (null !== t)
            switch (t.type) {
              case 3:
                return !n;
              case 4:
                return !1 === n;
              case 5:
                return isNaN(n);
              case 6:
                return isNaN(n) || 1 > n;
            }
          return !1;
        })(n, t, o, r) && (t = null),
        r || null === o
          ? (function (e) {
              return (
                !!B.call(V, e) ||
                (!B.call($, e) && (U.test(e) ? (V[e] = !0) : (($[e] = !0), !1)))
              );
            })(n) &&
            (null === t ? e.removeAttribute(n) : e.setAttribute(n, '' + t))
          : o.mustUseProperty
          ? (e[o.propertyName] = null === t ? 3 !== o.type && '' : t)
          : ((n = o.attributeName),
            (r = o.attributeNamespace),
            null === t
              ? e.removeAttribute(n)
              : ((t =
                  3 === (o = o.type) || (4 === o && !0 === t) ? '' : '' + t),
                r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
    }
    var X = 60103,
      G = 60106,
      J = 60107,
      Z = 60108,
      ee = 60114,
      ne = 60109,
      te = 60110,
      re = 60112,
      oe = 60113,
      ae = 60120,
      ie = 60115,
      le = 60116,
      ue = 60121,
      ce = 60128;
    if ('function' == typeof Symbol && Symbol.for) {
      var se = Symbol.for;
      (X = se('react.element')),
        (G = se('react.portal')),
        (J = se('react.fragment')),
        (Z = se('react.strict_mode')),
        (ee = se('react.profiler')),
        (ne = se('react.provider')),
        (te = se('react.context')),
        (re = se('react.forward_ref')),
        (oe = se('react.suspense')),
        (ae = se('react.suspense_list')),
        (ie = se('react.memo')),
        (le = se('react.lazy')),
        (ue = se('react.block')),
        (ce = se('react.opaque.id'));
    }
    var fe = 'function' == typeof Symbol && Symbol.iterator;
    function de(e) {
      return null === e || 'object' != typeof e
        ? null
        : 'function' == typeof (e = (fe && e[fe]) || e['@@iterator'])
        ? e
        : null;
    }
    function pe(e, n, t) {
      return (
        (n = ''),
        t && (n = ' (created by ' + t + ')'),
        '\n    in ' + (e || 'Unknown') + n
      );
    }
    function me(e, n) {
      return e ? pe(e.displayName || e.name || null, n, null) : '';
    }
    function he(e) {
      switch (e.tag) {
        case 5:
          return pe(e.type, null, null);
        case 16:
          return pe('Lazy', null, null);
        case 13:
          return pe('Suspense', null, null);
        case 19:
          return pe('SuspenseList', null, null);
        case 0:
        case 2:
        case 15:
          return me(e.type, null);
        case 11:
          return me(e.type.render, null);
        case 22:
          return me(e.type._render, null);
        case 1:
          return me(e.type, null);
        default:
          return '';
      }
    }
    function ge(e) {
      var n = '';
      do {
        (n += he(e)), (e = e.return);
      } while (e);
      return n;
    }
    function ve(e) {
      if (null == e) return null;
      if ('function' == typeof e) return e.displayName || e.name || null;
      if ('string' == typeof e) return e;
      switch (e) {
        case J:
          return 'Fragment';
        case G:
          return 'Portal';
        case ee:
          return 'Profiler';
        case Z:
          return 'StrictMode';
        case oe:
          return 'Suspense';
        case ae:
          return 'SuspenseList';
      }
      if ('object' == typeof e)
        switch (e.$$typeof) {
          case te:
            return (e.displayName || 'Context') + '.Consumer';
          case ne:
            return (e._context.displayName || 'Context') + '.Provider';
          case re:
            var n = e.render;
            return (
              (n = n.displayName || n.name || ''),
              e.displayName ||
                ('' !== n ? 'ForwardRef(' + n + ')' : 'ForwardRef')
            );
          case ie:
            return ve(e.type);
          case ue:
            return ve(e._render);
          case le:
            (n = e._payload), (e = e._init);
            try {
              return ve(e(n));
            } catch (e) {}
        }
      return null;
    }
    function be(e) {
      switch (typeof e) {
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
        case 'undefined':
          return e;
        default:
          return '';
      }
    }
    function ye(e) {
      var n = e.type;
      return (
        (e = e.nodeName) &&
        'input' === e.toLowerCase() &&
        ('checkbox' === n || 'radio' === n)
      );
    }
    function we(e) {
      e._valueTracker ||
        (e._valueTracker = (function (e) {
          var n = ye(e) ? 'checked' : 'value',
            t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
            r = '' + e[n];
          if (
            !e.hasOwnProperty(n) &&
            void 0 !== t &&
            'function' == typeof t.get &&
            'function' == typeof t.set
          ) {
            var o = t.get,
              a = t.set;
            return (
              Object.defineProperty(e, n, {
                configurable: !0,
                get: function () {
                  return o.call(this);
                },
                set: function (e) {
                  (r = '' + e), a.call(this, e);
                },
              }),
              Object.defineProperty(e, n, {enumerable: t.enumerable}),
              {
                getValue: function () {
                  return r;
                },
                setValue: function (e) {
                  r = '' + e;
                },
                stopTracking: function () {
                  (e._valueTracker = null), delete e[n];
                },
              }
            );
          }
        })(e));
    }
    function xe(e) {
      if (!e) return !1;
      var n = e._valueTracker;
      if (!n) return !0;
      var t = n.getValue(),
        r = '';
      return (
        e && (r = ye(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = r) !== t && (n.setValue(e), !0)
      );
    }
    function ke(e, n) {
      var t = n.checked;
      return o({}, n, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != t ? t : e._wrapperState.initialChecked,
      });
    }
    function Ee(e, n) {
      var t = null == n.defaultValue ? '' : n.defaultValue,
        r = null != n.checked ? n.checked : n.defaultChecked;
      (t = be(null != n.value ? n.value : t)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: t,
          controlled:
            'checkbox' === n.type || 'radio' === n.type
              ? null != n.checked
              : null != n.value,
        });
    }
    function Te(e, n) {
      null != (n = n.checked) && Y(e, 'checked', n, !1);
    }
    function Ce(e, n) {
      Te(e, n);
      var t = be(n.value),
        r = n.type;
      if (null != t)
        'number' === r
          ? ((0 === t && '' === e.value) || e.value != t) && (e.value = '' + t)
          : e.value !== '' + t && (e.value = '' + t);
      else if ('submit' === r || 'reset' === r)
        return void e.removeAttribute('value');
      n.hasOwnProperty('value')
        ? Pe(e, n.type, t)
        : n.hasOwnProperty('defaultValue') && Pe(e, n.type, be(n.defaultValue)),
        null == n.checked &&
          null != n.defaultChecked &&
          (e.defaultChecked = !!n.defaultChecked);
    }
    function Se(e, n, t) {
      if (n.hasOwnProperty('value') || n.hasOwnProperty('defaultValue')) {
        var r = n.type;
        if (
          !(
            ('submit' !== r && 'reset' !== r) ||
            (void 0 !== n.value && null !== n.value)
          )
        )
          return;
        (n = '' + e._wrapperState.initialValue),
          t || n === e.value || (e.value = n),
          (e.defaultValue = n);
      }
      '' !== (t = e.name) && (e.name = ''),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        '' !== t && (e.name = t);
    }
    function Pe(e, n, t) {
      ('number' === n && e.ownerDocument.activeElement === e) ||
        (null == t
          ? (e.defaultValue = '' + e._wrapperState.initialValue)
          : e.defaultValue !== '' + t && (e.defaultValue = '' + t));
    }
    function _e(e, n) {
      return (
        (e = o({children: void 0}, n)),
        (n = (function (e) {
          var n = '';
          return (
            r.Children.forEach(e, function (e) {
              null != e && (n += e);
            }),
            n
          );
        })(n.children)) && (e.children = n),
        e
      );
    }
    function Ne(e, n, t, r) {
      if (((e = e.options), n)) {
        n = {};
        for (var o = 0; o < t.length; o++) n['$' + t[o]] = !0;
        for (t = 0; t < e.length; t++)
          (o = n.hasOwnProperty('$' + e[t].value)),
            e[t].selected !== o && (e[t].selected = o),
            o && r && (e[t].defaultSelected = !0);
      } else {
        for (t = '' + be(t), n = null, o = 0; o < e.length; o++) {
          if (e[o].value === t)
            return (
              (e[o].selected = !0), void (r && (e[o].defaultSelected = !0))
            );
          null !== n || e[o].disabled || (n = e[o]);
        }
        null !== n && (n.selected = !0);
      }
    }
    function Oe(e, n) {
      if (null != n.dangerouslySetInnerHTML) throw Error(i(91));
      return o({}, n, {
        value: void 0,
        defaultValue: void 0,
        children: '' + e._wrapperState.initialValue,
      });
    }
    function Me(e, n) {
      var t = n.value;
      if (null == t) {
        if (((t = n.children), (n = n.defaultValue), null != t)) {
          if (null != n) throw Error(i(92));
          if (Array.isArray(t)) {
            if (!(1 >= t.length)) throw Error(i(93));
            t = t[0];
          }
          n = t;
        }
        null == n && (n = ''), (t = n);
      }
      e._wrapperState = {initialValue: be(t)};
    }
    function ze(e, n) {
      var t = be(n.value),
        r = be(n.defaultValue);
      null != t &&
        ((t = '' + t) !== e.value && (e.value = t),
        null == n.defaultValue && e.defaultValue !== t && (e.defaultValue = t)),
        null != r && (e.defaultValue = '' + r);
    }
    function Ie(e) {
      var n = e.textContent;
      n === e._wrapperState.initialValue &&
        '' !== n &&
        null !== n &&
        (e.value = n);
    }
    var Re = 'http://www.w3.org/1999/xhtml',
      Le = 'http://www.w3.org/2000/svg';
    function Ae(e) {
      switch (e) {
        case 'svg':
          return 'http://www.w3.org/2000/svg';
        case 'math':
          return 'http://www.w3.org/1998/Math/MathML';
        default:
          return 'http://www.w3.org/1999/xhtml';
      }
    }
    function je(e, n) {
      return null == e || 'http://www.w3.org/1999/xhtml' === e
        ? Ae(n)
        : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === n
        ? 'http://www.w3.org/1999/xhtml'
        : e;
    }
    var De,
      Fe = (function (e) {
        return 'undefined' != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (n, t, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(n, t);
              });
            }
          : e;
      })(function (e, n) {
        if (e.namespaceURI !== Le || 'innerHTML' in e) e.innerHTML = n;
        else {
          for (
            (De = De || document.createElement('div')).innerHTML =
              '<svg>' + n.valueOf().toString() + '</svg>',
              n = De.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; n.firstChild; ) e.appendChild(n.firstChild);
        }
      });
    function Ue(e, n) {
      if (n) {
        var t = e.firstChild;
        if (t && t === e.lastChild && 3 === t.nodeType)
          return void (t.nodeValue = n);
      }
      e.textContent = n;
    }
    function Be(e, n) {
      var t = {};
      return (
        (t[e.toLowerCase()] = n.toLowerCase()),
        (t['Webkit' + e] = 'webkit' + n),
        (t['Moz' + e] = 'moz' + n),
        t
      );
    }
    var $e = {
        animationend: Be('Animation', 'AnimationEnd'),
        animationiteration: Be('Animation', 'AnimationIteration'),
        animationstart: Be('Animation', 'AnimationStart'),
        transitionend: Be('Transition', 'TransitionEnd'),
      },
      Ve = {},
      We = {};
    function He(e) {
      if (Ve[e]) return Ve[e];
      if (!$e[e]) return e;
      var n,
        t = $e[e];
      for (n in t) if (t.hasOwnProperty(n) && n in We) return (Ve[e] = t[n]);
      return e;
    }
    C &&
      ((We = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete $e.animationend.animation,
        delete $e.animationiteration.animation,
        delete $e.animationstart.animation),
      'TransitionEvent' in window || delete $e.transitionend.transition);
    var Qe = He('animationend'),
      qe = He('animationiteration'),
      Ke = He('animationstart'),
      Ye = He('transitionend'),
      Xe = 'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' ',
      ),
      Ge = new ('function' == typeof WeakMap ? WeakMap : Map)();
    function Je(e) {
      var n = Ge.get(e);
      return void 0 === n && ((n = new Map()), Ge.set(e, n)), n;
    }
    function Ze(e) {
      var n = e,
        t = e;
      if (e.alternate) for (; n.return; ) n = n.return;
      else {
        e = n;
        do {
          0 != (1026 & (n = e).effectTag) && (t = n.return), (e = n.return);
        } while (e);
      }
      return 3 === n.tag ? t : null;
    }
    function en(e) {
      if (13 === e.tag) {
        var n = e.memoizedState;
        if (
          (null === n && null !== (e = e.alternate) && (n = e.memoizedState),
          null !== n)
        )
          return n.dehydrated;
      }
      return null;
    }
    function nn(e) {
      if (Ze(e) !== e) throw Error(i(188));
    }
    function tn(e) {
      if (
        !(e = (function (e) {
          var n = e.alternate;
          if (!n) {
            if (null === (n = Ze(e))) throw Error(i(188));
            return n !== e ? null : e;
          }
          for (var t = e, r = n; ; ) {
            var o = t.return;
            if (null === o) break;
            var a = o.alternate;
            if (null === a) {
              if (null !== (r = o.return)) {
                t = r;
                continue;
              }
              break;
            }
            if (o.child === a.child) {
              for (a = o.child; a; ) {
                if (a === t) return nn(o), e;
                if (a === r) return nn(o), n;
                a = a.sibling;
              }
              throw Error(i(188));
            }
            if (t.return !== r.return) (t = o), (r = a);
            else {
              for (var l = !1, u = o.child; u; ) {
                if (u === t) {
                  (l = !0), (t = o), (r = a);
                  break;
                }
                if (u === r) {
                  (l = !0), (r = o), (t = a);
                  break;
                }
                u = u.sibling;
              }
              if (!l) {
                for (u = a.child; u; ) {
                  if (u === t) {
                    (l = !0), (t = a), (r = o);
                    break;
                  }
                  if (u === r) {
                    (l = !0), (r = a), (t = o);
                    break;
                  }
                  u = u.sibling;
                }
                if (!l) throw Error(i(189));
              }
            }
            if (t.alternate !== r) throw Error(i(190));
          }
          if (3 !== t.tag) throw Error(i(188));
          return t.stateNode.current === t ? e : n;
        })(e))
      )
        return null;
      for (var n = e; ; ) {
        if (5 === n.tag || 6 === n.tag) return n;
        if (n.child) (n.child.return = n), (n = n.child);
        else {
          if (n === e) break;
          for (; !n.sibling; ) {
            if (!n.return || n.return === e) return null;
            n = n.return;
          }
          (n.sibling.return = n.return), (n = n.sibling);
        }
      }
      return null;
    }
    function rn(e, n) {
      if (null == n) throw Error(i(30));
      return null == e
        ? n
        : Array.isArray(e)
        ? Array.isArray(n)
          ? (e.push.apply(e, n), e)
          : (e.push(n), e)
        : Array.isArray(n)
        ? [e].concat(n)
        : [e, n];
    }
    var on = null;
    function an(e) {
      if (e) {
        var n = e._dispatchListeners,
          t = e._dispatchInstances;
        if (Array.isArray(n))
          for (var r = 0; r < n.length && !e.isPropagationStopped(); r++)
            h(e, n[r], t[r]);
        else n && h(e, n, t);
        (e._dispatchListeners = null),
          (e._dispatchInstances = null),
          e.isPersistent() || e.constructor.release(e);
      }
    }
    function ln(e) {
      if ((null !== e && (on = rn(on, e)), (e = on), (on = null), e)) {
        if (
          (Array.isArray(e) ? e.forEach(an, void 0) : e && an.call(void 0, e),
          on)
        )
          throw Error(i(95));
        if (s) throw ((e = f), (s = !1), (f = null), e);
      }
    }
    function un(e) {
      return (
        (e = e.target || e.srcElement || window).correspondingUseElement &&
          (e = e.correspondingUseElement),
        3 === e.nodeType ? e.parentNode : e
      );
    }
    function cn(e) {
      if (!C) return !1;
      var n = (e = 'on' + e) in document;
      return (
        n ||
          ((n = document.createElement('div')).setAttribute(e, 'return;'),
          (n = 'function' == typeof n[e])),
        n
      );
    }
    var sn = [];
    function fn(e) {
      (e.topLevelType = null),
        (e.nativeEvent = null),
        (e.targetInst = null),
        (e.ancestors.length = 0),
        10 > sn.length && sn.push(e);
    }
    function dn(e, n, t, r) {
      if (sn.length) {
        var o = sn.pop();
        return (
          (o.topLevelType = e),
          (o.eventSystemFlags = r),
          (o.nativeEvent = n),
          (o.targetInst = t),
          o
        );
      }
      return {
        topLevelType: e,
        eventSystemFlags: r,
        nativeEvent: n,
        targetInst: t,
        ancestors: [],
      };
    }
    function pn(e) {
      var n = e.targetInst,
        t = n;
      do {
        if (!t) {
          e.ancestors.push(t);
          break;
        }
        var r = t;
        if (3 === r.tag) r = r.stateNode.containerInfo;
        else {
          for (; r.return; ) r = r.return;
          r = 3 !== r.tag ? null : r.stateNode.containerInfo;
        }
        if (!r) break;
        var o = t.tag;
        (5 !== o && 6 !== o) || e.ancestors.push(t), (t = Ot(r));
      } while (t);
      for (t = 0; t < e.ancestors.length; t++) {
        (n = e.ancestors[t]), (r = un(e.nativeEvent)), (o = e.topLevelType);
        var a = e.nativeEvent,
          i = e.eventSystemFlags;
        0 === t && (i |= 128);
        for (var l = null, u = 0; u < w.length; u++) {
          var c = w[u];
          c && (c = c.extractEvents(o, n, a, r, i)) && (l = rn(l, c));
        }
        ln(l);
      }
    }
    function mn(e, n, t) {
      if (!t.has(e))
        switch (e) {
          case 'scroll':
            gn('scroll', n, t);
            break;
          case 'focus':
          case 'blur':
            gn('focus', n, t), gn('blur', n, t);
            break;
          case 'cancel':
          case 'close':
            cn(e) && gn(e, n, t);
            break;
          case 'invalid':
          case 'submit':
          case 'reset':
            break;
          default:
            -1 === Xe.indexOf(e) && hn(e, n, t);
        }
    }
    function hn(e, n, t) {
      (n = Gn(n, e, 1, !1)), t && t.set(e, {passive: void 0, listener: n});
    }
    function gn(e, n, t) {
      (n = Gn(n, e, 1, !0)), t.set(e, {passive: void 0, listener: n});
    }
    var vn = {},
      bn = new Map(),
      yn = new Map(),
      wn = 'change selectionchange textInput compositionstart compositionend compositionupdate'.split(
        ' ',
      ),
      xn = [
        'abort',
        'abort',
        Qe,
        'animationEnd',
        qe,
        'animationIteration',
        Ke,
        'animationStart',
        'canplay',
        'canPlay',
        'canplaythrough',
        'canPlayThrough',
        'durationchange',
        'durationChange',
        'emptied',
        'emptied',
        'encrypted',
        'encrypted',
        'ended',
        'ended',
        'error',
        'error',
        'gotpointercapture',
        'gotPointerCapture',
        'load',
        'load',
        'loadeddata',
        'loadedData',
        'loadedmetadata',
        'loadedMetadata',
        'loadstart',
        'loadStart',
        'lostpointercapture',
        'lostPointerCapture',
        'playing',
        'playing',
        'progress',
        'progress',
        'seeking',
        'seeking',
        'stalled',
        'stalled',
        'suspend',
        'suspend',
        'timeupdate',
        'timeUpdate',
        Ye,
        'transitionEnd',
        'waiting',
        'waiting',
      ];
    function kn(e, n) {
      for (var t = 0; t < e.length; t += 2) {
        var r = e[t],
          o = e[t + 1],
          a = 'on' + (o[0].toUpperCase() + o.slice(1));
        (a = {
          phasedRegistrationNames: {bubbled: a, captured: a + 'Capture'},
          dependencies: [r],
          eventPriority: n,
        }),
          yn.set(r, n),
          bn.set(r, a),
          (vn[o] = a);
      }
    }
    kn(
      'blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange'.split(
        ' ',
      ),
      0,
    ),
      kn(
        'drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel'.split(
          ' ',
        ),
        1,
      ),
      kn(xn, 2);
    for (var En = 0; En < wn.length; En++) yn.set(wn[En], 0);
    var Tn,
      Cn,
      Sn,
      Pn,
      _n = !1,
      Nn = [],
      On = null,
      Mn = null,
      zn = null,
      In = new Map(),
      Rn = new Map(),
      Ln = [],
      An = 'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit'.split(
        ' ',
      ),
      jn = 'focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture'.split(
        ' ',
      );
    function Dn(e, n, t, r, o) {
      return {
        blockedOn: e,
        topLevelType: n,
        eventSystemFlags: 64 | t,
        nativeEvent: o,
        targetContainers: [r],
      };
    }
    function Fn(e, n, t, r, o) {
      if (((e = Dn(e, n, t, r, o)), Nn.push(e), 1 === Nn.length))
        for (
          ;
          null !== e.blockedOn &&
          null !== (n = Mt(e.blockedOn)) &&
          (Tn(n), null === e.blockedOn);

        )
          Hn();
    }
    function Un(e, n) {
      switch (e) {
        case 'focus':
        case 'blur':
          On = null;
          break;
        case 'dragenter':
        case 'dragleave':
          Mn = null;
          break;
        case 'mouseover':
        case 'mouseout':
          zn = null;
          break;
        case 'pointerover':
        case 'pointerout':
          In.delete(n.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          Rn.delete(n.pointerId);
      }
    }
    function Bn(e, n, t, r, o, a) {
      return null === e || e.nativeEvent !== a
        ? ((e = Dn(n, t, r, o, a)),
          null !== n && null !== (n = Mt(n)) && Sn(n),
          e)
        : ((e.eventSystemFlags |= r),
          (n = e.targetContainers),
          null !== o && -1 === n.indexOf(o) && n.push(o),
          e);
    }
    function $n(e) {
      var n = Ot(e.target);
      if (null !== n) {
        var t = Ze(n);
        if (null !== t)
          if (13 === (n = t.tag)) {
            if (null !== (n = en(t)))
              return (
                (e.blockedOn = n),
                void a.unstable_runWithPriority(e.priority, function () {
                  Pn(t);
                })
              );
          } else if (3 === n && t.stateNode.hydrate)
            return void (e.blockedOn =
              3 === t.tag ? t.stateNode.containerInfo : null);
      }
      e.blockedOn = null;
    }
    function Vn(e) {
      if (null !== e.blockedOn) return !1;
      for (var n = e.targetContainers; 0 < n.length; ) {
        var t = nt(e.topLevelType, e.eventSystemFlags, n[0], e.nativeEvent);
        if (null !== t)
          return null !== (n = Mt(t)) && Sn(n), (e.blockedOn = t), !1;
        n.shift();
      }
      return !0;
    }
    function Wn(e, n, t) {
      Vn(e) && t.delete(n);
    }
    function Hn() {
      for (_n = !1; 0 < Nn.length; ) {
        var e = Nn[0];
        if (null !== e.blockedOn) {
          null !== (e = Mt(e.blockedOn)) && Cn(e);
          break;
        }
        for (var n = e.targetContainers; 0 < n.length; ) {
          var t = nt(e.topLevelType, e.eventSystemFlags, n[0], e.nativeEvent);
          if (null !== t) {
            e.blockedOn = t;
            break;
          }
          n.shift();
        }
        null === e.blockedOn && Nn.shift();
      }
      null !== On && Vn(On) && (On = null),
        null !== Mn && Vn(Mn) && (Mn = null),
        null !== zn && Vn(zn) && (zn = null),
        In.forEach(Wn),
        Rn.forEach(Wn);
    }
    function Qn(e, n) {
      e.blockedOn === n &&
        ((e.blockedOn = null),
        _n ||
          ((_n = !0),
          a.unstable_scheduleCallback(a.unstable_NormalPriority, Hn)));
    }
    function qn(e) {
      function n(n) {
        return Qn(n, e);
      }
      if (0 < Nn.length) {
        Qn(Nn[0], e);
        for (var t = 1; t < Nn.length; t++) {
          var r = Nn[t];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        null !== On && Qn(On, e),
          null !== Mn && Qn(Mn, e),
          null !== zn && Qn(zn, e),
          In.forEach(n),
          Rn.forEach(n),
          t = 0;
        t < Ln.length;
        t++
      )
        (r = Ln[t]).blockedOn === e && (r.blockedOn = null);
      for (; 0 < Ln.length && null === (t = Ln[0]).blockedOn; )
        $n(t), null === t.blockedOn && Ln.shift();
    }
    var Kn = a.unstable_UserBlockingPriority,
      Yn = a.unstable_runWithPriority,
      Xn = !0;
    function Gn(e, n, t, r, o, a, i) {
      switch (
        (void 0 === i ? (o = void 0 === (o = yn.get(n)) ? 2 : o) : (o = i), o)
      ) {
        case 0:
          o = Jn;
          break;
        case 1:
          o = Zn;
          break;
        default:
          o = et;
      }
      return (
        (t = o.bind(null, n, t, e)),
        r ? e.addEventListener(n, t, !0) : e.addEventListener(n, t, !1),
        t
      );
    }
    function Jn(e, n, t, r) {
      A || R();
      var o = et,
        a = A;
      A = !0;
      try {
        I(o, e, n, t, r);
      } finally {
        (A = a) || D();
      }
    }
    function Zn(e, n, t, r) {
      Yn(Kn, et.bind(null, e, n, t, r));
    }
    function et(e, n, t, r) {
      if (Xn)
        if (0 < Nn.length && -1 < An.indexOf(e)) Fn(null, e, n, t, r);
        else {
          var o = nt(e, n, t, r);
          if (null === o) Un(e, r);
          else if (-1 < An.indexOf(e)) Fn(o, e, n, t, r);
          else if (
            !(function (e, n, t, r, o) {
              switch (n) {
                case 'focus':
                  return (On = Bn(On, e, n, t, r, o)), !0;
                case 'dragenter':
                  return (Mn = Bn(Mn, e, n, t, r, o)), !0;
                case 'mouseover':
                  return (zn = Bn(zn, e, n, t, r, o)), !0;
                case 'pointerover':
                  var a = o.pointerId;
                  return In.set(a, Bn(In.get(a) || null, e, n, t, r, o)), !0;
                case 'gotpointercapture':
                  return (
                    (a = o.pointerId),
                    Rn.set(a, Bn(Rn.get(a) || null, e, n, t, r, o)),
                    !0
                  );
              }
              return !1;
            })(o, e, n, t, r)
          ) {
            Un(e, r), (e = dn(e, r, null, n));
            try {
              F(pn, e);
            } finally {
              fn(e);
            }
          }
        }
    }
    function nt(e, n, t, r) {
      if (null !== (t = Ot((t = un(r))))) {
        var o = Ze(t);
        if (null === o) t = null;
        else {
          var a = o.tag;
          if (13 === a) {
            if (null !== (t = en(o))) return t;
            t = null;
          } else if (3 === a) {
            if (o.stateNode.hydrate)
              return 3 === o.tag ? o.stateNode.containerInfo : null;
            t = null;
          } else o !== t && (t = null);
        }
      }
      e = dn(e, r, t, n);
      try {
        F(pn, e);
      } finally {
        fn(e);
      }
      return null;
    }
    var tt = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      rt = ['Webkit', 'ms', 'Moz', 'O'];
    function ot(e, n, t) {
      return null == n || 'boolean' == typeof n || '' === n
        ? ''
        : t ||
          'number' != typeof n ||
          0 === n ||
          (tt.hasOwnProperty(e) && tt[e])
        ? ('' + n).trim()
        : n + 'px';
    }
    function at(e, n) {
      for (var t in ((e = e.style), n))
        if (n.hasOwnProperty(t)) {
          var r = 0 === t.indexOf('--'),
            o = ot(t, n[t], r);
          'float' === t && (t = 'cssFloat'),
            r ? e.setProperty(t, o) : (e[t] = o);
        }
    }
    Object.keys(tt).forEach(function (e) {
      rt.forEach(function (n) {
        (n = n + e.charAt(0).toUpperCase() + e.substring(1)), (tt[n] = tt[e]);
      });
    });
    var it = o(
      {menuitem: !0},
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      },
    );
    function lt(e, n) {
      if (n) {
        if (it[e] && (null != n.children || null != n.dangerouslySetInnerHTML))
          throw Error(i(137, e, ''));
        if (null != n.dangerouslySetInnerHTML) {
          if (null != n.children) throw Error(i(60));
          if (
            'object' != typeof n.dangerouslySetInnerHTML ||
            !('__html' in n.dangerouslySetInnerHTML)
          )
            throw Error(i(61));
        }
        if (null != n.style && 'object' != typeof n.style)
          throw Error(i(62, ''));
      }
    }
    function ut(e, n) {
      if (-1 === e.indexOf('-')) return 'string' == typeof n.is;
      switch (e) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return !1;
        default:
          return !0;
      }
    }
    function ct(e, n) {
      var t = Je(
        (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument),
      );
      n = E[n];
      for (var r = 0; r < n.length; r++) mn(n[r], e, t);
    }
    function st() {}
    function ft(e) {
      if (
        void 0 ===
        (e = e || ('undefined' != typeof document ? document : void 0))
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch (n) {
        return e.body;
      }
    }
    function dt(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function pt(e, n) {
      var t,
        r = dt(e);
      for (e = 0; r; ) {
        if (3 === r.nodeType) {
          if (((t = e + r.textContent.length), e <= n && t >= n))
            return {node: r, offset: n - e};
          e = t;
        }
        e: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = dt(r);
      }
    }
    function mt() {
      for (var e = window, n = ft(); n instanceof e.HTMLIFrameElement; ) {
        try {
          var t = 'string' == typeof n.contentWindow.location.href;
        } catch (e) {
          t = !1;
        }
        if (!t) break;
        n = ft((e = n.contentWindow).document);
      }
      return n;
    }
    function ht(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        n &&
        (('input' === n &&
          ('text' === e.type ||
            'search' === e.type ||
            'tel' === e.type ||
            'url' === e.type ||
            'password' === e.type)) ||
          'textarea' === n ||
          'true' === e.contentEditable)
      );
    }
    var gt = null,
      vt = null;
    function bt(e, n) {
      switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          return !!n.autoFocus;
      }
      return !1;
    }
    function yt(e, n) {
      return (
        'textarea' === e ||
        'option' === e ||
        'noscript' === e ||
        'string' == typeof n.children ||
        'number' == typeof n.children ||
        ('object' == typeof n.dangerouslySetInnerHTML &&
          null !== n.dangerouslySetInnerHTML &&
          null != n.dangerouslySetInnerHTML.__html)
      );
    }
    var wt = 'function' == typeof setTimeout ? setTimeout : void 0,
      xt = 'function' == typeof clearTimeout ? clearTimeout : void 0;
    function kt(e, n) {
      var t = n,
        r = 0;
      do {
        var o = t.nextSibling;
        if ((e.removeChild(t), o && 8 === o.nodeType))
          if ('/$' === (t = o.data)) {
            if (0 === r) return e.removeChild(o), void qn(n);
            r--;
          } else ('$' !== t && '$?' !== t && '$!' !== t) || r++;
        t = o;
      } while (t);
      qn(n);
    }
    function Et(e) {
      for (; null != e; e = e.nextSibling) {
        var n = e.nodeType;
        if (1 === n || 3 === n) break;
        if (8 === n && ('$' === (n = e.data) || '$!' === n || '$?' === n))
          break;
      }
      return e;
    }
    function Tt(e) {
      e = e.previousSibling;
      for (var n = 0; e; ) {
        if (8 === e.nodeType) {
          var t = e.data;
          if ('$' === t || '$!' === t || '$?' === t) {
            if (0 === n) return e;
            n--;
          } else '/$' === t && n++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var Ct = 0;
    var St = Math.random().toString(36).slice(2),
      Pt = '__reactFiber$' + St,
      _t = '__reactEvents$' + St,
      Nt = '__reactContainer$' + St;
    function Ot(e) {
      var n = e[Pt];
      if (n) return n;
      for (var t = e.parentNode; t; ) {
        if ((n = t[Nt] || t[Pt])) {
          if (
            ((t = n.alternate),
            null !== n.child || (null !== t && null !== t.child))
          )
            for (e = Tt(e); null !== e; ) {
              if ((t = e[Pt])) return t;
              e = Tt(e);
            }
          return n;
        }
        t = (e = t).parentNode;
      }
      return null;
    }
    function Mt(e) {
      return !(e = e[Pt] || e[Nt]) ||
        (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
        ? null
        : e;
    }
    function zt(e) {
      if (5 === e.tag || 6 === e.tag) return e.stateNode;
      throw Error(i(33));
    }
    function It(e) {
      return e[_t] || null;
    }
    var Rt = null,
      Lt = null,
      At = null;
    function jt() {
      if (At) return At;
      var e,
        n,
        t = Lt,
        r = t.length,
        o = 'value' in Rt ? Rt.value : Rt.textContent,
        a = o.length;
      for (e = 0; e < r && t[e] === o[e]; e++);
      var i = r - e;
      for (n = 1; n <= i && t[r - n] === o[a - n]; n++);
      return (At = o.slice(e, 1 < n ? 1 - n : void 0));
    }
    function Dt() {
      return !0;
    }
    function Ft() {
      return !1;
    }
    function Ut(e, n, t, r) {
      for (var o in ((this.dispatchConfig = e),
      (this._targetInst = n),
      (this.nativeEvent = t),
      (this._dispatchCurrentTargets = this._dispatchInstances = this._dispatchListeners = null),
      (e = this.constructor.Interface)))
        e.hasOwnProperty(o) &&
          ((n = e[o])
            ? (this[o] = n(t))
            : 'target' === o
            ? (this.target = r)
            : (this[o] = t[o]));
      return (
        (this.isDefaultPrevented = (
          null != t.defaultPrevented ? t.defaultPrevented : !1 === t.returnValue
        )
          ? Dt
          : Ft),
        (this.isPropagationStopped = Ft),
        this
      );
    }
    function Bt(e, n, t, r) {
      if (this.eventPool.length) {
        var o = this.eventPool.pop();
        return this.call(o, e, n, t, r), o;
      }
      return new this(e, n, t, r);
    }
    function $t(e) {
      if (!(e instanceof this)) throw Error(i(279));
      e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
    }
    function Vt(e) {
      (e.eventPool = []), (e.getPooled = Bt), (e.release = $t);
    }
    o(Ut.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : 'unknown' != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = Dt));
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : 'unknown' != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = Dt));
      },
      persist: function () {
        this.isPersistent = Dt;
      },
      isPersistent: Ft,
      destructor: function () {
        var e,
          n = this.constructor.Interface;
        for (e in n) this[e] = null;
        (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
          (this.isPropagationStopped = this.isDefaultPrevented = Ft),
          (this._dispatchCurrentTargets = this._dispatchInstances = this._dispatchListeners = null);
      },
    }),
      (Ut.Interface = {
        type: null,
        target: null,
        currentTarget: function () {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null,
      }),
      (Ut.extend = function (e) {
        function n() {}
        function t() {
          return r.apply(this, arguments);
        }
        var r = this;
        n.prototype = r.prototype;
        var a = new n();
        return (
          o(a, t.prototype),
          (t.prototype = a),
          (t.prototype.constructor = t),
          (t.Interface = o({}, r.Interface, e)),
          (t.extend = r.extend),
          Vt(t),
          t
        );
      }),
      Vt(Ut);
    var Wt = Ut.extend({data: null}),
      Ht = Ut.extend({data: null});
    function Qt(e, n) {
      var t = e.stateNode;
      if (null === t) return null;
      var r = It(t);
      if (null === r) return null;
      t = r[n];
      e: switch (n) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
          (r = !r.disabled) ||
            (r = !(
              'button' === (e = e.type) ||
              'input' === e ||
              'select' === e ||
              'textarea' === e
            )),
            (e = !r);
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (t && 'function' != typeof t) throw Error(i(231, n, typeof t));
      return t;
    }
    function qt(e) {
      var n = e.dispatchConfig.phasedRegistrationNames,
        t = [],
        r = [],
        o = [],
        a = n.bubbled;
      n = n.captured;
      for (var i = e._targetInst; null !== i; ) {
        var l = i,
          u = l.stateNode;
        5 === l.tag &&
          null !== u &&
          ((l = u),
          null !== n &&
            null != (u = Qt(i, n)) &&
            (t.unshift(u), r.unshift(i), o.unshift(l)),
          null !== a &&
            null != (u = Qt(i, a)) &&
            (t.push(u), r.push(i), o.push(l))),
          (i = i.return);
      }
      0 < t.length &&
        ((e._dispatchListeners = t),
        (e._dispatchInstances = r),
        (e._dispatchCurrentTargets = o));
    }
    var Kt = [9, 13, 27, 32],
      Yt = C && 'CompositionEvent' in window,
      Xt = null;
    C && 'documentMode' in document && (Xt = document.documentMode);
    var Gt = C && 'TextEvent' in window && !Xt,
      Jt = C && (!Yt || (Xt && 8 < Xt && 11 >= Xt)),
      Zt = String.fromCharCode(32),
      er = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: 'onBeforeInput',
            captured: 'onBeforeInputCapture',
          },
          dependencies: ['compositionend', 'keypress', 'textInput', 'paste'],
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: 'onCompositionEnd',
            captured: 'onCompositionEndCapture',
          },
          dependencies: 'blur compositionend keydown keypress keyup mousedown'.split(
            ' ',
          ),
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: 'onCompositionStart',
            captured: 'onCompositionStartCapture',
          },
          dependencies: 'blur compositionstart keydown keypress keyup mousedown'.split(
            ' ',
          ),
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: 'onCompositionUpdate',
            captured: 'onCompositionUpdateCapture',
          },
          dependencies: 'blur compositionupdate keydown keypress keyup mousedown'.split(
            ' ',
          ),
        },
      },
      nr = !1;
    function tr(e, n) {
      switch (e) {
        case 'keyup':
          return -1 !== Kt.indexOf(n.keyCode);
        case 'keydown':
          return 229 !== n.keyCode;
        case 'keypress':
        case 'mousedown':
        case 'blur':
          return !0;
        default:
          return !1;
      }
    }
    function rr(e) {
      return 'object' == typeof (e = e.detail) && 'data' in e ? e.data : null;
    }
    var or = !1;
    var ar = {
        eventTypes: er,
        extractEvents: function (e, n, t, r) {
          var o;
          if (Yt)
            e: {
              switch (e) {
                case 'compositionstart':
                  var a = er.compositionStart;
                  break e;
                case 'compositionend':
                  a = er.compositionEnd;
                  break e;
                case 'compositionupdate':
                  a = er.compositionUpdate;
                  break e;
              }
              a = void 0;
            }
          else
            or
              ? tr(e, t) && (a = er.compositionEnd)
              : 'keydown' === e &&
                229 === t.keyCode &&
                (a = er.compositionStart);
          return (
            a
              ? (Jt &&
                  'ko' !== t.locale &&
                  (or || a !== er.compositionStart
                    ? a === er.compositionEnd && or && (o = jt())
                    : ((Lt = 'value' in (Rt = r) ? Rt.value : Rt.textContent),
                      (or = !0))),
                (a = Wt.getPooled(a, n, t, r)),
                o ? (a.data = o) : null !== (o = rr(t)) && (a.data = o),
                qt(a),
                (o = a))
              : (o = null),
            (e = Gt
              ? (function (e, n) {
                  switch (e) {
                    case 'compositionend':
                      return rr(n);
                    case 'keypress':
                      return 32 !== n.which ? null : ((nr = !0), Zt);
                    case 'textInput':
                      return (e = n.data) === Zt && nr ? null : e;
                    default:
                      return null;
                  }
                })(e, t)
              : (function (e, n) {
                  if (or)
                    return 'compositionend' === e || (!Yt && tr(e, n))
                      ? ((e = jt()), (At = Lt = Rt = null), (or = !1), e)
                      : null;
                  switch (e) {
                    case 'paste':
                      return null;
                    case 'keypress':
                      if (
                        !(n.ctrlKey || n.altKey || n.metaKey) ||
                        (n.ctrlKey && n.altKey)
                      ) {
                        if (n.char && 1 < n.char.length) return n.char;
                        if (n.which) return String.fromCharCode(n.which);
                      }
                      return null;
                    case 'compositionend':
                      return Jt && 'ko' !== n.locale ? null : n.data;
                    default:
                      return null;
                  }
                })(e, t))
              ? (((n = Ht.getPooled(er.beforeInput, n, t, r)).data = e), qt(n))
              : (n = null),
            null === o ? n : null === n ? o : [o, n]
          );
        },
      },
      ir = {
        color: !0,
        date: !0,
        datetime: !0,
        'datetime-local': !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      };
    function lr(e) {
      var n = e && e.nodeName && e.nodeName.toLowerCase();
      return 'input' === n ? !!ir[e.type] : 'textarea' === n;
    }
    var ur = {
      change: {
        phasedRegistrationNames: {
          bubbled: 'onChange',
          captured: 'onChangeCapture',
        },
        dependencies: 'blur change click focus input keydown keyup selectionchange'.split(
          ' ',
        ),
      },
    };
    function cr(e, n, t) {
      return (
        ((e = Ut.getPooled(ur.change, e, n, t)).type = 'change'), O(t), qt(e), e
      );
    }
    var sr = null,
      fr = null;
    function dr(e) {
      ln(e);
    }
    function pr(e) {
      if (xe(zt(e))) return e;
    }
    function mr(e, n) {
      if ('change' === e) return n;
    }
    var hr = !1;
    function gr() {
      sr && (sr.detachEvent('onpropertychange', vr), (fr = sr = null));
    }
    function vr(e) {
      if ('value' === e.propertyName && pr(fr))
        if (((e = cr(fr, e, un(e))), A)) ln(e);
        else {
          A = !0;
          try {
            z(dr, e);
          } finally {
            (A = !1), D();
          }
        }
    }
    function br(e, n, t) {
      'focus' === e
        ? (gr(), (fr = t), (sr = n).attachEvent('onpropertychange', vr))
        : 'blur' === e && gr();
    }
    function yr(e) {
      if ('selectionchange' === e || 'keyup' === e || 'keydown' === e)
        return pr(fr);
    }
    function wr(e, n) {
      if ('click' === e) return pr(n);
    }
    function xr(e, n) {
      if ('input' === e || 'change' === e) return pr(n);
    }
    C &&
      (hr =
        cn('input') && (!document.documentMode || 9 < document.documentMode));
    var kr = {
        eventTypes: ur,
        _isInputEventSupported: hr,
        extractEvents: function (e, n, t, r) {
          var o = n ? zt(n) : window,
            a = o.nodeName && o.nodeName.toLowerCase();
          if ('select' === a || ('input' === a && 'file' === o.type))
            var i = mr;
          else if (lr(o))
            if (hr) i = xr;
            else {
              i = yr;
              var l = br;
            }
          else
            (a = o.nodeName) &&
              'input' === a.toLowerCase() &&
              ('checkbox' === o.type || 'radio' === o.type) &&
              (i = wr);
          if (i && (i = i(e, n))) return cr(i, t, r);
          l && l(e, o, n),
            'blur' === e &&
              (e = o._wrapperState) &&
              e.controlled &&
              'number' === o.type &&
              Pe(o, 'number', o.value);
        },
      },
      Er = Ut.extend({view: null, detail: null}),
      Tr = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey',
      };
    function Cr(e) {
      var n = this.nativeEvent;
      return n.getModifierState
        ? n.getModifierState(e)
        : !!(e = Tr[e]) && !!n[e];
    }
    function Sr() {
      return Cr;
    }
    var Pr = 0,
      _r = 0,
      Nr = !1,
      Or = !1,
      Mr = Er.extend({
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: Sr,
        button: null,
        buttons: null,
        relatedTarget: function (e) {
          return (
            e.relatedTarget ||
            (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
          );
        },
        movementX: function (e) {
          if ('movementX' in e) return e.movementX;
          var n = Pr;
          return (
            (Pr = e.screenX),
            Nr ? ('mousemove' === e.type ? e.screenX - n : 0) : ((Nr = !0), 0)
          );
        },
        movementY: function (e) {
          if ('movementY' in e) return e.movementY;
          var n = _r;
          return (
            (_r = e.screenY),
            Or ? ('mousemove' === e.type ? e.screenY - n : 0) : ((Or = !0), 0)
          );
        },
      }),
      zr = Mr.extend({
        pointerId: null,
        width: null,
        height: null,
        pressure: null,
        tangentialPressure: null,
        tiltX: null,
        tiltY: null,
        twist: null,
        pointerType: null,
        isPrimary: null,
      });
    function Ir(e) {
      if (null === e) return null;
      do {
        e = e.return;
      } while (e && 5 !== e.tag);
      return e || null;
    }
    function Rr(e, n, t, r) {
      var o = e.dispatchConfig.registrationName;
      if (void 0 !== o) {
        for (var a = [], i = [], l = []; null !== n && n !== t; ) {
          var u = n,
            c = u.alternate,
            s = u.stateNode;
          if (null !== c && c === t) break;
          5 === u.tag &&
            null !== s &&
            ((u = s),
            r
              ? null != (c = Qt(n, o)) &&
                (a.unshift(c), i.unshift(n), l.unshift(u))
              : null != (c = Qt(n, o)) && (a.push(c), i.push(n), l.push(u))),
            (n = n.return);
        }
        0 < a.length &&
          ((e._dispatchListeners = a),
          (e._dispatchInstances = i),
          (e._dispatchCurrentTargets = l));
      }
    }
    var Lr = {
        mouseEnter: {
          registrationName: 'onMouseEnter',
          dependencies: ['mouseout', 'mouseover'],
        },
        mouseLeave: {
          registrationName: 'onMouseLeave',
          dependencies: ['mouseout', 'mouseover'],
        },
        pointerEnter: {
          registrationName: 'onPointerEnter',
          dependencies: ['pointerout', 'pointerover'],
        },
        pointerLeave: {
          registrationName: 'onPointerLeave',
          dependencies: ['pointerout', 'pointerover'],
        },
      },
      Ar = {
        eventTypes: Lr,
        extractEvents: function (e, n, t, r, o) {
          var a = 'mouseover' === e || 'pointerover' === e,
            i = 'mouseout' === e || 'pointerout' === e;
          if (
            (a && 0 == (64 & o) && (t.relatedTarget || t.fromElement)) ||
            (!i && !a)
          )
            return null;
          ((a =
            r.window === r
              ? r
              : (a = r.ownerDocument)
              ? a.defaultView || a.parentWindow
              : window),
          i)
            ? ((i = n),
              null !==
                (n = (n = t.relatedTarget || t.toElement) ? Ot(n) : null) &&
                (n !== Ze(n) || (5 !== n.tag && 6 !== n.tag)) &&
                (n = null))
            : (i = null);
          if (i === n) return null;
          if ('mouseout' === e || 'mouseover' === e)
            var l = Mr,
              u = Lr.mouseLeave,
              c = Lr.mouseEnter,
              s = 'mouse';
          else
            ('pointerout' !== e && 'pointerover' !== e) ||
              ((l = zr),
              (u = Lr.pointerLeave),
              (c = Lr.pointerEnter),
              (s = 'pointer'));
          if (
            ((e = null == i ? a : zt(i)),
            (a = null == n ? a : zt(n)),
            ((u = l.getPooled(u, i, t, r)).type = s + 'leave'),
            (u.target = e),
            (u.relatedTarget = a),
            ((t = l.getPooled(c, n, t, r)).type = s + 'enter'),
            (t.target = a),
            (t.relatedTarget = e),
            (r = n),
            (s = i) && r)
          )
            e: {
              for (c = r, i = 0, e = l = s; e; e = Ir(e)) i++;
              for (e = 0, n = c; n; n = Ir(n)) e++;
              for (; 0 < i - e; ) (l = Ir(l)), i--;
              for (; 0 < e - i; ) (c = Ir(c)), e--;
              for (; i--; ) {
                if (l === c || (null !== c && l === c.alternate)) break e;
                (l = Ir(l)), (c = Ir(c));
              }
              l = null;
            }
          else l = null;
          return (
            null !== s && Rr(u, s, l, !1),
            null !== r && Rr(t, r, l, !0),
            0 == (128 & o) ? [u] : [u, t]
          );
        },
      };
    var jr =
        'function' == typeof Object.is
          ? Object.is
          : function (e, n) {
              return (
                (e === n && (0 !== e || 1 / e == 1 / n)) || (e != e && n != n)
              );
            },
      Dr = Object.prototype.hasOwnProperty;
    function Fr(e, n) {
      if (jr(e, n)) return !0;
      if (
        'object' != typeof e ||
        null === e ||
        'object' != typeof n ||
        null === n
      )
        return !1;
      var t = Object.keys(e),
        r = Object.keys(n);
      if (t.length !== r.length) return !1;
      for (r = 0; r < t.length; r++)
        if (!Dr.call(n, t[r]) || !jr(e[t[r]], n[t[r]])) return !1;
      return !0;
    }
    var Ur = C && 'documentMode' in document && 11 >= document.documentMode,
      Br = {
        select: {
          phasedRegistrationNames: {
            bubbled: 'onSelect',
            captured: 'onSelectCapture',
          },
          dependencies: 'blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange'.split(
            ' ',
          ),
        },
      },
      $r = null,
      Vr = null,
      Wr = null,
      Hr = !1;
    function Qr(e, n) {
      var t =
        n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
      return Hr || null == $r || $r !== ft(t)
        ? null
        : ('selectionStart' in (t = $r) && ht(t)
            ? (t = {start: t.selectionStart, end: t.selectionEnd})
            : (t = {
                anchorNode: (t = (
                  (t.ownerDocument && t.ownerDocument.defaultView) ||
                  window
                ).getSelection()).anchorNode,
                anchorOffset: t.anchorOffset,
                focusNode: t.focusNode,
                focusOffset: t.focusOffset,
              }),
          Wr && Fr(Wr, t)
            ? null
            : ((Wr = t),
              ((e = Ut.getPooled(Br.select, Vr, e, n)).type = 'select'),
              (e.target = $r),
              qt(e),
              e));
    }
    var qr = {
        eventTypes: Br,
        extractEvents: function (e, n, t, r, o, a) {
          if (
            !(a = !(o =
              a ||
              (r.window === r
                ? r.document
                : 9 === r.nodeType
                ? r
                : r.ownerDocument)))
          ) {
            e: {
              (o = Je(o)), (a = E.onSelect);
              for (var i = 0; i < a.length; i++)
                if (!o.has(a[i])) {
                  o = !1;
                  break e;
                }
              o = !0;
            }
            a = !o;
          }
          if (a) return null;
          switch (((o = n ? zt(n) : window), e)) {
            case 'focus':
              (lr(o) || 'true' === o.contentEditable) &&
                (($r = o), (Vr = n), (Wr = null));
              break;
            case 'blur':
              Wr = Vr = $r = null;
              break;
            case 'mousedown':
              Hr = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              return (Hr = !1), Qr(t, r);
            case 'selectionchange':
              if (Ur) break;
            case 'keydown':
            case 'keyup':
              return Qr(t, r);
          }
          return null;
        },
      },
      Kr = Ut.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      Yr = Ut.extend({
        clipboardData: function (e) {
          return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
      }),
      Xr = Er.extend({relatedTarget: null});
    function Gr(e) {
      var n = e.keyCode;
      return (
        'charCode' in e
          ? 0 === (e = e.charCode) && 13 === n && (e = 13)
          : (e = n),
        10 === e && (e = 13),
        32 <= e || 13 === e ? e : 0
      );
    }
    var Jr = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
      },
      Zr = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
      },
      eo = Er.extend({
        key: function (e) {
          if (e.key) {
            var n = Jr[e.key] || e.key;
            if ('Unidentified' !== n) return n;
          }
          return 'keypress' === e.type
            ? 13 === (e = Gr(e))
              ? 'Enter'
              : String.fromCharCode(e)
            : 'keydown' === e.type || 'keyup' === e.type
            ? Zr[e.keyCode] || 'Unidentified'
            : '';
        },
        code: null,
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: Sr,
        charCode: function (e) {
          return 'keypress' === e.type ? Gr(e) : 0;
        },
        keyCode: function (e) {
          return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return 'keypress' === e.type
            ? Gr(e)
            : 'keydown' === e.type || 'keyup' === e.type
            ? e.keyCode
            : 0;
        },
      }),
      no = Mr.extend({dataTransfer: null}),
      to = Er.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: Sr,
      }),
      ro = Ut.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      oo = Mr.extend({
        deltaX: function (e) {
          return 'deltaX' in e
            ? e.deltaX
            : 'wheelDeltaX' in e
            ? -e.wheelDeltaX
            : 0;
        },
        deltaY: function (e) {
          return 'deltaY' in e
            ? e.deltaY
            : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
        },
        deltaZ: null,
        deltaMode: null,
      }),
      ao = {
        eventTypes: vn,
        extractEvents: function (e, n, t, r) {
          var o = bn.get(e);
          if (!o) return null;
          switch (e) {
            case 'keypress':
              if (0 === Gr(t)) return null;
            case 'keydown':
            case 'keyup':
              e = eo;
              break;
            case 'blur':
            case 'focus':
            case 'beforeblur':
            case 'afterblur':
              e = Xr;
              break;
            case 'click':
              if (2 === t.button) return null;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              e = Mr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              e = no;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              e = to;
              break;
            case Qe:
            case qe:
            case Ke:
              e = Kr;
              break;
            case Ye:
              e = ro;
              break;
            case 'scroll':
              e = Er;
              break;
            case 'wheel':
              e = oo;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              e = Yr;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              e = zr;
              break;
            default:
              e = Ut;
          }
          return qt((n = e.getPooled(o, n, t, r))), n;
        },
      };
    if (g) throw Error(i(101));
    (g = Array.prototype.slice.call(
      'ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin'.split(
        ' ',
      ),
    )),
      b(),
      (m = zt),
      T({
        SimpleEventPlugin: ao,
        EnterLeaveEventPlugin: Ar,
        ChangeEventPlugin: kr,
        SelectEventPlugin: qr,
        BeforeInputEventPlugin: ar,
      });
    var io = [],
      lo = -1;
    function uo(e) {
      0 > lo || ((e.current = io[lo]), (io[lo] = null), lo--);
    }
    function co(e, n) {
      lo++, (io[lo] = e.current), (e.current = n);
    }
    var so = {},
      fo = {current: so},
      po = {current: !1},
      mo = so;
    function ho(e, n) {
      var t = e.type.contextTypes;
      if (!t) return so;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === n)
        return r.__reactInternalMemoizedMaskedChildContext;
      var o,
        a = {};
      for (o in t) a[o] = n[o];
      return (
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = n),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        a
      );
    }
    function go(e) {
      return null != (e = e.childContextTypes);
    }
    function vo() {
      uo(po), uo(fo);
    }
    function bo(e, n, t) {
      if (fo.current !== so) throw Error(i(168));
      co(fo, n), co(po, t);
    }
    function yo(e, n, t) {
      var r = e.stateNode;
      if (((e = n.childContextTypes), 'function' != typeof r.getChildContext))
        return t;
      for (var a in (r = r.getChildContext()))
        if (!(a in e)) throw Error(i(108, ve(n) || 'Unknown', a));
      return o({}, t, {}, r);
    }
    function wo(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          so),
        (mo = fo.current),
        co(fo, e),
        co(po, po.current),
        !0
      );
    }
    function xo(e, n, t) {
      var r = e.stateNode;
      if (!r) throw Error(i(169));
      t
        ? ((e = yo(e, n, mo)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          uo(po),
          uo(fo),
          co(fo, e))
        : uo(po),
        co(po, t);
    }
    var ko = a.unstable_runWithPriority,
      Eo = a.unstable_scheduleCallback,
      To = a.unstable_cancelCallback,
      Co = a.unstable_shouldYield,
      So = a.unstable_requestPaint,
      Po = a.unstable_now,
      _o = a.unstable_getCurrentPriorityLevel,
      No = a.unstable_ImmediatePriority,
      Oo = a.unstable_UserBlockingPriority,
      Mo = a.unstable_NormalPriority,
      zo = a.unstable_LowPriority,
      Io = a.unstable_IdlePriority,
      Ro = {},
      Lo = void 0 !== So ? So : function () {},
      Ao = null,
      jo = null,
      Do = !1,
      Fo = Po(),
      Uo =
        1e4 > Fo
          ? Po
          : function () {
              return Po() - Fo;
            };
    function Bo() {
      switch (_o()) {
        case No:
          return 99;
        case Oo:
          return 98;
        case Mo:
          return 97;
        case zo:
          return 96;
        case Io:
          return 95;
        default:
          throw Error(i(332));
      }
    }
    function $o(e) {
      switch (e) {
        case 99:
          return No;
        case 98:
          return Oo;
        case 97:
          return Mo;
        case 96:
          return zo;
        case 95:
          return Io;
        default:
          throw Error(i(332));
      }
    }
    function Vo(e, n) {
      return (e = $o(e)), ko(e, n);
    }
    function Wo(e, n, t) {
      return (e = $o(e)), Eo(e, n, t);
    }
    function Ho(e) {
      return null === Ao ? ((Ao = [e]), (jo = Eo(No, qo))) : Ao.push(e), Ro;
    }
    function Qo() {
      if (null !== jo) {
        var e = jo;
        (jo = null), To(e);
      }
      qo();
    }
    function qo() {
      if (!Do && null !== Ao) {
        Do = !0;
        var e = 0;
        try {
          var n = Ao;
          Vo(99, function () {
            for (; e < n.length; e++) {
              var t = n[e];
              do {
                t = t(!0);
              } while (null !== t);
            }
          }),
            (Ao = null);
        } catch (n) {
          throw (null !== Ao && (Ao = Ao.slice(e + 1)), Eo(No, Qo), n);
        } finally {
          Do = !1;
        }
      }
    }
    function Ko(e, n, t) {
      return (
        1073741821 - (1 + (((1073741821 - e + n / 10) / (t /= 10)) | 0)) * t
      );
    }
    function Yo(e, n) {
      if (e && e.defaultProps)
        for (var t in ((n = o({}, n)), (e = e.defaultProps)))
          void 0 === n[t] && (n[t] = e[t]);
      return n;
    }
    var Xo = {current: null},
      Go = null,
      Jo = null,
      Zo = null;
    function ea() {
      Zo = Jo = Go = null;
    }
    function na(e) {
      var n = Xo.current;
      uo(Xo), (e.type._context._currentValue = n);
    }
    function ta(e, n) {
      for (; null !== e; ) {
        var t = e.alternate;
        if (e.childExpirationTime < n)
          (e.childExpirationTime = n),
            null !== t &&
              t.childExpirationTime < n &&
              (t.childExpirationTime = n);
        else {
          if (!(null !== t && t.childExpirationTime < n)) break;
          t.childExpirationTime = n;
        }
        e = e.return;
      }
    }
    function ra(e, n) {
      (Go = e),
        (Zo = Jo = null),
        null !== (e = e.dependencies) &&
          null !== e.firstContext &&
          (e.expirationTime >= n && (Vi = !0), (e.firstContext = null));
    }
    function oa(e, n) {
      if (Zo !== e && !1 !== n && 0 !== n)
        if (
          (('number' == typeof n && 1073741823 !== n) ||
            ((Zo = e), (n = 1073741823)),
          (n = {context: e, observedBits: n, next: null}),
          null === Jo)
        ) {
          if (null === Go) throw Error(i(308));
          (Jo = n),
            (Go.dependencies = {
              expirationTime: 0,
              firstContext: n,
              responders: null,
            });
        } else Jo = Jo.next = n;
      return e._currentValue;
    }
    var aa = !1;
    function ia(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {pending: null},
        effects: null,
      };
    }
    function la(e, n) {
      (e = e.updateQueue),
        n.updateQueue === e &&
          (n.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
          });
    }
    function ua(e, n) {
      return {
        expirationTime: e,
        suspenseConfig: n,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function ca(e, n) {
      if (null !== (e = e.updateQueue)) {
        var t = (e = e.shared).pending;
        null === t ? (n.next = n) : ((n.next = t.next), (t.next = n)),
          (e.pending = n);
      }
    }
    function sa(e, n) {
      var t = e.updateQueue,
        r = e.alternate;
      if (null !== r && t === (r = r.updateQueue)) {
        var o = null,
          a = null;
        if (null !== (t = t.firstBaseUpdate)) {
          do {
            var i = {
              expirationTime: t.expirationTime,
              suspenseConfig: t.suspenseConfig,
              tag: t.tag,
              payload: t.payload,
              callback: t.callback,
              next: null,
            };
            null === a ? (o = a = i) : (a = a.next = i), (t = t.next);
          } while (null !== t);
          null === a ? (o = a = n) : (a = a.next = n);
        } else o = a = n;
        return (
          (t = {
            baseState: r.baseState,
            firstBaseUpdate: o,
            lastBaseUpdate: a,
            shared: r.shared,
            effects: r.effects,
          }),
          void (e.updateQueue = t)
        );
      }
      null === (e = t.lastBaseUpdate) ? (t.firstBaseUpdate = n) : (e.next = n),
        (t.lastBaseUpdate = n);
    }
    function fa(e, n, t, r) {
      var a = e.updateQueue;
      aa = !1;
      var i = a.firstBaseUpdate,
        l = a.lastBaseUpdate,
        u = a.shared.pending;
      if (null !== u) {
        a.shared.pending = null;
        var c = u,
          s = c.next;
        (c.next = null), null === l ? (i = s) : (l.next = s), (l = c);
        var f = e.alternate;
        if (null !== f) {
          var d = (f = f.updateQueue).lastBaseUpdate;
          d !== l &&
            (null === d ? (f.firstBaseUpdate = s) : (d.next = s),
            (f.lastBaseUpdate = c));
        }
      }
      if (null !== i) {
        for (d = a.baseState, l = 0, f = s = c = null; ; ) {
          if ((u = i.expirationTime) < r) {
            var p = {
              expirationTime: i.expirationTime,
              suspenseConfig: i.suspenseConfig,
              tag: i.tag,
              payload: i.payload,
              callback: i.callback,
              next: null,
            };
            null === f ? ((s = f = p), (c = d)) : (f = f.next = p),
              u > l && (l = u);
          } else {
            null !== f &&
              (f = f.next = {
                expirationTime: 1073741823,
                suspenseConfig: i.suspenseConfig,
                tag: i.tag,
                payload: i.payload,
                callback: i.callback,
                next: null,
              }),
              yu(u, i.suspenseConfig);
            e: {
              var m = e,
                h = i;
              switch (((u = n), (p = t), h.tag)) {
                case 1:
                  if ('function' == typeof (m = h.payload)) {
                    d = m.call(p, d, u);
                    break e;
                  }
                  d = m;
                  break e;
                case 3:
                  m.effectTag = (-4097 & m.effectTag) | 64;
                case 0:
                  if (
                    null ==
                    (u =
                      'function' == typeof (m = h.payload)
                        ? m.call(p, d, u)
                        : m)
                  )
                    break e;
                  d = o({}, d, u);
                  break e;
                case 2:
                  aa = !0;
              }
            }
            null !== i.callback &&
              ((e.effectTag |= 32),
              null === (u = a.effects) ? (a.effects = [i]) : u.push(i));
          }
          if (null === (i = i.next)) {
            if (null === (u = a.shared.pending)) break;
            (i = u.next),
              (u.next = null),
              (a.lastBaseUpdate = u),
              (a.shared.pending = null);
          }
        }
        null === f && (c = d),
          (a.baseState = c),
          (a.firstBaseUpdate = s),
          (a.lastBaseUpdate = f),
          wu(l),
          (e.expirationTime = l),
          (e.memoizedState = d);
      }
    }
    function da(e, n, t) {
      if (((e = n.effects), (n.effects = null), null !== e))
        for (n = 0; n < e.length; n++) {
          var r = e[n],
            o = r.callback;
          if (null !== o) {
            if (((r.callback = null), (r = t), 'function' != typeof o))
              throw Error(i(191, o));
            o.call(r);
          }
        }
    }
    var pa = K.ReactCurrentBatchConfig,
      ma = new r.Component().refs;
    function ha(e, n, t, r) {
      (t = null == (t = t(r, (n = e.memoizedState))) ? n : o({}, n, t)),
        (e.memoizedState = t),
        0 === e.expirationTime && (e.updateQueue.baseState = t);
    }
    var ga = {
      isMounted: function (e) {
        return !!(e = e._reactInternals) && Ze(e) === e;
      },
      enqueueSetState: function (e, n, t) {
        e = e._reactInternals;
        var r = ru(),
          o = pa.suspense;
        ((o = ua((r = ou(r, e, o)), o)).payload = n),
          null != t && (o.callback = t),
          ca(e, o),
          au(e, r);
      },
      enqueueReplaceState: function (e, n, t) {
        e = e._reactInternals;
        var r = ru(),
          o = pa.suspense;
        ((o = ua((r = ou(r, e, o)), o)).tag = 1),
          (o.payload = n),
          null != t && (o.callback = t),
          ca(e, o),
          au(e, r);
      },
      enqueueForceUpdate: function (e, n) {
        e = e._reactInternals;
        var t = ru(),
          r = pa.suspense;
        ((r = ua((t = ou(t, e, r)), r)).tag = 2),
          null != n && (r.callback = n),
          ca(e, r),
          au(e, t);
      },
    };
    function va(e, n, t, r, o, a, i) {
      return 'function' == typeof (e = e.stateNode).shouldComponentUpdate
        ? e.shouldComponentUpdate(r, a, i)
        : !n.prototype ||
            !n.prototype.isPureReactComponent ||
            !Fr(t, r) ||
            !Fr(o, a);
    }
    function ba(e, n, t) {
      var r = !1,
        o = so,
        a = n.contextType;
      return (
        'object' == typeof a && null !== a
          ? (a = oa(a))
          : ((o = go(n) ? mo : fo.current),
            (a = (r = null != (r = n.contextTypes)) ? ho(e, o) : so)),
        (n = new n(t, a)),
        (e.memoizedState =
          null !== n.state && void 0 !== n.state ? n.state : null),
        (n.updater = ga),
        (e.stateNode = n),
        (n._reactInternals = e),
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        n
      );
    }
    function ya(e, n, t, r) {
      (e = n.state),
        'function' == typeof n.componentWillReceiveProps &&
          n.componentWillReceiveProps(t, r),
        'function' == typeof n.UNSAFE_componentWillReceiveProps &&
          n.UNSAFE_componentWillReceiveProps(t, r),
        n.state !== e && ga.enqueueReplaceState(n, n.state, null);
    }
    function wa(e, n, t, r) {
      var o = e.stateNode;
      (o.props = t), (o.state = e.memoizedState), (o.refs = ma), ia(e);
      var a = n.contextType;
      'object' == typeof a && null !== a
        ? (o.context = oa(a))
        : ((a = go(n) ? mo : fo.current), (o.context = ho(e, a))),
        fa(e, t, o, r),
        (o.state = e.memoizedState),
        'function' == typeof (a = n.getDerivedStateFromProps) &&
          (ha(e, n, a, t), (o.state = e.memoizedState)),
        'function' == typeof n.getDerivedStateFromProps ||
          'function' == typeof o.getSnapshotBeforeUpdate ||
          ('function' != typeof o.UNSAFE_componentWillMount &&
            'function' != typeof o.componentWillMount) ||
          ((n = o.state),
          'function' == typeof o.componentWillMount && o.componentWillMount(),
          'function' == typeof o.UNSAFE_componentWillMount &&
            o.UNSAFE_componentWillMount(),
          n !== o.state && ga.enqueueReplaceState(o, o.state, null),
          fa(e, t, o, r),
          (o.state = e.memoizedState)),
        'function' == typeof o.componentDidMount && (e.effectTag |= 4);
    }
    var xa = Array.isArray;
    function ka(e, n, t) {
      if (
        null !== (e = t.ref) &&
        'function' != typeof e &&
        'object' != typeof e
      ) {
        if (t._owner) {
          if ((t = t._owner)) {
            if (1 !== t.tag) throw Error(i(309));
            var r = t.stateNode;
          }
          if (!r) throw Error(i(147, e));
          var o = '' + e;
          return null !== n &&
            null !== n.ref &&
            'function' == typeof n.ref &&
            n.ref._stringRef === o
            ? n.ref
            : (((n = function (e) {
                var n = r.refs;
                n === ma && (n = r.refs = {}),
                  null === e ? delete n[o] : (n[o] = e);
              })._stringRef = o),
              n);
        }
        if ('string' != typeof e) throw Error(i(284));
        if (!t._owner) throw Error(i(290, e));
      }
      return e;
    }
    function Ea(e, n) {
      if ('textarea' !== e.type)
        throw Error(
          i(
            31,
            '[object Object]' === Object.prototype.toString.call(n)
              ? 'object with keys {' + Object.keys(n).join(', ') + '}'
              : n,
            '',
          ),
        );
    }
    function Ta(e) {
      try {
        return (0, e._init)(e._payload);
      } catch (n) {
        return e;
      }
    }
    function Ca(e) {
      function n(n, t) {
        if (e) {
          var r = n.lastEffect;
          null !== r
            ? ((r.nextEffect = t), (n.lastEffect = t))
            : (n.firstEffect = n.lastEffect = t),
            (t.nextEffect = null),
            (t.effectTag = 8);
        }
      }
      function t(t, r) {
        if (!e) return null;
        for (; null !== r; ) n(t, r), (r = r.sibling);
        return null;
      }
      function r(e, n) {
        for (e = new Map(); null !== n; )
          null !== n.key ? e.set(n.key, n) : e.set(n.index, n), (n = n.sibling);
        return e;
      }
      function o(e, n) {
        return ((e = Wu(e, n)).index = 0), (e.sibling = null), e;
      }
      function a(n, t, r) {
        return (
          (n.index = r),
          e
            ? null !== (r = n.alternate)
              ? (r = r.index) < t
                ? ((n.effectTag = 2), t)
                : r
              : ((n.effectTag = 2), t)
            : t
        );
      }
      function l(n) {
        return e && null === n.alternate && (n.effectTag = 2), n;
      }
      function u(e, n, t, r) {
        return null === n || 6 !== n.tag
          ? (((n = qu(t, e.mode, r)).return = e), n)
          : (((n = o(n, t)).return = e), n);
      }
      function c(e, n, t, r) {
        if (null !== n) {
          if (n.elementType === t.type) {
            var a = o(n, t.props);
            return (a.ref = ka(e, n, t)), (a.return = e), a;
          }
          if (
            22 === n.tag &&
            ((a = t.type).$$typeof === le && (a = Ta(a)),
            a.$$typeof === ue && a._render === n.type._render)
          )
            return ((n = o(n, t.props)).return = e), (n.type = a), n;
        }
        return (
          ((a = Hu(t.type, t.key, t.props, null, e.mode, r)).ref = ka(e, n, t)),
          (a.return = e),
          a
        );
      }
      function s(e, n, t, r) {
        return null === n ||
          4 !== n.tag ||
          n.stateNode.containerInfo !== t.containerInfo ||
          n.stateNode.implementation !== t.implementation
          ? (((n = Ku(t, e.mode, r)).return = e), n)
          : (((n = o(n, t.children || [])).return = e), n);
      }
      function f(e, n, t, r, a) {
        return null === n || 7 !== n.tag
          ? (((n = Qu(t, e.mode, r, a)).return = e), n)
          : (((n = o(n, t)).return = e), n);
      }
      function d(e, n, t) {
        if ('string' == typeof n || 'number' == typeof n)
          return ((n = qu('' + n, e.mode, t)).return = e), n;
        if ('object' == typeof n && null !== n) {
          switch (n.$$typeof) {
            case X:
              return (
                ((t = Hu(n.type, n.key, n.props, null, e.mode, t)).ref = ka(
                  e,
                  null,
                  n,
                )),
                (t.return = e),
                t
              );
            case G:
              return ((n = Ku(n, e.mode, t)).return = e), n;
          }
          if (xa(n) || de(n))
            return ((n = Qu(n, e.mode, t, null)).return = e), n;
          Ea(e, n);
        }
        return null;
      }
      function p(e, n, t, r) {
        var o = null !== n ? n.key : null;
        if ('string' == typeof t || 'number' == typeof t)
          return null !== o ? null : u(e, n, '' + t, r);
        if ('object' == typeof t && null !== t) {
          switch (t.$$typeof) {
            case X:
              return t.key === o
                ? t.type === J
                  ? f(e, n, t.props.children, r, o)
                  : c(e, n, t, r)
                : null;
            case G:
              return t.key === o ? s(e, n, t, r) : null;
          }
          if (xa(t) || de(t)) return null !== o ? null : f(e, n, t, r, null);
          Ea(e, t);
        }
        return null;
      }
      function m(e, n, t, r, o) {
        if ('string' == typeof r || 'number' == typeof r)
          return u(n, (e = e.get(t) || null), '' + r, o);
        if ('object' == typeof r && null !== r) {
          switch (r.$$typeof) {
            case X:
              return (
                (e = e.get(null === r.key ? t : r.key) || null),
                r.type === J
                  ? f(n, e, r.props.children, o, r.key)
                  : c(n, e, r, o)
              );
            case G:
              return s(
                n,
                (e = e.get(null === r.key ? t : r.key) || null),
                r,
                o,
              );
          }
          if (xa(r) || de(r)) return f(n, (e = e.get(t) || null), r, o, null);
          Ea(n, r);
        }
        return null;
      }
      function h(o, i, l, u) {
        for (
          var c = null, s = null, f = i, h = (i = 0), g = null;
          null !== f && h < l.length;
          h++
        ) {
          f.index > h ? ((g = f), (f = null)) : (g = f.sibling);
          var v = p(o, f, l[h], u);
          if (null === v) {
            null === f && (f = g);
            break;
          }
          e && f && null === v.alternate && n(o, f),
            (i = a(v, i, h)),
            null === s ? (c = v) : (s.sibling = v),
            (s = v),
            (f = g);
        }
        if (h === l.length) return t(o, f), c;
        if (null === f) {
          for (; h < l.length; h++)
            null !== (f = d(o, l[h], u)) &&
              ((i = a(f, i, h)),
              null === s ? (c = f) : (s.sibling = f),
              (s = f));
          return c;
        }
        for (f = r(o, f); h < l.length; h++)
          null !== (g = m(f, o, h, l[h], u)) &&
            (e && null !== g.alternate && f.delete(null === g.key ? h : g.key),
            (i = a(g, i, h)),
            null === s ? (c = g) : (s.sibling = g),
            (s = g));
        return (
          e &&
            f.forEach(function (e) {
              return n(o, e);
            }),
          c
        );
      }
      function g(o, l, u, c) {
        var s = de(u);
        if ('function' != typeof s) throw Error(i(150));
        if (null == (u = s.call(u))) throw Error(i(151));
        for (
          var f = (s = null), h = l, g = (l = 0), v = null, b = u.next();
          null !== h && !b.done;
          g++, b = u.next()
        ) {
          h.index > g ? ((v = h), (h = null)) : (v = h.sibling);
          var y = p(o, h, b.value, c);
          if (null === y) {
            null === h && (h = v);
            break;
          }
          e && h && null === y.alternate && n(o, h),
            (l = a(y, l, g)),
            null === f ? (s = y) : (f.sibling = y),
            (f = y),
            (h = v);
        }
        if (b.done) return t(o, h), s;
        if (null === h) {
          for (; !b.done; g++, b = u.next())
            null !== (b = d(o, b.value, c)) &&
              ((l = a(b, l, g)),
              null === f ? (s = b) : (f.sibling = b),
              (f = b));
          return s;
        }
        for (h = r(o, h); !b.done; g++, b = u.next())
          null !== (b = m(h, o, g, b.value, c)) &&
            (e && null !== b.alternate && h.delete(null === b.key ? g : b.key),
            (l = a(b, l, g)),
            null === f ? (s = b) : (f.sibling = b),
            (f = b));
        return (
          e &&
            h.forEach(function (e) {
              return n(o, e);
            }),
          s
        );
      }
      return function (e, r, a, u) {
        var c =
          'object' == typeof a && null !== a && a.type === J && null === a.key;
        c && (a = a.props.children);
        var s = 'object' == typeof a && null !== a;
        if (s)
          switch (a.$$typeof) {
            case X:
              e: {
                for (s = a.key, c = r; null !== c; ) {
                  if (c.key === s) {
                    switch (c.tag) {
                      case 7:
                        if (a.type === J) {
                          t(e, c.sibling),
                            ((r = o(c, a.props.children)).return = e),
                            (e = r);
                          break e;
                        }
                        break;
                      case 22:
                        if (
                          ((s = a.type).$$typeof === le && (s = Ta(s)),
                          s.$$typeof === ue && s._render === c.type._render)
                        ) {
                          t(e, c.sibling),
                            ((r = o(c, a.props)).type = s),
                            (r.return = e),
                            (e = r);
                          break e;
                        }
                      default:
                        if (c.elementType === a.type) {
                          t(e, c.sibling),
                            ((r = o(c, a.props)).ref = ka(e, c, a)),
                            (r.return = e),
                            (e = r);
                          break e;
                        }
                    }
                    t(e, c);
                    break;
                  }
                  n(e, c), (c = c.sibling);
                }
                a.type === J
                  ? (((r = Qu(a.props.children, e.mode, u, a.key)).return = e),
                    (e = r))
                  : (((u = Hu(
                      a.type,
                      a.key,
                      a.props,
                      null,
                      e.mode,
                      u,
                    )).ref = ka(e, r, a)),
                    (u.return = e),
                    (e = u));
              }
              return l(e);
            case G:
              e: {
                for (c = a.key; null !== r; ) {
                  if (r.key === c) {
                    if (
                      4 === r.tag &&
                      r.stateNode.containerInfo === a.containerInfo &&
                      r.stateNode.implementation === a.implementation
                    ) {
                      t(e, r.sibling),
                        ((r = o(r, a.children || [])).return = e),
                        (e = r);
                      break e;
                    }
                    t(e, r);
                    break;
                  }
                  n(e, r), (r = r.sibling);
                }
                ((r = Ku(a, e.mode, u)).return = e), (e = r);
              }
              return l(e);
          }
        if ('string' == typeof a || 'number' == typeof a)
          return (
            (a = '' + a),
            null !== r && 6 === r.tag
              ? (t(e, r.sibling), ((r = o(r, a)).return = e), (e = r))
              : (t(e, r), ((r = qu(a, e.mode, u)).return = e), (e = r)),
            l(e)
          );
        if (xa(a)) return h(e, r, a, u);
        if (de(a)) return g(e, r, a, u);
        if ((s && Ea(e, a), void 0 === a && !c))
          switch (e.tag) {
            case 1:
            case 0:
              throw (
                ((e = e.type),
                Error(i(152, e.displayName || e.name || 'Component')))
              );
          }
        return t(e, r);
      };
    }
    var Sa = Ca(!0),
      Pa = Ca(!1),
      _a = {},
      Na = {current: _a},
      Oa = {current: _a},
      Ma = {current: _a};
    function za(e) {
      if (e === _a) throw Error(i(174));
      return e;
    }
    function Ia(e, n) {
      switch ((co(Ma, n), co(Oa, e), co(Na, _a), (e = n.nodeType))) {
        case 9:
        case 11:
          n = (n = n.documentElement) ? n.namespaceURI : je(null, '');
          break;
        default:
          n = je(
            (n = (e = 8 === e ? n.parentNode : n).namespaceURI || null),
            (e = e.tagName),
          );
      }
      uo(Na), co(Na, n);
    }
    function Ra() {
      uo(Na), uo(Oa), uo(Ma);
    }
    function La(e) {
      za(Ma.current);
      var n = za(Na.current),
        t = je(n, e.type);
      n !== t && (co(Oa, e), co(Na, t));
    }
    function Aa(e) {
      Oa.current === e && (uo(Na), uo(Oa));
    }
    var ja = {current: 0};
    function Da(e) {
      for (var n = e; null !== n; ) {
        if (13 === n.tag) {
          var t = n.memoizedState;
          if (
            null !== t &&
            (null === (t = t.dehydrated) || '$?' === t.data || '$!' === t.data)
          )
            return n;
        } else if (19 === n.tag && void 0 !== n.memoizedProps.revealOrder) {
          if (0 != (64 & n.effectTag)) return n;
        } else if (null !== n.child) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === e) break;
        for (; null === n.sibling; ) {
          if (null === n.return || n.return === e) return null;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
      return null;
    }
    function Fa(e, n) {
      return {responder: e, props: n};
    }
    var Ua = null,
      Ba = null,
      $a = !1;
    function Va(e, n) {
      var t = $u(5, null, null, 0);
      (t.elementType = 'DELETED'),
        (t.type = 'DELETED'),
        (t.stateNode = n),
        (t.return = e),
        (t.effectTag = 8),
        null !== e.lastEffect
          ? ((e.lastEffect.nextEffect = t), (e.lastEffect = t))
          : (e.firstEffect = e.lastEffect = t);
    }
    function Wa(e, n) {
      switch (e.tag) {
        case 5:
          var t = e.type;
          return (
            null !==
              (n =
                1 !== n.nodeType || t.toLowerCase() !== n.nodeName.toLowerCase()
                  ? null
                  : n) && ((e.stateNode = n), !0)
          );
        case 6:
          return (
            null !==
              (n = '' === e.pendingProps || 3 !== n.nodeType ? null : n) &&
            ((e.stateNode = n), !0)
          );
        case 13:
          return (
            null !== (n = 8 !== n.nodeType ? null : n) &&
            ((e.memoizedState = {dehydrated: n, baseTime: 0, retryTime: 1}),
            ((t = $u(18, null, null, 0)).stateNode = n),
            (t.return = e),
            (e.child = t),
            !0)
          );
        default:
          return !1;
      }
    }
    function Ha(e) {
      if ($a) {
        var n = Ba;
        if (n) {
          var t = n;
          if (!Wa(e, n)) {
            if (!(n = Et(t.nextSibling)) || !Wa(e, n))
              return (
                (e.effectTag = (-1025 & e.effectTag) | 2),
                ($a = !1),
                void (Ua = e)
              );
            Va(Ua, t);
          }
          (Ua = e), (Ba = Et(n.firstChild));
        } else (e.effectTag = (-1025 & e.effectTag) | 2), ($a = !1), (Ua = e);
      }
    }
    function Qa(e) {
      for (
        e = e.return;
        null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

      )
        e = e.return;
      Ua = e;
    }
    function qa(e) {
      if (e !== Ua) return !1;
      if (!$a) return Qa(e), ($a = !0), !1;
      var n = e.type;
      if (
        5 !== e.tag ||
        ('head' !== n && 'body' !== n && !yt(n, e.memoizedProps))
      )
        for (n = Ba; n; ) Va(e, n), (n = Et(n.nextSibling));
      if ((Qa(e), 13 === e.tag)) {
        if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
          throw Error(i(317));
        e: {
          for (e = e.nextSibling, n = 0; e; ) {
            if (8 === e.nodeType) {
              var t = e.data;
              if ('/$' === t) {
                if (0 === n) {
                  Ba = Et(e.nextSibling);
                  break e;
                }
                n--;
              } else ('$' !== t && '$!' !== t && '$?' !== t) || n++;
            }
            e = e.nextSibling;
          }
          Ba = null;
        }
      } else Ba = Ua ? Et(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Ka() {
      (Ba = Ua = null), ($a = !1);
    }
    var Ya = [];
    function Xa(e, n) {
      var t = e.mutableSourceLastPendingUpdateTime;
      (0 === t || n < t) && (e.mutableSourceLastPendingUpdateTime = n);
    }
    function Ga() {
      for (var e = 0; e < Ya.length; e++)
        Ya[e]._workInProgressVersionPrimary = null;
      Ya.length = 0;
    }
    var Ja = K.ReactCurrentDispatcher,
      Za = K.ReactCurrentBatchConfig,
      ei = 0,
      ni = null,
      ti = null,
      ri = null,
      oi = !1,
      ai = !1;
    function ii() {
      throw Error(i(321));
    }
    function li(e, n) {
      if (null === n) return !1;
      for (var t = 0; t < n.length && t < e.length; t++)
        if (!jr(e[t], n[t])) return !1;
      return !0;
    }
    function ui(e, n, t, r, o, a) {
      if (
        ((ei = a),
        (ni = n),
        (n.memoizedState = null),
        (n.updateQueue = null),
        (n.expirationTime = 0),
        (Ja.current = null === e || null === e.memoizedState ? Fi : Ui),
        (e = t(r, o)),
        ai)
      ) {
        a = 0;
        do {
          if (((ai = !1), !(25 > a))) throw Error(i(301));
          (a += 1),
            (ri = ti = null),
            (n.updateQueue = null),
            (Ja.current = Bi),
            (e = t(r, o));
        } while (ai);
      }
      if (
        ((Ja.current = Di),
        (n = null !== ti && null !== ti.next),
        (ei = 0),
        (ri = ti = ni = null),
        (oi = !1),
        n)
      )
        throw Error(i(300));
      return e;
    }
    function ci(e, n, t) {
      (n.updateQueue = e.updateQueue),
        (n.effectTag &= -517),
        e.expirationTime <= t && (e.expirationTime = 0);
    }
    function si() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return null === ri ? (ni.memoizedState = ri = e) : (ri = ri.next = e), ri;
    }
    function fi() {
      if (null === ti) {
        var e = ni.alternate;
        e = null !== e ? e.memoizedState : null;
      } else e = ti.next;
      var n = null === ri ? ni.memoizedState : ri.next;
      if (null !== n) (ri = n), (ti = e);
      else {
        if (null === e) throw Error(i(310));
        (e = {
          memoizedState: (ti = e).memoizedState,
          baseState: ti.baseState,
          baseQueue: ti.baseQueue,
          queue: ti.queue,
          next: null,
        }),
          null === ri ? (ni.memoizedState = ri = e) : (ri = ri.next = e);
      }
      return ri;
    }
    function di(e, n) {
      return 'function' == typeof n ? n(e) : n;
    }
    function pi(e) {
      var n = fi(),
        t = n.queue;
      if (null === t) throw Error(i(311));
      t.lastRenderedReducer = e;
      var r = ti,
        o = r.baseQueue,
        a = t.pending;
      if (null !== a) {
        if (null !== o) {
          var l = o.next;
          (o.next = a.next), (a.next = l);
        }
        (r.baseQueue = o = a), (t.pending = null);
      }
      if (null !== o) {
        (o = o.next), (r = r.baseState);
        var u = (l = a = null),
          c = o;
        do {
          var s = c.expirationTime;
          if (s < ei) {
            var f = {
              expirationTime: c.expirationTime,
              suspenseConfig: c.suspenseConfig,
              action: c.action,
              eagerReducer: c.eagerReducer,
              eagerState: c.eagerState,
              next: null,
            };
            null === u ? ((l = u = f), (a = r)) : (u = u.next = f),
              s > ni.expirationTime && ((ni.expirationTime = s), wu(s));
          } else
            null !== u &&
              (u = u.next = {
                expirationTime: 1073741823,
                suspenseConfig: c.suspenseConfig,
                action: c.action,
                eagerReducer: c.eagerReducer,
                eagerState: c.eagerState,
                next: null,
              }),
              yu(s, c.suspenseConfig),
              (r = c.eagerReducer === e ? c.eagerState : e(r, c.action));
          c = c.next;
        } while (null !== c && c !== o);
        null === u ? (a = r) : (u.next = l),
          jr(r, n.memoizedState) || (Vi = !0),
          (n.memoizedState = r),
          (n.baseState = a),
          (n.baseQueue = u),
          (t.lastRenderedState = r);
      }
      return [n.memoizedState, t.dispatch];
    }
    function mi(e) {
      var n = fi(),
        t = n.queue;
      if (null === t) throw Error(i(311));
      t.lastRenderedReducer = e;
      var r = t.dispatch,
        o = t.pending,
        a = n.memoizedState;
      if (null !== o) {
        t.pending = null;
        var l = (o = o.next);
        do {
          (a = e(a, l.action)), (l = l.next);
        } while (l !== o);
        jr(a, n.memoizedState) || (Vi = !0),
          (n.memoizedState = a),
          null === n.baseQueue && (n.baseState = a),
          (t.lastRenderedState = a);
      }
      return [a, r];
    }
    function hi(e, n, t) {
      var r = n._getVersion;
      r = r(n._source);
      var o = n._workInProgressVersionPrimary;
      if (
        (null !== o
          ? (e = o === r)
          : (e = 0 === (e = e.mutableSourceLastPendingUpdateTime) || e >= ei) &&
            ((n._workInProgressVersionPrimary = r), Ya.push(n)),
        e)
      )
        return t(n._source);
      throw (Ya.push(n), Error(i(350)));
    }
    function gi(e, n, t, r) {
      var o = Ll;
      if (null === o) throw Error(i(349));
      var a = n._getVersion,
        l = a(n._source),
        u = Ja.current,
        c = u.useState(function () {
          return hi(o, n, t);
        }),
        s = c[1],
        f = c[0];
      c = ri;
      var d = e.memoizedState,
        p = d.refs,
        m = p.getSnapshot,
        h = d.source;
      d = d.subscribe;
      var g = ni;
      return (
        (e.memoizedState = {refs: p, source: n, subscribe: r}),
        u.useEffect(
          function () {
            (p.getSnapshot = t), (p.setSnapshot = s);
            var e = a(n._source);
            jr(l, e) ||
              ((e = t(n._source)),
              jr(f, e) ||
                (s(e),
                (e = ou((e = ru()), g, pa.suspense)),
                Xa(o, e),
                Zu(o, o.mutableSourceLastPendingUpdateTime)));
          },
          [t, n, r],
        ),
        u.useEffect(
          function () {
            return r(n._source, function () {
              var e = p.getSnapshot,
                t = p.setSnapshot;
              try {
                t(e(n._source));
                var r = ou(ru(), g, pa.suspense);
                Xa(o, r);
              } catch (e) {
                t(function () {
                  throw e;
                });
              }
            });
          },
          [n, r],
        ),
        (jr(m, t) && jr(h, n) && jr(d, r)) ||
          (((e = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: di,
            lastRenderedState: f,
          }).dispatch = s = Ii.bind(null, ni, e)),
          (c.queue = e),
          (c.baseQueue = null),
          (f = hi(o, n, t)),
          (c.memoizedState = c.baseState = f)),
        f
      );
    }
    function vi(e, n, t) {
      return gi(fi(), e, n, t);
    }
    function bi(e) {
      var n = si();
      return (
        'function' == typeof e && (e = e()),
        (n.memoizedState = n.baseState = e),
        (e = (e = n.queue = {
          pending: null,
          dispatch: null,
          lastRenderedReducer: di,
          lastRenderedState: e,
        }).dispatch = Ii.bind(null, ni, e)),
        [n.memoizedState, e]
      );
    }
    function yi(e, n, t, r) {
      return (
        (e = {tag: e, create: n, destroy: t, deps: r, next: null}),
        null === (n = ni.updateQueue)
          ? ((n = {lastEffect: null}),
            (ni.updateQueue = n),
            (n.lastEffect = e.next = e))
          : null === (t = n.lastEffect)
          ? (n.lastEffect = e.next = e)
          : ((r = t.next), (t.next = e), (e.next = r), (n.lastEffect = e)),
        e
      );
    }
    function wi() {
      return fi().memoizedState;
    }
    function xi(e, n, t, r) {
      var o = si();
      (ni.effectTag |= e),
        (o.memoizedState = yi(1 | n, t, void 0, void 0 === r ? null : r));
    }
    function ki(e, n, t, r) {
      var o = fi();
      r = void 0 === r ? null : r;
      var a = void 0;
      if (null !== ti) {
        var i = ti.memoizedState;
        if (((a = i.destroy), null !== r && li(r, i.deps)))
          return void yi(n, t, a, r);
      }
      (ni.effectTag |= e), (o.memoizedState = yi(1 | n, t, a, r));
    }
    function Ei(e, n) {
      return xi(516, 4, e, n);
    }
    function Ti(e, n) {
      return ki(516, 4, e, n);
    }
    function Ci(e, n) {
      return ki(4, 2, e, n);
    }
    function Si(e, n) {
      return 'function' == typeof n
        ? ((e = e()),
          n(e),
          function () {
            n(null);
          })
        : null != n
        ? ((e = e()),
          (n.current = e),
          function () {
            n.current = null;
          })
        : void 0;
    }
    function Pi(e, n, t) {
      return (
        (t = null != t ? t.concat([e]) : null), ki(4, 2, Si.bind(null, n, e), t)
      );
    }
    function _i() {}
    function Ni(e, n) {
      return (si().memoizedState = [e, void 0 === n ? null : n]), e;
    }
    function Oi(e, n) {
      var t = fi();
      n = void 0 === n ? null : n;
      var r = t.memoizedState;
      return null !== r && null !== n && li(n, r[1])
        ? r[0]
        : ((t.memoizedState = [e, n]), e);
    }
    function Mi(e, n) {
      var t = fi();
      n = void 0 === n ? null : n;
      var r = t.memoizedState;
      return null !== r && null !== n && li(n, r[1])
        ? r[0]
        : ((e = e()), (t.memoizedState = [e, n]), e);
    }
    function zi(e, n, t) {
      var r = Bo();
      Vo(98 > r ? 98 : r, function () {
        e(!0);
      }),
        Vo(97 < r ? 97 : r, function () {
          var r = Za.suspense;
          Za.suspense = void 0 === n ? null : n;
          try {
            e(!1), t();
          } finally {
            Za.suspense = r;
          }
        });
    }
    function Ii(e, n, t) {
      var r = ru(),
        o = pa.suspense;
      o = {
        expirationTime: (r = ou(r, e, o)),
        suspenseConfig: o,
        action: t,
        eagerReducer: null,
        eagerState: null,
        next: null,
      };
      var a = n.pending;
      if (
        (null === a ? (o.next = o) : ((o.next = a.next), (a.next = o)),
        (n.pending = o),
        (a = e.alternate),
        e === ni || (null !== a && a === ni))
      )
        (ai = oi = !0), (o.expirationTime = ei);
      else {
        if (
          0 === e.expirationTime &&
          (null === a || 0 === a.expirationTime) &&
          null !== (a = n.lastRenderedReducer)
        )
          try {
            var i = n.lastRenderedState,
              l = a(i, t);
            if (((o.eagerReducer = a), (o.eagerState = l), jr(l, i))) return;
          } catch (e) {}
        au(e, r);
      }
    }
    function Ri() {}
    var Li,
      Ai,
      ji,
      Di = {
        readContext: oa,
        useCallback: ii,
        useContext: ii,
        useEffect: ii,
        useImperativeHandle: ii,
        useLayoutEffect: ii,
        useMemo: ii,
        useReducer: ii,
        useRef: ii,
        useState: ii,
        useDebugValue: ii,
        useResponder: ii,
        useDeferredValue: ii,
        useTransition: ii,
        useMutableSource: ii,
        useEvent: ii,
        useOpaqueIdentifier: ii,
      },
      Fi = {
        readContext: oa,
        useCallback: Ni,
        useContext: oa,
        useEffect: Ei,
        useImperativeHandle: function (e, n, t) {
          return (
            (t = null != t ? t.concat([e]) : null),
            xi(4, 2, Si.bind(null, n, e), t)
          );
        },
        useLayoutEffect: function (e, n) {
          return xi(4, 2, e, n);
        },
        useMemo: function (e, n) {
          var t = si();
          return (
            (n = void 0 === n ? null : n),
            (e = e()),
            (t.memoizedState = [e, n]),
            e
          );
        },
        useReducer: function (e, n, t) {
          var r = si();
          return (
            (n = void 0 !== t ? t(n) : n),
            (r.memoizedState = r.baseState = n),
            (e = (e = r.queue = {
              pending: null,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: n,
            }).dispatch = Ii.bind(null, ni, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = {current: e}), (si().memoizedState = e);
        },
        useState: bi,
        useDebugValue: _i,
        useResponder: Fa,
        useDeferredValue: function (e, n) {
          var t = bi(e),
            r = t[0],
            o = t[1];
          return (
            Ei(
              function () {
                var t = Za.suspense;
                Za.suspense = void 0 === n ? null : n;
                try {
                  o(e);
                } finally {
                  Za.suspense = t;
                }
              },
              [e, n],
            ),
            r
          );
        },
        useTransition: function (e) {
          var n = bi(!1),
            t = n[0];
          return (n = n[1]), [Ni(zi.bind(null, n, e), [n, e]), t];
        },
        useMutableSource: function (e, n, t) {
          var r = si();
          return (
            (r.memoizedState = {
              refs: {getSnapshot: n, setSnapshot: null},
              source: e,
              subscribe: t,
            }),
            gi(r, e, n, t)
          );
        },
        useEvent: function () {},
        useOpaqueIdentifier: function () {
          if ($a) {
            var e = !1,
              n = (function (e) {
                return {$$typeof: ce, toString: e, valueOf: e};
              })(function () {
                throw (
                  (e || ((e = !0), t('r:' + (Ct++).toString(36))),
                  Error(i(355)))
                );
              }),
              t = bi(n)[1];
            return (
              0 == (2 & ni.mode) &&
                ((ni.effectTag |= 516),
                yi(
                  5,
                  function () {
                    t('r:' + (Ct++).toString(36));
                  },
                  void 0,
                  null,
                )),
              n
            );
          }
          return bi((n = 'r:' + (Ct++).toString(36))), n;
        },
      },
      Ui = {
        readContext: oa,
        useCallback: Oi,
        useContext: oa,
        useEffect: Ti,
        useImperativeHandle: Pi,
        useLayoutEffect: Ci,
        useMemo: Mi,
        useReducer: pi,
        useRef: wi,
        useState: function () {
          return pi(di);
        },
        useDebugValue: _i,
        useResponder: Fa,
        useDeferredValue: function (e, n) {
          var t = pi(di),
            r = t[0],
            o = t[1];
          return (
            Ti(
              function () {
                var t = Za.suspense;
                Za.suspense = void 0 === n ? null : n;
                try {
                  o(e);
                } finally {
                  Za.suspense = t;
                }
              },
              [e, n],
            ),
            r
          );
        },
        useTransition: function (e) {
          var n = pi(di),
            t = n[0];
          return (n = n[1]), [Oi(zi.bind(null, n, e), [n, e]), t];
        },
        useMutableSource: vi,
        useEvent: Ri,
        useOpaqueIdentifier: function () {
          return pi(di)[0];
        },
      },
      Bi = {
        readContext: oa,
        useCallback: Oi,
        useContext: oa,
        useEffect: Ti,
        useImperativeHandle: Pi,
        useLayoutEffect: Ci,
        useMemo: Mi,
        useReducer: mi,
        useRef: wi,
        useState: function () {
          return mi(di);
        },
        useDebugValue: _i,
        useResponder: Fa,
        useDeferredValue: function (e, n) {
          var t = mi(di),
            r = t[0],
            o = t[1];
          return (
            Ti(
              function () {
                var t = Za.suspense;
                Za.suspense = void 0 === n ? null : n;
                try {
                  o(e);
                } finally {
                  Za.suspense = t;
                }
              },
              [e, n],
            ),
            r
          );
        },
        useTransition: function (e) {
          var n = mi(di),
            t = n[0];
          return (n = n[1]), [Oi(zi.bind(null, n, e), [n, e]), t];
        },
        useMutableSource: vi,
        useEvent: Ri,
        useOpaqueIdentifier: function () {
          return mi(di)[0];
        },
      },
      $i = K.ReactCurrentOwner,
      Vi = !1;
    function Wi(e, n, t, r) {
      n.child = null === e ? Pa(n, null, t, r) : Sa(n, e.child, t, r);
    }
    function Hi(e, n, t, r, o) {
      t = t.render;
      var a = n.ref;
      return (
        ra(n, o),
        (r = ui(e, n, t, r, a, o)),
        null === e || Vi
          ? ((n.effectTag |= 1), Wi(e, n, r, o), n.child)
          : (ci(e, n, o), ul(e, n, o))
      );
    }
    function Qi(e, n, t, r, o, a) {
      if (null === e) {
        var i = t.type;
        return 'function' != typeof i ||
          Vu(i) ||
          void 0 !== i.defaultProps ||
          null !== t.compare ||
          void 0 !== t.defaultProps
          ? (((e = Hu(t.type, null, r, null, n.mode, a)).ref = n.ref),
            (e.return = n),
            (n.child = e))
          : ((n.tag = 15), (n.type = i), qi(e, n, i, r, o, a));
      }
      return (
        (i = e.child),
        o < a &&
        ((o = i.memoizedProps),
        (t = null !== (t = t.compare) ? t : Fr)(o, r) && e.ref === n.ref)
          ? ul(e, n, a)
          : ((n.effectTag |= 1),
            ((e = Wu(i, r)).ref = n.ref),
            (e.return = n),
            (n.child = e))
      );
    }
    function qi(e, n, t, r, o, a) {
      return null !== e &&
        Fr(e.memoizedProps, r) &&
        e.ref === n.ref &&
        ((Vi = !1), o < a)
        ? ((n.expirationTime = e.expirationTime), ul(e, n, a))
        : Yi(e, n, t, r, a);
    }
    function Ki(e, n) {
      var t = n.ref;
      ((null === e && null !== t) || (null !== e && e.ref !== t)) &&
        (n.effectTag |= 128);
    }
    function Yi(e, n, t, r, o) {
      var a = go(t) ? mo : fo.current;
      return (
        (a = ho(n, a)),
        ra(n, o),
        (t = ui(e, n, t, r, a, o)),
        null === e || Vi
          ? ((n.effectTag |= 1), Wi(e, n, t, o), n.child)
          : (ci(e, n, o), ul(e, n, o))
      );
    }
    function Xi(e, n, t, r, o) {
      var a = t._render;
      return (
        (t = t._data),
        ra(n, o),
        (r = ui(e, n, a, r, t, o)),
        null === e || Vi
          ? ((n.effectTag |= 1), Wi(e, n, r, o), n.child)
          : (ci(e, n, o), ul(e, n, o))
      );
    }
    function Gi(e, n, t, r, o) {
      if (go(t)) {
        var a = !0;
        wo(n);
      } else a = !1;
      if ((ra(n, o), null === n.stateNode))
        null !== e &&
          ((e.alternate = null), (n.alternate = null), (n.effectTag |= 2)),
          ba(n, t, r),
          wa(n, t, r, o),
          (r = !0);
      else if (null === e) {
        var i = n.stateNode,
          l = n.memoizedProps;
        i.props = l;
        var u = i.context,
          c = t.contextType;
        'object' == typeof c && null !== c
          ? (c = oa(c))
          : (c = ho(n, (c = go(t) ? mo : fo.current)));
        var s = t.getDerivedStateFromProps,
          f =
            'function' == typeof s ||
            'function' == typeof i.getSnapshotBeforeUpdate;
        f ||
          ('function' != typeof i.UNSAFE_componentWillReceiveProps &&
            'function' != typeof i.componentWillReceiveProps) ||
          ((l !== r || u !== c) && ya(n, i, r, c)),
          (aa = !1);
        var d = n.memoizedState;
        (i.state = d),
          fa(n, r, i, o),
          (u = n.memoizedState),
          l !== r || d !== u || po.current || aa
            ? ('function' == typeof s &&
                (ha(n, t, s, r), (u = n.memoizedState)),
              (l = aa || va(n, t, l, r, d, u, c))
                ? (f ||
                    ('function' != typeof i.UNSAFE_componentWillMount &&
                      'function' != typeof i.componentWillMount) ||
                    ('function' == typeof i.componentWillMount &&
                      i.componentWillMount(),
                    'function' == typeof i.UNSAFE_componentWillMount &&
                      i.UNSAFE_componentWillMount()),
                  'function' == typeof i.componentDidMount &&
                    (n.effectTag |= 4))
                : ('function' == typeof i.componentDidMount &&
                    (n.effectTag |= 4),
                  (n.memoizedProps = r),
                  (n.memoizedState = u)),
              (i.props = r),
              (i.state = u),
              (i.context = c),
              (r = l))
            : ('function' == typeof i.componentDidMount && (n.effectTag |= 4),
              (r = !1));
      } else {
        (i = n.stateNode),
          la(e, n),
          (l = n.memoizedProps),
          (c = n.type === n.elementType ? l : Yo(n.type, l)),
          (i.props = c),
          (f = n.pendingProps),
          (d = i.context),
          'object' == typeof (u = t.contextType) && null !== u
            ? (u = oa(u))
            : (u = ho(n, (u = go(t) ? mo : fo.current)));
        var p = t.getDerivedStateFromProps;
        (s =
          'function' == typeof p ||
          'function' == typeof i.getSnapshotBeforeUpdate) ||
          ('function' != typeof i.UNSAFE_componentWillReceiveProps &&
            'function' != typeof i.componentWillReceiveProps) ||
          ((l !== f || d !== u) && ya(n, i, r, u)),
          (aa = !1),
          (d = n.memoizedState),
          (i.state = d),
          fa(n, r, i, o);
        var m = n.memoizedState;
        l !== f || d !== m || po.current || aa
          ? ('function' == typeof p && (ha(n, t, p, r), (m = n.memoizedState)),
            (c = aa || va(n, t, c, r, d, m, u))
              ? (s ||
                  ('function' != typeof i.UNSAFE_componentWillUpdate &&
                    'function' != typeof i.componentWillUpdate) ||
                  ('function' == typeof i.componentWillUpdate &&
                    i.componentWillUpdate(r, m, u),
                  'function' == typeof i.UNSAFE_componentWillUpdate &&
                    i.UNSAFE_componentWillUpdate(r, m, u)),
                'function' == typeof i.componentDidUpdate && (n.effectTag |= 4),
                'function' == typeof i.getSnapshotBeforeUpdate &&
                  (n.effectTag |= 256))
              : ('function' != typeof i.componentDidUpdate ||
                  (l === e.memoizedProps && d === e.memoizedState) ||
                  (n.effectTag |= 4),
                'function' != typeof i.getSnapshotBeforeUpdate ||
                  (l === e.memoizedProps && d === e.memoizedState) ||
                  (n.effectTag |= 256),
                (n.memoizedProps = r),
                (n.memoizedState = m)),
            (i.props = r),
            (i.state = m),
            (i.context = u),
            (r = c))
          : ('function' != typeof i.componentDidUpdate ||
              (l === e.memoizedProps && d === e.memoizedState) ||
              (n.effectTag |= 4),
            'function' != typeof i.getSnapshotBeforeUpdate ||
              (l === e.memoizedProps && d === e.memoizedState) ||
              (n.effectTag |= 256),
            (r = !1));
      }
      return Ji(e, n, t, r, a, o);
    }
    function Ji(e, n, t, r, o, a) {
      Ki(e, n);
      var i = 0 != (64 & n.effectTag);
      if (!r && !i) return o && xo(n, t, !1), ul(e, n, a);
      (r = n.stateNode), ($i.current = n);
      var l =
        i && 'function' != typeof t.getDerivedStateFromError
          ? null
          : r.render();
      return (
        (n.effectTag |= 1),
        null !== e && i
          ? ((n.child = Sa(n, e.child, null, a)), (n.child = Sa(n, null, l, a)))
          : Wi(e, n, l, a),
        (n.memoizedState = r.state),
        o && xo(n, t, !0),
        n.child
      );
    }
    function Zi(e) {
      var n = e.stateNode;
      n.pendingContext
        ? bo(0, n.pendingContext, n.pendingContext !== n.context)
        : n.context && bo(0, n.context, !1),
        Ia(e, n.containerInfo);
    }
    function el(e) {
      return {dehydrated: null, baseTime: e, retryTime: 0};
    }
    function nl(e, n) {
      return {
        dehydrated: null,
        baseTime: 0 !== (e = e.baseTime) && e < n ? e : n,
        retryTime: 0,
      };
    }
    function tl(e, n, t) {
      var r = e.childExpirationTime;
      return null !== (e = e.memoizedState) &&
        0 !== (e = e.baseTime) &&
        e < t &&
        e > r
        ? e
        : r < t
        ? r
        : 0 != (2 & n.mode) && null !== (n = Ll) && (n = n.lastPendingTime) < t
        ? n
        : 0;
    }
    function rl(e, n, t) {
      var r,
        o = n.mode,
        a = n.pendingProps,
        i = ja.current,
        l = !1,
        u = 0 != (64 & n.effectTag);
      if (!(r = u))
        e: {
          if (null !== e) {
            if (null === (r = e.memoizedState)) {
              r = !1;
              break e;
            }
            if (0 !== (r = r.baseTime) && r < t) {
              r = !0;
              break e;
            }
          }
          r = 0 != (2 & i);
        }
      if (
        (r
          ? ((l = !0), (n.effectTag &= -65))
          : (null !== e && null === e.memoizedState) ||
            void 0 === a.fallback ||
            !0 === a.unstable_avoidThisFallback ||
            (i |= 1),
        co(ja, 1 & i),
        null === e)
      ) {
        if (
          void 0 !== a.fallback &&
          (Ha(n), null !== (e = n.memoizedState) && null !== (e = e.dehydrated))
        )
          return (
            0 == (2 & n.mode)
              ? (n.expirationTime = 1073741823)
              : '$!' === e.data
              ? ((t = Ko((t = ru()), 5e3, 250)), (n.expirationTime = t))
              : (n.expirationTime = 1),
            null
          );
        if (l) {
          if (
            ((a = a.fallback),
            ((e = Qu(null, o, 0, null)).return = n),
            0 == (2 & n.mode))
          )
            for (
              l = null !== n.memoizedState ? n.child.child : n.child,
                e.child = l;
              null !== l;

            )
              (l.return = e), (l = l.sibling);
          return (
            ((o = Qu(a, o, t, null)).return = n),
            (e.sibling = o),
            (n.memoizedState = el(t)),
            (n.child = e),
            o
          );
        }
        return (
          (e = a.children),
          (n.memoizedState = null),
          (n.child = Pa(n, null, e, t))
        );
      }
      if (null !== (i = e.memoizedState)) {
        if (null !== (r = i.dehydrated)) {
          if (u) {
            if (null !== n.memoizedState)
              return (n.child = e.child), (n.effectTag |= 64), null;
            if (
              ((l = a.fallback),
              ((a = Qu(null, o, 0, null)).return = n),
              (a.child = null),
              0 == (2 & n.mode))
            )
              for (u = a.child = n.child; null !== u; )
                (u.return = a), (u = u.sibling);
            else Sa(n, e.child, null, t);
            return (
              ((o = Qu(l, o, t, null)).return = n),
              (a.sibling = o),
              (o.effectTag |= 2),
              (a.childExpirationTime = tl(e, n, t)),
              (n.memoizedState = nl(e.memoizedState, t)),
              (n.child = a),
              o
            );
          }
          if (0 == (2 & n.mode)) n = ol(e, n, t);
          else if ('$!' === r.data) n = ol(e, n, t);
          else if (((o = e.childExpirationTime >= t), Vi || o))
            1073741823 > t &&
              i.retryTime <= t &&
              ((o = t + 1), (i.retryTime = o), au(e, o)),
              xu(),
              (n = ol(e, n, t));
          else if ('$?' === r.data)
            (n.effectTag |= 64),
              (n.child = e.child),
              (n = ju.bind(null, e)),
              (r._reactRetry = n),
              (n = null);
          else {
            for (
              Ba = Et(r.nextSibling),
                Qa(n),
                $a = !0,
                e = t = Pa(n, null, n.pendingProps.children, t);
              e;

            )
              (e.effectTag |= 1024), (e = e.sibling);
            (n.child = t), (n = n.child);
          }
          return n;
        }
        if (((o = (u = e.child).sibling), l)) {
          if (
            ((l = a.fallback),
            ((a = Wu(u, u.pendingProps)).return = n),
            0 == (2 & n.mode) &&
              (i = null !== n.memoizedState ? n.child.child : n.child) !==
                u.child)
          )
            for (u = a.child = i; null !== u; ) (u.return = a), (u = u.sibling);
          return (
            ((o = Wu(o, l)).return = n),
            (a.sibling = o),
            (a.childExpirationTime = tl(e, n, t)),
            (n.memoizedState = nl(e.memoizedState, t)),
            (n.child = a),
            o
          );
        }
        return (
          (t = Sa(n, u.child, a.children, t)),
          (n.memoizedState = null),
          (n.child = t)
        );
      }
      if (((u = e.child), l)) {
        if (
          ((l = a.fallback),
          ((a = Qu(null, o, 0, null)).return = n),
          (a.child = u),
          null !== u && (u.return = a),
          0 == (2 & n.mode))
        )
          for (
            u = null !== n.memoizedState ? n.child.child : n.child, a.child = u;
            null !== u;

          )
            (u.return = a), (u = u.sibling);
        return (
          ((o = Qu(l, o, t, null)).return = n),
          (a.sibling = o),
          (o.effectTag |= 2),
          (a.childExpirationTime = tl(e, n, t)),
          (n.memoizedState = el(t)),
          (n.child = a),
          o
        );
      }
      return (n.memoizedState = null), (n.child = Sa(n, u, a.children, t));
    }
    function ol(e, n, t) {
      return (
        (n.memoizedState = null), Wi(e, n, n.pendingProps.children, t), n.child
      );
    }
    function al(e, n) {
      e.expirationTime < n && (e.expirationTime = n);
      var t = e.alternate;
      null !== t && t.expirationTime < n && (t.expirationTime = n),
        ta(e.return, n);
    }
    function il(e, n, t, r, o, a) {
      var i = e.memoizedState;
      null === i
        ? (e.memoizedState = {
            isBackwards: n,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: t,
            tailExpiration: 0,
            tailMode: o,
            lastEffect: a,
          })
        : ((i.isBackwards = n),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = r),
          (i.tail = t),
          (i.tailExpiration = 0),
          (i.tailMode = o),
          (i.lastEffect = a));
    }
    function ll(e, n, t) {
      var r = n.pendingProps,
        o = r.revealOrder,
        a = r.tail;
      if ((Wi(e, n, r.children, t), 0 != (2 & (r = ja.current))))
        (r = (1 & r) | 2), (n.effectTag |= 64);
      else {
        if (null !== e && 0 != (64 & e.effectTag))
          e: for (e = n.child; null !== e; ) {
            if (13 === e.tag) null !== e.memoizedState && al(e, t);
            else if (19 === e.tag) al(e, t);
            else if (null !== e.child) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === n) break e;
            for (; null === e.sibling; ) {
              if (null === e.return || e.return === n) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        r &= 1;
      }
      if ((co(ja, r), 0 == (2 & n.mode))) n.memoizedState = null;
      else
        switch (o) {
          case 'forwards':
            for (t = n.child, o = null; null !== t; )
              null !== (e = t.alternate) && null === Da(e) && (o = t),
                (t = t.sibling);
            null === (t = o)
              ? ((o = n.child), (n.child = null))
              : ((o = t.sibling), (t.sibling = null)),
              il(n, !1, o, t, a, n.lastEffect);
            break;
          case 'backwards':
            for (t = null, o = n.child, n.child = null; null !== o; ) {
              if (null !== (e = o.alternate) && null === Da(e)) {
                n.child = o;
                break;
              }
              (e = o.sibling), (o.sibling = t), (t = o), (o = e);
            }
            il(n, !0, t, null, a, n.lastEffect);
            break;
          case 'together':
            il(n, !1, null, null, void 0, n.lastEffect);
            break;
          default:
            n.memoizedState = null;
        }
      return n.child;
    }
    function ul(e, n, t) {
      null !== e && (n.dependencies = e.dependencies);
      var r = n.expirationTime;
      if ((0 !== r && wu(r), n.childExpirationTime < t)) return null;
      if (null !== e && n.child !== e.child) throw Error(i(153));
      if (null !== n.child) {
        for (
          t = Wu((e = n.child), e.pendingProps), n.child = t, t.return = n;
          null !== e.sibling;

        )
          (e = e.sibling), ((t = t.sibling = Wu(e, e.pendingProps)).return = n);
        t.sibling = null;
      }
      return n.child;
    }
    function cl(e, n) {
      switch (e.tailMode) {
        case 'hidden':
          n = e.tail;
          for (var t = null; null !== n; )
            null !== n.alternate && (t = n), (n = n.sibling);
          null === t ? (e.tail = null) : (t.sibling = null);
          break;
        case 'collapsed':
          t = e.tail;
          for (var r = null; null !== t; )
            null !== t.alternate && (r = t), (t = t.sibling);
          null === r
            ? n || null === e.tail
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
    }
    function sl(e, n, t) {
      var r = n.pendingProps;
      switch (n.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return null;
        case 1:
          return go(n.type) && vo(), null;
        case 3:
          return (
            Ra(),
            uo(po),
            uo(fo),
            Ga(),
            (t = n.stateNode).pendingContext &&
              ((t.context = t.pendingContext), (t.pendingContext = null)),
            (null !== e && null !== e.child) || !qa(n) || (n.effectTag |= 4),
            null
          );
        case 5:
          Aa(n), (t = za(Ma.current));
          var a = n.type;
          if (null !== e && null != n.stateNode)
            Ai(e, n, a, r, t), e.ref !== n.ref && (n.effectTag |= 128);
          else {
            if (!r) {
              if (null === n.stateNode) throw Error(i(166));
              return null;
            }
            if (((e = za(Na.current)), qa(n))) {
              (r = n.stateNode), (a = n.type);
              var l = n.memoizedProps;
              switch (((r[Pt] = n), (r[_t] = l), a)) {
                case 'iframe':
                case 'object':
                case 'embed':
                  hn('load', r);
                  break;
                case 'video':
                case 'audio':
                  for (e = 0; e < Xe.length; e++) hn(Xe[e], r);
                  break;
                case 'source':
                  hn('error', r);
                  break;
                case 'img':
                case 'image':
                case 'link':
                  hn('error', r), hn('load', r);
                  break;
                case 'form':
                  hn('reset', r), hn('submit', r);
                  break;
                case 'details':
                  hn('toggle', r);
                  break;
                case 'input':
                  Ee(r, l), hn('invalid', r), ct(t, 'onChange');
                  break;
                case 'select':
                  (r._wrapperState = {wasMultiple: !!l.multiple}),
                    hn('invalid', r),
                    ct(t, 'onChange');
                  break;
                case 'textarea':
                  Me(r, l), hn('invalid', r), ct(t, 'onChange');
              }
              for (var u in (lt(a, l), (e = null), l))
                if (l.hasOwnProperty(u)) {
                  var c = l[u];
                  'children' === u
                    ? 'string' == typeof c
                      ? r.textContent !== c && (e = ['children', c])
                      : 'number' == typeof c &&
                        r.textContent !== '' + c &&
                        (e = ['children', '' + c])
                    : k.hasOwnProperty(u) && null != c && ct(t, u);
                }
              switch (a) {
                case 'input':
                  we(r), Se(r, l, !0);
                  break;
                case 'textarea':
                  we(r), Ie(r);
                  break;
                case 'select':
                case 'option':
                  break;
                default:
                  'function' == typeof l.onClick && (r.onclick = st);
              }
              (t = e), (n.updateQueue = t), null !== t && (n.effectTag |= 4);
            } else {
              switch (
                ((u = 9 === t.nodeType ? t : t.ownerDocument),
                e === Re && (e = Ae(a)),
                e === Re
                  ? 'script' === a
                    ? (((e = u.createElement('div')).innerHTML =
                        '<script></script>'),
                      (e = e.removeChild(e.firstChild)))
                    : 'string' == typeof r.is
                    ? (e = u.createElement(a, {is: r.is}))
                    : ((e = u.createElement(a)),
                      'select' === a &&
                        ((u = e),
                        r.multiple
                          ? (u.multiple = !0)
                          : r.size && (u.size = r.size)))
                  : (e = u.createElementNS(e, a)),
                (e[Pt] = n),
                (e[_t] = r),
                Li(e, n),
                (n.stateNode = e),
                (u = ut(a, r)),
                a)
              ) {
                case 'iframe':
                case 'object':
                case 'embed':
                  hn('load', e), (c = r);
                  break;
                case 'video':
                case 'audio':
                  for (c = 0; c < Xe.length; c++) hn(Xe[c], e);
                  c = r;
                  break;
                case 'source':
                  hn('error', e), (c = r);
                  break;
                case 'img':
                case 'image':
                case 'link':
                  hn('error', e), hn('load', e), (c = r);
                  break;
                case 'form':
                  hn('reset', e), hn('submit', e), (c = r);
                  break;
                case 'details':
                  hn('toggle', e), (c = r);
                  break;
                case 'input':
                  Ee(e, r), (c = ke(e, r)), hn('invalid', e), ct(t, 'onChange');
                  break;
                case 'option':
                  c = _e(e, r);
                  break;
                case 'select':
                  (e._wrapperState = {wasMultiple: !!r.multiple}),
                    (c = o({}, r, {value: void 0})),
                    hn('invalid', e),
                    ct(t, 'onChange');
                  break;
                case 'textarea':
                  Me(e, r), (c = Oe(e, r)), hn('invalid', e), ct(t, 'onChange');
                  break;
                default:
                  c = r;
              }
              lt(a, c);
              var s = c;
              for (l in s)
                if (s.hasOwnProperty(l)) {
                  var f = s[l];
                  'style' === l
                    ? at(e, f)
                    : 'dangerouslySetInnerHTML' === l
                    ? null != (f = f ? f.__html : void 0) && Fe(e, f)
                    : 'children' === l
                    ? 'string' == typeof f
                      ? ('textarea' !== a || '' !== f) && Ue(e, f)
                      : 'number' == typeof f && Ue(e, '' + f)
                    : 'suppressContentEditableWarning' !== l &&
                      'suppressHydrationWarning' !== l &&
                      'autoFocus' !== l &&
                      (k.hasOwnProperty(l)
                        ? null != f && ct(t, l)
                        : null != f && Y(e, l, f, u));
                }
              switch (a) {
                case 'input':
                  we(e), Se(e, r, !1);
                  break;
                case 'textarea':
                  we(e), Ie(e);
                  break;
                case 'option':
                  null != r.value && e.setAttribute('value', '' + be(r.value));
                  break;
                case 'select':
                  (e.multiple = !!r.multiple),
                    null != (t = r.value)
                      ? Ne(e, !!r.multiple, t, !1)
                      : null != r.defaultValue &&
                        Ne(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  'function' == typeof c.onClick && (e.onclick = st);
              }
              bt(a, r) && (n.effectTag |= 4);
            }
            null !== n.ref && (n.effectTag |= 128);
          }
          return null;
        case 6:
          if (e && null != n.stateNode) ji(0, n, e.memoizedProps, r);
          else {
            if ('string' != typeof r && null === n.stateNode)
              throw Error(i(166));
            (t = za(Ma.current)),
              za(Na.current),
              qa(n)
                ? ((t = n.stateNode),
                  (r = n.memoizedProps),
                  (t[Pt] = n),
                  t.nodeValue !== r && (n.effectTag |= 4))
                : (((t = (9 === t.nodeType
                    ? t
                    : t.ownerDocument
                  ).createTextNode(r))[Pt] = n),
                  (n.stateNode = t));
          }
          return null;
        case 13:
          if (
            (uo(ja), null !== (r = n.memoizedState) && null !== r.dehydrated)
          ) {
            if (null === e) {
              if (!qa(n)) throw Error(i(318));
              if (!(t = null !== (t = n.memoizedState) ? t.dehydrated : null))
                throw Error(i(317));
              t[Pt] = n;
            } else
              Ka(),
                0 == (64 & n.effectTag) && (n.memoizedState = null),
                (n.effectTag |= 4);
            return null;
          }
          return 0 != (64 & n.effectTag)
            ? ((n.expirationTime = t), n)
            : ((t = null !== r),
              (r = !1),
              null === e
                ? void 0 !== n.memoizedProps.fallback && qa(n)
                : ((r = null !== (a = e.memoizedState)),
                  t ||
                    null === a ||
                    (null !== (a = e.child.sibling) &&
                      (null !== (l = n.firstEffect)
                        ? ((n.firstEffect = a), (a.nextEffect = l))
                        : ((n.firstEffect = n.lastEffect = a),
                          (a.nextEffect = null)),
                      (a.effectTag = 8)))),
              t &&
                !r &&
                0 != (2 & n.mode) &&
                ((null === e &&
                  !0 !== n.memoizedProps.unstable_avoidThisFallback) ||
                0 != (1 & ja.current)
                  ? 0 === Dl && (Dl = 3)
                  : xu()),
              (t || r) && (n.effectTag |= 4),
              null);
        case 4:
          return Ra(), null;
        case 10:
          return na(n), null;
        case 17:
          return go(n.type) && vo(), null;
        case 19:
          if ((uo(ja), null === (r = n.memoizedState))) return null;
          if (((a = 0 != (64 & n.effectTag)), null === (l = r.rendering))) {
            if (a) cl(r, !1);
            else if (0 !== Dl || (null !== e && 0 != (64 & e.effectTag)))
              for (l = n.child; null !== l; ) {
                if (null !== (e = Da(l))) {
                  for (
                    n.effectTag |= 64,
                      cl(r, !1),
                      null !== (a = e.updateQueue) &&
                        ((n.updateQueue = a), (n.effectTag |= 4)),
                      null === r.lastEffect && (n.firstEffect = null),
                      n.lastEffect = r.lastEffect,
                      r = n.child;
                    null !== r;

                  )
                    (l = t),
                      ((a = r).effectTag &= 2),
                      (a.nextEffect = null),
                      (a.firstEffect = null),
                      (a.lastEffect = null),
                      null === (e = a.alternate)
                        ? ((a.childExpirationTime = 0),
                          (a.expirationTime = l),
                          (a.child = null),
                          (a.memoizedProps = null),
                          (a.memoizedState = null),
                          (a.updateQueue = null),
                          (a.dependencies = null),
                          (a.stateNode = null))
                        : ((a.childExpirationTime = e.childExpirationTime),
                          (a.expirationTime = e.expirationTime),
                          (a.child = e.child),
                          (a.memoizedProps = e.memoizedProps),
                          (a.memoizedState = e.memoizedState),
                          (a.updateQueue = e.updateQueue),
                          (l = e.dependencies),
                          (a.dependencies =
                            null === l
                              ? null
                              : {
                                  expirationTime: l.expirationTime,
                                  firstContext: l.firstContext,
                                  responders: l.responders,
                                })),
                      (r = r.sibling);
                  return co(ja, (1 & ja.current) | 2), n.child;
                }
                l = l.sibling;
              }
          } else {
            if (!a)
              if (null !== (e = Da(l))) {
                if (
                  ((n.effectTag |= 64),
                  (a = !0),
                  null !== (t = e.updateQueue) &&
                    ((n.updateQueue = t), (n.effectTag |= 4)),
                  cl(r, !0),
                  null === r.tail && 'hidden' === r.tailMode && !l.alternate)
                )
                  return (
                    null !== (n = n.lastEffect = r.lastEffect) &&
                      (n.nextEffect = null),
                    null
                  );
              } else
                2 * Uo() - r.renderingStartTime > r.tailExpiration &&
                  1 < t &&
                  ((n.effectTag |= 64),
                  (a = !0),
                  cl(r, !1),
                  (n.expirationTime = n.childExpirationTime = t - 1));
            r.isBackwards
              ? ((l.sibling = n.child), (n.child = l))
              : (null !== (t = r.last) ? (t.sibling = l) : (n.child = l),
                (r.last = l));
          }
          return null !== r.tail
            ? (0 === r.tailExpiration && (r.tailExpiration = Uo() + 500),
              (t = r.tail),
              (r.rendering = t),
              (r.tail = t.sibling),
              (r.lastEffect = n.lastEffect),
              (r.renderingStartTime = Uo()),
              (t.sibling = null),
              (n = ja.current),
              co(ja, a ? (1 & n) | 2 : 1 & n),
              t)
            : null;
        case 22:
          return null;
      }
      throw Error(i(156, n.tag));
    }
    function fl(e) {
      switch (e.tag) {
        case 1:
          go(e.type) && vo();
          var n = e.effectTag;
          return 4096 & n ? ((e.effectTag = (-4097 & n) | 64), e) : null;
        case 3:
          if ((Ra(), uo(po), uo(fo), Ga(), 0 != (64 & (n = e.effectTag))))
            throw Error(i(285));
          return (e.effectTag = (-4097 & n) | 64), e;
        case 5:
          return Aa(e), null;
        case 13:
          if (
            (uo(ja), null !== (n = e.memoizedState) && null !== n.dehydrated)
          ) {
            if (null === e.alternate) throw Error(i(340));
            Ka();
          }
          return 4096 & (n = e.effectTag)
            ? ((e.effectTag = (-4097 & n) | 64), e)
            : null;
        case 19:
          return uo(ja), null;
        case 4:
          return Ra(), null;
        case 10:
          return na(e), null;
        default:
          return null;
      }
    }
    function dl(e, n) {
      return {value: e, source: n, stack: ge(n)};
    }
    function pl(e, n) {
      try {
        console.error(n.value);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    (Li = function (e, n) {
      for (var t = n.child; null !== t; ) {
        if (5 === t.tag || 6 === t.tag) e.appendChild(t.stateNode);
        else if (4 !== t.tag && null !== t.child) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === n) break;
        for (; null === t.sibling; ) {
          if (null === t.return || t.return === n) return;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }),
      (Ai = function (e, n, t, r, a) {
        var i = e.memoizedProps;
        if (i !== r) {
          var l,
            u,
            c = n.stateNode;
          switch ((za(Na.current), (e = null), t)) {
            case 'input':
              (i = ke(c, i)), (r = ke(c, r)), (e = []);
              break;
            case 'option':
              (i = _e(c, i)), (r = _e(c, r)), (e = []);
              break;
            case 'select':
              (i = o({}, i, {value: void 0})),
                (r = o({}, r, {value: void 0})),
                (e = []);
              break;
            case 'textarea':
              (i = Oe(c, i)), (r = Oe(c, r)), (e = []);
              break;
            default:
              'function' != typeof i.onClick &&
                'function' == typeof r.onClick &&
                (c.onclick = st);
          }
          for (l in (lt(t, r), (t = null), i))
            if (!r.hasOwnProperty(l) && i.hasOwnProperty(l) && null != i[l])
              if ('style' === l)
                for (u in (c = i[l]))
                  c.hasOwnProperty(u) && (t || (t = {}), (t[u] = ''));
              else
                'dangerouslySetInnerHTML' !== l &&
                  'children' !== l &&
                  'suppressContentEditableWarning' !== l &&
                  'suppressHydrationWarning' !== l &&
                  'autoFocus' !== l &&
                  (k.hasOwnProperty(l)
                    ? e || (e = [])
                    : (e = e || []).push(l, null));
          for (l in r) {
            var s = r[l];
            if (
              ((c = null != i ? i[l] : void 0),
              r.hasOwnProperty(l) && s !== c && (null != s || null != c))
            )
              if ('style' === l)
                if (c) {
                  for (u in c)
                    !c.hasOwnProperty(u) ||
                      (s && s.hasOwnProperty(u)) ||
                      (t || (t = {}), (t[u] = ''));
                  for (u in s)
                    s.hasOwnProperty(u) &&
                      c[u] !== s[u] &&
                      (t || (t = {}), (t[u] = s[u]));
                } else t || (e || (e = []), e.push(l, t)), (t = s);
              else
                'dangerouslySetInnerHTML' === l
                  ? ((s = s ? s.__html : void 0),
                    (c = c ? c.__html : void 0),
                    null != s && c !== s && (e = e || []).push(l, s))
                  : 'children' === l
                  ? c === s ||
                    ('string' != typeof s && 'number' != typeof s) ||
                    (e = e || []).push(l, '' + s)
                  : 'suppressContentEditableWarning' !== l &&
                    'suppressHydrationWarning' !== l &&
                    (k.hasOwnProperty(l)
                      ? (null != s && ct(a, l), e || c === s || (e = []))
                      : 'object' == typeof s && null !== s && s.$$typeof === ce
                      ? s.toString()
                      : (e = e || []).push(l, s));
          }
          t && (e = e || []).push('style', t),
            (a = e),
            (n.updateQueue = a) && (n.effectTag |= 4);
        }
      }),
      (ji = function (e, n, t, r) {
        t !== r && (n.effectTag |= 4);
      });
    var ml = 'function' == typeof WeakMap ? WeakMap : Map;
    function hl(e, n, t) {
      ((t = ua(t, null)).tag = 3), (t.payload = {element: null});
      var r = n.value;
      return (
        (t.callback = function () {
          ql || ((ql = !0), (Kl = r)), pl(0, n);
        }),
        t
      );
    }
    function gl(e, n, t) {
      (t = ua(t, null)).tag = 3;
      var r = e.type.getDerivedStateFromError;
      if ('function' == typeof r) {
        var o = n.value;
        t.payload = function () {
          return pl(0, n), r(o);
        };
      }
      var a = e.stateNode;
      return (
        null !== a &&
          'function' == typeof a.componentDidCatch &&
          (t.callback = function () {
            'function' != typeof r &&
              (null === Yl ? (Yl = new Set([this])) : Yl.add(this), pl(0, n));
            var e = n.stack;
            this.componentDidCatch(n.value, {
              componentStack: null !== e ? e : '',
            });
          }),
        t
      );
    }
    var vl = 'function' == typeof WeakSet ? WeakSet : Set;
    function bl(e) {
      var n = e.ref;
      if (null !== n)
        if ('function' == typeof n)
          try {
            n(null);
          } catch (n) {
            Ru(e, n);
          }
        else n.current = null;
    }
    function yl(e, n) {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return;
        case 1:
          if (256 & n.effectTag && null !== e) {
            var t = e.memoizedProps,
              r = e.memoizedState;
            (n = (e = n.stateNode).getSnapshotBeforeUpdate(
              n.elementType === n.type ? t : Yo(n.type, t),
              r,
            )),
              (e.__reactInternalSnapshotBeforeUpdate = n);
          }
          return;
        case 3:
        case 5:
        case 6:
        case 4:
        case 17:
          return;
      }
      throw Error(i(163));
    }
    function wl(e, n) {
      if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
        var t = (n = n.next);
        do {
          if ((t.tag & e) === e) {
            var r = t.destroy;
            (t.destroy = void 0), void 0 !== r && r();
          }
          t = t.next;
        } while (t !== n);
      }
    }
    function xl(e, n) {
      if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
        var t = (n = n.next);
        do {
          if ((t.tag & e) === e) {
            var r = t.create;
            t.destroy = r();
          }
          t = t.next;
        } while (t !== n);
      }
    }
    function kl(e, n, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return void xl(3, t);
        case 1:
          if (((e = t.stateNode), 4 & t.effectTag))
            if (null === n) e.componentDidMount();
            else {
              var r =
                t.elementType === t.type
                  ? n.memoizedProps
                  : Yo(t.type, n.memoizedProps);
              e.componentDidUpdate(
                r,
                n.memoizedState,
                e.__reactInternalSnapshotBeforeUpdate,
              );
            }
          return void (null !== (n = t.updateQueue) && da(t, n, e));
        case 3:
          if (null !== (n = t.updateQueue)) {
            if (((e = null), null !== t.child))
              switch (t.child.tag) {
                case 5:
                  e = t.child.stateNode;
                  break;
                case 1:
                  e = t.child.stateNode;
              }
            da(t, n, e);
          }
          return;
        case 5:
          return (
            (e = t.stateNode),
            void (
              null === n &&
              4 & t.effectTag &&
              bt(t.type, t.memoizedProps) &&
              e.focus()
            )
          );
        case 6:
        case 4:
        case 12:
          return;
        case 13:
          return void (
            null === t.memoizedState &&
            ((t = t.alternate),
            null !== t &&
              ((t = t.memoizedState),
              null !== t && ((t = t.dehydrated), null !== t && qn(t))))
          );
        case 19:
        case 17:
        case 20:
        case 21:
          return;
      }
      throw Error(i(163));
    }
    function El(e, n, t) {
      if (Uu && 'function' == typeof Uu.onCommitFiberUnmount)
        try {
          Uu.onCommitFiberUnmount(Fu, n);
        } catch (e) {}
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          if (null !== (e = n.updateQueue) && null !== (e = e.lastEffect)) {
            var r = e.next;
            Vo(97 < t ? 97 : t, function () {
              var e = r;
              do {
                var t = e.destroy;
                if (void 0 !== t) {
                  var o = n;
                  try {
                    t();
                  } catch (e) {
                    Ru(o, e);
                  }
                }
                e = e.next;
              } while (e !== r);
            });
          }
          break;
        case 1:
          bl(n),
            'function' == typeof (t = n.stateNode).componentWillUnmount &&
              (function (e, n) {
                try {
                  (n.props = e.memoizedProps),
                    (n.state = e.memoizedState),
                    n.componentWillUnmount();
                } catch (n) {
                  Ru(e, n);
                }
              })(n, t);
          break;
        case 5:
          bl(n);
          break;
        case 4:
          Pl(e, n, t);
      }
    }
    function Tl(e) {
      (e.return = null),
        (e.child = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.alternate = null),
        (e.firstEffect = null),
        (e.lastEffect = null),
        (e.pendingProps = null),
        (e.memoizedProps = null),
        (e.stateNode = null);
    }
    function Cl(e) {
      return 5 === e.tag || 3 === e.tag || 4 === e.tag;
    }
    function Sl(e) {
      e: {
        for (var n = e.return; null !== n; ) {
          if (Cl(n)) break e;
          n = n.return;
        }
        throw Error(i(160));
      }
      var t = n;
      switch (((n = t.stateNode), t.tag)) {
        case 5:
          var r = !1;
          break;
        case 3:
        case 4:
          (n = n.containerInfo), (r = !0);
          break;
        default:
          throw Error(i(161));
      }
      16 & t.effectTag && (Ue(n, ''), (t.effectTag &= -17));
      e: n: for (t = e; ; ) {
        for (; null === t.sibling; ) {
          if (null === t.return || Cl(t.return)) {
            t = null;
            break e;
          }
          t = t.return;
        }
        for (
          t.sibling.return = t.return, t = t.sibling;
          5 !== t.tag && 6 !== t.tag && 18 !== t.tag;

        ) {
          if (2 & t.effectTag) continue n;
          if (null === t.child || 4 === t.tag) continue n;
          (t.child.return = t), (t = t.child);
        }
        if (!(2 & t.effectTag)) {
          t = t.stateNode;
          break e;
        }
      }
      r
        ? (function e(n, t, r) {
            var o = n.tag,
              a = 5 === o || 6 === o;
            if (a)
              (n = a ? n.stateNode : n.stateNode.instance),
                t
                  ? 8 === r.nodeType
                    ? r.parentNode.insertBefore(n, t)
                    : r.insertBefore(n, t)
                  : (8 === r.nodeType
                      ? (t = r.parentNode).insertBefore(n, r)
                      : (t = r).appendChild(n),
                    (null !== (r = r._reactRootContainer) && void 0 !== r) ||
                      null !== t.onclick ||
                      (t.onclick = st));
            else if (4 !== o && null !== (n = n.child))
              for (e(n, t, r), n = n.sibling; null !== n; )
                e(n, t, r), (n = n.sibling);
          })(e, t, n)
        : (function e(n, t, r) {
            var o = n.tag,
              a = 5 === o || 6 === o;
            if (a)
              (n = a ? n.stateNode : n.stateNode.instance),
                t ? r.insertBefore(n, t) : r.appendChild(n);
            else if (4 !== o && null !== (n = n.child))
              for (e(n, t, r), n = n.sibling; null !== n; )
                e(n, t, r), (n = n.sibling);
          })(e, t, n);
    }
    function Pl(e, n, t) {
      for (var r, o, a = n, l = !1; ; ) {
        if (!l) {
          l = a.return;
          e: for (;;) {
            if (null === l) throw Error(i(160));
            switch (((r = l.stateNode), l.tag)) {
              case 5:
                o = !1;
                break e;
              case 3:
              case 4:
                (r = r.containerInfo), (o = !0);
                break e;
            }
            l = l.return;
          }
          l = !0;
        }
        if (5 === a.tag || 6 === a.tag) {
          e: for (var u = e, c = a, s = t, f = c; ; )
            if ((El(u, f, s), null !== f.child && 4 !== f.tag))
              (f.child.return = f), (f = f.child);
            else {
              if (f === c) break e;
              for (; null === f.sibling; ) {
                if (null === f.return || f.return === c) break e;
                f = f.return;
              }
              (f.sibling.return = f.return), (f = f.sibling);
            }
          o
            ? ((u = r),
              (c = a.stateNode),
              8 === u.nodeType ? u.parentNode.removeChild(c) : u.removeChild(c))
            : r.removeChild(a.stateNode);
        } else if (18 === a.tag)
          o
            ? ((u = r),
              (c = a.stateNode),
              8 === u.nodeType
                ? kt(u.parentNode, c)
                : 1 === u.nodeType && kt(u, c),
              qn(u))
            : kt(r, a.stateNode);
        else if (4 === a.tag) {
          if (null !== a.child) {
            (r = a.stateNode.containerInfo),
              (o = !0),
              (a.child.return = a),
              (a = a.child);
            continue;
          }
        } else if ((El(e, a, t), null !== a.child)) {
          (a.child.return = a), (a = a.child);
          continue;
        }
        if (a === n) break;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === n) return;
          4 === (a = a.return).tag && (l = !1);
        }
        (a.sibling.return = a.return), (a = a.sibling);
      }
    }
    function _l(e, n) {
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          return void wl(3, n);
        case 1:
          return;
        case 5:
          var t = n.stateNode;
          if (null != t) {
            var r = n.memoizedProps,
              o = null !== e ? e.memoizedProps : r;
            e = n.type;
            var a = n.updateQueue;
            if (((n.updateQueue = null), null !== a)) {
              for (
                t[_t] = r,
                  'input' === e &&
                    'radio' === r.type &&
                    null != r.name &&
                    Te(t, r),
                  ut(e, o),
                  n = ut(e, r),
                  o = 0;
                o < a.length;
                o += 2
              ) {
                var l = a[o],
                  u = a[o + 1];
                'style' === l
                  ? at(t, u)
                  : 'dangerouslySetInnerHTML' === l
                  ? Fe(t, u)
                  : 'children' === l
                  ? Ue(t, u)
                  : Y(t, l, u, n);
              }
              switch (e) {
                case 'input':
                  Ce(t, r);
                  break;
                case 'textarea':
                  ze(t, r);
                  break;
                case 'select':
                  (n = t._wrapperState.wasMultiple),
                    (t._wrapperState.wasMultiple = !!r.multiple),
                    null != (e = r.value)
                      ? Ne(t, !!r.multiple, e, !1)
                      : n !== !!r.multiple &&
                        (null != r.defaultValue
                          ? Ne(t, !!r.multiple, r.defaultValue, !0)
                          : Ne(t, !!r.multiple, r.multiple ? [] : '', !1));
              }
            }
          }
          return;
        case 6:
          if (null === n.stateNode) throw Error(i(162));
          return void (n.stateNode.nodeValue = n.memoizedProps);
        case 3:
          return void (
            (n = n.stateNode).hydrate && ((n.hydrate = !1), qn(n.containerInfo))
          );
        case 12:
          return;
        case 13:
          if (
            ((t = n),
            null === n.memoizedState
              ? (r = !1)
              : ((r = !0), (t = n.child), (Hl = Uo())),
            null !== t)
          )
            e: for (e = t; ; ) {
              if (5 === e.tag)
                (a = e.stateNode),
                  r
                    ? 'function' == typeof (a = a.style).setProperty
                      ? a.setProperty('display', 'none', 'important')
                      : (a.display = 'none')
                    : ((a = e.stateNode),
                      (o =
                        null != (o = e.memoizedProps.style) &&
                        o.hasOwnProperty('display')
                          ? o.display
                          : null),
                      (a.style.display = ot('display', o)));
              else if (6 === e.tag)
                e.stateNode.nodeValue = r ? '' : e.memoizedProps;
              else {
                if (
                  13 === e.tag &&
                  null !== e.memoizedState &&
                  null === e.memoizedState.dehydrated
                ) {
                  ((a = e.child.sibling).return = e), (e = a);
                  continue;
                }
                if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
              }
              if (e === t) break;
              for (; null === e.sibling; ) {
                if (null === e.return || e.return === t) break e;
                e = e.return;
              }
              (e.sibling.return = e.return), (e = e.sibling);
            }
          return void Nl(n);
        case 19:
          return void Nl(n);
        case 17:
          return;
      }
      throw Error(i(163));
    }
    function Nl(e) {
      var n = e.updateQueue;
      if (null !== n) {
        e.updateQueue = null;
        var t = e.stateNode;
        null === t && (t = e.stateNode = new vl()),
          n.forEach(function (n) {
            var r = Du.bind(null, e, n);
            t.has(n) || (t.add(n), n.then(r, r));
          });
      }
    }
    var Ol,
      Ml = Math.ceil,
      zl = K.ReactCurrentDispatcher,
      Il = K.ReactCurrentOwner,
      Rl = 0,
      Ll = null,
      Al = null,
      jl = 0,
      Dl = 0,
      Fl = null,
      Ul = 1073741823,
      Bl = 1073741823,
      $l = null,
      Vl = 0,
      Wl = !1,
      Hl = 0,
      Ql = null,
      ql = !1,
      Kl = null,
      Yl = null,
      Xl = !1,
      Gl = null,
      Jl = 90,
      Zl = null,
      eu = 0,
      nu = null,
      tu = 0;
    function ru() {
      return 0 != (48 & Rl)
        ? 1073741821 - ((Uo() / 10) | 0)
        : 0 !== tu
        ? tu
        : (tu = 1073741821 - ((Uo() / 10) | 0));
    }
    function ou(e, n, t) {
      if (0 == (2 & (n = n.mode))) return 1073741823;
      var r = Bo();
      if (0 == (4 & n)) return 99 === r ? 1073741823 : 1073741822;
      if (0 != (16 & Rl)) return jl;
      if (null !== t) e = Ko(e, 0 | t.timeoutMs || 5e3, 250);
      else
        switch (r) {
          case 99:
            e = 1073741823;
            break;
          case 98:
            e = Ko(e, 150, 100);
            break;
          case 97:
          case 96:
            e = Ko(e, 5e3, 250);
            break;
          case 95:
            e = 2;
            break;
          default:
            throw Error(i(326));
        }
      return null !== Ll && e === jl && --e, e;
    }
    function au(e, n) {
      if (50 < eu) throw ((eu = 0), (nu = null), Error(i(185)));
      if (null !== (e = iu(e, n))) {
        var t = Bo();
        1073741823 === n
          ? 0 != (8 & Rl) && 0 == (48 & Rl)
            ? su(e)
            : (uu(e), 0 === Rl && Qo())
          : uu(e),
          0 == (4 & Rl) ||
            (98 !== t && 99 !== t) ||
            (null === Zl
              ? (Zl = new Map([[e, n]]))
              : (void 0 === (t = Zl.get(e)) || t > n) && Zl.set(e, n));
      }
    }
    function iu(e, n) {
      e.expirationTime < n && (e.expirationTime = n);
      var t = e.alternate;
      null !== t && t.expirationTime < n && (t.expirationTime = n);
      var r = e.return,
        o = null;
      if (null === r && 3 === e.tag) o = e.stateNode;
      else
        for (; null !== r; ) {
          if (
            ((t = r.alternate),
            r.childExpirationTime < n && (r.childExpirationTime = n),
            null !== t &&
              t.childExpirationTime < n &&
              (t.childExpirationTime = n),
            null === r.return && 3 === r.tag)
          ) {
            o = r.stateNode;
            break;
          }
          r = r.return;
        }
      return (
        null !== o && (Ll === o && (wu(n), 4 === Dl && Gu(o, jl)), Ju(o, n)), o
      );
    }
    function lu(e) {
      var n = e.lastExpiredTime;
      if (0 !== n) return n;
      if (!Xu(e, (n = e.firstPendingTime))) return n;
      var t = e.lastPingedTime;
      return 2 >= (e = t > (e = e.nextKnownPendingLevel) ? t : e) && n !== e
        ? 0
        : e;
    }
    function uu(e) {
      if (0 !== e.lastExpiredTime)
        (e.callbackExpirationTime = 1073741823),
          (e.callbackPriority = 99),
          (e.callbackNode = Ho(su.bind(null, e)));
      else {
        var n = lu(e),
          t = e.callbackNode;
        if (0 === n)
          null !== t &&
            ((e.callbackNode = null),
            (e.callbackExpirationTime = 0),
            (e.callbackPriority = 90));
        else {
          var r = ru();
          if (
            (1073741823 === n
              ? (r = 99)
              : 1 === n || 2 === n
              ? (r = 95)
              : (r =
                  0 >= (r = 10 * (1073741821 - n) - 10 * (1073741821 - r))
                    ? 99
                    : 250 >= r
                    ? 98
                    : 5250 >= r
                    ? 97
                    : 95),
            null !== t)
          ) {
            var o = e.callbackPriority;
            if (e.callbackExpirationTime === n && o >= r) return;
            t !== Ro && To(t);
          }
          (e.callbackExpirationTime = n),
            (e.callbackPriority = r),
            (n =
              1073741823 === n
                ? Ho(su.bind(null, e))
                : Wo(r, cu.bind(null, e), {
                    timeout: 10 * (1073741821 - n) - Uo(),
                  })),
            (e.callbackNode = n);
        }
      }
    }
    function cu(e, n) {
      if (((tu = 0), n)) return Zu(e, (n = ru())), uu(e), null;
      var t = lu(e);
      if (0 === t) return null;
      if (((n = e.callbackNode), 0 != (48 & Rl))) throw Error(i(327));
      Mu();
      var r = t,
        o = Rl;
      Rl |= 16;
      var a = bu();
      for ((e === Ll && r === jl) || gu(e, r); ; )
        try {
          Tu();
          break;
        } catch (n) {
          vu(e, n);
        }
      if (
        (ea(),
        (zl.current = a),
        (Rl = o),
        null !== Al ? (r = 0) : ((Ll = null), (r = Dl)),
        0 !== r)
      ) {
        if ((2 === r && (r = ku(e, (t = 2 < t ? 2 : t))), 1 === r))
          throw ((n = Fl), gu(e, t), Gu(e, t), uu(e), n);
        switch (
          ((o = e.current.alternate),
          (e.finishedWork = o),
          (e.finishedExpirationTime = t),
          (e.nextKnownPendingLevel = Pu(o)),
          r)
        ) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            _u(e);
            break;
          case 3:
            if (
              (Gu(e, t),
              (r = e.lastSuspendedTime),
              1073741823 === Ul && 10 < (o = Hl + 500 - Uo()))
            ) {
              if (Wl && (0 === (a = e.lastPingedTime) || a >= t)) {
                (e.lastPingedTime = t), gu(e, t);
                break;
              }
              if (0 !== (a = lu(e)) && a !== t) break;
              if (0 !== r && r !== t) {
                e.lastPingedTime = r;
                break;
              }
              e.timeoutHandle = wt(_u.bind(null, e), o);
              break;
            }
            _u(e);
            break;
          case 4:
            if (
              (Gu(e, t),
              (r = e.lastSuspendedTime),
              Wl && (0 === (o = e.lastPingedTime) || o >= t))
            ) {
              (e.lastPingedTime = t), gu(e, t);
              break;
            }
            if (0 !== (o = lu(e)) && o !== t) break;
            if (0 !== r && r !== t) {
              e.lastPingedTime = r;
              break;
            }
            if (
              (1073741823 !== Bl
                ? (r = 10 * (1073741821 - Bl) - Uo())
                : 1073741823 === Ul
                ? (r = 0)
                : ((r = 10 * (1073741821 - Ul) - 5e3),
                  0 > (r = (o = Uo()) - r) && (r = 0),
                  (t = 10 * (1073741821 - t) - o) <
                    (r =
                      (120 > r
                        ? 120
                        : 480 > r
                        ? 480
                        : 1080 > r
                        ? 1080
                        : 1920 > r
                        ? 1920
                        : 3e3 > r
                        ? 3e3
                        : 4320 > r
                        ? 4320
                        : 1960 * Ml(r / 1960)) - r) && (r = t)),
              10 < r)
            ) {
              e.timeoutHandle = wt(_u.bind(null, e), r);
              break;
            }
            _u(e);
            break;
          case 5:
            if (1073741823 !== Ul && null !== $l) {
              a = Ul;
              var l = $l;
              if (
                (0 >= (r = 0 | l.busyMinDurationMs)
                  ? (r = 0)
                  : ((o = 0 | l.busyDelayMs),
                    (r =
                      (a =
                        Uo() -
                        (10 * (1073741821 - a) - (0 | l.timeoutMs || 5e3))) <= o
                        ? 0
                        : o + r - a)),
                10 < r)
              ) {
                Gu(e, t), (e.timeoutHandle = wt(_u.bind(null, e), r));
                break;
              }
            }
            _u(e);
            break;
          default:
            throw Error(i(329));
        }
      }
      return uu(e), e.callbackNode === n ? cu.bind(null, e) : null;
    }
    function su(e) {
      if (0 != (48 & Rl)) throw Error(i(327));
      Mu();
      var n = e.lastExpiredTime,
        t = ku(e, (n = 0 !== n ? (e === Ll && jl >= n ? jl : n) : 1073741823));
      if ((0 !== e.tag && 2 === t && (t = ku(e, (n = 2 < n ? 2 : n))), 1 === t))
        throw ((t = Fl), gu(e, n), Gu(e, n), uu(e), t);
      return (
        (t = e.current.alternate),
        (e.finishedWork = t),
        (e.finishedExpirationTime = n),
        (e.nextKnownPendingLevel = Pu(t)),
        _u(e),
        uu(e),
        null
      );
    }
    function fu() {
      0 == (49 & Rl) &&
        ((function () {
          if (null !== Zl) {
            var e = Zl;
            (Zl = null),
              e.forEach(function (e, n) {
                Zu(n, e), uu(n);
              }),
              Qo();
          }
        })(),
        Mu());
    }
    function du(e, n) {
      var t = Rl;
      Rl |= 1;
      try {
        return e(n);
      } finally {
        0 === (Rl = t) && Qo();
      }
    }
    function pu(e, n, t, r, o) {
      var a = Rl;
      Rl |= 4;
      try {
        return Vo(98, e.bind(null, n, t, r, o));
      } finally {
        0 === (Rl = a) && Qo();
      }
    }
    function mu(e, n) {
      var t = Rl;
      (Rl &= -2), (Rl |= 8);
      try {
        return e(n);
      } finally {
        0 === (Rl = t) && Qo();
      }
    }
    function hu(e, n) {
      if (0 != (48 & Rl)) throw Error(i(187));
      var t = Rl;
      Rl |= 1;
      try {
        return Vo(99, e.bind(null, n));
      } finally {
        (Rl = t), Qo();
      }
    }
    function gu(e, n) {
      (e.finishedWork = null), (e.finishedExpirationTime = 0);
      var t = e.timeoutHandle;
      if (
        (-1 !== t && ((e.timeoutHandle = -1), xt(t)),
        0 !== (t = e.lastSuspendedTime) && t < n)
      ) {
        var r = e.lastPingedTime;
        (0 === r || r > t) && (e.lastPingedTime = t);
      }
      if (null !== Al)
        for (t = Al.return; null !== t; ) {
          switch ((r = t).tag) {
            case 1:
              null != (r = r.type.childContextTypes) && vo();
              break;
            case 3:
              Ra(), uo(po), uo(fo), Ga();
              break;
            case 5:
              Aa(r);
              break;
            case 4:
              Ra();
              break;
            case 13:
            case 19:
              uo(ja);
              break;
            case 10:
              na(r);
          }
          t = t.return;
        }
      (Ll = e),
        (Al = Wu(e.current, null)),
        (jl = n),
        (Dl = 0),
        (Fl = null),
        (Bl = Ul = 1073741823),
        ($l = null),
        (Vl = 0),
        (Wl = !1);
    }
    function vu(e, n) {
      for (;;) {
        try {
          if ((ea(), (Ja.current = Di), oi)) {
            for (var t = ni.memoizedState; null !== t; ) {
              var r = t.queue;
              null !== r && (r.pending = null), (t = t.next);
            }
            oi = !1;
          }
          if (
            ((ei = 0),
            (ri = ti = ni = null),
            (ai = !1),
            (Il.current = null),
            null === Al || null === Al.return)
          )
            return (Dl = 1), (Fl = n), (Al = null);
          e: {
            var o = e,
              a = Al.return,
              i = Al,
              l = n;
            if (
              ((n = jl),
              (i.effectTag |= 2048),
              (i.firstEffect = i.lastEffect = null),
              null !== l && 'object' == typeof l && 'function' == typeof l.then)
            ) {
              var u = l;
              if (0 == (2 & i.mode)) {
                var c = i.alternate;
                c
                  ? ((i.updateQueue = c.updateQueue),
                    (i.memoizedState = c.memoizedState),
                    (i.expirationTime = c.expirationTime))
                  : ((i.updateQueue = null), (i.memoizedState = null));
              }
              var s = 0 != (1 & ja.current),
                f = a;
              do {
                var d;
                if ((d = 13 === f.tag)) {
                  var p = f.memoizedState;
                  if (null !== p) d = null !== p.dehydrated;
                  else {
                    var m = f.memoizedProps;
                    d =
                      void 0 !== m.fallback &&
                      (!0 !== m.unstable_avoidThisFallback || !s);
                  }
                }
                if (d) {
                  var h = f.updateQueue;
                  if (null === h) {
                    var g = new Set();
                    g.add(u), (f.updateQueue = g);
                  } else h.add(u);
                  if (0 == (2 & f.mode)) {
                    if (
                      ((f.effectTag |= 64), (i.effectTag &= -2981), 1 === i.tag)
                    )
                      if (null === i.alternate) i.tag = 17;
                      else {
                        var v = ua(1073741823, null);
                        (v.tag = 2), ca(i, v);
                      }
                    i.expirationTime = 1073741823;
                    break e;
                  }
                  (l = void 0), (i = n);
                  var b = o.pingCache;
                  if (
                    (null === b
                      ? ((b = o.pingCache = new ml()),
                        (l = new Set()),
                        b.set(u, l))
                      : void 0 === (l = b.get(u)) &&
                        ((l = new Set()), b.set(u, l)),
                    !l.has(i))
                  ) {
                    l.add(i);
                    var y = Lu.bind(null, o, u, i);
                    u.then(y, y);
                  }
                  (f.effectTag |= 4096), (f.expirationTime = n);
                  break e;
                }
                f = f.return;
              } while (null !== f);
              l = Error(
                (ve(i.type) || 'A React component') +
                  ' suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.' +
                  ge(i),
              );
            }
            5 !== Dl && (Dl = 2), (l = dl(l, i)), (f = a);
            do {
              switch (f.tag) {
                case 3:
                  (u = l),
                    (f.effectTag |= 4096),
                    (f.expirationTime = n),
                    sa(f, hl(0, u, n));
                  break e;
                case 1:
                  u = l;
                  var w = f.type,
                    x = f.stateNode;
                  if (
                    0 == (64 & f.effectTag) &&
                    ('function' == typeof w.getDerivedStateFromError ||
                      (null !== x &&
                        'function' == typeof x.componentDidCatch &&
                        (null === Yl || !Yl.has(x))))
                  ) {
                    (f.effectTag |= 4096),
                      (f.expirationTime = n),
                      sa(f, gl(f, u, n));
                    break e;
                  }
              }
              f = f.return;
            } while (null !== f);
          }
          Al = Su(Al);
        } catch (e) {
          n = e;
          continue;
        }
        break;
      }
    }
    function bu() {
      var e = zl.current;
      return (zl.current = Di), null === e ? Di : e;
    }
    function yu(e, n) {
      e < Ul && 2 < e && (Ul = e),
        null !== n && e < Bl && 2 < e && ((Bl = e), ($l = n));
    }
    function wu(e) {
      e > Vl && (Vl = e);
    }
    function xu() {
      (0 !== Dl && 3 !== Dl) || (Dl = 4),
        0 !== Vl && null !== Ll && (Gu(Ll, jl), Ju(Ll, Vl));
    }
    function ku(e, n) {
      var t = Rl;
      Rl |= 16;
      var r = bu();
      for ((e === Ll && n === jl) || gu(e, n); ; )
        try {
          Eu();
          break;
        } catch (n) {
          vu(e, n);
        }
      if ((ea(), (Rl = t), (zl.current = r), null !== Al)) throw Error(i(261));
      return (Ll = null), Dl;
    }
    function Eu() {
      for (; null !== Al; ) Al = Cu(Al);
    }
    function Tu() {
      for (; null !== Al && !Co(); ) Al = Cu(Al);
    }
    function Cu(e) {
      var n = Ol(e.alternate, e, jl);
      return (
        (e.memoizedProps = e.pendingProps),
        null === n && (n = Su(e)),
        (Il.current = null),
        n
      );
    }
    function Su(e) {
      Al = e;
      do {
        var n = Al.alternate;
        if (((e = Al.return), 0 == (2048 & Al.effectTag))) {
          if (((n = sl(n, Al, jl)), 1 === jl || 1 !== Al.childExpirationTime)) {
            for (var t = 0, r = Al.child; null !== r; ) {
              var o = r.expirationTime,
                a = r.childExpirationTime;
              o > t && (t = o), a > t && (t = a), (r = r.sibling);
            }
            Al.childExpirationTime = t;
          }
          if (null !== n) return n;
          null !== e &&
            0 == (2048 & e.effectTag) &&
            (null === e.firstEffect && (e.firstEffect = Al.firstEffect),
            null !== Al.lastEffect &&
              (null !== e.lastEffect &&
                (e.lastEffect.nextEffect = Al.firstEffect),
              (e.lastEffect = Al.lastEffect)),
            1 < Al.effectTag &&
              (null !== e.lastEffect
                ? (e.lastEffect.nextEffect = Al)
                : (e.firstEffect = Al),
              (e.lastEffect = Al)));
        } else {
          if (null !== (n = fl(Al))) return (n.effectTag &= 2047), n;
          null !== e &&
            ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
        }
        if (null !== (n = Al.sibling)) return n;
        Al = e;
      } while (null !== Al);
      return 0 === Dl && (Dl = 5), null;
    }
    function Pu(e) {
      var n = e.expirationTime;
      return n > (e = e.childExpirationTime) ? n : e;
    }
    function _u(e) {
      var n = Bo();
      return Vo(99, Nu.bind(null, e, n)), null;
    }
    function Nu(e, n) {
      do {
        Mu();
      } while (null !== Gl);
      if (0 != (48 & Rl)) throw Error(i(327));
      var t = e.finishedWork,
        r = e.finishedExpirationTime;
      if (null === t) return null;
      if (
        ((e.finishedWork = null),
        (e.finishedExpirationTime = 0),
        t === e.current)
      )
        throw Error(i(177));
      (e.callbackNode = null),
        (e.callbackExpirationTime = 0),
        (e.callbackPriority = 90);
      var o = Pu(t);
      if (
        ((e.firstPendingTime = o),
        o < e.lastPendingTime && (e.lastPendingTime = o),
        r <= e.lastSuspendedTime
          ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
          : r <= e.firstSuspendedTime && (e.firstSuspendedTime = r - 1),
        r <= e.lastPingedTime && (e.lastPingedTime = 0),
        r <= e.lastExpiredTime && (e.lastExpiredTime = 0),
        r <= e.mutableSourceLastPendingUpdateTime &&
          (e.mutableSourceLastPendingUpdateTime = 0),
        null !== Zl && void 0 !== (r = Zl.get(e)) && o < r && Zl.delete(e),
        e === Ll && ((Al = Ll = null), (jl = 0)),
        1 < t.effectTag
          ? null !== t.lastEffect
            ? ((t.lastEffect.nextEffect = t), (o = t.firstEffect))
            : (o = t)
          : (o = t.firstEffect),
        null !== o)
      ) {
        (r = Rl), (Rl |= 32), (Il.current = null), (gt = Xn);
        var a = mt();
        if (ht(a)) {
          if ('selectionStart' in a)
            var l = {start: a.selectionStart, end: a.selectionEnd};
          else
            e: {
              var u =
                (l = ((l = a.ownerDocument) && l.defaultView) || window)
                  .getSelection && l.getSelection();
              if (u && 0 !== u.rangeCount) {
                l = u.anchorNode;
                var c = u.anchorOffset,
                  s = u.focusNode;
                u = u.focusOffset;
                try {
                  l.nodeType, s.nodeType;
                } catch (e) {
                  l = null;
                  break e;
                }
                var f = 0,
                  d = -1,
                  p = -1,
                  m = 0,
                  h = 0,
                  g = a,
                  v = null;
                n: for (;;) {
                  for (
                    var b;
                    g !== l || (0 !== c && 3 !== g.nodeType) || (d = f + c),
                      g !== s || (0 !== u && 3 !== g.nodeType) || (p = f + u),
                      3 === g.nodeType && (f += g.nodeValue.length),
                      null !== (b = g.firstChild);

                  )
                    (v = g), (g = b);
                  for (;;) {
                    if (g === a) break n;
                    if (
                      (v === l && ++m === c && (d = f),
                      v === s && ++h === u && (p = f),
                      null !== (b = g.nextSibling))
                    )
                      break;
                    v = (g = v).parentNode;
                  }
                  g = b;
                }
                l = -1 === d || -1 === p ? null : {start: d, end: p};
              } else l = null;
            }
          l = l || {start: 0, end: 0};
        } else l = null;
        (vt = {activeElementDetached: null, focusedElem: a, selectionRange: l}),
          (Xn = !1),
          (Ql = o);
        do {
          try {
            Ou();
          } catch (e) {
            if (null === Ql) throw Error(i(330));
            Ru(Ql, e), (Ql = Ql.nextEffect);
          }
        } while (null !== Ql);
        Ql = o;
        do {
          try {
            for (a = e, l = n; null !== Ql; ) {
              var y = Ql.effectTag;
              if ((16 & y && Ue(Ql.stateNode, ''), 128 & y)) {
                var w = Ql.alternate;
                if (null !== w) {
                  var x = w.ref;
                  null !== x &&
                    ('function' == typeof x ? x(null) : (x.current = null));
                }
              }
              switch (1038 & y) {
                case 2:
                  Sl(Ql), (Ql.effectTag &= -3);
                  break;
                case 6:
                  Sl(Ql), (Ql.effectTag &= -3), _l(Ql.alternate, Ql);
                  break;
                case 1024:
                  Ql.effectTag &= -1025;
                  break;
                case 1028:
                  (Ql.effectTag &= -1025), _l(Ql.alternate, Ql);
                  break;
                case 4:
                  _l(Ql.alternate, Ql);
                  break;
                case 8:
                  Pl(a, (c = Ql), l);
                  var k = c.alternate;
                  Tl(c), null !== k && Tl(k);
              }
              Ql = Ql.nextEffect;
            }
          } catch (e) {
            if (null === Ql) throw Error(i(330));
            Ru(Ql, e), (Ql = Ql.nextEffect);
          }
        } while (null !== Ql);
        if (
          ((x = vt),
          (w = mt()),
          (y = x.focusedElem),
          (a = x.selectionRange),
          w !== y &&
            y &&
            y.ownerDocument &&
            (function e(n, t) {
              return (
                !(!n || !t) &&
                (n === t ||
                  ((!n || 3 !== n.nodeType) &&
                    (t && 3 === t.nodeType
                      ? e(n, t.parentNode)
                      : 'contains' in n
                      ? n.contains(t)
                      : !!n.compareDocumentPosition &&
                        !!(16 & n.compareDocumentPosition(t)))))
              );
            })(y.ownerDocument.documentElement, y))
        ) {
          null !== a &&
            ht(y) &&
            ((w = a.start),
            void 0 === (x = a.end) && (x = w),
            'selectionStart' in y
              ? ((y.selectionStart = w),
                (y.selectionEnd = Math.min(x, y.value.length)))
              : (x =
                  ((w = y.ownerDocument || document) && w.defaultView) ||
                  window).getSelection &&
                ((x = x.getSelection()),
                (l = y.textContent.length),
                (k = Math.min(a.start, l)),
                (a = void 0 === a.end ? k : Math.min(a.end, l)),
                !x.extend && k > a && ((l = a), (a = k), (k = l)),
                (l = pt(y, k)),
                (c = pt(y, a)),
                l &&
                  c &&
                  (1 !== x.rangeCount ||
                    x.anchorNode !== l.node ||
                    x.anchorOffset !== l.offset ||
                    x.focusNode !== c.node ||
                    x.focusOffset !== c.offset) &&
                  ((w = w.createRange()).setStart(l.node, l.offset),
                  x.removeAllRanges(),
                  k > a
                    ? (x.addRange(w), x.extend(c.node, c.offset))
                    : (w.setEnd(c.node, c.offset), x.addRange(w))))),
            (w = []);
          for (x = y; (x = x.parentNode); )
            1 === x.nodeType &&
              w.push({element: x, left: x.scrollLeft, top: x.scrollTop});
          for (
            'function' == typeof y.focus && y.focus(), y = 0;
            y < w.length;
            y++
          )
            ((x = w[y]).element.scrollLeft = x.left),
              (x.element.scrollTop = x.top);
        }
        (Xn = !!gt), (vt = gt = null), (e.current = t), (Ql = o);
        do {
          try {
            for (y = e; null !== Ql; ) {
              var E = Ql.effectTag;
              if ((36 & E && kl(y, Ql.alternate, Ql), 128 & E)) {
                w = void 0;
                var T = Ql.ref;
                if (null !== T) {
                  var C = Ql.stateNode;
                  switch (Ql.tag) {
                    case 5:
                      w = C;
                      break;
                    default:
                      w = C;
                  }
                  'function' == typeof T ? T(w) : (T.current = w);
                }
              }
              Ql = Ql.nextEffect;
            }
          } catch (e) {
            if (null === Ql) throw Error(i(330));
            Ru(Ql, e), (Ql = Ql.nextEffect);
          }
        } while (null !== Ql);
        (Ql = null), Lo(), (Rl = r);
      } else e.current = t;
      if (Xl) (Xl = !1), (Gl = e), (Jl = n);
      else
        for (Ql = o; null !== Ql; )
          (n = Ql.nextEffect), (Ql.nextEffect = null), (Ql = n);
      if (
        (0 === (n = e.firstPendingTime) && (Yl = null),
        1073741823 === n ? (e === nu ? eu++ : ((eu = 0), (nu = e))) : (eu = 0),
        (t = t.stateNode),
        Uu && 'function' == typeof Uu.onCommitFiberRoot)
      )
        try {
          Uu.onCommitFiberRoot(Fu, t, void 0, 64 == (64 & t.current.effectTag));
        } catch (e) {}
      if ((uu(e), ql)) throw ((ql = !1), (e = Kl), (Kl = null), e);
      return 0 != (8 & Rl) || Qo(), null;
    }
    function Ou() {
      for (; null !== Ql; ) {
        var e = Ql.effectTag;
        0 != (256 & e) && yl(Ql.alternate, Ql),
          0 == (512 & e) ||
            Xl ||
            ((Xl = !0),
            Wo(97, function () {
              return Mu(), null;
            })),
          (Ql = Ql.nextEffect);
      }
    }
    function Mu() {
      if (90 !== Jl) {
        var e = 97 < Jl ? 97 : Jl;
        return (Jl = 90), Vo(e, zu);
      }
    }
    function zu() {
      if (null === Gl) return !1;
      var e = Gl;
      if (((Gl = null), 0 != (48 & Rl))) throw Error(i(331));
      var n = Rl;
      for (Rl |= 32, e = e.current.firstEffect; null !== e; ) {
        try {
          var t = e;
          if (0 != (512 & t.effectTag))
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
              case 22:
                wl(5, t), xl(5, t);
            }
        } catch (n) {
          if (null === e) throw Error(i(330));
          Ru(e, n);
        }
        (t = e.nextEffect), (e.nextEffect = null), (e = t);
      }
      return (Rl = n), Qo(), !0;
    }
    function Iu(e, n, t) {
      ca(e, (n = hl(0, (n = dl(t, n)), 1073741823))),
        null !== (e = iu(e, 1073741823)) && uu(e);
    }
    function Ru(e, n) {
      if (3 === e.tag) Iu(e, e, n);
      else
        for (var t = e.return; null !== t; ) {
          if (3 === t.tag) {
            Iu(t, e, n);
            break;
          }
          if (1 === t.tag) {
            var r = t.stateNode;
            if (
              'function' == typeof t.type.getDerivedStateFromError ||
              ('function' == typeof r.componentDidCatch &&
                (null === Yl || !Yl.has(r)))
            ) {
              ca(t, (e = gl(t, (e = dl(n, e)), 1073741823))),
                null !== (t = iu(t, 1073741823)) && uu(t);
              break;
            }
          }
          t = t.return;
        }
    }
    function Lu(e, n, t) {
      var r = e.pingCache;
      null !== r && r.delete(n),
        Ll === e && jl === t
          ? 4 === Dl || (3 === Dl && 1073741823 === Ul && 500 > Uo() - Hl)
            ? gu(e, jl)
            : (Wl = !0)
          : Xu(e, t) &&
            ((0 !== (n = e.lastPingedTime) && n < t) ||
              ((e.lastPingedTime = t), uu(e)));
    }
    function Au(e, n) {
      0 === n && (n = ou((n = ru()), e, null)),
        null !== (e = iu(e, n)) && uu(e);
    }
    function ju(e) {
      var n = e.memoizedState,
        t = 0;
      null !== n && (t = n.retryTime), Au(e, t);
    }
    function Du(e, n) {
      var t = 0;
      switch (e.tag) {
        case 13:
          var r = e.stateNode,
            o = e.memoizedState;
          null !== o && (t = o.retryTime);
          break;
        case 19:
          r = e.stateNode;
          break;
        default:
          throw Error(i(314));
      }
      null !== r && r.delete(n), Au(e, t);
    }
    Ol = function (e, n, t) {
      var r = n.expirationTime;
      if (null !== e) {
        var o = n.pendingProps;
        if (e.memoizedProps !== o || po.current) Vi = !0;
        else {
          if (r < t) {
            switch (((Vi = !1), n.tag)) {
              case 3:
                Zi(n), Ka();
                break;
              case 5:
                if ((La(n), 4 & n.mode && 1 !== t && o.hidden))
                  return (n.expirationTime = n.childExpirationTime = 1), null;
                break;
              case 1:
                go(n.type) && wo(n);
                break;
              case 4:
                Ia(n, n.stateNode.containerInfo);
                break;
              case 10:
                (r = n.memoizedProps.value),
                  (o = n.type._context),
                  co(Xo, o._currentValue),
                  (o._currentValue = r);
                break;
              case 13:
                if (null !== (r = n.memoizedState)) {
                  if (null !== r.dehydrated) {
                    co(ja, 1 & ja.current), (n.effectTag |= 64);
                    break;
                  }
                  if (0 !== (o = (r = n.child).childExpirationTime) && o >= t)
                    return rl(e, n, t);
                  for (r = r.child; null !== r; ) {
                    o = r.expirationTime;
                    var a = r.childExpirationTime;
                    if ((0 !== o && o >= t) || (0 !== a && a >= t))
                      return rl(e, n, t);
                    r = r.sibling;
                  }
                  return (
                    co(ja, 1 & ja.current),
                    null !== (n = ul(e, n, t)) ? n.sibling : null
                  );
                }
                co(ja, 1 & ja.current);
                break;
              case 19:
                if (
                  ((r = n.childExpirationTime >= t), 0 != (64 & e.effectTag))
                ) {
                  if (r) return ll(e, n, t);
                  n.effectTag |= 64;
                }
                if (
                  (null !== (o = n.memoizedState) &&
                    ((o.rendering = null),
                    (o.tail = null),
                    (o.lastEffect = null)),
                  co(ja, ja.current),
                  !r)
                )
                  return null;
            }
            return ul(e, n, t);
          }
          Vi = !1;
        }
      } else Vi = !1;
      switch (((n.expirationTime = 0), n.tag)) {
        case 2:
          if (
            ((r = n.type),
            null !== e &&
              ((e.alternate = null), (n.alternate = null), (n.effectTag |= 2)),
            (e = n.pendingProps),
            (o = ho(n, fo.current)),
            ra(n, t),
            (o = ui(null, n, r, e, o, t)),
            (n.effectTag |= 1),
            'object' == typeof o &&
              null !== o &&
              'function' == typeof o.render &&
              void 0 === o.$$typeof)
          ) {
            (n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              go(r) ? ((a = !0), wo(n)) : (a = !1),
              (n.memoizedState =
                null !== o.state && void 0 !== o.state ? o.state : null),
              ia(n);
            var l = r.getDerivedStateFromProps;
            'function' == typeof l && ha(n, r, l, e),
              (o.updater = ga),
              (n.stateNode = o),
              (o._reactInternals = n),
              wa(n, r, e, t),
              (n = Ji(null, n, r, !0, a, t));
          } else (n.tag = 0), Wi(null, n, o, t), (n = n.child);
          return n;
        case 16:
          o = n.elementType;
          e: {
            switch (
              (null !== e &&
                ((e.alternate = null),
                (n.alternate = null),
                (n.effectTag |= 2)),
              (e = n.pendingProps),
              (o = (a = o._init)(o._payload)),
              (n.type = o),
              (a = n.tag = (function (e) {
                if ('function' == typeof e) return Vu(e) ? 1 : 0;
                if (null != e) {
                  if ((e = e.$$typeof) === re) return 11;
                  if (e === ie) return 14;
                  if (e === ue) return 22;
                }
                return 2;
              })(o)),
              (l = Yo(o, e)),
              a)
            ) {
              case 0:
                n = Yi(null, n, o, l, t);
                break e;
              case 1:
                n = Gi(null, n, o, l, t);
                break e;
              case 11:
                n = Hi(null, n, o, l, t);
                break e;
              case 14:
                n = Qi(null, n, o, Yo(o.type, l), r, t);
                break e;
              case 22:
                n = Xi(null, n, o, e, t);
                break e;
            }
            throw Error(i(306, o, ''));
          }
          return n;
        case 0:
          return (
            (r = n.type),
            (o = n.pendingProps),
            Yi(e, n, r, (o = n.elementType === r ? o : Yo(r, o)), t)
          );
        case 1:
          return (
            (r = n.type),
            (o = n.pendingProps),
            Gi(e, n, r, (o = n.elementType === r ? o : Yo(r, o)), t)
          );
        case 3:
          if ((Zi(n), (r = n.updateQueue), null === e || null === r))
            throw Error(i(282));
          if (
            ((r = n.pendingProps),
            (o = null !== (o = n.memoizedState) ? o.element : null),
            la(e, n),
            fa(n, r, null, t),
            (r = n.memoizedState.element) === o)
          )
            Ka(), (n = ul(e, n, t));
          else {
            if (
              ((o = n.stateNode.hydrate) &&
                ((Ba = Et(n.stateNode.containerInfo.firstChild)),
                (Ua = n),
                (o = $a = !0)),
              o)
            )
              for (t = Pa(n, null, r, t), n.child = t; t; )
                (t.effectTag = (-3 & t.effectTag) | 1024), (t = t.sibling);
            else Wi(e, n, r, t), Ka();
            n = n.child;
          }
          return n;
        case 5:
          return (
            La(n),
            null === e && Ha(n),
            (r = n.type),
            (o = n.pendingProps),
            (a = null !== e ? e.memoizedProps : null),
            (l = o.children),
            yt(r, o)
              ? (l = null)
              : null !== a && yt(r, a) && (n.effectTag |= 16),
            Ki(e, n),
            4 & n.mode && 1 !== t && o.hidden
              ? ((n.expirationTime = n.childExpirationTime = 1), (n = null))
              : (Wi(e, n, l, t), (n = n.child)),
            n
          );
        case 6:
          return null === e && Ha(n), null;
        case 13:
          return rl(e, n, t);
        case 4:
          return (
            Ia(n, n.stateNode.containerInfo),
            (r = n.pendingProps),
            null === e ? (n.child = Sa(n, null, r, t)) : Wi(e, n, r, t),
            n.child
          );
        case 11:
          return (
            (r = n.type),
            (o = n.pendingProps),
            Hi(e, n, r, (o = n.elementType === r ? o : Yo(r, o)), t)
          );
        case 7:
          return Wi(e, n, n.pendingProps, t), n.child;
        case 8:
        case 12:
          return Wi(e, n, n.pendingProps.children, t), n.child;
        case 10:
          e: {
            (r = n.type._context),
              (o = n.pendingProps),
              (l = n.memoizedProps),
              (a = o.value);
            var u = n.type._context;
            if ((co(Xo, u._currentValue), (u._currentValue = a), null !== l))
              if (
                ((u = l.value),
                0 ===
                  (a = jr(u, a)
                    ? 0
                    : 0 |
                      ('function' == typeof r._calculateChangedBits
                        ? r._calculateChangedBits(u, a)
                        : 1073741823)))
              ) {
                if (l.children === o.children && !po.current) {
                  n = ul(e, n, t);
                  break e;
                }
              } else
                for (null !== (l = n.child) && (l.return = n); null !== l; ) {
                  var c = l.dependencies;
                  if (null !== c) {
                    u = l.child;
                    for (var s = c.firstContext; null !== s; ) {
                      if (s.context === r && 0 != (s.observedBits & a)) {
                        1 === l.tag && (((s = ua(t, null)).tag = 2), ca(l, s)),
                          l.expirationTime < t && (l.expirationTime = t),
                          null !== (s = l.alternate) &&
                            s.expirationTime < t &&
                            (s.expirationTime = t),
                          ta(l.return, t),
                          c.expirationTime < t && (c.expirationTime = t);
                        break;
                      }
                      s = s.next;
                    }
                  } else if (10 === l.tag)
                    u = l.type === n.type ? null : l.child;
                  else if (18 === l.tag) {
                    if (null === (u = l.return)) throw Error(i(341));
                    u.expirationTime < t && (u.expirationTime = t),
                      null !== (c = u.alternate) &&
                        c.expirationTime < t &&
                        (c.expirationTime = t),
                      ta(u, t),
                      (u = l.sibling);
                  } else u = l.child;
                  if (null !== u) u.return = l;
                  else
                    for (u = l; null !== u; ) {
                      if (u === n) {
                        u = null;
                        break;
                      }
                      if (null !== (l = u.sibling)) {
                        (l.return = u.return), (u = l);
                        break;
                      }
                      u = u.return;
                    }
                  l = u;
                }
            Wi(e, n, o.children, t), (n = n.child);
          }
          return n;
        case 9:
          return (
            (o = n.type),
            (r = (a = n.pendingProps).children),
            ra(n, t),
            (r = r((o = oa(o, a.unstable_observedBits)))),
            (n.effectTag |= 1),
            Wi(e, n, r, t),
            n.child
          );
        case 14:
          return (
            (a = Yo((o = n.type), n.pendingProps)),
            Qi(e, n, o, (a = Yo(o.type, a)), r, t)
          );
        case 15:
          return qi(e, n, n.type, n.pendingProps, r, t);
        case 17:
          return (
            (r = n.type),
            (o = n.pendingProps),
            (o = n.elementType === r ? o : Yo(r, o)),
            null !== e &&
              ((e.alternate = null), (n.alternate = null), (n.effectTag |= 2)),
            (n.tag = 1),
            go(r) ? ((e = !0), wo(n)) : (e = !1),
            ra(n, t),
            ba(n, r, o),
            wa(n, r, o, t),
            Ji(null, n, r, !0, e, t)
          );
        case 19:
          return ll(e, n, t);
        case 22:
          return Xi(e, n, n.type, n.pendingProps, t);
      }
      throw Error(i(156, n.tag));
    };
    var Fu = null,
      Uu = null;
    function Bu(e, n, t, r) {
      (this.tag = e),
        (this.key = t),
        (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = n),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.effectTag = 0),
        (this.lastEffect = this.firstEffect = this.nextEffect = null),
        (this.childExpirationTime = this.expirationTime = 0),
        (this.alternate = null);
    }
    function $u(e, n, t, r) {
      return new Bu(e, n, t, r);
    }
    function Vu(e) {
      return !(!(e = e.prototype) || !e.isReactComponent);
    }
    function Wu(e, n) {
      var t = e.alternate;
      return (
        null === t
          ? (((t = $u(e.tag, n, e.key, e.mode)).elementType = e.elementType),
            (t.type = e.type),
            (t.stateNode = e.stateNode),
            (t.alternate = e),
            (e.alternate = t))
          : ((t.pendingProps = n),
            (t.effectTag = 0),
            (t.nextEffect = null),
            (t.firstEffect = null),
            (t.lastEffect = null)),
        (t.childExpirationTime = e.childExpirationTime),
        (t.expirationTime = e.expirationTime),
        (t.child = e.child),
        (t.memoizedProps = e.memoizedProps),
        (t.memoizedState = e.memoizedState),
        (t.updateQueue = e.updateQueue),
        (n = e.dependencies),
        (t.dependencies =
          null === n
            ? null
            : {
                expirationTime: n.expirationTime,
                firstContext: n.firstContext,
                responders: n.responders,
              }),
        (t.sibling = e.sibling),
        (t.index = e.index),
        (t.ref = e.ref),
        t
      );
    }
    function Hu(e, n, t, r, o, a) {
      var l = 2;
      if (((r = e), 'function' == typeof e)) Vu(e) && (l = 1);
      else if ('string' == typeof e) l = 5;
      else
        e: switch (e) {
          case J:
            return Qu(t.children, o, a, n);
          case Z:
            (l = 8), (o |= 1);
            break;
          case ee:
            return (
              ((e = $u(12, t, n, 8 | o)).elementType = ee),
              (e.type = ee),
              (e.expirationTime = a),
              e
            );
          case oe:
            return (
              ((e = $u(13, t, n, o)).type = oe),
              (e.elementType = oe),
              (e.expirationTime = a),
              e
            );
          case ae:
            return (
              ((e = $u(19, t, n, o)).elementType = ae),
              (e.expirationTime = a),
              e
            );
          default:
            if ('object' == typeof e && null !== e)
              switch (e.$$typeof) {
                case ne:
                  l = 10;
                  break e;
                case te:
                  l = 9;
                  break e;
                case re:
                  l = 11;
                  break e;
                case ie:
                  l = 14;
                  break e;
                case le:
                  (l = 16), (r = null);
                  break e;
                case ue:
                  l = 22;
                  break e;
              }
            throw Error(i(130, null == e ? e : typeof e, ''));
        }
      return (
        ((n = $u(l, t, n, o)).elementType = e),
        (n.type = r),
        (n.expirationTime = a),
        n
      );
    }
    function Qu(e, n, t, r) {
      return ((e = $u(7, e, r, n)).expirationTime = t), e;
    }
    function qu(e, n, t) {
      return ((e = $u(6, e, null, n)).expirationTime = t), e;
    }
    function Ku(e, n, t) {
      return (
        ((n = $u(
          4,
          null !== e.children ? e.children : [],
          e.key,
          n,
        )).expirationTime = t),
        (n.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        n
      );
    }
    function Yu(e, n, t) {
      (this.tag = n),
        (this.current = null),
        (this.containerInfo = e),
        (this.pingCache = this.pendingChildren = null),
        (this.finishedExpirationTime = 0),
        (this.finishedWork = null),
        (this.timeoutHandle = -1),
        (this.pendingContext = this.context = null),
        (this.hydrate = t),
        (this.callbackNode = null),
        (this.callbackPriority = 90),
        (this.mutableSourceLastPendingUpdateTime = this.mutableSourceFirstPendingUpdateTime = this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.lastPendingTime = this.firstPendingTime = 0);
    }
    function Xu(e, n) {
      var t = e.firstSuspendedTime;
      return (e = e.lastSuspendedTime), 0 !== t && t >= n && e <= n;
    }
    function Gu(e, n) {
      var t = e.firstSuspendedTime,
        r = e.lastSuspendedTime;
      t < n && (e.firstSuspendedTime = n),
        (r > n || 0 === t) && (e.lastSuspendedTime = n),
        n <= e.lastPingedTime && (e.lastPingedTime = 0),
        n <= e.lastExpiredTime && (e.lastExpiredTime = 0);
    }
    function Ju(e, n) {
      n > e.firstPendingTime && (e.firstPendingTime = n);
      var t = e.lastPendingTime;
      (0 === t || n < t) && (e.lastPendingTime = n),
        0 !== (t = e.firstSuspendedTime) &&
          (n >= t
            ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
            : n >= e.lastSuspendedTime && (e.lastSuspendedTime = n + 1),
          n > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = n));
    }
    function Zu(e, n) {
      var t = e.lastExpiredTime;
      (0 === t || t > n) && (e.lastExpiredTime = n);
    }
    function ec(e, n, t) {
      var r =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: G,
        key: null == r ? null : '' + r,
        children: e,
        containerInfo: n,
        implementation: t,
      };
    }
    function nc(e, n, t, r) {
      var o = n.current,
        a = ru(),
        l = pa.suspense;
      a = ou(a, o, l);
      e: if (t) {
        n: {
          if (Ze((t = t._reactInternals)) !== t || 1 !== t.tag)
            throw Error(i(170));
          var u = t;
          do {
            switch (u.tag) {
              case 3:
                u = u.stateNode.context;
                break n;
              case 1:
                if (go(u.type)) {
                  u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                  break n;
                }
            }
            u = u.return;
          } while (null !== u);
          throw Error(i(171));
        }
        if (1 === t.tag) {
          var c = t.type;
          if (go(c)) {
            t = yo(t, c, u);
            break e;
          }
        }
        t = u;
      } else t = so;
      return (
        null === n.context ? (n.context = t) : (n.pendingContext = t),
        ((n = ua(a, l)).payload = {element: e}),
        null !== (r = void 0 === r ? null : r) && (n.callback = r),
        ca(o, n),
        au(o, a),
        a
      );
    }
    function tc(e) {
      if (!(e = e.current).child) return null;
      switch (e.child.tag) {
        case 5:
        default:
          return e.child.stateNode;
      }
    }
    function rc(e, n) {
      null !== (e = e.memoizedState) &&
        null !== e.dehydrated &&
        e.retryTime < n &&
        (e.retryTime = n);
    }
    function oc(e, n) {
      rc(e, n), (e = e.alternate) && rc(e, n);
    }
    function ac(e, n) {
      this._internalRoot = lc(e, 2, n);
    }
    function ic(e, n, t) {
      this._internalRoot = lc(e, n, t);
    }
    function lc(e, n, t) {
      var r = new Yu(e, n, (t = null != t && !0 === t.hydrate)),
        o = $u(3, null, null, 2 === n ? 7 : 1 === n ? 3 : 0);
      return (
        (r.current = o),
        (o.stateNode = r),
        ia(o),
        (e[Nt] = r.current),
        t &&
          0 !== n &&
          (function (e, n) {
            var t = Je(n);
            An.forEach(function (e) {
              mn(e, n, t);
            }),
              jn.forEach(function (e) {
                mn(e, n, t);
              });
          })(0, 9 === e.nodeType ? e : e.ownerDocument),
        r
      );
    }
    function uc(e) {
      return !(
        !e ||
        (1 !== e.nodeType &&
          9 !== e.nodeType &&
          11 !== e.nodeType &&
          (8 !== e.nodeType || ' react-mount-point-unstable ' !== e.nodeValue))
      );
    }
    function cc(e, n, t, r, o) {
      var a = t._reactRootContainer;
      if (a) {
        var i = a._internalRoot;
        if ('function' == typeof o) {
          var l = o;
          o = function () {
            var e = tc(i);
            l.call(e);
          };
        }
        nc(n, i, e, o);
      } else {
        if (
          ((a = t._reactRootContainer = (function (e, n) {
            if (
              (n ||
                (n = !(
                  !(n = e
                    ? 9 === e.nodeType
                      ? e.documentElement
                      : e.firstChild
                    : null) ||
                  1 !== n.nodeType ||
                  !n.hasAttribute('data-reactroot')
                )),
              !n)
            )
              for (var t; (t = e.lastChild); ) e.removeChild(t);
            return new ic(e, 0, n ? {hydrate: !0} : void 0);
          })(t, r)),
          (i = a._internalRoot),
          'function' == typeof o)
        ) {
          var u = o;
          o = function () {
            var e = tc(i);
            u.call(e);
          };
        }
        mu(function () {
          nc(n, i, e, o);
        });
      }
      return tc(i);
    }
    function sc(e, n) {
      var t =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!uc(n)) throw Error(i(200));
      return ec(e, n, null, t);
    }
    (ac.prototype.render = ic.prototype.render = function (e) {
      nc(e, this._internalRoot, null, null);
    }),
      (ac.prototype.unmount = ic.prototype.unmount = function () {
        var e = this._internalRoot,
          n = e.containerInfo;
        nc(null, e, null, function () {
          n[Nt] = null;
        });
      }),
      (Tn = function (e) {
        switch (e.tag) {
          case 3:
            var n = e.stateNode;
            n.hydrate &&
              (Zu(n, n.firstPendingTime), uu(n), 0 == (48 & Rl) && Qo());
            break;
          case 13:
            hu(function () {
              return au(e, 1073741823);
            }),
              (n = Ko(ru(), 150, 100)),
              oc(e, n);
        }
      }),
      (Cn = function (e) {
        if (13 === e.tag) {
          var n = Ko(ru(), 150, 100);
          au(e, n), oc(e, n);
        }
      }),
      (Sn = function (e) {
        13 === e.tag && (au(e, 3), oc(e, 3));
      }),
      (Pn = function (e) {
        if (13 === e.tag) {
          var n = ru();
          au(e, (n = ou(n, e, null))), oc(e, n);
        }
      }),
      (S = function (e, n, t) {
        switch (n) {
          case 'input':
            if ((Ce(e, t), (n = t.name), 'radio' === t.type && null != n)) {
              for (t = e; t.parentNode; ) t = t.parentNode;
              for (
                t = t.querySelectorAll(
                  'input[name=' + JSON.stringify('' + n) + '][type="radio"]',
                ),
                  n = 0;
                n < t.length;
                n++
              ) {
                var r = t[n];
                if (r !== e && r.form === e.form) {
                  var o = It(r);
                  if (!o) throw Error(i(90));
                  xe(r), Ce(r, o);
                }
              }
            }
            break;
          case 'textarea':
            ze(e, t);
            break;
          case 'select':
            null != (n = t.value) && Ne(e, !!t.multiple, n, !1);
        }
      }),
      (z = du),
      (I = pu),
      (R = fu),
      (L = function (e, n) {
        var t = Rl;
        Rl |= 2;
        try {
          return e(n);
        } finally {
          0 === (Rl = t) && Qo();
        }
      });
    var fc = {Events: [Mt, zt, It, T, x, O, M, et, Mu, {current: !1}]},
      dc = {
        findFiberByHostInstance: Ot,
        bundleType: 0,
        version: '16.13.1-experimental-e5d06e34b',
        rendererPackageName: 'react-dom',
      },
      pc = {
        bundleType: dc.bundleType,
        version: dc.version,
        rendererPackageName: dc.rendererPackageName,
        rendererConfig: dc.rendererConfig,
        overrideHookState: null,
        overrideProps: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: K.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return null === (e = tn(e)) ? null : e.stateNode;
        },
        findFiberByHostInstance:
          dc.findFiberByHostInstance ||
          function () {
            return null;
          },
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
      };
    if ('undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      var mc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!mc.isDisabled && mc.supportsFiber)
        try {
          (Fu = mc.inject(pc)), (Uu = mc);
        } catch (e) {}
    }
    (n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fc),
      (n.createBlockingRoot = function (e, n) {
        if (!uc(e)) throw Error(i(299));
        return new ic(e, 1, n);
      }),
      (n.createPortal = sc),
      (n.createRoot = function (e, n) {
        if (!uc(e)) throw Error(i(299));
        return new ac(e, n);
      }),
      (n.findDOMNode = function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var n = e._reactInternals;
        if (void 0 === n) {
          if ('function' == typeof e.render) throw Error(i(188));
          throw Error(i(268, Object.keys(e)));
        }
        return (e = null === (e = tn(n)) ? null : e.stateNode);
      }),
      (n.flushSync = hu),
      (n.hydrate = function (e, n, t) {
        if (!uc(n)) throw Error(i(200));
        return cc(null, e, n, !0, t);
      }),
      (n.render = function (e, n, t) {
        if (!uc(n)) throw Error(i(200));
        return cc(null, e, n, !1, t);
      }),
      (n.unmountComponentAtNode = function (e) {
        if (!uc(e)) throw Error(i(40));
        return (
          !!e._reactRootContainer &&
          (mu(function () {
            cc(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[Nt] = null);
            });
          }),
          !0)
        );
      }),
      (n.unstable_batchedUpdates = du),
      (n.unstable_createPortal = function (e, n) {
        return sc(
          e,
          n,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
        );
      }),
      (n.unstable_discreteUpdates = pu),
      (n.unstable_flushControlled = function (e) {
        var n = Rl;
        Rl |= 1;
        try {
          Vo(99, e);
        } finally {
          0 === (Rl = n) && Qo();
        }
      }),
      (n.unstable_flushDiscreteUpdates = fu),
      (n.unstable_renderSubtreeIntoContainer = function (e, n, t, r) {
        if (!uc(t)) throw Error(i(200));
        if (null == e || void 0 === e._reactInternals) throw Error(i(38));
        return cc(e, n, t, !1, r);
      }),
      (n.unstable_scheduleHydration = function (e) {
        if (e) {
          var n = a.unstable_getCurrentPriorityLevel();
          e = {blockedOn: null, target: e, priority: n};
          for (var t = 0; t < Ln.length && !(n <= Ln[t].priority); t++);
          Ln.splice(t, 0, e), 0 === t && $n(e);
        }
      }),
      (n.version = '16.13.1-experimental-e5d06e34b');
  },
  function (e, n, t) {
    'use strict';
    e.exports = t(16);
  },
  function (e, n, t) {
    'use strict';
    /** @license React v0.0.0-experimental-e5d06e34b
     * scheduler.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r, o, a, i, l;
    if ('undefined' == typeof window || 'function' != typeof MessageChannel) {
      var u = null,
        c = null,
        s = function () {
          if (null !== u)
            try {
              var e = n.unstable_now();
              u(!0, e), (u = null);
            } catch (e) {
              throw (setTimeout(s, 0), e);
            }
        },
        f = Date.now();
      (n.unstable_now = function () {
        return Date.now() - f;
      }),
        (r = function (e) {
          null !== u ? setTimeout(r, 0, e) : ((u = e), setTimeout(s, 0));
        }),
        (o = function (e, n) {
          c = setTimeout(e, n);
        }),
        (a = function () {
          clearTimeout(c);
        }),
        (i = function () {
          return !1;
        }),
        (l = n.unstable_forceFrameRate = function () {});
    } else {
      var d = window.performance,
        p = window.Date,
        m = window.setTimeout,
        h = window.clearTimeout;
      if ('undefined' != typeof console) {
        var g = window.cancelAnimationFrame;
        'function' != typeof window.requestAnimationFrame &&
          console.error(
            "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills",
          ),
          'function' != typeof g &&
            console.error(
              "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills",
            );
      }
      if ('object' == typeof d && 'function' == typeof d.now)
        n.unstable_now = function () {
          return d.now();
        };
      else {
        var v = p.now();
        n.unstable_now = function () {
          return p.now() - v;
        };
      }
      var b = !1,
        y = null,
        w = -1,
        x = 5,
        k = 0;
      (i = function () {
        return n.unstable_now() >= k;
      }),
        (l = function () {}),
        (n.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                'forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported',
              )
            : (x = 0 < e ? Math.floor(1e3 / e) : 5);
        });
      var E = new MessageChannel(),
        T = E.port2;
      (E.port1.onmessage = function () {
        if (null !== y) {
          var e = n.unstable_now();
          k = e + x;
          try {
            y(!0, e) ? T.postMessage(null) : ((b = !1), (y = null));
          } catch (e) {
            throw (T.postMessage(null), e);
          }
        } else b = !1;
      }),
        (r = function (e) {
          (y = e), b || ((b = !0), T.postMessage(null));
        }),
        (o = function (e, t) {
          w = m(function () {
            e(n.unstable_now());
          }, t);
        }),
        (a = function () {
          h(w), (w = -1);
        });
    }
    function C(e, n) {
      var t = e.length;
      e.push(n);
      e: for (;;) {
        var r = (t - 1) >>> 1,
          o = e[r];
        if (!(void 0 !== o && 0 < _(o, n))) break e;
        (e[r] = n), (e[t] = o), (t = r);
      }
    }
    function S(e) {
      return void 0 === (e = e[0]) ? null : e;
    }
    function P(e) {
      var n = e[0];
      if (void 0 !== n) {
        var t = e.pop();
        if (t !== n) {
          e[0] = t;
          e: for (var r = 0, o = e.length; r < o; ) {
            var a = 2 * (r + 1) - 1,
              i = e[a],
              l = a + 1,
              u = e[l];
            if (void 0 !== i && 0 > _(i, t))
              void 0 !== u && 0 > _(u, i)
                ? ((e[r] = u), (e[l] = t), (r = l))
                : ((e[r] = i), (e[a] = t), (r = a));
            else {
              if (!(void 0 !== u && 0 > _(u, t))) break e;
              (e[r] = u), (e[l] = t), (r = l);
            }
          }
        }
        return n;
      }
      return null;
    }
    function _(e, n) {
      var t = e.sortIndex - n.sortIndex;
      return 0 !== t ? t : e.id - n.id;
    }
    var N = [],
      O = [],
      M = 1,
      z = null,
      I = 3,
      R = !1,
      L = !1,
      A = !1;
    function j(e) {
      for (var n = S(O); null !== n; ) {
        if (null === n.callback) P(O);
        else {
          if (!(n.startTime <= e)) break;
          P(O), (n.sortIndex = n.expirationTime), C(N, n);
        }
        n = S(O);
      }
    }
    function D(e) {
      if (((A = !1), j(e), !L))
        if (null !== S(N)) (L = !0), r(F);
        else {
          var n = S(O);
          null !== n && o(D, n.startTime - e);
        }
    }
    function F(e, t) {
      (L = !1), A && ((A = !1), a()), (R = !0);
      var r = I;
      try {
        for (
          j(t), z = S(N);
          null !== z && (!(z.expirationTime > t) || (e && !i()));

        ) {
          var l = z.callback;
          if (null !== l) {
            (z.callback = null), (I = z.priorityLevel);
            var u = l(z.expirationTime <= t);
            (t = n.unstable_now()),
              'function' == typeof u ? (z.callback = u) : z === S(N) && P(N),
              j(t);
          } else P(N);
          z = S(N);
        }
        if (null !== z) var c = !0;
        else {
          var s = S(O);
          null !== s && o(D, s.startTime - t), (c = !1);
        }
        return c;
      } finally {
        (z = null), (I = r), (R = !1);
      }
    }
    function U(e) {
      switch (e) {
        case 1:
          return -1;
        case 2:
          return 250;
        case 5:
          return 1073741823;
        case 4:
          return 1e4;
        default:
          return 5e3;
      }
    }
    var B = l;
    (n.unstable_IdlePriority = 5),
      (n.unstable_ImmediatePriority = 1),
      (n.unstable_LowPriority = 4),
      (n.unstable_NormalPriority = 3),
      (n.unstable_Profiling = null),
      (n.unstable_UserBlockingPriority = 2),
      (n.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (n.unstable_continueExecution = function () {
        L || R || ((L = !0), r(F));
      }),
      (n.unstable_getCurrentPriorityLevel = function () {
        return I;
      }),
      (n.unstable_getFirstCallbackNode = function () {
        return S(N);
      }),
      (n.unstable_next = function (e) {
        switch (I) {
          case 1:
          case 2:
          case 3:
            var n = 3;
            break;
          default:
            n = I;
        }
        var t = I;
        I = n;
        try {
          return e();
        } finally {
          I = t;
        }
      }),
      (n.unstable_pauseExecution = function () {}),
      (n.unstable_requestPaint = B),
      (n.unstable_runWithPriority = function (e, n) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var t = I;
        I = e;
        try {
          return n();
        } finally {
          I = t;
        }
      }),
      (n.unstable_scheduleCallback = function (e, t, i) {
        var l = n.unstable_now();
        if ('object' == typeof i && null !== i) {
          var u = i.delay;
          (u = 'number' == typeof u && 0 < u ? l + u : l),
            (i = 'number' == typeof i.timeout ? i.timeout : U(e));
        } else (i = U(e)), (u = l);
        return (
          (e = {
            id: M++,
            callback: t,
            priorityLevel: e,
            startTime: u,
            expirationTime: (i = u + i),
            sortIndex: -1,
          }),
          u > l
            ? ((e.sortIndex = u),
              C(O, e),
              null === S(N) && e === S(O) && (A ? a() : (A = !0), o(D, u - l)))
            : ((e.sortIndex = i), C(N, e), L || R || ((L = !0), r(F))),
          e
        );
      }),
      (n.unstable_shouldYield = function () {
        var e = n.unstable_now();
        j(e);
        var t = S(N);
        return (
          (t !== z &&
            null !== z &&
            null !== t &&
            null !== t.callback &&
            t.startTime <= e &&
            t.expirationTime < z.expirationTime) ||
          i()
        );
      }),
      (n.unstable_wrapCallback = function (e) {
        var n = I;
        return function () {
          var t = I;
          I = n;
          try {
            return e.apply(this, arguments);
          } finally {
            I = t;
          }
        };
      });
  },
  function (e, n, t) {
    'use strict';
    var r = t(18);
    function o() {}
    function a() {}
    (a.resetWarningCache = o),
      (e.exports = function () {
        function e(e, n, t, o, a, i) {
          if (i !== r) {
            var l = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
            );
            throw ((l.name = 'Invariant Violation'), l);
          }
        }
        function n() {
          return e;
        }
        e.isRequired = e;
        var t = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: n,
          element: e,
          elementType: e,
          instanceOf: n,
          node: e,
          objectOf: n,
          oneOf: n,
          oneOfType: n,
          shape: n,
          exact: n,
          checkPropTypes: a,
          resetWarningCache: o,
        };
        return (t.PropTypes = t), t;
      });
  },
  function (e, n, t) {
    'use strict';
    e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  function (e, n) {
    var t;
    t = (function () {
      return this;
    })();
    try {
      t = t || new Function('return this')();
    } catch (e) {
      'object' == typeof window && (t = window);
    }
    e.exports = t;
  },
  function (e, n) {
    e.exports =
      Array.isArray ||
      function (e) {
        return '[object Array]' == Object.prototype.toString.call(e);
      };
  },
  function (e, n, t) {
    'use strict';
    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = 'function' == typeof Symbol && Symbol.for,
      o = r ? Symbol.for('react.element') : 60103,
      a = r ? Symbol.for('react.portal') : 60106,
      i = r ? Symbol.for('react.fragment') : 60107,
      l = r ? Symbol.for('react.strict_mode') : 60108,
      u = r ? Symbol.for('react.profiler') : 60114,
      c = r ? Symbol.for('react.provider') : 60109,
      s = r ? Symbol.for('react.context') : 60110,
      f = r ? Symbol.for('react.async_mode') : 60111,
      d = r ? Symbol.for('react.concurrent_mode') : 60111,
      p = r ? Symbol.for('react.forward_ref') : 60112,
      m = r ? Symbol.for('react.suspense') : 60113,
      h = r ? Symbol.for('react.suspense_list') : 60120,
      g = r ? Symbol.for('react.memo') : 60115,
      v = r ? Symbol.for('react.lazy') : 60116,
      b = r ? Symbol.for('react.block') : 60121,
      y = r ? Symbol.for('react.fundamental') : 60117,
      w = r ? Symbol.for('react.responder') : 60118,
      x = r ? Symbol.for('react.scope') : 60119;
    function k(e) {
      if ('object' == typeof e && null !== e) {
        var n = e.$$typeof;
        switch (n) {
          case o:
            switch ((e = e.type)) {
              case f:
              case d:
              case i:
              case u:
              case l:
              case m:
                return e;
              default:
                switch ((e = e && e.$$typeof)) {
                  case s:
                  case p:
                  case v:
                  case g:
                  case c:
                    return e;
                  default:
                    return n;
                }
            }
          case a:
            return n;
        }
      }
    }
    function E(e) {
      return k(e) === d;
    }
    (n.AsyncMode = f),
      (n.ConcurrentMode = d),
      (n.ContextConsumer = s),
      (n.ContextProvider = c),
      (n.Element = o),
      (n.ForwardRef = p),
      (n.Fragment = i),
      (n.Lazy = v),
      (n.Memo = g),
      (n.Portal = a),
      (n.Profiler = u),
      (n.StrictMode = l),
      (n.Suspense = m),
      (n.isAsyncMode = function (e) {
        return E(e) || k(e) === f;
      }),
      (n.isConcurrentMode = E),
      (n.isContextConsumer = function (e) {
        return k(e) === s;
      }),
      (n.isContextProvider = function (e) {
        return k(e) === c;
      }),
      (n.isElement = function (e) {
        return 'object' == typeof e && null !== e && e.$$typeof === o;
      }),
      (n.isForwardRef = function (e) {
        return k(e) === p;
      }),
      (n.isFragment = function (e) {
        return k(e) === i;
      }),
      (n.isLazy = function (e) {
        return k(e) === v;
      }),
      (n.isMemo = function (e) {
        return k(e) === g;
      }),
      (n.isPortal = function (e) {
        return k(e) === a;
      }),
      (n.isProfiler = function (e) {
        return k(e) === u;
      }),
      (n.isStrictMode = function (e) {
        return k(e) === l;
      }),
      (n.isSuspense = function (e) {
        return k(e) === m;
      }),
      (n.isValidElementType = function (e) {
        return (
          'string' == typeof e ||
          'function' == typeof e ||
          e === i ||
          e === d ||
          e === u ||
          e === l ||
          e === m ||
          e === h ||
          ('object' == typeof e &&
            null !== e &&
            (e.$$typeof === v ||
              e.$$typeof === g ||
              e.$$typeof === c ||
              e.$$typeof === s ||
              e.$$typeof === p ||
              e.$$typeof === y ||
              e.$$typeof === w ||
              e.$$typeof === x ||
              e.$$typeof === b))
        );
      }),
      (n.typeOf = k);
  },
  function (e, n, t) {
    var r = t(23),
      o = t(24);
    'string' == typeof (o = o.__esModule ? o.default : o) &&
      (o = [[e.i, o, '']]);
    var a = {insert: 'head', singleton: !1};
    r(o, a);
    e.exports = o.locals || {};
  },
  function (e, n, t) {
    'use strict';
    var r,
      o = function () {
        return (
          void 0 === r &&
            (r = Boolean(window && document && document.all && !window.atob)),
          r
        );
      },
      a = (function () {
        var e = {};
        return function (n) {
          if (void 0 === e[n]) {
            var t = document.querySelector(n);
            if (
              window.HTMLIFrameElement &&
              t instanceof window.HTMLIFrameElement
            )
              try {
                t = t.contentDocument.head;
              } catch (e) {
                t = null;
              }
            e[n] = t;
          }
          return e[n];
        };
      })(),
      i = [];
    function l(e) {
      for (var n = -1, t = 0; t < i.length; t++)
        if (i[t].identifier === e) {
          n = t;
          break;
        }
      return n;
    }
    function u(e, n) {
      for (var t = {}, r = [], o = 0; o < e.length; o++) {
        var a = e[o],
          u = n.base ? a[0] + n.base : a[0],
          c = t[u] || 0,
          s = ''.concat(u, ' ').concat(c);
        t[u] = c + 1;
        var f = l(s),
          d = {css: a[1], media: a[2], sourceMap: a[3]};
        -1 !== f
          ? (i[f].references++, i[f].updater(d))
          : i.push({identifier: s, updater: g(d, n), references: 1}),
          r.push(s);
      }
      return r;
    }
    function c(e) {
      var n = document.createElement('style'),
        r = e.attributes || {};
      if (void 0 === r.nonce) {
        var o = t.nc;
        o && (r.nonce = o);
      }
      if (
        (Object.keys(r).forEach(function (e) {
          n.setAttribute(e, r[e]);
        }),
        'function' == typeof e.insert)
      )
        e.insert(n);
      else {
        var i = a(e.insert || 'head');
        if (!i)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
          );
        i.appendChild(n);
      }
      return n;
    }
    var s,
      f =
        ((s = []),
        function (e, n) {
          return (s[e] = n), s.filter(Boolean).join('\n');
        });
    function d(e, n, t, r) {
      var o = t
        ? ''
        : r.media
        ? '@media '.concat(r.media, ' {').concat(r.css, '}')
        : r.css;
      if (e.styleSheet) e.styleSheet.cssText = f(n, o);
      else {
        var a = document.createTextNode(o),
          i = e.childNodes;
        i[n] && e.removeChild(i[n]),
          i.length ? e.insertBefore(a, i[n]) : e.appendChild(a);
      }
    }
    function p(e, n, t) {
      var r = t.css,
        o = t.media,
        a = t.sourceMap;
      if (
        (o ? e.setAttribute('media', o) : e.removeAttribute('media'),
        a &&
          btoa &&
          (r += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
            ' */',
          )),
        e.styleSheet)
      )
        e.styleSheet.cssText = r;
      else {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(r));
      }
    }
    var m = null,
      h = 0;
    function g(e, n) {
      var t, r, o;
      if (n.singleton) {
        var a = h++;
        (t = m || (m = c(n))),
          (r = d.bind(null, t, a, !1)),
          (o = d.bind(null, t, a, !0));
      } else
        (t = c(n)),
          (r = p.bind(null, t, n)),
          (o = function () {
            !(function (e) {
              if (null === e.parentNode) return !1;
              e.parentNode.removeChild(e);
            })(t);
          });
      return (
        r(e),
        function (n) {
          if (n) {
            if (
              n.css === e.css &&
              n.media === e.media &&
              n.sourceMap === e.sourceMap
            )
              return;
            r((e = n));
          } else o();
        }
      );
    }
    e.exports = function (e, n) {
      (n = n || {}).singleton ||
        'boolean' == typeof n.singleton ||
        (n.singleton = o());
      var t = u((e = e || []), n);
      return function (e) {
        if (
          ((e = e || []),
          '[object Array]' === Object.prototype.toString.call(e))
        ) {
          for (var r = 0; r < t.length; r++) {
            var o = l(t[r]);
            i[o].references--;
          }
          for (var a = u(e, n), c = 0; c < t.length; c++) {
            var s = l(t[c]);
            0 === i[s].references && (i[s].updater(), i.splice(s, 1));
          }
          t = a;
        }
      };
    };
  },
  function (e, n, t) {
    (n = t(25)(!1)).push([
      e.i,
      '/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background-color: transparent;\n  background-image: none;\n  padding: 0;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * 1. Use the user\'s configured `sans` font-family (with Tailwind\'s default\n *    sans-serif font stack as a fallback) as a sane default.\n * 2. Use Tailwind\'s default "normal" line-height so the user isn\'t forced\n *    to override it to ensure consistency even when using the default theme.\n */\n\nhtml {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 1 */\n  line-height: 1.5; /* 2 */\n}\n\n/**\n * 1. Prevent padding and border from affecting element width.\n *\n *    We used to set this in the html element and inherit from\n *    the parent element for everything else. This caused issues\n *    in shadow-dom-enhanced elements like <details> where the content\n *    is wrapped by a div with box-sizing set to `content-box`.\n *\n *    https://github.com/mozdevs/cssremedy/issues/4\n *\n *\n * 2. Allow adding a border to an element by just adding a border-width.\n *\n *    By default, the way the browser specifies that an element should have no\n *    border is by setting it\'s border-style to `none` in the user-agent\n *    stylesheet.\n *\n *    In order to easily add borders to elements by just setting the `border-width`\n *    property, we change the default border-style for all elements to `solid`, and\n *    use border-width to hide them instead. This way our `border` utilities only\n *    need to set the `border-width` property instead of the entire `border`\n *    shorthand, making our border utilities much more straightforward to compose.\n *\n *    https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e2e8f0; /* 2 */\n}\n\n/*\n * Ensure horizontal rules are visible by default\n */\n\nhr {\n  border-top-width: 1px;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #a0aec0;\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  color: #a0aec0;\n}\n\ninput::-ms-input-placeholder, textarea::-ms-input-placeholder {\n  color: #a0aec0;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  color: #a0aec0;\n}\n\nbutton,\n[role="button"] {\n  cursor: pointer;\n}\n\ntable {\n  border-collapse: collapse;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/**\n * Reset links to optimize for opt-in styling instead of\n * opt-out.\n */\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/**\n * Reset form element properties that are easy to forget to\n * style explicitly so you don\'t inadvertently introduce\n * styles that deviate from your design system. These styles\n * supplement a partial reset that is already applied by\n * normalize.css.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n\n/**\n * Use the configured \'mono\' font family for elements that\n * are expected to be rendered with a monospace font, falling\n * back to the system monospace stack if there is no configured\n * \'mono\' font family.\n */\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;\n}\n\n/**\n * Make replaced elements `display: block` by default as that\'s\n * the behavior you want almost all of the time. Inspired by\n * CSS Remedy, with `svg` added as well.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  vertical-align: middle;\n}\n\n/**\n * Constrain images and videos to the parent width and preserve\n * their instrinsic aspect ratio.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n.container {\n  width: 100%;\n}\n\n@media (min-width: 640px) {\n  .container {\n    max-width: 640px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    max-width: 768px;\n  }\n}\n\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1024px;\n  }\n}\n\n@media (min-width: 1280px) {\n  .container {\n    max-width: 1280px;\n  }\n}\n\n.appearance-none {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n\n.bg-black {\n  --bg-opacity: 1;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, var(--bg-opacity));\n}\n\n.bg-white {\n  --bg-opacity: 1;\n  background-color: #fff;\n  background-color: rgba(255, 255, 255, var(--bg-opacity));\n}\n\n.bg-gray-100 {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.bg-gray-500 {\n  --bg-opacity: 1;\n  background-color: #a0aec0;\n  background-color: rgba(160, 174, 192, var(--bg-opacity));\n}\n\n.bg-red-200 {\n  --bg-opacity: 1;\n  background-color: #fed7d7;\n  background-color: rgba(254, 215, 215, var(--bg-opacity));\n}\n\n.bg-red-400 {\n  --bg-opacity: 1;\n  background-color: #fc8181;\n  background-color: rgba(252, 129, 129, var(--bg-opacity));\n}\n\n.bg-orange-200 {\n  --bg-opacity: 1;\n  background-color: #feebc8;\n  background-color: rgba(254, 235, 200, var(--bg-opacity));\n}\n\n.bg-orange-400 {\n  --bg-opacity: 1;\n  background-color: #f6ad55;\n  background-color: rgba(246, 173, 85, var(--bg-opacity));\n}\n\n.bg-yellow-200 {\n  --bg-opacity: 1;\n  background-color: #fefcbf;\n  background-color: rgba(254, 252, 191, var(--bg-opacity));\n}\n\n.bg-yellow-400 {\n  --bg-opacity: 1;\n  background-color: #f6e05e;\n  background-color: rgba(246, 224, 94, var(--bg-opacity));\n}\n\n.bg-green-200 {\n  --bg-opacity: 1;\n  background-color: #c6f6d5;\n  background-color: rgba(198, 246, 213, var(--bg-opacity));\n}\n\n.bg-green-400 {\n  --bg-opacity: 1;\n  background-color: #68d391;\n  background-color: rgba(104, 211, 145, var(--bg-opacity));\n}\n\n.bg-blue-200 {\n  --bg-opacity: 1;\n  background-color: #bee3f8;\n  background-color: rgba(190, 227, 248, var(--bg-opacity));\n}\n\n.bg-blue-400 {\n  --bg-opacity: 1;\n  background-color: #63b3ed;\n  background-color: rgba(99, 179, 237, var(--bg-opacity));\n}\n\n.bg-purple-200 {\n  --bg-opacity: 1;\n  background-color: #e9d8fd;\n  background-color: rgba(233, 216, 253, var(--bg-opacity));\n}\n\n.bg-purple-400 {\n  --bg-opacity: 1;\n  background-color: #b794f4;\n  background-color: rgba(183, 148, 244, var(--bg-opacity));\n}\n\n.hover\\:bg-gray-200:hover {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.hover\\:bg-red-300:hover {\n  --bg-opacity: 1;\n  background-color: #feb2b2;\n  background-color: rgba(254, 178, 178, var(--bg-opacity));\n}\n\n.hover\\:bg-orange-300:hover {\n  --bg-opacity: 1;\n  background-color: #fbd38d;\n  background-color: rgba(251, 211, 141, var(--bg-opacity));\n}\n\n.hover\\:bg-yellow-300:hover {\n  --bg-opacity: 1;\n  background-color: #faf089;\n  background-color: rgba(250, 240, 137, var(--bg-opacity));\n}\n\n.hover\\:bg-green-300:hover {\n  --bg-opacity: 1;\n  background-color: #9ae6b4;\n  background-color: rgba(154, 230, 180, var(--bg-opacity));\n}\n\n.hover\\:bg-blue-300:hover {\n  --bg-opacity: 1;\n  background-color: #90cdf4;\n  background-color: rgba(144, 205, 244, var(--bg-opacity));\n}\n\n.hover\\:bg-purple-300:hover {\n  --bg-opacity: 1;\n  background-color: #d6bcfa;\n  background-color: rgba(214, 188, 250, var(--bg-opacity));\n}\n\n.active\\:bg-red-400:active {\n  --bg-opacity: 1;\n  background-color: #fc8181;\n  background-color: rgba(252, 129, 129, var(--bg-opacity));\n}\n\n.active\\:bg-orange-400:active {\n  --bg-opacity: 1;\n  background-color: #f6ad55;\n  background-color: rgba(246, 173, 85, var(--bg-opacity));\n}\n\n.active\\:bg-yellow-400:active {\n  --bg-opacity: 1;\n  background-color: #f6e05e;\n  background-color: rgba(246, 224, 94, var(--bg-opacity));\n}\n\n.active\\:bg-green-400:active {\n  --bg-opacity: 1;\n  background-color: #68d391;\n  background-color: rgba(104, 211, 145, var(--bg-opacity));\n}\n\n.active\\:bg-blue-400:active {\n  --bg-opacity: 1;\n  background-color: #63b3ed;\n  background-color: rgba(99, 179, 237, var(--bg-opacity));\n}\n\n.active\\:bg-purple-400:active {\n  --bg-opacity: 1;\n  background-color: #b794f4;\n  background-color: rgba(183, 148, 244, var(--bg-opacity));\n}\n\n.border-gray-400 {\n  --border-opacity: 1;\n  border-color: #cbd5e0;\n  border-color: rgba(203, 213, 224, var(--border-opacity));\n}\n\n.border-red-800 {\n  --border-opacity: 1;\n  border-color: #9b2c2c;\n  border-color: rgba(155, 44, 44, var(--border-opacity));\n}\n\n.border-red-900 {\n  --border-opacity: 1;\n  border-color: #742a2a;\n  border-color: rgba(116, 42, 42, var(--border-opacity));\n}\n\n.border-orange-900 {\n  --border-opacity: 1;\n  border-color: #7b341e;\n  border-color: rgba(123, 52, 30, var(--border-opacity));\n}\n\n.border-yellow-900 {\n  --border-opacity: 1;\n  border-color: #744210;\n  border-color: rgba(116, 66, 16, var(--border-opacity));\n}\n\n.border-green-900 {\n  --border-opacity: 1;\n  border-color: #22543d;\n  border-color: rgba(34, 84, 61, var(--border-opacity));\n}\n\n.border-blue-900 {\n  --border-opacity: 1;\n  border-color: #2a4365;\n  border-color: rgba(42, 67, 101, var(--border-opacity));\n}\n\n.border-purple-900 {\n  --border-opacity: 1;\n  border-color: #44337a;\n  border-color: rgba(68, 51, 122, var(--border-opacity));\n}\n\n.hover\\:border-gray-500:hover {\n  --border-opacity: 1;\n  border-color: #a0aec0;\n  border-color: rgba(160, 174, 192, var(--border-opacity));\n}\n\n.hover\\:border-red-900:hover {\n  --border-opacity: 1;\n  border-color: #742a2a;\n  border-color: rgba(116, 42, 42, var(--border-opacity));\n}\n\n.hover\\:border-orange-900:hover {\n  --border-opacity: 1;\n  border-color: #7b341e;\n  border-color: rgba(123, 52, 30, var(--border-opacity));\n}\n\n.hover\\:border-yellow-900:hover {\n  --border-opacity: 1;\n  border-color: #744210;\n  border-color: rgba(116, 66, 16, var(--border-opacity));\n}\n\n.hover\\:border-green-900:hover {\n  --border-opacity: 1;\n  border-color: #22543d;\n  border-color: rgba(34, 84, 61, var(--border-opacity));\n}\n\n.hover\\:border-blue-900:hover {\n  --border-opacity: 1;\n  border-color: #2a4365;\n  border-color: rgba(42, 67, 101, var(--border-opacity));\n}\n\n.hover\\:border-purple-900:hover {\n  --border-opacity: 1;\n  border-color: #44337a;\n  border-color: rgba(68, 51, 122, var(--border-opacity));\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.block {\n  display: block;\n}\n\n.inline-block {\n  display: inline-block;\n}\n\n.inline {\n  display: inline;\n}\n\n.flex {\n  display: flex;\n}\n\n.inline-flex {\n  display: inline-flex;\n}\n\n.table {\n  display: table;\n}\n\n.table-row {\n  display: table-row;\n}\n\n.hidden {\n  display: none;\n}\n\n.flex-row {\n  flex-direction: row;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.flex-no-wrap {\n  flex-wrap: nowrap;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.content-center {\n  align-content: center;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.flex-auto {\n  flex: 1 1 auto;\n}\n\n.flex-grow {\n  flex-grow: 1;\n}\n\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n\n.clearfix:after {\n  content: "";\n  display: table;\n  clear: both;\n}\n\n.font-serif {\n  font-family: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;\n}\n\n.font-hairline {\n  font-weight: 100;\n}\n\n.h-4 {\n  height: 1rem;\n}\n\n.h-16 {\n  height: 4rem;\n}\n\n.h-20 {\n  height: 5rem;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n}\n\n.text-base {\n  font-size: 1rem;\n}\n\n.text-4xl {\n  font-size: 2.25rem;\n}\n\n.text-6xl {\n  font-size: 4rem;\n}\n\n.leading-none {\n  line-height: 1;\n}\n\n.leading-tight {\n  line-height: 1.25;\n}\n\n.leading-loose {\n  line-height: 2;\n}\n\n.m-2 {\n  margin: 0.5rem;\n}\n\n.mx-2 {\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n\n.max-w-0 {\n  max-width: 0;\n}\n\n.max-w-64 {\n  max-width: 16rem;\n}\n\n.min-h-screen {\n  min-height: 100vh;\n}\n\n.min-w-20 {\n  min-width: 5rem;\n}\n\n.opacity-0 {\n  opacity: 0;\n}\n\n.opacity-25 {\n  opacity: 0.25;\n}\n\n.hover\\:opacity-25:hover {\n  opacity: 0.25;\n}\n\n.focus\\:outline-none:focus {\n  outline: 0;\n}\n\n.overflow-auto {\n  overflow: auto;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.pt-1 {\n  padding-top: 0.25rem;\n}\n\n.pt-2 {\n  padding-top: 0.5rem;\n}\n\n.pr-4 {\n  padding-right: 1rem;\n}\n\n.pb-4 {\n  padding-bottom: 1rem;\n}\n\n.pr-6 {\n  padding-right: 1.5rem;\n}\n\n.pt-8 {\n  padding-top: 2rem;\n}\n\n.pr-8 {\n  padding-right: 2rem;\n}\n\n.pointer-events-none {\n  pointer-events: none;\n}\n\n.static {\n  position: static;\n}\n\n.fixed {\n  position: fixed;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.sticky {\n  position: -webkit-sticky;\n  position: sticky;\n}\n\n.inset-y-0 {\n  top: 0;\n  bottom: 0;\n}\n\n.top-0 {\n  top: 0;\n}\n\n.right-0 {\n  right: 0;\n}\n\n.bottom-0 {\n  bottom: 0;\n}\n\n.left-0 {\n  left: 0;\n}\n\n.shadow {\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n}\n\n.shadow-lg {\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n}\n\n.focus\\:shadow-outline:focus {\n  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);\n}\n\n.fill-current {\n  fill: currentColor;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.text-black {\n  --text-opacity: 1;\n  color: #000;\n  color: rgba(0, 0, 0, var(--text-opacity));\n}\n\n.text-gray-700 {\n  --text-opacity: 1;\n  color: #4a5568;\n  color: rgba(74, 85, 104, var(--text-opacity));\n}\n\n.text-red-800 {\n  --text-opacity: 1;\n  color: #9b2c2c;\n  color: rgba(155, 44, 44, var(--text-opacity));\n}\n\n.text-red-900 {\n  --text-opacity: 1;\n  color: #742a2a;\n  color: rgba(116, 42, 42, var(--text-opacity));\n}\n\n.text-orange-900 {\n  --text-opacity: 1;\n  color: #7b341e;\n  color: rgba(123, 52, 30, var(--text-opacity));\n}\n\n.text-yellow-900 {\n  --text-opacity: 1;\n  color: #744210;\n  color: rgba(116, 66, 16, var(--text-opacity));\n}\n\n.text-green-900 {\n  --text-opacity: 1;\n  color: #22543d;\n  color: rgba(34, 84, 61, var(--text-opacity));\n}\n\n.text-blue-900 {\n  --text-opacity: 1;\n  color: #2a4365;\n  color: rgba(42, 67, 101, var(--text-opacity));\n}\n\n.text-purple-900 {\n  --text-opacity: 1;\n  color: #44337a;\n  color: rgba(68, 51, 122, var(--text-opacity));\n}\n\n.hover\\:text-red-900:hover {\n  --text-opacity: 1;\n  color: #742a2a;\n  color: rgba(116, 42, 42, var(--text-opacity));\n}\n\n.hover\\:text-orange-900:hover {\n  --text-opacity: 1;\n  color: #7b341e;\n  color: rgba(123, 52, 30, var(--text-opacity));\n}\n\n.hover\\:text-yellow-900:hover {\n  --text-opacity: 1;\n  color: #744210;\n  color: rgba(116, 66, 16, var(--text-opacity));\n}\n\n.hover\\:text-green-900:hover {\n  --text-opacity: 1;\n  color: #22543d;\n  color: rgba(34, 84, 61, var(--text-opacity));\n}\n\n.hover\\:text-blue-900:hover {\n  --text-opacity: 1;\n  color: #2a4365;\n  color: rgba(42, 67, 101, var(--text-opacity));\n}\n\n.hover\\:text-purple-900:hover {\n  --text-opacity: 1;\n  color: #44337a;\n  color: rgba(68, 51, 122, var(--text-opacity));\n}\n\n.italic {\n  font-style: italic;\n}\n\n.uppercase {\n  text-transform: uppercase;\n}\n\n.lowercase {\n  text-transform: lowercase;\n}\n\n.underline {\n  text-decoration: underline;\n}\n\n.select-none {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.align-middle {\n  vertical-align: middle;\n}\n\n.visible {\n  visibility: visible;\n}\n\n.whitespace-no-wrap {\n  white-space: nowrap;\n}\n\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.w-4 {\n  width: 1rem;\n}\n\n.w-16 {\n  width: 4rem;\n}\n\n.w-20 {\n  width: 5rem;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.transform {\n  --transform-translate-x: 0;\n  --transform-translate-y: 0;\n  --transform-rotate: 0;\n  --transform-skew-x: 0;\n  --transform-skew-y: 0;\n  --transform-scale-x: 1;\n  --transform-scale-y: 1;\n  transform: translateX(var(--transform-translate-x)) translateY(var(--transform-translate-y)) rotate(var(--transform-rotate)) skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y)) scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));\n}\n\n.hover\\:scale-125:hover {\n  --transform-scale-x: 1.25;\n  --transform-scale-y: 1.25;\n}\n\n.active\\:scale-110:active {\n  --transform-scale-x: 1.1;\n  --transform-scale-y: 1.1;\n}\n\n.duration-75 {\n  transition-duration: 75ms;\n}\n\n.duration-200 {\n  transition-duration: 200ms;\n}\n\n.duration-300 {\n  transition-duration: 300ms;\n}\n\n@media (min-width: 640px) {\n\n  .sm\\:flex {\n    display: flex;\n  }\n\n  .sm\\:flex-row {\n    flex-direction: row;\n  }\n\n  .sm\\:flex-col-reverse {\n    flex-direction: column-reverse;\n  }\n\n  .sm\\:h-20 {\n    height: 5rem;\n  }\n\n  .sm\\:h-40 {\n    height: 10rem;\n  }\n\n  .sm\\:m-4 {\n    margin: 1rem;\n  }\n\n  .sm\\:px-32 {\n    padding-left: 8rem;\n    padding-right: 8rem;\n  }\n\n  .sm\\:w-20 {\n    width: 5rem;\n  }\n\n  .sm\\:w-40 {\n    width: 10rem;\n  }\n}\n',
      '',
    ]),
      (e.exports = n);
  },
  function (e, n, t) {
    'use strict';
    e.exports = function (e) {
      var n = [];
      return (
        (n.toString = function () {
          return this.map(function (n) {
            var t = (function (e, n) {
              var t = e[1] || '',
                r = e[3];
              if (!r) return t;
              if (n && 'function' == typeof btoa) {
                var o =
                    ((i = r),
                    (l = btoa(unescape(encodeURIComponent(JSON.stringify(i))))),
                    (u = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
                      l,
                    )),
                    '/*# '.concat(u, ' */')),
                  a = r.sources.map(function (e) {
                    return '/*# sourceURL='
                      .concat(r.sourceRoot || '')
                      .concat(e, ' */');
                  });
                return [t].concat(a).concat([o]).join('\n');
              }
              var i, l, u;
              return [t].join('\n');
            })(n, e);
            return n[2] ? '@media '.concat(n[2], ' {').concat(t, '}') : t;
          }).join('');
        }),
        (n.i = function (e, t, r) {
          'string' == typeof e && (e = [[null, e, '']]);
          var o = {};
          if (r)
            for (var a = 0; a < this.length; a++) {
              var i = this[a][0];
              null != i && (o[i] = !0);
            }
          for (var l = 0; l < e.length; l++) {
            var u = [].concat(e[l]);
            (r && o[u[0]]) ||
              (t &&
                (u[2]
                  ? (u[2] = ''.concat(t, ' and ').concat(u[2]))
                  : (u[2] = t)),
              n.push(u));
          }
        }),
        n
      );
    };
  },
  ,
  function (e, n, t) {
    'use strict';
    t.r(n);
    var r = t(3),
      o = t(0),
      a = t.n(o);
    t(5);
    function i() {
      return (i =
        Object.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function l(e) {
      return '/' === e.charAt(0);
    }
    function u(e, n) {
      for (var t = n, r = t + 1, o = e.length; r < o; t += 1, r += 1)
        e[t] = e[r];
      e.pop();
    }
    var c = function (e, n) {
      void 0 === n && (n = '');
      var t,
        r = (e && e.split('/')) || [],
        o = (n && n.split('/')) || [],
        a = e && l(e),
        i = n && l(n),
        c = a || i;
      if (
        (e && l(e) ? (o = r) : r.length && (o.pop(), (o = o.concat(r))),
        !o.length)
      )
        return '/';
      if (o.length) {
        var s = o[o.length - 1];
        t = '.' === s || '..' === s || '' === s;
      } else t = !1;
      for (var f = 0, d = o.length; d >= 0; d--) {
        var p = o[d];
        '.' === p ? u(o, d) : '..' === p ? (u(o, d), f++) : f && (u(o, d), f--);
      }
      if (!c) for (; f--; f) o.unshift('..');
      !c || '' === o[0] || (o[0] && l(o[0])) || o.unshift('');
      var m = o.join('/');
      return t && '/' !== m.substr(-1) && (m += '/'), m;
    };
    var s = function (e, n) {
      if (!e) throw new Error('Invariant failed');
    };
    function f(e) {
      return '/' === e.charAt(0) ? e : '/' + e;
    }
    function d(e) {
      return '/' === e.charAt(0) ? e.substr(1) : e;
    }
    function p(e, n) {
      return (function (e, n) {
        return (
          0 === e.toLowerCase().indexOf(n.toLowerCase()) &&
          -1 !== '/?#'.indexOf(e.charAt(n.length))
        );
      })(e, n)
        ? e.substr(n.length)
        : e;
    }
    function m(e) {
      return '/' === e.charAt(e.length - 1) ? e.slice(0, -1) : e;
    }
    function h(e) {
      var n = e.pathname,
        t = e.search,
        r = e.hash,
        o = n || '/';
      return (
        t && '?' !== t && (o += '?' === t.charAt(0) ? t : '?' + t),
        r && '#' !== r && (o += '#' === r.charAt(0) ? r : '#' + r),
        o
      );
    }
    function g(e, n, t, r) {
      var o;
      'string' == typeof e
        ? ((o = (function (e) {
            var n = e || '/',
              t = '',
              r = '',
              o = n.indexOf('#');
            -1 !== o && ((r = n.substr(o)), (n = n.substr(0, o)));
            var a = n.indexOf('?');
            return (
              -1 !== a && ((t = n.substr(a)), (n = n.substr(0, a))),
              {
                pathname: n,
                search: '?' === t ? '' : t,
                hash: '#' === r ? '' : r,
              }
            );
          })(e)).state = n)
        : (void 0 === (o = i({}, e)).pathname && (o.pathname = ''),
          o.search
            ? '?' !== o.search.charAt(0) && (o.search = '?' + o.search)
            : (o.search = ''),
          o.hash
            ? '#' !== o.hash.charAt(0) && (o.hash = '#' + o.hash)
            : (o.hash = ''),
          void 0 !== n && void 0 === o.state && (o.state = n));
      try {
        o.pathname = decodeURI(o.pathname);
      } catch (e) {
        throw e instanceof URIError
          ? new URIError(
              'Pathname "' +
                o.pathname +
                '" could not be decoded. This is likely caused by an invalid percent-encoding.',
            )
          : e;
      }
      return (
        t && (o.key = t),
        r
          ? o.pathname
            ? '/' !== o.pathname.charAt(0) &&
              (o.pathname = c(o.pathname, r.pathname))
            : (o.pathname = r.pathname)
          : o.pathname || (o.pathname = '/'),
        o
      );
    }
    function v() {
      var e = null;
      var n = [];
      return {
        setPrompt: function (n) {
          return (
            (e = n),
            function () {
              e === n && (e = null);
            }
          );
        },
        confirmTransitionTo: function (n, t, r, o) {
          if (null != e) {
            var a = 'function' == typeof e ? e(n, t) : e;
            'string' == typeof a
              ? 'function' == typeof r
                ? r(a, o)
                : o(!0)
              : o(!1 !== a);
          } else o(!0);
        },
        appendListener: function (e) {
          var t = !0;
          function r() {
            t && e.apply(void 0, arguments);
          }
          return (
            n.push(r),
            function () {
              (t = !1),
                (n = n.filter(function (e) {
                  return e !== r;
                }));
            }
          );
        },
        notifyListeners: function () {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r];
          n.forEach(function (e) {
            return e.apply(void 0, t);
          });
        },
      };
    }
    var b = !(
      'undefined' == typeof window ||
      !window.document ||
      !window.document.createElement
    );
    function y(e, n) {
      n(window.confirm(e));
    }
    function w() {
      try {
        return window.history.state || {};
      } catch (e) {
        return {};
      }
    }
    function x(e) {
      void 0 === e && (e = {}), b || s(!1);
      var n,
        t = window.history,
        r =
          ((-1 === (n = window.navigator.userAgent).indexOf('Android 2.') &&
            -1 === n.indexOf('Android 4.0')) ||
            -1 === n.indexOf('Mobile Safari') ||
            -1 !== n.indexOf('Chrome') ||
            -1 !== n.indexOf('Windows Phone')) &&
          window.history &&
          'pushState' in window.history,
        o = !(-1 === window.navigator.userAgent.indexOf('Trident')),
        a = e,
        l = a.forceRefresh,
        u = void 0 !== l && l,
        c = a.getUserConfirmation,
        d = void 0 === c ? y : c,
        x = a.keyLength,
        k = void 0 === x ? 6 : x,
        E = e.basename ? m(f(e.basename)) : '';
      function T(e) {
        var n = e || {},
          t = n.key,
          r = n.state,
          o = window.location,
          a = o.pathname + o.search + o.hash;
        return E && (a = p(a, E)), g(a, r, t);
      }
      function C() {
        return Math.random().toString(36).substr(2, k);
      }
      var S = v();
      function P(e) {
        i(F, e), (F.length = t.length), S.notifyListeners(F.location, F.action);
      }
      function _(e) {
        (function (e) {
          return (
            void 0 === e.state && -1 === navigator.userAgent.indexOf('CriOS')
          );
        })(e) || M(T(e.state));
      }
      function N() {
        M(T(w()));
      }
      var O = !1;
      function M(e) {
        if (O) (O = !1), P();
        else {
          S.confirmTransitionTo(e, 'POP', d, function (n) {
            n
              ? P({action: 'POP', location: e})
              : (function (e) {
                  var n = F.location,
                    t = I.indexOf(n.key);
                  -1 === t && (t = 0);
                  var r = I.indexOf(e.key);
                  -1 === r && (r = 0);
                  var o = t - r;
                  o && ((O = !0), L(o));
                })(e);
          });
        }
      }
      var z = T(w()),
        I = [z.key];
      function R(e) {
        return E + h(e);
      }
      function L(e) {
        t.go(e);
      }
      var A = 0;
      function j(e) {
        1 === (A += e) && 1 === e
          ? (window.addEventListener('popstate', _),
            o && window.addEventListener('hashchange', N))
          : 0 === A &&
            (window.removeEventListener('popstate', _),
            o && window.removeEventListener('hashchange', N));
      }
      var D = !1;
      var F = {
        length: t.length,
        action: 'POP',
        location: z,
        createHref: R,
        push: function (e, n) {
          var o = g(e, n, C(), F.location);
          S.confirmTransitionTo(o, 'PUSH', d, function (e) {
            if (e) {
              var n = R(o),
                a = o.key,
                i = o.state;
              if (r)
                if ((t.pushState({key: a, state: i}, null, n), u))
                  window.location.href = n;
                else {
                  var l = I.indexOf(F.location.key),
                    c = I.slice(0, l + 1);
                  c.push(o.key), (I = c), P({action: 'PUSH', location: o});
                }
              else window.location.href = n;
            }
          });
        },
        replace: function (e, n) {
          var o = g(e, n, C(), F.location);
          S.confirmTransitionTo(o, 'REPLACE', d, function (e) {
            if (e) {
              var n = R(o),
                a = o.key,
                i = o.state;
              if (r)
                if ((t.replaceState({key: a, state: i}, null, n), u))
                  window.location.replace(n);
                else {
                  var l = I.indexOf(F.location.key);
                  -1 !== l && (I[l] = o.key),
                    P({action: 'REPLACE', location: o});
                }
              else window.location.replace(n);
            }
          });
        },
        go: L,
        goBack: function () {
          L(-1);
        },
        goForward: function () {
          L(1);
        },
        block: function (e) {
          void 0 === e && (e = !1);
          var n = S.setPrompt(e);
          return (
            D || (j(1), (D = !0)),
            function () {
              return D && ((D = !1), j(-1)), n();
            }
          );
        },
        listen: function (e) {
          var n = S.appendListener(e);
          return (
            j(1),
            function () {
              j(-1), n();
            }
          );
        },
      };
      return F;
    }
    var k = {
      hashbang: {
        encodePath: function (e) {
          return '!' === e.charAt(0) ? e : '!/' + d(e);
        },
        decodePath: function (e) {
          return '!' === e.charAt(0) ? e.substr(1) : e;
        },
      },
      noslash: {encodePath: d, decodePath: f},
      slash: {encodePath: f, decodePath: f},
    };
    function E(e) {
      var n = e.indexOf('#');
      return -1 === n ? e : e.slice(0, n);
    }
    function T() {
      var e = window.location.href,
        n = e.indexOf('#');
      return -1 === n ? '' : e.substring(n + 1);
    }
    function C(e) {
      window.location.replace(E(window.location.href) + '#' + e);
    }
    function S(e) {
      void 0 === e && (e = {}), b || s(!1);
      var n = window.history,
        t = (window.navigator.userAgent.indexOf('Firefox'), e),
        r = t.getUserConfirmation,
        o = void 0 === r ? y : r,
        a = t.hashType,
        l = void 0 === a ? 'slash' : a,
        u = e.basename ? m(f(e.basename)) : '',
        c = k[l],
        d = c.encodePath,
        w = c.decodePath;
      function x() {
        var e = w(T());
        return u && (e = p(e, u)), g(e);
      }
      var S = v();
      function P(e) {
        i(F, e), (F.length = n.length), S.notifyListeners(F.location, F.action);
      }
      var _ = !1,
        N = null;
      function O() {
        var e,
          n,
          t = T(),
          r = d(t);
        if (t !== r) C(r);
        else {
          var a = x(),
            i = F.location;
          if (
            !_ &&
            ((n = a),
            (e = i).pathname === n.pathname &&
              e.search === n.search &&
              e.hash === n.hash)
          )
            return;
          if (N === h(a)) return;
          (N = null),
            (function (e) {
              if (_) (_ = !1), P();
              else {
                S.confirmTransitionTo(e, 'POP', o, function (n) {
                  n
                    ? P({action: 'POP', location: e})
                    : (function (e) {
                        var n = F.location,
                          t = R.lastIndexOf(h(n));
                        -1 === t && (t = 0);
                        var r = R.lastIndexOf(h(e));
                        -1 === r && (r = 0);
                        var o = t - r;
                        o && ((_ = !0), L(o));
                      })(e);
                });
              }
            })(a);
        }
      }
      var M = T(),
        z = d(M);
      M !== z && C(z);
      var I = x(),
        R = [h(I)];
      function L(e) {
        n.go(e);
      }
      var A = 0;
      function j(e) {
        1 === (A += e) && 1 === e
          ? window.addEventListener('hashchange', O)
          : 0 === A && window.removeEventListener('hashchange', O);
      }
      var D = !1;
      var F = {
        length: n.length,
        action: 'POP',
        location: I,
        createHref: function (e) {
          var n = document.querySelector('base'),
            t = '';
          return (
            n && n.getAttribute('href') && (t = E(window.location.href)),
            t + '#' + d(u + h(e))
          );
        },
        push: function (e, n) {
          var t = g(e, void 0, void 0, F.location);
          S.confirmTransitionTo(t, 'PUSH', o, function (e) {
            if (e) {
              var n = h(t),
                r = d(u + n);
              if (T() !== r) {
                (N = n),
                  (function (e) {
                    window.location.hash = e;
                  })(r);
                var o = R.lastIndexOf(h(F.location)),
                  a = R.slice(0, o + 1);
                a.push(n), (R = a), P({action: 'PUSH', location: t});
              } else P();
            }
          });
        },
        replace: function (e, n) {
          var t = g(e, void 0, void 0, F.location);
          S.confirmTransitionTo(t, 'REPLACE', o, function (e) {
            if (e) {
              var n = h(t),
                r = d(u + n);
              T() !== r && ((N = n), C(r));
              var o = R.indexOf(h(F.location));
              -1 !== o && (R[o] = n), P({action: 'REPLACE', location: t});
            }
          });
        },
        go: L,
        goBack: function () {
          L(-1);
        },
        goForward: function () {
          L(1);
        },
        block: function (e) {
          void 0 === e && (e = !1);
          var n = S.setPrompt(e);
          return (
            D || (j(1), (D = !0)),
            function () {
              return D && ((D = !1), j(-1)), n();
            }
          );
        },
        listen: function (e) {
          var n = S.appendListener(e);
          return (
            j(1),
            function () {
              j(-1), n();
            }
          );
        },
      };
      return F;
    }
    function P(e, n, t) {
      return Math.min(Math.max(e, n), t);
    }
    function _(e) {
      void 0 === e && (e = {});
      var n = e,
        t = n.getUserConfirmation,
        r = n.initialEntries,
        o = void 0 === r ? ['/'] : r,
        a = n.initialIndex,
        l = void 0 === a ? 0 : a,
        u = n.keyLength,
        c = void 0 === u ? 6 : u,
        s = v();
      function f(e) {
        i(w, e),
          (w.length = w.entries.length),
          s.notifyListeners(w.location, w.action);
      }
      function d() {
        return Math.random().toString(36).substr(2, c);
      }
      var p = P(l, 0, o.length - 1),
        m = o.map(function (e) {
          return g(e, void 0, 'string' == typeof e ? d() : e.key || d());
        }),
        b = h;
      function y(e) {
        var n = P(w.index + e, 0, w.entries.length - 1),
          r = w.entries[n];
        s.confirmTransitionTo(r, 'POP', t, function (e) {
          e ? f({action: 'POP', location: r, index: n}) : f();
        });
      }
      var w = {
        length: m.length,
        action: 'POP',
        location: m[p],
        index: p,
        entries: m,
        createHref: b,
        push: function (e, n) {
          var r = g(e, n, d(), w.location);
          s.confirmTransitionTo(r, 'PUSH', t, function (e) {
            if (e) {
              var n = w.index + 1,
                t = w.entries.slice(0);
              t.length > n ? t.splice(n, t.length - n, r) : t.push(r),
                f({action: 'PUSH', location: r, index: n, entries: t});
            }
          });
        },
        replace: function (e, n) {
          var r = g(e, n, d(), w.location);
          s.confirmTransitionTo(r, 'REPLACE', t, function (e) {
            e &&
              ((w.entries[w.index] = r), f({action: 'REPLACE', location: r}));
          });
        },
        go: y,
        goBack: function () {
          y(-1);
        },
        goForward: function () {
          y(1);
        },
        canGo: function (e) {
          var n = w.index + e;
          return n >= 0 && n < w.entries.length;
        },
        block: function (e) {
          return void 0 === e && (e = !1), s.setPrompt(e);
        },
        listen: function (e) {
          return s.appendListener(e);
        },
      };
      return w;
    }
    var N = t(7),
      O = t(8),
      M = t.n(O);
    t(10);
    function z(e, n) {
      if (null == e) return {};
      var t,
        r,
        o = {},
        a = Object.keys(e);
      for (r = 0; r < a.length; r++)
        (t = a[r]), n.indexOf(t) >= 0 || (o[t] = e[t]);
      return o;
    }
    t(12);
    var I = (function (e) {
        var n = Object(N.a)();
        return (n.displayName = e), n;
      })('Router-History'),
      R = (function (e) {
        var n = Object(N.a)();
        return (n.displayName = e), n;
      })('Router'),
      L = (function (e) {
        function n(n) {
          var t;
          return (
            ((t = e.call(this, n) || this).state = {
              location: n.history.location,
            }),
            (t._isMounted = !1),
            (t._pendingLocation = null),
            n.staticContext ||
              (t.unlisten = n.history.listen(function (e) {
                t._isMounted
                  ? t.setState({location: e})
                  : (t._pendingLocation = e);
              })),
            t
          );
        }
        Object(r.a)(n, e),
          (n.computeRootMatch = function (e) {
            return {path: '/', url: '/', params: {}, isExact: '/' === e};
          });
        var t = n.prototype;
        return (
          (t.componentDidMount = function () {
            (this._isMounted = !0),
              this._pendingLocation &&
                this.setState({location: this._pendingLocation});
          }),
          (t.componentWillUnmount = function () {
            this.unlisten && this.unlisten();
          }),
          (t.render = function () {
            return a.a.createElement(
              R.Provider,
              {
                value: {
                  history: this.props.history,
                  location: this.state.location,
                  match: n.computeRootMatch(this.state.location.pathname),
                  staticContext: this.props.staticContext,
                },
              },
              a.a.createElement(I.Provider, {
                children: this.props.children || null,
                value: this.props.history,
              }),
            );
          }),
          n
        );
      })(a.a.Component);
    a.a.Component;
    a.a.Component;
    var A = {},
      j = 0;
    function D(e, n) {
      void 0 === n && (n = {}),
        ('string' == typeof n || Array.isArray(n)) && (n = {path: n});
      var t = n,
        r = t.path,
        o = t.exact,
        a = void 0 !== o && o,
        i = t.strict,
        l = void 0 !== i && i,
        u = t.sensitive,
        c = void 0 !== u && u;
      return [].concat(r).reduce(function (n, t) {
        if (!t && '' !== t) return null;
        if (n) return n;
        var r = (function (e, n) {
            var t = '' + n.end + n.strict + n.sensitive,
              r = A[t] || (A[t] = {});
            if (r[e]) return r[e];
            var o = [],
              a = {regexp: M()(e, o, n), keys: o};
            return j < 1e4 && ((r[e] = a), j++), a;
          })(t, {end: a, strict: l, sensitive: c}),
          o = r.regexp,
          i = r.keys,
          u = o.exec(e);
        if (!u) return null;
        var s = u[0],
          f = u.slice(1),
          d = e === s;
        return a && !d
          ? null
          : {
              path: t,
              url: '/' === t && '' === s ? '/' : s,
              isExact: d,
              params: i.reduce(function (e, n, t) {
                return (e[n.name] = f[t]), e;
              }, {}),
            };
      }, null);
    }
    var F = (function (e) {
      function n() {
        return e.apply(this, arguments) || this;
      }
      return (
        Object(r.a)(n, e),
        (n.prototype.render = function () {
          var e = this;
          return a.a.createElement(R.Consumer, null, function (n) {
            n || s(!1);
            var t = e.props.location || n.location,
              r = i({}, n, {
                location: t,
                match: e.props.computedMatch
                  ? e.props.computedMatch
                  : e.props.path
                  ? D(t.pathname, e.props)
                  : n.match,
              }),
              o = e.props,
              l = o.children,
              u = o.component,
              c = o.render;
            return (
              Array.isArray(l) && 0 === l.length && (l = null),
              a.a.createElement(
                R.Provider,
                {value: r},
                r.match
                  ? l
                    ? 'function' == typeof l
                      ? l(r)
                      : l
                    : u
                    ? a.a.createElement(u, r)
                    : c
                    ? c(r)
                    : null
                  : 'function' == typeof l
                  ? l(r)
                  : null,
              )
            );
          });
        }),
        n
      );
    })(a.a.Component);
    function U(e) {
      return '/' === e.charAt(0) ? e : '/' + e;
    }
    function B(e, n) {
      if (!e) return n;
      var t = U(e);
      return 0 !== n.pathname.indexOf(t)
        ? n
        : i({}, n, {pathname: n.pathname.substr(t.length)});
    }
    function $(e) {
      return 'string' == typeof e ? e : h(e);
    }
    function V(e) {
      return function () {
        s(!1);
      };
    }
    function W() {}
    a.a.Component;
    var H = (function (e) {
      function n() {
        return e.apply(this, arguments) || this;
      }
      return (
        Object(r.a)(n, e),
        (n.prototype.render = function () {
          var e = this;
          return a.a.createElement(R.Consumer, null, function (n) {
            n || s(!1);
            var t,
              r,
              o = e.props.location || n.location;
            return (
              a.a.Children.forEach(e.props.children, function (e) {
                if (null == r && a.a.isValidElement(e)) {
                  t = e;
                  var l = e.props.path || e.props.from;
                  r = l ? D(o.pathname, i({}, e.props, {path: l})) : n.match;
                }
              }),
              r ? a.a.cloneElement(t, {location: o, computedMatch: r}) : null
            );
          });
        }),
        n
      );
    })(a.a.Component);
    var Q = a.a.useContext;
    function q(e) {
      var n = Q(R).location,
        t = Q(R).match;
      return e ? D(n.pathname, e) : t;
    }
    var K = (function (e) {
      function n() {
        for (var n, t = arguments.length, r = new Array(t), o = 0; o < t; o++)
          r[o] = arguments[o];
        return (
          ((n = e.call.apply(e, [this].concat(r)) || this).history = x(
            n.props,
          )),
          n
        );
      }
      return (
        Object(r.a)(n, e),
        (n.prototype.render = function () {
          return a.a.createElement(L, {
            history: this.history,
            children: this.props.children,
          });
        }),
        n
      );
    })(a.a.Component);
    a.a.Component;
    var Y = function (e, n) {
        return 'function' == typeof e ? e(n) : e;
      },
      X = function (e, n) {
        return 'string' == typeof e ? g(e, null, null, n) : e;
      },
      G = function (e) {
        return e;
      },
      J = a.a.forwardRef;
    void 0 === J && (J = G);
    var Z = J(function (e, n) {
      var t = e.innerRef,
        r = e.navigate,
        o = e.onClick,
        l = z(e, ['innerRef', 'navigate', 'onClick']),
        u = l.target,
        c = i({}, l, {
          onClick: function (e) {
            try {
              o && o(e);
            } catch (n) {
              throw (e.preventDefault(), n);
            }
            e.defaultPrevented ||
              0 !== e.button ||
              (u && '_self' !== u) ||
              (function (e) {
                return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
              })(e) ||
              (e.preventDefault(), r());
          },
        });
      return (c.ref = (G !== J && n) || t), a.a.createElement('a', c);
    });
    var ee = J(function (e, n) {
        var t = e.component,
          r = void 0 === t ? Z : t,
          o = e.replace,
          l = e.to,
          u = e.innerRef,
          c = z(e, ['component', 'replace', 'to', 'innerRef']);
        return a.a.createElement(R.Consumer, null, function (e) {
          e || s(!1);
          var t = e.history,
            f = X(Y(l, e.location), e.location),
            d = f ? t.createHref(f) : '',
            p = i({}, c, {
              href: d,
              navigate: function () {
                var n = Y(l, e.location);
                (o ? t.replace : t.push)(n);
              },
            });
          return (
            G !== J ? (p.ref = n || u) : (p.innerRef = u),
            a.a.createElement(r, p)
          );
        });
      }),
      ne = function (e) {
        return e;
      },
      te = a.a.forwardRef;
    void 0 === te && (te = ne);
    te(function (e, n) {
      var t = e['aria-current'],
        r = void 0 === t ? 'page' : t,
        o = e.activeClassName,
        l = void 0 === o ? 'active' : o,
        u = e.activeStyle,
        c = e.className,
        f = e.exact,
        d = e.isActive,
        p = e.location,
        m = e.sensitive,
        h = e.strict,
        g = e.style,
        v = e.to,
        b = e.innerRef,
        y = z(e, [
          'aria-current',
          'activeClassName',
          'activeStyle',
          'className',
          'exact',
          'isActive',
          'location',
          'sensitive',
          'strict',
          'style',
          'to',
          'innerRef',
        ]);
      return a.a.createElement(R.Consumer, null, function (e) {
        e || s(!1);
        var t = p || e.location,
          o = X(Y(v, t), t),
          w = o.pathname,
          x = w && w.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1'),
          k = x
            ? D(t.pathname, {path: x, exact: f, sensitive: m, strict: h})
            : null,
          E = !!(d ? d(k, t) : k),
          T = E
            ? (function () {
                for (
                  var e = arguments.length, n = new Array(e), t = 0;
                  t < e;
                  t++
                )
                  n[t] = arguments[t];
                return n
                  .filter(function (e) {
                    return e;
                  })
                  .join(' ');
              })(c, l)
            : c,
          C = E ? i({}, g, {}, u) : g,
          S = i(
            {'aria-current': (E && r) || null, className: T, style: C, to: o},
            y,
          );
        return (
          ne !== te ? (S.ref = n || b) : (S.innerRef = b),
          a.a.createElement(ee, S)
        );
      });
    });
    var re = t(11),
      oe = t.n(re);
    var ae = (e, n) => e.sortPosition - n.sortPosition;
    var ie = ({children: e}) => null,
      le = t(2),
      ue = t.n(le);
    var ce = ({grow: e}) =>
      a.a.createElement(
        'div',
        {className: 'flex-1 flex items-center justify-center'},
        a.a.createElement(
          'svg',
          {
            viewBox: '0 0 100 100',
            fill: 'currentColor',
            className: ue()('opacity-25', {
              'h-4 w-4': !e,
              'flex-1 max-w-64': e,
            }),
          },
          a.a.createElement(
            'path',
            {
              d:
                'M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3\n  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z',
            },
            a.a.createElement('animateTransform', {
              attributeName: 'transform',
              attributeType: 'XML',
              type: 'rotate',
              dur: '2s',
              from: '0 50 50',
              to: '360 50 50',
              repeatCount: 'indefinite',
            }),
          ),
          a.a.createElement(
            'path',
            {
              d:
                'M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7\n  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z',
            },
            a.a.createElement('animateTransform', {
              attributeName: 'transform',
              attributeType: 'XML',
              type: 'rotate',
              dur: '1s',
              from: '0 50 50',
              to: '-360 50 50',
              repeatCount: 'indefinite',
            }),
          ),
          a.a.createElement(
            'path',
            {
              d:
                'M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5\n  L82,35.7z',
            },
            a.a.createElement('animateTransform', {
              attributeName: 'transform',
              attributeType: 'XML',
              type: 'rotate',
              dur: '2s',
              from: '0 50 50',
              to: '360 50 50',
              repeatCount: 'indefinite',
            }),
          ),
        ),
      );
    var se = ({progress: e, grow: n}) => {
        const [t, r] = Object(o.useState)(!1),
          i = 2 * Math.PI * 45,
          l = i * e;
        return (
          Object(o.useEffect)(() => {
            const e = setTimeout(() => r(!0), 300);
            return () => clearTimeout(e);
          }, []),
          a.a.createElement(
            'div',
            {className: 'flex-1 flex items-center justify-center'},
            a.a.createElement(
              'svg',
              {
                viewBox: '0 0 100 100',
                className: ue()('w-20', {
                  'opacity-0': !t,
                  'opacity-25': t,
                  'h-4 w-4': !n,
                  'flex-1 max-w-64': n,
                }),
                style: {transform: 'rotate(-90deg)'},
              },
              a.a.createElement('circle', {
                cx: 50,
                cy: 50,
                r: 45,
                stroke: 'currentColor',
                fill: 'none',
                strokeWidth: 10,
                strokeDasharray: `${l} ${i - l}`,
              }),
            ),
          )
        );
      },
      fe = {
        color: void 0,
        size: void 0,
        className: void 0,
        style: void 0,
        attr: void 0,
      },
      de = o.createContext && o.createContext(fe),
      pe = function () {
        return (pe =
          Object.assign ||
          function (e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
              for (var o in (n = arguments[t]))
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            return e;
          }).apply(this, arguments);
      },
      me = function (e, n) {
        var t = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            n.indexOf(r) < 0 &&
            (t[r] = e[r]);
        if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
          var o = 0;
          for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
            n.indexOf(r[o]) < 0 && (t[r[o]] = e[r[o]]);
        }
        return t;
      };
    function he(e) {
      return function (n) {
        return o.createElement(
          ge,
          pe({attr: pe({}, e.attr)}, n),
          (function e(n) {
            return (
              n &&
              n.map(function (n, t) {
                return o.createElement(n.tag, pe({key: t}, n.attr), e(n.child));
              })
            );
          })(e.child),
        );
      };
    }
    function ge(e) {
      var n = function (n) {
        var t,
          r = e.size || n.size || '1em';
        n.className && (t = n.className),
          e.className && (t = (t ? t + ' ' : '') + e.className);
        var a = e.attr,
          i = e.title,
          l = me(e, ['attr', 'title']);
        return o.createElement(
          'svg',
          pe(
            {stroke: 'currentColor', fill: 'currentColor', strokeWidth: '0'},
            n.attr,
            a,
            l,
            {
              className: t,
              style: pe({color: e.color || n.color}, n.style, e.style),
              height: r,
              width: r,
              xmlns: 'http://www.w3.org/2000/svg',
            },
          ),
          i && o.createElement('title', null, i),
          e.children,
        );
      };
      return void 0 !== de
        ? o.createElement(de.Consumer, null, function (e) {
            return n(e);
          })
        : n(fe);
    }
    var ve = function (e) {
      return he({
        tag: 'svg',
        attr: {viewBox: '0 0 24 24'},
        child: [
          {
            tag: 'path',
            attr: {
              d:
                'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
            },
          },
        ],
      })(e);
    };
    ve.displayName = 'MdDelete';
    var be = function (e) {
      return he({
        tag: 'svg',
        attr: {viewBox: '0 0 24 24'},
        child: [
          {tag: 'circle', attr: {cx: '9', cy: '9', r: '4'}},
          {
            tag: 'path',
            attr: {
              d:
                'M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z',
            },
          },
        ],
      })(e);
    };
    be.displayName = 'MdRecordVoiceOver';
    var ye = function (e) {
      return he({
        tag: 'svg',
        attr: {viewBox: '0 0 24 24'},
        child: [
          {
            tag: 'path',
            attr: {
              d:
                'M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
            },
          },
        ],
      })(e);
    };
    ye.displayName = 'MdErrorOutline';
    var we = function (e) {
      return he({
        tag: 'svg',
        attr: {viewBox: '0 0 24 24'},
        child: [
          {tag: 'path', attr: {d: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'}},
        ],
      })(e);
    };
    we.displayName = 'MdFileDownload';
    var xe = function (e) {
      return he({
        tag: 'svg',
        attr: {viewBox: '0 0 24 24'},
        child: [
          {
            tag: 'path',
            attr: {
              d:
                'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
            },
          },
        ],
      })(e);
    };
    xe.displayName = 'MdEdit';
    var ke = function (e) {
      return he({
        tag: 'svg',
        attr: {viewBox: '0 0 24 24'},
        child: [
          {
            tag: 'path',
            attr: {d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'},
          },
        ],
      })(e);
    };
    ke.displayName = 'MdNavigateBefore';
    var Ee = function (e) {
      return he({
        tag: 'svg',
        attr: {viewBox: '0 0 24 24'},
        child: [
          {
            tag: 'path',
            attr: {d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'},
          },
        ],
      })(e);
    };
    Ee.displayName = 'MdNavigateNext';
    var Te = (e) => e.replace(/ /g, '.');
    var Ce = (e) => {
      const [n, t] = Object(o.useState)({status: 'NOT_DOWNLOADED'});
      Object(o.useEffect)(() => {
        let n = !1;
        return (
          (async () => {
            (await (async (e) =>
              (await indexedDB.databases()).some((n) => n.name === e))(e.id)) &&
              !n &&
              t({status: 'DOWNLOADED'});
          })(),
          () => {
            n = !0;
          }
        );
      }, [e.id]);
      return [
        Object(o.useCallback)(async () => {
          const n = await navigator.serviceWorker.ready;
          t({status: 'DOWNLOADING', progress: 0});
          const r = await n.backgroundFetch.fetch(
              e.title,
              [`/data/volumes/${Te(e.title)}.json`],
              {title: e.title, icons: [], downloadTotal: 10485760},
            ),
            o = (e) => {
              const n = e.currentTarget;
              switch (n.result) {
                case '':
                  console.log(
                    'DOWNLOAD PROGRESS:',
                    n.downloaded,
                    '/',
                    n.downloadTotal,
                    `(${Math.round((n.downloaded / 10485760) * 100)}%)`,
                  ),
                    t({
                      status: 'DOWNLOADING',
                      progress: n.downloadTotal
                        ? n.downloaded / 10485760
                        : null,
                    });
                  break;
                case 'failure':
                  t({status: 'ERROR', error: new Error(n.failureReason)});
                  break;
                case 'success':
                  return void t({status: 'DOWNLOADED'});
                default: {
                  const e = n.result;
                  throw new Error(e);
                }
              }
            };
          return (
            r.addEventListener('progress', o),
            () => r.removeEventListener('progress', o)
          );
        }, [e.title]),
        n,
      ];
    };
    var Se = (e) => {
        const [n, t] = Object(o.useState)({isLoading: !1}),
          r = Object(o.useCallback)(() => t({isLoading: !1}), []),
          a = Object(o.useCallback)(
            async (n = !1) => {
              n && r(), t((e) => ({...e, loading: !0}));
              try {
                const n = await e();
                t((e) => ({...e, loading: !1, result: n}));
              } catch (e) {
                t((n) => ({...n, loading: !1, error: e}));
              }
            },
            [e, r],
          );
        return (
          Object(o.useEffect)(() => {
            e ? a() : r();
          }, [e, r, a]),
          {...n, reload: a, flush: r}
        );
      },
      Pe = t(1);
    var _e = ({error: e, grow: n}) =>
      a.a.createElement(
        'div',
        {
          className:
            'flex-1 flex flex-col items-center justify-center bg-red-200 border border-red-800 text-red-800 p-2',
        },
        a.a.createElement(ye, {
          height: 'auto',
          width: 'auto',
          className: ue()({'h-4 w-4': !n, 'flex-1 max-w-64': n}),
        }),
        !1,
      );
    const Ne = ({volume: e}) => {
      const [n, t] = Ce(e),
        [r, i] = Object(o.useState)(!1),
        l =
          'flex flex-row sm:flex-col-reverse justify-between items-center p-4 border rounded transform hover:scale-125 sm:m-4 shadow-lg text-center active:scale-110 duration-75 bg-white uppercase hover:bg-gray-200 w-full sm:w-40 sm:h-40',
        u = a.a.createElement(
          ee,
          {key: e.id, to: '/' + e.title.replace(/\s/g, '.'), className: l},
          e.longTitle,
        );
      if (
        (Object(o.useEffect)(() => {
          navigator.serviceWorker.ready.then(() => i(!0));
        }, []),
        !r)
      )
        return u;
      switch (t.status) {
        case 'NOT_DOWNLOADED':
          return a.a.createElement(
            'button',
            {type: 'button', className: l, onClick: n},
            e.longTitle,
            a.a.createElement(we, {size: '3em'}),
          );
        case 'DOWNLOADING':
          return a.a.createElement(
            'div',
            {className: l},
            null != t.progress
              ? a.a.createElement(se, {progress: t.progress, grow: !0})
              : a.a.createElement(ce, null),
            e.longTitle,
          );
        case 'DOWNLOADED':
          return u;
        case 'ERROR':
          return a.a.createElement('p', null, 'Crap');
        default:
          throw new Error('Unhandled status: ' + t);
      }
    };
    var Oe = () => {
      const {result: e, error: n} = Se(Pe.b.getAllVolumes);
      return n
        ? a.a.createElement(_e, {error: n, grow: !0})
        : e
        ? a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(
              ie,
              null,
              a.a.createElement('title', null, 'WikiMarks: Volumes'),
            ),
            a.a.createElement(
              'div',
              {className: 'flex-1 flex flex-col'},
              a.a.createElement(
                'div',
                {
                  className:
                    'flex flex-col sm:flex-row flex-wrap items-center justify-center content-center font-serif',
                },
                e
                  .sort(ae)
                  .map((e) => a.a.createElement(Ne, {key: e.id, volume: e})),
              ),
            ),
          )
        : a.a.createElement(ce, {grow: !0});
    };
    var Me = ({heading: e, entries: n, small: t}) =>
      a.a.createElement(
        'div',
        {className: 'flex-1 flex flex-col'},
        e &&
          a.a.createElement(
            'h1',
            {
              className:
                'text-center text-6xl uppercase font-serif font-hairline',
            },
            e,
          ),
        a.a.createElement(
          'div',
          {
            className:
              'flex flex-col sm:flex-row flex-wrap items-center justify-center content-center font-serif',
          },
          n.map(({id: e, title: n, href: r}) =>
            a.a.createElement(
              ee,
              {
                key: e,
                to: r,
                className: ue()(
                  'flex flex-col justify-center p-4 border rounded transform hover:scale-125 sm:m-4 shadow-lg text-center active:scale-110 duration-75 bg-white uppercase w-full hover:bg-gray-200',
                  {'sm:w-40 sm:h-40': !t, 'sm:w-20 sm:h-20': t},
                ),
              },
              n,
            ),
          ),
        ),
      );
    var ze = (e) => e.replace(/\./g, ' ');
    const Ie = ({volume: e}) => {
      const {result: n, error: t} = Se(
        Object(o.useCallback)(() => Pe.b.getAllBooksByVolumeId(e.id), [e.id]),
      );
      return t
        ? a.a.createElement(_e, {error: t, grow: !0})
        : n
        ? a.a.createElement(Me, {
            heading: e.longTitle,
            entries: n
              .sort(ae)
              .map((n) => ({
                id: n.id,
                href: `/${e.title.replace(/\s/g, '.')}/${n.title.replace(
                  /\s/g,
                  '.',
                )}`,
                title: n.title,
              })),
          })
        : a.a.createElement(ce, {grow: !0});
    };
    var Re = () => {
      var e;
      const n = q('/:volumeRef'),
        {volumeRef: t} = n.params,
        {result: r, error: i} = Se(
          Object(o.useCallback)(() => Pe.b.getVolumeByTitle(ze(t)), [t]),
        );
      return i
        ? a.a.createElement(_e, {error: i, grow: !0})
        : r
        ? a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(
              ie,
              null,
              a.a.createElement(
                'title',
                null,
                'WikiMarks: ',
                null !== (e = null == r ? void 0 : r.longTitle) && void 0 !== e
                  ? e
                  : 'Not Found',
              ),
            ),
            r && a.a.createElement(Ie, {volume: r}),
          )
        : a.a.createElement(ce, {grow: !0});
    };
    var Le = (e, n) => e.number - n.number;
    var Ae = () => {
      const e = q('/:volumeRef/:bookRef'),
        {volumeRef: n, bookRef: t} = e.params,
        {result: r, error: i} = Se(
          Object(o.useCallback)(async () => {
            const e = await Pe.b.getVolumeByTitle(ze(n)),
              r = await Pe.b.getBookByTitle(e.id, ze(t));
            return {
              volume: e,
              book: r,
              chapters: await Pe.b.getAllChaptersByBookId(e.id, r.id),
            };
          }, [n, t]),
        );
      if (i) return a.a.createElement(_e, {error: i, grow: !0});
      if (!r) return a.a.createElement(ce, {grow: !0});
      const {volume: l, book: u, chapters: c} = r;
      return a.a.createElement(
        a.a.Fragment,
        null,
        a.a.createElement(
          ie,
          null,
          a.a.createElement('title', null, 'WikiMarks: ', u.longTitle),
        ),
        a.a.createElement(Me, {
          heading: u.title,
          small: !0,
          entries: c
            .sort(Le)
            .map((e) => ({
              id: e.id,
              href: `/${l.title.replace(/\s/g, '.')}/${u.title.replace(
                /\s/g,
                '.',
              )}/${e.number}`,
              title: String(e.number),
            })),
        }),
      );
    };
    class je extends a.a.Component {
      constructor() {
        super(...arguments), (this.state = {error: null});
      }
      static getDerivedStateFromError(e) {
        return {error: e};
      }
      render() {
        const {
          props: {children: e, grow: n},
          state: {error: t},
        } = this;
        return t ? a.a.createElement(_e, {error: t, grow: n}) : e;
      }
    }
    var De = je;
    var Fe = (e) => {
      if (!e.match(/^\d+$/)) throw new Error('Invalid Number Ref');
      return Number(e);
    };
    const Ue = {2: 'pt-2'},
      Be = {2: 'pt-2', 8: 'pt-8'};
    var $e,
      Ve = ({x: e, y: n}) =>
        a.a.createElement('div', {
          className: ue()(e ? Ue[e] : null, n ? Be[n] : null),
        });
    !(function (e) {
      (e.UP = 'UP'), (e.DOWN = 'DOWN'), (e.LEFT = 'LEFT'), (e.RIGHT = 'RIGHT');
    })($e || ($e = {}));
    var We = (
      e,
      n,
      {threshold: t = 150, restraint: r = 100, allowedTime: a = 300} = {},
    ) => {
      Object(o.useEffect)(() => {
        let o = {x: 0, y: 0, time: 0};
        const i = e.current;
        if (!i) return;
        const l = (e) => {
            e.preventDefault();
            const n = e.changedTouches[0];
            o = {x: n.pageX, y: n.pageY, time: Date.now()};
          },
          u = (e) => {
            e.preventDefault();
            const i = e.changedTouches[0],
              l = {x: i.pageX - o.x, y: i.pageY - o.y};
            let u = null;
            Date.now() - o.time <= a &&
              (Math.abs(l.x) >= t && Math.abs(l.y) <= r
                ? (u = l.x < 0 ? $e.LEFT : $e.RIGHT)
                : Math.abs(l.y) >= t &&
                  Math.abs(l.x) <= r &&
                  (u = l.y < 0 ? $e.UP : $e.DOWN)),
              null != u && n({direction: u});
          };
        return (
          i.addEventListener('touchstart', l),
          i.addEventListener('touchend', u),
          () => {
            i.removeEventListener('touchstart', l),
              i.removeEventListener('touchend', u);
          }
        );
      }, [e, t, r, a, n]);
    };
    const He = ({type: e, href: n}) =>
      a.a.createElement(
        ee,
        {
          to: n,
          className: ue()(
            'fixed hidden sm:flex flex-col justify-center items-center top-0 bottom-0 w-16 text-center text-6xl bg-gray-500 text-black cursor-pointer opacity-0 hover:opacity-25 duration-300',
            {'left-0': 'prev' === e, 'right-0': 'next' === e},
          ),
        },
        'prev' === e
          ? a.a.createElement(ke, {title: 'Previous'})
          : a.a.createElement(Ee, {title: 'Next'}),
      );
    var Qe = ({prevHref: e, nextHref: n}) => {
      const t = Object(o.useRef)('undefined' != typeof window ? window : null);
      Object(o.useEffect)(() => {
        document.body.style.overscrollBehaviorX = 'none';
      }, []);
      const r = Q(I);
      return (
        We(t, ({direction: t}) => {
          e && t === $e.RIGHT ? r.push(e) : n && t === $e.LEFT && r.push(n);
        }),
        a.a.createElement(
          a.a.Fragment,
          null,
          e && a.a.createElement(He, {type: 'prev', href: e}),
          n && a.a.createElement(He, {type: 'next', href: n}),
        )
      );
    };
    var qe = (e) =>
      e.sort((e, n) =>
        e.range || n.range
          ? e.range
            ? n.range
              ? e.range[0] - n.range[0]
              : 1
            : -1
          : 0,
      );
    const Ke = {
        yellow: {
          default: {
            bgColor: 'bg-yellow-200',
            textColor: 'text-yellow-900',
            borderColor: 'border-yellow-900',
          },
          hover: {
            bgColor: 'hover:bg-yellow-300',
            textColor: 'hover:text-yellow-900',
            borderColor: 'hover:border-yellow-900',
          },
          active: {
            bgColor: 'active:bg-yellow-400',
            textColor: 'active:text-yellow-900',
            borderColor: 'active:border-yellow-900',
          },
          activated: {
            bgColor: 'bg-yellow-400',
            textColor: 'text-yellow-900',
            borderColor: 'border-yellow-900',
          },
        },
        green: {
          default: {
            bgColor: 'bg-green-200',
            textColor: 'text-green-900',
            borderColor: 'border-green-900',
          },
          hover: {
            bgColor: 'hover:bg-green-300',
            textColor: 'hover:text-green-900',
            borderColor: 'hover:border-green-900',
          },
          active: {
            bgColor: 'active:bg-green-400',
            textColor: 'active:text-green-900',
            borderColor: 'active:border-green-900',
          },
          activated: {
            bgColor: 'bg-green-400',
            textColor: 'text-green-900',
            borderColor: 'border-green-900',
          },
        },
        blue: {
          default: {
            bgColor: 'bg-blue-200',
            textColor: 'text-blue-900',
            borderColor: 'border-blue-900',
          },
          hover: {
            bgColor: 'hover:bg-blue-300',
            textColor: 'hover:text-blue-900',
            borderColor: 'hover:border-blue-900',
          },
          active: {
            bgColor: 'active:bg-blue-400',
            textColor: 'active:text-blue-900',
            borderColor: 'active:border-blue-900',
          },
          activated: {
            bgColor: 'bg-blue-400',
            textColor: 'text-blue-900',
            borderColor: 'border-blue-900',
          },
        },
        orange: {
          default: {
            bgColor: 'bg-orange-200',
            textColor: 'text-orange-900',
            borderColor: 'border-orange-900',
          },
          hover: {
            bgColor: 'hover:bg-orange-300',
            textColor: 'hover:text-orange-900',
            borderColor: 'hover:border-orange-900',
          },
          active: {
            bgColor: 'active:bg-orange-400',
            textColor: 'active:text-orange-900',
            borderColor: 'active:border-orange-900',
          },
          activated: {
            bgColor: 'bg-orange-400',
            textColor: 'text-orange-900',
            borderColor: 'border-orange-900',
          },
        },
        red: {
          default: {
            bgColor: 'bg-red-200',
            textColor: 'text-red-900',
            borderColor: 'border-red-900',
          },
          hover: {
            bgColor: 'hover:bg-red-300',
            textColor: 'hover:text-red-900',
            borderColor: 'hover:border-red-900',
          },
          active: {
            bgColor: 'active:bg-red-400',
            textColor: 'active:text-red-900',
            borderColor: 'active:border-red-900',
          },
          activated: {
            bgColor: 'bg-red-400',
            textColor: 'text-red-900',
            borderColor: 'border-red-900',
          },
        },
        purple: {
          default: {
            bgColor: 'bg-purple-200',
            textColor: 'text-purple-900',
            borderColor: 'border-purple-900',
          },
          hover: {
            bgColor: 'hover:bg-purple-300',
            textColor: 'hover:text-purple-900',
            borderColor: 'hover:border-purple-900',
          },
          active: {
            bgColor: 'active:bg-purple-400',
            textColor: 'active:text-purple-900',
            borderColor: 'active:border-purple-900',
          },
          activated: {
            bgColor: 'bg-purple-400',
            textColor: 'text-purple-900',
            borderColor: 'border-purple-900',
          },
        },
      },
      Ye = Object.keys(Ke),
      Xe = (
        e,
        {
          states: n = ['default', 'hover', 'active'],
          colors: t = ['bgColor', 'textColor', 'borderColor'],
        } = {},
      ) => {
        const r = 'string' == typeof e ? e : Ye[e % Ye.length];
        return n.flatMap((e) => t.map((n) => Ke[r][e][n]));
      };
    var Ge = (e) => [...new Set(e)];
    const Je = ({speakers: e, speakerId: n}) => {
        const t = e.find((e) => e.id === n);
        if (!t) throw new Error(`Missing Speaker: [${n}]`);
        const {name: r, description: o} = t;
        return a.a.createElement(
          'div',
          {
            className:
              'inline-block w-16 h-16 mx-2 align-middle overflow-hidden select-none',
            'data-selection-ignore': !0,
            title: o ? `${r}, ${o}` : r,
          },
          a.a.createElement(
            'div',
            {className: 'flex justify-center'},
            a.a.createElement(be, null),
          ),
          a.a.createElement(
            'div',
            {
              className:
                'text-xs text-center truncate uppercase leading-none flex-1 min-w-0 pt-1',
            },
            r,
          ),
        );
      },
      Ze = ({
        isVerseNumber: e = !1,
        children: n,
        selectMarks: t,
        marks: r,
        selectedMarkIds: o,
        speakerIds: i,
        speakers: l,
      }) => {
        const u = r.flatMap((e) => ('speaker' === e.type ? [e.speakerId] : [])),
          c = u[u.length - 1],
          s = r[r.length - 1],
          f = ue()(
            c &&
              Xe(i.indexOf(c), {
                states: e
                  ? ['default']
                  : o.includes(s.id)
                  ? ['activated']
                  : void 0,
                colors: ['bgColor', 'textColor'],
              }),
            'py-4',
            {'cursor-pointer': 0 !== r.length},
          );
        return r.length
          ? a.a.createElement(
              a.a.Fragment,
              null,
              a.a.createElement(
                'a',
                {
                  'data-speaker-ids': u.join(' '),
                  onClick: (e) => {
                    e.stopPropagation();
                    const n = r[r.length - 1].id;
                    e.ctrlKey ? t((e) => [...(null != e ? e : []), n]) : t([n]);
                  },
                },
                a.a.createElement(
                  'mark',
                  {className: f},
                  a.a.createElement(
                    De,
                    {grow: !0},
                    u.map((e) =>
                      a.a.createElement(Je, {
                        key: e,
                        speakerId: e,
                        speakers: l,
                      }),
                    ),
                  ),
                  n,
                ),
              ),
            )
          : a.a.createElement(a.a.Fragment, null, n);
      };
    var en = ({
      id: e,
      text: n,
      number: t,
      selectMarks: r,
      selectedMarkIds: i,
      speakers: l,
      marks: u,
    }) => {
      const c = u.filter((n) => n.verseId === e),
        s = Object(o.useMemo)(
          () =>
            Ge(
              (u || [])
                .filter((e) => 'speaker' === e.type)
                .map((e) => e.speakerId),
            ),
          [u],
        ),
        f = qe(c),
        d = Ge([
          0,
          ...f
            .flatMap((e) => {
              var n;
              return null !== (n = e.range) && void 0 !== n ? n : [];
            })
            .sort((e, n) => e - n),
        ]),
        p = (e) =>
          f.filter((t) => {
            var r;
            const [o, a = n.length] =
              null !== (r = t.range) && void 0 !== r ? r : [0, n.length];
            return e >= o && e < a;
          });
      return a.a.createElement(
        'blockquote',
        {
          'data-verse': e,
          key: e,
          className:
            'content-center mb-6 text-4xl leading-loose text-justify font-serif',
        },
        a.a.createElement('span', {className: 'select-none'}, t, ' '),
        d.reduce((e, t, o) => {
          var u;
          const c = null !== (u = d[o + 1]) && void 0 !== u ? u : n.length,
            [f, m = n.length] = [t, c];
          return [
            ...e,
            a.a.createElement(
              Ze,
              {
                key: t,
                marks: p(t),
                selectMarks: r,
                selectedMarkIds: i,
                speakerIds: s,
                speakers: l,
              },
              n.slice(f, m),
            ),
          ];
        }, []),
      );
    };
    var nn = (e) => {
      var n;
      return null === (n = e.parentElement) || void 0 === n
        ? void 0
        : n.closest('[data-verse]');
    };
    var tn = (e) => e.dataset.verse;
    var rn = (e, n, t) => {
      const r = tn(n),
        o = tn(t);
      if (!r || !o) return [];
      const a = e.findIndex((e) => e.id === r),
        i = e.findIndex((e) => e.id === o);
      return e.slice(a, i + 1);
    };
    var on = (e) => {
      const n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null, !1),
        t = [];
      let r;
      for (; (r = n.nextNode()); ) t.push(r);
      return t;
    };
    const an = (e) => e.parentElement.closest('[data-selection-ignore]');
    var ln = (e, n, t) => {
      var r;
      const o = on(e);
      let a = 0;
      for (const e of o)
        if (!an(e)) {
          if (e === n) return a + t;
          a +=
            (null === (r = e.textContent) || void 0 === r
              ? void 0
              : r.length) || 0;
        }
      throw new Error('markedNode is not a descendant of container');
    };
    var un = (e) => {
      const n =
        0 !== e.rangeCount ? (null == e ? void 0 : e.getRangeAt(0)) : null;
      return (
        !n ||
        (n.startContainer === n.endContainer && n.startOffset === n.endOffset)
      );
    };
    var cn = (e, n) => {
      if (un(n)) return null;
      const t = n.getRangeAt(0),
        r = nn(t.startContainer),
        o = nn(t.endContainer);
      if (!r || !o) return null;
      const a = rn(e, r, o),
        i = a[0],
        l = a[a.length - 1];
      if (!i || !l) return null;
      const u = Math.max(
          ln(
            r,
            null == t ? void 0 : t.startContainer,
            null == t ? void 0 : t.startOffset,
          ) - (i.number + ' ').length,
          0,
        ),
        c =
          ln(
            o,
            null == t ? void 0 : t.endContainer,
            null == t ? void 0 : t.endOffset,
          ) - (l.number + ' ').length,
        s = a.map((e, n) => {
          const t = 0 === n,
            r = n === a.length - 1;
          return {
            verseId: e.id,
            chapterId: e.chapterId,
            volumeId: e.volumeId,
            range:
              t && r
                ? c >= e.text.length
                  ? [u]
                  : [u, c]
                : t
                ? [u]
                : r
                ? [0, c]
                : null,
          };
        });
      return s.length ? s : null;
    };
    var sn = ({themeId: e, ...n}) =>
      a.a.createElement(
        'button',
        Object.assign({}, n, {
          className: ue()(
            'inline-flex flex-shrink-0 text-4xl min-w-20 h-20 rounded-full uppercase items-center justify-center focus:outline-none focus:shadow-outline shadow-lg m-2 cursor-pointer flex-no-wrap leading-none select-none',
            Xe(e),
          ),
        }),
      );
    var fn = (e) =>
      a.a.createElement(
        'div',
        {className: 'relative'},
        a.a.createElement(
          'select',
          Object.assign({}, e, {
            className:
              'block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline',
          }),
        ),
        a.a.createElement(
          'div',
          {
            className:
              'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
          },
          a.a.createElement(
            'svg',
            {className: 'fill-current h-4 w-4', viewBox: '0 0 20 20'},
            a.a.createElement('path', {
              d:
                'M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z',
            }),
          ),
        ),
      );
    var dn = (e, n) => {
      const [t, r] = Object(o.useState)(() => {
          const t = window.localStorage.getItem(e);
          return null != t ? JSON.parse(t) : n;
        }),
        a = Object(o.useCallback)(
          (n) => {
            const o = n instanceof Function ? n(t) : n;
            r(o), window.localStorage.setItem(e, JSON.stringify(o));
          },
          [e, t],
        );
      return [t, a];
    };
    const pn = (e, n) => {
      const t = e.name.toLowerCase(),
        r = n.name.toLowerCase();
      return t < r ? -1 : t > r ? 1 : 0;
    };
    var mn = ({speakers: e, onChange: n, ...t}) => {
      const [r, o] = ((e, n) => {
          const [t, r] = dn(e, []);
          return [
            t,
            (e) => {
              r((t) =>
                [e, ...(null != t ? t : []).filter((n) => n !== e)].slice(0, n),
              );
            },
          ];
        })('recentSpeakers', 5),
        i = e.filter((e) => (null == r ? void 0 : r.includes(e.id))),
        l = ({id: e, name: n, description: t}) =>
          a.a.createElement('option', {key: e, value: e}, t ? `${n}, ${t}` : n);
      return a.a.createElement(
        fn,
        Object.assign({}, t, {
          onChange: (e) => {
            o(e.currentTarget.value), null == n || n(e);
          },
        }),
        a.a.createElement('option', null),
        a.a.createElement('optgroup', {label: 'Recent'}, i.map(l)),
        e.sort(pn).map(l),
      );
    };
    var hn = ({
      updateMarks: e,
      isUpdating: n,
      speakers: t,
      marks: r,
      selectedMarkIds: i,
    }) => {
      const [l, u] = Object(o.useState)(!1);
      return a.a.createElement(
        a.a.Fragment,
        null,
        l &&
          a.a.createElement('div', {
            className: 'fixed top-0 right-0 bottom-0 left-0',
            onClick: () => u(!1),
          }),
        a.a.createElement(
          sn,
          {
            themeId: 'blue',
            onClick: (e) => {
              e.stopPropagation(), u((e) => !e);
            },
            disabled: n,
          },
          a.a.createElement(
            'div',
            {className: 'whitespace-no-wrap'},
            a.a.createElement(
              'div',
              {
                className:
                  'h-20 w-20 inline-flex align-middle justify-center items-center',
              },
              n
                ? a.a.createElement(ce, {grow: !0})
                : a.a.createElement(xe, null),
            ),
            a.a.createElement(
              'div',
              {
                className: ue()(
                  'inline-block align-middle text-base text-black overflow-hidden min-w-0 duration-200',
                  {'max-w-64': l, 'max-w-0': !l},
                ),
              },
              a.a.createElement(
                'div',
                {className: 'pr-6'},
                a.a.createElement(mn, {
                  speakers: t,
                  onClick: (e) => e.stopPropagation(),
                  onChange: (n) => {
                    const t = n.currentTarget.value;
                    t &&
                      (u(!1),
                      e(
                        r
                          .filter((e) => i.includes(e.id))
                          .map((e) => ({
                            ...e,
                            speakerId: t,
                            lastUpdated: Date.now(),
                          })),
                      ));
                  },
                }),
              ),
            ),
          ),
        ),
      );
    };
    var gn = ({selectedMarkIds: e, marks: n, updateMarks: t, isDeleting: r}) =>
        a.a.createElement(
          sn,
          {
            themeId: 'red',
            onClick: () =>
              t(
                n
                  .filter((n) => e.includes(n.id))
                  .map((e) => ({...e, isActive: !1, lastUpdated: Date.now()})),
              ),
            disabled: r,
          },
          r ? a.a.createElement(ce, {grow: !0}) : a.a.createElement(ve, null),
        ),
      vn =
        ('undefined' != typeof crypto &&
          crypto.getRandomValues &&
          crypto.getRandomValues.bind(crypto)) ||
        ('undefined' != typeof msCrypto &&
          'function' == typeof msCrypto.getRandomValues &&
          msCrypto.getRandomValues.bind(msCrypto)),
      bn = new Uint8Array(16);
    function yn() {
      if (!vn)
        throw new Error(
          'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported',
        );
      return vn(bn);
    }
    for (var wn = [], xn = 0; xn < 256; ++xn)
      wn.push((xn + 256).toString(16).substr(1));
    var kn = function (e, n) {
      var t = n || 0,
        r = wn;
      return (
        r[e[t + 0]] +
        r[e[t + 1]] +
        r[e[t + 2]] +
        r[e[t + 3]] +
        '-' +
        r[e[t + 4]] +
        r[e[t + 5]] +
        '-' +
        r[e[t + 6]] +
        r[e[t + 7]] +
        '-' +
        r[e[t + 8]] +
        r[e[t + 9]] +
        '-' +
        r[e[t + 10]] +
        r[e[t + 11]] +
        r[e[t + 12]] +
        r[e[t + 13]] +
        r[e[t + 14]] +
        r[e[t + 15]]
      ).toLowerCase();
    };
    var En = function (e, n, t) {
      'string' == typeof e &&
        ((n = 'binary' === e ? new Uint8Array(16) : null), (e = null));
      var r = (e = e || {}).random || (e.rng || yn)();
      if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), n)) {
        for (var o = t || 0, a = 0; a < 16; ++a) n[o + a] = r[a];
        return n;
      }
      return kn(r);
    };
    var Tn = () =>
      En()
        .replace(/[^0-9a-f]/g, '')
        .slice(0, 24);
    var Cn = ({selections: e, createMarks: n, isCreating: t, speakers: r}) => {
      const [i, l] = Object(o.useState)(!1);
      return a.a.createElement(
        a.a.Fragment,
        null,
        i &&
          a.a.createElement('div', {
            className:
              'fixed top-0 right-0 bottom-0 left-0 bg-black opacity-25',
            onClick: () => l(!1),
          }),
        a.a.createElement(
          sn,
          {themeId: 'yellow', onClick: (e) => l((e) => !e), disabled: t},
          t ? a.a.createElement(ce, {grow: !0}) : a.a.createElement(be, null),
        ),
        a.a.createElement(
          'div',
          {className: 'whitespace-no-wrap'},
          a.a.createElement('div', {
            className:
              'h-20 w-20 inline-flex align-middle justify-center items-center',
          }),
          a.a.createElement(
            'div',
            {
              className: ue()(
                'inline-block align-middle text-base text-black overflow-hidden min-w-0 duration-200',
                {'max-w-64': i, 'max-w-0': !i},
              ),
            },
            a.a.createElement(
              'div',
              {className: 'pr-6'},
              a.a.createElement(mn, {
                speakers: r,
                onClick: (e) => e.stopPropagation(),
                onChange: (t) => {
                  const r = t.currentTarget.value;
                  r &&
                    (l(!1),
                    n(
                      ((e, n) =>
                        e.map((e) => ({
                          ...e,
                          id: Tn(),
                          type: 'speaker',
                          isActive: !0,
                          lastUpdated: Date.now(),
                          speakerId: n,
                        })))(e, r),
                    ));
                },
              }),
            ),
          ),
        ),
      );
    };
    var Sn = (e, n) => {
      const [t, r] = Object(o.useState)({readyState: 'NONE'});
      return [
        async (...t) => {
          r({readyState: 'LOADING'}),
            await Pe.a[e](...t),
            r({readyState: 'COMPLETE'}),
            null == n || n();
        },
        t,
      ];
    };
    const Pn = ({verses: e, speakers: n, marks: t, reloadMarks: r}) => {
      const [i, l] = Object(o.useState)([]),
        [u, c] = Object(o.useState)([]),
        [s, f] = Sn('createOrUpdateMarks', () => {
          l([]), c([]), r();
        });
      return (
        Object(o.useEffect)(() => {
          const n = () => {
            const n = window.getSelection();
            if (n) {
              if (un(n)) return;
              const t = cn(e, n);
              t && l(t);
            }
          };
          return (
            document.addEventListener('selectionchange', n),
            () => document.removeEventListener('selectionchange', n)
          );
        }, [e]),
        a.a.createElement(
          De,
          {grow: !0},
          a.a.createElement(
            'div',
            {
              className:
                'flex-grow flex flex-col overflow-auto min-h-screen justify-center relative',
              onClick: (e) => {
                var n;
                const t = window.getSelection();
                'Range' !== (null == t ? void 0 : t.type) &&
                  (null === (n = window.getSelection()) ||
                    void 0 === n ||
                    n.removeAllRanges(),
                  l([])),
                  c([]);
              },
            },
            e
              .sort((e, n) => e.number - n.number)
              .map((e) =>
                a.a.createElement(en, {
                  key: e.id,
                  id: e.id,
                  number: e.number,
                  text: e.text,
                  selectMarks: c,
                  marks: t,
                  selectedMarkIds: u,
                  speakers: n,
                }),
              ),
            a.a.createElement(
              'div',
              {className: 'fixed bottom-0 right-0 pr-4 pb-4 text-right'},
              0 !== u.length &&
                a.a.createElement(
                  a.a.Fragment,
                  null,
                  a.a.createElement(
                    'div',
                    null,
                    a.a.createElement(hn, {
                      speakers: n,
                      marks: t,
                      selectedMarkIds: u,
                      isUpdating: 'LOADING' === f.readyState,
                      updateMarks: s,
                    }),
                  ),
                  a.a.createElement(
                    'div',
                    null,
                    a.a.createElement(gn, {
                      marks: t,
                      selectedMarkIds: u,
                      isDeleting: 'LOADING' === f.readyState,
                      updateMarks: s,
                    }),
                  ),
                ),
              0 !== i.length &&
                a.a.createElement(
                  'div',
                  null,
                  a.a.createElement(Cn, {
                    isCreating: 'LOADING' === f.readyState,
                    selections: i,
                    createMarks: (e) => s(e),
                    speakers: n,
                  }),
                ),
            ),
          ),
        )
      );
    };
    var _n = () => {
      const e = q('/:volumeRef/:bookRef/:chapterRef'),
        {volumeRef: n, bookRef: t, chapterRef: r} = e.params,
        {result: i, error: l} = Se(
          Object(o.useCallback)(async () => {
            const e = await Pe.b.getVolumeByTitle(ze(n)),
              o = await Pe.b.getBookByTitle(e.id, ze(t)),
              a = await Pe.b.getChapterByBookIdAndNumber(e.id, o.id, Fe(r)),
              [i, l, u, c] = await Promise.all([
                Pe.b.getAllVersesByChapterId(e.id, a.id),
                Pe.b.getAllMarksByChapterId(e.id, a.id),
                Pe.b.queryPrevChapterUrl(e.id, a.id),
                Pe.b.queryNextChapterUrl(e.id, a.id),
              ]);
            return {
              volume: e,
              book: o,
              chapter: a,
              verses: i,
              marks: l,
              prev: u,
              next: c,
            };
          }, [n, t, r]),
        ),
        {result: u, error: c} = Se(Pe.b.getAllSpeakers),
        {result: s, error: f, reload: d} = Se(
          Object(o.useMemo)(
            () =>
              (null == i ? void 0 : i.volume.id) &&
              (null == i ? void 0 : i.chapter.id)
                ? () => Pe.b.getAllMarksByChapterId(i.volume.id, i.chapter.id)
                : null,
            [i],
          ),
        ),
        p = l || f || c;
      if (p) return a.a.createElement(_e, {error: p, grow: !0});
      if (!i) return a.a.createElement(ce, {grow: !0});
      const {book: m, chapter: h, verses: g, prev: v, next: b} = i;
      return a.a.createElement(
        a.a.Fragment,
        null,
        a.a.createElement(
          ie,
          null,
          a.a.createElement(
            'title',
            null,
            'WikiMarks: ',
            m.title,
            ' ',
            h.number,
          ),
        ),
        a.a.createElement(
          'div',
          {className: 'flex-1 flex flex-col px-4 sm:px-32'},
          1 === h.number &&
            a.a.createElement(
              'h1',
              {
                className:
                  'text-center text-6xl uppercase font-serif select-none',
              },
              m.longTitle,
            ),
          a.a.createElement(
            'h2',
            {
              className:
                'text-center text-4xl uppercase font-serif select-none',
            },
            1 === h.number ? 'Chapter' : m.title,
            ' ',
            h.number,
          ),
          a.a.createElement(Ve, {y: 8}),
          a.a.createElement(
            'p',
            {className: 'text-4xl italic font-serif select-none'},
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus suscipit congue. Quisque accumsan posuere elementum. Morbi nec sapien convallis, condimentum diam non, aliquet tellus.',
          ),
          a.a.createElement(Ve, {y: 8}),
          a.a.createElement(Qe, {prevHref: v, nextHref: b}),
          a.a.createElement(Pn, {
            verses: g,
            speakers: null != u ? u : [],
            marks: null != s ? s : [],
            reloadMarks: d,
          }),
        ),
        ' ',
      );
    };
    t(22);
    const Nn = async () => {
      try {
        const e = await navigator.serviceWorker.ready;
        console.log('SYNC: triggering sync'),
          await e.sync.register('sync-marks'),
          console.log('SYNC: triggered'),
          setTimeout(Nn, 3e4);
      } catch (e) {
        console.log('SYNC: Failed', e);
      }
    };
    oe.a.render(
      a.a.createElement(
        K,
        null,
        a.a.createElement(
          'div',
          {className: 'min-h-screen flex flex-col bg-gray-100'},
          a.a.createElement(
            De,
            {grow: !0},
            a.a.createElement(
              H,
              null,
              a.a.createElement(F, {path: '/', exact: !0, component: Oe}),
              a.a.createElement(F, {
                path: '/:volume',
                exact: !0,
                component: Re,
              }),
              a.a.createElement(F, {
                path: '/:volume/:book',
                exact: !0,
                component: Ae,
              }),
              a.a.createElement(F, {
                path: '/:volume/:book/:chapter',
                exact: !0,
                component: _n,
              }),
            ),
          ),
        ),
      ),
      document.getElementById('root'),
    ),
      (async () => {
        try {
          const e = await navigator.serviceWorker.register(
            '/index.client.sw.js',
          );
          console.log(
            'ServiceWorker registration successful with scope: ',
            e.scope,
          );
        } catch (e) {
          console.log('ServiceWorker registration failed: ', e);
        }
      })(),
      Nn(),
      window.addEventListener('beforeunload', () => Nn());
  },
]);
