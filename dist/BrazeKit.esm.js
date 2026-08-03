function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function () {
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

const b = {
  init: function (n) {
    (void 0 === n && void 0 !== b.zg) || (b.zg = !!n), b.i || (b.i = !0);
  },
  destroy: function () {
    (b.i = !1), (b.zg = void 0), (b.Ud = void 0);
  },
  setLogger: function (n) {
    "function" == typeof n
      ? (b.init(), (b.Ud = n))
      : b.info("Ignoring setLogger call since logger is not a function");
  },
  toggleLogging: function () {
    b.init(),
      b.zg
        ? (console.log("Disabling Braze logging"), (b.zg = !1))
        : (console.log("Enabled Braze logging"), (b.zg = !0));
  },
  info: function (n) {
    if (b.zg) {
      const o = "Braze: " + n;
      null != b.Ud ? b.Ud(o) : console.log(o);
    }
  },
  warn: function (n) {
    if (b.zg) {
      const o = "Braze SDK Warning: " + n + " (v6.9.0)";
      null != b.Ud ? b.Ud(o) : console.warn(o);
    }
  },
  error: function (n) {
    if (b.zg) {
      const o = "Braze SDK Error: " + n + " (v6.9.0)";
      null != b.Ud ? b.Ud(o) : console.error(o);
    }
  },
};
var b$1 = b;

const ai = {
  Nu: function (t) {
    const r = (t + "=".repeat((4 - (t.length % 4)) % 4))
        .replace(/\-/g, "+")
        .replace(/_/g, "/"),
      n = atob(r),
      o = new Uint8Array(n.length);
    for (let t = 0; t < n.length; ++t) o[t] = n.charCodeAt(t);
    return o;
  },
};

const p = {
    CustomEvent: "ce",
    Pr: "p",
    $c: "pc",
    Fc: "ca",
    gl: "i",
    Ya: "ie",
    vs: "cci",
    ws: "ccic",
    us: "ccc",
    gs: "ccd",
    wm: "ss",
    hm: "se",
    Fn: "si",
    On: "sc",
    Xn: "sbc",
    Lc: "sfe",
    om: "iec",
    Dc: "lr",
    Ac: "uae",
    Mc: "lcaa",
    Cc: "lcar",
    Zu: "inc",
    Qu: "add",
    Xu: "rem",
    Yu: "set",
    Vu: "ncam",
    Tc: "sgu",
    xo: "ffi",
    ro: "bi",
    Nt: "bc",
    Rt: "bd",
  };

const V = {
  de: function () {
    if ("undefined" != typeof window && window.crypto) {
      if ("function" == typeof window.crypto.randomUUID)
        return window.crypto.randomUUID();
      if ("function" == typeof window.crypto.getRandomValues)
        try {
          const n = new Uint8Array(16);
          window.crypto.getRandomValues(n),
            (n[6] = (15 & n[6]) | 64),
            (n[8] = (63 & n[8]) | 128);
          const t = Array.from(n, (n) => ("0" + n.toString(16)).slice(-2));
          return [
            t.slice(0, 4).join(""),
            t.slice(4, 6).join(""),
            t.slice(6, 8).join(""),
            t.slice(8, 10).join(""),
            t.slice(10, 16).join(""),
          ].join("-");
        } catch (n) {}
    }
    const n = (n = !1) => {
      const t = (Math.random().toString(16) + "000000000").substr(2, 8);
      return n ? "-" + t.substr(0, 4) + "-" + t.substr(4, 4) : t;
    };
    return n() + n(!0) + n(!0) + n();
  },
};
var V$1 = V;

class et {
  constructor(t, e) {
    (this.database = t),
      (this.Ud = e),
      (this.parent = "undefined" == typeof window ? self : window),
      (this.database = t),
      (this.Ud = e);
  }
  Od() {
    if ("indexedDB" in this.parent) return this.parent.indexedDB;
  }
  isSupported() {
    var t;
    try {
      if (null == this.Od()) return !1;
      {
        const e =
          null === (t = this.Od()) || void 0 === t
            ? void 0
            : t.open("Braze IndexedDB Support Test");
        if (
          (e &&
            ((e.onupgradeneeded = () => e.result.close()),
            (e.onsuccess = () => e.result.close())),
          "undefined" != typeof window)
        ) {
          const t = window,
            e = t.chrome || t.browser || t.kd;
          if (e && e.runtime && e.runtime.id)
            return (
              this.Ud.info(
                "Not using IndexedDB for storage because we are running inside an extension",
              ),
              !1
            );
        }
        return !0;
      }
    } catch (t) {
      return (
        this.Ud.info(
          "Not using IndexedDB for storage due to following error: " + t,
        ),
        !1
      );
    }
  }
  Kd(t, e) {
    var n;
    const o =
      null === (n = this.Od()) || void 0 === n
        ? void 0
        : n.open(this.database.Gd, this.database.VERSION);
    if (null == o) return "function" == typeof e && e(), !1;
    const i = this;
    return (
      (o.onupgradeneeded = (t) => {
        var e;
        i.Ud.info(
          "Upgrading indexedDB " +
            i.database.Gd +
            " to v" +
            i.database.VERSION +
            "...",
        );
        const n = null === (e = t.target) || void 0 === e ? void 0 : e.result;
        for (const t in i.database.Ws) {
          const e = t;
          i.database.Ws.hasOwnProperty(t) &&
            !n.objectStoreNames.contains(i.database.Ws[e]) &&
            n.createObjectStore(i.database.Ws[e]);
        }
      }),
      (o.onsuccess = (n) => {
        var o;
        const r = null === (o = n.target) || void 0 === o ? void 0 : o.result;
        (r.onversionchange = () => {
          r.close(),
            "function" == typeof e && e(),
            i.Ud.error(
              "Needed to close the database unexpectedly because of an upgrade in another tab",
            );
        }),
          t(r);
      }),
      (o.onerror = (t) => {
        var n;
        const o = t;
        return (
          i.Ud.info(
            "Could not open indexedDB " +
              i.database.Gd +
              " v" +
              i.database.VERSION +
              ": " +
              (null === (n = o.target) || void 0 === n ? void 0 : n.errorCode),
          ),
          "function" == typeof e && e(),
          !0
        );
      }),
      !0
    );
  }
  setItem(t, e, n, o, i) {
    if (!this.isSupported()) return "function" == typeof i && i(), !1;
    const r = this;
    return this.Kd((d) => {
      if (!d.objectStoreNames.contains(t))
        return (
          r.Ud.error(
            "Could not store object " +
              e +
              " in " +
              t +
              " on indexedDB " +
              r.database.Gd +
              " - " +
              t +
              " is not a valid objectStore",
          ),
          "function" == typeof i && i(),
          void d.close()
        );
      const s = d.transaction([t], "readwrite");
      s.oncomplete = () => d.close();
      const u = s.objectStore(t).put(n, e);
      (u.onerror = () => {
        r.Ud.error(
          "Could not store object " +
            e +
            " in " +
            t +
            " on indexedDB " +
            r.database.Gd,
        ),
          "function" == typeof i && i();
      }),
        (u.onsuccess = () => {
          "function" == typeof o && o();
        });
    }, i);
  }
  getItem(t, e, n) {
    if (!this.isSupported()) return !1;
    const o = this;
    return this.Kd((i) => {
      if (!i.objectStoreNames.contains(t))
        return (
          o.Ud.error(
            "Could not retrieve object " +
              e +
              " in " +
              t +
              " on indexedDB " +
              o.database.Gd +
              " - " +
              t +
              " is not a valid objectStore",
          ),
          void i.close()
        );
      const r = i.transaction([t], "readonly");
      r.oncomplete = () => i.close();
      const d = r.objectStore(t).get(e);
      (d.onerror = () => {
        o.Ud.error(
          "Could not retrieve object " +
            e +
            " in " +
            t +
            " on indexedDB " +
            o.database.Gd,
        );
      }),
        (d.onsuccess = (t) => {
          var e;
          const o = null === (e = t.target) || void 0 === e ? void 0 : e.result;
          null != o && n(o);
        });
    });
  }
  kr(t, e, n) {
    if (!this.isSupported()) return "function" == typeof n && n(), !1;
    const o = this;
    return this.Kd((i) => {
      if (!i.objectStoreNames.contains(t))
        return (
          o.Ud.error(
            "Could not retrieve last record from " +
              t +
              " on indexedDB " +
              o.database.Gd +
              " - " +
              t +
              " is not a valid objectStore",
          ),
          "function" == typeof n && n(),
          void i.close()
        );
      const r = i.transaction([t], "readonly");
      r.oncomplete = () => i.close();
      const d = r.objectStore(t).openCursor(null, "prev");
      (d.onerror = () => {
        o.Ud.error(
          "Could not open cursor for " + t + " on indexedDB " + o.database.Gd,
        ),
          "function" == typeof n && n();
      }),
        (d.onsuccess = (t) => {
          var o;
          const i = null === (o = t.target) || void 0 === o ? void 0 : o.result;
          null != i && null != i.value && null != i.key
            ? e(i.key, i.value)
            : "function" == typeof n && n();
        });
    }, n);
  }
  ge(t, e) {
    if (!this.isSupported()) return !1;
    const n = this;
    return this.Kd((o) => {
      if (!o.objectStoreNames.contains(t))
        return (
          n.Ud.error(
            "Could not delete record " +
              e +
              " from " +
              t +
              " on indexedDB " +
              n.database.Gd +
              " - " +
              t +
              " is not a valid objectStore",
          ),
          void o.close()
        );
      const i = o.transaction([t], "readwrite");
      i.oncomplete = () => o.close();
      i.objectStore(t).delete(e).onerror = () => {
        n.Ud.error(
          "Could not delete record " +
            e +
            " from " +
            t +
            " on indexedDB " +
            n.database.Gd,
        );
      };
    });
  }
  Qs(t, e) {
    if (!this.isSupported()) return !1;
    const n = this;
    return this.Kd((o) => {
      if (!o.objectStoreNames.contains(t))
        return (
          n.Ud.error(
            "Could not retrieve objects from " +
              t +
              " on indexedDB " +
              n.database.Gd +
              " - " +
              t +
              " is not a valid objectStore",
          ),
          void o.close()
        );
      const i = o.transaction([t], "readwrite");
      i.oncomplete = () => o.close();
      const r = i.objectStore(t),
        d = r.openCursor(),
        s = [];
      (d.onerror = () => {
        s.length > 0
          ? (n.Ud.info(
              "Cursor closed midway through for " +
                t +
                " on indexedDB " +
                n.database.Gd,
            ),
            e(s))
          : n.Ud.error(
              "Could not open cursor for " +
                t +
                " on indexedDB " +
                n.database.Gd,
            );
      }),
        (d.onsuccess = (t) => {
          var n;
          const o = null === (n = t.target) || void 0 === n ? void 0 : n.result;
          if (null != o) {
            if (null != o.value && null != o.key) {
              r.delete(o.key).onsuccess = () => {
                s.push(o.value);
              };
            }
            "function" == typeof o.continue && o.continue();
          } else s.length > 0 && e(s);
        });
    });
  }
  clearData() {
    if (!this.isSupported()) return !1;
    const t = [];
    for (const e in this.database.Ws) {
      const n = e;
      this.database.Ws.hasOwnProperty(e) &&
        this.database.Ws[n] !== this.database.Ws.pe &&
        t.push(this.database.Ws[n]);
    }
    const e = this;
    return this.Kd(function (n) {
      const o = n.transaction(t, "readwrite");
      o.oncomplete = () => n.close();
      for (let n = 0; n < t.length; n++) {
        const i = t[n];
        o.objectStore(i).clear().onerror = function () {
          e.Ud.error(
            "Could not clear " +
              this.source.name +
              " on indexedDB " +
              e.database.Gd,
          );
        };
      }
      o.onerror = function () {
        e.Ud.error(
          "Could not clear object stores on indexedDB " + e.database.Gd,
        );
      };
    });
  }
}
et._s = {
  Xs: {
    Gd: "AppboyServiceWorkerAsyncStorage",
    VERSION: 6,
    Ws: {
      pn: "data",
      yr: "pushClicks",
      Fu: "pushSubscribed",
      Hd: "fallbackDevice",
      Vs: "cardUpdates",
      pe: "optOut",
      Br: "pendingData",
      wh: "sdkAuthenticationSignature",
    },
    be: 1,
  },
};

var li = {
  _h: "allowCrawlerActivity",
  Nh: "baseUrl",
  se: "cookieExpiryInDays",
  Oh: "noCookies",
  Th: "devicePropertyAllowlist",
  ka: "disablePushTokenMaintenance",
  Rh: "enableLogging",
  Ph: "enableSdkAuthentication",
  _a: "manageServiceWorkerExternally",
  Dh: "minimumIntervalBetweenTriggerActionsInSeconds",
  Lh: "sessionTimeoutInSeconds",
  yh: "appVersion",
  Mh: "appVersionNumber",
  xa: "serviceWorkerLocation",
  Ma: "safariWebsitePushId",
  qa: "localization",
  sr: "contentSecurityNonce",
  nr: "allowUserSuppliedJavascript",
  ja: "inAppMessageZIndex",
  ba: "openInAppMessagesInNewTab",
  oh: "requireExplicitInAppMessageDismissal",
  Uh: "doNotLoadFontAwesome",
  Wh: "deviceId",
  ya: "serviceWorkerScope",
  Ye: "dustHost",
  Bh: "sdkFlavor",
  tn: "openCardsInNewTab",
};

function values(t) {
  const e = [];
  let r;
  for (const n in t)
    (r = n),
      Object.prototype.hasOwnProperty.call(t, r) &&
        void 0 !== t[r] &&
        e.push(t[r]);
  return e;
}
function validateValueIsFromEnum(t, e, r, n) {
  const o = values(t);
  return (
    -1 !== o.indexOf(e) ||
    (b$1.error(`${r} Valid values from ${n} are "${o.join('"/"')}".`), !1)
  );
}
function isArray(t) {
  return Array.isArray
    ? Array.isArray(t)
    : "[object Array]" === Object.prototype.toString.call(t);
}
function isDate(t) {
  return "[object Date]" === Object.prototype.toString.call(t);
}
function isObject$1(t) {
  return "[object Object]" === Object.prototype.toString.call(t);
}
function keys(t) {
  const e = [];
  for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
  return e;
}
function isEqual(t, e) {
  if (t === e) return 0 !== t || 1 / t == 1 / e;
  if (null == t || null == e) return t === e;
  const r = t.toString();
  if (r !== e.toString()) return !1;
  switch (r) {
    case "[object RegExp]":
    case "[object String]":
      return "" + t == "" + e;
    case "[object Number]":
      return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;
    case "[object Date]":
    case "[object Boolean]":
      return +t == +e;
  }
  const n = "[object Array]" === r;
  if (!n) {
    if ("object" != typeof t || "object" != typeof e) return !1;
    const r = t.constructor,
      n = e.constructor;
    if (
      r !== n &&
      !(
        "function" == typeof r &&
        r instanceof r &&
        "function" == typeof n &&
        n instanceof n
      ) &&
      "constructor" in t &&
      "constructor" in e
    )
      return !1;
  }
  const o = [],
    c = [];
  let i = o.length;
  for (; i--; ) if (o[i] === t) return c[i] === e;
  if ((o.push(t), c.push(e), n)) {
    if (((i = t.length), i !== e.length)) return !1;
    for (; i--; ) if (!isEqual(t[i], e[i])) return !1;
  } else {
    const r = keys(t);
    let n;
    if (((i = r.length), keys(e).length !== i)) return !1;
    for (; i--; )
      if (
        ((n = r[i]),
        !Object.prototype.hasOwnProperty.call(e, n) || !isEqual(t[n], e[n]))
      )
        return !1;
  }
  return o.pop(), c.pop(), !0;
}

function convertMsToSeconds(e, n = !1) {
  let t = e / 1e3;
  return n && (t = Math.floor(t)), t;
}
function convertSecondsToMs(e) {
  return 1e3 * e;
}
function dateFromUnixTimestamp(e) {
  if (null == e) return null;
  const n = parseInt(e.toString());
  return isNaN(n) ? null : new Date(1e3 * n);
}
function toValidBackendTimeString(e) {
  return null != e && isDate(e) ? e.toISOString().replace(/\.[0-9]{3}Z$/, "") : e;
}
function rehydrateDateAfterJsonization(e) {
  return null == e || "" === e ? null : new Date(e);
}
function timestampOrNow(e) {
  return null == e || "" === e ? new Date().valueOf() : e;
}
function secondsAgo(e) {
  return (new Date().valueOf() - e.valueOf()) / 1e3;
}
function secondsInTheFuture(e) {
  return (e.valueOf() - new Date().valueOf()) / 1e3;
}

const MAX_PURCHASE_QUANTITY = 100;
const FEED_ANIMATION_DURATION = 500;
const GLOBAL_RATE_LIMIT_CAPACITY_DEFAULT = 30;
const GLOBAL_RATE_LIMIT_REFILL_RATE_DEFAULT = 30;
const LAST_REQUEST_TO_ENDPOINT_MS_AGO_DEFAULT = 72e5;
const MAX_RETRY_COUNT_PER_REQUEST = 15;
const REQUEST_ATTEMPT_DEFAULT = 1;
const DISMISSALS_CACHE_SIZE_DEFAULT = 200;
const REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT = 1e4;
const REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT = 3;
const REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT = 3e5;
const CoreStrings = {
  ee: "Braze must be initialized before calling methods.",
  je: "logCustomEvent",
  QE: "logEcommerceEvent",
  Ku: "setCustomUserAttribute",
};

class f {
  constructor() {
    this.In = {};
  }
  Ut(t) {
    if ("function" != typeof t) return null;
    const i = V$1.de();
    return (this.In[i] = t), i;
  }
  removeSubscription(t) {
    delete this.In[t];
  }
  removeAllSubscriptions() {
    this.In = {};
  }
  Ve() {
    return Object.keys(this.In).length;
  }
  A(t) {
    const i = [];
    for (const s in this.In) {
      const r = this.In[s];
      i.push(r(t));
    }
    return i;
  }
}

class Card {
  constructor(t, i, s, h, l, n, e, r, u, E, T, o, a, I, N, A) {
    (this.id = t),
      (this.viewed = i),
      (this.title = s),
      (this.imageUrl = h),
      (this.description = l),
      (this.updated = n),
      (this.expiresAt = e),
      (this.url = r),
      (this.linkText = u),
      (this.aspectRatio = E),
      (this.extras = T),
      (this.pinned = o),
      (this.dismissible = a),
      (this.clicked = I),
      (this.language = N),
      (this.altImageText = A),
      (this.id = t),
      (this.viewed = i || !1),
      (this.title = s || ""),
      (this.imageUrl = h),
      (this.description = l || ""),
      (this.updated = n || null),
      (this.expiresAt = e || null),
      (this.url = r),
      (this.linkText = u),
      null == E
        ? (this.aspectRatio = null)
        : ((E = parseFloat(E.toString())),
          (this.aspectRatio = isNaN(E) ? null : E)),
      (this.extras = T || {}),
      (this.pinned = o || !1),
      (this.dismissible = a || !1),
      (this.dismissed = !1),
      (this.clicked = I || !1),
      (this.isControl = !1),
      (this.language = N || null),
      (this.altImageText = A || null),
      (this.test = !1),
      (this.ti = null),
      (this.es = null),
      (this.ii = null);
  }
  subscribeToClickedEvent(t) {
    return this.si().Ut(t);
  }
  subscribeToDismissedEvent(t) {
    return this.ns().Ut(t);
  }
  removeSubscription(t) {
    this.si().removeSubscription(t), this.ns().removeSubscription(t);
  }
  removeAllSubscriptions() {
    this.si().removeAllSubscriptions(), this.ns().removeAllSubscriptions();
  }
  dismissCard() {
    if (!this.dismissible || this.dismissed) return;
    "function" == typeof this.logCardDismissal && this.logCardDismissal();
    let t = this.te;
    !t && this.id && (t = document.getElementById(this.id)),
      t &&
        ((t.style.height = t.offsetHeight + "px"),
        (t.className = t.className + " ab-hide"),
        setTimeout(function () {
          t &&
            t.parentNode &&
            ((t.style.height = "0"),
            (t.style.margin = "0"),
            setTimeout(function () {
              t && t.parentNode && t.parentNode.removeChild(t);
            }, Card.hi));
        }, FEED_ANIMATION_DURATION));
  }
  si() {
    return null == this.ti && (this.ti = new f()), this.ti;
  }
  ns() {
    return null == this.es && (this.es = new f()), this.es;
  }
  js() {
    const t = new Date().valueOf();
    return (
      !(null != this.ii && t - this.ii < Card.li) &&
      ((this.ii = t), (this.viewed = !0), !0)
    );
  }
  Yt() {
    (this.viewed = !0), (this.clicked = !0), this.si().A();
  }
  Ft() {
    return (
      !(!this.dismissible || this.dismissed) &&
      ((this.dismissed = !0), this.ns().A(), !0)
    );
  }
  ni(t) {
    if (null == t || t[Card.ei.qs] !== this.id) return !0;
    if (t[Card.ei.ri]) return !1;
    if (
      null != t[Card.ei.Es] &&
      null != this.updated &&
      parseInt(t[Card.ei.Es]) < convertMsToSeconds(this.updated.valueOf())
    )
      return !0;
    if (
      (t[Card.ei.ys] && !this.viewed && (this.viewed = !0),
      t[Card.ei.Ls] && !this.clicked && (this.clicked = t[Card.ei.Ls]),
      null != t[Card.ei.As] && (this.title = t[Card.ei.As]),
      null != t[Card.ei.Bs] && (this.imageUrl = t[Card.ei.Bs]),
      null != t[Card.ei.Ds] && (this.description = t[Card.ei.Ds]),
      null != t[Card.ei.Es])
    ) {
      const i = dateFromUnixTimestamp(t[Card.ei.Es]);
      null != i && (this.updated = i);
    }
    if (null != t[Card.ei.Fs]) {
      let i;
      (i = t[Card.ei.Fs] === Card.ui ? null : dateFromUnixTimestamp(t[Card.ei.Fs])),
        (this.expiresAt = i);
    }
    if (
      (null != t[Card.ei.URL] && (this.url = t[Card.ei.URL]),
      null != t[Card.ei.Gs] && (this.linkText = t[Card.ei.Gs]),
      null != t[Card.ei.Hs])
    ) {
      const i = parseFloat(t[Card.ei.Hs].toString());
      this.aspectRatio = isNaN(i) ? null : i;
    }
    return (
      null != t[Card.ei.Is] && (this.extras = t[Card.ei.Is]),
      null != t[Card.ei.Js] && (this.pinned = t[Card.ei.Js]),
      null != t[Card.ei.Ks] && (this.dismissible = t[Card.ei.Ks]),
      null != t[Card.ei.Ms] && (this.language = t[Card.ei.Ms]),
      null != t[Card.ei.Ns] && (this.altImageText = t[Card.ei.Ns]),
      null != t[Card.ei.Os] && (this.test = t[Card.ei.Os]),
      !0
    );
  }
  qt() {
    b$1.error("Must be implemented in a subclass");
  }
}
(Card.ui = -1),
  (Card.ei = {
    qs: "id",
    ys: "v",
    Ks: "db",
    ri: "r",
    Es: "ca",
    Js: "p",
    Fs: "ea",
    Is: "e",
    xs: "tp",
    Bs: "i",
    As: "tt",
    Ds: "ds",
    URL: "u",
    Gs: "dm",
    Hs: "ar",
    Ls: "cl",
    Os: "t",
    Ms: "language",
    Ns: "image_alt",
  }),
  (Card.ks = {
    zs: "captioned_image",
    Ei: "text_announcement",
    Ti: "short_news",
    oi: "banner_image",
    ai: "control",
  }),
  (Card.bs = {
    qs: "id",
    ys: "v",
    Ks: "db",
    Ii: "cr",
    Es: "ca",
    Js: "p",
    Ni: "t",
    Fs: "ea",
    Is: "e",
    xs: "tp",
    Bs: "i",
    As: "tt",
    Ds: "ds",
    URL: "u",
    Gs: "dm",
    Hs: "ar",
    Ls: "cl",
    Os: "s",
    Ms: "l",
    Ns: "ia",
  }),
  (Card.Ai = {
    ci: "ADVERTISING",
    mi: "ANNOUNCEMENTS",
    Si: "NEWS",
    Di: "SOCIAL",
  }),
  (Card.hi = 400),
  (Card.li = 1e4);

class ImageOnly extends Card {
  constructor(s, t, i, h, l, r, e, n, o, u, a, c, d) {
    super(s, t, null, i, null, h, l, r, null, e, n, o, u, a, c, d),
      (this.ae = "ab-image-only"),
      (this.oe = !1),
      (this.test = !1);
  }
  qt() {
    const s = {};
    return (
      (s[Card.bs.xs] = Card.ks.oi),
      (s[Card.bs.qs] = this.id),
      (s[Card.bs.ys] = this.viewed),
      (s[Card.bs.Bs] = this.imageUrl),
      (s[Card.bs.Es] = this.updated),
      (s[Card.bs.Fs] = this.expiresAt),
      (s[Card.bs.URL] = this.url),
      (s[Card.bs.Hs] = this.aspectRatio),
      (s[Card.bs.Is] = this.extras),
      (s[Card.bs.Js] = this.pinned),
      (s[Card.bs.Ks] = this.dismissible),
      (s[Card.bs.Ls] = this.clicked),
      (s[Card.bs.Ms] = this.language),
      (s[Card.bs.Ns] = this.altImageText),
      (s[Card.bs.Os] = this.test),
      s
    );
  }
}

class CaptionedImage extends Card {
  constructor(t, s, i, h, e, r, a, o, c, n, d, p, u, l, m, f) {
    super(t, s, i, h, e, r, a, o, c, n, d, p, u, l, m, f),
      (this.ae = "ab-captioned-image"),
      (this.oe = !0),
      (this.test = !1);
  }
  qt() {
    const t = {};
    return (
      (t[Card.bs.xs] = Card.ks.zs),
      (t[Card.bs.qs] = this.id),
      (t[Card.bs.ys] = this.viewed),
      (t[Card.bs.As] = this.title),
      (t[Card.bs.Bs] = this.imageUrl),
      (t[Card.bs.Ds] = this.description),
      (t[Card.bs.Es] = this.updated),
      (t[Card.bs.Fs] = this.expiresAt),
      (t[Card.bs.URL] = this.url),
      (t[Card.bs.Gs] = this.linkText),
      (t[Card.bs.Hs] = this.aspectRatio),
      (t[Card.bs.Is] = this.extras),
      (t[Card.bs.Js] = this.pinned),
      (t[Card.bs.Ks] = this.dismissible),
      (t[Card.bs.Ls] = this.clicked),
      (t[Card.bs.Ms] = this.language),
      (t[Card.bs.Ns] = this.altImageText),
      (t[Card.bs.Os] = this.test),
      t
    );
  }
}

class ClassicCard extends Card {
  constructor(s, t, i, h, r, c, e, a, o, d, l, n, u, p, f, m) {
    super(s, t, i, h, r, c, e, a, o, d, l, n, u, p, f, m),
      (this.ae = "ab-classic-card"),
      (this.oe = !0);
  }
  qt() {
    const s = {};
    return (
      (s[Card.bs.xs] = Card.ks.Ti),
      (s[Card.bs.qs] = this.id),
      (s[Card.bs.ys] = this.viewed),
      (s[Card.bs.As] = this.title),
      (s[Card.bs.Bs] = this.imageUrl),
      (s[Card.bs.Ds] = this.description),
      (s[Card.bs.Es] = this.updated),
      (s[Card.bs.Fs] = this.expiresAt),
      (s[Card.bs.URL] = this.url),
      (s[Card.bs.Gs] = this.linkText),
      (s[Card.bs.Hs] = this.aspectRatio),
      (s[Card.bs.Is] = this.extras),
      (s[Card.bs.Js] = this.pinned),
      (s[Card.bs.Ks] = this.dismissible),
      (s[Card.bs.Ls] = this.clicked),
      (s[Card.bs.Ms] = this.language),
      (s[Card.bs.Ns] = this.altImageText),
      (s[Card.bs.Os] = this.test),
      s
    );
  }
}

class ControlCard extends Card {
  constructor(t, s, l, i, r, n) {
    super(t, s, null, null, null, l, i, null, null, null, r, n),
      (this.isControl = !0),
      (this.ae = "ab-control-card"),
      (this.oe = !1);
  }
  qt() {
    const t = {};
    return (
      (t[Card.bs.xs] = Card.ks.ai),
      (t[Card.bs.qs] = this.id),
      (t[Card.bs.ys] = this.viewed),
      (t[Card.bs.Es] = this.updated),
      (t[Card.bs.Fs] = this.expiresAt),
      (t[Card.bs.Is] = this.extras),
      (t[Card.bs.Js] = this.pinned),
      (t[Card.bs.Os] = this.test),
      t
    );
  }
}

function getAlias(e) {
  const t = null == e ? void 0 : e.St(STORAGE_KEYS.It.lS);
  let n;
  return t && (n = { label: t.l, name: t.a }), n;
}

class Ie {
  constructor(t, s, i, r, e) {
    (this.userId = t),
      (this.type = s),
      (this.time = i),
      (this.sessionId = r),
      (this.data = e),
      (this.userId = t),
      (this.type = s),
      (this.time = timestampOrNow(i)),
      (this.sessionId = r),
      (this.data = e);
  }
  ta() {
    var t;
    const s = {
      name: this.type,
      time: convertMsToSeconds(this.time),
      data: this.data || {},
      session_id: this.sessionId,
    };
    null != this.userId && (s.user_id = this.userId);
    const i = (null === (t = r.Er()) || void 0 === t ? void 0 : t.Fh()) || !1;
    if (!s.user_id && !i) {
      const t = getAlias(r.p());
      t && (s.alias = t);
    }
    return s;
  }
  qt() {
    return {
      u: this.userId,
      t: this.type,
      ts: this.time,
      s: this.sessionId,
      d: this.data,
    };
  }
  static fromJson(t) {
    return new Ie(t.user_id, t.name, t.time, t.session_id, t.data);
  }
  static AS(t) {
    return null != t && isObject$1(t) && null != t.t && "" !== t.t;
  }
  static _u(t) {
    return new Ie(t.u, t.t, t.ts, t.s, t.d);
  }
}

const getErrorMessage = (r) =>
  r instanceof Error ? r.message : String(r);

class _t {
  constructor(t, e, i) {
    (this.Tu = t),
      null == t && (t = V$1.de()),
      !i || isNaN(i) ? (this.lm = new Date().valueOf()) : (this.lm = i),
      (this.Tu = t),
      (this.pm = new Date().valueOf()),
      (this.fm = e);
  }
  qt() {
    return `g:${encodeURIComponent(this.Tu)}|e:${this.fm}|c:${this.lm}|l:${
      this.pm
    }`;
  }
  static TS(t) {
    if ("string" != typeof t) return null;
    const e = t.lastIndexOf("|e:"),
      i = t.substring(0, e),
      r = i.split("g:")[1];
    let n;
    return (
      (n = /[|:]/.test(r) ? encodeURIComponent(r) : r),
      (t = t.replace(i, `g:${n}`))
    );
  }
  static _u(t) {
    let e;
    if ("string" == typeof t)
      try {
        const i = t.split("|");
        if (!isArray(i) || 4 !== i.length) return null;
        const r = (t) => t.split(":")[1],
          n = (t) => {
            const e = parseInt(r(t));
            if (!isNaN(e)) return e;
          };
        (e = new _t(decodeURIComponent(r(i[0])), n(i[1]), n(i[2]))),
          (e.pm = n(i[3]));
      } catch (e) {
        b$1.info(
          `Unable to parse cookie string ${t}, failed with error: ${getErrorMessage(e)}`,
        );
      }
    else {
      if (null == t || null == t.g) return null;
      (e = new _t(t.g, t.e, t.c)), (e.pm = t.l);
    }
    return e;
  }
}

function getByteLength(t) {
  let e = t.length;
  for (let n = t.length - 1; n >= 0; n--) {
    const r = t.charCodeAt(n);
    r > 127 && r <= 2047 ? e++ : r > 2047 && r <= 65535 && (e += 2),
      r >= 56320 && r <= 57343 && n--;
  }
  return e;
}
function decodeBrazeActions(t) {
  try {
    t = t.replace(/-/g, "+").replace(/_/g, "/");
    const e = window.atob(t),
      n = new Uint8Array(e.length);
    for (let t = 0; t < e.length; t++) n[t] = e.charCodeAt(t);
    const r = new Uint16Array(n.buffer);
    return String.fromCharCode(...r);
  } catch (t) {
    return b$1.error("Unable to decode Base64: " + t), null;
  }
}

const BRAZE_ACTIONS = {
  types: {
    io: "container",
    logCustomEvent: "logCustomEvent",
    setEmailNotificationSubscriptionType:
      "setEmailNotificationSubscriptionType",
    setPushNotificationSubscriptionType: "setPushNotificationSubscriptionType",
    setCustomUserAttribute: "setCustomUserAttribute",
    requestPushPermission: "requestPushPermission",
    addToSubscriptionGroup: "addToSubscriptionGroup",
    removeFromSubscriptionGroup: "removeFromSubscriptionGroup",
    addToCustomAttributeArray: "addToCustomAttributeArray",
    removeFromCustomAttributeArray: "removeFromCustomAttributeArray",
    mo: "openLink",
    uo: "openLinkInWebView",
  },
  properties: { type: "type", eo: "steps", so: "args" },
};
const INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES = {
  Un: "unknownBrazeAction",
  Nc: "noPushPrompt",
};
const ineligibleBrazeActionURLErrorMessage = (t, o) =>
  t === INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES.Un
    ? `${o} contains an unknown braze action type and will not be displayed.`
    : "";
function getDecodedBrazeAction(t) {
  try {
    const o = t.match(BRAZE_ACTION_URI_REGEX),
      r = o ? o[0].length : null,
      n = r ? t.substring(r) : null;
    if (null == r || r > t.length - 1 || !n)
      return void b$1.error(
        `Did not find base64 encoded brazeAction in url to process : ${t}`,
      );
    const e = decodeBrazeActions(n);
    return e
      ? JSON.parse(e)
      : void b$1.error(`Failed to decode base64 encoded brazeAction: ${n}`);
  } catch (o) {
    return void b$1.error(`Failed to process brazeAction URL ${t} : ${getErrorMessage(o)}`);
  }
}
function po(t, o) {
  let r = !1;
  if (o) for (const n of o) if (((r = r || t(n)), r)) return !0;
  return !1;
}
function containsUnknownBrazeAction(t) {
  const o = BRAZE_ACTIONS.properties.type,
    r = BRAZE_ACTIONS.properties.eo;
  try {
    if (null == t) return !0;
    const n = t[o];
    return n === BRAZE_ACTIONS.types.io
      ? po(containsUnknownBrazeAction, t[r])
      : !isValidBrazeActionType(n);
  } catch (t) {
    return !0;
  }
}
function containsPushPrimerBrazeAction(t) {
  if (!t || !isValidBrazeActionJson(t)) return !1;
  const o = BRAZE_ACTIONS.properties.type,
    r = BRAZE_ACTIONS.properties.eo,
    n = t[o];
  return n === BRAZE_ACTIONS.types.io
    ? po(containsPushPrimerBrazeAction, t[r])
    : n === BRAZE_ACTIONS.types.requestPushPermission;
}

const CUSTOM_DATA_REGEX = /^[^\x00-\x1F\x22]+$/;
const CUSTOM_ATTRIBUTE_SPECIAL_CHARS_REGEX = /[$.]/;
const CUSTOM_ATTRIBUTE_RESERVED_OPERATORS = [
  "$add",
  "$update",
  "$remove",
  "$identifier_key",
  "$identifier_value",
  "$new_object",
  "$time",
  "$google_ad_personalization",
  "$google_ad_user_data",
];
const EMAIL_ADDRESS_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const BRAZE_ACTION_URI_REGEX = /^brazeActions:\/\/v\d+\//;
const VALID_UTF8_STRING_NO_WHITESPACES_REGEX = /^[^\s]+$/;
function validateCustomString(t, e, r) {
  const n =
    null != t &&
    "string" == typeof t &&
    ("" === t || null != t.match(CUSTOM_DATA_REGEX));
  return n || b$1.error(`Cannot ${e} because ${r} "${t}" is invalid.`), n;
}
function validateCustomAttributeKey(t) {
  return (
    null != t &&
      t.match(CUSTOM_ATTRIBUTE_SPECIAL_CHARS_REGEX) &&
      -1 === CUSTOM_ATTRIBUTE_RESERVED_OPERATORS.indexOf(t) &&
      b$1.warn("Custom attribute keys cannot contain '$' or '.'"),
    validateCustomString(t, "set custom user attribute", "the given key")
  );
}
function validatePropertyType(t) {
  const e = typeof t;
  return (
    null == t || "number" === e || "boolean" === e || isDate(t) || "string" === e
  );
}
function _validateNestedProperties(t, e, r) {
  const n = -1 !== r;
  if (n && r > 50)
    return b$1.error("Nested attributes cannot be more than 50 levels deep."), !1;
  const o = n ? r + 1 : -1;
  if (isArray(t) && isArray(e)) {
    for (let r = 0; r < t.length && r < e.length; r++)
      if (
        (isDate(t[r]) && (e[r] = toValidBackendTimeString(t[r])),
        !_validateNestedProperties(t[r], e[r], o))
      )
        return !1;
  } else {
    if (!isObject$1(t)) return validatePropertyType(t);
    for (const r of keys(t)) {
      const i = t[r];
      if (n && !validateCustomAttributeKey(r)) return !1;
      if (isDate(i)) {
        e[r] = toValidBackendTimeString(i);
      }
      if (!_validateNestedProperties(i, e[r], o)) return !1;
    }
  }
  return !0;
}
function _validateEventPropertyValue(t, e, r, n, o) {
  let i;
  return (
    (i =
      isObject$1(t) || isArray(t)
        ? _validateNestedProperties(t, e, o ? 1 : -1)
        : validatePropertyType(t)),
    i || b$1.error(`Cannot ${r} because ${n} "${t}" is invalid.`),
    i
  );
}
function validateStandardString(t, e, r, n = !1) {
  const o = "string" == typeof t || (null === t && n);
  return o || b$1.error(`Cannot ${e} because ${r} "${t}" is invalid.`), o;
}
function validateCustomProperties(t, e, r, n, o) {
  if ((null == t && (t = {}), "object" != typeof t || isArray(t)))
    return (
      b$1.error(`${e} requires that ${r} be an object. Ignoring ${o}.`),
      [!1, null]
    );
  let i, a;
  e === CoreStrings.Ku ? ((i = 76800), (a = "75KB")) : ((i = 51200), (a = "50KB"));
  const s = JSON.stringify(t);
  if (getByteLength(s) > i)
    return (
      b$1.error(
        `Could not ${n} because ${r} was greater than the max size of ${a}.`,
      ),
      [!1, null]
    );
  let u;
  try {
    u = JSON.parse(s);
  } catch (t) {
    return (
      b$1.error(`Could not ${n} because ${r} did not contain valid JSON.`),
      [!1, null]
    );
  }
  for (const r in t) {
    if (e === CoreStrings.Ku && !validateCustomAttributeKey(r)) return [!1, null];
    if (!validateCustomString(r, n, `the ${o} property name`))
      return [!1, null];
    const i = t[r];
    if (e !== CoreStrings.Ku && null == i) {
      delete t[r], delete u[r];
      continue;
    }
    isDate(i) && (u[r] = toValidBackendTimeString(i));
    if (
      !_validateEventPropertyValue(
        i,
        u[r],
        n,
        `the ${o} property "${r}"`,
        e === CoreStrings.Ku,
      )
    )
      return [!1, null];
  }
  return [!0, u];
}
function validateCustomAttributeArrayType(t, e) {
  let r = !1,
    n = !1;
  const o = () => {
    b$1.error(
      "Custom attribute arrays must be either string arrays or object arrays.",
    );
  };
  for (const i of e)
    if ("string" == typeof i) {
      if (n) return o(), [!1, !1];
      if (
        !validateCustomString(
          i,
          `set custom user attribute "${t}"`,
          "the element in the given array",
        )
      )
        return [!1, !1];
      r = !0;
    } else {
      if (!isObject$1(i)) return o(), [!1, !1];
      if (r) return o(), [!1, !1];
      if (
        !validateCustomProperties(
          i,
          CoreStrings.Ku,
          "attribute value",
          `set custom user attribute "${t}"`,
          "custom user attribute",
        )
      )
        return [!1, !1];
      n = !0;
    }
  return [r, n];
}
function isValidEmail(t) {
  if ("string" != typeof t) return !1;
  const e = t.length;
  return !(0 === e || e > 256) && EMAIL_ADDRESS_REGEX.test(t.toLowerCase());
}
function isValidBrazeActionJson(t) {
  if (!(BRAZE_ACTIONS.properties.type in t)) return !1;
  switch (t[BRAZE_ACTIONS.properties.type]) {
    case BRAZE_ACTIONS.types.io:
      if (BRAZE_ACTIONS.properties.eo in t) return !0;
      break;
    case BRAZE_ACTIONS.types.logCustomEvent:
    case BRAZE_ACTIONS.types.setEmailNotificationSubscriptionType:
    case BRAZE_ACTIONS.types.setPushNotificationSubscriptionType:
    case BRAZE_ACTIONS.types.setCustomUserAttribute:
    case BRAZE_ACTIONS.types.addToSubscriptionGroup:
    case BRAZE_ACTIONS.types.removeFromSubscriptionGroup:
    case BRAZE_ACTIONS.types.addToCustomAttributeArray:
    case BRAZE_ACTIONS.types.removeFromCustomAttributeArray:
    case BRAZE_ACTIONS.types.mo:
    case BRAZE_ACTIONS.types.uo:
      if (BRAZE_ACTIONS.properties.so in t) return !0;
      break;
    case BRAZE_ACTIONS.types.requestPushPermission:
      return !0;
    default:
      return !1;
  }
  return !1;
}
function isValidBrazeActionType(t) {
  let e = !1;
  return (
    Object.keys(BRAZE_ACTIONS.types).forEach((r) => {
      BRAZE_ACTIONS.types[r] !== t.toString() || (e = !0);
    }),
    e
  );
}
function isValidBannerPlacementId(t) {
  return VALID_UTF8_STRING_NO_WHITESPACES_REGEX.test(t);
}

class User {
  constructor(t, e) {
    (this.Ss = t), (this.Ru = e), (this.Ss = t), (this.Ru = e);
  }
  getUserId(t) {
    const e = this.Ss.getUserId();
    if ("function" != typeof t) return e;
    b$1.warn(
      "The callback for getUserId is deprecated. You can access its return value directly instead (e.g. `const id = braze.getUser().getUserId()`)",
    ),
      t(e);
  }
  addAlias(t, e) {
    return !validateStandardString(t, "add alias", "the alias", !1) || t.length <= 0
      ? (b$1.error("addAlias requires a non-empty alias"), !1)
      : !validateStandardString(e, "add alias", "the label", !1) || e.length <= 0
      ? (b$1.error("addAlias requires a non-empty label"), !1)
      : this.Ru.Gu(t, e).lt;
  }
  setFirstName(t) {
    return (
      !!validateStandardString(t, "set first name", "the firstName", !0) &&
      this.Ss.zu("first_name", t)
    );
  }
  setLastName(t) {
    return (
      !!validateStandardString(t, "set last name", "the lastName", !0) && this.Ss.zu("last_name", t)
    );
  }
  setEmail(t) {
    return null === t || isValidEmail(t)
      ? this.Ss.zu("email", t)
      : (b$1.error(
          `Cannot set email address - "${t}" did not pass RFC-5322 validation.`,
        ),
        !1);
  }
  setGender(t) {
    return (
      "string" == typeof t && (t = t.toLowerCase()),
      !(
        null !== t &&
        !validateValueIsFromEnum(
          User.Genders,
          t,
          `Gender "${t}" is not a valid gender.`,
          "User.Genders",
        )
      ) && this.Ss.zu("gender", t)
    );
  }
  setDateOfBirth(t, e, r) {
    return null === t && null === e && null === r
      ? this.Ss.zu("dob", null)
      : ((t = null != t ? parseInt(t.toString()) : null),
        (e = null != e ? parseInt(e.toString()) : null),
        (r = null != r ? parseInt(r.toString()) : null),
        null == t ||
        null == e ||
        null == r ||
        isNaN(t) ||
        isNaN(e) ||
        isNaN(r) ||
        e > 12 ||
        e < 1 ||
        r > 31 ||
        r < 1
          ? (b$1.error(
              "Cannot set date of birth - parameters should comprise a valid date e.g. setDateOfBirth(1776, 7, 4);",
            ),
            !1)
          : this.Ss.zu("dob", `${t}-${e}-${r}`));
  }
  setCountry(t) {
    return (
      !!validateStandardString(t, "set country", "the country", !0) && this.Ss.zu("country", t)
    );
  }
  setHomeCity(t) {
    return (
      !!validateStandardString(t, "set home city", "the homeCity", !0) && this.Ss.zu("home_city", t)
    );
  }
  setLanguage(t) {
    return (
      !!validateStandardString(t, "set language", "the language", !0) && this.Ss.zu("language", t)
    );
  }
  setEmailNotificationSubscriptionType(t) {
    return (
      !!validateValueIsFromEnum(
        User.NotificationSubscriptionTypes,
        t,
        `Email notification setting "${t}" is not a valid subscription type.`,
        "User.NotificationSubscriptionTypes",
      ) && this.Ss.zu("email_subscribe", t)
    );
  }
  setPushNotificationSubscriptionType(t) {
    return (
      !!validateValueIsFromEnum(
        User.NotificationSubscriptionTypes,
        t,
        `Push notification setting "${t}" is not a valid subscription type.`,
        "User.NotificationSubscriptionTypes",
      ) && this.Ss.zu("push_subscribe", t)
    );
  }
  setPhoneNumber(t) {
    return (
      !!validateStandardString(t, "set phone number", "the phoneNumber", !0) &&
      (null === t || t.match(User.Hu)
        ? this.Ss.zu("phone", t)
        : (b$1.error(`Cannot set phone number - "${t}" did not pass validation.`),
          !1))
    );
  }
  setLastKnownLocation(t, e, r, s, n) {
    return null == t || null == e
      ? (b$1.error(
          "Cannot set last-known location - latitude and longitude are required.",
        ),
        !1)
      : ((t = parseFloat(t.toString())),
        (e = parseFloat(e.toString())),
        null != r && (r = parseFloat(r.toString())),
        null != s && (s = parseFloat(s.toString())),
        null != n && (n = parseFloat(n.toString())),
        isNaN(t) ||
        isNaN(e) ||
        (null != r && isNaN(r)) ||
        (null != s && isNaN(s)) ||
        (null != n && isNaN(n))
          ? (b$1.error(
              "Cannot set last-known location - all supplied parameters must be numeric.",
            ),
            !1)
          : t > 90 || t < -90 || e > 180 || e < -180
          ? (b$1.error(
              "Cannot set last-known location - latitude and longitude are bounded by ±90 and ±180 respectively.",
            ),
            !1)
          : (null != r && r < 0) || (null != n && n < 0)
          ? (b$1.error(
              "Cannot set last-known location - accuracy and altitudeAccuracy may not be negative.",
            ),
            !1)
          : this.Ru.setLastKnownLocation(this.Ss.getUserId(), t, e, s, r, n)
              .lt);
  }
  setCustomUserAttribute(t, e, r) {
    if (!validateCustomAttributeKey(t)) return !1;
    const s = (e) => {
      const [r] = validateCustomProperties(
        e,
        CoreStrings.Ku,
        "attribute value",
        `set custom user attribute "${t}"`,
        "custom user attribute",
      );
      return r;
    };
    if (isArray(e)) {
      const [r, n] = validateCustomAttributeArrayType(t, e);
      if (!r && !n && 0 !== e.length) return !1;
      if (r || 0 === e.length) return this.Ru.Mu(p.Yu, t, e).lt;
      for (const t of e) if (!s(t)) return !1;
    } else if (isObject$1(e)) {
      if (!s(e)) return !1;
      if (r) return this.Ru.Mu(p.Vu, t, e).lt;
    } else {
      if (!(void 0 !== e && validatePropertyType(e))) return !1;
      if (
        (isDate(e) && (e = toValidBackendTimeString(e)),
        "string" == typeof e &&
          !validateCustomString(
            e,
            `set custom user attribute "${t}"`,
            "the element in the given array",
          ))
      )
        return !1;
    }
    return this.Ss.setCustomUserAttribute(t, e);
  }
  addToCustomAttributeArray(t, e) {
    return (
      !!validateCustomString(t, "add to custom user attribute array", "the given key") &&
      !(
        null != e &&
        !validateCustomString(e, "add to custom user attribute array", "the given value")
      ) &&
      this.Ru.Mu(p.Qu, t, e).lt
    );
  }
  removeFromCustomAttributeArray(t, e) {
    return (
      !!validateCustomString(t, "remove from custom user attribute array", "the given key") &&
      !(
        null != e &&
        !validateCustomString(e, "remove from custom user attribute array", "the given value")
      ) &&
      this.Ru.Mu(p.Xu, t, e).lt
    );
  }
  incrementCustomUserAttribute(t, e) {
    if (!validateCustomString(t, "increment custom user attribute", "the given key")) return !1;
    null == e && (e = 1);
    const r = parseInt(e.toString());
    return isNaN(r) || r !== parseFloat(e.toString())
      ? (b$1.error(
          `Cannot increment custom user attribute because the given incrementValue "${e}" is not an integer.`,
        ),
        !1)
      : this.Ru.Mu(p.Zu, t, r).lt;
  }
  setCustomLocationAttribute(t, e, r) {
    return (
      !!validateCustomString(t, "set custom location attribute", "the given key") &&
      ((null !== e || null !== r) &&
      ((e = null != e ? parseFloat(e.toString()) : null),
      (r = null != r ? parseFloat(r.toString()) : null),
      (null == e && null != r) ||
        (null != e && null == r) ||
        (null != e && (isNaN(e) || e > 90 || e < -90)) ||
        (null != r && (isNaN(r) || r > 180 || r < -180)))
        ? (b$1.error(
            "Received invalid values for latitude and/or longitude. Latitude and longitude are bounded by ±90 and ±180 respectively, or must both be null for removal.",
          ),
          !1)
        : this.Ru.Na(t, e, r).lt)
    );
  }
  addToSubscriptionGroup(t) {
    return !validateStandardString(
      t,
      "add user to subscription group",
      "subscription group ID",
      !1,
    ) || t.length <= 0
      ? (b$1.error(
          "addToSubscriptionGroup requires a non-empty subscription group ID",
        ),
        !1)
      : this.Ru.va(t, User.Ia.SUBSCRIBED).lt;
  }
  removeFromSubscriptionGroup(t) {
    return !validateStandardString(
      t,
      "remove user from subscription group",
      "subscription group ID",
      !1,
    ) || t.length <= 0
      ? (b$1.error(
          "removeFromSubscriptionGroup requires a non-empty subscription group ID",
        ),
        !1)
      : this.Ru.va(t, User.Ia.UNSUBSCRIBED).lt;
  }
  setLineId(t) {
    return validateStandardString(t, "set LINE user ID", "the ID", !0) &&
      0 !== (null == t ? void 0 : t.length)
      ? t && t.length > User.Ca
        ? (b$1.error(
            `Rejected LINE user ID ${t} because it is longer than ${User.Ca} characters.`,
          ),
          !1)
        : this.Ss.zu("native_line_id", t)
      : (b$1.error("setLineId requires a non-empty ID"), !1);
  }
  gu(t, e, r, s, n) {
    this.Ss.gu(t, e, r, s, n), this.Ru.Ea();
  }
  wu(t) {
    this.Ss.wu(t);
  }
}
(User.Genders = {
  MALE: "m",
  FEMALE: "f",
  OTHER: "o",
  UNKNOWN: "u",
  NOT_APPLICABLE: "n",
  PREFER_NOT_TO_SAY: "p",
}),
  (User.NotificationSubscriptionTypes = {
    OPTED_IN: "opted_in",
    SUBSCRIBED: "subscribed",
    UNSUBSCRIBED: "unsubscribed",
  }),
  (User.Hu = /^[0-9 .\\(\\)\\+\\-]+$/),
  (User.Ia = { SUBSCRIBED: "subscribed", UNSUBSCRIBED: "unsubscribed" }),
  (User.Sa = "user_id"),
  (User.Bu = "custom"),
  (User.br = 997),
  (User.Ca = 33);

class Ve {
  constructor() {}
  ef() {}
  ff() {}
  Fa(t) {}
  static nf(t, e) {
    if (t && e)
      if (((t = t.toLowerCase()), isArray(e.cf))) {
        for (let r = 0; r < e.cf.length; r++)
          if (-1 !== t.indexOf(e.cf[r].toLowerCase())) return e.identity;
      } else if (-1 !== t.indexOf(e.cf.toLowerCase())) return e.identity;
  }
}

const Browsers = {
  rO: "Chrome",
  eO: "Edge",
  oO: "Opera",
  Bg: "Safari",
  OO: "Firefox",
  Sg: "ChatGPTBrowser",
};
const OperatingSystems = {
  Dg: "Android",
  co: "iOS",
  Pg: "Mac",
  kg: "Windows",
};

class Si extends Ve {
  constructor() {
    if (
      (super(),
      (this.userAgentData = navigator.userAgentData),
      (this.browser = null),
      (this.version = null),
      this.userAgentData)
    ) {
      const t = this.Bc();
      (this.browser = t.browser || "Unknown Browser"),
        (this.version = t.version || "Unknown Version");
    }
    this.OS = null;
  }
  ef() {
    return this.browser;
  }
  ff() {
    return this.version;
  }
  Fa(t) {
    if (this.OS) return Promise.resolve(this.OS);
    const s = (s) => {
      for (let r = 0; r < t.length; r++) {
        const i = Si.nf(s, t[r]);
        if (i) return (this.OS = i), this.OS;
      }
      return s;
    };
    return this.userAgentData.platform
      ? Promise.resolve(s(this.userAgentData.platform))
      : this.getHighEntropyValues()
          .then((t) => (t.platform ? s(t.platform) : navigator.platform))
          .catch(() => navigator.platform);
  }
  Bc() {
    const t = {},
      s = this.userAgentData.brands;
    if (s && s.length)
      for (const r of s) {
        const s = this.Vc(Browsers),
          i = r.brand.match(s);
        if (i && i.length > 0) {
          (t.browser = i[0]), (t.version = r.version);
          break;
        }
      }
    return t;
  }
  Vc(t) {
    const s = [];
    for (const r in t) {
      const i = r;
      s.push(t[i]);
    }
    return new RegExp("(" + s.join("|") + ")", "i");
  }
  getHighEntropyValues() {
    return this.userAgentData.getHighEntropyValues
      ? this.userAgentData.getHighEntropyValues(["platform"])
      : Promise.reject();
  }
}

class vi extends Ve {
  constructor() {
    super(), (this.Sd = vi.Bc(navigator.userAgent || ""));
  }
  ef() {
    return this.Sd[0] || "Unknown Browser";
  }
  ff() {
    return this.Sd[1] || "Unknown Version";
  }
  Fa(r) {
    for (let n = 0; n < r.length; n++) {
      const e = r[n].string;
      let i = vi.nf(e, r[n]);
      if (i)
        return (
          i === OperatingSystems.Pg && navigator.maxTouchPoints > 1 && (i = OperatingSystems.co),
          Promise.resolve(i)
        );
    }
    return Promise.resolve(navigator.platform);
  }
  static Bc(r) {
    let n,
      e =
        r.match(
          /(samsungbrowser|tizen|roku|konqueror|icab|crios|opera|ucbrowser|chatgptbrowser|chrome|safari|firefox|camino|msie|trident(?=\/))\/?\s*(\.?\d+(\.\d+)*)/i,
        ) || [];
    if (-1 !== r.indexOf("(Web0S; Linux/SmartTV)"))
      return ["LG Smart TV", null];
    if (-1 !== r.indexOf("CrKey")) return ["Chromecast", null];
    if (
      -1 !== r.indexOf("BRAVIA") ||
      -1 !== r.indexOf("SonyCEBrowser") ||
      -1 !== r.indexOf("SonyDTV")
    )
      return ["Sony Smart TV", null];
    if (-1 !== r.indexOf("PhilipsTV")) return ["Philips Smart TV", null];
    if (r.match(/\b(Roku)\b/)) return ["Roku", null];
    if (r.match(/\bAFTM\b/)) return ["Amazon Fire Stick", null];
    if (e[1] === Browsers.rO) {
      if (r.includes(Browsers.Sg)) return [Browsers.Sg, e[2]];
      if (
        ((n = r.match(/\b(OPR|Edge|EdgA|Edg|UCBrowser)\/(\.?\d+(\.\d+)*)/)),
        null != n)
      )
        return (
          (n = n.slice(1)),
          (n[0] = n[0].replace("OPR", Browsers.oO)),
          (n[0] = n[0].replace("EdgA", Browsers.eO)),
          "Edg" === n[0] && (n[0] = Browsers.eO),
          [n[0], n[1]]
        );
    }
    if (
      e[1] === Browsers.Bg &&
      ((n = r.match(/\b(EdgiOS)\/(\.?\d+(\.\d+)*)/)), null != n)
    )
      return (
        (n = n.slice(1)), (n[0] = n[0].replace("EdgiOS", Browsers.eO)), [n[0], n[1]]
      );
    if (
      ((e = e[2] ? [e[1], e[2]] : [null, null]),
      e[0] === Browsers.Bg &&
        null != (n = r.match(/version\/(\.?\d+(\.\d+)*)/i)) &&
        e.splice(1, 1, n[1]),
      null != (n = r.match(/\b(UCBrowser)\/(\.?\d+(\.\d+)*)/)) &&
        e.splice(1, 1, n[2]),
      e[0] === Browsers.oO && null != (n = r.match(/mini\/(\.?\d+(\.\d+)*)/i)))
    )
      return ["Opera Mini", n[1] || ""];
    if (e[0]) {
      const r = e[0].toLowerCase();
      "crios" === r && (e[0] = Browsers.rO),
        "tizen" === r && ((e[0] = "Samsung Smart TV"), (e[1] = null)),
        "samsungbrowser" === r && (e[0] = "Samsung Browser");
    }
    return e;
  }
}

class xi {
  constructor() {
    let t;
    (t =
      navigator.userAgent.toLowerCase().includes(Browsers.Sg.toLowerCase()) ||
      !navigator.userAgentData
        ? vi
        : Si),
      (this.vg = new t()),
      (this.userAgent = navigator.userAgent),
      (this.browser = this.vg.ef()),
      (this.version = this.vg.ff()),
      (this.OS = null),
      this.Fa().then((t) => (this.OS = t));
    const i = navigator;
    (this.language = (
      i.userLanguage ||
      i.language ||
      i.browserLanguage ||
      i.systemLanguage ||
      ""
    ).toLowerCase()),
      (this.il = xi.xg(this.userAgent));
  }
  bS() {
    return this.browser === Browsers.Bg;
  }
  Aa() {
    return this.OS || null;
  }
  Fa() {
    return this.OS
      ? Promise.resolve(this.OS)
      : this.vg.Fa(xi.Og).then((t) => ((this.OS = t), t));
  }
  static xg(t) {
    t = t.toLowerCase();
    const i = [
      "bot",
      "spider",
      "slurp",
      "yandex",
      "facebookexternalhit",
      "sogou",
      "ia_archiver",
      "https://github.com/prerender/prerender",
      "aolbuild",
      "bingpreview",
      "mediapartners-google",
      "teoma",
      "taiko",
      "facebookexternalhit",
      "facebookcatalog",
      "meta-webindexer",
      "meta-externalads",
      "meta-externalagent",
      "meta-externalfetcher",
    ];
    for (let n = 0; n < i.length; n++) if (-1 !== t.indexOf(i[n])) return !0;
    return !1;
  }
}
xi.Og = [
  { string: navigator.platform, cf: "Win", identity: OperatingSystems.kg },
  { string: navigator.platform, cf: "Mac", identity: OperatingSystems.Pg },
  { string: navigator.platform, cf: "BlackBerry", identity: "BlackBerry" },
  { string: navigator.platform, cf: "FreeBSD", identity: "FreeBSD" },
  { string: navigator.platform, cf: "OpenBSD", identity: "OpenBSD" },
  { string: navigator.platform, cf: "Nintendo", identity: "Nintendo" },
  { string: navigator.platform, cf: "SunOS", identity: "SunOS" },
  { string: navigator.platform, cf: "PlayStation", identity: "PlayStation" },
  { string: navigator.platform, cf: "X11", identity: "X11" },
  {
    string: navigator.userAgent,
    cf: ["iPhone", "iPad", "iPod"],
    identity: OperatingSystems.co,
  },
  { string: navigator.platform, cf: "Pike v", identity: OperatingSystems.co },
  { string: navigator.userAgent, cf: ["Web0S"], identity: "WebOS" },
  { string: navigator.userAgent, cf: "Tizen", identity: "Tizen" },
  { string: navigator.userAgent, cf: "Coolita", identity: "Other Smart TV" },
  { string: navigator.userAgent, cf: "WhaleTV", identity: "Other Smart TV" },
  {
    string: navigator.platform,
    cf: ["Linux armv7l", "Android"],
    identity: OperatingSystems.Dg,
  },
  { string: navigator.userAgent, cf: ["Android"], identity: OperatingSystems.Dg },
  { string: navigator.platform, cf: "Linux", identity: "Linux" },
];
const ro = new xi();

const STORAGE_KEYS = {
  Ou: {
    Cu: "ab.storage.userId",
    Wh: "ab.storage.deviceId",
    um: "ab.storage.sessionId",
  },
  It: {
    ac: "ab.test",
    ZE: "ab.storage.events",
    $E: "ab.storage.attributes",
    tS: "ab.storage.attributes.anonymous_user",
    Ba: "ab.storage.device",
    Ka: "ab.storage.sdk_metadata",
    Pa: "ab.storage.session_id_for_cached_metadata",
    Uu: "ab.storage.pushToken",
    eS: "ab.storage.cardImpressions",
    sd: "ab.storage.serverConfig",
    sS: "ab.storage.triggers",
    rS: "ab.storage.triggers.ts",
    dm: "ab.storage.messagingSessionStart",
    bi: "ab.storage.cc",
    ji: "ab.storage.ccLastFullSync",
    yi: "ab.storage.ccLastCardUpdated",
    Ml: "ab.storage.globalRateLimitCurrentTokenCount",
    Ll: "ab.storage.dynamicRateLimitCurrentTokenCount",
    Zt: "ab.storage.ccClicks",
    ps: "ab.storage.ccImpressions",
    fs: "ab.storage.ccDismissals",
    oS: "ab.storage.lastDisplayedTriggerTimesById",
    nS: "ab.storage.lastDisplayedTriggerTime",
    aS: "ab.storage.triggerFireInstancesById",
    fh: "ab.storage.signature",
    iS: "ab.storage.brazeSyncRetryCount",
    zi: "ab.storage.sdkVersion",
    Fo: "ab.storage.ff",
    jo: "ab.storage.ffImpressions",
    qo: "ab.storage.ffLastRefreshAt",
    Do: "ab.storage.ff.sessionId",
    ES: "ab.storage.lastReqToEndpoint",
    SS: "ab.storage.requestAttempts",
    pa: "ab.storage.deferredIam",
    Bl: "ab.storage.lastSdkReq",
    lS: "ab.storage.alias",
    Tt: "ab.storage.banners",
    At: "ab.storage.banners.impressions",
    Xt: "ab.storage.banners.dismissals",
    kt: "ab.storage.banners.sessionId",
    Ht: "ab.storage.banners.lastRequestedTime",
    Xe: "ab.storage.dust.mite",
    Ye: "ab.storage.dust.host",
    Ze: "ab.storage.dust.auth",
    sn: "ab.storage.dust.expiration",
  },
  ce: "ab.optOut",
};
class ne {
  constructor(t, e) {
    (this._S = t), (this.uS = e), (this._S = t), (this.uS = e);
  }
  hl(t) {
    const e = keys(STORAGE_KEYS.Ou),
      s = new ne.le(t);
    for (const t of e) s.remove(STORAGE_KEYS.Ou[t]);
  }
  Iu(t, e) {
    let s = null;
    null != e && e instanceof _t && (s = e.qt()), this._S.store(t, s);
  }
  cS(t) {
    const e = this.$u(t);
    null != e && ((e.pm = new Date().valueOf()), this.Iu(t, e));
  }
  $u(t) {
    const e = this._S.wr(t),
      s = ((t) => {
        let e;
        try {
          e = JSON.parse(t);
        } catch (t) {
          e = null;
        }
        return e;
      })(e);
    let r;
    if (s) (r = _t._u(s) || null), r && this.Iu(t, r);
    else {
      const s = _t.TS(e);
      (r = _t._u(s) || null), s !== e && r && this.Iu(t, r);
    }
    return r;
  }
  jm(t) {
    this._S.remove(t);
  }
  ll() {
    const t = keys(STORAGE_KEYS.Ou);
    let e;
    for (const s of t)
      (e = this.$u(STORAGE_KEYS.Ou[s])),
        null != e && this.Iu(STORAGE_KEYS.Ou[s], e);
  }
  ol(t) {
    let e;
    if (null == t || 0 === t.length) return !1;
    e = isArray(t) ? t : [t];
    let s = this.uS.wr(STORAGE_KEYS.It.ZE);
    (null != s && isArray(s)) || (s = []);
    for (let t = 0; t < e.length; t++) s.push(e[t].qt());
    return this.uS.store(STORAGE_KEYS.It.ZE, s);
  }
  gm(t) {
    return null != t && this.ol([t]);
  }
  hS() {
    let t = this.uS.wr(STORAGE_KEYS.It.ZE);
    this.uS.remove(STORAGE_KEYS.It.ZE), null == t && (t = []);
    const e = [];
    let s = !1,
      r = null;
    if (isArray(t))
      for (let s = 0; s < t.length; s++)
        Ie.AS(t[s]) ? e.push(Ie._u(t[s])) : (r = s);
    else s = !0;
    if (s || null != r) {
      let o = "Stored events could not be deserialized as Events";
      s &&
        (o += ", was " + Object.prototype.toString.call(t) + " not an array"),
        null != r &&
          (o += ", value at index " + r + " does not look like an event"),
        (o +=
          ", serialized values were of type " +
          typeof t +
          ": " +
          JSON.stringify(t)),
        e.push(new Ie(null, p.Ya, new Date().valueOf(), null, { e: o }));
    }
    return e;
  }
  Pt(t, e) {
    return (
      !!validateValueIsFromEnum(
        STORAGE_KEYS.It,
        t,
        "StorageManager cannot store object.",
        "STORAGE_KEYS.OBJECTS",
      ) && this.uS.store(t, e)
    );
  }
  St(t) {
    return (
      !!validateValueIsFromEnum(
        STORAGE_KEYS.It,
        t,
        "StorageManager cannot retrieve object.",
        "STORAGE_KEYS.OBJECTS",
      ) && this.uS.wr(t)
    );
  }
  Vt(t) {
    return (
      !!validateValueIsFromEnum(
        STORAGE_KEYS.It,
        t,
        "StorageManager cannot remove object.",
        "STORAGE_KEYS.OBJECTS",
      ) && (this.uS.remove(t), !0)
    );
  }
  clearData() {
    const t = keys(STORAGE_KEYS.Ou),
      e = keys(STORAGE_KEYS.It);
    for (let e = 0; e < t.length; e++) {
      const s = t[e];
      this._S.remove(STORAGE_KEYS.Ou[s]);
    }
    for (let t = 0; t < e.length; t++) {
      const s = e[t];
      this.uS.remove(STORAGE_KEYS.It[s]);
    }
  }
  gS(t) {
    return t || STORAGE_KEYS.It.tS;
  }
  vl(t) {
    let e = this.uS.wr(STORAGE_KEYS.It.$E);
    null == e && (e = {});
    const s = this.gS(t[User.Sa]),
      r = e[s];
    for (const o in t)
      o !== User.Sa &&
        (null == e[s] || (r && null == r[o])) &&
        this.Eu(t[User.Sa], o, t[o]);
  }
  Eu(t, e, s) {
    let r = this.uS.wr(STORAGE_KEYS.It.$E);
    null == r && (r = {});
    const o = this.gS(t);
    let n = r[o];
    if (
      (null == n && ((n = {}), null != t && (n[User.Sa] = t)), e === User.Bu)
    ) {
      null == n[e] && (n[e] = {});
      for (const t in s) n[e][t] = s[t];
    } else n[e] = s;
    return (r[o] = n), this.uS.store(STORAGE_KEYS.It.$E, r);
  }
  RS() {
    const t = this.uS.wr(STORAGE_KEYS.It.$E);
    this.uS.remove(STORAGE_KEYS.It.$E);
    const e = [];
    for (const s in t) null != t[s] && e.push(t[s]);
    return e;
  }
  Lu(t) {
    const e = this.uS.wr(STORAGE_KEYS.It.$E);
    if (null != e) {
      const s = this.gS(null),
        r = e[s];
      null != r &&
        ((e[s] = void 0),
        this.uS.store(STORAGE_KEYS.It.$E, e),
        (r[User.Sa] = t),
        this.vl(r));
    }
    const s = this.$u(STORAGE_KEYS.Ou.um);
    let r = null;
    null != s && (r = s.Tu);
    const o = this.hS();
    if (null != o)
      for (let e = 0; e < o.length; e++) {
        const s = o[e];
        null == s.userId && s.sessionId == r && (s.userId = t), this.gm(s);
      }
  }
  dS() {
    return this.uS.IS;
  }
}
(ne.ec = class {
  constructor(t) {
    (this.tu = t), (this.tu = t), (this.IS = ro.bS() ? 3 : 10);
  }
  fS(t) {
    return t + "." + this.tu;
  }
  store(t, e) {
    const s = { v: e };
    try {
      return localStorage.setItem(this.fS(t), JSON.stringify(s)), !0;
    } catch (t) {
      return b$1.info("Storage failure: " + getErrorMessage(t)), !1;
    }
  }
  wr(t) {
    try {
      let e = null;
      const s = localStorage.getItem(this.fS(t));
      return null != s && (e = JSON.parse(s)), null == e ? null : e.v;
    } catch (t) {
      return b$1.info("Storage retrieval failure: " + getErrorMessage(t)), null;
    }
  }
  remove(t) {
    try {
      localStorage.removeItem(this.fS(t));
    } catch (t) {
      return b$1.info("Storage removal failure: " + getErrorMessage(t)), !1;
    }
  }
}),
  (ne.rc = class {
    constructor() {
      (this.mS = {}), (this.KS = 5242880), (this.IS = 3);
    }
    store(t, e) {
      const s = { value: e },
        r = this.YS(e);
      return r > this.KS
        ? (b$1.info(
            "Storage failure: object is ≈" +
              r +
              " bytes which is greater than the max of " +
              this.KS,
          ),
          !1)
        : ((this.mS[t] = s), !0);
    }
    YS(t) {
      const e = [],
        s = [t];
      let r = 0;
      for (; s.length; ) {
        const t = s.pop();
        if ("boolean" == typeof t) r += 4;
        else if ("string" == typeof t) r += 2 * t.length;
        else if ("number" == typeof t) r += 8;
        else if ("object" == typeof t && -1 === e.indexOf(t)) {
          let r, o;
          e.push(t);
          for (const e in t) (o = t), (r = e), s.push(o[r]);
        }
      }
      return r;
    }
    wr(t) {
      const e = this.mS[t];
      return null == e ? null : e.value;
    }
    remove(t) {
      this.mS[t] = null;
    }
  }),
  (ne.le = class {
    constructor(t, e, s) {
      (this.tu = t), (this.NS = e), (this.tu = t), (this.DS = this.GS());
      const r = "number" == typeof s && s > 0 ? s : 400;
      (this.CS = 24 * r * 60), (this.MS = {}), (this.NS = !!e);
    }
    fS(t) {
      return null != this.tu ? t + "." + this.tu : t;
    }
    GS() {
      let t = 0,
        e = document.location.hostname;
      const s = e.split("."),
        r = "ab._gd";
      for (; t < s.length - 1 && -1 === document.cookie.indexOf(r + "=" + r); )
        t++,
          (e = "." + s.slice(-1 - t).join(".")),
          (document.cookie = r + "=" + r + ";domain=" + e + ";");
      return (
        (document.cookie =
          r + "=;expires=" + new Date(0).toUTCString() + ";domain=" + e + ";"),
        e
      );
    }
    me() {
      const t = new Date();
      return t.setTime(t.getTime() + 60 * this.CS * 1e3), t.getFullYear();
    }
    pS() {
      const t = values(STORAGE_KEYS.Ou),
        e = document.cookie.split(";");
      for (let s = 0; s < e.length; s++) {
        let r = e[s];
        for (; " " === r.charAt(0); ) r = r.substring(1);
        let o = !1;
        for (let e = 0; e < t.length; e++)
          if (0 === r.indexOf(t[e])) {
            o = !0;
            break;
          }
        if (o) {
          const t = r.split("=")[0];
          -1 === t.indexOf("." + this.tu) && this.vS(t);
        }
      }
    }
    store(t, e) {
      this.pS();
      const s = this.fS(t),
        r = new Date();
      r.setTime(r.getTime() + 60 * this.CS * 1e3);
      const o = "expires=" + r.toUTCString(),
        n = "domain=" + this.DS;
      let a;
      a = this.NS ? e : encodeURIComponent(e);
      const i = s + "=" + a + ";" + o + ";" + n + ";path=/";
      if (i.length >= 4093)
        return (
          b$1.info(
            "Storage failure: string is " +
              i.length +
              " chars which is too large to store as a cookie.",
          ),
          (this.MS[s] = !0),
          this.vS(s),
          !1
        );
      try {
        document.cookie = i;
      } catch (t) {
        return b$1.info("Storage failure: " + getErrorMessage(t)), (this.MS[s] = !0), !1;
      }
      const E = this.NS ? String(a) : decodeURIComponent(a);
      return this.US(s) !== E
        ? (b$1.info(
            `Storage failure: unable to verify cookie write for "${s}". Falling back to other storage.`,
          ),
          (this.MS[s] = !0),
          this.vS(s),
          !1)
        : (delete this.MS[s], !0);
    }
    wr(t) {
      const e = this.fS(t);
      return this.MS[e] ? null : this.US(e);
    }
    US(t) {
      const e = [],
        s = t + "=",
        r = document.cookie.split(";");
      for (let o = 0; o < r.length; o++) {
        let n = r[o];
        for (; " " === n.charAt(0); ) n = n.substring(1);
        if (0 === n.indexOf(s))
          try {
            let t;
            (t = this.NS
              ? n.substring(s.length, n.length)
              : decodeURIComponent(n.substring(s.length, n.length))),
              e.push(t);
          } catch (e) {
            return (
              b$1.info("Storage retrieval failure: " + getErrorMessage(e)), this.vS(t), null
            );
          }
      }
      return e.length > 0 ? e[e.length - 1] : null;
    }
    remove(t) {
      this.vS(this.fS(t));
    }
    vS(t) {
      const e = t + "=;expires=" + new Date(0).toUTCString();
      (document.cookie = e), (document.cookie = e + ";path=/");
      const s = e + ";domain=" + this.DS;
      (document.cookie = s), (document.cookie = s + ";path=/");
    }
  }),
  (ne.tc = class {
    constructor(t, e, s, r) {
      (this.tu = t),
        (this.yS = []),
        e && this.yS.push(new ne.le(t, void 0, r)),
        s && this.yS.push(new ne.ec(t)),
        this.yS.push(new ne.rc());
    }
    store(t, e) {
      let s = !0;
      for (let r = 0; r < this.yS.length; r++) s = this.yS[r].store(t, e) && s;
      return s;
    }
    wr(t) {
      for (let e = 0; e < this.yS.length; e++) {
        const s = this.yS[e].wr(t);
        if (null != s) return s;
      }
      return null;
    }
    remove(t) {
      new ne.le(this.tu).remove(t);
      for (let e = 0; e < this.yS.length; e++) this.yS[e].remove(t);
    }
  });

class Gt {
  constructor(t, i, s) {
    (this.j = t),
      (this.gh = i),
      (this.bh = s),
      (this.j = t),
      (this.gh = i || !1),
      (this.bh = s),
      (this.Sh = new f()),
      (this.Ah = 0),
      (this.ph = 1);
  }
  Fh() {
    return this.gh;
  }
  kh() {
    return this.j.St(STORAGE_KEYS.It.fh);
  }
  setSdkAuthenticationSignature(t) {
    const i = this.kh();
    this.j.Pt(STORAGE_KEYS.It.fh, t);
    const e = et._s.Xs;
    new et(e, b$1).setItem(e.Ws.wh, this.ph, t), i !== t && this.ct();
  }
  jh() {
    this.j.Vt(STORAGE_KEYS.It.fh);
    const t = et._s.Xs;
    new et(t, b$1).ge(t.Ws.wh, this.ph);
  }
  subscribeToSdkAuthenticationFailures(t) {
    return this.bh.Ut(t);
  }
  Ch(t) {
    this.bh.A(t);
  }
  xh() {
    this.Sh.removeAllSubscriptions();
  }
  Eh() {
    this.Ah += 1;
  }
  Ih() {
    return this.Ah;
  }
  ct() {
    this.Ah = 0;
  }
}

class t {
  constructor() {}
  q(a) {}
  changeUser(a = !1) {}
  clearData(a = !1) {}
}

class Se {
  constructor(s) {
    (this.id = s), (this.id = s);
  }
  ta() {
    const s = {};
    return (
      null != this.browser && (s.browser = this.browser),
      null != this.Oa && (s.browser_version = this.Oa),
      null != this.os && (s.os_version = this.os),
      null != this.resolution && (s.resolution = this.resolution),
      null != this.language && (s.locale = this.language),
      null != this.timeZone && (s.time_zone = this.timeZone),
      null != this.userAgent && (s.user_agent = this.userAgent),
      s
    );
  }
}

var DeviceProperties = {
  BROWSER: "browser",
  BROWSER_VERSION: "browserVersion",
  OS: "os",
  RESOLUTION: "resolution",
  LANGUAGE: "language",
  TIME_ZONE: "timeZone",
  USER_AGENT: "userAgent",
};

class Pt {
  constructor(t, e) {
    (this.j = t),
      (this.Da = e),
      (this.j = t),
      null == e && (e = values(DeviceProperties)),
      (this.Da = e);
  }
  ve(t = !0) {
    let e = this.j.$u(STORAGE_KEYS.Ou.Wh);
    null == e && ((e = new _t(V$1.de())), t && this.j.Iu(STORAGE_KEYS.Ou.Wh, e));
    const r = new Se(e.Tu);
    for (let t = 0; t < this.Da.length; t++) {
      switch (this.Da[t]) {
        case DeviceProperties.BROWSER:
          r.browser = ro.browser;
          break;
        case DeviceProperties.BROWSER_VERSION:
          r.Oa = ro.version;
          break;
        case DeviceProperties.OS:
          r.os = this.Fa();
          break;
        case DeviceProperties.RESOLUTION:
          r.Ga = screen.width + "x" + screen.height;
          break;
        case DeviceProperties.LANGUAGE:
          r.language = ro.language;
          break;
        case DeviceProperties.TIME_ZONE:
          r.timeZone = this.Ja(new Date());
          break;
        case DeviceProperties.USER_AGENT:
          r.userAgent = ro.userAgent;
      }
    }
    return r;
  }
  Fa() {
    if (ro.Aa()) return ro.Aa();
    const t = this.j.St(STORAGE_KEYS.It.Ba);
    return t && t.os_version ? t.os_version : ro.Fa();
  }
  Ja(t) {
    let e = !1;
    if ("undefined" != typeof Intl && "function" == typeof Intl.DateTimeFormat)
      try {
        if ("function" == typeof Intl.DateTimeFormat().resolvedOptions) {
          const t = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (null != t && "" !== t) return t;
        }
      } catch (t) {
        b$1.info(
          "Intl.DateTimeFormat threw an error, cannot detect user's time zone:" +
            getErrorMessage(t),
        ),
          (e = !0);
      }
    if (e) return "";
    const r = t.getTimezoneOffset();
    return this.Ha(r);
  }
  Ha(t) {
    const e = Math.trunc(t / 60),
      r = Math.trunc(t % 60);
    let s = "GMT";
    return (
      0 !== t &&
        ((s += t < 0 ? "+" : "-"),
        (s +=
          ("00" + Math.abs(e)).slice(-2) +
          ":" +
          ("00" + Math.abs(r)).slice(-2))),
      s
    );
  }
}

var Ne = {
  Va: "invalid_api_key",
  Za: "blacklisted",
  dl: "no_device_identifier",
  Qa: "invalid_json_response",
  Wa: "empty_response",
  __: "sdk_auth_error",
};

const h = {
  it: {
    pn: "data",
    Mi: "content_cards/sync",
    Co: "feature_flags/sync",
    Yo: "template",
    st: "banners/sync",
  },
  Pl: (t) => (null == t ? void 0 : t.St(STORAGE_KEYS.It.ES)),
  Am: (t) => (null == t ? void 0 : t.St(STORAGE_KEYS.It.SS)),
  Rm: (t, e) => {
    null == t || t.Pt(STORAGE_KEYS.It.ES, e);
  },
  qm: (t, e) => {
    null == t || t.Pt(STORAGE_KEYS.It.SS, e);
  },
  ql: (t, e) => {
    if (!t || !e) return -1;
    const s = h.Pl(t);
    if (null == s) return -1;
    const n = s[e];
    return null == n || isNaN(n) ? -1 : n;
  },
  Al: (t, e) => {
    let s = REQUEST_ATTEMPT_DEFAULT;
    if (!t || !e) return s;
    const n = h.Am(t);
    return null == n ? s : ((s = n[e]), null == s || isNaN(s) ? REQUEST_ATTEMPT_DEFAULT : s);
  },
  nt: (t, e, s) => {
    if (!t || !e) return;
    let n = h.Pl(t);
    null == n && (n = {}), (n[e] = s), h.Rm(t, n);
  },
  Dl: (t, e, s) => {
    if (!t || !e) return;
    let n = h.Am(t);
    null == n && (n = {}), (n[e] = s), h.qm(t, n);
  },
  Ji: (t, e) => {
    t && e && h.Dl(t, e, REQUEST_ATTEMPT_DEFAULT);
  },
  zl: (t, e) => {
    if (!t || !e) return;
    const s = h.Al(t, e);
    h.Dl(t, e, s + 1);
  },
};

const l = {
  ot: (t) => {
    let e, o;
    try {
      const r = () => {
        b$1.error("This browser does not have any supported ajax options!");
      };
      let n = !1;
      if ((window.XMLHttpRequest && (n = !0), !n)) return void r();
      e = new XMLHttpRequest();
      const s = (o) => {
        "function" == typeof t.error && t.error(e.status),
          "function" == typeof t.ft && t.ft(!1, o);
      };
      (e.onload = () => {
        let o = !1;
        if (4 !== e.readyState) return;
        o = (e.status >= 200 && e.status < 300) || 304 === e.status;
        const r = e.getAllResponseHeaders();
        if (o) {
          if ("function" == typeof t.lt) {
            let o;
            try {
              o = JSON.parse(e.responseText);
            } catch (o) {
              const n = {
                error: "" === e.responseText ? Ne.Wa : Ne.Qa,
                response: e.responseText,
              };
              (0, t.lt)(n, r);
            }
            o && t.lt(o, r);
          }
          "function" == typeof t.ft && t.ft(!0, r);
        } else s(r);
      }),
        (e.onerror = () => {
          s(e.getAllResponseHeaders());
        }),
        (e.ontimeout = () => {
          s();
        }),
        (o = JSON.stringify(t.data)),
        e.open("POST", t.url, !0),
        e.setRequestHeader("Content-type", "application/json"),
        e.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      const i = t.headers || [];
      for (const t of i) e.setRequestHeader(t[0], t[1]);
      e.send(o);
    } catch (t) {
      b$1.error(`Network request error: ${getErrorMessage(t)}`);
    }
  },
};
const readResponseHeaders = (t) => {
  const e = {},
    o = t.toString().split("\r\n");
  if (!o) return e;
  let r, n;
  for (const t of o)
    t &&
      ((r = t.slice(0, t.indexOf(":")).toLowerCase().trim()),
      (n = t.slice(t.indexOf(":") + 1).trim()),
      (e[r] = n));
  return e;
};

class Vt {
  constructor(t, e, i, s, r, n, o, a, h, u, l, c) {
    (this.eu = t),
      (this.j = e),
      (this.Gh = i),
      (this.Ss = s),
      (this.C = r),
      (this.h = n),
      (this.tu = o),
      (this.Yh = a),
      (this.Vh = h),
      (this.Kh = u),
      (this.appVersion = l),
      (this.Ra = c),
      (this.Xa = (t) => (null == t ? "" : `${t} `)),
      (this.eu = t),
      (this.j = e),
      (this.Gh = i),
      (this.Ss = s),
      (this.C = r),
      (this.h = n),
      (this.tu = o),
      (this.Yh = a),
      (this.Vh = h),
      (this.Kh = u),
      (this.appVersion = l),
      (this.Ra = c),
      (this.$a = ["npm"]),
      (this.La = {});
  }
  Z(t, e = !1, i = !1) {
    const r = this.eu.ve(!i),
      n = r.ta(),
      o = this.j.St(STORAGE_KEYS.It.Ba);
    isEqual(o, n) || (t.device = n),
      (t.api_key = this.tu),
      (t.time = convertMsToSeconds(new Date().valueOf(), !0));
    const a = this.j.St(STORAGE_KEYS.It.Ka) || [],
      h = this.j.St(STORAGE_KEYS.It.Pa) || "";
    this.$a.length > 0 &&
      (!isEqual(a, this.$a) || h !== this.C.$t()) &&
      (t.sdk_metadata = this.$a),
      (t.sdk_version = this.Vh),
      this.Kh && (t.sdk_flavor = this.Kh),
      (t.app_version = this.appVersion),
      (t.app_version_code = this.Ra),
      (t.device_id = r.id);
    const u = this.Ss.getUserId();
    if ((e && null !== u && (t.user_id = u), !u && !this.Gh.Fh())) {
      const e = getAlias(this.j);
      e && (t.alias = e);
    }
    return t;
  }
  ut(t, e, i) {
    const s = e.auth_error,
      r = e.error;
    if (!s && !r) return !0;
    if (s) {
      let e;
      this.Gh.Eh();
      const r = { errorCode: s.error_code };
      for (const t of i)
        isArray(t) && "X-Braze-Auth-Signature" === t[0] && (r.signature = t[1]);
      t.respond_with && t.respond_with.user_id
        ? (r.userId = t.respond_with.user_id)
        : t.user_id && (r.userId = t.user_id);
      const n = s.reason;
      return (
        n
          ? ((r.reason = n), (e = `due to ${n}`))
          : (e = `with error code ${s.error_code}.`),
        this.Gh.Fh() ||
          (e +=
            ' Please use the "enableSdkAuthentication" initialization option to enable authentication.'),
        b$1.error(`SDK Authentication failed ${e}`),
        this.Ua(t.events || [], t.attributes || []),
        this.Gh.Ch(r),
        !1
      );
    }
    if (r) {
      let i,
        s = r;
      switch (s) {
        case Ne.Wa:
          return (
            (i = "Received successful response with empty body."),
            v$1.Dt(p.Ya, { e: i }),
            b$1.info(i),
            !1
          );
        case Ne.Qa:
          return (
            (i = "Received successful response with invalid JSON"),
            v$1.Dt(p.Ya, { e: i + ": " + e.response }),
            b$1.info(i),
            !1
          );
        case Ne.Va:
          s = `The API key "${t.api_key}" is invalid for the baseUrl ${this.Yh}`;
          break;
        case Ne.Za:
          s =
            "Sorry, we are not currently accepting your requests. If you think this is in error, please contact us.";
          break;
        case Ne.dl:
          s =
            "No device identifier. Please contact Braze Technical Support for assistance.";
      }
      b$1.error("Backend error: " + s);
    }
    return !1;
  }
  fl(t, e, i) {
    return !!((t && 0 !== t.length) || (e && 0 !== e.length) || i);
  }
  ml(t, e, i, s = !1) {
    const r = [],
      n = (t) => t || "",
      o = n(this.Ss.getUserId());
    let a = this.Zo(t);
    const u = [],
      l = [];
    let c,
      d = null;
    if (e.length > 0) {
      const t = [];
      for (const i of e) {
        if (((c = i.ta()), this.Gh.Fh())) {
          if (o && !c.user_id) {
            d || (d = {}), d.events || (d.events = []), d.events.push(c);
            continue;
          }
          if (n(c.user_id) !== o) {
            l.push(c);
            continue;
          }
        }
        t.push(c);
      }
      t.length > 0 && (a.events = t);
    }
    if (i.length > 0) {
      const t = [];
      for (const e of i)
        e && (this.Gh.Fh() && n(e.user_id) !== o ? u.push(e) : t.push(e));
      t.length > 0 && (a.attributes = t);
    }
    if ((this.Ua(l, u), (a = this.Z(a, !1, s)), d)) {
      d = this.Z(d, !1, s);
      const t = { requestData: d, headers: this.tt(d, h.it.pn) };
      r.push(t);
    }
    if (a && !this.fl(a.events, a.attributes, t)) return d ? r : null;
    const f = { requestData: a, headers: this.tt(a, h.it.pn) };
    return r.push(f), r;
  }
  Ua(t, e) {
    if (t) {
      const e = [];
      for (const i of t) {
        const t = Ie.fromJson(i);
        (t.time = convertSecondsToMs(t.time)), e.push(t);
      }
      this.j.ol(e);
    }
    if (e) for (const t of e) this.j.vl(t);
  }
  dt(t, e) {
    let i = "HTTP error ";
    null != t && (i += t + " "), (i += e), b$1.error(i);
  }
  Rl(t) {
    return v$1.Dt(p.gl, { n: t });
  }
  Zo(t, e) {
    const i = {};
    t && (i.triggers = !0);
    const s = null != e ? e : this.Ss.getUserId();
    if ((s && (i.user_id = s), !i.user_id && !this.Gh.Fh())) {
      const t = getAlias(this.j);
      t && (i.alias = t);
    }
    return (i.config = { config_time: this.h.Qt() }), { respond_with: i };
  }
  bl(t) {
    const e = new Date().valueOf();
    let i = LAST_REQUEST_TO_ENDPOINT_MS_AGO_DEFAULT.toString();
    const s = h.ql(this.j, t);
    if (-1 !== s) {
      i = (e - s).toString();
    }
    return i;
  }
  tt(t, e, i = "sdk") {
    const s = [["X-Braze-Api-Key", this.tu]],
      r = this.bl(e);
    s.push(["X-Braze-Last-Req-Ms-Ago", r]);
    const n = h.Al(this.j, e).toString();
    s.push(["X-Braze-Req-Attempt", n]);
    let o = !1;
    if (
      (null != t.respond_with &&
        t.respond_with.triggers &&
        (s.push(["X-Braze-TriggersRequest", "true"]), (o = !0)),
      e === h.it.Mi)
    ) {
      s.push(["X-Braze-ContentCardsRequest", "true"]);
      let t = h.Al(this.j, h.it.Mi);
      (t && "client" !== i) || ((t = 1), h.Dl(this.j, h.it.Mi, t));
      const e = Math.max(0, t - 1);
      s.push(["BRAZE-SYNC-RETRY-COUNT", e.toString()]), (o = !0);
    }
    if (
      (e === h.it.Co &&
        (s.push(["X-Braze-FeatureFlagsRequest", "true"]), (o = !0)),
      o && s.push(["X-Braze-DataRequest", "true"]),
      "dust" === i && s.push(["X-Braze-Request-Initiated-By", "di"]),
      this.Gh.Fh())
    ) {
      const t = this.Gh.kh();
      null != t && s.push(["X-Braze-Auth-Signature", t]);
    }
    return s;
  }
  Tl(t, e, i, s) {
    if (this.La[s]) return;
    const r = window.setTimeout(() => {
      b$1.info(`Retrying rate limited ${this.Xa(s)}SDK request.`),
        this.et(e, i, s);
    }, t);
    this.La[s] = r;
  }
  fo() {
    for (const t in this.La) {
      const e = this.La[t];
      window.clearTimeout(e);
    }
    this.La = {};
  }
  et(t, e, i, r) {
    if (!this.kl(i))
      return (
        b$1.info(`${this.Xa(i)}SDK request being rate limited.`),
        void ("function" == typeof r && r())
      );
    const n = this.yl();
    if (!n.wl)
      return (
        this.Tl(n.Nl, t, e, i),
        void b$1.info(
          `${this.Xa(
            i,
          )}SDK request being rate limited. Request will be retried in ${Math.trunc(
            n.Nl / 1e3,
          )} seconds.`,
        )
      );
    this.j.Pt(STORAGE_KEYS.It.Bl, new Date().valueOf());
    const o = t.device;
    o && o.os_version instanceof Promise
      ? o.os_version.then((i) => {
          (t.device.os_version = i), e(n.Sl);
        })
      : e(n.Sl);
  }
  Cl(t) {
    const e = t ? readResponseHeaders(t) : null;
    if (!e || !e["retry-after"]) return null;
    const i = e["retry-after"];
    if (isNaN(i) && !isNaN(Date.parse(i)))
      return { type: "date", value: Date.parse(i) };
    if (!isNaN(parseFloat(i.toString())))
      return { type: "timestamp", value: 1e3 * parseFloat(i.toString()) };
    {
      const t =
        "Received unexpected value for retry-after header in /sync response";
      v$1.Dt(p.Ya, { e: t + ": " + i });
    }
    return null;
  }
  yt(t, e, i, s, r, n) {
    if (h.Al(this.j, i) >= MAX_RETRY_COUNT_PER_REQUEST) return;
    let o;
    n = n || 0;
    const a = this.Cl(t);
    r();
    const u = (t) => {
      const r = window.setTimeout(() => {
        e();
      }, t);
      s(r), h.zl(this.j, i);
    };
    if (a && !isNaN(a.value)) {
      switch (a.type) {
        case "date":
          (o = a.value - new Date().getTime() + n), o < 0 && e();
          break;
        case "timestamp":
          o = a.value + n;
      }
      u(o);
    } else n ? u(n) : h.Ji(this.j, i);
  }
  jl(t) {
    var e;
    null === (e = this.j) || void 0 === e || e.Pt(STORAGE_KEYS.It.Ml, t);
  }
  Xl(t, e) {
    let i = this.$l();
    null == i && (i = {}), (i[t] = e), this.j.Pt(STORAGE_KEYS.It.Ll, i);
  }
  El() {
    var t;
    return null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.Ml);
  }
  $l() {
    var t;
    return null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.Ll);
  }
  Fl(t, e, i, s, r = "") {
    let n;
    if (r) {
      const t = this.$l();
      n = null == t || isNaN(t[r]) ? e : t[r];
    } else (n = this.El()), (null == n || isNaN(n)) && (n = e);
    const o = (t - s) / 1e3;
    return (n = Math.min(n + o / i, e)), n;
  }
  Il(t, e) {
    return Math.max(0, (1 - t) * e * 1e3);
  }
  Kl(t, e = "") {
    var i, r, n, o, a;
    const u = { wl: !0, Sl: -1, Nl: 0 };
    if ((null == t && (t = !0), !t && !e)) return u;
    let l,
      c,
      d = null;
    if (t) d = null === (i = this.j) || void 0 === i ? void 0 : i.St(STORAGE_KEYS.It.Bl);
    else {
      const t = h.Pl(this.j);
      if (null == t || null == t[e]) return u;
      d = t[e];
    }
    if (null == d || isNaN(d)) return u;
    if (
      (t
        ? ((l =
            (null === (r = this.h) || void 0 === r ? void 0 : r.Ul()) || -1),
          (c = (null === (n = this.h) || void 0 === n ? void 0 : n.xl()) || -1))
        : ((l =
            (null === (o = this.h) || void 0 === o ? void 0 : o.Hl(e)) || -1),
          (c =
            (null === (a = this.h) || void 0 === a ? void 0 : a.Ol(e)) || -1)),
      -1 === l || -1 === c)
    )
      return u;
    const f = new Date().valueOf();
    let m = this.Fl(f, l, c, d, e);
    return m < 1
      ? ((u.wl = !1), (u.Nl = this.Il(m, c)), u)
      : ((m = Math.trunc(m) - 1),
        (u.Sl = m),
        t ? this.jl(m) : this.Xl(e, m),
        u);
  }
  yl() {
    return this.Kl(!0);
  }
  kl(t) {
    const e = this.Kl(!1, t);
    return !(e && !e.wl);
  }
  ct() {
    this.Gh.ct();
  }
  ht() {
    return this.Yh;
  }
  addSdkMetadata(t) {
    for (const e of t) -1 === this.$a.indexOf(e) && this.$a.push(e);
  }
}

const IamStrings = {
  EE: "inAppMessage must be an InAppMessage object",
  TE: "ab-pause-scrolling",
};
const IamColors = {
  IE: 4281545523,
  AE: 4294967295,
  _E: 4278219733,
  OE: 4293914607,
  LE: 4283782485,
  SE: 3224580915,
  NE: 4288387995,
};
const IamDisplayFailures = {
  RE: "hd",
  tE: "ias",
  ME: "of",
  eE: "do",
  oE: "umt",
  CE: "tf",
  DE: "te",
};
const IamSlideFrom = { TOP: "TOP", BOTTOM: "BOTTOM" };
const IamClickAction = { URI: "URI", NONE: "NONE" };
const IamDismissType = { AUTO_DISMISS: "AUTO_DISMISS", MANUAL: "SWIPE" };
const IamOpenTarget = { NONE: "NONE", BLANK: "BLANK" };
const IamImageStyle = { TOP: "TOP", GRAPHIC: "GRAPHIC" };
const IamOrientation = { PORTRAIT: "PORTRAIT", LANDSCAPE: "LANDSCAPE" };
const IamTextAlignment = {
  START: "START",
  CENTER: "CENTER",
  END: "END",
};
const IamCropType = {
  CENTER_CROP: "CENTER_CROP",
  FIT_CENTER: "FIT_CENTER",
};
const IamServerTypes = {
  sE: "SLIDEUP",
  aE: "MODAL",
  UE: "MODAL_STYLED",
  cE: "FULL",
  iE: "WEB_HTML",
  PE: "HTML",
  nE: "HTML_FULL",
};
const IamTiming = { gr: 500, pE: 200 };
const IAM_SHOW_CLASS = "ab-show";
const IAM_HIDE_CLASS = "ab-hide";
const IamSerializationKeys = {
  rE: "m",
  mE: "ma",
  GE: "sf",
  Is: "e",
  FE: "ti",
  HE: "ca",
  URI: "u",
  xE: "oa",
  BE: "dt",
  lE: "d",
  bE: "i",
  Bs: "iu",
  gE: "is",
  YE: "ic",
  KE: "ibc",
  XE: "bc",
  dE: "tc",
  hE: "cbc",
  yE: "ai",
  uE: "ao",
  WE: "h",
  fE: "ha",
  jE: "htc",
  kE: "fc",
  vE: "b",
  wE: "ct",
  zE: "o",
  VE: "hi",
  CSS: "css",
  xs: "type",
  qE: "messageFields",
  JE: "me",
  LANGUAGE: "l",
  Ns: "ia",
};

function removeAllVisibleInAppMessages() {
  const o = document.querySelectorAll(".ab-iam-root");
  for (let t = 0; t < o.length; t++) {
    const s = o[t];
    if (s.id) {
      const o = s.id + "-css",
        t = document.getElementById(o);
      t && t.parentNode && t.parentNode.removeChild(t);
    }
    s.parentNode && s.parentNode.removeChild(s);
  }
  const t = document.getElementsByClassName(IamStrings.TE);
  for (let o = 0; o < t.length; o++) {
    const s = t[o].classList;
    s.contains(IamStrings.TE) && s.remove(IamStrings.TE);
  }
}

class L {
  constructor(t = !1, s = []) {
    (this.lt = t), (this.Ce = s), (this.lt = t), (this.Ce = s);
  }
  Cs(t) {
    (this.lt = this.lt && t.lt), this.Ce.push(...t.Ce);
  }
}

const It = {
  cu: () =>
    "serviceWorker" in navigator &&
    "undefined" != typeof ServiceWorkerRegistration &&
    "showNotification" in ServiceWorkerRegistration.prototype &&
    "PushManager" in window,
  lu: () =>
    "safari" in window &&
    "pushNotification" in window.safari &&
    "function" == typeof window.safari.pushNotification.permission &&
    "function" == typeof window.safari.pushNotification.requestPermission,
  isPushSupported: () => It.cu() || It.lu(),
  isPushBlocked: () => {
    const o =
        It.isPushSupported() &&
        "Notification" in window &&
        null != window.Notification &&
        null != window.Notification.permission &&
        "denied" === window.Notification.permission,
      i =
        It.isPushSupported() &&
        (!("Notification" in window) || null == window.Notification);
    return o || i;
  },
  isPushPermissionGranted: () =>
    It.isPushSupported() &&
    "Notification" in window &&
    null != window.Notification &&
    null != window.Notification.permission &&
    "granted" === window.Notification.permission,
  Vn: () =>
    It.isPushBlocked()
      ? { Wn: !1, reason: "blocked" }
      : It.isPushSupported()
      ? It.isPushPermissionGranted()
        ? { Wn: !1, reason: "permissionGranted" }
        : { Wn: !0 }
      : { Wn: !1, reason: "unsupported" },
  Yn: (o, i) =>
    "blocked" === o
      ? `${i} containing a push prompt is not being shown because the user has already declined push permission prompt.`
      : "unsupported" === o
      ? `${i} containing a push prompt is not being shown because the browser doesn't support push notifications.`
      : `${i} containing a push prompt is not being shown because the user has already accepted the permission prompt.`,
};
var It$1 = It;

const randomInclusive = (t, a) => (
  (t = Math.ceil(t)),
  (a = Math.floor(a)),
  Math.floor(Math.random() * (a - t + 1)) + t
);

class Kt {
  constructor(t, i, s, e, h, n, o, r, l, u) {
    (this.tu = t),
      (this.baseUrl = i),
      (this.C = s),
      (this.eu = e),
      (this.Ss = h),
      (this.h = n),
      (this.j = o),
      (this.hc = r),
      (this.Gh = l),
      (this.B = u),
      (this.tu = t),
      (this.baseUrl = i),
      (this.nc = 0),
      (this.IS = o.dS() || 0),
      (this.lc = null),
      (this.C = s),
      (this.eu = e),
      (this.Ss = h),
      (this.h = n),
      (this.j = o),
      (this.Gh = l),
      (this.B = u),
      (this.hc = r),
      (this.uc = new f()),
      (this.cc = null),
      (this.dc = 50),
      (this.mc = !1),
      (this.fc = !1);
  }
  gc(t, i) {
    return !t && !i && this.Gh.Ih() >= this.dc;
  }
  vc(t) {
    let i = this.C.am();
    if (t.length > 0) {
      const s = this.Ss.getUserId();
      for (const e of t) {
        const t = (!e.userId && !s) || e.userId === s;
        e.type === p.wm && t && (i = !0);
      }
    }
    return i;
  }
  bc(t = !1, i = !0, e, n, o, r = !1, u = !1) {
    i && this.wc();
    const c = this.j.hS(),
      d = this.j.RS();
    let m = !1;
    const f = (t, r, u = -1) => {
        const c = new Date().valueOf();
        h.nt(this.j, h.it.pn, c),
          -1 !== u && r.push(["X-Braze-Req-Tokens-Remaining", u.toString()]);
        let d = !1;
        l.ot({
          url: this.baseUrl + "/data/",
          data: t,
          headers: r,
          lt: (i) => {
            null != t.respond_with &&
              t.respond_with.triggers &&
              (this.nc = Math.max(this.nc - 1, 0)),
              this.B.ut(t, i, r)
                ? (this.Gh.ct(),
                  this.h.ld(i),
                  (null != t.respond_with &&
                    t.respond_with.user_id != this.Ss.getUserId()) ||
                    (null != t.device && this.j.Pt(STORAGE_KEYS.It.Ba, t.device),
                    null != t.sdk_metadata &&
                      (this.j.Pt(STORAGE_KEYS.It.Ka, t.sdk_metadata),
                      this.j.Pt(STORAGE_KEYS.It.Pa, this.C.$t())),
                    this.hc(i),
                    h.Dl(this.j, h.it.pn, 1),
                    "function" == typeof e && e()))
                : i.auth_error && (d = !0);
          },
          error: () => {
            (d = !0),
              null != t.respond_with &&
                t.respond_with.triggers &&
                (this.nc = Math.max(this.nc - 1, 0)),
              this.B.Ua(t.events, t.attributes),
              "function" == typeof n && n();
          },
          ft: (t, s) => {
            "function" == typeof o && o(!d);
            const e = this.B.Cl(s);
            let n = 0;
            if (e)
              switch (e.type) {
                case "date":
                  n = Math.max(e.value - new Date().valueOf(), 0);
                  break;
                case "timestamp":
                  n = e.value;
              }
            if (i && !m) {
              if (d) {
                h.zl(this.j, h.it.pn);
                const t = this.h.vt(),
                  i = this.h.gt(),
                  s = this.h.bt();
                let e = this.lc;
                (null == e || e < t) && (e = t);
                const o = Math.min(s, randomInclusive(t, e * i)) + n;
                this.kc(o);
              } else this.kc(Math.max(1e3 * this.IS, n));
              m = !0;
            }
          },
        });
      },
      g = this.vc(c),
      p = t || g;
    if (this.gc(r, g))
      return void b$1.info(
        "Declining to flush data due to 50 consecutive authentication failures",
      );
    if (i && !this.B.fl(c, d, p))
      return this.kc(), void ("function" == typeof o && o(!0));
    const v = this.B.ml(p, c, d, u);
    p && this.nc++;
    let w = !1;
    if (v)
      for (const t of v)
        this.B.et(
          t.requestData,
          (i) => f(t.requestData, t.headers, i),
          h.it.pn,
          n,
        ),
          (w = !0);
    this.Gh.Fh() && i && !w
      ? this.kc()
      : g &&
        (b$1.info("Invoking new session subscriptions"),
        this.uc.A(),
        (this.fc = !0));
  }
  yc() {
    return this.nc > 0;
  }
  kc(t = 1e3 * this.IS) {
    this.mc ||
      (this.wc(),
      (this.cc = window.setTimeout(() => {
        if (document.hidden) {
          const t = "visibilitychange",
            i = () => {
              document.hidden ||
                (document.removeEventListener(t, i, !1), this.bc());
            };
          document.addEventListener(t, i, !1);
        } else this.bc();
      }, t)),
      (this.lc = t));
  }
  wc() {
    null != this.cc && (clearTimeout(this.cc), (this.cc = null));
  }
  initialize() {
    (this.mc = !1), this.kc();
  }
  destroy() {
    this.uc.removeAllSubscriptions(),
      this.Gh.xh(),
      this.wc(),
      (this.mc = !0),
      this.bc(void 0, !1, void 0, void 0, void 0, void 0, !0),
      (this.cc = null),
      (this.fc = !1);
  }
  rn(t) {
    return this.fc ? (t(), null) : this.uc.Ut(t);
  }
  openSession() {
    const t = this.C.$t() !== this.C.el();
    t && (this.j.cS(STORAGE_KEYS.Ou.Wh), this.j.cS(STORAGE_KEYS.Ou.Cu)),
      this.bc(!1, void 0, () => {
        t && (this.j.Vt(STORAGE_KEYS.It.jo), this.j.Vt(STORAGE_KEYS.It.At));
      }),
      this.Ea(),
      t &&
        Promise.resolve().then(function () { return pushManagerFactory; }).then((t) => {
          if (this.mc) return;
          const i = t.default.ra();
          if (
            null != i &&
            (It$1.isPushPermissionGranted() || It$1.isPushBlocked())
          ) {
            const t = () => {
                i.du()
                  ? b$1.info(
                      "Push token maintenance is disabled, not refreshing token for backend.",
                    )
                  : i.subscribe();
              },
              e = (i, s) => {
                s && t();
              },
              h = () => {
                const i = this.j.St(STORAGE_KEYS.It.Uu);
                (null == i || i) && t();
              },
              n = et._s.Xs;
            new et(n, b$1).kr(n.Ws.Fu, e, h);
          }
        });
  }
  jc() {
    this.j.Vt(STORAGE_KEYS.It.Fo), this.j.Vt(STORAGE_KEYS.It.bi), this.j.Vt(STORAGE_KEYS.It.pa);
  }
  Sc() {
    this.j.Vt(STORAGE_KEYS.It.Bl),
      this.j.Vt(STORAGE_KEYS.It.ES),
      this.j.Vt(STORAGE_KEYS.It.Ml),
      this.j.Vt(STORAGE_KEYS.It.Ll);
  }
  changeUser(t, i, e) {
    const h = this.Ss.getUserId();
    if (h !== t) {
      this.C.Sm(),
        this.jc(),
        removeAllVisibleInAppMessages(),
        null != h && this.bc(void 0, !1, void 0, void 0, void 0),
        this.Ss.Ju(t),
        e ? this.Gh.setSdkAuthenticationSignature(e) : this.Gh.jh();
      for (let t = 0; t < i.length; t++) i[t].changeUser(null == h);
      this.B.fo(),
        null != h && this.j.Vt(STORAGE_KEYS.It.eS),
        this.j.Vt(STORAGE_KEYS.It.Ba),
        this.j.Vt(STORAGE_KEYS.It.lS),
        this.Sc(),
        this.openSession(),
        b$1.info('Changed user to "' + t + '".');
    } else {
      let i = "Doing nothing.";
      e &&
        this.Gh.kh() !== e &&
        (this.Gh.setSdkAuthenticationSignature(e),
        (i = "Updated SDK authentication signature")),
        b$1.info(`Current user is already ${t}. ${i}`);
    }
  }
  requestImmediateDataFlush(t) {
    this.wc(), this.C.el();
    this.bc(
      void 0,
      void 0,
      void 0,
      () => {
        b$1.error("Failed to flush data, request will be retried automatically.");
      },
      t,
      !0,
    );
  }
  Ar(t, i) {
    this.C.el(),
      b$1.info("Requesting explicit trigger refresh."),
      this.bc(!0, void 0, t, i);
  }
  Gu(t, i) {
    const e = p.Ac,
      h = { a: t, l: i },
      n = v$1.Dt(e, h);
    return (
      n && (b$1.info(`Logged alias ${t} with label ${i}`), this.j.Pt(STORAGE_KEYS.It.lS, h)),
      n
    );
  }
  Mu(t, i, s) {
    if (this.h.qu(i))
      return (
        b$1.info(`Custom Attribute "${i}" is blocklisted, ignoring.`), new L()
      );
    const e = { key: i, value: s },
      h = v$1.Dt(t, e);
    if (h) {
      const t = "object" == typeof s ? JSON.stringify(s, null, 2) : s;
      b$1.info(`Logged custom attribute: ${i} with value: ${t}`);
    }
    return h;
  }
  setLastKnownLocation(t, i, s, e, h, n) {
    const o = { latitude: i, longitude: s };
    null != e && (o.altitude = e),
      null != h && (o.ll_accuracy = h),
      null != n && (o.alt_accuracy = n);
    const r = v$1.Dt(p.Dc, o, t || void 0);
    return (
      r &&
        b$1.info(`Set user last known location as ${JSON.stringify(o, null, 2)}`),
      r
    );
  }
  Fr(t, i) {
    const s = this.C.el();
    return new Ie(this.Ss.getUserId(), p.$c, t, s, { cid: i });
  }
  qc(t, i) {
    return new et(t, i);
  }
  Ea() {
    const t = et._s.Xs;
    this.qc(t, b$1).setItem(t.Ws.pn, 1, {
      baseUrl: this.baseUrl,
      data: { api_key: this.tu, device_id: this.eu.ve().id },
      userId: this.Ss.getUserId(),
      sdkAuthEnabled: this.Gh.Fh(),
    });
  }
  Dr(t) {
    for (const i of t)
      if (i.api_key === this.tu) this.B.Ua(i.events, i.attributes);
      else {
        const t = et._s.Xs;
        new et(t, b$1).setItem(t.Ws.Br, V$1.de(), i);
      }
  }
  Na(t, i, s) {
    if (this.h.qu(t))
      return (
        b$1.info(`Custom Attribute "${t}" is blocklisted, ignoring.`), new L()
      );
    let e, h;
    return (
      null === i && null === s
        ? ((e = p.Cc), (h = { key: t }))
        : ((e = p.Mc), (h = { key: t, latitude: i, longitude: s })),
      v$1.Dt(e, h)
    );
  }
  va(t, i) {
    const s = { group_id: t, status: i };
    return v$1.Dt(p.Tc, s);
  }
}

class di {
  constructor(
    t = 0,
    i = [],
    s = [],
    h = [],
    l = null,
    e = null,
    r = { enabled: !1 },
    n = { enabled: !1, refresh_rate_limit: void 0 },
    a = { enabled: !0, capacity: GLOBAL_RATE_LIMIT_CAPACITY_DEFAULT, refill_rate: GLOBAL_RATE_LIMIT_REFILL_RATE_DEFAULT, endpoint_overrides: {} },
    o = null,
    u = null,
    c = null,
    d = null,
    m = null,
  ) {
    (this.nd = t),
      (this.gd = i),
      (this.bd = s),
      (this.fd = h),
      (this.Rd = l),
      (this.ad = e),
      (this.hd = r),
      (this.Xr = n),
      (this.ud = a),
      (this.banners = o),
      (this.dust = u),
      (this.wd = c),
      (this.Td = d),
      (this.dd = m);
  }
  qt() {
    return {
      s: "6.9.0",
      l: this.nd,
      e: this.gd,
      a: this.bd,
      p: this.fd,
      m: this.Rd,
      v: this.ad,
      c: this.hd,
      f: this.Xr,
      grl: this.ud,
      b: this.banners,
      d: this.dust,
      rb: this.wd,
      mst: this.Td,
      ch: this.dd,
    };
  }
  static _u(t) {
    let i = t.l;
    return (
      "6.9.0" !== t.s && (i = 0),
      new di(
        i,
        t.e,
        t.a,
        t.p,
        t.m,
        t.v,
        t.c,
        t.f,
        t.grl,
        t.b,
        t.d,
        t.rb,
        t.mst,
        t.ch,
      )
    );
  }
}

class Yt {
  constructor(t) {
    (this.j = t),
      (this.j = t),
      (this.Gl = new f()),
      (this._l = new f()),
      (this.Vl = new f()),
      (this.Jl = new f()),
      (this.Ql = new f()),
      (this.Wl = new f()),
      (this.Yl = null),
      (this.Zl = null);
  }
  ed() {
    if (null == this.Zl) {
      const t = this.j.St(STORAGE_KEYS.It.sd);
      this.Zl = null != t ? di._u(t) : new di();
    }
    return this.Zl;
  }
  Qt() {
    return this.ed().nd;
  }
  ld(t) {
    var i, e, n, l, r, o;
    if (null != t && null != t.config) {
      const u = t.config;
      if (u.time > this.ed().nd) {
        const t = (t) => (null == t ? this.ed().ud : t),
          a = new di(
            u.time,
            u.events_blacklist,
            u.attributes_blacklist,
            u.purchases_blacklist,
            u.messaging_session_timeout,
            u.vapid_public_key,
            u.content_cards,
            u.feature_flags,
            t(u.global_request_rate_limit),
            u.banners,
            u.dust,
            u.request_backoff,
            u.minimum_session_timeout,
            u.conversational_chat,
          );
        let h = !1;
        null != a.ad && this.ju() !== a.ad && (h = !0);
        let d = !1;
        null != a.hd.enabled && this.Pi() !== a.hd.enabled && (d = !0);
        let c = !1;
        null != a.Xr.enabled && this.lo() !== a.Xr.enabled && (c = !0);
        let v = !1;
        null !=
          (null === (i = a.banners) || void 0 === i ? void 0 : i.enabled) &&
          this.Ot() !==
            (null === (e = a.banners) || void 0 === e ? void 0 : e.enabled) &&
          (v = !0);
        let m = !1;
        null != (null === (n = a.dust) || void 0 === n ? void 0 : n.enabled) &&
          this.fn() !==
            (null === (l = a.dust) || void 0 === l ? void 0 : l.enabled) &&
          (m = !0);
        let g = !1;
        null != (null === (r = a.dd) || void 0 === r ? void 0 : r.enabled) &&
          this.vd() !==
            (null === (o = a.dd) || void 0 === o ? void 0 : o.enabled) &&
          (g = !0),
          (this.Zl = a),
          this.j.Pt(STORAGE_KEYS.It.sd, a.qt()),
          h && this.Gl.A(),
          d && this._l.A(),
          c && this.Vl.A(),
          v && this.Jl.A(),
          m && this.Ql.A(),
          g && this.Wl.A();
      }
    }
  }
  xu(t) {
    const i = this.Gl.Ut(t);
    return this.Yl && this.Gl.removeSubscription(this.Yl), (this.Yl = i), i;
  }
  $i(t) {
    return this._l.Ut(t);
  }
  bo(t) {
    return this.Vl.Ut(t);
  }
  V(t) {
    return this.Jl.Ut(t);
  }
  Tr(t) {
    return this.Ql.Ut(t);
  }
  md(t) {
    return this.Wl.Ut(t);
  }
  $e(t) {
    return -1 !== this.ed().gd.indexOf(t);
  }
  qu(t) {
    return -1 !== this.ed().bd.indexOf(t);
  }
  $r(t) {
    return -1 !== this.ed().fd.indexOf(t);
  }
  pd() {
    return this.ed().Rd;
  }
  ju() {
    return this.ed().ad;
  }
  Pi() {
    return this.ed().hd.enabled || !1;
  }
  Cd() {
    const t = this.ed().ud;
    return !(!t || null == t.enabled) && t.enabled;
  }
  Ul() {
    if (!this.Cd()) return -1;
    const t = this.ed().ud;
    return null == t.capacity || t.capacity < 10 ? -1 : t.capacity;
  }
  xl() {
    if (!this.Cd()) return -1;
    const t = this.ed().ud;
    return null == t.refill_rate || t.refill_rate <= 0 ? -1 : t.refill_rate;
  }
  Ed(t) {
    const i = this.ed().ud.endpoint_overrides;
    return null == i ? null : i[t];
  }
  Hl(t) {
    const i = this.Ed(t);
    return null == i || isNaN(i.capacity) || i.capacity <= 0 ? -1 : i.capacity;
  }
  Ol(t) {
    const i = this.Ed(t);
    return null == i || isNaN(i.refill_rate) || i.refill_rate <= 0
      ? -1
      : i.refill_rate;
  }
  lo() {
    return this.ed().Xr.enabled && null == this.Ro()
      ? (v$1.Dt(p.Ya, { e: "Missing feature flag refresh_rate_limit." }), !1)
      : this.ed().Xr.enabled || !1;
  }
  Ro() {
    return this.ed().Xr.refresh_rate_limit;
  }
  Ot() {
    var t;
    return (
      (null === (t = this.ed().banners) || void 0 === t ? void 0 : t.enabled) ||
      null
    );
  }
  re() {
    var t;
    return (
      (null === (t = this.ed().banners) || void 0 === t
        ? void 0
        : t.max_placements) || 0
    );
  }
  Gt() {
    var t;
    const i =
      null === (t = this.ed().banners) || void 0 === t
        ? void 0
        : t.dismissals_cache_size;
    return null != i && "number" == typeof i && i > 0 ? i : DISMISSALS_CACHE_SIZE_DEFAULT;
  }
  fn() {
    var t;
    return (
      (null === (t = this.ed().dust) || void 0 === t ? void 0 : t.enabled) || !1
    );
  }
  vd() {
    var t;
    return (
      (null === (t = this.ed().dd) || void 0 === t ? void 0 : t.enabled) || !1
    );
  }
  vt() {
    var t;
    const i =
      null === (t = this.ed().wd) || void 0 === t
        ? void 0
        : t.min_sleep_duration_ms;
    return null != i ? i : REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT;
  }
  gt() {
    var t;
    const i =
      null === (t = this.ed().wd) || void 0 === t ? void 0 : t.scale_factor;
    return null != i ? i : REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT;
  }
  bt() {
    var t;
    const i =
      null === (t = this.ed().wd) || void 0 === t
        ? void 0
        : t.max_sleep_duration_ms;
    return null != i ? i : REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT;
  }
  Bd() {
    return this.ed().Td;
  }
}

const DEFAULT_MINIMUM_SESSION_TIMEOUT_IN_MS = 1e4;

class Xt {
  constructor(s, t, i, e) {
    (this.j = s),
      (this.Ss = t),
      (this.h = i),
      (this.tm = e),
      (this.j = s),
      (this.Ss = t),
      (this.h = i);
    const n = this.h.Bd();
    (this.im = n ? 1e3 * n : DEFAULT_MINIMUM_SESSION_TIMEOUT_IN_MS),
      (null == e || isNaN(e)) && (e = 1800),
      e < this.im / 1e3 &&
        b$1.info(
          "Specified session timeout of " +
            e +
            "s is too small, using the minimum session timeout of " +
            this.im / 1e3 +
            "s instead.",
        ),
      (this.tm = Math.max(e, this.im / 1e3));
  }
  nm(s, t) {
    return new Ie(this.Ss.getUserId(), p.hm, s, t.Tu, { d: convertMsToSeconds(s - t.lm) });
  }
  al() {
    return this.j.$u(STORAGE_KEYS.Ou.um);
  }
  $t() {
    const t = this.j.$u(STORAGE_KEYS.Ou.um);
    return null == t ? null : t.Tu;
  }
  am() {
    const t = new Date().valueOf(),
      i = this.h.pd();
    if (null == i) return !1;
    const e = this.j.St(STORAGE_KEYS.It.dm),
      n = null == e || t - e > 1e3 * i;
    return n && this.j.Pt(STORAGE_KEYS.It.dm, t), n;
  }
  ul(s, t) {
    return null == t || null == t.fm || (!(s - t.lm < this.im) && t.fm < s);
  }
  el() {
    const t = new Date().valueOf(),
      i = t + 1e3 * this.tm,
      e = this.j.$u(STORAGE_KEYS.Ou.um);
    if (this.ul(t, e)) {
      let n = "Generating session start event with time " + t;
      if (null != e) {
        let s = e.pm;
        s - e.lm < this.im && (s = e.lm + this.im),
          this.j.gm(this.nm(s, e)),
          (n += " (old session ended " + s + ")");
      }
      (n += ". Will expire " + i.valueOf()), b$1.info(n);
      const r = new _t(V$1.de(), i);
      this.j.gm(new Ie(this.Ss.getUserId(), p.wm, t, r.Tu)),
        this.j.Iu(STORAGE_KEYS.Ou.um, r);
      return null == this.j.St(STORAGE_KEYS.It.dm) && this.j.Pt(STORAGE_KEYS.It.dm, t), r.Tu;
    }
    if (null != e) return (e.pm = t), (e.fm = i), this.j.Iu(STORAGE_KEYS.Ou.um, e), e.Tu;
  }
  Sm() {
    const t = this.j.$u(STORAGE_KEYS.Ou.um);
    null != t &&
      (this.j.jm(STORAGE_KEYS.Ou.um), this.j.gm(this.nm(new Date().valueOf(), t)));
  }
}

const Zt = {
  rl: function (o, t = !1, e) {
    const r = Zt.oc(),
      a = Zt.sl(),
      n = new ne.tc(o, r && !t, a, e);
    let c;
    return (c = a ? new ne.ec(o) : new ne.rc()), new ne(n, c);
  },
  oc: function () {
    return (
      navigator.cookieEnabled ||
      ("cookie" in document &&
        (document.cookie.length > 0 ||
          (document.cookie = "test").indexOf.call(document.cookie, "test") >
            -1))
    );
  },
  sl: function () {
    let o = !1;
    try {
      if (localStorage && localStorage.getItem)
        try {
          localStorage.setItem(STORAGE_KEYS.It.ac, "true"),
            localStorage.getItem(STORAGE_KEYS.It.ac)
              ? (localStorage.removeItem(STORAGE_KEYS.It.ac), (o = !0))
              : (o = !1);
        } catch (t) {
          if (
            !(
              t instanceof Error &&
              ("QuotaExceededError" === t.name ||
                "NS_ERROR_DOM_QUOTA_REACHED" === t.name) &&
              localStorage.length > 0
            )
          )
            throw t;
          o = !0;
        }
    } catch (o) {
      b$1.info("Local Storage not supported!");
    }
    return o;
  },
};

class ControlMessage {
  constructor(s, t) {
    (this.triggerId = s),
      (this.messageExtras = t),
      (this.triggerId = s),
      (this.messageExtras = t),
      (this.extras = {}),
      (this.isControl = !0),
      (this.hs = !1);
  }
  static fromJson(s) {
    return new ControlMessage(s.trigger_id, s.message_extras);
  }
  js() {
    return !this.hs && ((this.hs = !0), !0);
  }
  sm() {
    return this.hs;
  }
}

function _isInView(t, n = !1, e = !1, s = !1) {
  if (null == t) return !1;
  (n = n || !1), (e = e || !1);
  const i = t.getBoundingClientRect();
  return (
    null != i &&
    ((i.top >= 0 &&
      i.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
      !n) &&
    (i.left >= 0 || !s) &&
    ((i.bottom >= 0 &&
      i.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
      !e) &&
    (i.right <= (window.innerWidth || document.documentElement.clientWidth) ||
      !s)
  );
}
const DOMUtils = { Ic: null, td: _isInView };
const DIRECTIONS = { Uo: "up", Vo: "down", ie: "left", ne: "right" };
function supportsPassive() {
  if (null == DOMUtils.Ic) {
    DOMUtils.Ic = !1;
    try {
      const t = Object.defineProperty({}, "passive", {
        get: () => {
          DOMUtils.Ic = !0;
        },
      });
      window.addEventListener("testPassive", () => {}, t),
        window.removeEventListener("testPassive", () => {}, t);
    } catch (t) {
      b$1.error(getErrorMessage(t));
    }
  }
  return DOMUtils.Ic;
}
function addPassiveEventListener(t, n, e = () => {}) {
  t.addEventListener(n, e, !!supportsPassive() && { passive: !0 });
}
function topIsInView(t) {
  return DOMUtils.td(t, !0, !1, !1);
}
function bottomIsInView(t) {
  return DOMUtils.td(t, !1, !0, !1);
}
function clickElement(t) {
  if (t.onclick) {
    const n = document.createEvent("MouseEvents");
    n.initEvent("click", !0, !0), t.onclick.apply(t, [n]);
  }
}
function detectSwipe(t, n, e) {
  let s = null,
    i = null;
  addPassiveEventListener(t, "touchstart", (t) => {
    (s = t.touches[0].clientX), (i = t.touches[0].clientY);
  }),
    addPassiveEventListener(t, "touchmove", (o) => {
      if (null == s || null == i) return;
      const l = s - o.touches[0].clientX,
        u = i - o.touches[0].clientY;
      Math.abs(l) > Math.abs(u) && Math.abs(l) >= 25
        ? (((l > 0 && n === DIRECTIONS.ie) || (l < 0 && n === DIRECTIONS.ne)) &&
            e(o),
          (s = null),
          (i = null))
        : Math.abs(u) >= 25 &&
          (((u > 0 &&
            n === DIRECTIONS.Uo &&
            t.scrollTop === t.scrollHeight - t.offsetHeight) ||
            (u < 0 && n === DIRECTIONS.Vo && 0 === t.scrollTop)) &&
            e(o),
          (s = null),
          (i = null));
    });
}
function buildSvg(t, n, e) {
  const s = "http://www.w3.org/2000/svg",
    i = document.createElementNS(s, "svg");
  i.setAttribute("viewBox", t), i.setAttribute("xmlns", s);
  const o = document.createElementNS(s, "path");
  return (
    o.setAttribute("d", n),
    null != e && o.setAttribute("fill", e),
    i.appendChild(o),
    i
  );
}

const KeyCodes = { Ao: 32, Wo: 9, Lo: 13, rh: 27 };

const isIFrame = (e) => null !== e && "IFRAME" === e.tagName;

class InAppMessage {
  constructor(
    t,
    s,
    i,
    h,
    e,
    n,
    r,
    o,
    l,
    u,
    a,
    m,
    c,
    d,
    p,
    b,
    g,
    v,
    I,
    j,
    k,
    w,
    y,
    S,
    T,
    x,
    E,
    H,
    M,
    C,
    D,
    z,
  ) {
    (this.message = t),
      (this.messageAlignment = s),
      (this.slideFrom = i),
      (this.extras = h),
      (this.triggerId = e),
      (this.clickAction = n),
      (this.uri = r),
      (this.openTarget = o),
      (this.dismissType = l),
      (this.duration = u),
      (this.icon = a),
      (this.imageUrl = m),
      (this.imageStyle = c),
      (this.iconColor = d),
      (this.iconBackgroundColor = p),
      (this.backgroundColor = b),
      (this.textColor = g),
      (this.closeButtonColor = v),
      (this.animateIn = I),
      (this.animateOut = j),
      (this.header = k),
      (this.headerAlignment = w),
      (this.headerTextColor = y),
      (this.frameColor = S),
      (this.buttons = T),
      (this.cropType = x),
      (this.orientation = E),
      (this.htmlId = H),
      (this.css = M),
      (this.messageExtras = C),
      (this.language = D),
      (this.altImageText = z),
      (this.message = t),
      (this.messageAlignment = s || IamTextAlignment.CENTER),
      (this.duration = u || 5e3),
      (this.slideFrom = i || IamSlideFrom.BOTTOM),
      (this.extras = h || {}),
      (this.triggerId = e),
      (this.clickAction = n || IamClickAction.NONE),
      (this.uri = r),
      (this.openTarget = o || IamOpenTarget.NONE),
      (this.dismissType = l || IamDismissType.AUTO_DISMISS),
      (this.icon = a),
      (this.imageUrl = m),
      (this.imageStyle = c || IamImageStyle.TOP),
      (this.iconColor = d || IamColors.AE),
      (this.iconBackgroundColor = p || IamColors._E),
      (this.backgroundColor = b || IamColors.AE),
      (this.textColor = g || IamColors.IE),
      (this.closeButtonColor = v || IamColors.NE),
      (this.animateIn = I),
      null == this.animateIn && (this.animateIn = !0),
      (this.animateOut = j),
      null == this.animateOut && (this.animateOut = !0),
      (this.header = k),
      (this.headerAlignment = w || IamTextAlignment.CENTER),
      (this.headerTextColor = y || IamColors.IE),
      (this.frameColor = S || IamColors.SE),
      (this.buttons = T || []),
      (this.cropType = x || IamCropType.FIT_CENTER),
      (this.orientation = E),
      (this.htmlId = H),
      (this.css = M),
      (this.isControl = !1),
      (this.messageExtras = C),
      (this.language = D),
      (this.altImageText = z),
      (this.th = !1),
      (this.hs = !1),
      (this.rd = !1),
      (this.sh = !1),
      (this.Eo = null),
      (this.$o = null),
      (this.ti = new f()),
      (this.ih = new f()),
      (this.Go = IamTextAlignment.CENTER);
  }
  subscribeToClickedEvent(t) {
    return this.ti.Ut(t);
  }
  subscribeToDismissedEvent(t) {
    return this.ih.Ut(t);
  }
  removeSubscription(t) {
    this.ti.removeSubscription(t), this.ih.removeSubscription(t);
  }
  removeAllSubscriptions() {
    this.ti.removeAllSubscriptions(), this.ih.removeAllSubscriptions();
  }
  closeMessage() {
    this.tl(this.Eo);
  }
  zo() {
    return !0;
  }
  od() {
    return this.zo();
  }
  Bo() {
    return null != this.htmlId && this.htmlId.length > 4;
  }
  Mo() {
    return this.Bo() && null != this.css && this.css.length > 0;
  }
  Oo() {
    if (this.Bo() && this.Mo()) return this.htmlId + "-css";
  }
  js() {
    return !this.hs && ((this.hs = !0), !0);
  }
  sm() {
    return this.hs;
  }
  Yt(t) {
    return !this.rd && ((this.rd = !0), this.ti.A(), !0);
  }
  Ft() {
    return !this.sh && ((this.sh = !0), this.ih.A(), !0);
  }
  hide(t) {
    if (t && t.parentNode) {
      let s = t.closest(".ab-iam-root");
      if ((null == s && (s = t), this.zo() && null != s.parentNode)) {
        const t = s.parentNode.classList;
        t && t.contains(IamStrings.TE) && t.remove(IamStrings.TE),
          document.body.removeEventListener("touchmove", InAppMessage.hh);
      }
      s.className = s.className.replace(IAM_SHOW_CLASS, IAM_HIDE_CLASS);
    }
    return this.animateOut || !1;
  }
  tl(t, s) {
    if (null == t) return;
    let i;
    (this.Eo = null),
      (i =
        -1 === t.className.indexOf("ab-in-app-message")
          ? t.getElementsByClassName("ab-in-app-message")[0]
          : t);
    let h = !1;
    i && (h = this.hide(i));
    const e = document.body;
    let n;
    null != e && (n = e.scrollTop);
    const r = () => {
      if (t && t.parentNode) {
        let s = t.closest(".ab-iam-root");
        null == s && (s = t), s.parentNode && s.parentNode.removeChild(s);
      }
      const i = this.Oo();
      if (null != i) {
        const t = document.getElementById(i);
        t && t.parentNode && t.parentNode.removeChild(t);
      }
      null != e && "Safari" === ro.browser && (e.scrollTop = n),
        s ? s() : this.Ft();
    };
    h ? setTimeout(r, IamTiming.gr) : r(), this.$o && this.$o.focus();
  }
  Ko() {
    return document.createTextNode(this.message || "");
  }
  Ho(t) {
    t.setAttribute("alt", this.altImageText || "");
  }
  static hh(t) {
    if (t.targetTouches && t.targetTouches.length > 1) return;
    const s = t.target;
    (s &&
      s.classList &&
      s.classList.contains("ab-message-text") &&
      s.scrollHeight > s.clientHeight) ||
      (document.querySelector(`.${IamStrings.TE}`) &&
        t.cancelable &&
        t.preventDefault());
  }
  eh(t) {
    const s = t.parentNode;
    this.zo() &&
      null != s &&
      this.orientation !== IamOrientation.LANDSCAPE &&
      (null != s.classList && s.classList.add(IamStrings.TE),
      document.body.addEventListener(
        "touchmove",
        InAppMessage.hh,
        !!supportsPassive() && { passive: !1 },
      )),
      (t.className += " " + IAM_SHOW_CLASS);
  }
  static nh(t) {
    if (
      t.keyCode === KeyCodes.rh &&
      !r.er(U.oh) &&
      document.querySelectorAll(".ab-modal-interactions").length > 0
    ) {
      const t = document.getElementsByClassName("ab-html-message");
      let s = !1;
      for (const i of t) {
        let t = null;
        isIFrame(i) &&
          i.contentWindow &&
          (t = i.contentWindow.document.getElementsByClassName(
            "ab-programmatic-close-button",
          )[0]),
          null != t && (clickElement(t), (s = !0));
      }
      if (!s) {
        const t = document.querySelectorAll(
          ".ab-modal-interactions > .ab-close-button",
        )[0];
        null != t && clickElement(t);
      }
    }
  }
  lh() {
    this.th ||
      r.er(U.oh) ||
      (document.addEventListener("keydown", InAppMessage.nh, !1),
      r.uh(() => {
        document.removeEventListener("keydown", InAppMessage.nh);
      }),
      (this.th = !0));
  }
  qt(t) {
    const s = {};
    return t
      ? ((s[IamSerializationKeys.rE] = this.message),
        (s[IamSerializationKeys.mE] = this.messageAlignment),
        (s[IamSerializationKeys.GE] = this.slideFrom),
        (s[IamSerializationKeys.Is] = this.extras),
        (s[IamSerializationKeys.FE] = this.triggerId),
        (s[IamSerializationKeys.HE] = this.clickAction),
        (s[IamSerializationKeys.URI] = this.uri),
        (s[IamSerializationKeys.xE] = this.openTarget),
        (s[IamSerializationKeys.BE] = this.dismissType),
        (s[IamSerializationKeys.lE] = this.duration),
        (s[IamSerializationKeys.bE] = this.icon),
        (s[IamSerializationKeys.Bs] = this.imageUrl),
        (s[IamSerializationKeys.gE] = this.imageStyle),
        (s[IamSerializationKeys.YE] = this.iconColor),
        (s[IamSerializationKeys.KE] = this.iconBackgroundColor),
        (s[IamSerializationKeys.XE] = this.backgroundColor),
        (s[IamSerializationKeys.dE] = this.textColor),
        (s[IamSerializationKeys.hE] = this.closeButtonColor),
        (s[IamSerializationKeys.yE] = this.animateIn),
        (s[IamSerializationKeys.uE] = this.animateOut),
        (s[IamSerializationKeys.WE] = this.header),
        (s[IamSerializationKeys.fE] = this.headerAlignment),
        (s[IamSerializationKeys.jE] = this.headerTextColor),
        (s[IamSerializationKeys.kE] = this.frameColor),
        (s[IamSerializationKeys.vE] = this.buttons),
        (s[IamSerializationKeys.wE] = this.cropType),
        (s[IamSerializationKeys.zE] = this.orientation),
        (s[IamSerializationKeys.VE] = this.htmlId),
        (s[IamSerializationKeys.CSS] = this.css),
        (s[IamSerializationKeys.xs] = t),
        (s[IamSerializationKeys.JE] = this.messageExtras),
        (s[IamSerializationKeys.LANGUAGE] = this.language),
        (s[IamSerializationKeys.Ns] = this.altImageText),
        s)
      : s;
  }
}
(InAppMessage.ah = IamColors),
  (InAppMessage.mh = IamDisplayFailures),
  (InAppMessage.SlideFrom = IamSlideFrom),
  (InAppMessage.ClickAction = IamClickAction),
  (InAppMessage.DismissType = IamDismissType),
  (InAppMessage.OpenTarget = IamOpenTarget),
  (InAppMessage.ImageStyle = IamImageStyle),
  (InAppMessage.Orientation = IamOrientation),
  (InAppMessage.TextAlignment = IamTextAlignment),
  (InAppMessage.CropType = IamCropType),
  (InAppMessage.dh = IamServerTypes),
  (InAppMessage.gr = IamTiming.gr),
  (InAppMessage.pE = IamTiming.pE),
  (InAppMessage.bs = IamSerializationKeys);

class HtmlMessage extends InAppMessage {
  constructor(i, o, r, t, d, s, e, v, n, u, a, c) {
    super(
      i,
      void 0,
      void 0,
      o,
      r,
      void 0,
      void 0,
      void 0,
      (t = t || IamDismissType.MANUAL),
      d,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      s,
      e,
      void 0,
      void 0,
      void 0,
      v,
      void 0,
      void 0,
      void 0,
      n,
      u,
      c,
      void 0,
      void 0,
    ),
      (this.messageFields = a),
      (this.messageFields = a);
  }
  od() {
    return !1;
  }
  Yt(i) {
    if (this.ko === IamServerTypes.iE) {
      if (this.rd) return !1;
      this.rd = !0;
    }
    return this.ti.A(i), !0;
  }
  qt() {
    const i = super.qt(IamServerTypes.iE);
    return (i[IamSerializationKeys.qE] = this.messageFields), i;
  }
  static ha(i) {
    return new HtmlMessage(
      i[IamSerializationKeys.rE],
      i[IamSerializationKeys.Is],
      i[IamSerializationKeys.FE],
      i[IamSerializationKeys.BE],
      i[IamSerializationKeys.lE],
      i[IamSerializationKeys.yE],
      i[IamSerializationKeys.uE],
      i[IamSerializationKeys.kE],
      i[IamSerializationKeys.VE],
      i[IamSerializationKeys.CSS],
      i[IamSerializationKeys.qE],
      i[IamSerializationKeys.JE],
    );
  }
}

class InAppMessageButton {
  constructor(s, t, i, r, h, e, n) {
    (this.text = s),
      (this.backgroundColor = t),
      (this.textColor = i),
      (this.borderColor = r),
      (this.clickAction = h),
      (this.uri = e),
      (this.id = n),
      (this.text = s || ""),
      (this.backgroundColor = t || IamColors._E),
      (this.textColor = i || IamColors.AE),
      (this.borderColor = r || this.backgroundColor),
      (this.clickAction = h || IamClickAction.NONE),
      (this.uri = e),
      null == n && (n = InAppMessageButton.Kn),
      (this.id = n),
      (this.rd = !1),
      (this.ti = new f());
  }
  subscribeToClickedEvent(s) {
    return this.ti.Ut(s);
  }
  removeSubscription(s) {
    this.ti.removeSubscription(s);
  }
  removeAllSubscriptions() {
    this.ti.removeAllSubscriptions();
  }
  Yt() {
    return !this.rd && ((this.rd = !0), this.ti.A(), !0);
  }
  static fromJson(s) {
    return new InAppMessageButton(
      s.text,
      s.bg_color,
      s.text_color,
      s.border_color,
      s.click_action,
      s.uri,
      s.id,
    );
  }
}
InAppMessageButton.Kn = -1;

class FullScreenMessage extends InAppMessage {
  constructor(
    r,
    s,
    e,
    t,
    o,
    i,
    a,
    p,
    m,
    n,
    c,
    f,
    u,
    d,
    l,
    j,
    g,
    x,
    z,
    h,
    v,
    w,
    y,
    S,
    b,
    k,
    q,
    A,
    B,
    C,
    D,
  ) {
    (p = p || IamDismissType.MANUAL),
      (k = k || IamOrientation.PORTRAIT),
      super(
        r,
        s,
        void 0,
        e,
        t,
        o,
        i,
        a,
        p,
        m,
        n,
        c,
        f,
        u,
        d,
        l,
        j,
        g,
        x,
        z,
        h,
        v,
        w,
        y,
        S,
        (b = b || IamCropType.CENTER_CROP),
        k,
        q,
        A,
        B,
        C,
        D,
      ),
      (this.Go = IamTextAlignment.CENTER);
  }
  qt() {
    return super.qt(IamServerTypes.cE);
  }
  static ha(r) {
    return new FullScreenMessage(
      r[IamSerializationKeys.rE],
      r[IamSerializationKeys.mE],
      r[IamSerializationKeys.Is],
      r[IamSerializationKeys.FE],
      r[IamSerializationKeys.HE],
      r[IamSerializationKeys.URI],
      r[IamSerializationKeys.xE],
      r[IamSerializationKeys.BE],
      r[IamSerializationKeys.lE],
      r[IamSerializationKeys.bE],
      r[IamSerializationKeys.Bs],
      r[IamSerializationKeys.gE],
      r[IamSerializationKeys.YE],
      r[IamSerializationKeys.KE],
      r[IamSerializationKeys.XE],
      r[IamSerializationKeys.dE],
      r[IamSerializationKeys.hE],
      r[IamSerializationKeys.yE],
      r[IamSerializationKeys.uE],
      r[IamSerializationKeys.WE],
      r[IamSerializationKeys.fE],
      r[IamSerializationKeys.jE],
      r[IamSerializationKeys.kE],
      buttonsFromSerializedInAppMessage(r[IamSerializationKeys.vE]),
      r[IamSerializationKeys.wE],
      r[IamSerializationKeys.zE],
      r[IamSerializationKeys.VE],
      r[IamSerializationKeys.CSS],
      r[IamSerializationKeys.JE],
      r[IamSerializationKeys.LANGUAGE],
      r[IamSerializationKeys.Ns],
    );
  }
}

class ModalMessage extends InAppMessage {
  constructor(
    r,
    s,
    e,
    t,
    o,
    i,
    a,
    p,
    m,
    n,
    c,
    f,
    u,
    d,
    l,
    j,
    g,
    v,
    x,
    z,
    h,
    w,
    y,
    S,
    b,
    k,
    q,
    A,
    B,
    C,
  ) {
    super(
      r,
      s,
      void 0,
      e,
      t,
      o,
      i,
      a,
      (p = p || IamDismissType.MANUAL),
      m,
      n,
      c,
      f,
      u,
      d,
      l,
      j,
      g,
      v,
      x,
      z,
      h,
      w,
      y,
      S,
      (b = b || IamCropType.FIT_CENTER),
      void 0,
      k,
      q,
      A,
      B,
      C,
    ),
      (this.Go = IamTextAlignment.CENTER);
  }
  qt() {
    return super.qt(IamServerTypes.aE);
  }
  static ha(r) {
    return new ModalMessage(
      r[IamSerializationKeys.rE],
      r[IamSerializationKeys.mE],
      r[IamSerializationKeys.Is],
      r[IamSerializationKeys.FE],
      r[IamSerializationKeys.HE],
      r[IamSerializationKeys.URI],
      r[IamSerializationKeys.xE],
      r[IamSerializationKeys.BE],
      r[IamSerializationKeys.lE],
      r[IamSerializationKeys.bE],
      r[IamSerializationKeys.Bs],
      r[IamSerializationKeys.gE],
      r[IamSerializationKeys.YE],
      r[IamSerializationKeys.KE],
      r[IamSerializationKeys.XE],
      r[IamSerializationKeys.dE],
      r[IamSerializationKeys.hE],
      r[IamSerializationKeys.yE],
      r[IamSerializationKeys.uE],
      r[IamSerializationKeys.WE],
      r[IamSerializationKeys.fE],
      r[IamSerializationKeys.jE],
      r[IamSerializationKeys.kE],
      buttonsFromSerializedInAppMessage(r[IamSerializationKeys.vE]),
      r[IamSerializationKeys.wE],
      r[IamSerializationKeys.VE],
      r[IamSerializationKeys.CSS],
      r[IamSerializationKeys.JE],
      r[IamSerializationKeys.LANGUAGE],
      r[IamSerializationKeys.Ns],
    );
  }
}

class SlideUpMessage extends InAppMessage {
  constructor(
    t,
    s,
    e,
    o,
    i,
    r,
    n,
    d,
    a,
    p,
    u,
    m,
    c,
    l,
    v,
    f,
    x,
    h,
    g,
    j,
    I,
    M,
    b,
    z,
  ) {
    (f = f || IamColors.LE),
      (v = v || IamColors.OE),
      super(
        t,
        (s = s || IamTextAlignment.START),
        e,
        o,
        i,
        r,
        n,
        d,
        a,
        p,
        u,
        m,
        void 0,
        c,
        l,
        v,
        f,
        x,
        h,
        g,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        j,
        I,
        M,
        b,
        z,
      ),
      (this.Go = IamTextAlignment.START);
  }
  zo() {
    return !1;
  }
  Ko() {
    const t = document.createElement("span");
    return t.appendChild(document.createTextNode(this.message || "")), t;
  }
  eh(t) {
    const s = t.getElementsByClassName("ab-in-app-message")[0];
    DOMUtils.td(s, !0, !0) ||
      (this.slideFrom === IamSlideFrom.TOP
        ? (s.style.top = "0px")
        : (s.style.bottom = "0px")),
      super.eh(t);
  }
  qt() {
    return super.qt(IamServerTypes.sE);
  }
  static ha(t) {
    return new SlideUpMessage(
      t[IamSerializationKeys.rE],
      t[IamSerializationKeys.mE],
      t[IamSerializationKeys.GE],
      t[IamSerializationKeys.Is],
      t[IamSerializationKeys.FE],
      t[IamSerializationKeys.HE],
      t[IamSerializationKeys.URI],
      t[IamSerializationKeys.xE],
      t[IamSerializationKeys.BE],
      t[IamSerializationKeys.lE],
      t[IamSerializationKeys.bE],
      t[IamSerializationKeys.Bs],
      t[IamSerializationKeys.YE],
      t[IamSerializationKeys.KE],
      t[IamSerializationKeys.XE],
      t[IamSerializationKeys.dE],
      t[IamSerializationKeys.hE],
      t[IamSerializationKeys.yE],
      t[IamSerializationKeys.uE],
      t[IamSerializationKeys.VE],
      t[IamSerializationKeys.CSS],
      t[IamSerializationKeys.JE],
      t[IamSerializationKeys.LANGUAGE],
      t[IamSerializationKeys.Ns],
    );
  }
}

function newInAppMessageFromJson(e) {
  if (!e) return null;
  if (e.is_control) return ControlMessage.fromJson(e);
  let o = e.type;
  null != o && (o = o.toUpperCase());
  const s = e.message,
    n = e.text_align_message,
    t = e.slide_from,
    r = e.extras,
    m = e.trigger_id,
    l = e.click_action,
    i = e.uri,
    f = e.open_target,
    p = e.message_close,
    u = e.duration,
    a = e.icon,
    d = e.image_url,
    c = e.image_style,
    g = e.icon_color,
    j = e.icon_bg_color,
    w = e.bg_color,
    h = e.text_color,
    v = e.close_btn_color,
    x = e.header,
    I = e.text_align_header,
    A = e.header_text_color,
    F = e.frame_color,
    M = [];
  let k = e.btns;
  null == k && (k = []);
  for (let e = 0; e < k.length; e++) M.push(InAppMessageButton.fromJson(k[e]));
  const y = e.crop_type,
    z = e.orientation,
    J = e.animate_in,
    S = e.animate_out;
  let q = e.html_id,
    B = e.css;
  (null != q && "" !== q && null != B && "" !== B) ||
    ((q = void 0), (B = void 0));
  const C = e.message_extras,
    D = e.language,
    E = e.image_alt;
  let G;
  if (o === IamServerTypes.aE || o === IamServerTypes.UE)
    G = new ModalMessage(
      s,
      n,
      r,
      m,
      l,
      i,
      f,
      p,
      u,
      a,
      d,
      c,
      g,
      j,
      w,
      h,
      v,
      J,
      S,
      x,
      I,
      A,
      F,
      M,
      y,
      q,
      B,
      C,
      D,
      E,
    );
  else if (o === IamServerTypes.cE)
    G = new FullScreenMessage(
      s,
      n,
      r,
      m,
      l,
      i,
      f,
      p,
      u,
      a,
      d,
      c,
      g,
      j,
      w,
      h,
      v,
      J,
      S,
      x,
      I,
      A,
      F,
      M,
      y,
      z,
      q,
      B,
      C,
      D,
      E,
    );
  else if (o === IamServerTypes.sE)
    G = new SlideUpMessage(
      s,
      n,
      t,
      r,
      m,
      l,
      i,
      f,
      p,
      u,
      a,
      d,
      g,
      j,
      w,
      h,
      v,
      J,
      S,
      q,
      B,
      C,
      D,
      E,
    );
  else {
    if (o !== IamServerTypes.iE && o !== IamServerTypes.PE && o !== IamServerTypes.nE)
      return void b$1.error("Ignoring message with unknown type " + o);
    {
      const o = e.message_fields;
      (G = new HtmlMessage(s, r, m, p, u, J, S, F, q, B, o, C)),
        (G.trusted = e.trusted || !1);
    }
  }
  return (G.ko = o), G;
}
function buttonsFromSerializedInAppMessage(e) {
  const o = [];
  for (const s of e)
    o.push(
      new InAppMessageButton(
        s.text,
        s.backgroundColor,
        s.textColor,
        s.borderColor,
        s.clickAction,
        s.uri,
        s.id,
      ),
    );
  return o;
}

class es {
  constructor(t) {
    (this.xc = t), (this.xc = t);
  }
  zc(t) {
    return null == this.xc || this.xc === t[0];
  }
  static fromJson(t) {
    return new es(t ? t.event_name : null);
  }
  qt() {
    return this.xc;
  }
}

class hr {
  constructor(t, s, e, i) {
    (this.tT = t),
      (this.sT = s),
      (this.comparator = e),
      (this.eT = i),
      (this.tT = t),
      (this.sT = s),
      (this.comparator = e),
      (this.eT = i),
      this.sT === hr.lT.iT &&
        this.comparator !== hr.hT.rT &&
        this.comparator !== hr.hT.nT &&
        this.comparator !== hr.hT.uT &&
        this.comparator !== hr.hT.oT &&
        (this.eT = dateFromUnixTimestamp(this.eT));
  }
  zc(t) {
    let s = null;
    switch ((null != t && (s = t[this.tT]), this.comparator)) {
      case hr.hT.ET:
        return null != s && s.valueOf() === this.eT.valueOf();
      case hr.hT.aT:
        return null == s || s.valueOf() !== this.eT.valueOf();
      case hr.hT.TT:
        return null != s && typeof s == typeof this.eT && s > this.eT;
      case hr.hT.rT:
        return this.sT === hr.lT.iT
          ? null != s && isDate(s) && secondsAgo(s) <= this.eT.valueOf()
          : null != s && typeof s == typeof this.eT && s >= this.eT;
      case hr.hT.cT:
        return null != s && typeof s == typeof this.eT && s < this.eT;
      case hr.hT.nT:
        return this.sT === hr.lT.iT
          ? null != s && isDate(s) && secondsAgo(s) >= this.eT.valueOf()
          : null != s && typeof s == typeof this.eT && s <= this.eT;
      case hr.hT.AT:
        return (
          null != s &&
          "string" == typeof s &&
          typeof s == typeof this.eT &&
          null != s.match(this.eT)
        );
      case hr.hT._T:
        return null != s;
      case hr.hT.fT:
        return null == s;
      case hr.hT.uT:
        return null != s && isDate(s) && secondsInTheFuture(s) < this.eT;
      case hr.hT.oT:
        return null != s && isDate(s) && secondsInTheFuture(s) > this.eT;
      case hr.hT.pT:
        return (
          null == s ||
          typeof s != typeof this.eT ||
          "string" != typeof s ||
          null == s.match(this.eT)
        );
    }
    return !1;
  }
  static fromJson(t) {
    return new hr(
      t.property_key,
      t.property_type,
      t.comparator,
      t.property_value,
    );
  }
  qt() {
    let t = this.eT;
    return (
      isDate(this.eT) && (t = convertMsToSeconds(t.valueOf())),
      { k: this.tT, t: this.sT, c: this.comparator, v: t }
    );
  }
  static _u(t) {
    return new hr(t.k, t.t, t.c, t.v);
  }
}
(hr.lT = { yT: "boolean", ST: "number", NT: "string", iT: "date" }),
  (hr.hT = {
    ET: 1,
    aT: 2,
    TT: 3,
    rT: 4,
    cT: 5,
    nT: 6,
    AT: 10,
    _T: 11,
    fT: 12,
    uT: 15,
    oT: 16,
    pT: 17,
  });

class ls {
  constructor(t) {
    (this.filters = t), (this.filters = t);
  }
  zc(t) {
    let r = !0;
    for (let e = 0; e < this.filters.length; e++) {
      const o = this.filters[e];
      let s = !1;
      for (let r = 0; r < o.length; r++)
        if (o[r].zc(t)) {
          s = !0;
          break;
        }
      if (!s) {
        r = !1;
        break;
      }
    }
    return r;
  }
  static fromJson(t) {
    if (null == t || !isArray(t)) return null;
    const r = [];
    for (let e = 0; e < t.length; e++) {
      const o = [],
        s = t[e];
      for (let t = 0; t < s.length; t++) o.push(hr.fromJson(s[t]));
      r.push(o);
    }
    return new ls(r);
  }
  qt() {
    const t = [];
    for (let r = 0; r < this.filters.length; r++) {
      const e = this.filters[r],
        o = [];
      for (let t = 0; t < e.length; t++) o.push(e[t].qt());
      t.push(o);
    }
    return t;
  }
  static _u(t) {
    const r = [];
    for (let e = 0; e < t.length; e++) {
      const o = [],
        s = t[e];
      for (let t = 0; t < s.length; t++) o.push(hr._u(s[t]));
      r.push(o);
    }
    return new ls(r);
  }
}

class ns {
  constructor(t, s) {
    (this.xc = t), (this.tf = s), (this.xc = t), (this.tf = s);
  }
  zc(t) {
    if (null == this.xc || null == this.tf) return !1;
    const s = t[0],
      i = t[1];
    return s === this.xc && this.tf.zc(i);
  }
  static fromJson(t) {
    return new ns(
      t ? t.event_name : null,
      t ? ls.fromJson(t.property_filters) : null,
    );
  }
  qt() {
    return { e: this.xc, pf: this.tf ? this.tf.qt() : null };
  }
}

class bi {
  constructor(t, i) {
    (this.if = t), (this.rf = i), (this.if = t), (this.rf = i);
  }
  zc(t) {
    if (null == this.if) return !1;
    const i = pi.sf(t[0], this.if);
    if (!i) return !1;
    let r = null == this.rf || 0 === this.rf.length;
    if (null != this.rf)
      for (let i = 0; i < this.rf.length; i++)
        if (this.rf[i] === t[1]) {
          r = !0;
          break;
        }
    return i && r;
  }
  static fromJson(t) {
    return new bi(t ? t.id : null, t ? t.buttons : null);
  }
  qt() {
    return this.if;
  }
}

class os {
  constructor(t) {
    (this.productId = t), (this.productId = t);
  }
  zc(t) {
    return null == this.productId || t[0] === this.productId;
  }
  static fromJson(t) {
    return new os(t ? t.product_id : null);
  }
  qt() {
    return this.productId;
  }
}

class fs {
  constructor(t, s) {
    (this.productId = t), (this.tf = s), (this.productId = t), (this.tf = s);
  }
  zc(t) {
    if (null == this.productId || null == this.tf) return !1;
    const s = t[0],
      i = t[1];
    return s === this.productId && this.tf.zc(i);
  }
  static fromJson(t) {
    return new fs(
      t ? t.product_id : null,
      t ? ls.fromJson(t.property_filters) : null,
    );
  }
  qt() {
    return { id: this.productId, pf: this.tf ? this.tf.qt() : null };
  }
}

class jr {
  constructor(t) {
    (this.if = t), (this.if = t);
  }
  zc(t) {
    return null == this.if || pi.sf(t[0], this.if);
  }
  static fromJson(t) {
    return new jr(t ? t.campaign_id : null);
  }
  qt() {
    return this.if;
  }
}

var ot = {
  OPEN: "open",
  qr: "purchase",
  Sr: "push_click",
  he: "custom_event",
  rm: "iam_click",
  Os: "test",
};

class pi {
  constructor(e, t) {
    (this.type = e), (this.data = t), (this.type = e), (this.data = t);
  }
  _c(e, t) {
    return pi.Ec[this.type] === e && (null == this.data || this.data.zc(t));
  }
  static sf(e, t) {
    let r = null;
    try {
      r = window.atob(e);
    } catch (t) {
      return b$1.info("Failed to unencode analytics id " + e + ": " + getErrorMessage(t)), !1;
    }
    return t === r.split("_")[0];
  }
  static fromJson(e) {
    const t = e.type;
    let r = null;
    switch (t) {
      case pi.la.OPEN:
      case pi.la.Os:
        break;
      case pi.la.qr:
        r = os.fromJson(e.data);
        break;
      case pi.la.Pc:
        r = fs.fromJson(e.data);
        break;
      case pi.la.Sr:
        r = jr.fromJson(e.data);
        break;
      case pi.la.he:
        r = es.fromJson(e.data);
        break;
      case pi.la.Rc:
        r = ns.fromJson(e.data);
        break;
      case pi.la.rm:
        r = bi.fromJson(e.data);
    }
    return new pi(t, r);
  }
  qt() {
    return { t: this.type, d: this.data ? this.data.qt() : null };
  }
  static _u(e) {
    let t,
      r = null;
    switch (e.t) {
      case pi.la.OPEN:
      case pi.la.Os:
        break;
      case pi.la.qr:
        r = new os(e.d);
        break;
      case pi.la.Pc:
        (t = e.d || {}), (r = new fs(t.id, ls._u(t.pf || [])));
        break;
      case pi.la.Sr:
        r = new jr(e.d);
        break;
      case pi.la.he:
        r = new es(e.d);
        break;
      case pi.la.Rc:
        (t = e.d || {}), (r = new ns(t.e, ls._u(t.pf || [])));
        break;
      case pi.la.rm:
        r = new bi(e.d);
    }
    return new pi(e.t, r);
  }
}
(pi.la = {
  OPEN: "open",
  qr: "purchase",
  Pc: "purchase_property",
  Sr: "push_click",
  he: "custom_event",
  Rc: "custom_event_property",
  rm: "iam_click",
  Os: "test",
}),
  (pi.Ec = {}),
  (pi.Ec[pi.la.OPEN] = ot.OPEN),
  (pi.Ec[pi.la.qr] = ot.qr),
  (pi.Ec[pi.la.Pc] = ot.qr),
  (pi.Ec[pi.la.Sr] = ot.Sr),
  (pi.Ec[pi.la.he] = ot.he),
  (pi.Ec[pi.la.Rc] = ot.he),
  (pi.Ec[pi.la.rm] = ot.rm),
  (pi.Ec[pi.la.Os] = ot.Os);

class gt {
  constructor(t, i = [], s, e, r = 0, h, l, o = 0, n = gt.Dd, a, u, d) {
    (this.id = t),
      (this.Pd = i),
      (this.startTime = s),
      (this.endTime = e),
      (this.priority = r),
      (this.type = h),
      (this.data = l),
      (this.yd = o),
      (this.jd = n),
      (this.ca = a),
      (this.Nd = u),
      (this._d = d),
      (this.id = t),
      (this.Pd = i || []),
      void 0 === s && (s = null),
      (this.startTime = s),
      void 0 === e && (e = null),
      (this.endTime = e),
      (this.priority = r || 0),
      (this.type = h),
      (this.yd = o || 0),
      null == a && (a = 1e3 * (this.yd + 30)),
      (this.ca = a),
      (this.data = l),
      null != n && (this.jd = n),
      (this.Nd = u),
      (this._d = d || null);
  }
  Ad(t) {
    return (
      null == this._d || (this.jd !== gt.Dd && t - this._d >= 1e3 * this.jd)
    );
  }
  Id(t) {
    this._d = t;
  }
  $d(t) {
    const i = t + 1e3 * this.yd;
    return Math.max(i - new Date().valueOf(), 0);
  }
  xd(t) {
    const i = new Date().valueOf() - t,
      s = null == t || isNaN(i) || null == this.ca || i < this.ca;
    return (
      s ||
        b$1.info(
          `Trigger action ${this.type} is no longer eligible for display - fired ${i}ms ago and has a timeout of ${this.ca}ms.`,
        ),
      !s
    );
  }
  static fromJson(t) {
    const i = t.id,
      s = [];
    for (let i = 0; i < t.trigger_condition.length; i++)
      s.push(pi.fromJson(t.trigger_condition[i]));
    const e = dateFromUnixTimestamp(t.start_time),
      r = dateFromUnixTimestamp(t.end_time),
      h = t.priority,
      l = t.type,
      o = t.delay,
      n = t.re_eligibility,
      a = t.timeout,
      u = t.data,
      d = t.min_seconds_since_last_trigger;
    return validateValueIsFromEnum(
      gt.la,
      l,
      "Could not construct Trigger from server data",
      "Trigger.Types",
    )
      ? new gt(i, s, e, r, h, l, u, o, n, a, d)
      : null;
  }
  qt() {
    const t = [];
    for (let i = 0; i < this.Pd.length; i++) t.push(this.Pd[i].qt());
    return {
      i: this.id,
      c: t,
      s: this.startTime,
      e: this.endTime,
      p: this.priority,
      t: this.type,
      da: this.data,
      d: this.yd,
      r: this.jd,
      tm: this.ca,
      ss: this.Nd,
      ld: this._d,
    };
  }
  static _u(t) {
    const i = [],
      s = t.c || [];
    for (let t = 0; t < s.length; t++) i.push(pi._u(s[t]));
    return new gt(
      t.i,
      i,
      rehydrateDateAfterJsonization(t.s),
      rehydrateDateAfterJsonization(t.e),
      t.p,
      t.t,
      t.da,
      t.d,
      t.r,
      t.tm,
      t.ss,
      t.ld,
    );
  }
}
(gt.la = { oa: "inapp", zd: "templated_iam" }), (gt.Dd = -1);

function attachCSS(n, t, o) {
  const c = n || document.querySelector("head"),
    e = `ab-${t}-css-definitions-${"6.9.0".replace(/\./g, "-")}`;
  if (!c) return;
  const s = c.ownerDocument || document;
  if (null == s.getElementById(e)) {
    const n = s.createElement("style");
    (n.innerHTML = o || ""), (n.id = e);
    const t = r.er(U.sr);
    null != t && n.setAttribute("nonce", t), c.appendChild(n);
  }
}

function loadFontAwesome() {
  if (r.er(U.Uh)) return;
  const e = "https://use.fontawesome.com/7f85a56ba4.css";
  if (
    !(null !== document.querySelector('link[rel=stylesheet][href="' + e + '"]'))
  ) {
    const t = document.createElement("link");
    t.setAttribute("rel", "stylesheet"),
      t.setAttribute("href", e),
      document.getElementsByTagName("head")[0].appendChild(t);
  }
}

function attachFeedCSS(t) {
  attachCSS(
    t,
    "feed",
    "body>.ab-feed{position:fixed;top:0;right:0;bottom:0;width:421px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}body>.ab-feed .ab-feed-body{position:absolute;top:0;left:0;right:0;border:none;border-left:1px solid #d0d0d0;padding-top:70px;min-height:100%}body>.ab-feed .ab-initial-spinner{float:none}body>.ab-feed .ab-no-cards-message{position:absolute;width:100%;margin-left:-20px;top:40%}.ab-feed{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 1px 7px 1px rgba(66,82,113,.15);-moz-box-shadow:0 1px 7px 1px rgba(66,82,113,.15);box-shadow:0 1px 7px 1px rgba(66,82,113,.15);width:402px;background-color:#eee;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;font-size:13px;line-height:130%;letter-spacing:normal;overflow-y:auto;overflow-x:visible;z-index:9011;-webkit-overflow-scrolling:touch}.ab-feed :focus,.ab-feed:focus{outline:0}.ab-feed .ab-feed-body{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border:1px solid #d0d0d0;border-top:none;padding:20px 20px 0 20px}.ab-feed.ab-effect-slide{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px);-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-feed.ab-effect-slide.ab-show{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}.ab-feed.ab-effect-slide.ab-hide{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px)}.ab-feed .ab-card{position:relative;-webkit-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-moz-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;width:100%;border:1px solid #d0d0d0;margin-bottom:20px;overflow:hidden;background-color:#fff;-webkit-transition:height .4s ease-in-out,margin .4s ease-in-out;-moz-transition:height .4s ease-in-out,margin .4s ease-in-out;-o-transition:height .4s ease-in-out,margin .4s ease-in-out;transition:height .4s ease-in-out,margin .4s ease-in-out}.ab-feed .ab-card .ab-pinned-indicator{position:absolute;right:0;top:0;margin-right:-1px;width:0;height:0;border-style:solid;border-width:0 24px 24px 0;border-color:transparent #1676d0 transparent transparent}.ab-feed .ab-card .ab-pinned-indicator .fa-star{position:absolute;right:-21px;top:2px;font-size:9px;color:#fff}.ab-feed .ab-card.ab-effect-card.ab-hide{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}.ab-feed .ab-card.ab-effect-card.ab-hide.ab-swiped-left{-webkit-transform:translateX(-450px);-moz-transform:translateX(-450px);-ms-transform:translateX(-450px);transform:translateX(-450px)}.ab-feed .ab-card.ab-effect-card.ab-hide.ab-swiped-right{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px)}.ab-feed .ab-card.ab-effect-card.ab-hide:not(.ab-swiped-left):not(.ab-swiped-right){opacity:0}.ab-feed .ab-card .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-size:15px;border:none;width:15px;min-width:15px;height:15px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:15px;padding-bottom:15px;position:absolute;top:0;z-index:9021;opacity:0;-webkit-transition:.5s;-moz-transition:.5s;-o-transition:.5s;transition:.5s}.ab-feed .ab-card .ab-close-button[dir=rtl]{left:0}.ab-feed .ab-card .ab-close-button[dir=ltr]{right:0}.ab-feed .ab-card .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b;height:auto;width:100%}.ab-feed .ab-card .ab-close-button svg.ab-chevron{display:none}.ab-feed .ab-card .ab-close-button:active{background-color:transparent}.ab-feed .ab-card .ab-close-button:focus{background-color:transparent}.ab-feed .ab-card .ab-close-button:hover{background-color:transparent}.ab-feed .ab-card .ab-close-button:hover svg{fill-opacity:.8}.ab-feed .ab-card .ab-close-button:hover{opacity:1}.ab-feed .ab-card .ab-close-button:focus{opacity:1}.ab-feed .ab-card a{float:none;color:inherit;text-decoration:none}.ab-feed .ab-card a:hover{text-decoration:underline}.ab-feed .ab-card .ab-image-area{float:none;display:inline-block;vertical-align:top;line-height:0;overflow:hidden;width:100%;-webkit-box-sizing:initial;-moz-box-sizing:initial;box-sizing:initial}.ab-feed .ab-card .ab-image-area img{float:none;height:auto;width:100%}.ab-feed .ab-card.ab-image-only .ab-card-body{display:none}.ab-feed .ab-card .ab-card-body{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:inline-block;width:100%;position:relative}.ab-feed .ab-card .ab-unread-indicator{position:absolute;bottom:0;margin-right:-1px;width:100%;height:5px;background-color:#1676d0}.ab-feed .ab-card .ab-unread-indicator.read{background-color:transparent}.ab-feed .ab-card .ab-title{float:none;letter-spacing:0;margin:0;font-weight:700;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;display:block;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;font-size:18px;line-height:130%;padding:20px 25px 0 25px}.ab-feed .ab-card .ab-description{float:none;color:#545454;padding:15px 25px 20px 25px;word-wrap:break-word;white-space:pre-wrap}.ab-feed .ab-card .ab-description.ab-no-title{padding-top:20px}.ab-feed .ab-card .ab-url-area{float:none;color:#1676d0;margin-top:12px;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif}.ab-feed .ab-card.ab-classic-card .ab-card-body{min-height:40px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.ab-feed .ab-card.ab-classic-card.with-image .ab-card-body{min-height:100px}.ab-feed .ab-card.ab-classic-card.with-image .ab-card-body[dir=ltr]{padding-left:72px}.ab-feed .ab-card.ab-classic-card.with-image .ab-card-body[dir=rtl]{padding-right:72px}.ab-feed .ab-card.ab-classic-card.with-image .ab-image-area{width:60px;height:60px;padding:20px 0 25px 25px;position:absolute}.ab-feed .ab-card.ab-classic-card.with-image .ab-image-area[dir=rtl]{padding:20px 25px 25px 0}.ab-feed .ab-card.ab-classic-card.with-image .ab-image-area img{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;max-width:100%;max-height:100%;width:auto;height:auto}.ab-feed .ab-card.ab-classic-card.with-image .ab-title{background-color:transparent;font-size:16px}.ab-feed .ab-card.ab-classic-card.with-image .ab-description{padding-top:10px}.ab-feed .ab-card.ab-control-card{height:0;width:0;margin:0;border:0}.ab-feed .ab-feed-buttons-wrapper{float:none;position:relative;background-color:#282828;height:50px;-webkit-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-moz-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);box-shadow:0 2px 3px 0 rgba(178,178,178,.5);z-index:1}.ab-feed .ab-feed-buttons-wrapper .ab-close-button,.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button{float:none;cursor:pointer;color:#fff;font-size:18px;padding:16px;-webkit-transition:.2s;-moz-transition:.2s;-o-transition:.2s;transition:.2s}.ab-feed .ab-feed-buttons-wrapper .ab-close-button:hover,.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button:hover{font-size:22px}.ab-feed .ab-feed-buttons-wrapper .ab-close-button{float:right}.ab-feed .ab-feed-buttons-wrapper .ab-close-button:hover{padding-top:12px;padding-right:14px}.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button{padding-left:17px}.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button:hover{padding-top:13px;padding-left:14px}.ab-feed .ab-no-cards-message{text-align:center;margin-bottom:20px}@media (max-width:600px){body>.ab-feed{width:100%}}",
  );
}
function setupFeedUI() {
  attachFeedCSS(), loadFontAwesome();
}

function attachInAppMessageCSS(t) {
  attachCSS(
    t,
    "iam",
    ".ab-pause-scrolling,body.ab-pause-scrolling,html.ab-pause-scrolling{overflow:hidden;touch-action:none}.ab-iam-root.v3{position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:9011;-webkit-tap-highlight-color:transparent}.ab-iam-root.v3:focus{outline:0}.ab-iam-root.v3.ab-effect-fullscreen,.ab-iam-root.v3.ab-effect-html,.ab-iam-root.v3.ab-effect-modal{opacity:0}.ab-iam-root.v3.ab-effect-fullscreen.ab-show,.ab-iam-root.v3.ab-effect-html.ab-show,.ab-iam-root.v3.ab-effect-modal.ab-show{opacity:1}.ab-iam-root.v3.ab-effect-fullscreen.ab-show.ab-animate-in,.ab-iam-root.v3.ab-effect-html.ab-show.ab-animate-in,.ab-iam-root.v3.ab-effect-modal.ab-show.ab-animate-in{-webkit-transition:opacity .5s;-moz-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s}.ab-iam-root.v3.ab-effect-fullscreen.ab-hide,.ab-iam-root.v3.ab-effect-html.ab-hide,.ab-iam-root.v3.ab-effect-modal.ab-hide{opacity:0}.ab-iam-root.v3.ab-effect-fullscreen.ab-hide.ab-animate-out,.ab-iam-root.v3.ab-effect-html.ab-hide.ab-animate-out,.ab-iam-root.v3.ab-effect-modal.ab-hide.ab-animate-out{-webkit-transition:opacity .5s;-moz-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s}.ab-iam-root.v3.ab-effect-slide .ab-in-app-message{-webkit-transform:translateX(535px);-moz-transform:translateX(535px);-ms-transform:translateX(535px);transform:translateX(535px)}.ab-iam-root.v3.ab-effect-slide.ab-show .ab-in-app-message{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}.ab-iam-root.v3.ab-effect-slide.ab-show.ab-animate-in .ab-in-app-message{-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message{-webkit-transform:translateX(535px);-moz-transform:translateX(535px);-ms-transform:translateX(535px);transform:translateX(535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-left{-webkit-transform:translateX(-535px);-moz-transform:translateX(-535px);-ms-transform:translateX(-535px);transform:translateX(-535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-up{-webkit-transform:translateY(-535px);-moz-transform:translateY(-535px);-ms-transform:translateY(-535px);transform:translateY(-535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-down{-webkit-transform:translateY(535px);-moz-transform:translateY(535px);-ms-transform:translateY(535px);transform:translateY(535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide.ab-animate-out .ab-in-app-message{-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-iam-root.v3 .ab-ios-scroll-wrapper{position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto;pointer-events:all;touch-action:auto;-webkit-overflow-scrolling:touch}.ab-iam-root.v3 .ab-in-app-message{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:fixed;text-align:center;-webkit-box-shadow:0 0 4px rgba(0,0,0,.3);-moz-box-shadow:0 0 4px rgba(0,0,0,.3);box-shadow:0 0 4px rgba(0,0,0,.3);line-height:normal;letter-spacing:normal;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;z-index:9011;max-width:100%;overflow:hidden;display:inline-block;pointer-events:all;color:#333;color-scheme:normal}.ab-iam-root.v3 .ab-in-app-message.ab-no-shadow{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.ab-iam-root.v3 .ab-in-app-message :focus,.ab-iam-root.v3 .ab-in-app-message:focus{outline:0}.ab-iam-root.v3 .ab-in-app-message.ab-clickable{cursor:pointer}.ab-iam-root.v3 .ab-in-app-message.ab-background{background-color:#fff}.ab-iam-root.v3 .ab-in-app-message .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-size:15px;border:none;width:15px;min-width:15px;height:15px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:15px;padding-bottom:15px;position:absolute;top:0;z-index:9021}.ab-iam-root.v3 .ab-in-app-message .ab-close-button[dir=rtl]{left:0}.ab-iam-root.v3 .ab-in-app-message .ab-close-button[dir=ltr]{right:0}.ab-iam-root.v3 .ab-in-app-message .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b;height:auto;width:100%}.ab-iam-root.v3 .ab-in-app-message .ab-close-button svg.ab-chevron{display:none}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:active{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:focus{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:hover{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:hover svg{fill-opacity:.8}.ab-iam-root.v3 .ab-in-app-message .ab-message-text{float:none;line-height:1.5;margin:20px 25px;max-width:100%;overflow:hidden;overflow-y:auto;vertical-align:text-bottom;word-wrap:break-word;white-space:pre-wrap;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif}.ab-iam-root.v3 .ab-in-app-message .ab-message-text.start-aligned{text-align:start}.ab-iam-root.v3 .ab-in-app-message .ab-message-text.end-aligned{text-align:end}.ab-iam-root.v3 .ab-in-app-message .ab-message-text.center-aligned{text-align:center}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar{-webkit-appearance:none;width:14px}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-thumb{-webkit-appearance:none;border:4px solid transparent;background-clip:padding-box;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;background-color:rgba(0,0,0,.2)}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-button{width:0;height:0;display:none}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-corner{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-message-header{float:none;letter-spacing:0;margin:0;font-weight:700;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;display:block;font-size:20px;margin-bottom:10px;line-height:1.3}.ab-iam-root.v3 .ab-in-app-message .ab-message-header.start-aligned{text-align:start}.ab-iam-root.v3 .ab-in-app-message .ab-message-header.end-aligned{text-align:end}.ab-iam-root.v3 .ab-in-app-message .ab-message-header.center-aligned{text-align:center}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message.ab-modal,.ab-iam-root.v3 .ab-in-app-message.ab-slideup{-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;cursor:pointer;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;font-size:14px;font-weight:700;margin:20px;margin-top:calc(constant(safe-area-inset-top,0) + 20px);margin-right:calc(constant(safe-area-inset-right,0) + 20px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 20px);margin-left:calc(constant(safe-area-inset-left,0) + 20px);margin-top:calc(env(safe-area-inset-top,0) + 20px);margin-right:calc(env(safe-area-inset-right,0) + 20px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 20px);margin-left:calc(env(safe-area-inset-left,0) + 20px);max-height:150px;padding:10px;right:0;background-color:#efefef}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone{max-height:66px;margin:10px;margin-top:calc(constant(safe-area-inset-top,0) + 10px);margin-right:calc(constant(safe-area-inset-right,0) + 10px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 10px);margin-left:calc(constant(safe-area-inset-left,0) + 10px);margin-top:calc(env(safe-area-inset-top,0) + 10px);margin-right:calc(env(safe-area-inset-right,0) + 10px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 10px);margin-left:calc(env(safe-area-inset-left,0) + 10px);max-width:90%;max-width:calc(100% - 40px);min-width:90%;min-width:calc(100% - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button svg:not(.ab-chevron){display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button{display:block;height:20px;padding:0 20px 0 18px;pointer-events:none;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:12px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button svg.ab-chevron{display:inline}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button svg.ab-chevron.rtl{-webkit-transform:scaleX(-1);-moz-transform:scaleX(-1);-ms-transform:scaleX(-1);transform:scaleX(-1)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-message-text{border-right-width:40px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text{max-width:100%;border-right-width:10px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text span{max-height:66px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-image{max-width:80%;max-width:calc(100% - 50px - 5px - 10px - 25px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area{width:50px;height:50px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area img{max-width:100%;max-height:100%;width:auto;height:auto}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:active .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-message-text{opacity:.8}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:active .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-close-button svg.ab-chevron{fill-opacity:.8}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:table-cell;border-color:transparent;border-style:solid;border-width:5px 25px 5px 10px;max-width:430px;vertical-align:middle;margin:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text[dir=rtl]{border-width:5px 10px 5px 25px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text span{display:block;max-height:150px;overflow:auto}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-image{max-width:365px;border-top:0;border-bottom:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-size:15px;border:none;width:15px;min-width:15px;height:15px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:15px;padding-bottom:15px;position:absolute;top:0;z-index:9021}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button[dir=rtl]{left:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button[dir=ltr]{right:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b;height:auto;width:100%}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg.ab-chevron{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:active{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:focus{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:hover{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:hover svg{fill-opacity:.8}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area{float:none;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:table-cell;border-color:transparent;border-style:solid;border-width:5px 0 5px 5px;vertical-align:top;width:60px;margin:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area.ab-icon-area{width:auto}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area img{float:none;width:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message.ab-modal{font-size:14px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area{float:none;position:relative;display:block;overflow:hidden}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area .ab-center-cropped-img,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area .ab-center-cropped-img{position:absolute;top:0;right:0;bottom:0;left:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area .ab-center-cropped-img img,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area .ab-center-cropped-img img{width:100%;height:100%;object-fit:cover;object-position:center}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-icon,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-icon{margin-top:20px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic{padding:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-message-text{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-message-buttons{bottom:0;left:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area{float:none;height:auto;margin:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{display:block;top:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none}.ab-iam-root.v3 .ab-in-app-message.ab-modal{padding-top:20px;width:450px;max-width:450px;max-height:720px}.ab-iam-root.v3 .ab-in-app-message.ab-modal.simulate-phone{max-width:91%;max-width:calc(100% - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal.simulate-phone.graphic .ab-image-area img{max-width:91vw;max-width:calc(100vw - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text{max-height:660px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-image{max-height:524.82758621px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-icon{max-height:610px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons{margin-bottom:93px;max-height:587px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-image{max-height:451.82758621px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-icon{max-height:537px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area{margin-top:-20px;max-height:155.17241379px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area img{max-width:100%;max-height:155.17241379px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area.ab-icon-area{height:auto}.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic{width:auto;overflow:hidden}.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area{display:inline}.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{width:auto;max-height:720px;max-width:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen{width:450px;max-height:720px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape{width:720px;max-height:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape .ab-image-area{height:225px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape.graphic .ab-image-area{height:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape .ab-message-text{max-height:112px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-message-text{max-height:247px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-message-text.ab-with-buttons{margin-bottom:93px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area{height:360px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area{height:720px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone{-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-html-message{background-color:transparent;border:none;height:100%;overflow:auto;position:relative;touch-action:auto;width:100%}.ab-iam-root.v3 .ab-in-app-message .ab-message-buttons{position:absolute;bottom:0;width:100%;padding:17px 25px 30px 25px;z-index:inherit;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ab-iam-root.v3 .ab-in-app-message .ab-message-button{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;cursor:pointer;display:inline-block;font-size:14px;font-weight:700;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;height:44px;line-height:normal;letter-spacing:normal;margin:0;max-width:100%;min-width:80px;padding:0 12px;position:relative;text-transform:none;width:48%;width:calc(50% - 5px);border:1px solid #1b78cf;-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;word-wrap:normal;white-space:nowrap}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:first-of-type{float:left;background-color:#fff;color:#1b78cf}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:last-of-type{float:right;background-color:#1b78cf;color:#fff}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:first-of-type:last-of-type{float:none;width:auto}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:after{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:hover{opacity:.8}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:active:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.08)}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:focus:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.15)}.ab-iam-root.v3 .ab-in-app-message .ab-message-button a{color:inherit;text-decoration:inherit}.ab-iam-root.v3 .ab-in-app-message img{float:none;display:inline-block}.ab-iam-root.v3 .ab-in-app-message .ab-icon{float:none;display:inline-block;padding:10px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.ab-iam-root.v3 .ab-in-app-message .ab-icon .fa{float:none;font-size:30px;width:30px}.ab-iam-root.v3 .ab-start-hidden{visibility:hidden}.ab-iam-root.v3 .ab-centered{margin:auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ab-iam-root.v3{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.ab-iam-root.v3 .ab-page-blocker{position:fixed;top:0;left:0;width:100%;height:100%;z-index:9001;pointer-events:all;background-color:rgba(51,51,51,.75)}@media (max-width:600px){.ab-iam-root.v3 .ab-in-app-message.ab-slideup{max-height:66px;margin:10px;margin-top:calc(constant(safe-area-inset-top,0) + 10px);margin-right:calc(constant(safe-area-inset-right,0) + 10px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 10px);margin-left:calc(constant(safe-area-inset-left,0) + 10px);margin-top:calc(env(safe-area-inset-top,0) + 10px);margin-right:calc(env(safe-area-inset-right,0) + 10px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 10px);margin-left:calc(env(safe-area-inset-left,0) + 10px);max-width:90%;max-width:calc(100% - 40px);min-width:90%;min-width:calc(100% - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg:not(.ab-chevron){display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-close-button{display:block;height:20px;padding:0 20px 0 18px;pointer-events:none;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:12px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-close-button svg.ab-chevron{display:inline}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-close-button svg.ab-chevron.rtl{-webkit-transform:scaleX(-1);-moz-transform:scaleX(-1);-ms-transform:scaleX(-1);transform:scaleX(-1)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-message-text{border-right-width:40px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text{max-width:100%;border-right-width:10px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text span{max-height:66px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-image{max-width:80%;max-width:calc(100% - 50px - 5px - 10px - 25px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area{width:50px;height:50px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area img{max-width:100%;max-height:100%;width:auto;height:auto}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape{-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-close-button,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-message-text,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape:not(.graphic),.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen:not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape:not(.graphic) .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen:not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic{display:block}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic .ab-message-button,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-width:480px){.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop){max-width:91%;max-width:calc(100% - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop).graphic .ab-image-area img{max-width:91vw;max-width:calc(100vw - 30px)}}@media (max-height:750px){.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop){max-height:91%;max-height:calc(100% - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop).graphic .ab-image-area img{max-height:91vh;max-height:calc(100vh - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text{max-height:65vh;max-height:calc(100vh - 30px - 60px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-image{max-height:45vh;max-height:calc(100vh - 30px - 155.17241379310346px - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-icon{max-height:45vh;max-height:calc(100vh - 30px - 70px - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-buttons{max-height:50vh;max-height:calc(100vh - 30px - 93px - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-buttons.ab-with-image{max-height:30vh;max-height:calc(100vh - 30px - 155.17241379310346px - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-buttons.ab-with-icon{max-height:30vh;max-height:calc(100vh - 30px - 70px - 93px - 20px)}}@media (min-width:601px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area img{max-height:100%;max-width:100%}}@media (max-height:750px) and (min-width:601px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important;width:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-height:480px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-width:750px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}",
  );
}
function setupInAppMessageUI() {
  attachInAppMessageCSS(), loadFontAwesome();
}

function attachBannerCSS(n) {
  attachCSS(
    n,
    "banner",
    ".ab-html-banner{width:100%;height:100%;border:none;display:block}.ab-html-control-banner{width:0;height:0;margin:0;border:none}",
  );
}
function setupBannerUI() {
  attachBannerCSS();
}

function be(e) {
  let s = "";
  return (
    e.animateIn && (s += " ab-animate-in"),
    e.animateOut && (s += " ab-animate-out"),
    e instanceof FullScreenMessage
      ? (s += " ab-effect-fullscreen")
      : e instanceof HtmlMessage
      ? (s += " ab-effect-html")
      : e instanceof ModalMessage
      ? (s += " ab-effect-modal")
      : e instanceof SlideUpMessage && (s += " ab-effect-slide"),
    s
  );
}

function createCloseButton(t, o, e, r = "ltr") {
  const n = document.createElement("button");
  n.setAttribute("aria-label", t),
    n.setAttribute("role", "button"),
    (n.dir = r),
    addPassiveEventListener(n, "touchstart"),
    (n.className = "ab-close-button");
  const l = buildSvg(
    "0 0 15 15",
    "M15 1.5L13.5 0l-6 6-6-6L0 1.5l6 6-6 6L1.5 15l6-6 6 6 1.5-1.5-6-6 6-6z",
    o,
  );
  return (
    n.appendChild(l),
    l.setAttribute("aria-hidden", "true"),
    n.addEventListener("keydown", (t) => {
      (t.keyCode !== KeyCodes.Ao && t.keyCode !== KeyCodes.Lo) ||
        (e(), t.stopPropagation());
    }),
    (n.onclick = (t) => {
      e(), t.stopPropagation();
    }),
    n
  );
}

function isTransparent(r) {
  return (
    null != r &&
    ((r = parseInt(r.toString())), !isNaN(r) && (4278190080 & r) >>> 24 == 0)
  );
}
function toRgba(r, n) {
  if (null == r) return "";
  if (((r = parseInt(r.toString())), isNaN(r))) return "";
  (n && !isNaN(parseFloat(n.toString()))) || (n = 1);
  return (
    "rgba(" +
    [
      (16711680 & (r >>>= 0)) >>> 16,
      (65280 & r) >>> 8,
      255 & r,
      (((4278190080 & r) >>> 24) / 255) * n,
    ].join(",") +
    ")"
  );
}

function logInAppMessageImpression(s) {
  if (!r.rr()) return !1;
  if (!(s instanceof InAppMessage || s instanceof ControlMessage))
    return b$1.error(IamStrings.EE), !1;
  const o = s instanceof ControlMessage ? p.om : p.Fn;
  return je$1.ra().Dt(s, o).lt;
}

function logInAppMessageClick(s) {
  if (!r.rr()) return !1;
  if (!(s instanceof InAppMessage)) return b$1.error(IamStrings.EE), !1;
  const e = je$1.ra().Dt(s, p.On);
  if (e) {
    s.sm() || logInAppMessageImpression(s);
    for (let r = 0; r < e.Ce.length; r++)
      TriggersProviderFactory.o().Ee(ot.rm, [s.triggerId], e.Ce[r]);
  }
  return e.lt;
}

const ORIENTATION = { PORTRAIT: 0, LANDSCAPE: 1 };
function _isPhone() {
  return screen.width <= 600;
}
function _getOrientation() {
  if ("orientation" in window)
    return 90 === Math.abs(window.orientation) || 270 === window.orientation
      ? ORIENTATION.LANDSCAPE
      : ORIENTATION.PORTRAIT;
  const n = window;
  if ("screen" in n) {
    let e =
      n.screen.orientation || screen.mozOrientation || screen.msOrientation;
    return (
      null != e && "object" == typeof e && (e = e.type),
      "landscape-primary" === e || "landscape-secondary" === e
        ? ORIENTATION.LANDSCAPE
        : ORIENTATION.PORTRAIT
    );
  }
  return ORIENTATION.PORTRAIT;
}
function _openUri(n, e, t) {
  n && (e || (null != t && t.metaKey) ? window.open(n) : (window.location = n));
}
function _getCurrentUrl() {
  return window.location.href;
}
const WindowUtils = {
  openUri: _openUri,
  da: _isPhone,
  ga: _getOrientation,
  Qh: _getCurrentUrl,
};

function getUser() {
  if (r.rr()) return r.zr();
}

function _handleBrazeAction(o, e, s) {
  if (r.rr())
    if (BRAZE_ACTION_URI_REGEX.test(o)) {
      const e = getDecodedBrazeAction(o);
      if (!e) return;
      const s = (o) => {
        if (!isValidBrazeActionJson(o))
          return void b$1.error(
            `Decoded Braze Action json is invalid: ${JSON.stringify(
              o,
              null,
              2,
            )}`,
          );
        const e = BRAZE_ACTIONS.properties.type,
          t = BRAZE_ACTIONS.properties.eo,
          i = BRAZE_ACTIONS.properties.so,
          n = o[e];
        if (n === BRAZE_ACTIONS.types.io) {
          const e = o[t];
          for (const o of e) s(o);
        } else {
          const e = o[i];
          let s, t;
          switch (n) {
            case BRAZE_ACTIONS.types.logCustomEvent:
              Promise.resolve().then(function () { return logCustomEvent$1; }).then(
                ({ logCustomEvent: logCustomEvent }) => {
                  r.ao()
                    ? ((t = Array.prototype.slice.call(e)),
                      logCustomEvent(...t))
                    : b$1.error(CoreStrings.ee);
                },
              );
              break;
            case BRAZE_ACTIONS.types.requestPushPermission:
              Promise.resolve().then(function () { return requestPushPermission$1; }).then(
                ({ requestPushPermission: requestPushPermission }) => {
                  r.ao()
                    ? "Safari" === ro.browser && ro.OS === OperatingSystems.co
                      ? window.navigator.standalone && requestPushPermission()
                      : requestPushPermission()
                    : b$1.error(CoreStrings.ee);
                },
              );
              break;
            case BRAZE_ACTIONS.types.setEmailNotificationSubscriptionType:
            case BRAZE_ACTIONS.types.setPushNotificationSubscriptionType:
            case BRAZE_ACTIONS.types.setCustomUserAttribute:
            case BRAZE_ACTIONS.types.addToSubscriptionGroup:
            case BRAZE_ACTIONS.types.removeFromSubscriptionGroup:
            case BRAZE_ACTIONS.types.addToCustomAttributeArray:
            case BRAZE_ACTIONS.types.removeFromCustomAttributeArray:
              if (((s = getUser()), s)) {
                s[n](...Array.prototype.slice.call(e));
              }
              break;
            case BRAZE_ACTIONS.types.mo:
            case BRAZE_ACTIONS.types.uo:
              (t = Array.prototype.slice.call(e)), WindowUtils.openUri(...t);
              break;
            default:
              b$1.info(`Ignoring unknown Braze Action: ${n}`);
          }
        }
      };
      s(e);
    } else WindowUtils.openUri(o, e, s);
}
function handleBrazeAction(o, e) {
  _handleBrazeAction(o, e);
}

function parseQueryStringKeyValues(t) {
  null == t && (t = "");
  const r = t.split("?").slice(1).join("?"),
    n = {};
  if (null != r) {
    const t = r.split("&");
    for (let r = 0; r < t.length; r++) {
      const a = t[r].split("=");
      "" !== a[0] && (n[a[0]] = a[1]);
    }
  }
  return n;
}
function isURIJavascriptOrData(t) {
  return !(
    !t ||
    (0 !== (t = t.toString().toLowerCase()).lastIndexOf("javascript:", 0) &&
      0 !== t.lastIndexOf("data:", 0))
  );
}

function logInAppMessageHtmlClick(e, t, s) {
  if (!r.rr()) return !1;
  if (!(e instanceof HtmlMessage))
    return (
      b$1.error(
        "inAppMessage argument to logInAppMessageHtmlClick must be an HtmlMessage object.",
      ),
      !1
    );
  let o = p.On;
  null != t && (o = p.Xn);
  const m = je$1.ra().Dt(e, o, t, s);
  if (m.lt)
    for (let r = 0; r < m.Ce.length; r++)
      TriggersProviderFactory.o().Ee(ot.rm, [e.triggerId, t], m.Ce[r]);
  return m.lt;
}

const buildHtmlClickHandler = (t, l, i, o) => {
  const r = i.getAttribute("href"),
    n = i.onclick;
  return (s) => {
    if (null != n && "function" == typeof n && !1 === n.bind(i)(s)) return;
    let e = parseQueryStringKeyValues(r).abButtonId;
    if (
      ((null != e && "" !== e) || (e = i.getAttribute("id") || void 0),
      null != r && "" !== r && 0 !== r.indexOf("#"))
    ) {
      const n =
          "blank" ===
          (i.getAttribute("target") || "").toLowerCase().replace("_", ""),
        u = o || t.openTarget === IamOpenTarget.BLANK || n,
        m = () => {
          logInAppMessageHtmlClick(t, e, r), WindowUtils.openUri(r, u, s);
        };
      u ? m() : t.tl(l, m);
    } else logInAppMessageHtmlClick(t, e, r || void 0);
    return s.stopPropagation(), !1;
  };
};

const buildBrazeBridge = (t, e) => {
  const o = { display: {}, web: {} },
    requestPushPermission = function () {
      return function () {
        const t = arguments;
        Promise.resolve().then(function () { return requestPushPermission$1; }).then((e) => {
          r.ao()
            ? e.requestPushPermission(...Array.prototype.slice.call(t))
            : b$1.error(CoreStrings.ee);
        });
      };
    },
    n = {
      requestImmediateDataFlush: function () {
        const t = arguments;
        Promise.resolve().then(function () { return requestImmediateDataFlush$1; }).then(
          ({ requestImmediateDataFlush: requestImmediateDataFlush }) => {
            r.ao()
              ? requestImmediateDataFlush(...Array.prototype.slice.call(t))
              : b$1.error(CoreStrings.ee);
          },
        );
      },
      logCustomEvent: function () {
        const t = arguments;
        Promise.resolve().then(function () { return logCustomEvent$1; }).then(
          ({ logCustomEvent: logCustomEvent }) => {
            if (!r.ao()) return void b$1.error(CoreStrings.ee);
            logCustomEvent(...Array.prototype.slice.call(t));
          },
        );
      },
      logPurchase: function () {
        const t = arguments;
        Promise.resolve().then(function () { return logPurchase$1; }).then(
          ({ logPurchase: logPurchase }) => {
            if (!r.ao()) return void b$1.error(CoreStrings.ee);
            logPurchase(...Array.prototype.slice.call(t));
          },
        );
      },
      unregisterPush: function () {
        const t = arguments;
        Promise.resolve().then(function () { return unregisterPush$1; }).then(
          ({ unregisterPush: unregisterPush }) => {
            r.ao()
              ? unregisterPush(...Array.prototype.slice.call(t))
              : b$1.error(CoreStrings.ee);
          },
        );
      },
      requestPushPermission: requestPushPermission(),
      changeUser: function () {
        const t = arguments;
        Promise.resolve().then(function () { return changeUser$1; }).then(({ changeUser: changeUser }) => {
          if (!r.ao()) return void b$1.error(CoreStrings.ee);
          changeUser(...Array.prototype.slice.call(t));
        });
      },
    },
    s = function (t) {
      return function () {
        n[t](...Array.prototype.slice.call(arguments));
      };
    };
  for (const t of keys(n)) o[t] = s(t);
  const i = [
      "setFirstName",
      "setLastName",
      "setEmail",
      "setGender",
      "setDateOfBirth",
      "setCountry",
      "setHomeCity",
      "setEmailNotificationSubscriptionType",
      "setLanguage",
      "addAlias",
      "setPushNotificationSubscriptionType",
      "setPhoneNumber",
      "setCustomUserAttribute",
      "addToCustomAttributeArray",
      "removeFromCustomAttributeArray",
      "incrementCustomUserAttribute",
      "setCustomLocationAttribute",
      "addToSubscriptionGroup",
      "removeFromSubscriptionGroup",
      "setLineId",
    ],
    u = function (t) {
      return function () {
        const e = getUser();
        e && e[t](...Array.prototype.slice.call(arguments));
      };
    },
    c = {};
  for (let t = 0; t < i.length; t++) c[i[t]] = u(i[t]);
  o.getUser = function () {
    return c;
  };
  const a = {},
    m = function (r) {
      return function () {
        const o = arguments;
        "function" != typeof e
          ? a[r](...Array.prototype.slice.call(o))
          : e(t, function () {
              a[r](...Array.prototype.slice.call(o));
            });
      };
    },
    f = o.display;
  for (const t of keys(a)) f[t] = m(t);
  const l = { registerAppboyPushMessages: requestPushPermission() },
    p = function (t) {
      return function () {
        l[t](...Array.prototype.slice.call(arguments));
      };
    },
    y = o.web;
  for (const t of keys(l)) y[t] = p(t);
  return (
    (o.NotificationSubscriptionTypes = User.NotificationSubscriptionTypes), o
  );
};
const applyNonceToDynamicallyCreatedTags = (t, e, r) => {
  const o = `([\\w]+)\\s*=\\s*document.createElement\\(['"]${r}['"]\\)`,
    n = t.match(new RegExp(o));
  if (n) {
    const r = `${n[1]}.setAttribute("nonce", "${e}")`;
    return `${t.slice(0, n.index + n[0].length)};${r};${t.slice(
      n.index + n[0].length,
    )}`;
  }
  return null;
};
const attachHtmlToIframeWithNonce = (t, e, r) => {
  let o = null;
  if (null != r) {
    (o = document.createElement("html")), (o.innerHTML = e || "");
    const t = o.getElementsByTagName("style");
    for (let e = 0; e < t.length; e++) t[e].setAttribute("nonce", r);
    const n = o.getElementsByTagName("script");
    for (let t = 0; t < n.length; t++) {
      n[t].setAttribute("nonce", r),
        (n[t].innerHTML = n[t].innerHTML.replace(
          /<style>/g,
          `<style nonce='${r}'>`,
        ));
      const e = applyNonceToDynamicallyCreatedTags(n[t].innerHTML, r, "script");
      e && (n[t].innerHTML = e);
      const o = applyNonceToDynamicallyCreatedTags(n[t].innerHTML, r, "style");
      o && (n[t].innerHTML = o);
    }
  }
  t.srcdoc = o ? o.innerHTML : e || "";
};

function ft(t, o, s, e, n) {
  const i = document.createElement("iframe");
  i.setAttribute("title", "Modal Message"),
    e && (i.style.zIndex = (e + 1).toString());
  if (
    (attachHtmlToIframeWithNonce(i, t.message, n),
    (i.onload = () => {
      const e = i.contentWindow;
      e.focus();
      const a = e.document.getElementsByTagName("head")[0];
      if (null != a) {
        if (t.Mo()) {
          const o = document.createElement("style");
          (o.innerHTML = t.css || ""),
            (o.id = t.Oo() || ""),
            null != n && o.setAttribute("nonce", n),
            a.appendChild(o);
        }
        const o = e.document.createElement("base");
        null != o && (o.setAttribute("target", "_parent"), a.appendChild(o));
      }
      const l = e.document.getElementsByTagName("title");
      l && l.length > 0 && i.setAttribute("title", l[0].textContent || "");
      const r = Object.assign(
        Object.assign(
          {},
          buildBrazeBridge(i, (o, s) => t.tl(o, s)),
        ),
        {
          closeMessage: function () {
            t.tl(i);
          },
          logClick: function () {
            logInAppMessageHtmlClick(t, ...arguments);
          },
        },
      );
      if (((e.appboyBridge = r), (e.brazeBridge = r), t.ko !== IamServerTypes.PE)) {
        const o = e.document.getElementsByTagName("a");
        for (let e = 0; e < o.length; e++) o[e].onclick = buildHtmlClickHandler(t, i, o[e], s);
        const n = e.document.getElementsByTagName("button");
        for (let o = 0; o < n.length; o++) n[o].onclick = buildHtmlClickHandler(t, i, n[o], s);
      }
      const c = e.document.body;
      if (null != c) {
        t.Bo() && (c.id = t.htmlId || "");
        const o = document.createElement("hidden");
        (o.onclick = r.closeMessage),
          (o.className = "ab-programmatic-close-button"),
          c.appendChild(o);
      }
      e.dispatchEvent(new CustomEvent("ab.BridgeReady")),
        -1 !== i.className.indexOf("ab-start-hidden") &&
          ((i.className = i.className.replace("ab-start-hidden", "")), o(i));
    }),
    (i.className =
      "ab-in-app-message ab-start-hidden ab-html-message ab-modal-interactions"),
    ro.OS === OperatingSystems.co)
  ) {
    const o = document.createElement("div");
    return (
      (o.className = "ab-ios-scroll-wrapper"), o.appendChild(i), (t.Eo = o), o
    );
  }
  return (t.Eo = i), i;
}

function logInAppMessageButtonClick(t, o) {
  var e;
  if (!r.rr()) return !1;
  if (!(t instanceof InAppMessageButton))
    return b$1.error("button must be an InAppMessageButton object"), !1;
  if (!(o instanceof InAppMessage)) return b$1.error(IamStrings.EE), !1;
  const s = je$1.ra().Jn(t, o);
  if (s.lt)
    for (let r = 0; r < s.Ce.length; r++)
      TriggersProviderFactory.o().Ee(
        ot.rm,
        [
          o.triggerId,
          null === (e = t.id) || void 0 === e ? void 0 : e.toString(),
        ],
        s.Ce[r],
      );
  return s.lt;
}

const xe = {
  Po: (t) => {
    const o = t.querySelectorAll(".ab-close-button, .ab-message-button");
    let e;
    for (let t = 0; t < o.length; t++) (e = o[t]), (e.tabIndex = 0);
    if (o.length > 0) {
      const e = o[0],
        s = o[o.length - 1];
      t.addEventListener("keydown", (o) => {
        const a = document.activeElement;
        o.keyCode === KeyCodes.Wo &&
          (o.shiftKey || (a !== s && a !== t)
            ? !o.shiftKey ||
              (a !== e && a !== t) ||
              (o.preventDefault(), s.focus())
            : (o.preventDefault(), e.focus()));
      });
    }
  },
  Qo: (t, o) => {
    o.setAttribute("role", "dialog"),
      o.setAttribute("aria-modal", "true"),
      t
        ? o.setAttribute("aria-labelledby", t)
        : o.setAttribute("aria-label", "Modal Message");
  },
  No: (t, o, e) => {
    if (t.buttons && t.buttons.length > 0) {
      const s = document.createElement("div");
      (s.className = "ab-message-buttons"), o.appendChild(s);
      const a = o.getElementsByClassName("ab-message-text")[0];
      null != a && (a.className += " ab-with-buttons");
      const l = (s) => (a) => (
        t.tl(o, () => {
          logInAppMessageButtonClick(s, t),
            s.clickAction === IamClickAction.URI &&
              _handleBrazeAction(s.uri || "", e || t.openTarget === IamOpenTarget.BLANK, a);
        }),
        a.stopPropagation(),
        !1
      );
      for (let o = 0; o < t.buttons.length; o++) {
        const e = t.buttons[o],
          a = document.createElement("button");
        (a.className = "ab-message-button"),
          a.setAttribute("type", "button"),
          addPassiveEventListener(a, "touchstart");
        let n = e.text;
        "" === e.text && (n = " "),
          a.appendChild(document.createTextNode(n)),
          t.Mo() ||
            ((a.style.backgroundColor = toRgba(e.backgroundColor)),
            (a.style.color = toRgba(e.textColor)),
            (a.style.borderColor = toRgba(e.borderColor))),
          (a.onclick = l(e)),
          s.appendChild(a);
      }
    }
  },
};

function Ge(e, o, t, a, n, i, s = document.body, m = "ltr") {
  if (((e.$o = document.activeElement), e instanceof HtmlMessage))
    return ft(e, o, a, n, i);
  const l = (function (e, o, t, a, n, i = document.body, s = "ltr") {
    let m = null;
    const l = document.createElement("div");
    (l.dir = s),
      (l.className = "ab-in-app-message ab-start-hidden ab-background"),
      n && (l.style.zIndex = (n + 1).toString()),
      e.zo() &&
        ((l.className += " ab-modal-interactions"),
        l.setAttribute("tabindex", "-1")),
      e.Mo() ||
        ((l.style.color = toRgba(e.textColor)),
        (l.style.backgroundColor = toRgba(e.backgroundColor)),
        isTransparent(e.backgroundColor) && (l.className += " ab-no-shadow"));
    const c = () => {
        -1 !== l.className.indexOf("ab-start-hidden") &&
          ((l.className = l.className.replace("ab-start-hidden", "")),
          document.querySelectorAll(".ab-iam-img-loading").length > 0
            ? t(
                `Cannot show in-app message ${e.message} because another message is being shown.`,
                IamDisplayFailures.tE,
              )
            : o(l));
      },
      r = (o = !0) => {
        let t = document.querySelectorAll(".ab-iam-root");
        (t && 0 !== t.length) || (t = i.querySelectorAll(".ab-iam-root")),
          t &&
            t.length > 0 &&
            (t[0].classList.remove("ab-iam-img-loading"),
            m && (clearTimeout(m), (m = null)),
            o
              ? c()
              : b$1.error(
                  `Cannot show in-app message ${e.message} because the image failed to load.`,
                ));
      };
    if (
      (e.imageStyle === IamImageStyle.GRAPHIC && (l.className += " graphic"),
      e.orientation === IamOrientation.LANDSCAPE && (l.className += " landscape"),
      null != e.buttons && 0 === e.buttons.length)
    ) {
      e.clickAction !== IamClickAction.NONE && (l.className += " ab-clickable");
      const o = (o) => (
        e.tl(l, () => {
          logInAppMessageClick(e),
            e.clickAction === IamClickAction.URI &&
              _handleBrazeAction(e.uri || "", a || e.openTarget === IamOpenTarget.BLANK, o);
        }),
        o.stopPropagation(),
        !1
      );
      (l.onclick = o),
        l.addEventListener("keydown", (e) => {
          if (e.keyCode === KeyCodes.Lo || e.keyCode === KeyCodes.Ao) return o(e);
        });
    }
    const d = createCloseButton(
      "Close Message",
      e.Mo() ? void 0 : toRgba(e.closeButtonColor),
      () => {
        e.tl(l);
      },
      s,
    );
    l.appendChild(d), n && (d.style.zIndex = (n + 2).toString());
    const u = document.createElement("div");
    (u.className = "ab-message-text"),
      (u.dir = s),
      u.setAttribute("role", "article");
    const f = (e.messageAlignment || e.Go).toLowerCase();
    u.className += " " + f + "-aligned";
    let p = !1;
    const g = document.createElement("div");
    if (((g.className = "ab-image-area"), e.imageUrl)) {
      const o = document.createElement("img");
      if (
        (o.setAttribute("src", e.imageUrl),
        e.Ho(o),
        0 === document.querySelectorAll(".ab-iam-img-loading").length)
      ) {
        p = !0;
        const e = document.querySelectorAll(".ab-iam-root");
        e && e.length > 0 && e[0].classList.add("ab-iam-img-loading"),
          (m = window.setTimeout(() => {
            r(!1);
          }, 6e4)),
          (o.onload = () => {
            r();
          }),
          (o.onerror = () => {
            r(!1);
          });
      }
      if (e.cropType === IamCropType.CENTER_CROP) {
        const e = document.createElement("div");
        (e.className = "ab-center-cropped-img"),
          e.appendChild(o),
          g.appendChild(e);
      } else g.appendChild(o);
      l.appendChild(g), (u.className += " ab-with-image");
    } else if (e.icon) {
      g.className += " ab-icon-area";
      const o = document.createElement("span");
      (o.className = "ab-icon"),
        e.Mo() ||
          ((o.style.backgroundColor = toRgba(e.iconBackgroundColor)),
          (o.style.color = toRgba(e.iconColor)));
      const t = document.createElement("i");
      (t.className = "fa"),
        t.appendChild(document.createTextNode(e.icon)),
        t.setAttribute("aria-hidden", "true"),
        o.appendChild(t),
        g.appendChild(o),
        l.appendChild(g),
        (u.className += " ab-with-icon");
    }
    if ((addPassiveEventListener(u, "touchstart"), e.header && e.header.length > 0)) {
      const o = document.createElement("h1");
      (o.className = "ab-message-header"), (e.Jo = V$1.de()), (o.id = e.Jo);
      const t = (e.headerAlignment || IamTextAlignment.CENTER).toLowerCase();
      (o.className += " " + t + "-aligned"),
        e.Mo() || (o.style.color = toRgba(e.headerTextColor)),
        o.appendChild(document.createTextNode(e.header)),
        u.appendChild(o);
    }
    const h = e.Ko();
    return u.appendChild(h), l.appendChild(u), p || c(), (e.Eo = l), l;
  })(e, o, t, a, n, s, m);
  if (e instanceof FullScreenMessage || e instanceof ModalMessage) {
    const o = e instanceof FullScreenMessage ? "ab-fullscreen" : "ab-modal";
    (l.className += ` ${o} ab-centered`),
      xe.No(e, l, a),
      xe.Po(l),
      xe.Qo(e.Jo, l);
  } else if (e instanceof SlideUpMessage) {
    (l.className += " ab-slideup"),
      l.setAttribute("tabindex", "0"),
      l.setAttribute("role", "alert");
    const o = l.getElementsByClassName("ab-close-button")[0];
    if (null != o) {
      const t = buildSvg(
        "0 0 11.38 19.44",
        "M11.38 9.72l-9.33 9.72L0 17.3l7.27-7.58L0 2.14 2.05 0l9.33 9.72z",
        e.Mo() ? void 0 : toRgba(e.closeButtonColor),
      );
      t.setAttribute("class", `ab-chevron ${m}`), o.appendChild(t);
    }
    let t, a;
    detectSwipe(l, DIRECTIONS.ie, (e) => {
      (l.className += " ab-swiped-left"),
        null != o && null != o.onclick && o.onclick(e);
    }),
      detectSwipe(l, DIRECTIONS.ne, (e) => {
        (l.className += " ab-swiped-right"),
          null != o && null != o.onclick && o.onclick(e);
      }),
      e.slideFrom === IamSlideFrom.TOP
        ? ((t = DIRECTIONS.Uo), (a = " ab-swiped-up"))
        : ((t = DIRECTIONS.Vo), (a = " ab-swiped-down")),
      detectSwipe(l, t, (e) => {
        (l.className += a), null != o && null != o.onclick && o.onclick(e);
      });
  }
  return l;
}

var zt = {
  en: {
    NO_CARDS_MESSAGE:
      "We have no updates for you at this time.<br/>Please check again later.",
    FEED_TIMEOUT_MESSAGE:
      "Sorry, this refresh timed out.<br/>Please try again later.",
  },
  ar: {
    NO_CARDS_MESSAGE: "ليس لدينا أي تحديث. يرجى التحقق مرة أخرى لاحقاً",
    FEED_TIMEOUT_MESSAGE: "يرجى تكرار المحاولة لاحقا",
  },
  cs: {
    NO_CARDS_MESSAGE:
      "V tuto chvíli pro vás nemáme žádné aktualizace.<br/>Zkontrolujte prosím znovu později.",
    FEED_TIMEOUT_MESSAGE: "Prosím zkuste to znovu později.",
  },
  da: {
    NO_CARDS_MESSAGE: "Vi har ingen updates.<br/>Prøv venligst senere.",
    FEED_TIMEOUT_MESSAGE: "Prøv venligst senere.",
  },
  de: {
    NO_CARDS_MESSAGE:
      "Derzeit sind keine Updates verfügbar.<br/>Bitte später noch einmal versuchen.",
    FEED_TIMEOUT_MESSAGE: "Bitte später noch einmal versuchen.",
  },
  es: {
    NO_CARDS_MESSAGE:
      "No tenemos actualizaciones.<br/>Por favor compruébelo más tarde.",
    FEED_TIMEOUT_MESSAGE: "Por favor inténtelo más tarde.",
  },
  "es-mx": {
    NO_CARDS_MESSAGE:
      "No tenemos ninguna actualización.<br/>Vuelva a verificar más tarde.",
    FEED_TIMEOUT_MESSAGE: "Por favor, vuelva a intentarlo más tarde.",
  },
  et: {
    NO_CARDS_MESSAGE:
      "Uuendusi pole praegu saadaval.<br/>Proovige hiljem uuesti.",
    FEED_TIMEOUT_MESSAGE: "Palun proovige hiljem uuesti.",
  },
  fi: {
    NO_CARDS_MESSAGE:
      "Päivityksiä ei ole saatavilla.<br/>Tarkista myöhemmin uudelleen.",
    FEED_TIMEOUT_MESSAGE: "Yritä myöhemmin uudelleen.",
  },
  fr: {
    NO_CARDS_MESSAGE:
      "Aucune mise à jour disponible.<br/>Veuillez vérifier ultérieurement.",
    FEED_TIMEOUT_MESSAGE: "Veuillez réessayer ultérieurement.",
  },
  he: {
    NO_CARDS_MESSAGE: ".אין לנו עדכונים. בבקשה בדוק שוב בקרוב",
    FEED_TIMEOUT_MESSAGE: ".בבקשה נסה שוב בקרוב",
  },
  hi: {
    NO_CARDS_MESSAGE:
      "हमारे पास कोई अपडेट नहीं हैं। कृपया बाद में फिर से जाँच करें.।",
    FEED_TIMEOUT_MESSAGE: "कृपया बाद में दोबारा प्रयास करें।.",
  },
  id: {
    NO_CARDS_MESSAGE: "Kami tidak memiliki pembaruan. Coba lagi nanti.",
    FEED_TIMEOUT_MESSAGE: "Coba lagi nanti.",
  },
  it: {
    NO_CARDS_MESSAGE: "Non ci sono aggiornamenti.<br/>Ricontrollare più tardi.",
    FEED_TIMEOUT_MESSAGE: "Riprovare più tardi.",
  },
  ja: {
    NO_CARDS_MESSAGE:
      "アップデートはありません。<br/>後でもう一度確認してください。",
    FEED_TIMEOUT_MESSAGE: "後でもう一度試してください。",
  },
  ko: {
    NO_CARDS_MESSAGE: "업데이트가 없습니다. 다음에 다시 확인해 주십시오.",
    FEED_TIMEOUT_MESSAGE: "나중에 다시 시도해 주십시오.",
  },
  ms: {
    NO_CARDS_MESSAGE: "Tiada kemas kini. Sila periksa kemudian.",
    FEED_TIMEOUT_MESSAGE: "Sila cuba kemudian.",
  },
  nl: {
    NO_CARDS_MESSAGE: "Er zijn geen updates.<br/>Probeer het later opnieuw.",
    FEED_TIMEOUT_MESSAGE: "Probeer het later opnieuw.",
  },
  no: {
    NO_CARDS_MESSAGE:
      "Vi har ingen oppdateringer.<br/>Vennligst sjekk igjen senere.",
    FEED_TIMEOUT_MESSAGE: "Vennligst prøv igjen senere.",
  },
  pl: {
    NO_CARDS_MESSAGE:
      "Brak aktualizacji.<br/>Proszę sprawdzić ponownie później.",
    FEED_TIMEOUT_MESSAGE: "Proszę spróbować ponownie później.",
  },
  pt: {
    NO_CARDS_MESSAGE:
      "Não temos atualizações.<br/>Por favor, verifique mais tarde.",
    FEED_TIMEOUT_MESSAGE: "Por favor, tente mais tarde.",
  },
  "pt-br": {
    NO_CARDS_MESSAGE:
      "Não temos nenhuma atualização.<br/>Verifique novamente mais tarde.",
    FEED_TIMEOUT_MESSAGE: "Tente novamente mais tarde.",
  },
  ru: {
    NO_CARDS_MESSAGE:
      "Обновления недоступны.<br/>Пожалуйста, проверьте снова позже.",
    FEED_TIMEOUT_MESSAGE: "Пожалуйста, повторите попытку позже.",
  },
  sv: {
    NO_CARDS_MESSAGE: "Det finns inga uppdateringar.<br/>Försök igen senare.",
    FEED_TIMEOUT_MESSAGE: "Försök igen senare.",
  },
  th: {
    NO_CARDS_MESSAGE: "เราไม่มีการอัพเดต กรุณาตรวจสอบภายหลัง.",
    FEED_TIMEOUT_MESSAGE: "กรุณาลองใหม่ภายหลัง.",
  },
  uk: {
    NO_CARDS_MESSAGE:
      "Оновлення недоступні.<br/>ласка, перевірте знову пізніше.",
    FEED_TIMEOUT_MESSAGE: "Будь ласка, спробуйте ще раз пізніше.",
  },
  vi: {
    NO_CARDS_MESSAGE:
      "Chúng tôi không có cập nhật nào.<br/>Vui lòng kiểm tra lại sau.",
    FEED_TIMEOUT_MESSAGE: "Vui lòng thử lại sau.",
  },
  "zh-hk": {
    NO_CARDS_MESSAGE: "暫時沒有更新.<br/>請稍候再試.",
    FEED_TIMEOUT_MESSAGE: "請稍候再試.",
  },
  "zh-hans": {
    NO_CARDS_MESSAGE: "暂时没有更新.<br/>请稍后再试.",
    FEED_TIMEOUT_MESSAGE: "请稍候再试.",
  },
  "zh-hant": {
    NO_CARDS_MESSAGE: "暫時沒有更新.<br/>請稍候再試.",
    FEED_TIMEOUT_MESSAGE: "請稍候再試.",
  },
  "zh-tw": {
    NO_CARDS_MESSAGE: "暫時沒有更新.<br/>請稍候再試.",
    FEED_TIMEOUT_MESSAGE: "請稍候再試.",
  },
  zh: {
    NO_CARDS_MESSAGE: "暂时没有更新.<br/>请稍后再试.",
    FEED_TIMEOUT_MESSAGE: "请稍候再试.",
  },
};

class gr {
  constructor(t, e = !1) {
    if (
      ((this.language = t),
      null != t && (t = t.toLowerCase()),
      null != t && null == zt[t])
    ) {
      const e = t.indexOf("-");
      e > 0 && (t = t.substring(0, e));
    }
    if (null == zt[t]) {
      const a =
        "Braze does not yet have a localization for language " +
        t +
        ", defaulting to English. Please contact us if you are willing and able to help us translate our SDK into this language.";
      e ? b$1.error(a) : b$1.info(a), (t = "en");
    }
    this.language = t;
  }
  get(t) {
    return zt[this.language][t];
  }
  wa() {
    switch (this.language) {
      case "ar":
      case "he":
      case "fa":
        return "rtl";
      default:
        return "ltr";
    }
  }
}

const Je = {
  i: !1,
  na: null,
  ra: () => {
    if ((Je.t(), !Je.na)) {
      let e = ro.language,
        t = !1;
      r.er(U.qa) && ((e = r.er(U.qa)), (t = !0)), (Je.na = new gr(e, t));
    }
    return Je.na;
  },
  t: () => {
    Je.i || (r.g(Je), (Je.i = !0));
  },
  destroy: () => {
    (Je.na = null), (Je.i = !1);
  },
};

function showInAppMessage(e, t, s) {
  if (!r.rr()) return;
  if ((setupInAppMessageUI(), null == e)) return !1;
  if (e instanceof ControlMessage)
    return (
      b$1.info(
        "User received control for a multivariate test, logging to Braze servers.",
      ),
      logInAppMessageImpression(e),
      !0
    );
  if (!(e instanceof InAppMessage)) return !1;
  if (e.constructor === InAppMessage) return !1;
  e.lh();
  const o = e instanceof HtmlMessage;
  if (o && !e.trusted && !r.dr())
    return (
      b$1.error(
        'HTML in-app messages are disabled. Use the "allowUserSuppliedJavascript" option for braze.initialize to enable these messages.',
      ),
      !1
    );
  if ((null == t && (t = document.body), e.zo())) {
    if (t.querySelectorAll(".ab-modal-interactions").length > 0)
      return (
        b$1.info(
          `Cannot show in-app message ${e.message} because another message is being shown.`,
        ),
        !1
      );
  }
  if (WindowUtils.da()) {
    const t = WindowUtils.ga();
    if (
      (t === ORIENTATION.PORTRAIT && e.orientation === IamOrientation.LANDSCAPE) ||
      (t === ORIENTATION.LANDSCAPE && e.orientation === IamOrientation.PORTRAIT)
    ) {
      const s = t === ORIENTATION.PORTRAIT ? "portrait" : "landscape",
        o = e.orientation === IamOrientation.PORTRAIT ? "portrait" : "landscape";
      return (
        b$1.info(
          `Not showing ${o} in-app message ${e.message} because the screen is currently ${s}`,
        ),
        !1
      );
    }
  }
  if (!r.dr()) {
    let t = !1;
    if (e.buttons && e.buttons.length > 0) {
      const s = e.buttons;
      for (let e = 0; e < s.length; e++)
        if (s[e].clickAction === IamClickAction.URI) {
          const o = s[e].uri;
          t = isURIJavascriptOrData(o);
        }
    } else e.clickAction === IamClickAction.URI && (t = isURIJavascriptOrData(e.uri));
    if (t)
      return (
        b$1.error(
          'Javascript click actions are disabled. Use the "allowUserSuppliedJavascript" option for braze.initialize to enable these actions.',
        ),
        !1
      );
  }
  const i = document.createElement("div");
  if (
    ((i.className = "ab-iam-root v3"),
    (i.className += be(e)),
    e.language && !o && (i.lang = e.language),
    e.Bo() && (i.id = e.htmlId),
    r.er(U.ja) && (i.style.zIndex = (r.er(U.ja) + 1).toString()),
    t.appendChild(i),
    e.Mo())
  ) {
    const t = document.createElement("style");
    (t.innerHTML = e.css),
      (t.id = e.Oo()),
      null != r.er(U.sr) && t.setAttribute("nonce", r.er(U.sr)),
      document.getElementsByTagName("head")[0].appendChild(t);
  }
  const n = e instanceof SlideUpMessage,
    a = Ge(
      e,
      (t) => {
        if (e.zo() && e.od()) {
          const s = document.createElement("div");
          if (
            ((s.className = "ab-page-blocker"),
            e.Mo() || (s.style.backgroundColor = toRgba(e.frameColor)),
            r.er(U.ja) && (s.style.zIndex = r.er(U.ja).toString()),
            i.appendChild(s),
            !r.er(U.oh))
          ) {
            const o = new Date().valueOf();
            s.onclick = (s) => {
              new Date().valueOf() - o > IamTiming.pE &&
                (e.tl(t), s.stopPropagation());
            };
          }
          i.appendChild(t), t.focus(), e.eh(i);
        } else if (n) {
          const s = document.querySelectorAll(".ab-slideup");
          let o = null;
          for (let e = s.length - 1; e >= 0; e--)
            if (s[e] !== t) {
              o = s[e];
              break;
            }
          if (e.slideFrom === IamSlideFrom.TOP) {
            let e = 0;
            null != o && (e = o.offsetTop + o.offsetHeight),
              (t.style.top = Math.max(e, 0) + "px");
          } else {
            let e = 0;
            null != o &&
              (e =
                (window.innerHeight || document.documentElement.clientHeight) -
                o.offsetTop),
              (t.style.bottom = Math.max(e, 0) + "px");
          }
        } else if (o && !r.er(U.oh)) {
          const s = e;
          isIFrame(t) &&
            t.contentWindow &&
            t.contentWindow.addEventListener("keydown", function (e) {
              e.keyCode === KeyCodes.rh && s.closeMessage();
            });
        }
        logInAppMessageImpression(e),
          e.dismissType === IamDismissType.AUTO_DISMISS &&
            setTimeout(() => {
              i.contains(t) && e.tl(t);
            }, e.duration),
          "function" == typeof s && s();
      },
      (e) => {
        b$1.info(e);
      },
      r.er(U.ba),
      r.er(U.ja),
      r.er(U.sr),
      t,
      Je.ra().wa(),
    );
  return (o || n) && (i.appendChild(a), e.eh(i)), !0;
}

function subscribeToInAppMessage(n) {
  if (r.rr())
    return "function" != typeof n
      ? null
      : je$1.ra().En(function (r) {
          return n(r[0]), r.slice(1);
        });
}

function automaticallyShowInAppMessages() {
  if (!r.rr()) return;
  setupInAppMessageUI();
  const s = je$1.ra();
  if (null == s.Gn()) {
    const r = subscribeToInAppMessage((s) => showInAppMessage(s));
    s.Nn(r);
  }
  return s.Gn();
}

function deferInAppMessage(e) {
  if (r.rr())
    return e instanceof ControlMessage
      ? (b$1.info("Not deferring since this is a ControlMessage."), !1)
      : e instanceof InAppMessage
      ? je$1.ra().jn(e)
      : (b$1.info("Not an instance of InAppMessage, ignoring."), !1);
}

function getDeferredInAppMessage() {
  if (r.rr()) return je$1.ra().sa();
}

class ea {
  constructor(t, e, s, i) {
    (this.B = t),
      (this.C = e),
      (this.j = s),
      (this.Ss = i),
      (this.B = t),
      (this.C = e),
      (this.j = s),
      (this.Ss = i),
      (this.In = new f()),
      r.S(this.In),
      (this.An = 1e3),
      (this.Dn = 6e4),
      (this._n = null),
      (this.qn = null),
      (this.xn = null);
  }
  Pn() {
    return this.In;
  }
  En(t) {
    return this.In.Ut(t);
  }
  Gn() {
    return this._n;
  }
  Nn(t) {
    this._n = t;
  }
  Dt(t, e, s, i) {
    const r = new L();
    let n;
    if (e === p.Fn || t instanceof ControlMessage) {
      if (!t.js())
        return (
          b$1.info(
            "This in-app message has already received an impression. Ignoring analytics event.",
          ),
          r
        );
    } else if (e === p.On || (t instanceof HtmlMessage && e === p.Xn)) {
      if (!t.Yt(i))
        return (
          b$1.info(
            "This in-app message has already received a click. Ignoring analytics event.",
          ),
          r
        );
    }
    return (
      (n =
        t instanceof ControlMessage
          ? { trigger_ids: [t.triggerId] }
          : this.Hn(t)),
      null == n
        ? r
        : (t.messageExtras && (n.message_extras = t.messageExtras),
          null != s && (n.bid = s),
          v$1.Dt(e, n))
    );
  }
  Jn(t, e) {
    const s = new L();
    if (!t.Yt())
      return (
        b$1.info(
          "This in-app message button has already received a click. Ignoring analytics event.",
        ),
        s
      );
    const i = this.Hn(e);
    return null == i
      ? s
      : t.id === InAppMessageButton.Kn
      ? (b$1.info(
          "This in-app message button does not have a tracking id. Not logging event to Braze servers.",
        ),
        s)
      : (null != t.id && (i.bid = t.id), v$1.Dt(p.Xn, i));
  }
  Ln(t) {
    const e = t.messageFields;
    return (null != e && e.is_push_primer) || !1;
  }
  Qn(t) {
    if (!(t instanceof InAppMessage)) return;
    const e = (t) => {
      if (!t) return;
      const e = getDecodedBrazeAction(t);
      if (containsUnknownBrazeAction(e)) return ineligibleBrazeActionURLErrorMessage(INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES.Un, "In-App Message");
      if (containsPushPrimerBrazeAction(e)) {
        const t = It$1.Vn();
        if (!t.Wn) return It$1.Yn(t.reason, "In-App Message");
      }
    };
    if (this.Ln(t)) {
      const t = It$1.Vn();
      if (!t.Wn) return It$1.Yn(t.reason, "In-App Message");
    }
    const s = t.buttons || [];
    let i;
    for (const t of s)
      if (
        t.clickAction === IamClickAction.URI &&
        t.uri &&
        BRAZE_ACTION_URI_REGEX.test(t.uri) &&
        ((i = e(t.uri)), i)
      )
        return i;
    return t.clickAction === IamClickAction.URI && t.uri && BRAZE_ACTION_URI_REGEX.test(t.uri)
      ? e(t.uri)
      : void 0;
  }
  Zn(t, e) {
    e !== this.xn && this._o(), (this.qn = t), (this.xn = e);
  }
  _o() {
    null != this.qn &&
      (clearTimeout(this.qn), (this.qn = null), (this.xn = null));
  }
  Xo(t, e, s, i) {
    const r = this.B;
    if (!r) return;
    this.xn && t.triggerId !== this.xn && (this._o(), h.Ji(this.j, h.it.Yo));
    const n = r.Zo(!1),
      o = r.Z(n);
    (o.template = { trigger_id: t.triggerId, trigger_event_type: e }),
      null != s && (o.template.data = s.ta());
    const u = r.tt(o, h.it.Yo);
    r.et(
      o,
      (r = -1) => {
        const n = this.B;
        if (!n) return;
        const m = new Date().valueOf();
        h.nt(this.j, h.it.Yo, m),
          -1 !== r && u.push(["X-Braze-Req-Tokens-Remaining", r.toString()]);
        let c,
          p,
          f = !1;
        l.ot({
          url: `${n.ht()}/template/`,
          data: o,
          headers: u,
          lt: (e) => {
            if (!n.ut(o, e, u))
              return void ("function" == typeof t.ia && t.ia());
            if ((n.ct(), null == e || null == e.templated_message)) return;
            const s = e.templated_message;
            if (s.type !== gt.la.oa) return;
            const i = newInAppMessageFromJson(s.data);
            if (null == i) return;
            const r = this.Qn(i);
            if (r)
              return b$1.error(r), void ("function" == typeof t.ia && t.ia());
            "function" == typeof t.ua && t.ua(i);
          },
          error: (e) => {
            (f = !0),
              (c = e),
              (p = `getting user personalization for message ${t.triggerId}.`);
          },
          ft: (r, o) => {
            if (new Date().valueOf() - t.ma < t.ca) {
              let r = 0;
              if (f) {
                const e = Math.min(t.ca, this.Dn),
                  s = this.An;
                null == i && (i = s), (r = Math.min(e, randomInclusive(s, 3 * i)));
              }
              n.yt(
                o,
                () => {
                  this.Xo(t, e, s, r);
                },
                h.it.Yo,
                (e) => this.Zn(e, t.triggerId),
                () => this._o(),
                r,
              );
            }
            f && n.dt(c, p);
          },
        });
      },
      h.it.Yo,
    );
  }
  Hn(t) {
    if (null == t.triggerId)
      return (
        b$1.info(
          "The in-app message has no analytics id. Not logging event to Braze servers.",
        ),
        null
      );
    const e = {};
    return null != t.triggerId && (e.trigger_ids = [t.triggerId]), e;
  }
  jn(t) {
    return (
      !!this.j &&
      !(
        !(t && t instanceof InAppMessage && t.constructor !== InAppMessage) ||
        t instanceof ControlMessage
      ) &&
      this.j.Pt(STORAGE_KEYS.It.pa, t.qt())
    );
  }
  sa() {
    if (!this.j) return null;
    const t = this.j.St(STORAGE_KEYS.It.pa);
    if (!t) return null;
    let e;
    switch (t.type) {
      case IamServerTypes.cE:
        e = FullScreenMessage.ha(t);
        break;
      case IamServerTypes.iE:
      case IamServerTypes.PE:
      case IamServerTypes.nE:
        e = HtmlMessage.ha(t);
        break;
      case IamServerTypes.aE:
      case IamServerTypes.UE:
        e = ModalMessage.ha(t);
        break;
      case IamServerTypes.sE:
        e = SlideUpMessage.ha(t);
    }
    return e && this.fa(), e;
  }
  fa() {
    this.j && this.j.Vt(STORAGE_KEYS.It.pa);
  }
}

const je = {
  na: null,
  i: !1,
  ra: () => (
    je.t(), je.na || (je.na = new ea(r.m(), r.u(), r.p(), r.ir())), je.na
  ),
  t: () => {
    je.i || (r.g(je), (je.i = !0));
  },
  destroy: () => {
    (je.na = null), (je.i = !1);
  },
};
var je$1 = je;

class Jt {
  constructor(t, s, i, h, l) {
    (this.triggerId = t),
      (this.ua = s),
      (this.ia = i),
      (this.ma = h),
      (this.ca = l),
      (this.triggerId = t),
      (this.ua = s),
      (this.ia = i),
      (this.ma = h),
      (this.ca = l);
  }
  static fromJson(t, s, i, h, l) {
    return null == t || null == t.trigger_id
      ? null
      : new Jt(t.trigger_id, s, i, h, l);
  }
}

class vr extends t {
  constructor(t, i, s, e, r) {
    super(),
      (this.tg = t),
      (this.Rs = i),
      (this.j = s),
      (this.Ru = e),
      (this.ig = r),
      (this.tg = t),
      (this.Rs = i),
      (this.j = s),
      (this.Ru = e),
      (this.ig = r),
      (this.sg = []),
      (this.eg = []),
      (this.hg = null),
      (this.ng = {}),
      (this.og = {}),
      (this.triggers = []),
      (this.lg = 0),
      this.ag(),
      this.gg();
  }
  fg() {
    if (this.j) {
      (this.hg = this.j.St(STORAGE_KEYS.It.nS) || this.hg),
        (this.ng = this.j.St(STORAGE_KEYS.It.aS) || this.ng),
        (this.og = this.j.St(STORAGE_KEYS.It.oS) || this.og);
      for (let t = 0; t < this.triggers.length; t++) {
        const i = this.triggers[t];
        i.id && null != this.og[i.id] && i.Id(this.og[i.id]);
      }
    }
  }
  ag() {
    if (!this.j) return;
    this.lg = this.j.St(STORAGE_KEYS.It.rS) || 0;
    const t = this.j.St(STORAGE_KEYS.It.sS) || [],
      i = [];
    for (let s = 0; s < t.length; s++) i.push(gt._u(t[s]));
    (this.triggers = i), this.fg();
  }
  gg() {
    const t = this,
      i = function (i, s, e, r, h) {
        return function () {
          t.cg(i, s, e, r, h);
        };
      },
      e = {};
    for (const t of this.triggers) t.id && (e[t.id] = t);
    let r = !1;
    for (let t = 0; t < this.triggers.length; t++) {
      const s = this.triggers[t];
      if (s.id && null != this.ng[s.id]) {
        const t = this.ng[s.id],
          h = [];
        for (let r = 0; r < t.length; r++) {
          const n = t[r],
            o = s.$d(n.ma || 0);
          if (o > 0) {
            let t, r;
            h.push(n),
              null != n.ug && (t = n.ug),
              null != n.dg && Ie.AS(n.dg) && (r = Ie._u(n.dg));
            const l = [];
            if (n.pg && isArray(n.pg))
              for (let t = 0; t < n.pg.length; t++) {
                const i = e[n.pg[t]];
                null != i && l.push(i);
              }
            this.eg.push(window.setTimeout(i(s, n.ma || 0, t, r, l), o));
          }
        }
        this.ng[s.id].length > h.length &&
          ((this.ng[s.id] = h),
          (r = !0),
          0 === this.ng[s.id].length && delete this.ng[s.id]);
      }
    }
    r && this.j && this.j.Pt(STORAGE_KEYS.It.aS, this.ng);
  }
  mg() {
    if (!this.j) return;
    const t = [];
    for (let i = 0; i < this.triggers.length; i++)
      t.push(this.triggers[i].qt());
    (this.lg = new Date().valueOf()),
      this.j.Pt(STORAGE_KEYS.It.sS, t),
      this.j.Pt(STORAGE_KEYS.It.rS, this.lg);
  }
  bg() {
    if (!this.j) return;
    (this.j.St(STORAGE_KEYS.It.rS) || 0) > this.lg ? this.ag() : this.fg();
  }
  q(t) {
    let i = !1;
    if (null != t && t.triggers) {
      this.ig.fa(), this.fg();
      const e = {},
        r = {};
      this.triggers = [];
      for (let s = 0; s < t.triggers.length; s++) {
        const h = gt.fromJson(t.triggers[s]);
        if (h) {
          h.id &&
            null != this.og[h.id] &&
            (h.Id(this.og[h.id]), (e[h.id] = this.og[h.id])),
            h.id && null != this.ng[h.id] && (r[h.id] = this.ng[h.id]);
          for (let t = 0; t < h.Pd.length; t++)
            if (h.Pd[t]._c(ot.Os, null)) {
              i = !0;
              break;
            }
          this.triggers.push(h);
        }
      }
      isEqual(this.og, e) || ((this.og = e), this.j && this.j.Pt(STORAGE_KEYS.It.oS, this.og)),
        isEqual(this.ng, r) ||
          ((this.ng = r), this.j && this.j.Pt(STORAGE_KEYS.It.aS, this.ng)),
        this.mg(),
        i &&
          (b$1.info("Trigger with test condition found, firing test."),
          this.Ee(ot.Os)),
        this.Ee(ot.OPEN);
      const h = this.sg;
      let n;
      this.sg = [];
      for (let t = 0; t < h.length; t++)
        (n = Array.prototype.slice.call(h[t])), this.Ee(...n);
    }
  }
  cg(t, i, s, e, r) {
    const h = (e) => {
        this.fg();
        const r = new Date().valueOf();
        t.xd(i) ||
          (!1 === navigator.onLine && t.type === gt.la.oa && e.imageUrl
            ? b$1.info(
                `Not showing ${t.type} trigger action ${t.id} due to offline state.`,
              )
            : t.Ad(r) && this.wg(t, r, s)
            ? 0 === this.Rs.Ve()
              ? b$1.info(
                  `Not displaying trigger ${t.id} because neither automaticallyShowInAppMessages() nor subscribeToInAppMessage() were called.`,
                )
              : (this.Rs.A([e]), this.yg(t, r))
            : b$1.info(
                `Not displaying trigger ${t.id} because display time fell outside of the acceptable time window.`,
              ));
      },
      n = () => {
        this.fg();
        const h = r.pop();
        if (null != h)
          if ((this.Tg(h, i, s, e, r), h.xd(i))) {
            let t = `Server aborted in-app message display, but the timeout on fallback trigger ${h.id} has already elapsed.`;
            r.length > 0 && (t += " Continuing to fall back."), b$1.info(t), n();
          } else {
            b$1.info(
              `Server aborted in-app message display. Falling back to lower priority ${h.type} trigger action ${t.id}.`,
            );
            const n = 1e3 * h.yd - (new Date().valueOf() - i);
            n > 0
              ? this.eg.push(
                  window.setTimeout(() => {
                    this.cg(h, i, s, e, r);
                  }, n),
                )
              : this.cg(h, i, s, e, r);
          }
      };
    let o, l, a;
    switch (t.type) {
      case gt.la.oa:
        if (((o = newInAppMessageFromJson(t.data)), null == o)) {
          b$1.error(
            `Could not parse trigger data for trigger ${t.id}, ignoring.`,
          );
          break;
        }
        if (((l = this.ig.Qn(o)), l)) {
          b$1.error(l), n();
          break;
        }
        h(o);
        break;
      case gt.la.zd:
        if (((a = Jt.fromJson(t.data, h, n, i, t.ca || 0)), null == a)) {
          b$1.error(
            `Could not parse trigger data for trigger ${t.id}, ignoring.`,
          );
          break;
        }
        this.ig.Xo(a, s, e);
        break;
      default:
        b$1.error(`Trigger ${t.id} was of unexpected type ${t.type}, ignoring.`);
    }
  }
  Ee(t, i = null, s) {
    if (!validateValueIsFromEnum(ot, t, "Cannot fire trigger action.", "TriggerEvents")) return;
    if (this.Ru && this.Ru.yc())
      return (
        b$1.info(
          "Trigger sync is currently in progress, awaiting sync completion before firing trigger event.",
        ),
        void this.sg.push(arguments)
      );
    this.bg();
    const e = new Date().valueOf(),
      r = e - (this.hg || 0);
    let h = !0,
      n = !0;
    const o = [];
    for (let s = 0; s < this.triggers.length; s++) {
      const r = this.triggers[s],
        l = e + 1e3 * r.yd;
      if (
        r.Ad(l) &&
        (null == r.startTime || r.startTime.valueOf() <= e) &&
        (null == r.endTime || r.endTime.valueOf() >= e)
      ) {
        let s = !1;
        for (let e = 0; e < r.Pd.length; e++)
          if (r.Pd[e]._c(t, i)) {
            s = !0;
            break;
          }
        s && ((h = !1), this.wg(r, l, t) && ((n = !1), o.push(r)));
      }
    }
    if (h)
      return void b$1.info(
        `Trigger event ${t} did not match any trigger conditions.`,
      );
    if (n)
      return void b$1.info(
        `Ignoring ${t} trigger event because a trigger was displayed ${
          r / 1e3
        }s ago.`,
      );
    o.sort((t, i) => t.priority - i.priority);
    const l = o.pop();
    null != l &&
      (b$1.info(
        `Firing ${l.type} trigger action ${l.id} from trigger event ${t}.`,
      ),
      this.Tg(l, e, t, s, o),
      0 === l.yd
        ? this.cg(l, e, t, s, o)
        : this.eg.push(
            window.setTimeout(() => {
              this.cg(l, e, t, s, o);
            }, 1e3 * l.yd),
          ));
  }
  changeUser(t = !1) {
    if (((this.triggers = []), this.j && this.j.Vt(STORAGE_KEYS.It.sS), !t)) {
      (this.sg = []), (this.hg = null), (this.og = {}), (this.ng = {});
      for (let t = 0; t < this.eg.length; t++) clearTimeout(this.eg[t]);
      (this.eg = []),
        this.j && (this.j.Vt(STORAGE_KEYS.It.nS), this.j.Vt(STORAGE_KEYS.It.oS), this.j.Vt(STORAGE_KEYS.It.aS));
    }
  }
  clearData() {
    (this.triggers = []), (this.hg = null), (this.og = {}), (this.ng = {});
    for (let t = 0; t < this.eg.length; t++) clearTimeout(this.eg[t]);
    this.eg = [];
  }
  wg(t, i, s) {
    if (null == this.hg) return !0;
    if (s === ot.Os)
      return (
        b$1.info(
          "Ignoring minimum interval between trigger because it is a test type.",
        ),
        !0
      );
    let e = t.Nd;
    return null == e && (e = this.tg), i - this.hg >= 1e3 * e;
  }
  Tg(t, i, e, r, h) {
    this.fg(), t.id && (this.ng[t.id] = this.ng[t.id] || []);
    const n = {};
    let o;
    (n.ma = i), (n.ug = e), null != r && (o = r.qt()), (n.dg = o);
    const l = [];
    for (const t of h) t.id && l.push(t.id);
    (n.pg = l),
      t.id && this.ng[t.id].push(n),
      this.j && this.j.Pt(STORAGE_KEYS.It.aS, this.ng);
  }
  yg(t, i) {
    this.fg(),
      t.Id(i),
      (this.hg = i),
      t.id && (this.og[t.id] = i),
      this.j && (this.j.Pt(STORAGE_KEYS.It.nS, i), this.j.Pt(STORAGE_KEYS.It.oS, this.og));
  }
}

const TriggersProviderFactory = {
  i: !1,
  provider: null,
  o: () => (
    TriggersProviderFactory.t(),
    TriggersProviderFactory.provider || TriggersProviderFactory.rg(),
    TriggersProviderFactory.provider
  ),
  rg: () => {
    if (!TriggersProviderFactory.provider) {
      const i = r.er(U.Dh);
      (TriggersProviderFactory.provider = new vr(
        null != i ? i : 30,
        je$1.ra().Pn(),
        r.p(),
        r.nn(),
        je$1.ra(),
      )),
        r.v(TriggersProviderFactory.provider);
    }
  },
  t: () => {
    TriggersProviderFactory.i ||
      (TriggersProviderFactory.rg(),
      r.g(TriggersProviderFactory),
      (TriggersProviderFactory.i = !0));
  },
  destroy: () => {
    (TriggersProviderFactory.provider = null), (TriggersProviderFactory.i = !1);
  },
};

const MAX_RETRIES = 5;
const CONNECTION_VALID_THRESHOLD_MS = 3e3;
function buildSseUrl(t, e, n, o, r) {
  const c = /^https?:\/\//i.test(t) ? t : `https://${t}`;
  let p = `mite=${encodeURIComponent(e)}&attempts=${n}`;
  return (
    o && (p += `&auth=${encodeURIComponent(o)}`),
    r && (p += `&rcs=${encodeURIComponent(r)}`),
    `${c}/sse?${p}`
  );
}

const DUST_SHARED_WORKER_CODE =
  '\n"use strict";\nconst workerSelf = self;\nlet eventSource = null;\nlet currentConfig = null;\nlet retryCount = 0;\nlet retryTimeoutId = null;\nlet connectionInProgress = false;\nconst maxRetries = 5;\nconst connectedPorts = new Map();\nlet lastSleepMs = null;\nlet currentRcs = null;\nlet ttlTimeoutId = null;\nlet leaderPortId = null;\nlet ddrTimeoutId = null;\nconst fn = {\n    startConnection: null,\n    handleMessage: null,\n};\nfunction broadcast(message) {\n    connectedPorts.forEach((portInfo, portId) => {\n        try {\n            portInfo.port.postMessage(message);\n        }\n        catch (_a) {\n            connectedPorts.delete(portId);\n        }\n    });\n}\nfunction randomInclusive(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nfunction electLeader() {\n    if (leaderPortId && connectedPorts.has(leaderPortId)) {\n        return;\n    }\n    const firstPortId = connectedPorts.keys().next().value;\n    leaderPortId = firstPortId || null;\n    if (leaderPortId) {\n        console.log("[Braze Real-Time] Elected leader port:", leaderPortId);\n    }\n}\nfunction promoteToLeader(portId) {\n    if (connectedPorts.has(portId) && leaderPortId !== portId) {\n        leaderPortId = portId;\n        console.log("[Braze Real-Time] Promoted to leader (tab became active):", portId);\n    }\n}\nfunction sendToLeader(message) {\n    electLeader();\n    if (!leaderPortId) {\n        console.warn("[Braze Real-Time] No leader to send message to");\n        return;\n    }\n    const leader = connectedPorts.get(leaderPortId);\n    if (leader) {\n        try {\n            leader.port.postMessage(message);\n        }\n        catch (_a) {\n            connectedPorts.delete(leaderPortId);\n            leaderPortId = null;\n            sendToLeader(message);\n        }\n    }\n}\nfunction closeConnection() {\n    connectionInProgress = false;\n    if (retryTimeoutId !== null) {\n        clearTimeout(retryTimeoutId);\n        retryTimeoutId = null;\n    }\n    if (ttlTimeoutId !== null) {\n        clearTimeout(ttlTimeoutId);\n        ttlTimeoutId = null;\n    }\n    if (ddrTimeoutId !== null) {\n        clearTimeout(ddrTimeoutId);\n        ddrTimeoutId = null;\n    }\n    if (eventSource) {\n        eventSource.close();\n        eventSource = null;\n        broadcast({ type: "disconnected" });\n    }\n}\nfunction retryWithBackoff() {\n    if (!currentConfig) {\n        return;\n    }\n    retryCount++;\n    const { minSleepMs, maxSleepMs, scaleFactor } = currentConfig.backoff;\n    let previousSleepMs = lastSleepMs;\n    if (previousSleepMs == null || previousSleepMs < minSleepMs) {\n        previousSleepMs = minSleepMs;\n    }\n    const backoffMs = Math.min(maxSleepMs, randomInclusive(minSleepMs, previousSleepMs * scaleFactor));\n    lastSleepMs = backoffMs;\n    console.log(`[Braze Real-Time] Retrying in ${backoffMs}ms (attempt ${retryCount}/${maxRetries})`);\n    retryTimeoutId = setTimeout(function () {\n        retryTimeoutId = null;\n        fn.startConnection();\n    }, backoffMs);\n}\nfunction startConnection(oldEventSourceToClose) {\n    if (!currentConfig) {\n        return;\n    }\n    if (eventSource && !oldEventSourceToClose) {\n        console.warn("[Braze Real-Time] Connection already exists");\n        return;\n    }\n    if (connectionInProgress && !oldEventSourceToClose) {\n        console.warn("[Braze Real-Time] Connection attempt already in progress");\n        return;\n    }\n    connectionInProgress = true;\n    const { dustHost, mite, auth } = currentConfig;\n    const dustHostWithScheme = /^https?:\\/\\//i.test(dustHost) ? dustHost : `https://${dustHost}`;\n    let queryString = `mite=${encodeURIComponent(mite)}&attempts=${retryCount}`;\n    if (auth) {\n        queryString += `&auth=${encodeURIComponent(auth)}`;\n    }\n    if (currentRcs) {\n        queryString += `&rcs=${encodeURIComponent(currentRcs)}`;\n    }\n    const subscribeUrl = `${dustHostWithScheme}/sse?${queryString}`;\n    try {\n        const newEventSource = new EventSource(subscribeUrl);\n        newEventSource.onopen = function () {\n            if (oldEventSourceToClose) {\n                console.log("[Braze Real-Time] Gapless reconnection: new connection established, closing old connection");\n                oldEventSourceToClose.close();\n            }\n            else {\n                console.log("[Braze Real-Time] Connection established");\n            }\n            eventSource = newEventSource;\n            connectionInProgress = false;\n            retryCount = 0;\n            lastSleepMs = null;\n            broadcast({ type: "connected" });\n        };\n        newEventSource.addEventListener("msg", function (event) {\n            fn.handleMessage(event.data);\n        });\n        newEventSource.onerror = function () {\n            const readyState = newEventSource ? newEventSource.readyState : -1;\n            if (readyState === 0) {\n                console.log("[Braze Real-Time] Failed to connect");\n            }\n            else {\n                console.log("[Braze Real-Time] Connection lost");\n            }\n            if (oldEventSourceToClose && eventSource !== newEventSource) {\n                console.log("[Braze Real-Time] Gapless reconnection failed, keeping old connection");\n                newEventSource.close();\n                connectionInProgress = false;\n                if (retryCount < maxRetries) {\n                    retryWithBackoff();\n                }\n                return;\n            }\n            closeConnection();\n            if (retryCount < maxRetries) {\n                retryWithBackoff();\n            }\n            else {\n                console.error("[Braze Real-Time] Max retries reached");\n                broadcast({ type: "error", error: "Max retry attempts reached" });\n            }\n        };\n    }\n    catch (error) {\n        connectionInProgress = false;\n        console.error("[Braze Real-Time] Failed to create EventSource:", error);\n        broadcast({ type: "error", error: String(error) });\n    }\n}\nfunction handleTtlMessage(tMs, rcs) {\n    if (typeof tMs !== "number") {\n        return;\n    }\n    if (typeof rcs === "string") {\n        currentRcs = rcs;\n    }\n    console.log(`[Braze Real-Time] TTL set to ${tMs}ms, will perform gapless reconnection when expired`);\n    if (ttlTimeoutId !== null) {\n        clearTimeout(ttlTimeoutId);\n    }\n    ttlTimeoutId = setTimeout(function () {\n        ttlTimeoutId = null;\n        console.log("[Braze Real-Time] TTL expired, performing gapless reconnection");\n        startConnection(eventSource || undefined);\n    }, tMs);\n}\nfunction handleDdrMessage(rMs, reason) {\n    if (typeof rMs !== "number") {\n        return;\n    }\n    const backoffConfig = currentConfig === null || currentConfig === void 0 ? void 0 : currentConfig.backoff;\n    const minSleepMs = (backoffConfig === null || backoffConfig === void 0 ? void 0 : backoffConfig.minSleepMs) || 10000;\n    const scaleFactor = (backoffConfig === null || backoffConfig === void 0 ? void 0 : backoffConfig.scaleFactor) || 3;\n    const maxSleepMs = (backoffConfig === null || backoffConfig === void 0 ? void 0 : backoffConfig.maxSleepMs) || 300000;\n    const backoffMs = Math.min(maxSleepMs, randomInclusive(minSleepMs, minSleepMs * scaleFactor));\n    const waitMs = Math.round(rMs + backoffMs);\n    const reasonStr = reason ? ` (${reason})` : "";\n    console.log(`[Braze Real-Time] Admin requested disconnect${reasonStr}, reconnecting in ${waitMs}ms (r_ms=${rMs} + backoff=${backoffMs})`);\n    if (ddrTimeoutId !== null) {\n        clearTimeout(ddrTimeoutId);\n    }\n    closeConnection();\n    ddrTimeoutId = setTimeout(function () {\n        ddrTimeoutId = null;\n        fn.startConnection();\n    }, waitMs);\n}\nfunction handleMessage(data) {\n    try {\n        const message = JSON.parse(data);\n        if (!message.type) {\n            console.warn("[Braze Real-Time] Message without type:", message);\n            return;\n        }\n        if (message.type === "ttl" && message.body) {\n            handleTtlMessage(message.body.t_ms, message.body.rcs);\n            return;\n        }\n        if (message.type === "ddr" && message.body) {\n            handleDdrMessage(message.body.r_ms, message.body.e);\n            return;\n        }\n        console.log(`[Braze Real-Time] Routing \'${message.type}\' message to leader`);\n        sendToLeader({ type: "message", data: message });\n    }\n    catch (error) {\n        console.warn("[Braze Real-Time] Failed to parse message:", error);\n    }\n}\nfn.startConnection = startConnection;\nfn.handleMessage = handleMessage;\nfunction handlePortMessage(port, portId, message) {\n    switch (message.type) {\n        case "connect":\n            if (currentConfig &&\n                (currentConfig.mite !== message.config.mite || currentConfig.dustHost !== message.config.dustHost)) {\n                console.log("[Braze Real-Time] Config changed, reconnecting");\n                closeConnection();\n                retryCount = 0;\n                lastSleepMs = null;\n                currentRcs = null;\n            }\n            currentConfig = message.config;\n            if (!connectedPorts.has(portId)) {\n                connectedPorts.set(portId, { port: port });\n            }\n            electLeader();\n            if (!eventSource && !connectionInProgress) {\n                startConnection();\n            }\n            else if (eventSource) {\n                port.postMessage({ type: "connected" });\n            }\n            break;\n        case "disconnect":\n            connectedPorts.delete(portId);\n            if (portId === leaderPortId) {\n                leaderPortId = null;\n                electLeader();\n            }\n            if (connectedPorts.size === 0) {\n                console.log("[Braze Real-Time] No more ports, closing connection");\n                closeConnection();\n                currentConfig = null;\n                currentRcs = null;\n                leaderPortId = null;\n            }\n            break;\n        case "tab_active":\n            promoteToLeader(portId);\n            break;\n        case "ping":\n            port.postMessage({ type: "pong" });\n            break;\n        default:\n            console.warn("[Braze Real-Time] Unknown message type:", message.type);\n    }\n}\nworkerSelf.onconnect = function (event) {\n    const port = event.ports[0];\n    const portId = `port-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;\n    connectedPorts.set(portId, { port: port });\n    port.onmessage = function (messageEvent) {\n        try {\n            handlePortMessage(port, portId, messageEvent.data);\n        }\n        catch (error) {\n            console.error("[Braze Real-Time] Error handling message:", error);\n        }\n    };\n    port.onmessageerror = function () {\n        console.warn("[Braze Real-Time] Message error from port:", portId);\n        connectedPorts.delete(portId);\n    };\n    port.start();\n};\n';

function isSharedWorkerSupported() {
  return "undefined" != typeof SharedWorker;
}
class DustWorkerBridge {
  constructor(i) {
    (this.Wr = null),
      (this.Rr = null),
      (this.isConnected = !1),
      (this.Mr = null),
      (this.Lr = null),
      (this.Pe = i.Pe),
      (this.He = i.He),
      (this.Le = i.Le),
      (this.Oe = i.Oe);
  }
  initialize() {
    if (!isSharedWorkerSupported())
      return (
        b$1.info("SharedWorker not supported, will use direct connection"), !1
      );
    try {
      const i = new Blob([DUST_SHARED_WORKER_CODE], { type: "application/javascript" });
      return (
        (this.Rr = URL.createObjectURL(i)),
        (this.Wr = new SharedWorker(this.Rr, { name: "braze-dust-worker" })),
        (this.Wr.port.onmessage = (i) => {
          this.Ir(i.data);
        }),
        (this.Wr.port.onmessageerror = () => {
          b$1.warn("Message error from real-time messaging worker");
        }),
        (this.Wr.onerror = (i) => {
          var e;
          b$1.error(
            `Real-time messaging worker error: ${i.message || "unknown error"}`,
          ),
            null === (e = this.Oe) ||
              void 0 === e ||
              e.call(this, "SharedWorker error");
        }),
        this.Wr.port.start(),
        this.Ur(),
        this.Vr(),
        b$1.info("Real-time messaging worker initialized"),
        !0
      );
    } catch (i) {
      return (
        b$1.error(
          `Failed to create real-time messaging worker: ${
            i instanceof Error ? i.message : String(i)
          }`,
        ),
        this._r(),
        !1
      );
    }
  }
  Ir(i) {
    var e, t, s;
    switch (i.type) {
      case "connected":
        b$1.info("Real-time messaging connection established via SharedWorker"),
          (this.isConnected = !0),
          null === (e = this.He) || void 0 === e || e.call(this);
        break;
      case "disconnected":
        b$1.info("Real-time messaging connection closed via SharedWorker"),
          (this.isConnected = !1),
          null === (t = this.Le) || void 0 === t || t.call(this);
        break;
      case "message": {
        const e = i.data,
          t = { type: e.type };
        null != e.body && (t.body = e.body), this.Pe(t);
        break;
      }
      case "error":
        b$1.error(`Real-time messaging error: ${i.error}`),
          null === (s = this.Oe) || void 0 === s || s.call(this, i.error);
    }
  }
  Ur() {
    this.Mr = window.setInterval(() => {
      this.Wr && this.Gr({ type: "ping" });
    }, 3e4);
  }
  Jr() {
    null !== this.Mr && (window.clearInterval(this.Mr), (this.Mr = null));
  }
  Vr() {
    (this.Lr = () => {
      "visible" === document.visibilityState &&
        this.Wr &&
        this.Gr({ type: "tab_active" });
    }),
      document.addEventListener("visibilitychange", this.Lr);
  }
  Kr() {
    this.Lr &&
      (document.removeEventListener("visibilitychange", this.Lr),
      (this.Lr = null));
  }
  Gr(i) {
    this.Wr && this.Wr.port.postMessage(i);
  }
  connect(i) {
    this.Wr
      ? (this.Gr({
          type: "connect",
          config: {
            mite: i.mite,
            dustHost: i.dustHost,
            auth: i.auth,
            backoff: {
              minSleepMs: i.backoff.minSleepMs,
              maxSleepMs: i.backoff.maxSleepMs,
              scaleFactor: i.backoff.scaleFactor,
            },
          },
        }),
        b$1.info("Connecting to real-time messaging"))
      : b$1.error("Cannot connect: real-time messaging worker not initialized");
  }
  disconnect() {
    this.Wr &&
      (this.Gr({ type: "disconnect" }),
      (this.isConnected = !1),
      b$1.info("Disconnecting from real-time messaging"));
  }
  Ke() {
    return this.isConnected;
  }
  isInitialized() {
    return null !== this.Wr;
  }
  _r() {
    this.Jr(),
      this.Kr(),
      this.Wr && (this.Wr.port.close(), (this.Wr = null)),
      this.Rr && (URL.revokeObjectURL(this.Rr), (this.Rr = null)),
      (this.isConnected = !1);
  }
  destroy() {
    this.disconnect(),
      this._r(),
      b$1.info("Real-time messaging worker destroyed");
  }
}

class sr extends t {
  constructor(i, t, s, e, n = !0) {
    super(),
      (this.B = i),
      (this.j = t),
      (this.h = s),
      (this.B = i),
      (this.j = t),
      (this.h = s),
      (this.mite = null),
      (this.Wi = null),
      (this.Gi = null),
      (this.Hi = null),
      (this.Oi = e || null),
      (this.Ki = null),
      (this.Vi = null),
      (this.T = null),
      (this._i = 0),
      (this.Qi = MAX_RETRIES),
      (this.Yi = null),
      (this.Zi = null),
      (this.we = !0),
      (this.Se = null),
      (this.ke = null),
      (this.ye = null),
      (this.Re = null),
      (this.De = !1),
      (this.Me = new Map()),
      (this.xe = null),
      (this.We = null),
      (this.Fe = null),
      (this.Ue = this.Ne(n)),
      (this.Be = !1),
      (this.Te = 0),
      (this.ze = null),
      this.Ae();
  }
  Ne(i) {
    return i
      ? isSharedWorkerSupported()
        ? "sharedworker"
        : (b$1.info(
            "SharedWorker not supported, using direct EventSource (multi-tab will gracefully degrade)",
          ),
          "direct")
      : (b$1.info("Shared connection disabled, using direct EventSource"),
        "direct");
  }
  Ge() {
    this.Fe = new DustWorkerBridge({
      Pe: (i) => {
        this.qe(i);
      },
      He: () => {
        this.Je(), (this.ze = new Date().valueOf());
      },
      Le: () => {
        this.ze = null;
      },
      Oe: (i) => {
        b$1.error(`Real-time messaging SharedWorker error: ${i}`);
      },
    });
    this.Fe.initialize() ||
      (b$1.info(
        "SharedWorker initialization failed, falling back to direct EventSource",
      ),
      (this.Ue = "direct"),
      (this.Fe = null));
  }
  Je() {
    (this._i = 0),
      (this.Se = null),
      (this.we = !0),
      (this.Be = !1),
      (this.Te = 0);
  }
  Ie() {
    var i;
    return (
      !(
        !("sharedworker" === this.Ue
          ? Boolean(null === (i = this.Fe) || void 0 === i ? void 0 : i.Ke())
          : Boolean(this.Vi)) || null === this.ze
      ) && new Date().valueOf() - this.ze >= CONNECTION_VALID_THRESHOLD_MS
    );
  }
  qe(i) {
    const t = i.type;
    if (!t)
      return void b$1.warn(
        `Received real-time message without type: ${JSON.stringify(i)}`,
      );
    const s = "sharedworker" === this.Ue ? "SharedWorker" : "Direct";
    b$1.info(`Received real-time message of type '${t}' via ${s}`);
    const e = this.Me.get(t);
    if (e && e.Ve() > 0)
      try {
        e.A(i);
      } catch (i) {
        b$1.error(`Error invoking subscription for message type '${t}': ${i}`);
      }
    else b$1.info(`No subscribers for real-time message type '${t}'`);
  }
  _e() {
    return "sharedworker" === this.Ue;
  }
  Qe() {
    return this.Ue;
  }
  Ae() {
    if (this.j) {
      const i = this.j.St(STORAGE_KEYS.It.Xe),
        t = this.j.St(STORAGE_KEYS.It.Ye),
        e = this.j.St(STORAGE_KEYS.It.Ze),
        n = this.j.St(STORAGE_KEYS.It.sn);
      i && t
        ? ((this.mite = i),
          (this.Wi = t),
          (this.Gi = e),
          (this.Hi = n),
          b$1.info("Restored real-time messaging configuration from storage"))
        : (i || t) &&
          (b$1.warn(
            "Incomplete real-time messaging configuration in storage, clearing",
          ),
          this.en());
    }
  }
  Hr() {
    this.xe ||
      this.We ||
      ((this.xe = this.on("ddr", (i) => {
        var t, s, e;
        const n = i.body;
        if (!n) return;
        const r = n.r_ms;
        if ("number" != typeof r) return;
        const o = n.e,
          h = (null === (t = this.h) || void 0 === t ? void 0 : t.vt()) || REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT,
          l = (null === (s = this.h) || void 0 === s ? void 0 : s.gt()) || REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT,
          u = (null === (e = this.h) || void 0 === e ? void 0 : e.bt()) || REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT,
          g = Math.min(u, randomInclusive(h, h * l)),
          f = Math.round(r + g),
          p = o ? ` (${o})` : "";
        b$1.info(
          `Admin requested disconnect${p}, reconnecting in ${f}ms (r_ms=${r} + backoff=${g})`,
        ),
          this.hn(),
          setTimeout(() => this.an(), f);
      })),
      (this.We = this.on("ttl", (i) => {
        const t = i.body;
        if (!t) return;
        const s = t.t_ms;
        if ("number" != typeof s) return;
        const e = s;
        if (
          (b$1.info(`Time to live set to ${e}ms, will reconnect when expired`),
          "sharedworker" === this.Ue)
        )
          return;
        const n = t.rcs;
        "string" == typeof n && (this.Ki = n),
          null !== this.Zi && window.clearTimeout(this.Zi),
          (this.Zi = window.setTimeout(() => {
            (this.Zi = null),
              b$1.info("Time to live expired, performing gapless reconnection"),
              this.ln();
          }, e));
      })));
  }
  cn() {
    this.ke ||
      this.ye ||
      ((this.Re = () => {
        (this.De = !0), (this.we = !1);
      }),
      window.addEventListener("beforeunload", this.Re),
      (this.ke = () => {
        var i;
        this.De = !0;
        (this.Vi ||
          (null === (i = this.Fe) || void 0 === i ? void 0 : i.Ke())) &&
          (b$1.info("Page unloading, closing real-time connection gracefully"),
          (this.we = !1),
          this.hn());
      }),
      window.addEventListener("pagehide", this.ke),
      (this.ye = (i) => {
        var t;
        const s =
          this.Vi || (null === (t = this.Fe) || void 0 === t ? void 0 : t.Ke());
        i.persisted &&
          this.un() &&
          !s &&
          (b$1.info("Page restored from bfcache, reconnecting"),
          (this.De = !1),
          this.Je(),
          this.an());
      }),
      window.addEventListener("pageshow", this.ye));
  }
  Et() {
    return this.T;
  }
  Lt(i) {
    this.T = i;
  }
  on(i, t) {
    if ("function" != typeof t) return null;
    let s = this.Me.get(i);
    return s || ((s = new f()), this.Me.set(i, s), r.S(s)), s.Ut(t);
  }
  dn(i, t) {
    const s = this.Me.get(i);
    s && s.removeSubscription(t);
  }
  un() {
    return Boolean(this.mite && this.Wi);
  }
  gn() {
    if (!this.Hi) return !1;
    return Math.floor(new Date().valueOf() / 1e3) >= this.Hi;
  }
  en() {
    (this.mite = null),
      (this.Wi = null),
      (this.Gi = null),
      (this.Hi = null),
      (this.Ki = null),
      this.j &&
        (this.j.Vt(STORAGE_KEYS.It.Xe),
        this.j.Vt(STORAGE_KEYS.It.Ye),
        this.j.Vt(STORAGE_KEYS.It.Ze),
        this.j.Vt(STORAGE_KEYS.It.sn));
  }
  mn(i, t) {
    const e = () => {
        "function" == typeof t && t();
      },
      n = this.B,
      r = this.j;
    if (!n || !r)
      return (
        b$1.error("NetworkManager or StorageManager not available"), void e()
      );
    if (!this.h || !this.h.fn())
      return (
        b$1.info("Real-time messaging is not enabled, skipping refresh"), void e()
      );
    this.un()
      ? b$1.info("Refreshing real-time messaging configuration")
      : b$1.info("Fetching initial real-time messaging configuration");
    const o = n.Z({}, !0),
      a = n.tt(o, h.it.pn),
      c = new Date().valueOf();
    h.nt(r, h.it.pn, c),
      l.ot({
        url: `${n.ht()}/dust/config`,
        headers: a,
        data: o,
        lt: (t) => {
          if (!n.ut(o, t, a))
            return (
              b$1.error(
                "Failed to validate server response for real-time messaging configuration",
              ),
              void e()
            );
          n.ct(),
            t.mite && t.host
              ? ((this.mite = t.mite),
                (this.Wi = t.host),
                (this.Gi = t.auth || null),
                (this.Hi = t.expiration || null),
                b$1.info(
                  "Received real-time messaging configuration from server",
                ),
                r.Pt(STORAGE_KEYS.It.Xe, t.mite),
                r.Pt(STORAGE_KEYS.It.Ye, t.host),
                t.auth ? r.Pt(STORAGE_KEYS.It.Ze, t.auth) : r.Vt(STORAGE_KEYS.It.Ze),
                t.expiration ? r.Pt(STORAGE_KEYS.It.sn, t.expiration) : r.Vt(STORAGE_KEYS.It.sn),
                this.an(),
                "function" == typeof i && i())
              : (b$1.info(
                  "Real-time messaging configuration not available - this SDK version may not be supported",
                ),
                this.en(),
                e());
        },
        error: (i) => {
          n.dt(i, "retrieving DUST config"), e();
        },
      });
  }
  an() {
    if (!this.h || !this.h.fn()) return;
    if (!this.un())
      return void b$1.error(
        "Cannot start real-time subscription without configuration",
      );
    if (this.gn())
      return (
        b$1.info(
          "Real-time messaging auth token has expired, refreshing configuration",
        ),
        void this.mn(
          () => {
            this.an();
          },
          () => {
            b$1.error(
              "Failed to refresh expired real-time messaging configuration",
            );
          },
        )
      );
    const i = this.mite,
      t = this.Oi || this.Wi;
    if (i && t)
      switch (this.Ue) {
        case "sharedworker":
          this.vn(i, t);
          break;
        case "direct":
          this.Vi &&
            (b$1.info(
              "Real-time connection already exists, closing before starting new subscription",
            ),
            this.hn()),
            this.wn();
      }
  }
  bn() {
    const i = this.mite,
      t = this.Oi || this.Wi;
    return i && t
      ? buildSseUrl(t, i, this._i, this.Gi || void 0, this.Ki || void 0)
      : null;
  }
  vn(i, t) {
    var s, e, n;
    if ((this.Fe || this.Ge(), !this.Fe))
      return (
        b$1.info(
          "SharedWorker initialization failed, falling back to direct EventSource",
        ),
        (this.Ue = "direct"),
        void this.Sn()
      );
    this.Oi && b$1.info(`Using custom real-time messaging host: ${this.Oi}`),
      b$1.info("Starting real-time subscription via SharedWorker");
    const r = (null === (s = this.h) || void 0 === s ? void 0 : s.vt()) || REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT,
      o = (null === (e = this.h) || void 0 === e ? void 0 : e.bt()) || REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT,
      h = (null === (n = this.h) || void 0 === n ? void 0 : n.gt()) || REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT;
    this.Fe.connect({
      mite: i,
      dustHost: t,
      auth: this.Gi || void 0,
      backoff: { minSleepMs: r, maxSleepMs: o, scaleFactor: h },
    });
  }
  Sn() {
    this.Vi &&
      (b$1.info(
        "Real-time connection already exists, closing before starting new subscription",
      ),
      this.kn()),
      this.wn();
  }
  wn(i) {
    const t = this.bn();
    if (t) {
      this.Oi && b$1.info(`Using custom real-time messaging host: ${this.Oi}`);
      try {
        const s = new EventSource(t);
        (s.onopen = () => {
          i
            ? (b$1.info(
                "Gapless reconnection: new connection established, closing old connection",
              ),
              i.close())
            : b$1.info("Real-time messaging connection established"),
            (this.Vi = s),
            (this._i = 0),
            (this.Se = null),
            (this.we = !0),
            (this.Be = !0),
            (this.ze = new Date().valueOf());
        }),
          s.addEventListener("msg", (i) => {
            this.yn(i.data);
          }),
          (s.onerror = () => {
            const t = s.readyState;
            return (
              this.De ||
                (0 === t
                  ? b$1.info("Real-time messaging failed to connect")
                  : b$1.info("Real-time messaging connection lost")),
              i && this.Vi !== s
                ? (b$1.info(
                    "Gapless reconnection failed, keeping old connection",
                  ),
                  s.close(),
                  void (this.we && this._i < this.Qi && this.$n()))
                : (this.kn(),
                  this.Be && (this.Te++, this.Te > 1)
                    ? (b$1.info(
                        "Real-time messaging connection lost twice after successful connect (likely multi-tab conflict), yielding to other tab",
                      ),
                      void (this.we = !1))
                    : void (this.we && this._i < this.Qi
                        ? this.$n()
                        : (this._i >= this.Qi &&
                            b$1.error(
                              `Max retry attempts (${this.Qi}) reached for real-time messaging, giving up for current session`,
                            ),
                          (this.we = !1))))
            );
          });
      } catch (i) {
        b$1.error(
          `Failed to create real-time messaging connection: ${
            i instanceof Error ? i.message : String(i)
          }`,
        );
      }
    }
  }
  $n() {
    var i, t, s;
    this._i++;
    const e = (null === (i = this.h) || void 0 === i ? void 0 : i.vt()) || REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT,
      n = (null === (t = this.h) || void 0 === t ? void 0 : t.gt()) || REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT,
      r = (null === (s = this.h) || void 0 === s ? void 0 : s.bt()) || REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT;
    let o = this.Se;
    (null == o || o < e) && (o = e);
    const h = Math.min(r, randomInclusive(e, o * n));
    (this.Se = h),
      b$1.info(
        `Retrying real-time messaging connection in ${h}ms (attempt ${this._i}/${this.Qi})`,
      ),
      (this.Yi = window.setTimeout(() => {
        (this.Yi = null), this.an();
      }, h));
  }
  ln() {
    if (this.un()) {
      if (this.gn())
        return (
          b$1.info(
            "Auth token expired during gapless reconnection, falling back to regular reconnection",
          ),
          this.hn(),
          void this.an()
        );
      null !== this.Zi && (window.clearTimeout(this.Zi), (this.Zi = null)),
        this.wn(this.Vi || void 0);
    } else b$1.error("Cannot perform gapless reconnection without configuration");
  }
  hn() {
    var i;
    switch (((this.ze = null), this.Ue)) {
      case "sharedworker":
        null === (i = this.Fe) || void 0 === i || i.disconnect();
        break;
      case "direct":
        this.kn();
    }
  }
  kn() {
    null !== this.Yi && (window.clearTimeout(this.Yi), (this.Yi = null)),
      null !== this.Zi && (window.clearTimeout(this.Zi), (this.Zi = null)),
      (this.ze = null),
      this.Vi &&
        (this.Vi.close(),
        (this.Vi = null),
        b$1.info("Real-time messaging connection closed"));
  }
  yn(i) {
    try {
      const t = JSON.parse(i);
      this.qe(t);
    } catch (i) {
      b$1.warn(
        `Failed to parse real-time message: ${
          i instanceof Error ? i.message : String(i)
        }`,
      );
    }
  }
  changeUser(i = !1) {
    this.hn(),
      i ||
        (this.un() &&
          b$1.info(
            "Clearing cached real-time messaging configuration for user change",
          ),
        this.en()),
      this.Je();
  }
  clearData(i = !1) {
    (this.we = !1),
      this.hn(),
      i &&
        (this.un() &&
          b$1.info(
            "Clearing cached real-time messaging configuration (wipeData)",
          ),
        this.en()),
      this.Je();
  }
  destroy() {
    (this.we = !1),
      this.hn(),
      this.en(),
      this.Fe && (this.Fe.destroy(), (this.Fe = null)),
      this.xe && (this.dn("ddr", this.xe), (this.xe = null)),
      this.We && (this.dn("ttl", this.We), (this.We = null)),
      this.Re &&
        (window.removeEventListener("beforeunload", this.Re), (this.Re = null)),
      this.ke &&
        (window.removeEventListener("pagehide", this.ke), (this.ke = null)),
      this.ye &&
        (window.removeEventListener("pageshow", this.ye), (this.ye = null)),
      this.T && (r.removeSubscription(this.T), (this.T = null));
  }
}

const dr = {
  i: !1,
  provider: null,
  o: () => {
    if ((dr.t(), !dr.provider)) {
      const t = r.er("dustHost");
      (dr.provider = new sr(r.m(), r.p(), r.l(), t)),
        r.v(dr.provider),
        dr.provider.Hr();
    }
    return dr.provider;
  },
  t: () => {
    dr.i || (r.g(dr), (dr.i = !0));
  },
  destroy: () => {
    dr.provider && dr.provider.destroy(), (dr.provider = null), (dr.i = !1);
  },
};

function subscribeToDust() {
  const t = r.l(),
    n = r.nn();
  if (!t || !n) return null;
  const o = dr.o(),
    s = () => {
      if (!o.Et()) {
        o.cn();
        const r = n.rn(() => {
          t.fn() && o.mn();
        });
        return r && o.Lt(r), o.un() && o.an(), r;
      }
      return o.Et();
    };
  return (
    t.Tr(() => {
      r.ao() && (t.fn() ? (o.mn(), s()) : (o.hn(), o.un() && o.en()));
    }),
    t.fn() ? s() : null
  );
}

class ui {
  constructor(t, i, s, l, h) {
    (this.endpoint = t),
      (this.Wu = i),
      (this.publicKey = s),
      (this.sc = l),
      (this.ad = h),
      (this.endpoint = t || null),
      (this.Wu = i || null),
      (this.publicKey = s || null),
      (this.sc = l || null),
      (this.ad = h || null);
  }
  qt() {
    return {
      e: this.endpoint,
      c: this.Wu,
      p: this.publicKey,
      u: this.sc,
      v: this.ad,
    };
  }
  static _u(t) {
    return new ui(t.e, rehydrateDateAfterJsonization(t.c), t.p, t.u, t.v);
  }
}

class Ut {
  constructor(t, s) {
    (this.h = t), (this.j = s), (this.h = t), (this.j = s);
  }
  getUserId() {
    const t = this.j.$u(STORAGE_KEYS.Ou.Cu);
    if (null == t) return null;
    let i = t.Tu,
      e = getByteLength(i);
    if (e > User.br) {
      for (; e > User.br; ) (i = i.slice(0, i.length - 1)), (e = getByteLength(i));
      (t.Tu = i), this.j.Iu(STORAGE_KEYS.Ou.Cu, t);
    }
    return i;
  }
  Ju(t) {
    const i = null == this.getUserId();
    this.j.Iu(STORAGE_KEYS.Ou.Cu, new _t(t)), i && this.j.Lu(t);
  }
  setCustomUserAttribute(t, s) {
    if (this.h.qu(t))
      return (
        b$1.info('Custom Attribute "' + t + '" is blocklisted, ignoring.'), !1
      );
    const i = {};
    return (i[t] = s), this.zu(User.Bu, i, !0);
  }
  zu(t, s, i = !1, e = !1) {
    const u = this.j.Eu(this.getUserId(), t, s);
    let o = "",
      r = t,
      h = s;
    return (
      i &&
        ((o = " custom"),
        "object" == typeof s &&
          ((r = Object.keys(s)[0]),
          (h = s[r]),
          "object" == typeof h && (h = JSON.stringify(h, null, 2)))),
      !e && u && b$1.info(`Logged${o} attribute ${r} with value ${h}`),
      u
    );
  }
  gu(t, i, e, u, o) {
    this.zu("push_token", t, !1, !0),
      this.zu("custom_push_public_key", e, !1, !0),
      this.zu("custom_push_user_auth", u, !1, !0),
      this.zu("custom_push_vapid_public_key", o, !1, !0);
    const r = et._s.Xs,
      h = new et(r, b$1),
      n = new ui(t, i, e, u, o);
    this.j.Pt(STORAGE_KEYS.It.Uu, n.qt()), h.setItem(r.Ws.Fu, r.be, !0);
  }
  wu(t) {
    if (
      (this.zu("push_token", null, !1, !0),
      this.zu("custom_push_public_key", null, !1, !0),
      this.zu("custom_push_user_auth", null, !1, !0),
      this.zu("custom_push_vapid_public_key", null, !1, !0),
      t)
    ) {
      const t = et._s.Xs,
        i = new et(t, b$1);
      this.j.Pt(STORAGE_KEYS.It.Uu, !1), i.setItem(t.Ws.Fu, t.be, !1);
    }
  }
}

const U = {
  _h: "allowCrawlerActivity",
  Nh: "baseUrl",
  se: "cookieExpiryInDays",
  Oh: "noCookies",
  Th: "devicePropertyAllowlist",
  ka: "disablePushTokenMaintenance",
  Rh: "enableLogging",
  Ph: "enableSdkAuthentication",
  _a: "manageServiceWorkerExternally",
  Dh: "minimumIntervalBetweenTriggerActionsInSeconds",
  Lh: "sessionTimeoutInSeconds",
  yh: "appVersion",
  Mh: "appVersionNumber",
  xa: "serviceWorkerLocation",
  Ma: "safariWebsitePushId",
  qa: "localization",
  sr: "contentSecurityNonce",
  nr: "allowUserSuppliedJavascript",
  ja: "inAppMessageZIndex",
  ba: "openInAppMessagesInNewTab",
  tn: "openCardsInNewTab",
  oh: "requireExplicitInAppMessageDismissal",
  Uh: "doNotLoadFontAwesome",
  Wh: "deviceId",
  ya: "serviceWorkerScope",
  Ye: "dustHost",
  Bh: "sdkFlavor",
};
class ci {
  constructor() {
    (this.tu = ""),
      (this.Vh = ""),
      (this.Kh = void 0),
      (this.Gh = null),
      (this.eu = null),
      (this.B = null),
      (this.Ru = null),
      (this.h = null),
      (this.C = null),
      (this.j = null),
      (this.Ss = null),
      (this.Yh = ""),
      (this.isInitialized = !1),
      (this.$h = !1),
      (this.qh = new f()),
      (this.Hh = new f()),
      (this.options = {}),
      (this.Jh = []),
      (this.Xh = []),
      (this.In = []),
      (this.Vh = "6.9.0");
  }
  Zh(t) {
    this.qh.Ut(t);
  }
  uh(t) {
    this.Hh.Ut(t);
  }
  initialize(t, i) {
    var e, r, o;
    if (this.ao())
      return b$1.info("Braze has already been initialized with an API key."), !0;
    this.options = i || {};
    let n = this.er(U.Rh);
    const h = parseQueryStringKeyValues(WindowUtils.Qh());
    if (
      (h && "true" === h.brazeLogging && (n = !0),
      b$1.init(n),
      b$1.info(
        `Initialization Options: ${JSON.stringify(this.options, null, 2)}`,
      ),
      null == t || "" === t || "string" != typeof t)
    )
      return b$1.error("Braze requires a valid API key to be initialized."), !1;
    this.tu = t;
    let l = this.er(U.Nh);
    if (null == l || "" === l || "string" != typeof l)
      return b$1.error("Braze requires a valid baseUrl to be initialized."), !1;
    !1 === /^https?:/.test(l) && (l = `https://${l}`);
    const a = l;
    if (
      ((l = document.createElement("a")),
      (l.href = a),
      "/" === l.pathname && (l = `${l}api/v3`),
      (this.Yh = l.toString()),
      ro.il && !this.er(U._h))
    )
      return (
        b$1.info("Ignoring activity from crawler bot " + navigator.userAgent),
        (this.$h = !0),
        !1
      );
    const u = this.er(U.Oh) || !1,
      c = this.er(U.se),
      m = Zt.sl();
    if (
      ((this.j = Zt.rl(t, u, c)),
      u && this.j.hl(t),
      new ne.le(null, !0).wr(STORAGE_KEYS.ce))
    )
      return (
        b$1.info("Ignoring all activity due to previous opt out"),
        (this.$h = !0),
        !1
      );
    for (const t of keys(this.options))
      -1 === values(li).indexOf(t) &&
        b$1.warn(`Ignoring unknown initialization option '${t}'.`);
    const p = ["mparticle", "wordpress", "tealium"];
    if (null != this.er(U.Bh)) {
      const t = this.er(U.Bh);
      -1 !== p.indexOf(t)
        ? (this.Kh = t)
        : b$1.error("Invalid sdk flavor passed: " + t);
    }
    let d = this.er(li.Th);
    if (null != d)
      if (isArray(d)) {
        const t = [];
        for (let i = 0; i < d.length; i++)
          validateValueIsFromEnum(
            DeviceProperties,
            d[i],
            "devicePropertyAllowlist contained an invalid value.",
            "DeviceProperties",
          ) && t.push(d[i]);
        d = t;
      } else
        b$1.error(
          "devicePropertyAllowlist must be an array. Defaulting to all properties.",
        ),
          (d = null);
    const E = this.er(U.Wh);
    if (E) {
      const t = new _t(E);
      this.j.Iu(STORAGE_KEYS.Ou.Wh, t);
    }
    (this.eu = new Pt(this.j, d)),
      (this.h = new Yt(this.j)),
      (this.Ss = new Ut(this.h, this.j)),
      (this.C = new Xt(this.j, this.Ss, this.h, this.er(U.Lh)));
    const I = new f();
    (this.Gh = new Gt(this.j, this.er(U.Ph), I)),
      this.S(I),
      (this.B = new Vt(
        this.eu,
        this.j,
        this.Gh,
        this.Ss,
        this.C,
        this.h,
        this.tu,
        this.Yh,
        this.Vh,
        this.Kh || "",
        this.er(U.yh),
        this.er(U.Mh),
      )),
      (this.Ru = new Kt(
        this.tu,
        this.Yh,
        this.C,
        this.eu,
        this.Ss,
        this.h,
        this.j,
        (t) => {
          if (this.ao()) for (const i of this.vr()) i.q(t);
        },
        this.Gh,
        this.B,
      )),
      this.Ru.initialize(),
      u || this.j.ll(),
      b$1.info(
        `Initialized for the Braze backend at "${this.er(
          U.Nh,
        )}" with API key "${this.tu}".`,
      ),
      TriggersProviderFactory.t(),
      subscribeToDust(),
      this.h.bo(() => {
        var t;
        this.isInitialized &&
          (null === (t = this.h) || void 0 === t ? void 0 : t.lo()) &&
          Promise.resolve().then(function () { return refreshFeatureFlags$1; }).then((t) => {
            if (!this.isInitialized) return;
            (0, t.default)();
          });
      }),
      this.Ru.rn(() => {
        var t;
        this.isInitialized &&
          (null === (t = this.h) || void 0 === t ? void 0 : t.lo()) &&
          Promise.resolve().then(function () { return refreshFeatureFlags$1; }).then((t) => {
            if (!this.isInitialized) return;
            (0, t.default)(void 0, void 0, !0);
          });
      }),
      this.qh.A(this.options),
      (this.isInitialized = !0),
      window.dispatchEvent(new CustomEvent("braze.initialized"));
    const _ = null === (e = this.C) || void 0 === e ? void 0 : e.al();
    return (
      m ||
        null == _ ||
        (null === (r = this.C) || void 0 === r
          ? void 0
          : r.ul(new Date().valueOf(), _)) ||
        null === (o = this.Ru) ||
        void 0 === o ||
        o.Ar(),
      !0
    );
  }
  destroy(t) {
    if ((b$1.destroy(), this.ao())) {
      this.Hh.A(), this.Hh.removeAllSubscriptions();
      for (const t of this.Jh) t.destroy();
      this.Jh = [];
      for (const t of this.Xh) t.clearData(!1);
      this.B && this.B.fo(),
        (this.Xh = []),
        this.removeAllSubscriptions(),
        (this.In = []),
        null != this.Ru && this.Ru.destroy(),
        (this.Ru = null),
        (this.Gh = null),
        (this.eu = null),
        (this.B = null),
        (this.h = null),
        (this.C = null),
        (this.Ss = null),
        (this.options = {}),
        (this.Kh = void 0),
        (this.isInitialized = !1),
        (this.$h = !1),
        t && (this.j = null);
    }
  }
  rr() {
    return !this.cl() && (!!this.ao() || (console.warn(CoreStrings.ee), !1));
  }
  za() {
    return this.tu;
  }
  Er() {
    return this.Gh;
  }
  ht() {
    return this.Yh;
  }
  ue() {
    return this.eu;
  }
  m() {
    return this.B;
  }
  er(t) {
    return this.options[t];
  }
  vr() {
    return this.Xh;
  }
  nn() {
    return this.Ru;
  }
  l() {
    return this.h;
  }
  u() {
    return this.C;
  }
  p() {
    return this.j;
  }
  zr() {
    if (this.Ss && this.Ru) return new User(this.Ss, this.Ru);
  }
  ir() {
    return this.Ss;
  }
  dr() {
    return !0 === this.er(U.nr);
  }
  g(t) {
    let i = !1;
    for (const s of this.Jh) s === t && (i = !0);
    i || this.Jh.push(t);
  }
  v(i) {
    let s = !1;
    for (const t of this.Xh) t.constructor === i.constructor && (s = !0);
    i instanceof t && !s && this.Xh.push(i);
  }
  S(t) {
    t instanceof f && this.In.push(t);
  }
  removeAllSubscriptions() {
    if (this.rr()) for (const t of this.In) t.removeAllSubscriptions();
  }
  removeSubscription(t) {
    if (this.rr()) for (const i of this.In) i.removeSubscription(t);
  }
  fe(t) {
    this.$h = t;
  }
  ao() {
    return this.isInitialized;
  }
  cl() {
    return this.$h;
  }
  ar(t, i) {
    if (!this.rr()) return null;
    return dr.o().on(t, i);
  }
  qi() {
    return this.Vh;
  }
}
const r = new ci();

const v = {
  Dt: (e, o, t) => {
    var n, s;
    const i = new L(),
      l = r.u();
    if (!l)
      return (
        b$1.info(
          `Not logging event with type "${e}" because the current session ID could not be found.`,
        ),
        i
      );
    const d = l.el();
    return (
      i.Ce.push(
        new Ie(
          t || (null === (n = r.ir()) || void 0 === n ? void 0 : n.getUserId()),
          e,
          new Date().valueOf(),
          d,
          o,
        ),
      ),
      (i.lt =
        (null === (s = r.p()) || void 0 === s ? void 0 : s.ol(i.Ce)) || !1),
      i
    );
  },
};
var v$1 = v;

class M {
  constructor(t) {
    (this.j = t), (this.j = t);
  }
  logClick(t) {
    const n = new L();
    if ((t.Yt(), null == t.url || "" === t.url))
      return (
        b$1.info(`Card ${t.id} has no url. Not logging click to Braze servers.`),
        n
      );
    if (t.id && this.j) {
      const n = this.j.St(STORAGE_KEYS.It.Zt) || {};
      (n[t.id] = !0), this.j.Pt(STORAGE_KEYS.It.Zt, n);
    }
    const r = this.ls([t]);
    if (null == r) return n;
    const i = p.us;
    return v$1.Dt(i, r);
  }
  cs(t) {
    const n = new L();
    if (!t.Ft())
      return (
        b$1.info(
          `Card ${t.id} refused this dismissal. Ignoring analytics event.`,
        ),
        n
      );
    if (t.id && this.j) {
      const n = this.j.St(STORAGE_KEYS.It.fs) || {};
      (n[t.id] = !0), this.j.Pt(STORAGE_KEYS.It.fs, n);
    }
    const r = this.ls([t]);
    return null == r ? n : v$1.Dt(p.gs, r);
  }
  ds(t) {
    const n = new L(!0),
      r = [],
      i = [];
    let o = {};
    this.j && (o = this.j.St(STORAGE_KEYS.It.ps) || {});
    for (const s of t) {
      s.js()
        ? (s instanceof ControlCard ? i.push(s) : r.push(s),
          s.id && (o[s.id] = !0))
        : b$1.info(
            `Card ${s.id} logged an impression too recently. Ignoring analytics event.`,
          );
    }
    const e = this.ls(r),
      l = this.ls(i);
    if (null == e && null == l) return (n.lt = !1), n;
    if ((this.j && this.j.Pt(STORAGE_KEYS.It.ps, o), null != e)) {
      const t = p.vs,
        s = v$1.Dt(t, e);
      n.Cs(s);
    }
    if (null != l) {
      const t = v$1.Dt(p.ws, l);
      n.Cs(t);
    }
    return n;
  }
  ls(t) {
    let s,
      n = null;
    for (let r = 0; r < t.length; r++)
      (s = t[r].id),
        null != s &&
          "" !== s &&
          ((n = n || {}), (n.ids = n.ids || []), n.ids.push(s));
    return n;
  }
}

const K = {
  i: !1,
  na: null,
  ra: () => (K.t(), K.na || (K.na = new M(r.p())), K.na),
  t: () => {
    K.i || (r.g(K), (K.i = !0));
  },
  destroy: () => {
    (K.na = null), (K.i = !1);
  },
};
var K$1 = K;

const CardStrings = { tr: "must be a Card object" };

function logCardDismissal(o) {
  return (
    !!r.rr() &&
    (o instanceof Card ? K$1.ra().cs(o).lt : (b$1.error("card " + CardStrings.tr), !1))
  );
}

function logContentCardImpressions(o) {
  if (!r.rr()) return !1;
  if (!isArray(o)) return b$1.error("cards must be an array"), !1;
  for (const r of o)
    if (!(r instanceof Card)) return b$1.error(`Each card in cards ${CardStrings.tr}`), !1;
  return K$1.ra().ds(o).lt;
}

function logContentCardClick(o) {
  return (
    !!r.rr() &&
    (o instanceof Card ? K$1.ra().logClick(o).lt : (b$1.error("card " + CardStrings.tr), !1))
  );
}

function newCard(e, n, r, t, i, o, l, u, d, a, f, s, w, m, p, C, c, x) {
  let j;
  if (n === Card.ks.Ei || n === Card.ks.Ti)
    j = new ClassicCard(e, r, t, i, o, l, u, d, a, f, s, w, m, p, c, x);
  else if (n === Card.ks.zs)
    j = new CaptionedImage(e, r, t, i, o, l, u, d, a, f, s, w, m, p, c, x);
  else if (n === Card.ks.oi)
    j = new ImageOnly(e, r, i, l, u, d, f, s, w, m, p, c, x);
  else {
    if (n !== Card.ks.ai)
      return b$1.error("Ignoring card with unknown type " + n), null;
    j = new ControlCard(e, r, l, u, s, w);
  }
  return C && (j.test = C), j;
}
function newCardFromContentCardsJson(e) {
  if (e[Card.ei.ri]) return null;
  const n = e[Card.ei.qs],
    r = e[Card.ei.xs],
    t = e[Card.ei.ys],
    i = e[Card.ei.As],
    o = e[Card.ei.Bs],
    l = e[Card.ei.Ds],
    u = dateFromUnixTimestamp(e[Card.ei.Es]);
  let d;
  d = e[Card.ei.Fs] === Card.ui ? null : dateFromUnixTimestamp(e[Card.ei.Fs]);
  return newCard(
    n,
    r,
    t,
    i,
    o,
    l,
    u,
    d,
    e[Card.ei.URL],
    e[Card.ei.Gs],
    e[Card.ei.Hs],
    e[Card.ei.Is],
    e[Card.ei.Js],
    e[Card.ei.Ks],
    e[Card.ei.Ls],
    e[Card.ei.Os] || !1,
    e[Card.ei.Ms],
    e[Card.ei.Ns],
  );
}
function newCardFromSerializedValue(e) {
  return (
    newCard(
      e[Card.bs.qs],
      e[Card.bs.xs],
      e[Card.bs.ys],
      e[Card.bs.As],
      e[Card.bs.Bs],
      e[Card.bs.Ds],
      rehydrateDateAfterJsonization(e[Card.bs.Es]),
      rehydrateDateAfterJsonization(e[Card.bs.Fs]),
      e[Card.bs.URL],
      e[Card.bs.Gs],
      e[Card.bs.Hs],
      e[Card.bs.Is],
      e[Card.bs.Js],
      e[Card.bs.Ks],
      e[Card.bs.Ls],
      e[Card.bs.Os] || !1,
      e[Card.bs.Ms],
      e[Card.bs.Ns],
    ) || void 0
  );
}

class rr extends t {
  constructor(t, s, i, e, h) {
    super(),
      (this.Ss = t),
      (this.j = s),
      (this.h = i),
      (this.Ts = e),
      (this.B = h),
      (this.Ss = t),
      (this.j = s),
      (this.h = i),
      (this.Ts = e),
      (this.B = h),
      (this.Rs = new f()),
      r.S(this.Rs),
      (this.Us = 0),
      (this.$s = 0),
      (this.cards = []),
      this.Ps();
    const n = et._s.Xs;
    new et(n, b$1).Qs(n.Ws.Vs, (t) => {
      this.Ys(t);
    }),
      (this.Zs = null),
      (this.T = null),
      (this.fi = null),
      (this.di = null),
      (this.pi = 10);
  }
  vi() {
    return this.Zs;
  }
  Ci(t) {
    this.Zs = t;
  }
  Et() {
    return this.T;
  }
  Lt(t) {
    this.T = t;
  }
  Ps() {
    if (!this.j) return;
    const t = this.j.St(STORAGE_KEYS.It.bi) || [],
      i = [];
    for (let s = 0; s < t.length; s++) {
      const e = newCardFromSerializedValue(t[s]);
      null != e && i.push(e);
    }
    (this.cards = this.wi(this.gi(i, !1))),
      (this.Us = this.j.St(STORAGE_KEYS.It.ji) || this.Us),
      (this.$s = this.j.St(STORAGE_KEYS.It.yi) || this.$s);
  }
  Ri(t, i = !1, e = 0, h = 0) {
    let r;
    if (i) {
      r = [];
      for (const t of this.cards) t.test && r.push(t);
    } else r = this.cards.slice();
    for (let s = 0; s < t.length; s++) {
      const e = t[s];
      let h = null;
      for (let t = 0; t < this.cards.length; t++)
        if (e.id === this.cards[t].id) {
          h = this.cards[t];
          break;
        }
      if (i) {
        const t = newCardFromContentCardsJson(e);
        null != h && h.viewed && t && (t.viewed = !0), null != t && r.push(t);
      } else if (null == h) {
        const t = newCardFromContentCardsJson(e);
        null != t && r.push(t);
      } else {
        if (!h.ni(e))
          for (let t = 0; t < r.length; t++)
            if (e.id === r[t].id) {
              r.splice(t, 1);
              break;
            }
      }
    }
    (this.cards = this.wi(this.gi(r, i))),
      this.Ui(),
      (this.Us = e),
      (this.$s = h),
      this.j && (this.j.Pt(STORAGE_KEYS.It.ji, this.Us), this.j.Pt(STORAGE_KEYS.It.yi, this.$s));
  }
  q(t) {
    if (this.ki() && null != t && t.cards) {
      this.j && this.j.Pt(STORAGE_KEYS.It.zi, r.qi());
      const i = t.full_sync;
      i || this.Ps(),
        this.Ri(t.cards, i, t.last_full_sync_at, t.last_card_updated_at),
        this.Rs.A(this.xi(!0));
    }
  }
  Fi(t) {
    this.Li(), (this.fi = t);
  }
  Ys(t) {
    var s;
    if (!this.ki()) return;
    this.Ps();
    const i = this.cards.slice();
    let e = null;
    e = null === (s = this.Ss) || void 0 === s ? void 0 : s.getUserId();
    for (let s = 0; s < t.length; s++)
      if (e === t[s].userId || (null == e && null == t[s].userId)) {
        const e = t[s].card;
        let h = null;
        for (let t = 0; t < this.cards.length; t++)
          if (e.id === this.cards[t].id) {
            h = this.cards[t];
            break;
          }
        if (null == h) {
          const t = newCardFromContentCardsJson(e);
          null != t && i.push(t);
        } else {
          if (!h.ni(e))
            for (let t = 0; t < i.length; t++)
              if (e.id === i[t].id) {
                i.splice(t, 1);
                break;
              }
        }
      }
    (this.cards = this.wi(this.gi(i, !1))), this.Ui(), this.Rs.A(this.xi(!0));
  }
  gi(t, i) {
    let e = {},
      h = {},
      r = {};
    this.j &&
      ((e = this.j.St(STORAGE_KEYS.It.Zt) || {}),
      (h = this.j.St(STORAGE_KEYS.It.ps) || {}),
      (r = this.j.St(STORAGE_KEYS.It.fs) || {}));
    const n = {},
      o = {},
      l = {};
    for (let s = 0; s < t.length; s++) {
      const i = t[s].id;
      i &&
        (e[i] && ((t[s].clicked = !0), (n[i] = !0)),
        h[i] && ((t[s].viewed = !0), (o[i] = !0)),
        r[i] && ((t[s].dismissed = !0), (l[i] = !0)));
    }
    return (
      i &&
        this.j &&
        (this.j.Pt(STORAGE_KEYS.It.Zt, n), this.j.Pt(STORAGE_KEYS.It.ps, o), this.j.Pt(STORAGE_KEYS.It.fs, l)),
      t
    );
  }
  wi(t) {
    const i = [],
      e = new Date();
    let h = {};
    this.j && (h = this.j.St(STORAGE_KEYS.It.fs) || {});
    let r = !1;
    for (let s = 0; s < t.length; s++) {
      const n = t[s].url;
      if (!this.Ts && n && isURIJavascriptOrData(n)) {
        b$1.error(
          `Card with url ${n} will not be displayed because Javascript URLs are disabled. Use the "allowUserSuppliedJavascript" option for braze.initialize to enable this card.`,
        );
        continue;
      }
      const o = t[s].expiresAt;
      let l = !0;
      if ((null != o && (l = o >= e), (l = l && !t[s].dismissed), l))
        i.push(t[s]);
      else {
        const i = t[s].id;
        i && (h[i] = !0), (r = !0);
      }
    }
    return r && this.j && this.j.Pt(STORAGE_KEYS.It.fs, h), i;
  }
  Ui() {
    var t;
    const i = [];
    for (let t = 0; t < this.cards.length; t++) i.push(this.cards[t].qt());
    null === (t = this.j) || void 0 === t || t.Pt(STORAGE_KEYS.It.bi, i);
  }
  Li() {
    this.fi && (clearTimeout(this.fi), (this.fi = null));
  }
  lr(t, i, e = "sdk") {
    var n;
    const o = this.B,
      u = this.j;
    if (!o || !u) return void ("function" == typeof i && i());
    if (("client" === e && (h.Ji(u, h.it.Mi), this.Li()), !this.ki()))
      return void (
        null === (n = this.h) ||
        void 0 === n ||
        n.$i(() => {
          this.lr(t, i, "client");
        })
      );
    const f = o.Z({}, !0);
    u.St(STORAGE_KEYS.It.zi) !== r.qi() && this.Bi(),
      (f.last_full_sync_at = this.Us),
      (f.last_card_updated_at = this.$s);
    const p = o.tt(f, h.it.Mi, e);
    let v = !1;
    o.et(
      f,
      (s = -1) => {
        if (this.j) {
          const t = new Date().valueOf();
          h.nt(this.j, h.it.Mi, t);
        }
        -1 !== s && p.push(["X-Braze-Req-Tokens-Remaining", s.toString()]),
          l.ot({
            url: `${o.ht()}/content_cards/sync`,
            data: f,
            headers: p,
            lt: (s) => {
              if (!o.ut(f, s, p))
                return (v = !0), void ("function" == typeof i && i());
              o.ct(), this.q(s), (v = !1), "function" == typeof t && t();
            },
            error: (t) => {
              o.dt(t, "retrieving content cards"),
                (v = !0),
                "function" == typeof i && i();
            },
            ft: (s, e) => {
              var r, n, l;
              let u;
              if (v) {
                const t =
                    (null === (r = this.h) || void 0 === r ? void 0 : r.vt()) ||
                    REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT,
                  s =
                    (null === (n = this.h) || void 0 === n ? void 0 : n.gt()) ||
                    REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT,
                  i =
                    (null === (l = this.h) || void 0 === l ? void 0 : l.bt()) ||
                    REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT;
                let e = this.di;
                (null == e || e < t) && (e = t), (u = Math.min(i, randomInclusive(t, e * s)));
              }
              o.yt(
                e,
                () => {
                  this.lr(t, i);
                },
                h.it.Mi,
                (t) => this.Fi(t),
                () => this.Li(),
                u,
              );
            },
          });
      },
      h.it.Mi,
      i,
    );
  }
  xi(t) {
    t || this.Ps();
    const i = this.wi(this.cards);
    i.sort((t, s) =>
      t.pinned && !s.pinned
        ? -1
        : s.pinned && !t.pinned
        ? 1
        : t.updated && s.updated && t.updated > s.updated
        ? -1
        : t.updated && s.updated && s.updated > t.updated
        ? 1
        : 0,
    );
    let e = Math.max(this.$s || 0, this.Us || 0);
    return (
      0 === e && (e = void 0),
      this.j && this.j.St(STORAGE_KEYS.It.yi) === this.$s && void 0 === e && (e = this.$s),
      new ContentCards(i, dateFromUnixTimestamp(e))
    );
  }
  Kt(t) {
    return this.Rs.Ut(t);
  }
  Bi() {
    (this.Us = 0),
      (this.$s = 0),
      this.j && (this.j.Vt(STORAGE_KEYS.It.ji), this.j.Vt(STORAGE_KEYS.It.yi));
  }
  changeUser(t) {
    t ||
      ((this.cards = []),
      this.Rs.A(new ContentCards(this.cards.slice(), null)),
      this.j &&
        (this.j.Vt(STORAGE_KEYS.It.bi),
        this.j.Vt(STORAGE_KEYS.It.Zt),
        this.j.Vt(STORAGE_KEYS.It.ps),
        this.j.Vt(STORAGE_KEYS.It.fs))),
      this.Li(),
      this.Bi();
  }
  clearData(t) {
    (this.Us = 0),
      (this.$s = 0),
      (this.cards = []),
      this.Rs.A(new ContentCards(this.cards.slice(), null)),
      t &&
        this.j &&
        (this.j.Vt(STORAGE_KEYS.It.bi),
        this.j.Vt(STORAGE_KEYS.It.Zt),
        this.j.Vt(STORAGE_KEYS.It.ps),
        this.j.Vt(STORAGE_KEYS.It.fs),
        this.j.Vt(STORAGE_KEYS.It.ji),
        this.j.Vt(STORAGE_KEYS.It.yi)),
      this.Li();
  }
  ki() {
    return !!this.h && (!!this.h.Pi() || (0 !== this.h.Qt() && this.Xi(), !1));
  }
  Xi() {
    this.Rs.A(new ContentCards([], new Date())), this.j && this.j.Vt(STORAGE_KEYS.It.bi);
  }
}

const ir = {
  i: !1,
  provider: null,
  o: () => (
    ir.t(),
    ir.provider ||
      ((ir.provider = new rr(r.ir(), r.p(), r.l(), r.dr(), r.m())),
      r.v(ir.provider),
      r.ar("ccr", () => {
        var r;
        null === (r = ir.provider) ||
          void 0 === r ||
          r.lr(void 0, void 0, "dust");
      })),
    ir.provider
  ),
  t: () => {
    ir.i || (r.g(ir), (ir.i = !0));
  },
  destroy: () => {
    (ir.provider = null), (ir.i = !1);
  },
};
var ir$1 = ir;

function requestContentCardsRefresh(e, t) {
  if (r.rr()) return ir$1.o().lr(e, t, "client");
}

class ContentCards {
  constructor(r, t) {
    (this.cards = r),
      (this.lastUpdated = t),
      (this.cards = r),
      (this.lastUpdated = t);
  }
  getUnviewedCardCount() {
    let r = 0;
    for (const t of this.cards) t.viewed || t instanceof ControlCard || r++;
    return r;
  }
  ur(r) {
    logContentCardImpressions(r);
  }
  cr(r) {
    return logContentCardClick(r);
  }
  Cr() {
    requestContentCardsRefresh();
  }
  hr() {
    return !0;
  }
}
(ContentCards.mr = 6e4), (ContentCards.gr = 500), (ContentCards.jr = 1e4);

function getCachedContentCards() {
  if (r.rr()) return ir$1.o().xi(!1);
}

function markCardAsRead(t) {
  if (null != t) {
    const e = t.querySelectorAll(".ab-unread-indicator")[0];
    null == e || e.classList.contains("read") || (e.className += " read");
  }
}
function getCardId(t) {
  return t.getAttribute("data-ab-card-id");
}
function _setImageAltText(t, e) {
  e.setAttribute("alt", t.altImageText || "");
}
function setCardHeight(t, e) {
  const a = e.querySelectorAll(".ab-image-area");
  let o,
    i = 0;
  a.length > 0 && (i = a[0].offsetWidth);
  for (const e of t)
    if (((o = e.te), o && e.imageUrl && "number" == typeof e.aspectRatio)) {
      const t = i / e.aspectRatio;
      t && (o.style.height = `${t}px`);
    }
}
function cardToHtml(t, e, a, o = "ltr") {
  const i = document.createElement("div");
  (i.dir = o),
    t.language && (i.lang = t.language),
    (i.className = "ab-card ab-effect-card " + t.ae),
    t.id &&
      (i.setAttribute("data-ab-card-id", t.id), i.setAttribute("id", t.id)),
    i.setAttribute("role", "article");
  let n = "",
    d = !1;
  t.url && "" !== t.url && ((n = t.url), (d = !0));
  const r = (o) => (markCardAsRead(i), d && (e(t), _handleBrazeAction(n, a, o)), !1);
  if (t.pinned) {
    const t = document.createElement("div");
    t.className = "ab-pinned-indicator";
    const e = document.createElement("i");
    (e.className = "fa fa-star"), t.appendChild(e), i.appendChild(t);
  }
  if (t.imageUrl && "" !== t.imageUrl) {
    const e = document.createElement("div");
    (e.dir = o), (e.className = "ab-image-area");
    const a = document.createElement("img");
    if (
      (a.setAttribute("src", t.imageUrl),
      (a.onload = () => {
        i.style.height = "auto";
      }),
      _setImageAltText(t, a),
      e.appendChild(a),
      (i.className += " with-image"),
      d && !t.oe)
    ) {
      const a = document.createElement("a");
      a.setAttribute("href", n),
        (a.onclick = r),
        t.altImageText ||
          (t.title
            ? a.setAttribute("aria-label", t.title)
            : a.setAttribute("aria-label", "Feed Image")),
        a.appendChild(e),
        i.appendChild(a);
    } else i.appendChild(e);
  }
  const c = document.createElement("div");
  if (((c.className = "ab-card-body"), (c.dir = o), t.dismissible)) {
    t.logCardDismissal = () => logCardDismissal(t);
    const e = createCloseButton("Dismiss Card", void 0, t.dismissCard.bind(t), o);
    i.appendChild(e),
      detectSwipe(c, DIRECTIONS.ie, (t) => {
        (i.className += " ab-swiped-left"), e.onclick(t);
      }),
      detectSwipe(c, DIRECTIONS.ne, (t) => {
        (i.className += " ab-swiped-right"), e.onclick(t);
      });
  }
  let s = "",
    m = !1;
  if ((t.title && "" !== t.title && ((s = t.title), (m = !0)), m)) {
    const t = document.createElement("h1");
    if (
      ((t.className = "ab-title"),
      (t.id = V$1.de()),
      i.setAttribute("aria-labelledby", t.id),
      d)
    ) {
      const e = document.createElement("a");
      e.setAttribute("href", n),
        (e.onclick = r),
        e.appendChild(document.createTextNode(s)),
        t.appendChild(e);
    } else t.appendChild(document.createTextNode(s));
    c.appendChild(t);
  }
  const u = document.createElement("div");
  if (
    ((u.className = m ? "ab-description" : "ab-description ab-no-title"),
    t.language && (u.lang = t.language),
    t.description && u.appendChild(document.createTextNode(t.description)),
    d)
  ) {
    const e = document.createElement("div");
    e.className = "ab-url-area";
    const a = document.createElement("a");
    a.setAttribute("href", n),
      t.linkText && a.appendChild(document.createTextNode(t.linkText)),
      (a.onclick = r),
      e.appendChild(a),
      u.appendChild(e);
  }
  c.appendChild(u), i.appendChild(c);
  const l = document.createElement("div");
  return (
    (l.className = "ab-unread-indicator"),
    t.viewed && (l.className += " read"),
    i.appendChild(l),
    (t.te = i),
    i
  );
}

function removeSubscription(e) {
  r.rr() && r.removeSubscription(e);
}

function topHadImpression(o) {
  return null != o && !!o.getAttribute("data-ab-had-top-impression");
}
function impressOnTop(o) {
  null != o && o.setAttribute("data-ab-had-top-impression", "true");
}
function bottomHadImpression(o) {
  return null != o && !!o.getAttribute("data-ab-had-bottom-impression");
}
function impressOnBottom(o) {
  null != o && o.setAttribute("data-ab-had-bottom-impression", "true");
}
const detectImpression = {
  oo: topHadImpression,
  no: bottomHadImpression,
};

const BannerStrings = {
  aa: "Banners are disabled. Make sure you have at least one campaign and relaunch the app.",
  ea: "data-update-subscription-id",
};

const LAST_REQUESTED_REFRESH_DATA_ATTRIBUTE =
  "data-last-requested-refresh";
const scrollListeners = {};
function destroyContentCardsHtml(t) {
  t &&
    ((t.className = t.className.replace("ab-show", "ab-hide")),
    setTimeout(() => {
      t && t.parentNode && t.parentNode.removeChild(t);
    }, ContentCards.gr));
  const e = t.getAttribute(BannerStrings.ea);
  null != e && removeSubscription(e);
  const n = t.getAttribute("data-listener-id");
  null != n &&
    (window.removeEventListener("scroll", scrollListeners[n]),
    delete scrollListeners[n]);
}
function generateContentCardsUI(t, e) {
  const n = Je.ra(),
    o = document.createElement("div");
  if (
    ((o.className = "ab-feed-body"),
    o.setAttribute("aria-label", "Feed"),
    o.setAttribute("role", "feed"),
    null == t.lastUpdated)
  ) {
    const t = document.createElement("div");
    t.className = "ab-no-cards-message";
    const e = document.createElement("i");
    (e.className = "fa fa-spinner fa-spin fa-4x ab-initial-spinner"),
      t.appendChild(e),
      o.appendChild(t);
  } else {
    let s = !1;
    const r = (e) => t.cr(e);
    for (const a of t.cards) {
      const i = a instanceof ControlCard;
      !i || t.hr()
        ? (o.appendChild(cardToHtml(a, r, e, n.wa())), (s = s || !i))
        : b$1.error(
            "Received a control card for a legacy news feed. Control cards are only supported with content cards.",
          );
    }
    if (!s) {
      const t = document.createElement("div");
      (t.className = "ab-no-cards-message"),
        (t.innerHTML = n.get("NO_CARDS_MESSAGE") || ""),
        t.setAttribute("role", "article"),
        o.appendChild(t);
    }
  }
  return o;
}
function detectContentCardsImpressions(t, e) {
  if (null != t && null != e) {
    const n = [],
      o = e.querySelectorAll(".ab-card");
    t.Ta || (t.Ta = {});
    for (let e = 0; e < o.length; e++) {
      const s = getCardId(o[e]),
        r = topIsInView(o[e]),
        a = bottomIsInView(o[e]);
      if (t.Ta[s]) {
        r || a || markCardAsRead(o[e]);
        continue;
      }
      let i = topHadImpression(o[e]),
        l = bottomHadImpression(o[e]);
      const d = i,
        c = l;
      if (
        (!i && r && ((i = !0), impressOnTop(o[e])), !l && a && ((l = !0), impressOnBottom(o[e])), i && l)
      ) {
        if (d && c) continue;
        for (const e of t.cards)
          if (e.id === s) {
            (t.Ta[e.id] = !0), n.push(e);
            break;
          }
      }
    }
    n.length > 0 && t.ur(n);
  }
}
function refreshContentCardsUI(t, e) {
  if (null == t || null == e) return;
  e.setAttribute("aria-busy", "true");
  const n = e.querySelectorAll(".ab-refresh-button")[0];
  null != n && (n.className += " fa-spin");
  const o = new Date().valueOf().toString();
  e.setAttribute("data-last-requested-refresh", o),
    setTimeout(() => {
      if (e.getAttribute("data-last-requested-refresh") === o) {
        const t = e.querySelectorAll(".fa-spin");
        for (let e = 0; e < t.length; e++)
          t[e].className = t[e].className.replace(/fa-spin/g, "");
        const n = e.querySelectorAll(".ab-initial-spinner")[0];
        if (null != n) {
          const t = document.createElement("span");
          (t.innerHTML = Je.ra().get("FEED_TIMEOUT_MESSAGE") || ""),
            null != n.parentNode &&
              (n.parentNode.appendChild(t), n.parentNode.removeChild(n));
        }
        "true" === e.getAttribute("aria-busy") &&
          e.setAttribute("aria-busy", "false");
      }
    }, ContentCards.jr),
    t.Cr();
}
function contentCardsToHtml(t, e, n) {
  const o = document.createElement("div");
  (o.className = "ab-feed ab-hide ab-effect-slide"),
    o.setAttribute("role", "dialog"),
    o.setAttribute("aria-label", "Feed"),
    o.setAttribute("tabindex", "-1");
  const s = document.createElement("div");
  (s.className = "ab-feed-buttons-wrapper"),
    s.setAttribute("role", "group"),
    o.appendChild(s);
  const r = document.createElement("i");
  (r.className = "fa fa-times ab-close-button"),
    r.setAttribute("aria-label", "Close Feed"),
    r.setAttribute("tabindex", "0"),
    r.setAttribute("role", "button");
  const a = (t) => {
    destroyContentCardsHtml(o), t.stopPropagation();
  };
  r.addEventListener("keydown", (t) => {
    (t.keyCode !== KeyCodes.Ao && t.keyCode !== KeyCodes.Lo) || a(t);
  }),
    (r.onclick = a);
  const i = document.createElement("i");
  (i.className = "fa fa-refresh ab-refresh-button"),
    t && null == t.lastUpdated && (i.className += " fa-spin"),
    i.setAttribute("aria-label", "Refresh Feed"),
    i.setAttribute("tabindex", "0"),
    i.setAttribute("role", "button");
  const l = (e) => {
    refreshContentCardsUI(t, o), e.stopPropagation();
  };
  i.addEventListener("keydown", (t) => {
    (t.keyCode !== KeyCodes.Ao && t.keyCode !== KeyCodes.Lo) || l(t);
  }),
    (i.onclick = l),
    s.appendChild(i),
    s.appendChild(r),
    o.appendChild(generateContentCardsUI(t, e));
  const d = () => detectContentCardsImpressions(t, o);
  if ((o.addEventListener("scroll", d), !n)) {
    window.addEventListener("scroll", d);
    const t = V$1.de();
    (scrollListeners[t] = d), o.setAttribute("data-listener-id", t);
  }
  return o;
}
function updateContentCards(t, e, n, o, s) {
  if (!isArray(e)) return;
  const r = [];
  for (const t of e)
    if (t instanceof Card) {
      if (t.url && BRAZE_ACTION_URI_REGEX.test(t.url)) {
        const e = getDecodedBrazeAction(t.url);
        if (containsUnknownBrazeAction(e)) {
          b$1.error(ineligibleBrazeActionURLErrorMessage(INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES.Un, "Content Card"));
          continue;
        }
      }
      r.push(t);
    }
  if (((t.cards = r), (t.lastUpdated = n), null != o))
    if ((o.setAttribute("aria-busy", "false"), null == t.lastUpdated))
      destroyContentCardsHtml(o);
    else {
      const e = o.querySelectorAll(".ab-feed-body")[0];
      if (null != e) {
        const n = generateContentCardsUI(t, s);
        e.parentNode && e.parentNode.replaceChild(n, e),
          detectContentCardsImpressions(t, n.parentNode);
      }
    }
}
function registerContentCardsSubscriptionId(t, e) {
  t && e.setAttribute(BannerStrings.ea, t);
}

function hideContentCards(n) {
  if (!r.rr()) return;
  const o = document.querySelectorAll(".ab-feed");
  for (let t = 0; t < o.length; t++)
    (null == n || (null != n && o[t].parentNode === n)) && destroyContentCardsHtml(o[t]);
}

function showContentCards(n, t) {
  if (!r.rr()) return;
  setupFeedUI();
  let e = !1;
  null == n && ((n = document.body), (e = !0));
  const o = r.er(U.tn) || !1,
    s = ir$1.o().xi(!1);
  "function" == typeof t && updateContentCards(s, t(s.cards.slice()), s.lastUpdated, null, o);
  const a = contentCardsToHtml(s, o, e),
    i = ir$1.o(),
    c = i.vi();
  (null == s.lastUpdated ||
    new Date().valueOf() - s.lastUpdated.valueOf() > ContentCards.mr) &&
    (null == c || new Date().valueOf() - c > ContentCards.mr) &&
    (b$1.info(
      `Cached content cards were older than max TTL of ${ContentCards.mr} ms, requesting an update from the server.`,
    ),
    refreshContentCardsUI(s, a),
    i.Ci(new Date().valueOf()));
  const f = new Date().valueOf(),
    l = subscribeToContentCardsUpdates(function (n) {
      const e = a.querySelectorAll(".ab-refresh-button")[0];
      if (null != e) {
        let n = 500,
          t = (n -= new Date().valueOf() - f);
        const o = a.getAttribute(LAST_REQUESTED_REFRESH_DATA_ATTRIBUTE);
        o && ((t = parseInt(o)), isNaN(t) || (n -= new Date().valueOf() - t)),
          setTimeout(
            function () {
              e.className = e.className.replace(/fa-spin/g, "");
            },
            Math.max(n, 0),
          );
      }
      let r = n.cards;
      "function" == typeof t && (r = t(r.slice())),
        updateContentCards(s, r, n.lastUpdated, a, o);
    });
  registerContentCardsSubscriptionId(l, a);
  const u = function (n) {
    const t = n.querySelectorAll(".ab-feed");
    let o = null;
    for (let e = 0; e < t.length; e++) t[e].parentNode === n && (o = t[e]);
    null != o
      ? (destroyContentCardsHtml(o), null != o.parentNode && o.parentNode.replaceChild(a, o))
      : n.appendChild(a),
      setTimeout(function () {
        a.className = a.className.replace("ab-hide", "ab-show");
      }, 0),
      e && a.focus(),
      detectContentCardsImpressions(s, a),
      setCardHeight(s.cards, n);
  };
  var d;
  null != n
    ? u(n)
    : (window.onload =
        ((d = window.onload),
        function () {
          "function" == typeof d && d(new Event("oldLoad")), u(document.body);
        }));
}

function subscribeToContentCardsUpdates(t) {
  if (!r.rr()) return;
  const o = ir$1.o(),
    n = o.Kt(t);
  if (!o.Et()) {
    const t = r.nn();
    if (t) {
      const r = t.rn(() => {
        o.lr(void 0, void 0, "client");
      });
      r && o.Lt(r);
    }
  }
  return n;
}

function toggleContentCards(e, n) {
  r.rr() &&
    (document.querySelectorAll(".ab-feed").length > 0
      ? hideContentCards()
      : showContentCards(e, n));
}

var BrazeSdkMetadata = {
  GOOGLE_TAG_MANAGER: "gg",
  MPARTICLE: "mp",
  SEGMENT: "sg",
  TEALIUM: "tl",
  MANUAL: "manu",
  NPM: "npm",
  CDN: "wcd",
  SHOPIFY: "shp",
};

function addSdkMetadata(a) {
  if (!r.rr()) return;
  const t = r.m();
  if (t) {
    if (!isArray(a))
      return (
        b$1.error("Cannot set SDK metadata because metadata is not an array."), !1
      );
    for (const t of a)
      if (
        !validateValueIsFromEnum(
          BrazeSdkMetadata,
          t,
          "sdkMetadata contained an invalid value.",
          "BrazeSdkMetadata",
        )
      )
        return !1;
    return t.addSdkMetadata(a), !0;
  }
}

function changeUser(e, i) {
  if (!r.rr()) return;
  if (null == e || 0 === e.length || e != e)
    return void b$1.error("changeUser requires a non-empty userId.");
  if (getByteLength(e) > User.br)
    return void b$1.error(
      `Rejected user id "${e}" because it is longer than ${User.br} bytes.`,
    );
  if (null != i && !validateStandardString(i, "set signature for new user", "signature")) return;
  const t = r.nn();
  t && t.changeUser(e.toString(), r.vr(), i);
}

var changeUser$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	changeUser: changeUser
});

function destroy() {
  b$1.info("Destroying Braze instance"), r.destroy(!0);
}

function disableSDK() {
  const e = r.nn();
  e && e.requestImmediateDataFlush();
  const n = r.er(U.se),
    a = new ne.le(null, !0, n),
    i = "This-cookie-will-expire-in-" + a.me();
  a.store(STORAGE_KEYS.ce, i);
  const o = et._s.Xs;
  new et(o, b$1).setItem(o.Ws.pe, o.be, !0),
    b$1.info("disableSDK was called"),
    r.destroy(!1),
    r.fe(!0);
}

function enableSDK() {
  new ne.le(null, !0).remove(STORAGE_KEYS.ce);
  const e = et._s.Xs;
  new et(e, b$1).ge(e.Ws.pe, e.be),
    b$1.info("enableSDK was called"),
    r.destroy(!1),
    r.fe(!1);
}

function getDeviceId(e) {
  if (!r.rr()) return;
  const t = r.ue();
  if (!t) return;
  const i = t.ve().id;
  if ("function" != typeof e) return i;
  b$1.warn(
    "The callback for getDeviceId is deprecated. You can access its return value directly instead (e.g. `const id = braze.getDeviceId()`)",
  ),
    e(i);
}

function initialize(i, n) {
  return r.initialize(i, n);
}

function isDisabled() {
  return !!new ne.le(null, !0).wr(STORAGE_KEYS.ce);
}

function isInitialized() {
  return r.ao();
}

function logCustomEvent(t, e) {
  if (!r.rr()) return !1;
  if (null == t || t.length <= 0)
    return (
      b$1.error(
        `logCustomEvent requires a non-empty eventName, got "${t}". Ignoring event.`,
      ),
      !1
    );
  if (!validateCustomString(t, "log custom event", "the event name")) return !1;
  const [o, n] = validateCustomProperties(
    e,
    CoreStrings.je,
    "eventProperties",
    `log custom event "${t}"`,
    "event",
  );
  if (!o) return !1;
  const i = r.l();
  if (i && i.$e(t))
    return b$1.info(`Custom Event "${t}" is blocklisted, ignoring.`), !1;
  const s = v$1.Dt(p.CustomEvent, { n: t, p: n });
  if (s.lt) {
    b$1.info(`Logged custom event "${t}".`);
    for (const o of s.Ce) TriggersProviderFactory.o().Ee(ot.he, [t, e], o);
  }
  return s.lt;
}

var logCustomEvent$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	logCustomEvent: logCustomEvent
});

const DD = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTC",
  "BTN",
  "BWP",
  "BYR",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EEK",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LTL",
  "LVL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRO",
  "MTL",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLL",
  "SOS",
  "SRD",
  "STD",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VEF",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XAG",
  "XAU",
  "XCD",
  "XDR",
  "XOF",
  "XPD",
  "XPF",
  "XPT",
  "YER",
  "ZAR",
  "ZMK",
  "ZMW",
  "ZWL",
];
function isValidIso4217CurrencyCode(D) {
  return -1 !== DD.indexOf(D);
}

const CartUpdatedActions = {
  REPLACE: "replace",
  Ld: "add",
  Md: "remove",
};

const ln = "log eCommerce event";
function dn(n, t, e) {
  if (null == n) {
    if (!e) return;
    return b$1.error(`Cannot ${ln} because ${t} must be a non-empty string.`), !1;
  }
  return "string" != typeof n || (e && n.length <= 0)
    ? (b$1.error(
        `Cannot ${ln} because ${t} must be a string${
          e ? "" : " when provided"
        }.`,
      ),
      !1)
    : n.length > 255
    ? (b$1.error(`Cannot ${ln} because ${t} must be at most 255 characters.`), !1)
    : !!validateCustomString(n, ln, t) && n;
}
function mn(n, t) {
  return "number" != typeof n || isNaN(n) || !isFinite(n)
    ? (b$1.error(`Cannot ${ln} because ${t} must be a finite number.`), !1)
    : n;
}
function pn(n, t) {
  const e = mn(n, t);
  return (
    !1 !== e &&
    (e < 0 ? (b$1.error(`Cannot ${ln} because ${t} must be at least 0.`), !1) : e)
  );
}
const bn = /^[A-Za-z0-9\-_.,:;!?@#%&*()+={}[\]|\\/'`~^<>]+$/;
function _n(n, t) {
  return 0 === n.length || n.length > 255
    ? (b$1.error(
        `Cannot ${ln} because each ${t} key must be between 1 and 255 characters.`,
      ),
      !1)
    : "$" === n.charAt(0)
    ? (b$1.error(`Cannot ${ln} because ${t} keys cannot begin with "$".`), !1)
    : !!bn.test(n) ||
      (b$1.error(
        `Cannot ${ln} because ${t} key "${n}" contains invalid characters.`,
      ),
      !1);
}
function $n(n, t, e) {
  if (e > 50)
    return b$1.error(`Cannot ${ln} because ${t} is nested too deeply.`), !1;
  if (null == n || "object" != typeof n) return !0;
  if (isArray(n)) {
    const r = n;
    for (let n = 0; n < r.length; n++) {
      const u = r[n];
      if ("string" == typeof u) {
        if (u.length > 255)
          return (
            b$1.error(
              `Cannot ${ln} because a ${t} string value exceeds 255 characters.`,
            ),
            !1
          );
      } else if (!$n(u, t, e + 1)) return !1;
    }
    return !0;
  }
  if (!isObject$1(n)) return !0;
  const r = n;
  for (const n in r) {
    if (!Object.prototype.hasOwnProperty.call(r, n)) continue;
    if (!_n(n, t)) return !1;
    const u = r[n];
    if ("string" == typeof u) {
      if (u.length > 255)
        return (
          b$1.error(
            `Cannot ${ln} because a ${t} string value exceeds 255 characters.`,
          ),
          !1
        );
    } else if (null != u && "object" == typeof u && !$n(u, t, e + 1)) return !1;
  }
  return !0;
}
function vn(n, t) {
  if (!isArray(n))
    return (
      b$1.error(`Cannot ${ln} because ${t} must be an array of strings.`), !1
    );
  for (const e of n) if (!1 === dn(e, t, !0)) return !1;
  return !0;
}
function yn(n, t) {
  if (void 0 === n) return;
  const [e, r] = validateCustomProperties(null != n ? n : {}, CoreStrings.QE, "metadata", ln, t);
  return !!e && !(null != r && !$n(r, t, 0)) && r;
}
function gn(n) {
  if (null == n || "object" != typeof n || isArray(n))
    return (
      b$1.error(`Cannot ${ln} because each product must be an object.`), null
    );
  const t = n,
    e = dn(t.product_id, "product_id", !0),
    r = dn(t.product_name, "product_name", !0),
    u = dn(t.variant_id, "variant_id", !0),
    o = (function (n) {
      if (!1 === mn(n, "product quantity")) return !1;
      const t = parseInt(n.toString(), 10);
      return t !== n
        ? (b$1.error(`Cannot ${ln} because product quantity must be an integer.`),
          !1)
        : n < 0 || n > Number.MAX_SAFE_INTEGER
        ? (b$1.error(
            `Cannot ${ln} because product quantity must be between 0 and Number.MAX_SAFE_INTEGER.`,
          ),
          !1)
        : t;
    })(t.quantity),
    c = pn(t.price, "product price");
  if (!1 === e || !1 === r || !1 === u || !1 === o || !1 === c) return null;
  const i = dn(t.image_url, "image_url", !1),
    a = dn(t.product_url, "product_url", !1);
  if (!1 === i || !1 === a) return null;
  const s = yn(t.metadata, "eCommerce product metadata");
  if (!1 === s) return null;
  const l = {
    product_id: e,
    product_name: r,
    variant_id: u,
    quantity: o,
    price: c,
  };
  return (
    null != i && (l.image_url = i),
    null != a && (l.product_url = a),
    null != s && (l.metadata = s),
    l
  );
}
function Cn(n) {
  if (null == n || !isArray(n))
    return b$1.error(`Cannot ${ln} because products must be an array.`), null;
  const t = [],
    e = n;
  for (const n of e) {
    const e = gn(n);
    if (null == e) return null;
    t.push(e);
  }
  return t;
}
function hn(n) {
  const t = (function (n) {
      if (null == n || "string" != typeof n || n.length <= 0)
        return (
          b$1.error(`Cannot ${ln} because currency must be a non-empty string.`),
          !1
        );
      const t = n.toUpperCase();
      return isValidIso4217CurrencyCode(t)
        ? t
        : (b$1.error(
            `${CoreStrings.QE} requires a valid ISO 4217 currency code, got "${n}". Ignoring event.`,
          ),
          !1);
    })(n.currency),
    e = dn(n.source, "source", !0);
  return !1 === t || !1 === e ? null : { currency: t, source: e };
}
function jn(n, t) {
  const e = ["subtotal_value", "tax", "shipping"];
  for (const r of e)
    if (null != t[r]) {
      const e = pn(t[r], r);
      if (!1 === e) return !1;
      n[r] = e;
    }
  return !0;
}
function wn(n, t) {
  const e = yn(t, "eCommerce event metadata");
  return !1 !== e && (null != e && (n.metadata = e), !0);
}
function kn(n, t) {
  const e = dn(n.cart_id, "cart_id", !0),
    r =
      void 0 === n.action
        ? CartUpdatedActions.REPLACE
        : ((u = n.action),
          !!validateValueIsFromEnum(
            CartUpdatedActions,
            u,
            `Cannot ${ln} because action is invalid.`,
            "CartUpdatedActions",
          ) && u);
  var u;
  const o = Cn(n.products);
  if (!1 === e || !1 === r || null == o) return null;
  const c = r === CartUpdatedActions.Ld || r === CartUpdatedActions.Md,
    i =
      void 0 === n.total_value && c ? void 0 : pn(n.total_value, "total_value");
  if (!1 === i) return null;
  const a = {
    cart_id: e,
    action: r,
    currency: t.currency,
    products: o,
    source: t.source,
  };
  return (
    void 0 !== i && (a.total_value = i),
    jn(a, n) && wn(a, n.metadata) ? a : null
  );
}
function sanitizeEcommerceEvent(n) {
  const t = n.properties;
  if (null == t || "object" != typeof t || isArray(t))
    return b$1.error(`${CoreStrings.QE} requires a properties object.`), null;
  const e = t,
    r = hn(e);
  if (null == r) return null;
  switch (n.name) {
    case "ecommerce.product_viewed":
      return (function (n, t) {
        const e = n.metadata;
        if (void 0 !== n.type && !vn(n.type, "type")) return null;
        const r = dn(n.product_id, "product_id", !0),
          u = dn(n.product_name, "product_name", !0),
          o = dn(n.variant_id, "variant_id", !0),
          c = pn(n.price, "price"),
          i = dn(n.image_url, "image_url", !1),
          a = dn(n.product_url, "product_url", !1);
        if (
          !1 === r ||
          !1 === u ||
          !1 === o ||
          !1 === c ||
          !1 === i ||
          !1 === a
        )
          return null;
        const s = {
          product_id: r,
          product_name: u,
          variant_id: o,
          price: c,
          currency: t.currency,
          source: t.source,
        };
        return (
          null != i && (s.image_url = i),
          null != a && (s.product_url = a),
          void 0 !== n.type && (s.type = n.type),
          wn(s, e) ? s : null
        );
      })(e, r);
    case "ecommerce.cart_updated":
      return kn(e, r);
    case "ecommerce.checkout_started":
      return (function (n, t) {
        const e = dn(n.checkout_id, "checkout_id", !0),
          r = pn(n.total_value, "total_value"),
          u = Cn(n.products),
          o = dn(n.cart_id, "cart_id", !1);
        if (!1 === e || !1 === r || null == u || !1 === o) return null;
        const c = {
          checkout_id: e,
          total_value: r,
          currency: t.currency,
          products: u,
          source: t.source,
        };
        return (
          null != o && (c.cart_id = o), jn(c, n) && wn(c, n.metadata) ? c : null
        );
      })(e, r);
    case "ecommerce.order_placed":
      return (function (n, t) {
        const e = n.metadata;
        if (null != e && "object" == typeof e && !isArray(e)) {
          const n = e;
          if (void 0 !== n.tags && !vn(n.tags, "metadata.tags")) return null;
          if (
            void 0 !== n.payment_gateway_names &&
            !vn(n.payment_gateway_names, "metadata.payment_gateway_names")
          )
            return null;
        }
        const r = dn(n.order_id, "order_id", !0),
          u = pn(n.total_value, "total_value"),
          o = Cn(n.products),
          c = dn(n.cart_id, "cart_id", !1);
        if (!1 === r || !1 === u || null == o || !1 === c) return null;
        const i = {
          order_id: r,
          total_value: u,
          currency: t.currency,
          products: o,
          source: t.source,
        };
        if ((null != c && (i.cart_id = c), null != n.total_discounts)) {
          const t = pn(n.total_discounts, "total_discounts");
          if (!1 === t) return null;
          i.total_discounts = t;
        }
        if (void 0 !== n.discounts) {
          if (!isArray(n.discounts))
            return (
              b$1.error(`Cannot ${ln} because discounts must be an array.`), null
            );
          const [t, e] = validateCustomProperties(
            { discounts: n.discounts },
            CoreStrings.QE,
            "discounts",
            ln,
            "eCommerce order discounts",
          );
          if (!t || null == e) return null;
          i.discounts = e.discounts;
        }
        return jn(i, n) && wn(i, n.metadata) ? i : null;
      })(e, r);
    default:
      return (
        b$1.error(
          "logEcommerceEvent received an unknown event name. Ignoring event.",
        ),
        null
      );
  }
}

function logEcommerceEvent(e) {
  if (!r.rr()) return !1;
  if (null == e || "object" != typeof e || null == e.name)
    return (
      b$1.error(
        'logEcommerceEvent requires an event object with a "name" field.',
      ),
      !1
    );
  const o = sanitizeEcommerceEvent(e);
  if (null == o) return !1;
  const t = r.l();
  if (t && t.$e(e.name))
    return (
      b$1.info(`The eCommerce event "${e.name}" is blocklisted, ignoring.`), !1
    );
  const n = v$1.Dt(p.CustomEvent, { n: e.name, p: o });
  if (n.lt) {
    b$1.info(`Logged eCommerce event "${e.name}".`);
    for (const r of n.Ce) TriggersProviderFactory.o().Ee(ot.he, [e.name, e.properties], r);
  }
  return n.lt;
}

function logPurchase(e, o, i, n, t) {
  if (!r.rr()) return !1;
  if (
    (null == i && (i = "USD"), null == n && (n = 1), null == e || e.length <= 0)
  )
    return (
      b$1.error(
        `logPurchase requires a non-empty productId, got "${e}", ignoring.`,
      ),
      !1
    );
  if (!validateCustomString(e, "log purchase", "the purchase name")) return !1;
  if (null == o || isNaN(parseFloat(o.toString())))
    return (
      b$1.error(`logPurchase requires a numeric price, got ${o}, ignoring.`), !1
    );
  const s = parseFloat(o.toString()).toFixed(2);
  if (null == n || isNaN(parseInt(n.toString())))
    return (
      b$1.error(`logPurchase requires an integer quantity, got ${n}, ignoring.`),
      !1
    );
  const u = parseInt(n.toString());
  if (u < 1 || u > MAX_PURCHASE_QUANTITY)
    return (
      b$1.error(
        `logPurchase requires a quantity >1 and <${MAX_PURCHASE_QUANTITY}, got ${u}, ignoring.`,
      ),
      !1
    );
  if (((i = null != i ? i.toUpperCase() : i), !isValidIso4217CurrencyCode(i)))
    return (
      b$1.error(`logPurchase requires a valid currencyCode, got ${i}, ignoring.`),
      !1
    );
  const [a, g] = validateCustomProperties(
    t,
    "logPurchase",
    "purchaseProperties",
    `log purchase "${e}"`,
    "purchase",
  );
  if (!a) return !1;
  const c = r.l();
  if (c && c.$r(e))
    return b$1.info(`Purchase "${e}" is blocklisted, ignoring.`), !1;
  const l = v$1.Dt(p.Pr, { pid: e, c: i, p: s, q: u, pr: g });
  if (l.lt) {
    b$1.info(`Logged ${u} purchase${u > 1 ? "s" : ""} of "${e}" for ${i} ${s}.`);
    for (const r of l.Ce) TriggersProviderFactory.o().Ee(ot.qr, [e, t], r);
  }
  return l.lt;
}

var logPurchase$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	logPurchase: logPurchase
});

function openSession() {
  if (!r.rr()) return;
  const i = r.nn();
  if (!i) return;
  i.openSession();
  const t = et._s.Xs,
    o = new et(t, b$1);
  o.kr(t.Ws.yr, (r, n) => {
    const e = n.lastClick,
      s = n.trackingString;
    b$1.info(`Firing push click trigger from ${s} push click at ${e}`);
    const c = i.Fr(e, s),
      g = function () {
        TriggersProviderFactory.o().Ee(ot.Sr, [s], c);
      };
    i.Ar(g, g), o.ge(t.Ws.yr, r);
  }),
    o.Qs(t.Ws.Br, function (r) {
      i.Dr(r);
    });
}

function removeAllSubscriptions() {
  r.rr() && r.removeAllSubscriptions();
}

function requestImmediateDataFlush(e) {
  if (!r.rr()) return;
  const t = r.nn();
  t && t.requestImmediateDataFlush(e);
}

var requestImmediateDataFlush$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	requestImmediateDataFlush: requestImmediateDataFlush
});

function setLogger(e) {
  b$1.setLogger(e);
}

function setSdkAuthenticationSignature(t) {
  if (!r.rr()) return !1;
  if ("" === t || !validateStandardString(t, "set signature", "signature", !1)) return !1;
  const i = r.Er();
  return !!i && (i.setSdkAuthenticationSignature(t), !0);
}

function subscribeToSdkAuthenticationFailures(i) {
  var n;
  if (r.rr())
    return null === (n = r.Er()) || void 0 === n
      ? void 0
      : n.subscribeToSdkAuthenticationFailures(i);
}

function toggleLogging() {
  b$1.toggleLogging();
}

function wipeData() {
  const o = r.p();
  if (null == o) return void b$1.warn(CoreStrings.ee);
  o.clearData();
  const t = keys(et._s);
  for (let o = 0; o < t.length; o++) {
    const n = t[o],
      r = et._s[n];
    new et(r, b$1).clearData();
  }
  if (r.rr()) for (const o of r.vr()) o.clearData(!0);
  const n = r.m();
  n && n.fo();
}

function isPushBlocked() {
  if (r.rr()) return It$1.isPushBlocked();
}

function isPushPermissionGranted() {
  if (r.rr()) return It$1.isPushPermissionGranted();
}

function isPushSupported() {
  if (r.rr()) return It$1.isPushSupported();
}

class na {
  constructor(i, t, e, s, r, n, o, u, a, h, c) {
    (this.iu = i),
      (this.tu = t),
      (this.eu = e),
      (this.su = r),
      (this.ru = n),
      (this.nu = o),
      (this.h = u),
      (this.ou = a),
      (this.uu = h),
      (this.j = c),
      (this.iu = i),
      (this.tu = t),
      (this.eu = e),
      (this.au = s + "/safari/" + t),
      (this.su = r || "/service-worker.js"),
      (this.nu = o),
      (this.h = u),
      (this.ou = a || !1),
      (this.uu = h || !1),
      (this.j = c),
      (this.hu = It$1.cu()),
      (this.fu = It$1.lu());
  }
  du() {
    return this.uu;
  }
  pu(i, t, e, s, r) {
    i.unsubscribe()
      .then((i) => {
        i
          ? this.bu(t, e, s, r)
          : (b$1.error("Failed to unsubscribe device from push."),
            "function" == typeof r && r(!1));
      })
      .catch((i) => {
        b$1.error("Push unsubscription error: " + i),
          "function" == typeof r && r(!1);
      });
  }
  yu(i, t, e) {
    var s;
    const r = ((i) => {
      if ("string" == typeof i) return i;
      if (0 !== i.endpoint.indexOf("https://android.googleapis.com/gcm/send"))
        return i.endpoint;
      let t = i.endpoint;
      const e = i;
      return (
        e.mu &&
          -1 === i.endpoint.indexOf(e.mu) &&
          (t = i.endpoint + "/" + e.mu),
        t
      );
    })(i);
    let n = null,
      o = null;
    const u = i;
    if (null != u.getKey)
      try {
        const i = Array.from(new Uint8Array(u.getKey("p256dh"))),
          t = Array.from(new Uint8Array(u.getKey("auth")));
        (n = btoa(String.fromCharCode.apply(null, i))),
          (o = btoa(String.fromCharCode.apply(null, t)));
      } catch (i) {
        b$1.error(getErrorMessage(i));
      }
    const a = ((i) => {
      let t;
      return i.options &&
        (t = i.options.applicationServerKey) &&
        t.byteLength &&
        t.byteLength > 0
        ? btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(t))))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
        : null;
    })(u);
    null === (s = this.iu) || void 0 === s || s.gu(r, t, n, o, a),
      r && "function" == typeof e && e(r, n, o);
  }
  vu() {
    var i;
    null === (i = this.iu) || void 0 === i || i.wu(!0);
  }
  ku(i, t) {
    var e;
    null === (e = this.iu) || void 0 === e || e.wu(!1),
      b$1.info(i),
      "function" == typeof t && t(!1);
  }
  Pu(i, t, e, s) {
    var r;
    if ("default" === t.permission)
      try {
        window.safari.pushNotification.requestPermission(
          this.au,
          i,
          {
            api_key: this.tu,
            device_id:
              (null === (r = this.eu) || void 0 === r ? void 0 : r.ve().id) ||
              "",
          },
          (t) => {
            "granted" === t.permission &&
              this.iu &&
              this.iu.setPushNotificationSubscriptionType(
                User.NotificationSubscriptionTypes.OPTED_IN,
              ),
              this.Pu(i, t, e, s);
          },
        );
      } catch (i) {
        this.ku("Could not request permission for push: " + i, s);
      }
    else
      "denied" === t.permission
        ? this.ku(
            "The user has blocked notifications from this site, or Safari push is not configured in the Braze dashboard.",
            s,
          )
        : "granted" === t.permission &&
          (b$1.info("Device successfully subscribed to push."),
          this.yu(t.deviceToken, new Date(), e));
  }
  requestPermission(i, t, e) {
    const s = (s) => {
      switch (s) {
        case "granted":
          return void ("function" == typeof i && i());
        case "default":
          return void ("function" == typeof t && t());
        case "denied":
          return void ("function" == typeof e && e());
        default:
          b$1.error("Received unexpected permission result " + s);
      }
    };
    let r = !1;
    if ("default" !== window.Notification.permission)
      s(Notification.permission);
    else {
      const i = window.Notification.requestPermission((i) => {
        r && s(i);
      });
      i
        ? i.then((i) => {
            s(i);
          })
        : (r = !0);
    }
  }
  bu(i, t, e, s) {
    const r = { userVisibleOnly: !0 };
    null != t && (r.applicationServerKey = t),
      i.pushManager
        .subscribe(r)
        .then((i) => {
          b$1.info("Device successfully subscribed to push."),
            this.yu(i, new Date(), e);
        })
        .catch((i) => {
          It$1.isPushBlocked()
            ? (b$1.info("Permission for push notifications was denied."),
              "function" == typeof s && s(!1))
            : (b$1.error("Push subscription failed: " + i),
              "function" == typeof s && s(!0));
        });
  }
  Du() {
    if (this.ou) return navigator.serviceWorker.getRegistration(this.su);
    const i = this.ru ? { scope: this.ru } : void 0;
    return navigator.serviceWorker.register(this.su, i).then(() =>
      navigator.serviceWorker.ready.then(
        (i) => (
          i &&
            "function" == typeof i.update &&
            i.update().catch((i) => {
              b$1.info("ServiceWorker update failed: " + i);
            }),
          i
        ),
      ),
    );
  }
  Su(i) {
    this.ou ||
      (i.unregister(), b$1.info("Service worker successfully unregistered."));
  }
  subscribe(i, t) {
    if (!It$1.isPushSupported())
      return b$1.info(na.Au), void ("function" == typeof t && t(!1));
    if (this.hu) {
      if (!this.ou && null != window.location) {
        let i = this.su;
        -1 === i.indexOf(window.location.host) &&
          (i = window.location.host + i),
          -1 === i.indexOf(window.location.protocol) &&
            (i = window.location.protocol + "//" + i);
      }
      if (It$1.isPushBlocked())
        return void this.ku(
          "Notifications from this site are blocked. This may be a temporary embargo or a permanent denial.",
          t,
        );
      if (this.h && !this.h.ju() && 0 === this.h.Qt())
        return (
          b$1.info(
            "Waiting for VAPID key from server config before subscribing to push.",
          ),
          void this.h.xu(() => {
            this.subscribe(i, t);
          })
        );
      const e = () => {
          b$1.info("Permission for push notifications was denied."),
            "function" == typeof t && t(!1);
        },
        r = () => {
          let i = "Permission for push notifications was ignored.";
          It$1.isPushBlocked() &&
            (i +=
              " The browser has automatically blocked further permission requests for a period (probably 1 week)."),
            b$1.info(i),
            "function" == typeof t && t(!0);
        },
        n = It$1.isPushPermissionGranted(),
        o = () => {
          !n &&
            this.iu &&
            this.iu.setPushNotificationSubscriptionType(
              User.NotificationSubscriptionTypes.OPTED_IN,
            ),
            this.Du()
              .then((e) => {
                if (null == e)
                  return (
                    b$1.error(
                      "No service worker registration. Set the `manageServiceWorkerExternally` initialization option to false or ensure that your service worker is registered before calling registerPush.",
                    ),
                    void ("function" == typeof t && t(!0))
                  );
                e.pushManager
                  .getSubscription()
                  .then((r) => {
                    var n;
                    let o = null;
                    if (
                      (null !=
                        (null === (n = this.h) || void 0 === n
                          ? void 0
                          : n.ju()) && (o = ai.Nu(this.h.ju())),
                      r)
                    ) {
                      let n,
                        u = null,
                        a = null;
                      if ((this.j && (n = this.j.St(STORAGE_KEYS.It.Uu)), n && !isArray(n))) {
                        let i;
                        try {
                          i = ui._u(n).Wu;
                        } catch (t) {
                          i = null;
                        }
                        null == i ||
                          isNaN(i.getTime()) ||
                          0 === i.getTime() ||
                          ((u = i),
                          (a = new Date(u)),
                          a.setMonth(u.getMonth() + 6));
                      }
                      null != o &&
                      r.options &&
                      r.options.applicationServerKey &&
                      r.options.applicationServerKey.byteLength &&
                      r.options.applicationServerKey.byteLength > 0 &&
                      !isEqual(o, new Uint8Array(r.options.applicationServerKey))
                        ? (r.options.applicationServerKey.byteLength > 12
                            ? b$1.info(
                                "Device was already subscribed to push using a different VAPID provider, creating new subscription.",
                              )
                            : b$1.info(
                                "Attempting to upgrade a gcm_sender_id-based push registration to VAPID - depending on the browser this may or may not result in the same gcm_sender_id-based subscription.",
                              ),
                          this.pu(r, e, o, i, t))
                        : r.expirationTime &&
                          new Date(r.expirationTime).valueOf() <=
                            new Date().valueOf()
                        ? (b$1.info(
                            "Push subscription is expired, creating new subscription.",
                          ),
                          this.pu(r, e, o, i, t))
                        : n && isArray(n)
                        ? this.pu(r, e, o, i, t)
                        : null == a
                        ? (b$1.info(
                            "No push subscription creation date found, creating new subscription.",
                          ),
                          this.pu(r, e, o, i, t))
                        : a.valueOf() <= new Date().valueOf()
                        ? (b$1.info(
                            "Push subscription older than 6 months, creating new subscription.",
                          ),
                          this.pu(r, e, o, i, t))
                        : (b$1.info(
                            "Device already subscribed to push, sending existing subscription to backend.",
                          ),
                          this.yu(r, u, i));
                    } else this.bu(e, o, i, t);
                  })
                  .catch((i) => {
                    b$1.error("Error checking current push subscriptions: " + i);
                  });
              })
              .catch((i) => {
                b$1.error("ServiceWorker registration failed: " + i);
              });
        };
      this.requestPermission(o, r, e);
    } else if (this.fu) {
      if (null == this.nu || "" === this.nu)
        return (
          b$1.error(
            "You must supply the safariWebsitePushId initialization option in order to use registerPush on Safari",
          ),
          void ("function" == typeof t && t(!0))
        );
      const e = window.safari.pushNotification.permission(this.nu);
      this.Pu(this.nu, e, i, t);
    }
  }
  unsubscribe(i, t) {
    if (!It$1.isPushSupported())
      return b$1.info(na.Au), void ("function" == typeof t && t());
    this.hu
      ? navigator.serviceWorker.getRegistration(this.su).then((e) => {
          e
            ? e.pushManager
                .getSubscription()
                .then((s) => {
                  s
                    ? (this.vu(),
                      s
                        .unsubscribe()
                        .then((s) => {
                          s
                            ? (b$1.info(
                                "Device successfully unsubscribed from push.",
                              ),
                              "function" == typeof i && i())
                            : (b$1.error(
                                "Failed to unsubscribe device from push.",
                              ),
                              "function" == typeof t && t()),
                            this.Su(e);
                        })
                        .catch((i) => {
                          b$1.error("Push unsubscription error: " + i),
                            "function" == typeof t && t();
                        }))
                    : (b$1.info("Device already unsubscribed from push."),
                      "function" == typeof i && i());
                })
                .catch((i) => {
                  b$1.error("Error unsubscribing from push: " + i),
                    "function" == typeof t && t();
                })
            : (b$1.info("Device already unsubscribed from push."),
              "function" == typeof i && i());
        })
      : this.fu &&
        (this.vu(),
        b$1.info("Device unsubscribed from push."),
        "function" == typeof i && i());
  }
}
na.Au = "Push notifications are not supported in this browser.";

const ra = {
  i: !1,
  na: null,
  ra: () => (
    ra.t(),
    ra.na ||
      (ra.na = new na(
        r.zr(),
        r.za(),
        r.ue(),
        r.ht(),
        r.er(U.xa),
        r.er(U.ya),
        r.er(U.Ma),
        r.l(),
        r.er(U._a),
        r.er(U.ka),
        r.p(),
      )),
    ra.na
  ),
  t: () => {
    ra.i || (r.g(ra), (ra.i = !0));
  },
  destroy: () => {
    (ra.na = null), (ra.i = !1);
  },
};
var ra$1 = ra;

var pushManagerFactory = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': ra$1
});

function requestPushPermission(n, o) {
  if (r.rr())
    return ra$1.ra().subscribe((o, t, e) => {
      const s = r.nn();
      s && s.requestImmediateDataFlush(), "function" == typeof n && n(o, t, e);
    }, o);
}

var requestPushPermission$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	requestPushPermission: requestPushPermission
});

function unregisterPush(e, n) {
  if (r.rr()) return ra$1.ra().unsubscribe(e, n);
}

var unregisterPush$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	unregisterPush: unregisterPush
});

class PropertiesBase {
  constructor(t) {
    (this.properties = t), (this.properties = t || {});
  }
  tp(t, r, e) {
    const o = this.properties[t];
    return null == o ? (this.rp(t), null) : r(o) ? o.value : (this.ep(e), null);
  }
  getStringProperty(t) {
    return this.tp(t, this.op, "string");
  }
  getNumberProperty(t) {
    return this.tp(t, this.sp, "number");
  }
  getBooleanProperty(t) {
    return this.tp(t, this.ip, "boolean");
  }
  getImageProperty(t) {
    return this.tp(t, this.np, "image");
  }
  getJsonProperty(t) {
    return this.tp(t, this.pp, "jsonobject");
  }
  getTimestampProperty(t) {
    return this.tp(t, this.up, "datetime");
  }
  ep(t) {
    b$1.info(`Property is not of type ${t}.`);
  }
  rp(t) {
    b$1.info(`${t} not found in properties.`);
  }
  op(t) {
    return "string" === t.type && "string" == typeof t.value;
  }
  sp(t) {
    return "number" === t.type && "number" == typeof t.value;
  }
  ip(t) {
    return "boolean" === t.type && "boolean" == typeof t.value;
  }
  np(t) {
    return "image" === t.type && "string" == typeof t.value;
  }
  pp(t) {
    return (
      "jsonobject" === t.type &&
      "object" == typeof t.value &&
      t.value.constructor == Object
    );
  }
  up(t) {
    return "datetime" === t.type && "number" == typeof t.value;
  }
}

class FeatureFlag extends PropertiesBase {
  constructor(s, t = !1, i = {}, e) {
    super(i),
      (this.id = s),
      (this.enabled = t),
      (this.trackingString = e),
      (this.id = s),
      (this.enabled = t),
      (this.trackingString = e);
  }
  qt() {
    const s = {};
    return (
      (s[FeatureFlag.bs.qs] = this.id),
      (s[FeatureFlag.bs.Nr] = this.enabled),
      (s[FeatureFlag.bs.Or] = this.properties),
      (s[FeatureFlag.bs.Qr] = this.trackingString),
      s
    );
  }
}
(FeatureFlag.bs = { qs: "id", Nr: "e", Or: "pr", Qr: "fts" }),
  (FeatureFlag.ei = { qs: "id", Nr: "enabled", Or: "properties", Qr: "fts" });

function newFeatureFlagFromJson(e) {
  if (e[FeatureFlag.ei.qs] && "boolean" == typeof e[FeatureFlag.ei.Nr])
    return new FeatureFlag(
      e[FeatureFlag.ei.qs],
      e[FeatureFlag.ei.Nr],
      e[FeatureFlag.ei.Or],
      e[FeatureFlag.ei.Qr],
    );
  b$1.info(`Unable to create feature flag from ${JSON.stringify(e, null, 2)}`);
}
function newFeatureFlagFromSerializedValue(e) {
  if (e[FeatureFlag.bs.qs] && "boolean" == typeof e[FeatureFlag.bs.Nr])
    return new FeatureFlag(
      e[FeatureFlag.bs.qs],
      e[FeatureFlag.bs.Nr],
      e[FeatureFlag.bs.Or],
      e[FeatureFlag.bs.Qr],
    );
  b$1.info(
    `Unable to deserialize feature flag from ${JSON.stringify(e, null, 2)}`,
  );
}

class ar extends t {
  constructor(t, s, i, e) {
    super(),
      (this.h = t),
      (this.B = s),
      (this.j = i),
      (this.C = e),
      (this.Xr = []),
      (this.Yr = 0),
      (this.h = t),
      (this.B = s),
      (this.j = i),
      (this.C = e),
      (this.Zr = null),
      (this.ho = new f()),
      (this.D = 10),
      (this.N = null),
      (this.F = null),
      r.S(this.ho);
  }
  q(t) {
    var s;
    if (
      (null === (s = this.h) || void 0 === s ? void 0 : s.lo()) &&
      null != t &&
      t.feature_flags
    ) {
      this.Xr = [];
      for (const s of t.feature_flags) {
        const t = newFeatureFlagFromJson(s);
        t && this.Xr.push(t);
      }
      (this.Yr = new Date().getTime()), this.do(), this.ho.A(this.Xr);
    }
  }
  vo() {
    let t = {};
    this.j && (t = this.j.St(STORAGE_KEYS.It.Fo));
    const i = {};
    for (const s in t) {
      const e = newFeatureFlagFromSerializedValue(t[s]);
      e && (i[e.id] = e);
    }
    return i;
  }
  po() {
    var t;
    return (
      (null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.jo)) || {}
    );
  }
  wo(t) {
    this.j && this.j.Pt(STORAGE_KEYS.It.jo, t);
  }
  Kt(t) {
    return this.ho.Ut(t);
  }
  refreshFeatureFlags(t, s, i = !1, e = !0) {
    const r = () => {
      "function" == typeof s && s(), this.ho.A(this.Xr);
    };
    if (!this.yo(i))
      return (
        !this.Zr &&
          this.h &&
          (this.Zr = this.h.bo(() => {
            this.refreshFeatureFlags(t, s);
          })),
        void r()
      );
    const o = this.B;
    if (!o) return void r();
    e && this.Y();
    const n = o.Z({}, !0),
      u = o.tt(n, h.it.Co);
    let f = !1;
    o.et(
      n,
      (e = -1) => {
        const o = this.B;
        if (!o) return void r();
        const v = new Date().valueOf();
        h.nt(this.j, h.it.Co, v),
          -1 !== e && u.push(["X-Braze-Req-Tokens-Remaining", e.toString()]),
          l.ot({
            url: `${o.ht()}/feature_flags/sync`,
            headers: u,
            data: n,
            lt: (s) => {
              if (!o.ut(n, s, u)) return (f = !0), void r();
              o.ct(), this.q(s), (f = !1), "function" == typeof t && t();
            },
            error: (t) => {
              o.dt(t, "retrieving feature flags"), (f = !0), r();
            },
            ft: (e, r) => {
              var n, l, u;
              let v;
              if (f) {
                const t =
                    (null === (n = this.h) || void 0 === n ? void 0 : n.vt()) ||
                    REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT,
                  s =
                    (null === (l = this.h) || void 0 === l ? void 0 : l.gt()) ||
                    REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT,
                  i =
                    (null === (u = this.h) || void 0 === u ? void 0 : u.bt()) ||
                    REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT;
                let e = this.N;
                (null == e || e < t) && (e = t), (v = Math.min(i, randomInclusive(t, e * s)));
              }
              o.yt(
                r,
                () => {
                  this.refreshFeatureFlags(t, s, i, !0);
                },
                h.it.Co,
                (t) => this.Bt(t),
                () => this.Y(),
                v,
              );
            },
          });
      },
      h.it.Co,
      s,
    );
  }
  Y() {
    null != this.F && (clearTimeout(this.F), (this.F = null));
  }
  Bt(t) {
    this.Y(), (this.F = t);
  }
  yo(t) {
    if (!this.h) return !1;
    if (!t) {
      const t = this.h.Ro();
      if (null == t) return !1;
      let s = !1;
      if (!isNaN(t)) {
        if (-1 === t) return b$1.info("Feature flag refreshes not allowed"), !1;
        s = new Date().getTime() >= (this.Yr || 0) + 1e3 * t;
      }
      if (!s)
        return (
          b$1.info(`Feature flag refreshes were rate limited to ${t} seconds`), !1
        );
    }
    return this.h.lo();
  }
  To() {
    var t;
    return (
      (null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.Do)) || null
    );
  }
  Io() {
    var t, i;
    null === (t = this.j) ||
      void 0 === t ||
      t.Pt(STORAGE_KEYS.It.Do, null === (i = this.C) || void 0 === i ? void 0 : i.$t());
  }
  So() {
    var t;
    const s = null === (t = this.C) || void 0 === t ? void 0 : t.$t(),
      i = this.To();
    return null == i || s === i;
  }
  do() {
    if (!this.j) return;
    const t = {};
    for (const s of this.Xr) {
      const i = s.qt();
      t[s.id] = i;
    }
    this.j.Pt(STORAGE_KEYS.It.Fo, t), this.j.Pt(STORAGE_KEYS.It.qo, this.Yr), this.Io();
  }
  changeUser() {
    this.Y();
  }
  clearData() {
    this.Y();
  }
}

const lr = {
  i: !1,
  provider: null,
  o: () => (
    lr.t(),
    lr.provider ||
      ((lr.provider = new ar(r.l(), r.m(), r.p(), r.u())), r.v(lr.provider)),
    lr.provider
  ),
  t: () => {
    lr.i || (r.g(lr), (lr.i = !0));
  },
  destroy: () => {
    (lr.provider = null), (lr.i = !1);
  },
};
var lr$1 = lr;

function fr(e, t, a = !1) {
  if (r.rr()) return lr$1.o().refreshFeatureFlags(e, t, a);
}
function refreshFeatureFlags(r, e) {
  fr(r, e);
}

var refreshFeatureFlags$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	refreshFeatureFlags: refreshFeatureFlags,
	'default': fr
});

function getFeatureFlag(t) {
  if (!r.rr()) return;
  const e = r.l();
  if (e && !e.lo()) return null;
  const n = lr$1.o().vo();
  return n[t] ? n[t] : null;
}

function getAllFeatureFlags() {
  if (!r.rr()) return;
  const t = [],
    e = r.l();
  if (e && !e.lo()) return t;
  const n = lr$1.o().vo();
  for (const r in n) t.push(n[r]);
  return t;
}

function subscribeToFeatureFlagsUpdates(t) {
  if (!r.rr()) return;
  const e = lr$1.o();
  if (e.So()) {
    const r = getAllFeatureFlags();
    r && "function" == typeof t && t(r);
  }
  return e.Kt(t);
}

function logFeatureFlagImpression(e) {
  if (!r.rr()) return;
  if (!e) return !1;
  const t =
      "Not logging a feature flag impression. The feature flag was not part of any matching experiment.",
    o = lr$1.o().vo();
  if (!o[e]) return b$1.info(t), !1;
  const n = o[e].trackingString;
  if (!n) return b$1.info(t), !1;
  const i = lr$1.o().po();
  if (i[n])
    return (
      b$1.info(
        "Not logging another feature flag impression. This ID was already logged this session.",
      ),
      !1
    );
  (i[n] = !0), lr$1.o().wo(i);
  const s = { fid: e, fts: n };
  return v$1.Dt(p.xo, s).lt;
}

class Banner extends PropertiesBase {
  constructor(s, i, t, h = !1, r = !1, e = -1, n = {}, o = null) {
    super(n),
      (this.id = s),
      (this.placementId = i),
      (this.html = t),
      (this.ss = h),
      (this.isControl = r),
      (this.ts = e),
      (this.G = o),
      (this.id = s),
      (this.placementId = i),
      (this.html = t),
      (this.ss = h),
      (this.isControl = r),
      (this.ts = e),
      (this.hs = !1),
      (this.rs = !1),
      (this.es = null);
  }
  subscribeToDismissedEvent(s) {
    return this.ns().Ut(s);
  }
  removeSubscription(s) {
    null != this.es && this.es.removeSubscription(s);
  }
  removeAllSubscriptions() {
    null != this.es && this.es.removeAllSubscriptions();
  }
  os() {
    return this.isControl;
  }
  ns() {
    return null == this.es && (this.es = new f()), this.es;
  }
  Ft() {
    return (
      !this.rs &&
      ((this.rs = !0), this.ns().A(), this.removeAllSubscriptions(), !0)
    );
  }
  qt() {
    return {
      id: this.id,
      pid: this.placementId,
      html: this.html,
      its: this.ss,
      ic: this.isControl,
      eat: this.ts,
      pr: this.properties,
      sk: this.G,
    };
  }
}

function newBannerFromSerializedValue(n) {
  return new Banner(
    n.id,
    n.pid,
    n.html,
    n.its,
    n.ic,
    n.eat,
    n.pr,
    n.sk || null,
  );
}
function newBannerFromJson(n) {
  return new Banner(
    n.id,
    n.placement_id,
    n.html,
    n.is_test_send,
    n.is_control,
    n.expires_at,
    n.properties,
    n.stable_key || null,
  );
}

class e extends t {
  constructor(t, s, i, e) {
    super(),
      (this.h = t),
      (this.B = s),
      (this.j = i),
      (this.C = e),
      (this.banners = {}),
      (this.h = t),
      (this.B = s),
      (this.j = i),
      (this.C = e),
      (this.D = 10),
      (this.N = null),
      (this.F = null),
      (this.R = new f()),
      r.S(this.R),
      (this.T = null),
      (this.I = null);
  }
  q(t) {
    if (this.P() && (this._(t), null != t && t.banners)) {
      const s = t.request_time,
        i = "number" != typeof s || isNaN(s) ? null : s,
        e = this.k(),
        r = this.$(),
        o = this.L();
      this.banners = {};
      const h = t.banners;
      for (const t in h) {
        const s = this.K(t, i, o),
          l = h[t];
        let a = null;
        if (
          (null != l && null != l.banner && (a = l.banner),
          this.U(t, a, i, s, e, r))
        ) {
          if (s) {
            const s = e[t];
            s && (this.banners[t] = s);
          }
          continue;
        }
        let u = null;
        null != a && (u = newBannerFromJson(a)), u && (this.banners[t] = u);
      }
      this.W(), this.R.A(this.banners);
    }
  }
  U(t, s, i, e, n, r) {
    return !this.M(t, s, n) && null != i && (!!e || this.X(s, r, i));
  }
  K(t, s, i) {
    if (null == s) return !1;
    const e = i[t];
    return "number" == typeof e && !isNaN(e) && s < e;
  }
  M(t, s, i) {
    if (!s) return !1;
    const e = s.stable_key;
    if ("string" != typeof e || 0 === e.length) return !1;
    const n = i[t],
      r = null == n ? void 0 : n.G;
    return "string" == typeof r && 0 !== r.length && r !== e;
  }
  X(t, s, i) {
    if (!t) return !1;
    const e = t.stable_key;
    if ("string" != typeof e || 0 === e.length) return !1;
    for (const t of s) {
      if (t.stable_key !== e) continue;
      const s = t.dismissal_time;
      if ("number" == typeof s && !isNaN(s) && s >= i) return !0;
    }
    return !1;
  }
  _(t) {
    var s;
    const i =
      null === (s = null == t ? void 0 : t.dismissals) || void 0 === s
        ? void 0
        : s.acknowledged;
    if (!i || !isArray(i) || 0 === i.length) return;
    const e = this.$();
    if (0 === e.length) return;
    const n = {};
    for (const t of i)
      t.banner_id &&
        t.dismissal_time &&
        (n[this.H(t.banner_id, t.dismissal_time)] = !0);
    const r = e.filter((t) => !n[this.H(t.banner_id, t.dismissal_time)]);
    r.length !== e.length && this.J(r);
  }
  H(t, s) {
    return `${t}:${s}`;
  }
  O(t, s, i, e = !0) {
    var n;
    const r = () => {
      "function" == typeof i && i();
    };
    if (!this.P())
      return void (
        null === (n = this.h) ||
        void 0 === n ||
        n.V(() => {
          this.O(t, s, i);
        })
      );
    const o = this.B;
    if (!o) return void r();
    e && this.Y();
    const u = o.Z({}, !0);
    u.time_ms = new Date().valueOf();
    const f = [];
    for (const s of t) f.push({ id: s });
    u.placements = f;
    const v = this.$().map((t) => ({
      banner_id: t.banner_id,
      dismissal_time: t.dismissal_time,
    }));
    u.pending_dismissals = v;
    const p = o.tt(u, h.it.st);
    let g = !1;
    o.et(
      u,
      (e = -1) => {
        const n = this.B;
        if (!n) return void r();
        const o = new Date().valueOf();
        h.nt(this.j, h.it.st, o),
          -1 !== e && p.push(["X-Braze-Req-Tokens-Remaining", e.toString()]);
        const f = u.time_ms;
        null == f || "number" != typeof f || isNaN(f) || this.rt(t, f),
          l.ot({
            url: `${n.ht()}/banners/sync`,
            headers: p,
            data: u,
            lt: (t) => {
              if (!n.ut(u, t, p)) return (g = !0), void r();
              n.ct(), this.q(t), (g = !1), "function" == typeof s && s();
            },
            error: (t) => {
              n.dt(t, "retrieving banners"), (g = !0), r();
            },
            ft: (e, r) => {
              var o, l, u;
              let f;
              if (((this.I = t), g)) {
                const t =
                    (null === (o = this.h) || void 0 === o ? void 0 : o.vt()) ||
                    REQUEST_BACKOFF_MIN_SLEEP_MS_DEFAULT,
                  s =
                    (null === (l = this.h) || void 0 === l ? void 0 : l.gt()) ||
                    REQUEST_BACKOFF_SCALE_FACTOR_DEFAULT,
                  i =
                    (null === (u = this.h) || void 0 === u ? void 0 : u.bt()) ||
                    REQUEST_BACKOFF_MAX_SLEEP_MS_DEFAULT;
                let e = this.N;
                (null == e || e < t) && (e = t), (f = Math.min(i, randomInclusive(t, e * s)));
              }
              n.yt(
                r,
                () => {
                  this.O(t, s, i, !1);
                },
                h.it.st,
                (t) => this.Bt(t),
                () => this.Y(),
                f,
              );
            },
          });
      },
      h.it.st,
      i,
    );
  }
  jt() {
    return this.I;
  }
  Ct(t, s) {
    const i = { id: t.id };
    s && (i.bid = s);
    return v$1.Dt(p.Nt, i).lt;
  }
  wt(t) {
    if (!t.G) return !1;
    const s = this.$();
    if (s.some((s) => s.banner_id === t.id && s.stable_key === t.G))
      return (
        b$1.info(
          `Not dismissing banner ID ${t.id}. The banner has already been dismissed.`,
        ),
        !1
      );
    const i = { id: t.id },
      e = this.k(),
      n = e[t.placementId];
    n &&
      n.G === t.G &&
      (delete e[t.placementId],
      (this.banners = e),
      this.W(),
      this.R.A(this.banners)),
      s.push({
        banner_id: t.id,
        dismissal_time: new Date().valueOf(),
        stable_key: t.G,
      }),
      this.J(s),
      t.Ft();
    return v$1.Dt(p.Rt, i).lt;
  }
  Y() {
    null != this.F && (clearTimeout(this.F), (this.F = null));
  }
  Bt(t) {
    this.Y(), (this.F = t);
  }
  k() {
    let t = {};
    this.j && (t = this.j.St(STORAGE_KEYS.It.Tt));
    const i = {};
    for (const s in t) {
      let e = null;
      null != t[s] && (e = newBannerFromSerializedValue(t[s])), e && (i[e.placementId] = e);
    }
    return i;
  }
  W() {
    var t;
    if (!this.j) return;
    const i = {};
    for (const s in this.banners) {
      const e =
        (null === (t = this.banners[s]) || void 0 === t ? void 0 : t.qt()) ||
        null;
      i[s] = e;
    }
    this.j.Pt(STORAGE_KEYS.It.Tt, i), this._t();
  }
  _t() {
    var t, i;
    null === (t = this.j) ||
      void 0 === t ||
      t.Pt(STORAGE_KEYS.It.kt, null === (i = this.C) || void 0 === i ? void 0 : i.$t());
  }
  xt() {
    var t;
    return (
      (null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.kt)) || null
    );
  }
  Et() {
    return this.T;
  }
  Lt(t) {
    this.T = t;
  }
  zt() {
    var t;
    const s = null === (t = this.C) || void 0 === t ? void 0 : t.$t(),
      i = this.xt();
    return null == i || s === i;
  }
  Kt(t) {
    return this.R.Ut(t);
  }
  Wt() {
    var t;
    return (
      (null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.At)) || {}
    );
  }
  Mt(t) {
    this.j && this.j.Pt(STORAGE_KEYS.It.At, t);
  }
  $() {
    var t;
    return (
      (null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.Xt)) || []
    );
  }
  J(t) {
    var i;
    if (!this.j) return;
    const e = null === (i = this.h) || void 0 === i ? void 0 : i.Gt(),
      n = null != e ? e : DISMISSALS_CACHE_SIZE_DEFAULT,
      r = t.length <= n ? t : t.slice(-n);
    this.j.Pt(STORAGE_KEYS.It.Xt, r);
  }
  L() {
    var t;
    return (
      (null === (t = this.j) || void 0 === t ? void 0 : t.St(STORAGE_KEYS.It.Ht)) || {}
    );
  }
  rt(t, i) {
    if (!this.j) return;
    const e = this.L();
    for (const s of t) e[s] = i;
    this.j.Pt(STORAGE_KEYS.It.Ht, e);
  }
  changeUser() {
    this.Jt(), this.Y();
  }
  clearData() {
    this.Y();
  }
  P() {
    return !!this.h && (!!this.h.Ot() || (0 !== this.h.Qt() && this.Jt(), !1));
  }
  Jt() {
    (this.banners = {}),
      this.j &&
        (this.j.Vt(STORAGE_KEYS.It.Tt),
        this.j.Vt(STORAGE_KEYS.It.At),
        this.j.Vt(STORAGE_KEYS.It.Xt),
        this.j.Vt(STORAGE_KEYS.It.Ht)),
      this.R.A({});
  }
}

const i = {
  i: !1,
  provider: null,
  o: () => (
    i.t(),
    i.provider ||
      ((i.provider = new e(r.l(), r.m(), r.p(), r.u())), r.v(i.provider)),
    i.provider
  ),
  t: () => {
    i.i || (r.g(i), (i.i = !0));
  },
  destroy: () => {
    (i.provider = null), (i.i = !1);
  },
};

function getBannerIfNotExpired(n, r) {
  const e = n[r];
  if (!e) return null;
  const t = e.ts,
    o = new Date().valueOf();
  return -1 !== t && 1e3 * t < o
    ? (b$1.info(`Banner with ID: ${e.id} and placement ID: ${r} has expired.`),
      null)
    : e;
}
function getBanner(n) {
  var e;
  if (!r.rr()) return;
  !1 === (null === (e = r.l()) || void 0 === e ? void 0 : e.Ot()) &&
    b$1.error(BannerStrings.aa);
  const t = i.o();
  if (!t.P()) return null;
  return getBannerIfNotExpired(t.k(), n);
}

function logBannerClick(n, o) {
  if (!r.rr()) return;
  if (!(n instanceof Banner))
    return (
      b$1.error("Banner argument to logBannerClick must be an Banner object."), !1
    );
  const e = i.o(),
    t = e.k();
  return 0 === keys(t).length
    ? (b$1.info("Not logging banner click. No banners exist."), !1)
    : t[n.placementId]
    ? e.Ct(n, o)
    : (b$1.info(
        `Not logging banner click for ID ${n.placementId}. The placement ID did not correspond to any banner.`,
      ),
      !1);
}

function logBannerDismissal(n) {
  if (!r.rr()) return;
  if (!(n instanceof Banner))
    return (
      b$1.error("Banner argument to logBannerDismissal must be a Banner object."),
      !1
    );
  const o = i.o(),
    e = o.k();
  return 0 === keys(e).length
    ? (b$1.info("Not logging banner dismissal. No banners exist."), !1)
    : e[n.placementId]
    ? o.wt(n)
    : (b$1.info(
        `Not logging banner dismissal for ID ${n.placementId}. The placement ID did not correspond to any banner.`,
      ),
      !1);
}

function destroyBannerHtml(o) {
  const r = o.getAttribute(BannerStrings.ea);
  null != r && removeSubscription(r),
    o && o.parentNode && o.parentNode.removeChild(o);
}

const BANNER_PLACEMENT_ID = "data-ab-banner-placement-id";
const BANNER_HTML_CLASS = "ab-html-banner";
const CONTROL_BANNER_HTML_CLASS = "ab-html-control-banner";
function controlBannerToHtml(n) {
  const t = document.createElement("div");
  return (
    (t.id = n.id),
    (t.className = "ab-html-control-banner"),
    t.setAttribute(BANNER_PLACEMENT_ID, n.placementId),
    t
  );
}
function bannerToHtml(n, t) {
  if (n.os()) return controlBannerToHtml(n);
  const o = document.createElement("iframe");
  return (
    (o.id = n.id),
    t && o.setAttribute("nonce", t),
    (o.className = "ab-html-banner"),
    o.setAttribute(BANNER_PLACEMENT_ID, n.placementId),
    o.setAttribute("title", "Banner"),
    attachHtmlToIframeWithNonce(o, n.html, t),
    (o.onload = () => {
      const t = o.contentWindow,
        e = t.document.getElementsByTagName("title");
      e && e.length > 0 && o.setAttribute("title", e[0].textContent || "");
      const r = Object.assign(Object.assign({}, buildBrazeBridge(o)), {
        logClick: function () {
          logBannerClick(n, ...arguments);
        },
        closeMessage: function () {
          !(function (n) {
            const t = document.getElementById(n.id);
            t && destroyBannerHtml(t), logBannerDismissal(n);
          })(n);
        },
        setBannerHeight: (n) => {
          isNaN(n) || !isFinite(n) || n < 0
            ? b$1.warn(`Invalid banner height: ${n}`)
            : (o.style.height = `${n}px`);
        },
      });
      (t.brazeBridge = r),
        (t.appboyBridge = r),
        t.dispatchEvent(new CustomEvent("ab.BridgeReady"));
    }),
    o
  );
}

function logBannerImpressions(o) {
  if (!r.rr()) return;
  if (!o || o.length <= 0) return !1;
  const n = i.o(),
    s = n.k();
  if (0 === keys(s).length)
    return b$1.info("Not logging banners impression. No banners exist."), !1;
  let e = n.Wt(),
    t = !1;
  if (Object.keys(e).some((o) => void 0 !== s[o])) {
    const o = {};
    for (const n of Object.keys(e)) {
      const r = s[n];
      r && e[n] && (o[r.id] = !0);
    }
    (e = o), (t = !0);
  }
  const a = [];
  for (const n of o) {
    const o = s[n];
    o
      ? e[o.id]
        ? b$1.info(
            `Not logging banners impression for ID ${n}. This ID was already logged this session.`,
          )
        : ((e[o.id] = !0), a.push(o.id))
      : b$1.info(
          `Not logging banners impression for ID ${n}. The placement ID did not correspond to any banner.`,
        );
  }
  if (0 === a.length) return t && n.Mt(e), !1;
  n.Mt(e);
  const f = { ids: a };
  return v$1.Dt(p.ro, f).lt;
}

function detectBannerImpressions() {
  const o = document.querySelectorAll(`.${BANNER_HTML_CLASS}, .${CONTROL_BANNER_HTML_CLASS}`),
    t = [];
  for (let n = 0; n < o.length; n++) {
    const s = o[n],
      i = s.getAttribute(BANNER_PLACEMENT_ID);
    if (!i) continue;
    const m = detectImpression.oo(s),
      r = detectImpression.no(s);
    if (m && r) continue;
    const e = topIsInView(s),
      c = bottomIsInView(s);
    e && !m && impressOnTop(s), c && !r && impressOnBottom(s), detectImpression.oo(s) && detectImpression.no(s) && t.push(i);
  }
  t.length > 0 && logBannerImpressions(t);
}

function getAllBanners() {
  if (!r.rr()) return;
  const n = {},
    o = r.l();
  if (
    (!1 === (null == o ? void 0 : o.Ot()) && b$1.error(BannerStrings.aa),
    !(null == o ? void 0 : o.Ot()))
  )
    return n;
  const t = i.o().k();
  for (const r in t) n[r] = getBannerIfNotExpired(t, r);
  return n;
}

function subscribeToBannersUpdates(n) {
  var o;
  if (!r.rr()) return;
  const t = i.o();
  if (t.zt()) {
    const r = getAllBanners();
    r && "function" == typeof n && n(r);
  }
  const s = t.Kt(n);
  if (!t.Et()) {
    const n =
      null === (o = r.nn()) || void 0 === o
        ? void 0
        : o.rn(() => {
            const n = t.jt();
            n && n.length > 0 && t.O(n);
          });
    n && t.Lt(n);
  }
  return s;
}

function insertBanner(e, n) {
  if (!r.rr()) return;
  if (!e) return void b$1.error("Not inserting banner: banner was not provided.");
  if (!n)
    return void b$1.error("Not inserting banner: parentNode was not provided.");
  if (!r.er(U.nr))
    return void b$1.error(
      "Banners are disabled. Use the 'allowUserSuppliedJavascript' option for braze.initialize to enable these messages.",
    );
  setupBannerUI();
  const o = bannerToHtml(e, r.er(U.sr)),
    s = subscribeToBannersUpdates((s) => {
      const i = s[e.placementId];
      i ? n.replaceChildren(bannerToHtml(i, r.er(U.sr))) : destroyBannerHtml(o);
    });
  s && o.setAttribute(BannerStrings.ea, s),
    n.replaceChildren(o),
    addPassiveEventListener(window, "scroll", detectBannerImpressions),
    detectBannerImpressions();
}

function requestBannersRefresh(e, t, o) {
  if (!r.rr()) return void b$1.warn(CoreStrings.ee);
  const n = r.l();
  if (!n) return;
  if (!isArray(e) || 0 === e.length)
    return void b$1.warn("placementIds should be a non-empty array.");
  const s = i.o();
  if ((!1 === n.Ot() && b$1.error(BannerStrings.aa), !s.P()))
    return void n.V(() => {
      requestBannersRefresh(e, t, o);
    });
  const a = n.re();
  e.length > a &&
    (b$1.warn(
      `Number of placement IDs requested exceeds the max allowed. Trimming placementIds array from length ${e.length} to ${a} (max allowed).`,
    ),
    (e = e.slice(0, a))),
    0 !==
      (e = e.filter(
        (e) =>
          !!isValidBannerPlacementId(e) ||
          (b$1.warn(
            `Placement ID should be a valid utf8 string with no whitespaces, filtering out: ${e}`,
          ),
          !1),
      )).length &&
      (b$1.info(`Requesting banners for placement IDs: ${JSON.stringify(e)}`),
      s.O(e, t, o));
}

function dismissBanner(n) {
  return logBannerDismissal(n);
}

var src = /*#__PURE__*/Object.freeze({
	__proto__: null,
	WindowUtils: WindowUtils,
	logCardDismissal: logCardDismissal,
	logContentCardImpressions: logContentCardImpressions,
	logContentCardClick: logContentCardClick,
	Card: Card,
	ImageOnly: ImageOnly,
	CaptionedImage: CaptionedImage,
	ClassicCard: ClassicCard,
	ControlCard: ControlCard,
	ContentCards: ContentCards,
	getCachedContentCards: getCachedContentCards,
	hideContentCards: hideContentCards,
	requestContentCardsRefresh: requestContentCardsRefresh,
	showContentCards: showContentCards,
	subscribeToContentCardsUpdates: subscribeToContentCardsUpdates,
	toggleContentCards: toggleContentCards,
	addSdkMetadata: addSdkMetadata,
	changeUser: changeUser,
	destroy: destroy,
	BrazeSdkMetadata: BrazeSdkMetadata,
	DeviceProperties: DeviceProperties,
	disableSDK: disableSDK,
	enableSDK: enableSDK,
	getDeviceId: getDeviceId,
	getUser: getUser,
	initialize: initialize,
	isDisabled: isDisabled,
	isInitialized: isInitialized,
	logCustomEvent: logCustomEvent,
	logEcommerceEvent: logEcommerceEvent,
	logPurchase: logPurchase,
	openSession: openSession,
	removeAllSubscriptions: removeAllSubscriptions,
	removeSubscription: removeSubscription,
	requestImmediateDataFlush: requestImmediateDataFlush,
	setLogger: setLogger,
	setSdkAuthenticationSignature: setSdkAuthenticationSignature,
	subscribeToSdkAuthenticationFailures: subscribeToSdkAuthenticationFailures,
	toggleLogging: toggleLogging,
	wipeData: wipeData,
	handleBrazeAction: handleBrazeAction,
	InAppMessage: InAppMessage,
	InAppMessageButton: InAppMessageButton,
	ControlMessage: ControlMessage,
	FullScreenMessage: FullScreenMessage,
	HtmlMessage: HtmlMessage,
	ModalMessage: ModalMessage,
	SlideUpMessage: SlideUpMessage,
	automaticallyShowInAppMessages: automaticallyShowInAppMessages,
	logInAppMessageButtonClick: logInAppMessageButtonClick,
	logInAppMessageClick: logInAppMessageClick,
	logInAppMessageHtmlClick: logInAppMessageHtmlClick,
	logInAppMessageImpression: logInAppMessageImpression,
	showInAppMessage: showInAppMessage,
	subscribeToInAppMessage: subscribeToInAppMessage,
	deferInAppMessage: deferInAppMessage,
	getDeferredInAppMessage: getDeferredInAppMessage,
	isPushBlocked: isPushBlocked,
	isPushPermissionGranted: isPushPermissionGranted,
	isPushSupported: isPushSupported,
	requestPushPermission: requestPushPermission,
	unregisterPush: unregisterPush,
	User: User,
	FeatureFlag: FeatureFlag,
	refreshFeatureFlags: refreshFeatureFlags,
	getFeatureFlag: getFeatureFlag,
	subscribeToFeatureFlagsUpdates: subscribeToFeatureFlagsUpdates,
	getAllFeatureFlags: getAllFeatureFlags,
	logFeatureFlagImpression: logFeatureFlagImpression,
	Banner: Banner,
	getBanner: getBanner,
	insertBanner: insertBanner,
	requestBannersRefresh: requestBannersRefresh,
	getAllBanners: getAllBanners,
	subscribeToBannersUpdates: subscribeToBannersUpdates,
	logBannerImpressions: logBannerImpressions,
	logBannerClick: logBannerClick,
	dismissBanner: dismissBanner
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(src);

window.braze = require$$0;
//  Copyright 2015 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

// This should remain Appboy and not Braze until the core SDK is able to parse the moduleID and not the name (go.mparticle.com/work/SQDSDKS-4655)
var name = 'Appboy',
    suffix = 'v6',
    moduleId = 28,
    version = '6.0.0',
    MessageType = {
        PageView: 3,
        PageEvent: 4,
        Commerce: 16,
    },
    CommerceEventType = mParticle.CommerceEventType;

var clusterMapping = {
    '01': 'sdk.iad-01.braze.com',
    '02': 'sdk.iad-02.braze.com',
    '03': 'sdk.iad-03.braze.com',
    '04': 'sdk.iad-04.braze.com',
    '05': 'sdk.iad-05.braze.com',
    '06': 'sdk.iad-06.braze.com',
    '07': 'sdk.iad-07.braze.com',
    '08': 'sdk.iad-08.braze.com',
    EU: 'sdk.fra-01.braze.eu',
    EU02: 'sdk.fra-02.braze.eu',
    AU: 'sdk.au-01.braze.com',
};

var constructor = function () {
    var self = this,
        forwarderSettings,
        options = {},
        reportingService,
        hasConsentMappings,
        parsedConsentMappings,
        parsedSubscriptionGroupMapping = {},
        mpCustomFlags;

    self.name = name;
    self.suffix = suffix;

    var DefaultAttributeMethods = {
        $LastName: 'setLastName',
        $FirstName: 'setFirstName',
        Email: 'setEmail',
        $Gender: 'setGender',
        $Country: 'setCountry',
        $City: 'setHomeCity',
        $Mobile: 'setPhoneNumber',
        $Age: 'setDateOfBirth',
        last_name: 'setLastName',
        first_name: 'setFirstName',
        email: 'setEmail',
        gender: 'setGender',
        country: 'setCountry',
        home_city: 'setHomeCity',
        email_subscribe: 'setEmailNotificationSubscriptionType',
        push_subscribe: 'setPushNotificationSubscriptionType',
        phone: 'setPhoneNumber',
        dob: 'setDateOfBirth',
    };

    var bundleCommerceEventData = false;
    var forwardSkuAsProductName = false;
    var useEcommerceRecommendedEvents = false;

    var RECOMMENDED_ECOMMERCE_SOURCE = 'web';
    var RECOMMENDED_CART_UPDATED_EVENT_NAME = 'ecommerce.cart_updated';
    var RECOMMENDED_CHECKOUT_STARTED_EVENT_NAME = 'ecommerce.checkout_started';
    var RECOMMENDED_PRODUCT_VIEWED_EVENT_NAME = 'ecommerce.product_viewed';
    var RECOMMENDED_ORDER_PLACED_EVENT_NAME = 'ecommerce.order_placed';
    var RECOMMENDED_ORDER_REFUNDED_EVENT_NAME = 'ecommerce.order_refunded';
    var RECOMMENDED_IMAGE_URL_ATTRIBUTES = ['image_url', 'Image URL'];
    var RECOMMENDED_PRODUCT_URL_ATTRIBUTES = ['product_url', 'Product URL'];
    // Custom attributes promoted to typed recommended-event fields; excluded from metadata.
    var RECOMMENDED_PROMOTED_METADATA_ATTRIBUTES = [
        'cart_id',
        'checkout_id',
        'total_discounts',
        'subtotal_value',
    ];

    var brazeConsentKeys = [
        '$google_ad_user_data',
        '$google_ad_personalization'
    ];

    var latestUserBrazeConsentString;

    // A purchase event can either log a single event with all products
    // or multiple purchase events (one per product)
    function logPurchaseEvent(event) {
        var reportEvent = false;

        if (bundleCommerceEventData) {
            reportEvent = logSinglePurchaseEventWithProducts(event);
        } else {
            reportEvent = logPurchaseEventPerProduct(event);
        }
        return reportEvent === true;
    }

    function logSinglePurchaseEventWithProducts(event) {
        var quantity = 1;
        var eventAttributes = mergeObjects(event.EventAttributes, {
            products: [],
        });
        var eventName = getCommerceEventName(event.EventCategory);

        // All commerce events except for promotion/impression events will have a
        // ProductAction property, but if this ever changes in the future, this
        // check will prevent errors
        if (!event.ProductAction) {
            return false;
        }

        if (event.ProductAction.TransactionId) {
            eventAttributes['Transaction Id'] =
                event.ProductAction.TransactionId;
        }

        if (
            event.ProductAction.ProductList &&
            event.ProductAction.ProductList.length
        ) {
            eventAttributes.products = addProducts(
                event.ProductAction.ProductList
            );
        }

        kitLogger(
            'braze.logPurchase',
            eventName,
            event.ProductAction.TotalAmount,
            event.CurrencyCode,
            quantity,
            eventAttributes
        );

        var reportEvent = braze.logPurchase(
            eventName,
            event.ProductAction.TotalAmount,
            event.CurrencyCode,
            quantity,
            eventAttributes
        );

        return reportEvent === true;
    }

    function logPurchaseEventPerProduct(event) {
        var reportEvent = false;
        if (event.ProductAction.ProductList) {
            event.ProductAction.ProductList.forEach(function(product) {
                var productName;

                if (forwardSkuAsProductName) {
                    productName = product.Sku;
                } else {
                    productName = product.Name;
                }
                var sanitizedProductName = getSanitizedValueForBraze(
                    productName
                );

                if (product.Attributes == null) {
                    product.Attributes = {};
                }

                product.Attributes['Sku'] = product.Sku;

                var productAttributes = mergeObjects(product.Attributes, {
                    'Transaction Id': event.ProductAction.TransactionId,
                });

                var sanitizedProperties = getSanitizedCustomProperties(
                    productAttributes
                );

                if (sanitizedProperties == null) {
                    return (
                        'Properties did not pass validation for ' +
                        sanitizedProductName
                    );
                }
                var price = parseFloat(product.Price);

                kitLogger(
                    'braze.logPurchase',
                    sanitizedProductName,
                    price,
                    event.CurrencyCode,
                    product.Quantity,
                    sanitizedProperties
                );

                reportEvent = braze.logPurchase(
                    sanitizedProductName,
                    price,
                    event.CurrencyCode,
                    product.Quantity,
                    sanitizedProperties
                );
            });
        }
        return reportEvent === true;
    }

    function getCommerceEventName(eventType) {
        const eventNamePrefix = 'eCommerce';
        let eventName;

        switch (eventType) {
            case CommerceEventType.ProductAddToCart:
                eventName = 'add_to_cart';
                break;
            case CommerceEventType.ProductRemoveFromCart:
                eventName = 'remove_from_cart';
                break;
            case CommerceEventType.ProductCheckout:
                eventName = 'checkout';
                break;
            case CommerceEventType.ProductCheckoutOption:
                eventName = 'checkout_option';
                break;
            case CommerceEventType.ProductClick:
                eventName = 'click';
                break;
            case CommerceEventType.ProductViewDetail:
                eventName = 'view_detail';
                break;
            case CommerceEventType.ProductPurchase:
                eventName = 'purchase';
                break;
            case CommerceEventType.ProductRefund:
                eventName = 'refund';
                break;
            case CommerceEventType.ProductAddToWishlist:
                eventName = 'add_to_wishlist';
                break;
            case CommerceEventType.ProductRemoveFromWishlist:
                eventName = 'remove_from_wishlist';
                break;
            case CommerceEventType.PromotionView:
                eventName = 'view';
                break;
            case CommerceEventType.PromotionClick:
                eventName = 'click';
                break;
            case CommerceEventType.ProductImpression:
                eventName = 'Impression';
                break;
            default:
                eventName = 'unknown';
                break;
        }
        return [eventNamePrefix, eventName].join(' - ');
    }

    // The Braze Web SDK only exposes logEcommerceEvent in v6.8.0+. Guard against
    // older host SDKs so we can fall back to legacy forwarding when unsupported.
    function recommendedEcommerceEventsSupported() {
        return typeof braze.logEcommerceEvent === 'function';
    }

    function getSessionIdForBraze() {
        try {
            if (mParticle && typeof mParticle.getSession === 'function') {
                return mParticle.getSession();
            }
        } catch (e) {
            // no-op: session id is a best-effort fallback
        }
        return null;
    }

    function generateEcommerceId() {
        if (
            typeof window !== 'undefined' &&
            window.crypto &&
            typeof window.crypto.randomUUID === 'function'
        ) {
            return window.crypto.randomUUID();
        }
        return (
            'mp-' +
            new Date().getTime() +
            '-' +
            Math.floor(Math.random() * 1000000000)
        );
    }

    function getEcommerceCustomAttribute(event, key) {
        var attributes = event.EventAttributes || {};
        if (attributes[key] != null && attributes[key] !== '') {
            return String(attributes[key]);
        }
        return null;
    }

    function getRecommendedCartId(event) {
        // Fall back to the mParticle session id, then a generated id, matching the
        // Android and iOS kits (a missing session id is unlikely but possible).
        return (
            getEcommerceCustomAttribute(event, 'cart_id') ||
            getSessionIdForBraze() ||
            generateEcommerceId()
        );
    }

    function getRecommendedCheckoutId(event) {
        return (
            getEcommerceCustomAttribute(event, 'checkout_id') ||
            getSessionIdForBraze() ||
            generateEcommerceId()
        );
    }

    function getRecommendedOrderId(event) {
        if (event.ProductAction && event.ProductAction.TransactionId) {
            return String(event.ProductAction.TransactionId);
        }
        return getSessionIdForBraze() || generateEcommerceId();
    }

    function getRecommendedProductList(event) {
        if (event.ProductAction && event.ProductAction.ProductList) {
            return event.ProductAction.ProductList;
        }
        return [];
    }

    // Product quantity is a count, so coerce to an integer >= 1 (mirrors the
    // Android kit's toLong().coerceAtLeast(1)).
    function getRecommendedQuantity(product) {
        var quantity = parseInt(product.Quantity, 10);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }
        return quantity;
    }

    function getRecommendedTotalValue(event) {
        if (
            event.ProductAction &&
            event.ProductAction.TotalAmount != null &&
            event.ProductAction.TotalAmount !== ''
        ) {
            return parseFloat(event.ProductAction.TotalAmount) || 0;
        }
        var total = 0;
        getRecommendedProductList(event).forEach(function(product) {
            total +=
                (parseFloat(product.Price) || 0) *
                getRecommendedQuantity(product);
        });
        return total;
    }

    function getRecommendedTotalDiscounts(event) {
        var value = getEcommerceCustomAttribute(event, 'total_discounts');
        if (value == null) {
            return null;
        }
        var parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    }

    function parseRecommendedFloat(value) {
        if (value == null || value === '') {
            return null;
        }
        var parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    }

    function getRecommendedTax(event) {
        return parseRecommendedFloat(
            event.ProductAction && event.ProductAction.TaxAmount
        );
    }

    function getRecommendedShipping(event) {
        return parseRecommendedFloat(
            event.ProductAction && event.ProductAction.ShippingAmount
        );
    }

    // mParticle has no native subtotal field, so subtotal_value is sourced from a
    // `subtotal_value` commerce custom attribute (like cart_id/total_discounts).
    function getRecommendedSubtotalValue(event) {
        return parseRecommendedFloat(
            getEcommerceCustomAttribute(event, 'subtotal_value')
        );
    }

    // tax, shipping, and subtotal_value are optional recognized top-level attributes
    // on cart_updated/checkout_started/order_placed. Set only when present.
    function applyRecommendedMonetaryAttributes(properties, event) {
        var tax = getRecommendedTax(event);
        if (tax != null) {
            properties.tax = tax;
        }
        var shipping = getRecommendedShipping(event);
        if (shipping != null) {
            properties.shipping = shipping;
        }
        var subtotalValue = getRecommendedSubtotalValue(event);
        if (subtotalValue != null) {
            properties.subtotal_value = subtotalValue;
        }
    }

    // product_viewed and order_refunded have no recognized top-level tax/shipping/
    // subtotal_value fields, so when present these are preserved in metadata rather
    // than dropped.
    function buildRecommendedMonetaryMetadata(event) {
        var metadata = {};
        var tax = getRecommendedTax(event);
        if (tax != null) {
            metadata.tax = tax;
        }
        var shipping = getRecommendedShipping(event);
        if (shipping != null) {
            metadata.shipping = shipping;
        }
        var subtotalValue = getRecommendedSubtotalValue(event);
        if (subtotalValue != null) {
            metadata.subtotal_value = subtotalValue;
        }
        return metadata;
    }

    function getRecommendedVariantId(product) {
        return String(product.Variant || product.Sku);
    }

    function getRecommendedProductAttribute(product, keys) {
        var attributes = product.Attributes || {};
        for (var i = 0; i < keys.length; i++) {
            var value = attributes[keys[i]];
            if (value != null && value !== '') {
                return String(value);
            }
        }
        return null;
    }

    function emptyObjectToUndefined(obj) {
        return obj && Object.keys(obj).length ? obj : undefined;
    }

    function buildRecommendedProductMetadata(product) {
        var metadata = {};
        if (product.Brand) {
            metadata.brand = product.Brand;
        }
        if (product.Category) {
            metadata.category = product.Category;
        }
        if (product.CouponCode) {
            metadata.coupon_code = product.CouponCode;
        }
        if (product.Position != null) {
            metadata.position = product.Position;
        }
        metadata.sku = product.Sku;
        var attributes = product.Attributes || {};
        Object.keys(attributes).forEach(function(key) {
            if (
                RECOMMENDED_IMAGE_URL_ATTRIBUTES.indexOf(key) === -1 &&
                RECOMMENDED_PRODUCT_URL_ATTRIBUTES.indexOf(key) === -1 &&
                attributes[key] != null &&
                attributes[key] !== ''
            ) {
                metadata[key] = attributes[key];
            }
        });
        return metadata;
    }

    function buildRecommendedEventMetadata(event) {
        var metadata = {};
        var attributes = event.EventAttributes || {};
        Object.keys(attributes).forEach(function(key) {
            // Skip attributes already promoted to typed recommended-event fields to avoid
            // emitting them both at the top level and inside metadata.
            if (
                RECOMMENDED_PROMOTED_METADATA_ATTRIBUTES.indexOf(key) === -1 &&
                attributes[key] != null &&
                attributes[key] !== ''
            ) {
                metadata[key] = attributes[key];
            }
        });
        var productAction = event.ProductAction || {};
        if (productAction.Affiliation) {
            metadata.affiliation = productAction.Affiliation;
        }
        if (productAction.CouponCode) {
            metadata.coupon_code = productAction.CouponCode;
        }
        // tax/shipping are recognized top-level recommended-event attributes
        // (see applyRecommendedMonetaryAttributes), so they are not duplicated here.
        return metadata;
    }

    function buildRecommendedLineItem(product) {
        var lineItem = {
            product_id: String(product.Sku),
            product_name: String(product.Name),
            variant_id: getRecommendedVariantId(product),
            quantity: getRecommendedQuantity(product),
            price: parseFloat(product.Price) || 0,
        };
        var imageUrl = getRecommendedProductAttribute(
            product,
            RECOMMENDED_IMAGE_URL_ATTRIBUTES
        );
        if (imageUrl) {
            lineItem.image_url = imageUrl;
        }
        var productUrl = getRecommendedProductAttribute(
            product,
            RECOMMENDED_PRODUCT_URL_ATTRIBUTES
        );
        if (productUrl) {
            lineItem.product_url = productUrl;
        }
        var metadata = emptyObjectToUndefined(
            buildRecommendedProductMetadata(product)
        );
        if (metadata) {
            lineItem.metadata = metadata;
        }
        return lineItem;
    }

    function buildRecommendedLineItems(productList) {
        return (productList || []).map(buildRecommendedLineItem);
    }

    // Forwards a commerce event using Braze's recommended eCommerce schema.
    // Returns true/false when the event was handled, or null to signal the caller
    // to fall back to legacy forwarding (no products, or an unsupported action).
    function logRecommendedCommerceEvent(event) {
        var productList = getRecommendedProductList(event);
        if (!productList.length) {
            return null;
        }
        var currency = event.CurrencyCode || 'USD';
        var source = RECOMMENDED_ECOMMERCE_SOURCE;
        var eventMetadata = emptyObjectToUndefined(
            buildRecommendedEventMetadata(event)
        );
        var reportEvent = false;
        var properties;

        switch (event.EventCategory) {
            case CommerceEventType.ProductAddToCart:
            case CommerceEventType.ProductRemoveFromCart:
                properties = {
                    cart_id: getRecommendedCartId(event),
                    currency: currency,
                    source: source,
                    total_value: getRecommendedTotalValue(event),
                    products: buildRecommendedLineItems(productList),
                    action:
                        event.EventCategory ===
                        CommerceEventType.ProductAddToCart
                            ? 'add'
                            : 'remove',
                };
                applyRecommendedMonetaryAttributes(properties, event);
                if (eventMetadata) {
                    properties.metadata = eventMetadata;
                }
                reportEvent = braze.logEcommerceEvent({
                    name: RECOMMENDED_CART_UPDATED_EVENT_NAME,
                    properties: properties,
                });
                break;
            case CommerceEventType.ProductCheckout:
                properties = {
                    checkout_id: getRecommendedCheckoutId(event),
                    currency: currency,
                    source: source,
                    total_value: getRecommendedTotalValue(event),
                    products: buildRecommendedLineItems(productList),
                    cart_id: getRecommendedCartId(event),
                };
                applyRecommendedMonetaryAttributes(properties, event);
                if (eventMetadata) {
                    properties.metadata = eventMetadata;
                }
                reportEvent = braze.logEcommerceEvent({
                    name: RECOMMENDED_CHECKOUT_STARTED_EVENT_NAME,
                    properties: properties,
                });
                break;
            case CommerceEventType.ProductViewDetail:
                reportEvent = false;
                productList.forEach(function(product) {
                    var viewedProperties = {
                        product_id: String(product.Sku),
                        product_name: String(product.Name),
                        variant_id: getRecommendedVariantId(product),
                        price: parseFloat(product.Price) || 0,
                        currency: currency,
                        source: source,
                    };
                    var imageUrl = getRecommendedProductAttribute(
                        product,
                        RECOMMENDED_IMAGE_URL_ATTRIBUTES
                    );
                    if (imageUrl) {
                        viewedProperties.image_url = imageUrl;
                    }
                    var productUrl = getRecommendedProductAttribute(
                        product,
                        RECOMMENDED_PRODUCT_URL_ATTRIBUTES
                    );
                    if (productUrl) {
                        viewedProperties.product_url = productUrl;
                    }
                    var viewedMetadata = emptyObjectToUndefined(
                        mergeObjects(
                            mergeObjects(
                                buildRecommendedProductMetadata(product),
                                eventMetadata || {}
                            ),
                            buildRecommendedMonetaryMetadata(event)
                        )
                    );
                    if (viewedMetadata) {
                        viewedProperties.metadata = viewedMetadata;
                    }
                    reportEvent =
                        braze.logEcommerceEvent({
                            name: RECOMMENDED_PRODUCT_VIEWED_EVENT_NAME,
                            properties: viewedProperties,
                        }) === true || reportEvent;
                });
                break;
            case CommerceEventType.ProductPurchase:
                properties = {
                    order_id: getRecommendedOrderId(event),
                    currency: currency,
                    source: source,
                    total_value: getRecommendedTotalValue(event),
                    products: buildRecommendedLineItems(productList),
                    cart_id: getRecommendedCartId(event),
                };
                var totalDiscounts = getRecommendedTotalDiscounts(event);
                if (totalDiscounts != null) {
                    properties.total_discounts = totalDiscounts;
                }
                applyRecommendedMonetaryAttributes(properties, event);
                if (eventMetadata) {
                    properties.metadata = eventMetadata;
                }
                reportEvent = braze.logEcommerceEvent({
                    name: RECOMMENDED_ORDER_PLACED_EVENT_NAME,
                    properties: properties,
                });
                break;
            case CommerceEventType.ProductRefund:
                // Braze has no typed order_refunded event; forward it as a custom
                // event that mirrors the recommended ecommerce.order_refunded schema.
                var refundProperties = {
                    order_id: getRecommendedOrderId(event),
                    total_value: getRecommendedTotalValue(event),
                    currency: currency,
                    source: source,
                    products: buildRecommendedLineItems(productList),
                };
                var refundDiscounts = getRecommendedTotalDiscounts(event);
                if (refundDiscounts != null) {
                    refundProperties.total_discounts = refundDiscounts;
                }
                var refundMetadata = emptyObjectToUndefined(
                    mergeObjects(
                        eventMetadata || {},
                        buildRecommendedMonetaryMetadata(event)
                    )
                );
                if (refundMetadata) {
                    refundProperties.metadata = refundMetadata;
                }
                reportEvent = braze.logCustomEvent(
                    RECOMMENDED_ORDER_REFUNDED_EVENT_NAME,
                    refundProperties
                );
                break;
            default:
                return null;
        }
        return reportEvent === true;
    }

    function logBrazePageViewEvent(event) {
        var sanitizedEventName,
            sanitizedAttrs,
            eventName,
            attrs = event.EventAttributes || {};

        attrs.hostname = window.location.hostname;
        attrs.title = window.document.title;

        if (forwarderSettings.setEventNameForPageView === 'True') {
            eventName = event.EventName;
        } else {
            eventName = window.location.pathname;
        }
        sanitizedEventName = getSanitizedValueForBraze(eventName);
        sanitizedAttrs = getSanitizedCustomProperties(attrs);

        kitLogger('braze.logCustomEvent', sanitizedEventName, sanitizedAttrs);

        var reportEvent = braze.logCustomEvent(
            sanitizedEventName,
            sanitizedAttrs
        );
        return reportEvent === true;
    }

    function setDefaultAttribute(key, value) {
        if (key === 'dob') {
            if (!(value instanceof Date)) {
                return (
                    "Can't call removeUserAttribute or setUserAttribute on forwarder " +
                    name +
                    ", removeUserAttribute or setUserAttribute must set 'dob' to a date"
                );
            } else {
                kitLogger(
                    'braze.getUser().setDateOfBirth',
                    value.getFullYear(),
                    value.getMonth() + 1,
                    value.getDate()
                );

                braze
                    .getUser()
                    .setDateOfBirth(
                        value.getFullYear(),
                        value.getMonth() + 1,
                        value.getDate()
                    );
            }
        } else if (key === '$Age') {
            if (typeof value === 'number') {
                var year = new Date().getFullYear() - value;

                kitLogger('braze.getUser().setDateOfBirth', year, 1, 1);

                braze.getUser().setDateOfBirth(year, 1, 1);
            } else {
                return '$Age must be a number';
            }
        } else {
            if (value == null) {
                value = '';
            }
            if (!(typeof value === 'string')) {
                return (
                    "Can't call removeUserAttribute or setUserAttribute on forwarder " +
                    name +
                    ', removeUserAttribute or setUserAttribute must set this value to a string'
                );
            }
            var params = [];
            params.push(value);

            kitLogger(
                'braze.getUser().' + DefaultAttributeMethods[key],
                params
            );

            var u = braze.getUser();

            //This method uses the setLastName, setFirstName, setEmail, setCountry, setHomeCity, setPhoneNumber, setAvatarImageUrl, setDateOfBirth, setGender, setEmailNotificationSubscriptionType, and setPushNotificationSubscriptionType methods
            if (!u[DefaultAttributeMethods[key]].apply(u, params)) {
                return (
                    'removeUserAttribute or setUserAttribute on forwarder ' +
                    name +
                    ' failed to call, an invalid attribute value was passed in'
                );
            }
        }
    }

    function logBrazeEvent(event) {
        var sanitizedEventName = getSanitizedValueForBraze(event.EventName);
        var sanitizedProperties = getSanitizedCustomProperties(
            event.EventAttributes
        );

        if (sanitizedProperties == null) {
            return (
                'Properties did not pass validation for ' + sanitizedEventName
            );
        }

        kitLogger(
            'braze.logCustomEvent',
            sanitizedEventName,
            sanitizedProperties
        );

        var reportEvent = braze.logCustomEvent(
            sanitizedEventName,
            sanitizedProperties
        );

        return reportEvent === true;
    }

    /**************************/
    /** Begin mParticle API **/
    /**************************/
    function processEvent(event) {
        var reportEvent = false;
        maybeSetConsentBeforeEventLogged(event);

        if (event.EventDataType == MessageType.Commerce) {
            reportEvent = logCommerceEvent(event);
        } else if (event.EventDataType == MessageType.PageEvent) {
            reportEvent = logBrazeEvent(event);
        } else if (event.EventDataType == MessageType.PageView) {
            if (forwarderSettings.forwardScreenViews == 'True') {
                reportEvent = logBrazePageViewEvent(event);
            }
        } else {
            return (
                "Can't send event type to forwarder " +
                name +
                ', event type is not supported'
            );
        }

        if (reportEvent === true && reportingService) {
            reportingService(self, event);
        }
    }

    // mParticle commerce events use different Braze methods depending on if they are
    // a purchase event or a non-purchase commerce event
    function logCommerceEvent(event) {
        var reportEvent = false;
        // When opted in (and the host Braze SDK supports it), forward supported
        // commerce actions using Braze's recommended eCommerce schema. Unsupported
        // actions (or a host SDK without the API) fall back to legacy forwarding.
        if (
            useEcommerceRecommendedEvents &&
            recommendedEcommerceEventsSupported()
        ) {
            var recommendedResult = logRecommendedCommerceEvent(event);
            if (recommendedResult !== null) {
                return recommendedResult === true;
            }
        }
        if (event.EventCategory === CommerceEventType.ProductPurchase) {
            reportEvent = logPurchaseEvent(event);
            return reportEvent === true;
        } else {
            reportEvent = logNonPurchaseCommerceEvent(event);
            return reportEvent === true;
        }
    }

    // A non-purchase commerce event can either log a single event with all products
    // or one event per product when the commerce event is expanded
    function logNonPurchaseCommerceEvent(event) {
        if (bundleCommerceEventData) {
            return logNonPurchaseCommerceEventWithProducts(event);
        } else {
            return logExpandedNonPurchaseCommerceEvents(event);
        }
    }

    function logNonPurchaseCommerceEventWithProducts(mpEvent) {
        const commerceEventAttrs = {};
        const eventName = getCommerceEventName(mpEvent.EventCategory);

        try {
            switch (mpEvent.EventCategory) {
                case CommerceEventType.PromotionClick:
                case CommerceEventType.PromotionView:
                    commerceEventAttrs.promotions = addPromotions(
                        mpEvent.PromotionAction
                    );
                    break;
                case CommerceEventType.ProductImpression:
                    commerceEventAttrs.impressions = addImpressions(
                        mpEvent.ProductImpressions
                    );
                    break;
                default:
                    if (mpEvent.ProductAction.ProductList) {
                        commerceEventAttrs.products = addProducts(
                            mpEvent.ProductAction.ProductList
                        );
                    }
                    var transactionId = mpEvent.ProductAction.TransactionId;
                    var totalAmount = mpEvent.ProductAction.TotalAmount;
                    var taxAmount = mpEvent.ProductAction.TaxAmount;
                    var shippingAmount = mpEvent.ProductAction.ShippingAmount;
                    var affiliation = mpEvent.ProductAction.Affiliation;

                    if (transactionId) {
                        commerceEventAttrs['Transaction Id'] = transactionId;
                    }
                    if (totalAmount) {
                        commerceEventAttrs['Total Amount'] = totalAmount;
                    }
                    if (taxAmount) {
                        commerceEventAttrs['Tax Amount'] = taxAmount;
                    }
                    if (shippingAmount) {
                        commerceEventAttrs['Shipping Amount'] = shippingAmount;
                    }
                    if (affiliation) {
                        commerceEventAttrs['Affiliation'] = affiliation;
                    }
            }

            var sanitizedProperties = getSanitizedCustomProperties(
                mpEvent.EventAttributes
            );

            const brazeEvent = {
                EventName: eventName,
                EventAttributes: mergeObjects(
                    commerceEventAttrs,
                    sanitizedProperties
                ),
            };

            var reportEvent = logBrazeEvent(brazeEvent);
            return reportEvent;
        } catch (err) {
            return 'Error logging commerce event' + err.message;
        }
    }

    function addPromotions(promotionAction) {
        if (promotionAction && promotionAction.PromotionList) {
            return promotionAction.PromotionList;
        }
        return [];
    }

    function addImpressions(productImpressions) {
        if (productImpressions.length) {
            return productImpressions.map(function(impression) {
                return {
                    'Product Impression List': impression.ProductImpressionList,
                    products: addProducts(impression.ProductList),
                };
            });
        } else {
            return [];
        }
    }

    function addProducts(productList) {
        const productArray = [];
        if (!productList || productList.length === 0) {
            return productArray;
        }

        productList.forEach(function(product) {
            {
                var sanitizedProduct = parseProduct(
                    getSanitizedCustomProperties(product)
                );
                productArray.push(sanitizedProduct);
            }
        });

        return productArray;
    }

    function parseProduct(_product) {
        var product = {};
        for (var key in _product) {
            switch (key) {
                case 'Sku':
                    product.Id = _product[key];
                    break;
                case 'Name':
                    product.Name = forwardSkuAsProductName
                        ? _product.Sku
                        : _product.Name;
                    break;
                case 'CouponCode':
                    product['Coupon Code'] = _product[key];
                    break;
                case 'TotalAmount':
                    product['Total Product Amount'] = _product[key];
                    break;
                default:
                    product[key] = _product[key];
            }
        }

        return product;
    }

    function logExpandedNonPurchaseCommerceEvents(event) {
        var reportEvent = false;
        var listOfPageEvents = mParticle.eCommerce.expandCommerceEvent(event);
        if (listOfPageEvents !== null) {
            for (var i = 0; i < listOfPageEvents.length; i++) {
                // finalLoopResult keeps track of if any logBrazeEvent in this loop returns true or not
                var finalLoopResult = false;
                try {
                    reportEvent = logBrazeEvent(listOfPageEvents[i]);
                    if (reportEvent === true) {
                        finalLoopResult = true;
                    }
                } catch (err) {
                    return 'Error logging page event' + err.message;
                }
            }
            reportEvent = finalLoopResult === true;
        }
        return reportEvent;
    }

    function setSubscriptionGroups(key, value) {
        var subscriptionGroupId = parsedSubscriptionGroupMapping[key];

        if (typeof value !== 'boolean') {
            kitLogger("Can't call setSubscriptionGroups on forwarder " +
                name +
                ', setSubscriptionGroups must set this value to a boolean');
            return;
        }

        var action = value ? 'addToSubscriptionGroup' : 'removeFromSubscriptionGroup';
        kitLogger('braze.getUser().' + action, subscriptionGroupId);
        braze.getUser()[action](subscriptionGroupId);
    }

    function removeUserAttribute(key) {
        if (!(key in DefaultAttributeMethods)) {
            var sanitizedKey = getSanitizedValueForBraze(key);

            kitLogger(
                'braze.getUser().setCustomUserAttribute',
                sanitizedKey,
                null
            );

            braze.getUser().setCustomUserAttribute(sanitizedKey, null);
        } else {
            return setDefaultAttribute(key, null);
        }
    }

    function setUserAttribute(key, value) {
        if (key in DefaultAttributeMethods) {
            return setDefaultAttribute(key, value);
        }

        if (parsedSubscriptionGroupMapping[key]) {
            setSubscriptionGroups(key, value);
            return;
        }

        var sanitizedKey = getSanitizedValueForBraze(key);
        var sanitizedValue = getSanitizedValueForBraze(value);

        if (value != null && sanitizedValue == null) {
            return 'Value did not pass validation for ' + key;
        }

        kitLogger(
            'braze.getUser().setCustomUserAttribute',
            sanitizedKey,
            sanitizedValue
        );

        braze
            .getUser()
            .setCustomUserAttribute(sanitizedKey, sanitizedValue);
    }

    function setUserIdentity(id, type) {
        // Only use this method when mParicle core SDK is version 1
        // Other versions use onUserIdentified, which is called after setUserIdentity from core SDK
        if (window.mParticle.getVersion().split('.')[0] === '1') {
            if (type == window.mParticle.IdentityType.CustomerId) {
                kitLogger('braze.changeUser', id);

                braze.changeUser(id);
            } else if (type == window.mParticle.IdentityType.Email) {
                kitLogger('braze.getUser().setEmail', id);

                braze.getUser().setEmail(id);
            } else {
                return (
                    "Can't call setUserIdentity on forwarder " +
                    name +
                    ', identity type not supported.'
                );
            }
        }
    }

    // onUserIdentified is not used in version 1 so there is no need to check for version number
    function onUserIdentified(user) {
        kitLogger('calling MpBrazeKit.onUserIdentified');

        try {
            var brazeUserIDType,
                userIdentities = user.getUserIdentities().userIdentities;

            if (forwarderSettings.userIdentificationType === 'MPID') {
                brazeUserIDType = user.getMPID();
            } else {
                brazeUserIDType =
                    userIdentities[
                        forwarderSettings.userIdentificationType.toLowerCase()
                    ];
            }

            if (brazeUserIDType) {
                kitLogger('braze.changeUser', brazeUserIDType);

                braze.changeUser(brazeUserIDType);
            }

            if (userIdentities.email) {
                kitLogger('braze.getUser().setEmail', userIdentities.email);

                braze.getUser().setEmail(userIdentities.email);
            }
        } catch (e) {
            kitLogger(
                'Error in calling MpBrazeKit.onUserIdentified',
                e.message
            );
        }
    }

    function primeBrazeWebPush() {
        // The following code block is based on Braze's best practice for implementing
        // their push primer.  We only modify it to include pushPrimer and register_inapp settings.
        // https://www.braze.com/docs/developer_guide/platform_integration_guides/web/push_notifications/soft_push_prompt
        braze.subscribeToInAppMessage(function (inAppMessage) {
            var shouldDisplay = true;
            var pushPrimer = false;
            if (inAppMessage instanceof braze.InAppMessage) {
                // access the key-value pairs, defined as `extras`
                const keyValuePairs = inAppMessage.extras || {};
                // check the value of our key `msg-id` defined in the Braze dashboard
                if (keyValuePairs['msg-id'] === 'push-primer') {
                    pushPrimer = true;
                    // We don't want to display the soft push prompt to users on browsers
                    // that don't support push, or if the user has already granted/blocked permission
                    if (
                        braze.isPushSupported() === false ||
                        braze.isPushPermissionGranted() ||
                        braze.isPushBlocked()
                    ) {
                        // do not call `showInAppMessage`
                        shouldDisplay = false;
                        return;
                    }

                    // user is eligible to receive the native prompt
                    // register a click handler on one of the two buttons
                    if (inAppMessage.buttons[0]) {
                        // Prompt the user when the first button is clicked
                        inAppMessage.buttons[0].subscribeToClickedEvent(
                            function() {
                                braze.requestPushPermission();
                            }
                        );
                    }
                }
            }

            // Display the message if it's a push primer message and shouldDisplay is true
            // If it is not a push primer, we should show the message if the setting for register_inapp === 'True'
            if (
                (pushPrimer && shouldDisplay) ||
                (!pushPrimer && forwarderSettings.register_inapp === 'True')
            ) {
                braze.showInAppMessage(inAppMessage);
            }
        });
    }

    function openSession(forwarderSettings) {
        braze.openSession();
        if (forwarderSettings.softPushCustomEventName) {
            kitLogger(
                'braze.logCustomEvent',
                forwarderSettings.softPushCustomEventName
            );

            braze.logCustomEvent(forwarderSettings.softPushCustomEventName);
        }
    }

    function prepareInitialConsent(user) {
        var userConsentState = getUserConsentState(user);

        var currentConsentPayload = generateBrazeConsentStatePayload(
            userConsentState
        );

        if (!isEmpty(currentConsentPayload)) {
            latestUserBrazeConsentString = JSON.stringify(
                currentConsentPayload
            );

            setConsentOnBraze(currentConsentPayload);
        }
    }

    function setConsentOnBraze(currentConsentPayload) {
        for (var key in currentConsentPayload) {
            braze
                .getUser()
                .setCustomUserAttribute(key, currentConsentPayload[key]);
        }
    }

    function maybeSetConsentBeforeEventLogged(event) {
        if (latestUserBrazeConsentString && !isEmpty(parsedConsentMappings)) {
            var eventConsentState = getEventConsentState(event.ConsentState);

            if (!isEmpty(eventConsentState)) {
                var eventBrazeConsent = generateBrazeConsentStatePayload(
                    eventConsentState
                );
                var eventBrazeConsentAsString = JSON.stringify(
                    eventBrazeConsent
                );

                if (
                    eventBrazeConsentAsString !== latestUserBrazeConsentString
                ) {
                    setConsentOnBraze(eventBrazeConsent);
                    latestUserBrazeConsentString = eventBrazeConsentAsString;
                }
            }
        }
    }

    function getEventConsentState(eventConsentState) {
        return eventConsentState && eventConsentState.getGDPRConsentState
            ? eventConsentState.getGDPRConsentState()
            : {};
    }

    function generateBrazeConsentStatePayload(consentState) {
        if (!parsedConsentMappings) return {};

        var payload = {};

        // These are Braze's consent constants for Braze's Audience Sync to Google
        // https://www.braze.com/docs/partners/canvas_steps/google_audience_sync

        var googleToBrazeConsentMap = {
            google_ad_user_data: '$google_ad_user_data',
            google_ad_personalization: '$google_ad_personalization',
        };

        for (var i = 0; i <= parsedConsentMappings.length - 1; i++) {
            var mappingEntry = parsedConsentMappings[i];
            // Although consent purposes can be inputted into the UI in any casing
            // the SDK will automatically lowercase them to prevent pseudo-duplicate
            // consent purposes, so we call `toLowerCase` on the consentMapping purposes here
            var mpMappedConsentName = mappingEntry.map.toLowerCase();
            // that mappingEntry.value returned from the server does not have a $ appended, so we have to add it
            var brazeMappedConsentName =
                googleToBrazeConsentMap[mappingEntry.value];

            if (
                consentState[mpMappedConsentName] &&
                brazeMappedConsentName &&
                brazeConsentKeys.indexOf(brazeMappedConsentName) !== -1
            ) {
                payload[brazeMappedConsentName] =
                    consentState[mpMappedConsentName].Consented;
            }
        }

        return payload;
    }

    function getUserConsentState(user) {
        var userConsentState = {};

        var consentState = user.getConsentState();

        if (consentState && consentState.getGDPRConsentState) {
            userConsentState = consentState.getGDPRConsentState();
        }

        return userConsentState;
    }

    function parseConsentSettingsString(consentMappingString) {
        return JSON.parse(consentMappingString.replace(/&quot;/g, '"'));
    }

    function initForwarder(
        settings,
        service,
        testMode,
        trackerId,
        userAttributes,
        userIdentities,
        appVersion,
        appName,
        customFlags
    ) {
        // check to see if there is a logger for backwards compatibility, and if not, mock one to avoid errors
        if (!self.logger) {
            // create a logger
            self.logger = {
                verbose: function() {},
            };
        }
        // eslint-disable-line no-unused-vars
        mpCustomFlags = customFlags;
        try {
            forwarderSettings = settings;
            bundleCommerceEventData =
                forwarderSettings.bundleCommerceEventData === 'True';
            forwardSkuAsProductName =
                forwarderSettings.forwardSkuAsProductName === 'True';
            useEcommerceRecommendedEvents =
                forwarderSettings.useEcommerceRecommendedEvents === 'True';
            reportingService = service;
            // 30 min is Braze default
            options.sessionTimeoutInSeconds =
                forwarderSettings.ABKSessionTimeoutKey || 1800;
            options.sdkFlavor = 'mparticle';
            options.allowUserSuppliedJavascript =
                forwarderSettings.enableHtmlInAppMessages == 'True';
            options.doNotLoadFontAwesome =
                forwarderSettings.doNotLoadFontAwesome == 'True';

            if (forwarderSettings.safariWebsitePushId) {
                options.safariWebsitePushId =
                    forwarderSettings.safariWebsitePushId;
            }

            if (forwarderSettings.serviceWorkerLocation) {
                options.serviceWorkerLocation =
                    forwarderSettings.serviceWorkerLocation;
            }

            if (forwarderSettings.consentMappingSDK) {
                parsedConsentMappings = parseConsentSettingsString(
                    forwarderSettings.consentMappingSDK
                );
                if (parsedConsentMappings.length) {
                    hasConsentMappings = true;
                }
            }

            if (forwarderSettings.subscriptionGroupMapping) {
                parsedSubscriptionGroupMapping = decodeSubscriptionGroupMappings(forwarderSettings.subscriptionGroupMapping);
            }

            var cluster =
                forwarderSettings.cluster ||
                forwarderSettings.dataCenterLocation;

            if (clusterMapping.hasOwnProperty(cluster)) {
                options.baseUrl = clusterMapping[cluster];
            } else {
                var customUrl = decodeClusterSetting(cluster);
                if (customUrl) {
                    options.baseUrl = customUrl;
                }
            }

            if (mpCustomFlags && mpCustomFlags[moduleId.toString()]) {
                var brazeFlags = mpCustomFlags[moduleId.toString()];
                if (typeof brazeFlags.initOptions === 'function') {
                    brazeFlags.initOptions(options);
                }
            }

            if (testMode !== true) {
                braze.initialize(forwarderSettings.apiKey, options);
                finishBrazeInitialization(forwarderSettings);
            } else {
                if (!braze.initialize(forwarderSettings.apiKey, options)) {
                    return 'Failed to initialize: ' + name;
                }
                finishBrazeInitialization(forwarderSettings);
            }
            return 'Successfully initialized: ' + name;
        } catch (e) {
            return (
                'Failed to initialize: ' + name + ' with error: ' + e.message
            );
        }
    }

    function finishBrazeInitialization(forwarderSettings) {
        braze.addSdkMetadata(['mp']);
        primeBrazeWebPush();

        const currentUser =
            mParticle.Identity !== null
                ? mParticle.Identity.getCurrentUser()
                : null;
        const mpid = currentUser ? currentUser.getMPID() : null;

        if (currentUser && mpid) {
            onUserIdentified(currentUser);
            if (hasConsentMappings) {
                prepareInitialConsent(currentUser);
            }
        }

        openSession(forwarderSettings);
    }

    /**************************/
    /** End mParticle API **/
    /**************************/

    function decodeClusterSetting(clusterSetting) {
        if (clusterSetting) {
            var decodedSetting = clusterSetting.replace(/&amp;/g, '&');
            decodedSetting = clusterSetting.replace(/&quot;/g, '"');
            try {
                var clusterSettingObject = JSON.parse(decodedSetting);
                if (clusterSettingObject && clusterSettingObject.JS) {
                    return 'https://' + clusterSettingObject.JS + '/api/v3';
                }
            } catch (e) {
                console.log(
                    'Unable to configure custom Braze cluster: ' + e.toString()
                );
            }
        }
    }

    function decodeSubscriptionGroupMappings(subscriptionGroupSetting) {
        var subscriptionGroupIds = {};
        try {
            var decodedSetting = subscriptionGroupSetting.replace(/&quot;/g, '"');
            var parsedSetting = JSON.parse(decodedSetting);
            for (let subscriptionGroupMap of parsedSetting) {
                var key = subscriptionGroupMap.map;
                var value = subscriptionGroupMap.value;
                subscriptionGroupIds[key] = value;
            }
        } catch (e) {
            console.error(
                'Unable to configure custom Braze subscription group mappings.'
            );
        }
        return subscriptionGroupIds;
    }

    function getSanitizedStringForBraze(value) {
        if (typeof value === 'string') {
            if (value.substr(0, 1) === '$') {
                return value.replace(/^\$+/g, '');
            } else {
                return value;
            }
        }
        return null;
    }

    function getSanitizedValueForBraze(value) {
        if (typeof value === 'string') {
            return getSanitizedStringForBraze(value);
        }

        if (Array.isArray(value)) {
            var sanitizedArray = [];
            for (var i in value) {
                var element = value[i];
                var sanitizedElement = getSanitizedStringForBraze(element);
                if (sanitizedElement == null) {
                    return null;
                }
                sanitizedArray.push(sanitizedElement);
            }
            return sanitizedArray;
        }
        return value;
    }

    function getSanitizedCustomProperties(customProperties) {
        var sanitizedProperties = {},
            value,
            sanitizedPropertyName,
            sanitizedValue;

        if (customProperties == null) {
            customProperties = {};
        }

        if (typeof customProperties !== 'object') {
            return null;
        }

        for (var propertyName in customProperties) {
            value = customProperties[propertyName];
            sanitizedPropertyName = getSanitizedValueForBraze(propertyName);
            sanitizedValue =
                typeof value === 'string'
                    ? getSanitizedValueForBraze(value)
                    : value;
            sanitizedProperties[sanitizedPropertyName] = sanitizedValue;
        }
        return sanitizedProperties;
    }

    this.init = initForwarder;
    this.process = processEvent;
    this.setUserIdentity = setUserIdentity;
    this.setUserAttribute = setUserAttribute;
    this.onUserIdentified = onUserIdentified;
    this.removeUserAttribute = removeUserAttribute;
    this.decodeClusterSetting = decodeClusterSetting;
    this.decodeSubscriptionGroupMappings = decodeSubscriptionGroupMappings;

    /* An example output of this logger if we pass in a purchase event for 1 iPhone
     with a SKU of iphoneSku that cost $999 with a product attribute of 
     color: blue would be:
     mParticle - Braze Web Kit log:
     braze.logPurchase:
     iphone,
     999,
     USD,
     1,
     {\"color\":\"blue\",\"Sku":"iphoneSKU"},\n`;
     */
    function kitLogger(method) {
        var msg = 'mParticle - Braze Web Kit log:';

        var nonMethodArguments = Array.prototype.slice.call(arguments, 1);
        msg += '\n' + method + ':\n';

        nonMethodArguments.forEach(function(arg) {
            if (isObject(arg) || Array.isArray(arg)) {
                msg += JSON.stringify(arg);
            } else {
                msg += arg;
            }
            msg += ',\n';
        });

        self.logger.verbose(msg);
    }
};

function getId() {
    return moduleId;
}

function register(config) {
    var forwarderNameWithSuffix = [name, suffix].join('-');
    if (!config) {
        window.console.log(
            'You must pass a config object to register the kit ' +
                forwarderNameWithSuffix
        );
        return;
    }

    if (!isObject(config)) {
        window.console.log(
            "'config' must be an object. You passed in a " + typeof config
        );
        return;
    }

    if (isObject(config.kits)) {
        config.kits[forwarderNameWithSuffix] = {
            constructor: constructor,
        };
    } else {
        config.kits = {};
        config.kits[forwarderNameWithSuffix] = {
            constructor: constructor,
        };
    }
    window.console.log(
        'Successfully registered ' +
            forwarderNameWithSuffix +
            ' to your mParticle configuration'
    );
}

if (window && window.mParticle && window.mParticle.addForwarder) {
    window.mParticle.addForwarder({
        name: name,
        constructor: constructor,
        getId: getId,
        // A suffix is added if there are multiple different versions of
        // a client kit.  This matches the suffix in the DB.
        suffix: suffix,
    });
}

function mergeObjects() {
    var resObj = {};
    for (var i = 0; i < arguments.length; i += 1) {
        var obj = arguments[i],
            keys = Object.keys(obj);
        for (var j = 0; j < keys.length; j += 1) {
            resObj[keys[j]] = obj[keys[j]];
        }
    }
    return resObj;
}

function isObject(val) {
    return (
        val != null && typeof val === 'object' && Array.isArray(val) === false
    );
}

function isEmpty(value) {
    return value == null || !(Object.keys(value) || value).length;
}

var BrazeKitDev = {
    register: register,
    getVersion: function () {
        return version;
    },
};

export { BrazeKitDev as default };
