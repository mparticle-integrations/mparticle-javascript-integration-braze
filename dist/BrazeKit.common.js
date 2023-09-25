Object.defineProperty(exports, '__esModule', { value: true });

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

const ve = {
  Fn: function (t) {
    const r = (t + "=".repeat((4 - (t.length % 4)) % 4))
        .replace(/\-/g, "+")
        .replace(/_/g, "/"),
      n = atob(r),
      o = new Uint8Array(n.length);
    for (let t = 0; t < n.length; ++t) o[t] = n.charCodeAt(t);
    return o;
  },
};

const De = {
    CustomEvent: "ce",
    Pr: "p",
    $u: "pc",
    dc: "ca",
    Va: "i",
    qs: "ie",
    P: "cci",
    T: "ccic",
    $: "ccc",
    H: "ccd",
    Wl: "ss",
    xl: "se",
    Vi: "si",
    Li: "sc",
    Qi: "sbc",
    Ki: "sfe",
    eo: "iec",
    Su: "lr",
    ju: "uae",
    R: "ci",
    B: "cc",
    Au: "lcaa",
    qu: "lcar",
    Xn: "inc",
    Jn: "add",
    Qn: "rem",
    Hn: "set",
    Kn: "ncam",
    Cu: "sgu",
    Fr: "ffi",
  },
  Be = { Br: "feed_displayed", vc: "content_cards_displayed" };

const Ge = {
  Y: function () {
    const t = (t = !1) => {
      const n = (Math.random().toString(16) + "000000000").substr(2, 8);
      return t ? "-" + n.substr(0, 4) + "-" + n.substr(4, 4) : n;
    };
    return t() + t(!0) + t(!0) + t();
  },
};

class Oe {
  constructor(t, e) {
    (this.database = t),
      (this.j = e),
      (this.parent = "undefined" == typeof window ? self : window),
      (this.database = t),
      (this.j = e);
  }
  td() {
    if ("indexedDB" in this.parent) return this.parent.indexedDB;
  }
  isSupported() {
    var t;
    try {
      if (null == this.td()) return !1;
      {
        const e =
          null === (t = this.td()) || void 0 === t
            ? void 0
            : t.open("Braze IndexedDB Support Test");
        if (
          (e &&
            ((e.onupgradeneeded = () => e.result.close()),
            (e.onsuccess = () => e.result.close())),
          "undefined" != typeof window)
        ) {
          const t = window,
            e = t.chrome || t.browser || t.ed;
          if (e && e.runtime && e.runtime.id)
            return (
              this.j.info(
                "Not using IndexedDB for storage because we are running inside an extension",
              ),
              !1
            );
        }
        return !0;
      }
    } catch (t) {
      return (
        this.j.info(
          "Not using IndexedDB for storage due to following error: " + t,
        ),
        !1
      );
    }
  }
  nd(t, e) {
    var n;
    const o =
      null === (n = this.td()) || void 0 === n
        ? void 0
        : n.open(this.database.od, this.database.VERSION);
    if (null == o) return "function" == typeof e && e(), !1;
    const i = this;
    return (
      (o.onupgradeneeded = (t) => {
        var e;
        i.j.info(
          "Upgrading indexedDB " +
            i.database.od +
            " to v" +
            i.database.VERSION +
            "...",
        );
        const n = null === (e = t.target) || void 0 === e ? void 0 : e.result;
        for (const t in i.database.Jt) {
          const e = t;
          i.database.Jt.hasOwnProperty(t) &&
            !n.objectStoreNames.contains(i.database.Jt[e]) &&
            n.createObjectStore(i.database.Jt[e]);
        }
      }),
      (o.onsuccess = (n) => {
        var o;
        const r = null === (o = n.target) || void 0 === o ? void 0 : o.result;
        (r.onversionchange = () => {
          r.close(),
            "function" == typeof e && e(),
            i.j.error(
              "Needed to close the database unexpectedly because of an upgrade in another tab",
            );
        }),
          t(r);
      }),
      (o.onerror = (t) => {
        var n;
        const o = t;
        return (
          i.j.info(
            "Could not open indexedDB " +
              i.database.od +
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
    return this.nd((d) => {
      if (!d.objectStoreNames.contains(t))
        return (
          r.j.error(
            "Could not store object " +
              e +
              " in " +
              t +
              " on indexedDB " +
              r.database.od +
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
        r.j.error(
          "Could not store object " +
            e +
            " in " +
            t +
            " on indexedDB " +
            r.database.od,
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
    return this.nd((i) => {
      if (!i.objectStoreNames.contains(t))
        return (
          o.j.error(
            "Could not retrieve object " +
              e +
              " in " +
              t +
              " on indexedDB " +
              o.database.od +
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
        o.j.error(
          "Could not retrieve object " +
            e +
            " in " +
            t +
            " on indexedDB " +
            o.database.od,
        );
      }),
        (d.onsuccess = (t) => {
          var e;
          const o = null === (e = t.target) || void 0 === e ? void 0 : e.result;
          null != o && n(o);
        });
    });
  }
  hr(t, e, n) {
    if (!this.isSupported()) return "function" == typeof n && n(), !1;
    const o = this;
    return this.nd((i) => {
      if (!i.objectStoreNames.contains(t))
        return (
          o.j.error(
            "Could not retrieve last record from " +
              t +
              " on indexedDB " +
              o.database.od +
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
        o.j.error(
          "Could not open cursor for " + t + " on indexedDB " + o.database.od,
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
  oe(t, e) {
    if (!this.isSupported()) return !1;
    const n = this;
    return this.nd((o) => {
      if (!o.objectStoreNames.contains(t))
        return (
          n.j.error(
            "Could not delete record " +
              e +
              " from " +
              t +
              " on indexedDB " +
              n.database.od +
              " - " +
              t +
              " is not a valid objectStore",
          ),
          void o.close()
        );
      const i = o.transaction([t], "readwrite");
      i.oncomplete = () => o.close();
      i.objectStore(t).delete(e).onerror = () => {
        n.j.error(
          "Could not delete record " +
            e +
            " from " +
            t +
            " on indexedDB " +
            n.database.od,
        );
      };
    });
  }
  Mt(t, e) {
    if (!this.isSupported()) return !1;
    const n = this;
    return this.nd((o) => {
      if (!o.objectStoreNames.contains(t))
        return (
          n.j.error(
            "Could not retrieve objects from " +
              t +
              " on indexedDB " +
              n.database.od +
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
          ? (n.j.info(
              "Cursor closed midway through for " +
                t +
                " on indexedDB " +
                n.database.od,
            ),
            e(s))
          : n.j.error(
              "Could not open cursor for " +
                t +
                " on indexedDB " +
                n.database.od,
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
    for (const e in this.database.Jt) {
      const n = e;
      this.database.Jt.hasOwnProperty(e) &&
        this.database.Jt[n] !== this.database.Jt.se &&
        t.push(this.database.Jt[n]);
    }
    const e = this;
    return this.nd(function (n) {
      const o = n.transaction(t, "readwrite");
      o.oncomplete = () => n.close();
      for (let n = 0; n < t.length; n++) {
        const i = t[n];
        o.objectStore(i).clear().onerror = function () {
          e.j.error(
            "Could not clear " +
              this.source.name +
              " on indexedDB " +
              e.database.od,
          );
        };
      }
      o.onerror = function () {
        e.j.error(
          "Could not clear object stores on indexedDB " + e.database.od,
        );
      };
    });
  }
}
Oe.ep = {
  Ft: {
    od: "AppboyServiceWorkerAsyncStorage",
    VERSION: 6,
    Jt: {
      Ja: "data",
      kr: "pushClicks",
      cu: "pushSubscribed",
      dd: "fallbackDevice",
      qt: "cardUpdates",
      se: "optOut",
      wr: "pendingData",
      qh: "sdkAuthenticationSignature",
    },
    ie: 1,
  },
};

const Ue = {
  init: function (n) {
    (void 0 === n && void 0 !== Ue.zg) || (Ue.zg = !!n), Ue.t || (Ue.t = !0);
  },
  destroy: function () {
    (Ue.t = !1), (Ue.zg = void 0), (Ue.j = void 0);
  },
  setLogger: function (n) {
    "function" == typeof n
      ? (Ue.init(), (Ue.j = n))
      : Ue.info("Ignoring setLogger call since logger is not a function");
  },
  toggleLogging: function () {
    Ue.init(),
      Ue.zg
        ? (console.log("Disabling Braze logging"), (Ue.zg = !1))
        : (console.log("Enabled Braze logging"), (Ue.zg = !0));
  },
  info: function (n) {
    if (Ue.zg) {
      const o = "Braze: " + n;
      null != Ue.j ? Ue.j(o) : console.log(o);
    }
  },
  warn: function (n) {
    if (Ue.zg) {
      const o = "Braze SDK Warning: " + n + " (v4.9.0)";
      null != Ue.j ? Ue.j(o) : console.warn(o);
    }
  },
  error: function (n) {
    if (Ue.zg) {
      const o = "Braze SDK Error: " + n + " (v4.9.0)";
      null != Ue.j ? Ue.j(o) : console.error(o);
    }
  },
};

var ke = {
  ho: "allowCrawlerActivity",
  Eo: "baseUrl",
  _o: "noCookies",
  Io: "devicePropertyAllowlist",
  Aa: "disablePushTokenMaintenance",
  Ao: "enableLogging",
  So: "enableSdkAuthentication",
  qa: "manageServiceWorkerExternally",
  No: "minimumIntervalBetweenTriggerActionsInSeconds",
  wo: "sessionTimeoutInSeconds",
  Oo: "appVersion",
  _a: "serviceWorkerLocation",
  ka: "safariWebsitePushId",
  Ba: "localization",
  po: "contentSecurityNonce",
  Co: "enableHtmlInAppMessages",
  Lo: "allowUserSuppliedJavascript",
  lo: "inAppMessageZIndex",
  fo: "openInAppMessagesInNewTab",
  en: "openNewsFeedCardsInNewTab",
  mh: "requireExplicitInAppMessageDismissal",
  Po: "doNotLoadFontAwesome",
  Ro: "sdkFlavor",
  tn: "openCardsInNewTab",
};

const r = { On: ve, q: De, Cr: Be, Z: Ge, xt: Oe, zt: Oe.ep, j: Ue, Jo: ke };
var r$1 = r;

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
function validateValueIsFromEnum(t, e, n, o) {
  const c = values(t);
  return (
    -1 !== c.indexOf(e) ||
    (r$1.j.error(`${n} Valid values from ${o} are "${c.join('"/"')}".`), !1)
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
function intersection(t, ...e) {
  null == t && (t = []);
  const r = [],
    n = arguments.length;
  for (let e = 0, o = t.length; e < o; e++) {
    const o = t[e];
    if (-1 !== r.indexOf(o)) continue;
    let c = 1;
    for (c = 1; c < n && -1 !== arguments[c].indexOf(o); c++);
    c === n && r.push(o);
  }
  return r;
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
const MUST_BE_IN_APP_MESSAGE_WARNING =
  "inAppMessage must be an InAppMessage object";
const MUST_BE_CARD_WARNING_SUFFIX = "must be a Card object";
const FEED_ANIMATION_DURATION = 500;
const LOG_CUSTOM_EVENT_STRING = "logCustomEvent";
const SET_CUSTOM_USER_ATTRIBUTE_STRING = "setCustomUserAttribute";
const BRAZE_MUST_BE_INITIALIZED_ERROR =
  "Braze must be initialized before calling methods.";
const CONTENT_CARDS_RATE_LIMIT_CAPACITY_DEFAULT = 5;
const CONTENT_CARDS_RATE_LIMIT_REFILL_RATE_DEFAULT = 90;
const LAST_REQUEST_TO_ENDPOINT_MS_AGO_DEFAULT = 72e5;
const MAX_ERROR_RETRIES_CONTENT_CARDS = 3;
const REQUEST_ATTEMPT_DEFAULT = 1;

class E {
  constructor() {
    this.Ve = {};
  }
  lt(t) {
    if ("function" != typeof t) return null;
    const i = r$1.Z.Y();
    return (this.Ve[i] = t), i;
  }
  removeSubscription(t) {
    delete this.Ve[t];
  }
  removeAllSubscriptions() {
    this.Ve = {};
  }
  ic() {
    return Object.keys(this.Ve).length;
  }
  Et(t) {
    const i = [];
    for (const r in this.Ve) {
      const s = this.Ve[r];
      i.push(s(t));
    }
    return i;
  }
}

class Card {
  constructor(t, i, s, h, n, l, e, r, u, E, o, T, I, a, N, c) {
    (this.id = t),
      (this.viewed = i),
      (this.title = s),
      (this.imageUrl = h),
      (this.description = n),
      (this.created = l),
      (this.updated = e),
      (this.categories = r),
      (this.expiresAt = u),
      (this.url = E),
      (this.linkText = o),
      (this.aspectRatio = T),
      (this.extras = I),
      (this.pinned = a),
      (this.dismissible = N),
      (this.clicked = c),
      (this.id = t),
      (this.viewed = i || !1),
      (this.title = s || ""),
      (this.imageUrl = h),
      (this.description = n || ""),
      (this.created = l || null),
      (this.updated = e || null),
      (this.categories = r || []),
      (this.expiresAt = u || null),
      (this.url = E),
      (this.linkText = o),
      null == T
        ? (this.aspectRatio = null)
        : ((T = parseFloat(T.toString())),
          (this.aspectRatio = isNaN(T) ? null : T)),
      (this.extras = I || {}),
      (this.pinned = a || !1),
      (this.dismissible = N || !1),
      (this.dismissed = !1),
      (this.clicked = c || !1),
      (this.isControl = !1),
      (this.test = !1),
      (this.ht = null),
      (this.nt = null);
  }
  subscribeToClickedEvent(t) {
    return this.et().lt(t);
  }
  subscribeToDismissedEvent(t) {
    return this.rt().lt(t);
  }
  removeSubscription(t) {
    this.et().removeSubscription(t), this.rt().removeSubscription(t);
  }
  removeAllSubscriptions() {
    this.et().removeAllSubscriptions(), this.rt().removeAllSubscriptions();
  }
  dismissCard() {
    if (!this.dismissible || this.dismissed) return;
    "function" == typeof this.logCardDismissal && this.logCardDismissal();
    let t = this._;
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
            }, Card.ut));
        }, FEED_ANIMATION_DURATION));
  }
  et() {
    return null == this.ht && (this.ht = new E()), this.ht;
  }
  rt() {
    return null == this.nt && (this.nt = new E()), this.nt;
  }
  M() {
    this.viewed = !0;
  }
  p() {
    (this.viewed = !0), (this.clicked = !0), this.et().Et();
  }
  F() {
    return (
      !(!this.dismissible || this.dismissed) &&
      ((this.dismissed = !0), this.rt().Et(), !0)
    );
  }
  ot(t) {
    if (null == t || t[Card.Tt.ns] !== this.id) return !0;
    if (t[Card.Tt.It]) return !1;
    if (
      null != t[Card.Tt.us] &&
      null != this.updated &&
      parseInt(t[Card.Tt.us]) < convertMsToSeconds(this.updated.valueOf())
    )
      return !0;
    if (
      (t[Card.Tt.ls] && !this.viewed && (this.viewed = !0),
      t[Card.Tt.ys] && !this.clicked && (this.clicked = t[Card.Tt.ys]),
      null != t[Card.Tt.st] && (this.title = t[Card.Tt.st]),
      null != t[Card.Tt.os] && (this.imageUrl = t[Card.Tt.os]),
      null != t[Card.Tt.it] && (this.description = t[Card.Tt.it]),
      null != t[Card.Tt.us])
    ) {
      const i = dateFromUnixTimestamp(t[Card.Tt.us]);
      null != i && (this.updated = i);
    }
    if (null != t[Card.Tt.ds]) {
      let i;
      (i = t[Card.Tt.ds] === Card.Nt ? null : dateFromUnixTimestamp(t[Card.Tt.ds])),
        (this.expiresAt = i);
    }
    if (
      (null != t[Card.Tt.URL] && (this.url = t[Card.Tt.URL]),
      null != t[Card.Tt.ps] && (this.linkText = t[Card.Tt.ps]),
      null != t[Card.Tt.fs])
    ) {
      const i = parseFloat(t[Card.Tt.fs].toString());
      this.aspectRatio = isNaN(i) ? null : i;
    }
    return (
      null != t[Card.Tt.xs] && (this.extras = t[Card.Tt.xs]),
      null != t[Card.Tt.gs] && (this.pinned = t[Card.Tt.gs]),
      null != t[Card.Tt.js] && (this.dismissible = t[Card.Tt.js]),
      null != t[Card.Tt.zs] && (this.test = t[Card.Tt.zs]),
      !0
    );
  }
  ss() {
    throw new Error("Must be implemented in a subclass");
  }
}
(Card.Nt = -1),
  (Card.Tt = {
    ns: "id",
    ls: "v",
    js: "db",
    It: "r",
    us: "ca",
    gs: "p",
    ds: "ea",
    xs: "e",
    ts: "tp",
    os: "i",
    st: "tt",
    it: "ds",
    URL: "u",
    ps: "dm",
    fs: "ar",
    ys: "cl",
    zs: "t",
  }),
  (Card.es = {
    tt: "captioned_image",
    ct: "text_announcement",
    St: "short_news",
    rs: "banner_image",
    At: "control",
  }),
  (Card.hs = {
    ns: "id",
    ls: "v",
    js: "db",
    cs: "cr",
    us: "ca",
    gs: "p",
    bs: "t",
    ds: "ea",
    xs: "e",
    ts: "tp",
    os: "i",
    st: "tt",
    it: "ds",
    URL: "u",
    ps: "dm",
    fs: "ar",
    ys: "cl",
    zs: "s",
  }),
  (Card.Dt = {
    dt: "ADVERTISING",
    Ct: "ANNOUNCEMENTS",
    Rt: "NEWS",
    bt: "SOCIAL",
  }),
  (Card.ut = 400);

class Banner extends Card {
  constructor(s, t, i, h, r, e, n, a, l, o, u, c, b, d) {
    super(s, t, null, i, null, h, r, e, n, a, l, o, u, c, b, d),
      (this.U = "ab-banner ab-image-only"),
      (this.V = !1),
      (this.test = !1);
  }
  ss() {
    const s = {};
    return (
      (s[Card.hs.ts] = Card.es.rs),
      (s[Card.hs.ns] = this.id),
      (s[Card.hs.ls] = this.viewed),
      (s[Card.hs.os] = this.imageUrl),
      (s[Card.hs.us] = this.updated),
      (s[Card.hs.cs] = this.created),
      (s[Card.hs.bs] = this.categories),
      (s[Card.hs.ds] = this.expiresAt),
      (s[Card.hs.URL] = this.url),
      (s[Card.hs.ps] = this.linkText),
      (s[Card.hs.fs] = this.aspectRatio),
      (s[Card.hs.xs] = this.extras),
      (s[Card.hs.gs] = this.pinned),
      (s[Card.hs.js] = this.dismissible),
      (s[Card.hs.ys] = this.clicked),
      (s[Card.hs.zs] = this.test),
      s
    );
  }
}

class ImageOnly extends Banner {
  constructor(s, t, i, h, r, e, a, n, o, c, m, b, l, p) {
    super(s, t, i, h, r, e, a, n, o, c, m, b, l, p),
      (this.U = "ab-banner ab-image-only"),
      (this.V = !1),
      (this.test = !1);
  }
  ss() {
    const s = {};
    return (
      (s[Card.hs.ts] = Card.es.rs),
      (s[Card.hs.ns] = this.id),
      (s[Card.hs.ls] = this.viewed),
      (s[Card.hs.os] = this.imageUrl),
      (s[Card.hs.us] = this.updated),
      (s[Card.hs.cs] = this.created),
      (s[Card.hs.bs] = this.categories),
      (s[Card.hs.ds] = this.expiresAt),
      (s[Card.hs.URL] = this.url),
      (s[Card.hs.ps] = this.linkText),
      (s[Card.hs.fs] = this.aspectRatio),
      (s[Card.hs.xs] = this.extras),
      (s[Card.hs.gs] = this.pinned),
      (s[Card.hs.js] = this.dismissible),
      (s[Card.hs.ys] = this.clicked),
      (s[Card.hs.zs] = this.test),
      s
    );
  }
}

class CaptionedImage extends Card {
  constructor(t, s, i, h, e, r, a, o, c, n, d, p, u, l, m, f) {
    super(t, s, i, h, e, r, a, o, c, n, d, p, u, l, m, f),
      (this.U = "ab-captioned-image"),
      (this.V = !0),
      (this.test = !1);
  }
  ss() {
    const t = {};
    return (
      (t[Card.hs.ts] = Card.es.tt),
      (t[Card.hs.ns] = this.id),
      (t[Card.hs.ls] = this.viewed),
      (t[Card.hs.st] = this.title),
      (t[Card.hs.os] = this.imageUrl),
      (t[Card.hs.it] = this.description),
      (t[Card.hs.us] = this.updated),
      (t[Card.hs.cs] = this.created),
      (t[Card.hs.bs] = this.categories),
      (t[Card.hs.ds] = this.expiresAt),
      (t[Card.hs.URL] = this.url),
      (t[Card.hs.ps] = this.linkText),
      (t[Card.hs.fs] = this.aspectRatio),
      (t[Card.hs.xs] = this.extras),
      (t[Card.hs.gs] = this.pinned),
      (t[Card.hs.js] = this.dismissible),
      (t[Card.hs.ys] = this.clicked),
      (t[Card.hs.zs] = this.test),
      t
    );
  }
}

class ClassicCard extends Card {
  constructor(s, t, i, h, r, c, e, a, o, d, l, n, u, p, f, m) {
    super(s, t, i, h, r, c, e, a, o, d, l, n, u, p, f, m),
      (this.U = "ab-classic-card"),
      (this.V = !0);
  }
  ss() {
    const s = {};
    return (
      (s[Card.hs.ts] = Card.es.St),
      (s[Card.hs.ns] = this.id),
      (s[Card.hs.ls] = this.viewed),
      (s[Card.hs.st] = this.title),
      (s[Card.hs.os] = this.imageUrl),
      (s[Card.hs.it] = this.description),
      (s[Card.hs.us] = this.updated),
      (s[Card.hs.cs] = this.created),
      (s[Card.hs.bs] = this.categories),
      (s[Card.hs.ds] = this.expiresAt),
      (s[Card.hs.URL] = this.url),
      (s[Card.hs.ps] = this.linkText),
      (s[Card.hs.fs] = this.aspectRatio),
      (s[Card.hs.xs] = this.extras),
      (s[Card.hs.gs] = this.pinned),
      (s[Card.hs.js] = this.dismissible),
      (s[Card.hs.ys] = this.clicked),
      (s[Card.hs.zs] = this.test),
      s
    );
  }
}

class ControlCard extends Card {
  constructor(l, t, s, i, n, r) {
    super(l, t, null, null, null, null, s, null, i, null, null, null, n, r),
      (this.isControl = !0),
      (this.U = "ab-control-card"),
      (this.V = !1);
  }
  ss() {
    const l = {};
    return (
      (l[Card.hs.ts] = Card.es.At),
      (l[Card.hs.ns] = this.id),
      (l[Card.hs.ls] = this.viewed),
      (l[Card.hs.us] = this.updated),
      (l[Card.hs.ds] = this.expiresAt),
      (l[Card.hs.xs] = this.extras),
      (l[Card.hs.gs] = this.pinned),
      (l[Card.hs.zs] = this.test),
      l
    );
  }
}

class be {
  constructor(t, i, s, r, e) {
    (this.userId = t),
      (this.type = i),
      (this.time = s),
      (this.sessionId = r),
      (this.data = e),
      (this.userId = t),
      (this.type = i),
      (this.time = timestampOrNow(s)),
      (this.sessionId = r),
      (this.data = e);
  }
  Kr() {
    const t = {
      name: this.type,
      time: convertMsToSeconds(this.time),
      data: this.data || {},
      session_id: this.sessionId,
      user_id: void 0,
    };
    return null != this.userId && (t.user_id = this.userId), t;
  }
  ss() {
    return {
      u: this.userId,
      t: this.type,
      ts: this.time,
      s: this.sessionId,
      d: this.data,
    };
  }
  static fromJson(t) {
    return new be(t.user_id, t.name, t.time, t.session_id, t.data);
  }
  static TE(t) {
    return null != t && isObject$1(t) && null != t.t && "" !== t.t;
  }
  static Yn(t) {
    return new be(t.u, t.t, t.ts, t.s, t.d);
  }
}

class _t {
  constructor(t, i, s) {
    (this.iu = t),
      null == t && (t = r$1.Z.Y()),
      !s || isNaN(s) ? (this.vl = new Date().valueOf()) : (this.vl = s),
      (this.iu = t),
      (this.Nl = new Date().valueOf()),
      (this.Gl = i);
  }
  ss() {
    return { g: this.iu, e: this.Gl, c: this.vl, l: this.Nl };
  }
  static Yn(t) {
    if (null == t || null == t.g) return null;
    const i = new _t(t.g, t.e, t.c);
    return (i.Nl = t.l), i;
  }
}

function getByteLength(t) {
  let e = t.length;
  for (let r = t.length - 1; r >= 0; r--) {
    const n = t.charCodeAt(r);
    n > 127 && n <= 2047 ? e++ : n > 2047 && n <= 65535 && (e += 2),
      n >= 56320 && n <= 57343 && r--;
  }
  return e;
}
function decodeBrazeActions(t) {
  try {
    t = t.replace(/-/g, "+").replace(/_/g, "/");
    const e = window.atob(t),
      r = new Uint8Array(e.length);
    for (let t = 0; t < e.length; t++) r[t] = e.charCodeAt(t);
    const n = new Uint16Array(r.buffer);
    return String.fromCharCode(...n);
  } catch (t) {
    return r$1.j.error("Unable to decode Base64: " + t), null;
  }
}

const getErrorMessage = (r) =>
  r instanceof Error ? r.message : String(r);

const BRAZE_ACTIONS = {
  types: {
    ue: "container",
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
    pe: "openLink",
    je: "openLinkInWebView",
  },
  properties: { type: "type", me: "steps", le: "args" },
};
const INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES = {
  _r: "unknownBrazeAction",
  Or: "noPushPrompt",
};
const ineligibleBrazeActionURLErrorMessage = (t, o) => {
  switch (t) {
    case INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES._r:
      return `${o} contains an unknown braze action type and will not be displayed.`;
    case INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES.Or:
      return `${o} contains a push prompt braze action, but is not eligible for a push prompt. Ignoring.`;
    default:
      return "";
  }
};
function getDecodedBrazeAction(t) {
  try {
    const o = t.match(BRAZE_ACTION_URI_REGEX),
      e = o ? o[0].length : null,
      n = e ? t.substring(e) : null;
    if (null == e || e > t.length - 1 || !n)
      return void r$1.j.error(
        `Did not find base64 encoded brazeAction in url to process : ${t}`,
      );
    const i = decodeBrazeActions(n);
    return i
      ? JSON.parse(i)
      : void r$1.j.error(`Failed to decode base64 encoded brazeAction: ${n}`);
  } catch (o) {
    return void r$1.j.error(`Failed to process brazeAction URL ${t} : ${getErrorMessage(o)}`);
  }
}
function eo(t, o) {
  let r = !1;
  if (o) for (const e of o) if (((r = r || t(e)), r)) return !0;
  return !1;
}
function containsUnknownBrazeAction(t) {
  const o = BRAZE_ACTIONS.properties.type,
    r = BRAZE_ACTIONS.properties.me;
  try {
    if (null == t) return !0;
    const e = t[o];
    return e === BRAZE_ACTIONS.types.ue
      ? eo(containsUnknownBrazeAction, t[r])
      : !isValidBrazeActionType(e);
  } catch (t) {
    return !0;
  }
}
function containsPushPrimerBrazeAction(t) {
  if (!t || !isValidBrazeActionJson(t)) return !1;
  const o = BRAZE_ACTIONS.properties.type,
    r = BRAZE_ACTIONS.properties.me,
    e = t[o];
  return e === BRAZE_ACTIONS.types.ue
    ? eo(containsPushPrimerBrazeAction, t[r])
    : e === BRAZE_ACTIONS.types.requestPushPermission;
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
];
const EMAIL_ADDRESS_REGEX = new RegExp(/^.+@.+\..+$/);
const BRAZE_ACTION_URI_REGEX = /^brazeActions:\/\/v\d+\//;
function validateCustomString(t, e, n) {
  const o =
    null != t &&
    "string" == typeof t &&
    ("" === t || null != t.match(CUSTOM_DATA_REGEX));
  return o || r$1.j.error(`Cannot ${e} because ${n} "${t}" is invalid.`), o;
}
function validateCustomAttributeKey(t) {
  return (
    null != t &&
      t.match(CUSTOM_ATTRIBUTE_SPECIAL_CHARS_REGEX) &&
      -1 === CUSTOM_ATTRIBUTE_RESERVED_OPERATORS.indexOf(t) &&
      r$1.j.warn("Custom attribute keys cannot contain '$' or '.'"),
    validateCustomString(t, "set custom user attribute", "the given key")
  );
}
function validatePropertyType(t) {
  const e = typeof t;
  return (
    null == t || "number" === e || "boolean" === e || isDate(t) || "string" === e
  );
}
function _validateNestedProperties(t, e, n) {
  const o = -1 !== n;
  if (o && n > 50)
    return (
      r$1.j.error("Nested attributes cannot be more than 50 levels deep."), !1
    );
  const i = o ? n + 1 : -1;
  if (isArray(t) && isArray(e)) {
    for (let r = 0; r < t.length && r < e.length; r++)
      if (
        (isDate(t[r]) && (e[r] = toValidBackendTimeString(t[r])),
        !_validateNestedProperties(t[r], e[r], i))
      )
        return !1;
  } else {
    if (!isObject$1(t)) return validatePropertyType(t);
    for (const r of keys(t)) {
      const n = t[r];
      if (o && !validateCustomAttributeKey(r)) return !1;
      if (isDate(n)) {
        e[r] = toValidBackendTimeString(n);
      }
      if (!_validateNestedProperties(n, e[r], i)) return !1;
    }
  }
  return !0;
}
function _validateEventPropertyValue(t, e, n, o, i) {
  let a;
  return (
    (a =
      isObject$1(t) || isArray(t)
        ? _validateNestedProperties(t, e, i ? 1 : -1)
        : validatePropertyType(t)),
    a || r$1.j.error(`Cannot ${n} because ${o} "${t}" is invalid.`),
    a
  );
}
function validateStandardString(t, e, n, o = !1) {
  const i = "string" == typeof t || (null === t && o);
  return i || r$1.j.error(`Cannot ${e} because ${n} "${t}" is invalid.`), i;
}
function validateCustomProperties(t, e, n, o, i) {
  if ((null == t && (t = {}), "object" != typeof t || isArray(t)))
    return (
      r$1.j.error(`${e} requires that ${n} be an object. Ignoring ${i}.`),
      [!1, null]
    );
  let a, s;
  e === SET_CUSTOM_USER_ATTRIBUTE_STRING ? ((a = 76800), (s = "75KB")) : ((a = 51200), (s = "50KB"));
  const u = JSON.stringify(t);
  if (getByteLength(u) > a)
    return (
      r$1.j.error(
        `Could not ${o} because ${n} was greater than the max size of ${s}.`,
      ),
      [!1, null]
    );
  let l;
  try {
    l = JSON.parse(u);
  } catch (t) {
    return (
      r$1.j.error(`Could not ${o} because ${n} did not contain valid JSON.`),
      [!1, null]
    );
  }
  for (const r in t) {
    if (e === SET_CUSTOM_USER_ATTRIBUTE_STRING && !validateCustomAttributeKey(r)) return [!1, null];
    if (!validateCustomString(r, o, `the ${i} property name`))
      return [!1, null];
    const n = t[r];
    if (e !== SET_CUSTOM_USER_ATTRIBUTE_STRING && null == n) {
      delete t[r], delete l[r];
      continue;
    }
    isDate(n) && (l[r] = toValidBackendTimeString(n));
    if (
      !_validateEventPropertyValue(
        n,
        l[r],
        o,
        `the ${i} property "${r}"`,
        e === SET_CUSTOM_USER_ATTRIBUTE_STRING,
      )
    )
      return [!1, null];
  }
  return [!0, l];
}
function validateCustomAttributeArrayType(t, e) {
  let n = !1,
    o = !1;
  const i = () => {
    r$1.j.error(
      "Custom attribute arrays must be either string arrays or object arrays.",
    );
  };
  for (const r of e)
    if ("string" == typeof r) {
      if (o) return i(), [!1, !1];
      if (
        !validateCustomString(
          r,
          `set custom user attribute "${t}"`,
          "the element in the given array",
        )
      )
        return [!1, !1];
      n = !0;
    } else {
      if (!isObject$1(r)) return i(), [!1, !1];
      if (n) return i(), [!1, !1];
      if (
        !validateCustomProperties(
          r,
          SET_CUSTOM_USER_ATTRIBUTE_STRING,
          "attribute value",
          `set custom user attribute "${t}"`,
          "custom user attribute",
        )
      )
        return [!1, !1];
      o = !0;
    }
  return [n, o];
}
function isValidEmail(t) {
  return (
    "string" == typeof t && null != t.toLowerCase().match(EMAIL_ADDRESS_REGEX)
  );
}
function isValidBrazeActionJson(t) {
  if (!(BRAZE_ACTIONS.properties.type in t)) return !1;
  switch (t[BRAZE_ACTIONS.properties.type]) {
    case BRAZE_ACTIONS.types.ue:
      if (BRAZE_ACTIONS.properties.me in t) return !0;
      break;
    case BRAZE_ACTIONS.types.logCustomEvent:
    case BRAZE_ACTIONS.types.setEmailNotificationSubscriptionType:
    case BRAZE_ACTIONS.types.setPushNotificationSubscriptionType:
    case BRAZE_ACTIONS.types.setCustomUserAttribute:
    case BRAZE_ACTIONS.types.addToSubscriptionGroup:
    case BRAZE_ACTIONS.types.removeFromSubscriptionGroup:
    case BRAZE_ACTIONS.types.addToCustomAttributeArray:
    case BRAZE_ACTIONS.types.removeFromCustomAttributeArray:
    case BRAZE_ACTIONS.types.pe:
    case BRAZE_ACTIONS.types.je:
      if (BRAZE_ACTIONS.properties.le in t) return !0;
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

class User {
  constructor(t, e) {
    (this.ft = t), (this.ki = e), (this.ft = t), (this.ki = e);
  }
  getUserId(t) {
    null == t &&
      r$1.j.error(
        "getUserId must be supplied with a callback. e.g., braze.getUser().getUserId(function(userId) {console.log('the user id is ' + userId)})",
      ),
      "function" == typeof t && t(this.ft.getUserId());
  }
  addAlias(t, e) {
    return !validateStandardString(t, "add alias", "the alias", !1) || t.length <= 0
      ? (r$1.j.error("addAlias requires a non-empty alias"), !1)
      : !validateStandardString(e, "add alias", "the label", !1) || e.length <= 0
      ? (r$1.j.error("addAlias requires a non-empty label"), !1)
      : this.ki.$n(t, e).O;
  }
  setFirstName(t) {
    return (
      !!validateStandardString(t, "set first name", "the firstName", !0) &&
      this.ft.nu("first_name", t)
    );
  }
  setLastName(t) {
    return (
      !!validateStandardString(t, "set last name", "the lastName", !0) && this.ft.nu("last_name", t)
    );
  }
  setEmail(t) {
    return null === t || isValidEmail(t)
      ? this.ft.nu("email", t)
      : (r$1.j.error(
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
      ) && this.ft.nu("gender", t)
    );
  }
  setDateOfBirth(t, e, s) {
    return null === t && null === e && null === s
      ? this.ft.nu("dob", null)
      : ((t = null != t ? parseInt(t.toString()) : null),
        (e = null != e ? parseInt(e.toString()) : null),
        (s = null != s ? parseInt(s.toString()) : null),
        null == t ||
        null == e ||
        null == s ||
        isNaN(t) ||
        isNaN(e) ||
        isNaN(s) ||
        e > 12 ||
        e < 1 ||
        s > 31 ||
        s < 1
          ? (r$1.j.error(
              "Cannot set date of birth - parameters should comprise a valid date e.g. setDateOfBirth(1776, 7, 4);",
            ),
            !1)
          : this.ft.nu("dob", `${t}-${e}-${s}`));
  }
  setCountry(t) {
    return !!validateStandardString(t, "set country", "the country", !0) && this.ft.nu("country", t);
  }
  setHomeCity(t) {
    return (
      !!validateStandardString(t, "set home city", "the homeCity", !0) && this.ft.nu("home_city", t)
    );
  }
  setLanguage(t) {
    return (
      !!validateStandardString(t, "set language", "the language", !0) && this.ft.nu("language", t)
    );
  }
  setEmailNotificationSubscriptionType(t) {
    return (
      !!validateValueIsFromEnum(
        User.NotificationSubscriptionTypes,
        t,
        `Email notification setting "${t}" is not a valid subscription type.`,
        "User.NotificationSubscriptionTypes",
      ) && this.ft.nu("email_subscribe", t)
    );
  }
  setPushNotificationSubscriptionType(t) {
    return (
      !!validateValueIsFromEnum(
        User.NotificationSubscriptionTypes,
        t,
        `Push notification setting "${t}" is not a valid subscription type.`,
        "User.NotificationSubscriptionTypes",
      ) && this.ft.nu("push_subscribe", t)
    );
  }
  setPhoneNumber(t) {
    return (
      !!validateStandardString(t, "set phone number", "the phoneNumber", !0) &&
      (null === t || t.match(User.Ln)
        ? this.ft.nu("phone", t)
        : (r$1.j.error(
            `Cannot set phone number - "${t}" did not pass validation.`,
          ),
          !1))
    );
  }
  setLastKnownLocation(t, e, s, i, n) {
    return null == t || null == e
      ? (r$1.j.error(
          "Cannot set last-known location - latitude and longitude are required.",
        ),
        !1)
      : ((t = parseFloat(t.toString())),
        (e = parseFloat(e.toString())),
        null != s && (s = parseFloat(s.toString())),
        null != i && (i = parseFloat(i.toString())),
        null != n && (n = parseFloat(n.toString())),
        isNaN(t) ||
        isNaN(e) ||
        (null != s && isNaN(s)) ||
        (null != i && isNaN(i)) ||
        (null != n && isNaN(n))
          ? (r$1.j.error(
              "Cannot set last-known location - all supplied parameters must be numeric.",
            ),
            !1)
          : t > 90 || t < -90 || e > 180 || e < -180
          ? (r$1.j.error(
              "Cannot set last-known location - latitude and longitude are bounded by ±90 and ±180 respectively.",
            ),
            !1)
          : (null != s && s < 0) || (null != n && n < 0)
          ? (r$1.j.error(
              "Cannot set last-known location - accuracy and altitudeAccuracy may not be negative.",
            ),
            !1)
          : this.ki.setLastKnownLocation(this.ft.getUserId(), t, e, i, s, n).O);
  }
  setCustomUserAttribute(t, e, s) {
    if (!validateCustomAttributeKey(t)) return !1;
    const i = (e) => {
      const [r] = validateCustomProperties(
        e,
        SET_CUSTOM_USER_ATTRIBUTE_STRING,
        "attribute value",
        `set custom user attribute "${t}"`,
        "custom user attribute",
      );
      return r;
    };
    if (isArray(e)) {
      const [s, n] = validateCustomAttributeArrayType(t, e);
      if (!s && !n && 0 !== e.length) return !1;
      if (s || 0 === e.length) return this.ki.Gn(r$1.q.Hn, t, e).O;
      for (const t of e) if (!i(t)) return !1;
    } else if (isObject$1(e)) {
      if (!i(e)) return !1;
      if (s) return this.ki.Gn(r$1.q.Kn, t, e).O;
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
    return this.ft.setCustomUserAttribute(t, e);
  }
  addToCustomAttributeArray(t, e) {
    return (
      !!validateCustomString(t, "add to custom user attribute array", "the given key") &&
      !(
        null != e &&
        !validateCustomString(e, "add to custom user attribute array", "the given value")
      ) &&
      this.ki.Gn(r$1.q.Jn, t, e).O
    );
  }
  removeFromCustomAttributeArray(t, e) {
    return (
      !!validateCustomString(t, "remove from custom user attribute array", "the given key") &&
      !(
        null != e &&
        !validateCustomString(e, "remove from custom user attribute array", "the given value")
      ) &&
      this.ki.Gn(r$1.q.Qn, t, e).O
    );
  }
  incrementCustomUserAttribute(t, e) {
    if (!validateCustomString(t, "increment custom user attribute", "the given key")) return !1;
    null == e && (e = 1);
    const s = parseInt(e.toString());
    return isNaN(s) || s !== parseFloat(e.toString())
      ? (r$1.j.error(
          `Cannot increment custom user attribute because the given incrementValue "${e}" is not an integer.`,
        ),
        !1)
      : this.ki.Gn(r$1.q.Xn, t, s).O;
  }
  setCustomLocationAttribute(t, e, s) {
    return (
      !!validateCustomString(t, "set custom location attribute", "the given key") &&
      ((null !== e || null !== s) &&
      ((e = null != e ? parseFloat(e.toString()) : null),
      (s = null != s ? parseFloat(s.toString()) : null),
      (null == e && null != s) ||
        (null != e && null == s) ||
        (null != e && (isNaN(e) || e > 90 || e < -90)) ||
        (null != s && (isNaN(s) || s > 180 || s < -180)))
        ? (r$1.j.error(
            "Received invalid values for latitude and/or longitude. Latitude and longitude are bounded by ±90 and ±180 respectively, or must both be null for removal.",
          ),
          !1)
        : this.ki.Zn(t, e, s).O)
    );
  }
  addToSubscriptionGroup(t) {
    return !validateStandardString(
      t,
      "add user to subscription group",
      "subscription group ID",
      !1,
    ) || t.length <= 0
      ? (r$1.j.error(
          "addToSubscriptionGroup requires a non-empty subscription group ID",
        ),
        !1)
      : this.ki.au(t, User.du.SUBSCRIBED).O;
  }
  removeFromSubscriptionGroup(t) {
    return !validateStandardString(
      t,
      "remove user from subscription group",
      "subscription group ID",
      !1,
    ) || t.length <= 0
      ? (r$1.j.error(
          "removeFromSubscriptionGroup requires a non-empty subscription group ID",
        ),
        !1)
      : this.ki.au(t, User.du.UNSUBSCRIBED).O;
  }
  _n(t, e, r, s, i) {
    this.ft._n(t, e, r, s, i), this.ki.pu();
  }
  Nn(t) {
    this.ft.Nn(t);
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
  (User.Ln = /^[0-9 .\\(\\)\\+\\-]+$/),
  (User.du = { SUBSCRIBED: "subscribed", UNSUBSCRIBED: "unsubscribed" }),
  (User.bu = "user_id"),
  (User.lu = "custom"),
  (User.lr = 997);

class ge {
  constructor() {}
  tf() {}
  ef() {}
  Ia(t) {}
  static rf(t, e) {
    if (t && e)
      if (((t = t.toLowerCase()), isArray(e.if))) {
        for (let r = 0; r < e.if.length; r++)
          if (-1 !== t.indexOf(e.if[r].toLowerCase())) return e.identity;
      } else if (-1 !== t.indexOf(e.if.toLowerCase())) return e.identity;
  }
}

const Browsers = {
  pE: "Chrome",
  xE: "Edge",
  Ku: "Internet Explorer",
  FE: "Opera",
  Bg: "Safari",
  ME: "Firefox",
};
const OperatingSystems = {
  xg: "Android",
  de: "iOS",
  kg: "Mac",
  Pg: "Windows",
};

class ni extends ge {
  constructor() {
    if (
      (super(),
      (this.userAgentData = navigator.userAgentData),
      (this.browser = null),
      (this.version = null),
      this.userAgentData)
    ) {
      const t = this.Uu();
      (this.browser = t.browser || "Unknown Browser"),
        (this.version = t.version || "Unknown Version");
    }
    this.OS = null;
  }
  tf() {
    return this.browser;
  }
  ef() {
    return this.version;
  }
  Ia(t) {
    if (this.OS) return Promise.resolve(this.OS);
    const s = (s) => {
      for (let r = 0; r < t.length; r++) {
        const i = ni.rf(s, t[r]);
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
  Uu() {
    const t = {},
      s = this.userAgentData.brands;
    if (s && s.length)
      for (const r of s) {
        const s = this.Ou(Browsers),
          i = r.brand.match(s);
        if (i && i.length > 0) {
          (t.browser = i[0]), (t.version = r.version);
          break;
        }
      }
    return t;
  }
  Ou(t) {
    const s = [];
    for (const r in t) {
      const i = r;
      t[i] !== Browsers.Ku && s.push(t[i]);
    }
    return new RegExp("(" + s.join("|") + ")", "i");
  }
  getHighEntropyValues() {
    return this.userAgentData.getHighEntropyValues
      ? this.userAgentData.getHighEntropyValues(["platform"])
      : Promise.reject();
  }
}

class ai extends ge {
  constructor() {
    super(), (this.rd = ai.Uu(navigator.userAgent || ""));
  }
  tf() {
    return this.rd[0] || "Unknown Browser";
  }
  ef() {
    return this.rd[1] || "Unknown Version";
  }
  Ia(r) {
    for (let n = 0; n < r.length; n++) {
      const e = r[n].string;
      let i = ai.rf(e, r[n]);
      if (i)
        return (
          i === OperatingSystems.kg && navigator.maxTouchPoints > 1 && (i = OperatingSystems.de),
          Promise.resolve(i)
        );
    }
    return Promise.resolve(navigator.platform);
  }
  static Uu(r) {
    let n,
      e =
        r.match(
          /(samsungbrowser|tizen|roku|konqueror|icab|crios|opera|ucbrowser|chrome|safari|firefox|camino|msie|trident(?=\/))\/?\s*(\.?\d+(\.\d+)*)/i,
        ) || [];
    if (e[1] && /trident/i.test(e[1]))
      return (
        (n = /\brv[ :]+(\.?\d+(\.\d+)*)/g.exec(r) || []), [Browsers.Ku, n[1] || ""]
      );
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
    if (
      e[1] === Browsers.pE &&
      ((n = r.match(/\b(OPR|Edge|EdgA|Edg|UCBrowser)\/(\.?\d+(\.\d+)*)/)),
      null != n)
    )
      return (
        (n = n.slice(1)),
        (n[0] = n[0].replace("OPR", Browsers.FE)),
        (n[0] = n[0].replace("EdgA", Browsers.xE)),
        "Edg" === n[0] && (n[0] = Browsers.xE),
        [n[0], n[1]]
      );
    if (
      e[1] === Browsers.Bg &&
      ((n = r.match(/\b(EdgiOS)\/(\.?\d+(\.\d+)*)/)), null != n)
    )
      return (
        (n = n.slice(1)), (n[0] = n[0].replace("EdgiOS", Browsers.xE)), [n[0], n[1]]
      );
    if (
      ((e = e[2] ? [e[1], e[2]] : [null, null]),
      e[0] === Browsers.Bg &&
        null != (n = r.match(/version\/(\.?\d+(\.\d+)*)/i)) &&
        e.splice(1, 1, n[1]),
      null != (n = r.match(/\b(UCBrowser)\/(\.?\d+(\.\d+)*)/)) &&
        e.splice(1, 1, n[2]),
      e[0] === Browsers.FE && null != (n = r.match(/mini\/(\.?\d+(\.\d+)*)/i)))
    )
      return ["Opera Mini", n[1] || ""];
    if (e[0]) {
      const r = e[0].toLowerCase();
      "msie" === r && (e[0] = Browsers.Ku),
        "crios" === r && (e[0] = Browsers.pE),
        "tizen" === r && ((e[0] = "Samsung Smart TV"), (e[1] = null)),
        "samsungbrowser" === r && (e[0] = "Samsung Browser");
    }
    return e;
  }
}

class gi {
  constructor() {
    const t = navigator.userAgentData ? ni : ai;
    (this.Sg = new t()),
      (this.userAgent = navigator.userAgent),
      (this.browser = this.Sg.tf()),
      (this.version = this.Sg.ef()),
      (this.OS = null),
      this.Ia().then((t) => (this.OS = t));
    const i = navigator;
    (this.language = (
      i.userLanguage ||
      i.language ||
      i.browserLanguage ||
      i.systemLanguage ||
      ""
    ).toLowerCase()),
      (this.$o = gi.vg(this.userAgent));
  }
  OE() {
    return this.browser === Browsers.Bg;
  }
  Oa() {
    return this.OS || null;
  }
  Ia() {
    return this.OS
      ? Promise.resolve(this.OS)
      : this.Sg.Ia(gi.Og).then((t) => ((this.OS = t), t));
  }
  static vg(t) {
    t = t.toLowerCase();
    const i = [
      "googlebot",
      "bingbot",
      "slurp",
      "duckduckbot",
      "baiduspider",
      "yandex",
      "facebookexternalhit",
      "sogou",
      "ia_archiver",
      "https://github.com/prerender/prerender",
      "aolbuild",
      "bingpreview",
      "msnbot",
      "adsbot",
      "mediapartners-google",
      "teoma",
    ];
    for (let n = 0; n < i.length; n++) if (-1 !== t.indexOf(i[n])) return !0;
    return !1;
  }
}
gi.Og = [
  { string: navigator.platform, if: "Win", identity: OperatingSystems.Pg },
  { string: navigator.platform, if: "Mac", identity: OperatingSystems.kg },
  { string: navigator.platform, if: "BlackBerry", identity: "BlackBerry" },
  { string: navigator.platform, if: "FreeBSD", identity: "FreeBSD" },
  { string: navigator.platform, if: "OpenBSD", identity: "OpenBSD" },
  { string: navigator.platform, if: "Nintendo", identity: "Nintendo" },
  { string: navigator.platform, if: "SunOS", identity: "SunOS" },
  { string: navigator.platform, if: "PlayStation", identity: "PlayStation" },
  { string: navigator.platform, if: "X11", identity: "X11" },
  {
    string: navigator.userAgent,
    if: ["iPhone", "iPad", "iPod"],
    identity: OperatingSystems.de,
  },
  { string: navigator.platform, if: "Pike v", identity: OperatingSystems.de },
  { string: navigator.userAgent, if: ["Web0S"], identity: "WebOS" },
  {
    string: navigator.platform,
    if: ["Linux armv7l", "Android"],
    identity: OperatingSystems.xg,
  },
  { string: navigator.userAgent, if: ["Android"], identity: OperatingSystems.xg },
  { string: navigator.platform, if: "Linux", identity: "Linux" },
];
const V = new gi();

const STORAGE_KEYS = {
  eu: {
    su: "ab.storage.userId",
    Xo: "ab.storage.deviceId",
    Dl: "ab.storage.sessionId",
  },
  k: {
    ec: "ab.test",
    tE: "ab.storage.events",
    eE: "ab.storage.attributes",
    sE: "ab.storage.attributes.anonymous_user",
    Ca: "ab.storage.device",
    Xa: "ab.storage.sdk_metadata",
    Ea: "ab.storage.session_id_for_cached_metadata",
    Bn: "ab.storage.pushToken",
    Bi: "ab.storage.newsFeed",
    Ei: "ab.storage.lastNewsFeedRefresh",
    L: "ab.storage.cardImpressions",
    hl: "ab.storage.serverConfig",
    rE: "ab.storage.triggers",
    oE: "ab.storage.triggers.ts",
    zl: "ab.storage.messagingSessionStart",
    Yt: "ab.storage.cc",
    ws: "ab.storage.ccLastFullSync",
    vs: "ab.storage.ccLastCardUpdated",
    Vs: "ab.storage.ccLastClientRequest",
    ci: "ab.storage.ccRateLimitCurrentTokenCount",
    C: "ab.storage.ccClicks",
    K: "ab.storage.ccImpressions",
    G: "ab.storage.ccDismissals",
    nE: "ab.storage.lastDisplayedTriggerTimesById",
    iE: "ab.storage.lastDisplayedTriggerTime",
    aE: "ab.storage.triggerFireInstancesById",
    xh: "ab.storage.signature",
    Ls: "ab.storage.brazeSyncRetryCount",
    Ss: "ab.storage.sdkVersion",
    Ri: "ab.storage.ff",
    qi: "ab.storage.ffImpressions",
    Ui: "ab.storage.ffLastRefreshAt",
    EE: "ab.storage.lastReqToEndpoint",
    lE: "ab.storage.requestAttempts",
    rn: "ab.storage.deferredIam",
  },
  re: "ab.optOut",
};
class O {
  constructor(t, e) {
    (this.SE = t), (this._E = e), (this.SE = t), (this._E = e);
  }
  xo(t) {
    const e = keys(STORAGE_KEYS.eu),
      s = new O.ee(t);
    for (const t of e) s.remove(STORAGE_KEYS.eu[t]);
  }
  uu(t, e) {
    let s = null;
    null != e && e instanceof _t && (s = e.ss()), this.SE.store(t, s);
  }
  uE(t) {
    const e = this.tu(t);
    null != e && ((e.Nl = new Date().valueOf()), this.uu(t, e));
  }
  tu(t) {
    return _t.Yn(this.SE.jr(t));
  }
  ql(t) {
    this.SE.remove(t);
  }
  bo(t) {
    let e;
    if (null == t || 0 === t.length) return !1;
    e = isArray(t) ? t : [t];
    let s = this._E.jr(STORAGE_KEYS.k.tE);
    (null != s && isArray(s)) || (s = []);
    for (let t = 0; t < e.length; t++) s.push(e[t].ss());
    return this._E.store(STORAGE_KEYS.k.tE, s);
  }
  Hl(t) {
    return null != t && this.bo([t]);
  }
  cE() {
    let t = this._E.jr(STORAGE_KEYS.k.tE);
    this._E.remove(STORAGE_KEYS.k.tE), null == t && (t = []);
    const e = [];
    let s = !1,
      o = null;
    if (isArray(t))
      for (let s = 0; s < t.length; s++)
        be.TE(t[s]) ? e.push(be.Yn(t[s])) : (o = s);
    else s = !0;
    if (s || null != o) {
      let n = "Stored events could not be deserialized as Events";
      s &&
        (n += ", was " + Object.prototype.toString.call(t) + " not an array"),
        null != o &&
          (n += ", value at index " + o + " does not look like an event"),
        (n +=
          ", serialized values were of type " +
          typeof t +
          ": " +
          JSON.stringify(t)),
        e.push(new be(null, r$1.q.qs, new Date().valueOf(), null, { e: n }));
    }
    return e;
  }
  D(t, e) {
    return (
      !!validateValueIsFromEnum(
        STORAGE_KEYS.k,
        t,
        "StorageManager cannot store object.",
        "STORAGE_KEYS.OBJECTS",
      ) && this._E.store(t, e)
    );
  }
  v(t) {
    return (
      !!validateValueIsFromEnum(
        STORAGE_KEYS.k,
        t,
        "StorageManager cannot retrieve object.",
        "STORAGE_KEYS.OBJECTS",
      ) && this._E.jr(t)
    );
  }
  ni(t) {
    return (
      !!validateValueIsFromEnum(
        STORAGE_KEYS.k,
        t,
        "StorageManager cannot remove object.",
        "STORAGE_KEYS.OBJECTS",
      ) && (this._E.remove(t), !0)
    );
  }
  clearData() {
    const t = keys(STORAGE_KEYS.eu),
      e = keys(STORAGE_KEYS.k);
    for (let e = 0; e < t.length; e++) {
      const s = t[e];
      this.SE.remove(STORAGE_KEYS.eu[s]);
    }
    for (let t = 0; t < e.length; t++) {
      const s = e[t];
      this._E.remove(STORAGE_KEYS.k[s]);
    }
  }
  hE(t) {
    return t || STORAGE_KEYS.k.sE;
  }
  Qa(t) {
    let e = this._E.jr(STORAGE_KEYS.k.eE);
    null == e && (e = {});
    const s = this.hE(t[User.bu]),
      r = e[s];
    for (const o in t)
      o !== User.bu &&
        (null == e[s] || (r && null == r[o])) &&
        this.mu(t[User.bu], o, t[o]);
  }
  mu(t, e, s) {
    let r = this._E.jr(STORAGE_KEYS.k.eE);
    null == r && (r = {});
    const o = this.hE(t);
    let n = r[o];
    if (
      (null == n && ((n = {}), null != t && (n[User.bu] = t)), e === User.lu)
    ) {
      null == n[e] && (n[e] = {});
      for (const t in s) n[e][t] = s[t];
    } else null != s && (n[e] = s);
    return (r[o] = n), this._E.store(STORAGE_KEYS.k.eE, r);
  }
  AE() {
    const t = this._E.jr(STORAGE_KEYS.k.eE);
    this._E.remove(STORAGE_KEYS.k.eE);
    const e = [];
    for (const s in t) null != t[s] && e.push(t[s]);
    return e;
  }
  ou(t) {
    const e = this._E.jr(STORAGE_KEYS.k.eE);
    if (null != e) {
      const s = this.hE(null),
        r = e[s];
      null != r &&
        ((e[s] = void 0),
        this._E.store(STORAGE_KEYS.k.eE, e),
        (r[User.bu] = t),
        this.Qa(r));
    }
    const s = this.tu(STORAGE_KEYS.eu.Dl);
    let r = null;
    null != s && (r = s.iu);
    const o = this.cE();
    if (null != o)
      for (let e = 0; e < o.length; e++) {
        const s = o[e];
        null == s.userId && s.sessionId == r && (s.userId = t), this.Hl(s);
      }
  }
  RE() {
    return this._E.gE;
  }
}
(O.rc = class {
  constructor(t) {
    (this.cn = t), (this.cn = t), (this.gE = V.OE() ? 3 : 10);
  }
  dE(t) {
    return t + "." + this.cn;
  }
  store(t, e) {
    const s = { v: e };
    try {
      return localStorage.setItem(this.dE(t), JSON.stringify(s)), !0;
    } catch (t) {
      return r$1.j.info("Storage failure: " + getErrorMessage(t)), !1;
    }
  }
  jr(t) {
    try {
      let e = null;
      const s = localStorage.getItem(this.dE(t));
      return null != s && (e = JSON.parse(s)), null == e ? null : e.v;
    } catch (t) {
      return r$1.j.info("Storage retrieval failure: " + getErrorMessage(t)), null;
    }
  }
  remove(t) {
    try {
      localStorage.removeItem(this.dE(t));
    } catch (t) {
      return r$1.j.info("Storage removal failure: " + getErrorMessage(t)), !1;
    }
  }
}),
  (O.ac = class {
    constructor() {
      (this.fE = {}), (this.bE = 5242880), (this.gE = 3);
    }
    store(t, e) {
      const s = { value: e },
        o = this.IE(e);
      return o > this.bE
        ? (r$1.j.info(
            "Storage failure: object is ≈" +
              o +
              " bytes which is greater than the max of " +
              this.bE,
          ),
          !1)
        : ((this.fE[t] = s), !0);
    }
    IE(t) {
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
    jr(t) {
      const e = this.fE[t];
      return null == e ? null : e.value;
    }
    remove(t) {
      this.fE[t] = null;
    }
  }),
  (O.ee = class {
    constructor(t, e) {
      (this.cn = t),
        (this.mE = e),
        (this.cn = t),
        (this.KE = this.YE()),
        (this.NE = 576e3),
        (this.mE = !!e);
    }
    dE(t) {
      return null != this.cn ? t + "." + this.cn : t;
    }
    YE() {
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
    ae() {
      const t = new Date();
      return t.setTime(t.getTime() + 60 * this.NE * 1e3), t.getFullYear();
    }
    DE() {
      const t = values(STORAGE_KEYS.eu),
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
          -1 === t.indexOf("." + this.cn) && this.CE(t);
        }
      }
    }
    store(t, e) {
      this.DE();
      const s = new Date();
      s.setTime(s.getTime() + 60 * this.NE * 1e3);
      const o = "expires=" + s.toUTCString(),
        n = "domain=" + this.KE;
      let i;
      i = this.mE ? e : encodeURIComponent(JSON.stringify(e));
      const a = this.dE(t) + "=" + i + ";" + o + ";" + n + ";path=/";
      return a.length >= 4093
        ? (r$1.j.info(
            "Storage failure: string is " +
              a.length +
              " chars which is too large to store as a cookie.",
          ),
          !1)
        : ((document.cookie = a), !0);
    }
    jr(t) {
      const e = [],
        s = this.dE(t) + "=",
        o = document.cookie.split(";");
      for (let n = 0; n < o.length; n++) {
        let i = o[n];
        for (; " " === i.charAt(0); ) i = i.substring(1);
        if (0 === i.indexOf(s))
          try {
            let t;
            (t = this.mE
              ? i.substring(s.length, i.length)
              : JSON.parse(
                  decodeURIComponent(i.substring(s.length, i.length)),
                )),
              e.push(t);
          } catch (e) {
            return (
              r$1.j.info("Storage retrieval failure: " + getErrorMessage(e)),
              this.remove(t),
              null
            );
          }
      }
      return e.length > 0 ? e[e.length - 1] : null;
    }
    remove(t) {
      this.CE(this.dE(t));
    }
    CE(t) {
      const e = t + "=;expires=" + new Date(0).toUTCString();
      (document.cookie = e), (document.cookie = e + ";path=/");
      const s = e + ";domain=" + this.KE;
      (document.cookie = s), (document.cookie = s + ";path=/");
    }
  }),
  (O.tc = class {
    constructor(t, e, s) {
      (this.cn = t),
        (this.GE = []),
        e && this.GE.push(new O.ee(t)),
        s && this.GE.push(new O.rc(t)),
        this.GE.push(new O.ac());
    }
    store(t, e) {
      let s = !0;
      for (let r = 0; r < this.GE.length; r++) s = this.GE[r].store(t, e) && s;
      return s;
    }
    jr(t) {
      for (let e = 0; e < this.GE.length; e++) {
        const s = this.GE[e].jr(t);
        if (null != s) return s;
      }
      return null;
    }
    remove(t) {
      new O.ee(this.cn).remove(t);
      for (let e = 0; e < this.GE.length; e++) this.GE[e].remove(t);
    }
  });

class kt {
  constructor(t, i, s) {
    (this.u = t),
      (this.gh = i),
      (this.ph = s),
      (this.u = t),
      (this.gh = i || !1),
      (this.ph = s),
      (this.Fh = new E()),
      (this.kh = 0),
      (this.fh = 1);
  }
  wh() {
    return this.gh;
  }
  jh() {
    return this.u.v(STORAGE_KEYS.k.xh);
  }
  setSdkAuthenticationSignature(t) {
    const s = this.jh();
    this.u.D(STORAGE_KEYS.k.xh, t);
    const e = r$1.zt.Ft;
    new r$1.xt(e, r$1.j).setItem(e.Jt.qh, this.fh, t), s !== t && this.ti();
  }
  yh() {
    this.u.ni(STORAGE_KEYS.k.xh);
    const t = r$1.zt.Ft;
    new r$1.xt(t, r$1.j).oe(t.Jt.qh, this.fh);
  }
  subscribeToSdkAuthenticationFailures(t) {
    return this.ph.lt(t);
  }
  Bh(t) {
    this.ph.Et(t);
  }
  Gh() {
    this.Fh.removeAllSubscriptions();
  }
  Hh() {
    this.kh += 1;
  }
  Jh() {
    return this.kh;
  }
  ti() {
    this.kh = 0;
  }
}

class y {
  constructor() {}
  Ts(a) {}
  changeUser(a = !1) {}
  clearData(a = !1) {}
}

class xt {
  constructor(s) {
    (this.id = s), (this.id = s);
  }
  Kr() {
    const s = {};
    return (
      null != this.browser && (s.browser = this.browser),
      null != this.Zo && (s.browser_version = this.Zo),
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

class Ot {
  constructor(t, e) {
    (this.u = t),
      (this.Qo = e),
      (this.u = t),
      null == e && (e = values(DeviceProperties)),
      (this.Qo = e);
  }
  ce(t = !0) {
    let e = this.u.tu(STORAGE_KEYS.eu.Xo);
    null == e && ((e = new _t(r$1.Z.Y())), t && this.u.uu(STORAGE_KEYS.eu.Xo, e));
    const s = new xt(e.iu);
    for (let t = 0; t < this.Qo.length; t++) {
      switch (this.Qo[t]) {
        case DeviceProperties.BROWSER:
          s.browser = V.browser;
          break;
        case DeviceProperties.BROWSER_VERSION:
          s.Zo = V.version;
          break;
        case DeviceProperties.OS:
          s.os = this.Ia();
          break;
        case DeviceProperties.RESOLUTION:
          s.Ta = screen.width + "x" + screen.height;
          break;
        case DeviceProperties.LANGUAGE:
          s.language = V.language;
          break;
        case DeviceProperties.TIME_ZONE:
          s.timeZone = this.Da(new Date());
          break;
        case DeviceProperties.USER_AGENT:
          s.userAgent = V.userAgent;
      }
    }
    return s;
  }
  Ia() {
    if (V.Oa()) return V.Oa();
    const t = this.u.v(STORAGE_KEYS.k.Ca);
    return t && t.os_version ? t.os_version : V.Ia();
  }
  Da(t) {
    let e = !1;
    if ("undefined" != typeof Intl && "function" == typeof Intl.DateTimeFormat)
      try {
        if ("function" == typeof Intl.DateTimeFormat().resolvedOptions) {
          const t = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (null != t && "" !== t) return t;
        }
      } catch (t) {
        r$1.j.info(
          "Intl.DateTimeFormat threw an error, cannot detect user's time zone:" +
            getErrorMessage(t),
        ),
          (e = !0);
      }
    if (e) return "";
    const s = t.getTimezoneOffset();
    return this.Fa(s);
  }
  Fa(t) {
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

function logDeprecationWarning(e, a, i) {
  let s = `The '${e}' ${a} is deprecated.`;
  i && (s += ` Please use '${i}' instead.`), r$1.j.warn(s);
}

var qt = {
  Ka: "invalid_api_key",
  Ua: "blacklisted",
  La: "no_device_identifier",
  Ha: "invalid_json_response",
  Na: "empty_response",
  __: "sdk_auth_error",
};

const T = {
  Os: { Ja: "d", Ks: "cc", Si: "ff", Lr: "t" },
  Qu: (e) => {
    if (e) return e.v(STORAGE_KEYS.k.EE);
  },
  Xu: (e) => {
    if (e) return e.v(STORAGE_KEYS.k.lE);
  },
  Yu: (e, t) => {
    e && e.D(STORAGE_KEYS.k.EE, t);
  },
  Zu: (e, t) => {
    e && e.D(STORAGE_KEYS.k.lE, t);
  },
  Ga: (e, t) => {
    if (!e || !t) return -1;
    const r = T.Qu(e);
    if (null == r) return -1;
    const s = r[t];
    return null == s || isNaN(s) ? -1 : s;
  },
  Xh: (e, t) => {
    let r = REQUEST_ATTEMPT_DEFAULT;
    if (!e || !t) return r;
    const s = T.Xu(e);
    return null == s ? r : ((r = s[t]), null == r || isNaN(r) ? REQUEST_ATTEMPT_DEFAULT : r);
  },
  Ws: (e, t, r) => {
    if (!e || !t) return;
    let s = T.Qu(e);
    null == s && (s = {}), (s[t] = r), T.Yu(e, s);
  },
  si: (e, t, r) => {
    if (!e || !t) return;
    let s = T.Xu(e);
    null == s && (s = {}), (s[t] = r), T.Zu(e, s);
  },
  hi: (e, t) => {
    if (!e || !t) return;
    const r = T.Xh(e, t);
    T.si(e, t, r + 1);
  },
};

class Pt {
  constructor(t, e, s, i, r, o, n, a, h, u, c) {
    (this.fn = t),
      (this.u = e),
      (this.Do = s),
      (this.ft = i),
      (this._e = r),
      (this.wt = o),
      (this.cn = n),
      (this.Uo = a),
      (this.Mo = h),
      (this.jo = u),
      (this.appVersion = c),
      (this.fn = t),
      (this.u = e),
      (this.Do = s),
      (this.ft = i),
      (this._e = r),
      (this.wt = o),
      (this.cn = n),
      (this.Uo = a),
      (this.Mo = h),
      (this.jo = u),
      (this.appVersion = c),
      (this.Ra = ["npm"]);
  }
  Bs(t, e = !1, s = !1) {
    const r = this.fn.ce(!s),
      o = r.Kr(),
      n = this.u.v(STORAGE_KEYS.k.Ca);
    isEqual(n, o) || (t.device = o),
      (t.api_key = this.cn),
      (t.time = convertMsToSeconds(new Date().valueOf(), !0));
    const a = this.u.v(STORAGE_KEYS.k.Xa) || [],
      u = this.u.v(STORAGE_KEYS.k.Ea) || "";
    if (
      (this.Ra.length > 0 &&
        (!isEqual(a, this.Ra) || u !== this._e.Pa()) &&
        (t.sdk_metadata = this.Ra),
      (t.sdk_version = this.Mo),
      this.jo && (t.sdk_flavor = this.jo),
      (t.app_version = this.appVersion),
      (t.device_id = r.id),
      e)
    ) {
      const e = this.ft.getUserId();
      null != e && (t.user_id = e);
    }
    return t;
  }
  Zs(t, e, i) {
    const o = e.auth_error,
      n = e.error;
    if (!o && !n) return !0;
    if (o) {
      let e;
      this.Do.Hh();
      const s = { errorCode: o.error_code };
      for (const t of i)
        isArray(t) && "X-Braze-Auth-Signature" === t[0] && (s.signature = t[1]);
      t.respond_with && t.respond_with.user_id
        ? (s.userId = t.respond_with.user_id)
        : t.user_id && (s.userId = t.user_id);
      const n = o.reason;
      return (
        n
          ? ((s.reason = n), (e = `due to ${n}`))
          : (e = `with error code ${o.error_code}.`),
        this.Do.wh() ||
          (e +=
            ' Please use the "enableSdkAuthentication" initialization option to enable authentication.'),
        r$1.j.error(`SDK Authentication failed ${e}`),
        this.$a(t.events || [], t.attributes || []),
        this.Do.Bh(s),
        !1
      );
    }
    if (n) {
      let i,
        o = n;
      switch (o) {
        case qt.Na:
          return (
            (i = "Received successful response with empty body."),
            s$1.N(r$1.q.qs, { e: i }),
            r$1.j.info(i),
            !1
          );
        case qt.Ha:
          return (
            (i = "Received successful response with invalid JSON"),
            s$1.N(r$1.q.qs, { e: i + ": " + e.response }),
            r$1.j.info(i),
            !1
          );
        case qt.Ka:
          o = `The API key "${t.api_key}" is invalid for the baseUrl ${this.Uo}`;
          break;
        case qt.Ua:
          o =
            "Sorry, we are not currently accepting your requests. If you think this is in error, please contact us.";
          break;
        case qt.La:
          o = "No device identifier. Please contact support@braze.com";
      }
      r$1.j.error("Backend error: " + o);
    }
    return !1;
  }
  Wa(t, e, s, i) {
    return !!((t && 0 !== t.length) || (e && 0 !== e.length) || s || i);
  }
  Ya(t, e, s, i, r = !1) {
    const o = [],
      n = (t) => t || "",
      a = n(this.ft.getUserId());
    let h = this.Jr(t, e);
    const u = [],
      c = [];
    let l,
      f = null;
    if (s.length > 0) {
      const t = [];
      for (const e of s) {
        if (((l = e.Kr()), this.Do.wh())) {
          if (a && !l.user_id) {
            f || (f = {}), f.events || (f.events = []), f.events.push(l);
            continue;
          }
          if (n(l.user_id) !== a) {
            c.push(l);
            continue;
          }
        }
        t.push(l);
      }
      t.length > 0 && (h.events = t);
    }
    if (i.length > 0) {
      const t = [];
      for (const e of i)
        e && (this.Do.wh() && n(e.user_id) !== a ? u.push(e) : t.push(e));
      t.length > 0 && (h.attributes = t);
    }
    if ((this.$a(c, u), (h = this.Bs(h, !0, r)), f)) {
      f = this.Bs(f, !1, r);
      const t = { requestData: f, headers: this.Hs(f, T.Os.Ja) };
      o.push(t);
    }
    if (h && !this.Wa(h.events, h.attributes, t, e)) return f ? o : null;
    const d = { requestData: h, headers: this.Hs(h, T.Os.Ja) };
    return o.push(d), o;
  }
  $a(t, e) {
    if (t) {
      const e = [];
      for (const s of t) {
        const t = be.fromJson(s);
        (t.time = convertSecondsToMs(t.time)), e.push(t);
      }
      this.u.bo(e);
    }
    if (e) for (const t of e) this.u.Qa(t);
  }
  ii(t, e) {
    let s = "HTTP error ";
    null != t && (s += t + " "), (s += e), r$1.j.error(s);
  }
  qr(t) {
    return s$1.N(r$1.q.Va, { n: t });
  }
  Jr(t, e, s) {
    const i = {};
    t && (i.feed = !0), e && (i.triggers = !0);
    const r = null != s ? s : this.ft.getUserId();
    return (
      r && (i.user_id = r),
      (i.config = { config_time: this.wt.li() }),
      { respond_with: i }
    );
  }
  Za(t) {
    const e = new Date().valueOf();
    let s = LAST_REQUEST_TO_ENDPOINT_MS_AGO_DEFAULT.toString();
    const i = T.Ga(this.u, t);
    if (-1 !== i) {
      s = (e - i).toString();
    }
    return s;
  }
  Hs(t, e, s = !1) {
    const r = [["X-Braze-Api-Key", this.cn]],
      o = this.Za(e);
    r.push(["X-Braze-Last-Req-Ms-Ago", o]);
    const n = T.Xh(this.u, e).toString();
    r.push(["X-Braze-Req-Attempt", n]);
    let a = !1;
    if (
      (null != t.respond_with &&
        t.respond_with.triggers &&
        (r.push(["X-Braze-TriggersRequest", "true"]), (a = !0)),
      null != t.respond_with &&
        t.respond_with.feed &&
        (r.push(["X-Braze-FeedRequest", "true"]), (a = !0)),
      e === T.Os.Ks)
    ) {
      r.push(["X-Braze-ContentCardsRequest", "true"]);
      let t = this.u.v(STORAGE_KEYS.k.Ls);
      (t && s) || ((t = 0), this.u.D(STORAGE_KEYS.k.Ls, t)),
        r.push(["BRAZE-SYNC-RETRY-COUNT", t.toString()]),
        (a = !0);
    }
    if (
      (e === T.Os.Si &&
        (r.push(["X-Braze-FeatureFlagsRequest", "true"]), (a = !0)),
      a && r.push(["X-Braze-DataRequest", "true"]),
      this.Do.wh())
    ) {
      const t = this.Do.jh();
      null != t && r.push(["X-Braze-Auth-Signature", t]);
    }
    return r;
  }
  Qs(t, e) {
    const s = t.device;
    s && s.os_version instanceof Promise
      ? s.os_version.then((s) => {
          (t.device.os_version = s), e();
        })
      : e();
  }
  ti() {
    this.Do.ti();
  }
  Ys() {
    return this.Uo;
  }
  addSdkMetadata(t) {
    for (const e of t) -1 === this.Ra.indexOf(e) && this.Ra.push(e);
  }
}

const C = {
  Xs: (t) => {
    let e, o;
    try {
      const s = () => {
        r$1.j.error("This browser does not have any supported ajax options!");
      };
      let n = !1;
      if ((window.XMLHttpRequest && (n = !0), !n)) return void s();
      e = new XMLHttpRequest();
      const i = () => {
        "function" == typeof t.error && t.error(e.status),
          "function" == typeof t.ei && t.ei(!1);
      };
      (e.onload = () => {
        let o = !1;
        if (4 === e.readyState)
          if (
            ((o = (e.status >= 200 && e.status < 300) || 304 === e.status), o)
          ) {
            if ("function" == typeof t.O) {
              let o, r;
              try {
                (o = JSON.parse(e.responseText)),
                  (r = e.getAllResponseHeaders());
              } catch (o) {
                const s = {
                  error: "" === e.responseText ? qt.Na : qt.Ha,
                  response: e.responseText,
                };
                (0, t.O)(s, r);
              }
              o && t.O(o, r);
            }
            "function" == typeof t.ei && t.ei(!0);
          } else i();
      }),
        (e.onerror = () => {
          i();
        }),
        (e.ontimeout = () => {
          i();
        }),
        (o = JSON.stringify(t.data)),
        e.open("POST", t.url, !0),
        e.setRequestHeader("Content-type", "application/json"),
        e.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      const f = t.headers || [];
      for (const t of f) e.setRequestHeader(t[0], t[1]);
      e.send(o);
    } catch (t) {
      r$1.j.error(`Network request error: ${getErrorMessage(t)}`);
    }
  },
};
const readResponseHeaders = (t) => {
  const e = {},
    o = t.toString().split("\r\n");
  if (!o) return e;
  let r, s;
  for (const t of o)
    t &&
      ((r = t.slice(0, t.indexOf(":")).toLowerCase().trim()),
      (s = t.slice(t.indexOf(":") + 1).trim()),
      (e[r] = s));
  return e;
};

const randomInclusive = (t, a) => (
  (t = Math.ceil(t)),
  (a = Math.floor(a)),
  Math.floor(Math.random() * (a - t + 1)) + t
);

class t {
  constructor(t = !1, s = []) {
    (this.O = t), (this.ve = s), (this.O = t), (this.ve = s);
  }
  S(t) {
    (this.O = this.O && t.O), this.ve.push(...t.ve);
  }
}

const jt = {
  kn: () =>
    "serviceWorker" in navigator &&
    "undefined" != typeof ServiceWorkerRegistration &&
    "showNotification" in ServiceWorkerRegistration.prototype &&
    "PushManager" in window,
  Dn: () =>
    "safari" in window &&
    "pushNotification" in window.safari &&
    "function" == typeof window.safari.pushNotification.permission &&
    "function" == typeof window.safari.pushNotification.requestPermission,
  isPushSupported: () => jt.kn() || jt.Dn(),
  isPushBlocked: () => {
    const i =
        jt.isPushSupported() &&
        "Notification" in window &&
        null != window.Notification &&
        null != window.Notification.permission &&
        "denied" === window.Notification.permission,
      n =
        jt.isPushSupported() &&
        (!("Notification" in window) || null == window.Notification);
    return i || n;
  },
  isPushPermissionGranted: () =>
    jt.isPushSupported() &&
    "Notification" in window &&
    null != window.Notification &&
    null != window.Notification.permission &&
    "granted" === window.Notification.permission,
  Gr: () =>
    !jt.isPushBlocked() &&
    jt.isPushSupported() &&
    !jt.isPushPermissionGranted(),
};
var jt$1 = jt;

class Rt {
  constructor(t, i, s, e, o, h, n, r, u, l) {
    (this.cn = t),
      (this.baseUrl = i),
      (this._e = s),
      (this.fn = e),
      (this.ft = o),
      (this.wt = h),
      (this.u = n),
      (this.$h = r),
      (this.Do = u),
      (this.gt = l),
      (this.cn = t),
      (this.baseUrl = i),
      (this.Kh = 0),
      (this.gE = n.RE() || 0),
      (this.Wh = null),
      (this._e = s),
      (this.fn = e),
      (this.ft = o),
      (this.wt = h),
      (this.u = n),
      (this.Do = u),
      (this.gt = l),
      (this.$h = r),
      (this.Qh = new E()),
      (this.Vh = null),
      (this.Yh = 50),
      (this.Zh = !1);
  }
  fu(t, i) {
    return !t && !i && this.Do.Jh() >= this.Yh;
  }
  gu(t) {
    let i = this._e.El();
    if (t.length > 0) {
      const s = this.ft.getUserId();
      for (const e of t) {
        const t = (!e.userId && !s) || e.userId === s;
        e.type === r$1.q.Wl && t && (i = !0);
      }
    }
    return i;
  }
  vu(t = !1, s = !1, e = !0, o, h, n, u = !1, l = !1) {
    e && this.wu();
    const a = this.u.cE(),
      c = this.u.AE();
    let d = !1;
    const f = (t, s) => {
        let r = !1;
        T.Ws(this.u, T.Os.Ja, new Date().valueOf()),
          C.Xs({
            url: this.baseUrl + "/data/",
            data: t,
            headers: s,
            O: (e) => {
              null != t.respond_with &&
                t.respond_with.triggers &&
                (this.Kh = Math.max(this.Kh - 1, 0)),
                this.gt.Zs(t, e, s)
                  ? (this.Do.ti(),
                    this.wt.ul(e),
                    (null != t.respond_with &&
                      t.respond_with.user_id != this.ft.getUserId()) ||
                      (null != t.device && this.u.D(STORAGE_KEYS.k.Ca, t.device),
                      null != t.sdk_metadata &&
                        (this.u.D(STORAGE_KEYS.k.Xa, t.sdk_metadata),
                        this.u.D(STORAGE_KEYS.k.Ea, this._e.Pa())),
                      this.$h(e),
                      T.si(this.u, T.Os.Ja, 1),
                      "function" == typeof o && o()))
                  : e.auth_error && (r = !0);
            },
            error: () => {
              null != t.respond_with &&
                t.respond_with.triggers &&
                (this.Kh = Math.max(this.Kh - 1, 0)),
                this.gt.$a(t.events, t.attributes),
                "function" == typeof h && h();
            },
            ei: (t) => {
              if (("function" == typeof n && n(t), e && !d)) {
                if (t && !r) this.ku();
                else {
                  T.hi(this.u, T.Os.Ja);
                  let t = this.Wh;
                  (null == t || t < 1e3 * this.gE) && (t = 1e3 * this.gE),
                    this.ku(Math.min(3e5, randomInclusive(1e3 * this.gE, 3 * t)));
                }
                d = !0;
              }
            },
          });
      },
      m = this.gu(a),
      g = s || m;
    if (this.fu(u, m))
      return void r$1.j.info(
        "Declining to flush data due to 50 consecutive authentication failures",
      );
    if (e && !this.gt.Wa(a, c, t, g))
      return this.ku(), void ("function" == typeof n && n(!0));
    const v = this.gt.Ya(t, g, a, c, l);
    g && this.Kh++;
    let p = !1;
    if (v)
      for (const t of v)
        this.gt.Qs(t.requestData, () => f(t.requestData, t.headers)), (p = !0);
    this.Do.wh() && e && !p
      ? this.ku()
      : m && (r$1.j.info("Invoking new session subscriptions"), this.Qh.Et());
  }
  yu() {
    return this.Kh > 0;
  }
  ku(t = 1e3 * this.gE) {
    this.Zh ||
      (this.wu(),
      (this.Vh = window.setTimeout(() => {
        if (document.hidden) {
          const t = "visibilitychange",
            i = () => {
              document.hidden ||
                (document.removeEventListener(t, i, !1), this.vu());
            };
          document.addEventListener(t, i, !1);
        } else this.vu();
      }, t)),
      (this.Wh = t));
  }
  wu() {
    null != this.Vh && (clearTimeout(this.Vh), (this.Vh = null));
  }
  initialize() {
    (this.Zh = !1), this.ku();
  }
  destroy() {
    this.Qh.removeAllSubscriptions(),
      this.Do.Gh(),
      this.wu(),
      (this.Zh = !0),
      this.vu(void 0, void 0, !1, void 0, void 0, void 0, void 0, !0),
      (this.Vh = null);
  }
  pr(t) {
    return this.Qh.lt(t);
  }
  openSession() {
    const t = this._e.Pa() !== this._e.co();
    t && (this.u.uE(STORAGE_KEYS.eu.Xo), this.u.uE(STORAGE_KEYS.eu.su), this.u.ni(STORAGE_KEYS.k.qi)),
      this.vu(void 0, !1, void 0, void 0, void 0),
      this.pu(),
      t &&
        Promise.resolve().then(function () { return pushManagerFactory; }).then((t) => {
          if (this.Zh) return;
          const s = t.default.m();
          if (
            null != s &&
            (jt$1.isPushPermissionGranted() || jt$1.isPushBlocked())
          ) {
            const t = () => {
                s.Sn()
                  ? r$1.j.info(
                      "Push token maintenance is disabled, not refreshing token for backend.",
                    )
                  : s.subscribe();
              },
              e = (i, s) => {
                s && t();
              },
              o = () => {
                const s = this.u.v(STORAGE_KEYS.k.Bn);
                (null == s || s) && t();
              },
              h = r$1.zt.Ft;
            new r$1.xt(h, r$1.j).hr(h.Jt.cu, e, o);
          }
        });
  }
  changeUser(t, s, e) {
    const o = this.ft.getUserId();
    if (o !== t) {
      this._e.kl(),
        null != o && this.vu(void 0, !1, void 0, void 0, void 0),
        this.ft.ru(t),
        e ? this.Do.setSdkAuthenticationSignature(e) : this.Do.yh();
      for (let t = 0; t < s.length; t++) s[t].changeUser(null == o);
      null != o && this.u.ni(STORAGE_KEYS.k.L),
        this.u.ni(STORAGE_KEYS.k.Ca),
        this.openSession(),
        r$1.j.info('Changed user to "' + t + '".');
    } else {
      let i = "Doing nothing.";
      e &&
        this.Do.jh() !== e &&
        (this.Do.setSdkAuthenticationSignature(e),
        (i = "Updated SDK authentication signature")),
        r$1.j.info(`Current user is already ${t}. ${i}`);
    }
  }
  requestImmediateDataFlush(t) {
    this.wu(), this._e.co();
    this.vu(
      void 0,
      void 0,
      void 0,
      void 0,
      () => {
        r$1.j.error(
          "Failed to flush data, request will be retried automatically.",
        );
      },
      t,
      !0,
    );
  }
  requestFeedRefresh() {
    this._e.co(), this.vu(!0);
  }
  $r(t, i) {
    this._e.co(),
      r$1.j.info("Requesting explicit trigger refresh."),
      this.vu(void 0, !0, void 0, t, i);
  }
  $n(t, i) {
    const e = r$1.q.ju,
      o = { a: t, l: i },
      h = s$1.N(e, o);
    return h && r$1.j.info(`Logged alias ${t} with label ${i}`), h;
  }
  Gn(i, e, o) {
    if (this.wt.hu(e))
      return (
        r$1.j.info(`Custom Attribute "${e}" is blocklisted, ignoring.`), new t()
      );
    const h = { key: e, value: o },
      n = s$1.N(i, h);
    if (n) {
      const t = "object" == typeof o ? JSON.stringify(o, null, 2) : o;
      r$1.j.info(`Logged custom attribute: ${e} with value: ${t}`);
    }
    return n;
  }
  setLastKnownLocation(t, i, e, o, h, n) {
    const u = { latitude: i, longitude: e };
    null != o && (u.altitude = o),
      null != h && (u.ll_accuracy = h),
      null != n && (u.alt_accuracy = n);
    const l = s$1.N(r$1.q.Su, u, t || void 0);
    return (
      l &&
        r$1.j.info(
          `Set user last known location as ${JSON.stringify(u, null, 2)}`,
        ),
      l
    );
  }
  vr(t, i) {
    const s = this._e.co();
    return new be(this.ft.getUserId(), r$1.q.$u, t, s, { cid: i });
  }
  pu() {
    const t = r$1.zt.Ft;
    new r$1.xt(t, r$1.j).setItem(t.Jt.Ja, 1, {
      baseUrl: this.baseUrl,
      data: { api_key: this.cn, device_id: this.fn.ce().id },
      userId: this.ft.getUserId(),
      sdkAuthEnabled: this.Do.wh(),
    });
  }
  yr(t) {
    for (const i of t)
      if (i.api_key === this.cn) this.gt.$a(i.events, i.attributes);
      else {
        const t = r$1.zt.Ft;
        new r$1.xt(t, r$1.j).setItem(t.Jt.wr, r$1.Z.Y(), i);
      }
  }
  Zn(i, e, o) {
    if (this.wt.hu(i))
      return (
        r$1.j.info(`Custom Attribute "${i}" is blocklisted, ignoring.`), new t()
      );
    let h, n;
    return (
      null === e && null === o
        ? ((h = r$1.q.qu), (n = { key: i }))
        : ((h = r$1.q.Au), (n = { key: i, latitude: e, longitude: o })),
      s$1.N(h, n)
    );
  }
  au(t, i) {
    const e = { group_id: t, status: i };
    return s$1.N(r$1.q.Cu, e);
  }
}

class Kt {
  constructor(
    t = 0,
    i = [],
    s = [],
    h = [],
    e = null,
    l = null,
    r = { enabled: !1 },
    a = { enabled: !1, refresh_rate_limit: void 0 },
  ) {
    (this.ol = t),
      (this.cl = i),
      (this.gl = s),
      (this.fl = h),
      (this.bl = e),
      (this.al = l),
      (this.ml = r),
      (this.pi = a),
      (this.ol = t),
      (this.cl = i),
      (this.gl = s),
      (this.fl = h),
      (this.bl = e),
      (this.al = l),
      (this.ml = r),
      (this.pi = a);
  }
  ss() {
    return {
      s: "4.9.0",
      l: this.ol,
      e: this.cl,
      a: this.gl,
      p: this.fl,
      m: this.bl,
      v: this.al,
      c: this.ml,
      f: this.pi,
    };
  }
  static Yn(t) {
    let i = t.l;
    return (
      "4.9.0" !== t.s && (i = 0), new Kt(i, t.e, t.a, t.p, t.m, t.v, t.c, t.f)
    );
  }
}

class Mt {
  constructor(t) {
    (this.u = t),
      (this.u = t),
      (this.tl = new E()),
      (this.el = new E()),
      (this.sl = new E()),
      (this.il = null),
      (this.rl = null);
  }
  ll() {
    if (null == this.rl) {
      const t = this.u.v(STORAGE_KEYS.k.hl);
      this.rl = null != t ? Kt.Yn(t) : new Kt();
    }
    return this.rl;
  }
  li() {
    return this.ll().ol;
  }
  ul(t) {
    if (null != t && null != t.config) {
      const e = t.config;
      if (e.time > this.ll().ol) {
        const t = new Kt(
          e.time,
          e.events_blacklist,
          e.attributes_blacklist,
          e.purchases_blacklist,
          e.messaging_session_timeout,
          e.vapid_public_key,
          e.content_cards,
          e.feature_flags,
        );
        let s = !1;
        null != t.al && this.En() !== t.al && (s = !0);
        let r = !1;
        null != t.ml.enabled && this.oi() !== t.ml.enabled && (r = !0);
        let n = !1;
        null != t.pi.enabled && this.vi() !== t.pi.enabled && (n = !0),
          (this.rl = t),
          this.u.D(STORAGE_KEYS.k.hl, t.ss()),
          s && this.tl.Et(),
          r && this.el.Et(),
          n && this.sl.Et();
      }
    }
  }
  Rn(t) {
    const e = this.tl.lt(t);
    return this.il && this.tl.removeSubscription(this.il), (this.il = e), e;
  }
  Ps(t) {
    return this.el.lt(t);
  }
  Ci(t) {
    return this.sl.lt(t);
  }
  ge(t) {
    return -1 !== this.ll().cl.indexOf(t);
  }
  hu(t) {
    return -1 !== this.ll().gl.indexOf(t);
  }
  Dr(t) {
    return -1 !== this.ll().fl.indexOf(t);
  }
  dl() {
    return this.ll().bl;
  }
  En() {
    return this.ll().al;
  }
  oi() {
    return this.ll().ml.enabled || !1;
  }
  $s() {
    const t = this.ll().ml.rate_limit;
    return !(!t || null == t.enabled) && t.enabled;
  }
  di() {
    if (!this.$s()) return -1;
    const t = this.ll().ml.rate_limit;
    return null == t.capacity ? CONTENT_CARDS_RATE_LIMIT_CAPACITY_DEFAULT : t.capacity <= 0 ? -1 : t.capacity;
  }
  mi() {
    if (!this.$s()) return -1;
    const t = this.ll().ml.rate_limit;
    return null == t.refill_rate ? CONTENT_CARDS_RATE_LIMIT_REFILL_RATE_DEFAULT : t.refill_rate <= 0 ? -1 : t.refill_rate;
  }
  vi() {
    return this.ll().pi.enabled && null == this.Mi()
      ? (s$1.N(r$1.q.qs, { e: "Missing feature flag refresh_rate_limit." }), !1)
      : this.ll().pi.enabled || !1;
  }
  Mi() {
    return this.ll().pi.refresh_rate_limit;
  }
}

class Dt {
  constructor(s, t, i, e) {
    (this.u = s),
      (this.ft = t),
      (this.wt = i),
      (this.wl = e),
      (this.u = s),
      (this.ft = t),
      (this.wt = i),
      (this.Sl = 1e3),
      (null == e || isNaN(e)) && (e = 1800),
      e < this.Sl / 1e3 &&
        (r$1.j.info(
          "Specified session timeout of " +
            e +
            "s is too small, using the minimum session timeout of " +
            this.Sl / 1e3 +
            "s instead.",
        ),
        (e = this.Sl / 1e3)),
      (this.wl = e);
  }
  jl(s, t) {
    return new be(this.ft.getUserId(), r$1.q.xl, s, t.iu, { d: convertMsToSeconds(s - t.vl) });
  }
  Pa() {
    const s = this.u.tu(STORAGE_KEYS.eu.Dl);
    return null == s ? null : s.iu;
  }
  El() {
    const s = new Date().valueOf(),
      t = this.wt.dl(),
      e = this.u.v(STORAGE_KEYS.k.zl);
    if (null != e && null == t) return !1;
    let n = !1;
    return (
      null == e ? (n = !0) : null != t && (n = s - e > 1e3 * t),
      n && this.u.D(STORAGE_KEYS.k.zl, s),
      n
    );
  }
  Cl(s, t) {
    return null == t || null == t.Gl || (!(s - t.vl < this.Sl) && t.Gl < s);
  }
  co() {
    const s = new Date().valueOf(),
      t = s + 1e3 * this.wl,
      e = this.u.tu(STORAGE_KEYS.eu.Dl);
    if (this.Cl(s, e)) {
      let n = "Generating session start event with time " + s;
      if (null != e) {
        let s = e.Nl;
        s - e.vl < this.Sl && (s = e.vl + this.Sl),
          this.u.Hl(this.jl(s, e)),
          (n += " (old session ended " + s + ")");
      }
      (n += ". Will expire " + t.valueOf()), r$1.j.info(n);
      const l = new _t(r$1.Z.Y(), t);
      this.u.Hl(new be(this.ft.getUserId(), r$1.q.Wl, s, l.iu)),
        this.u.uu(STORAGE_KEYS.eu.Dl, l);
      return null == this.u.v(STORAGE_KEYS.k.zl) && this.u.D(STORAGE_KEYS.k.zl, s), l.iu;
    }
    if (null != e) return (e.Nl = s), (e.Gl = t), this.u.uu(STORAGE_KEYS.eu.Dl, e), e.iu;
  }
  kl() {
    const s = this.u.tu(STORAGE_KEYS.eu.Dl);
    null != s &&
      (this.u.ql(STORAGE_KEYS.eu.Dl), this.u.Hl(this.jl(new Date().valueOf(), s)));
  }
}

const Bt = {
  qo: function (e, o = !1) {
    let t = !1;
    try {
      if (localStorage && localStorage.getItem)
        try {
          localStorage.setItem(STORAGE_KEYS.k.ec, "true"),
            localStorage.getItem(STORAGE_KEYS.k.ec) &&
              (localStorage.removeItem(STORAGE_KEYS.k.ec), (t = !0));
        } catch (e) {
          if (
            !(
              e instanceof Error &&
              ("QuotaExceededError" === e.name ||
                "NS_ERROR_DOM_QUOTA_REACHED" === e.name) &&
              localStorage.length > 0
            )
          )
            throw e;
          t = !0;
        }
    } catch (e) {
      r$1.j.info("Local Storage not supported!");
    }
    const a = Bt.oc(),
      n = new O.tc(e, a && !o, t);
    let c;
    return (c = t ? new O.rc(e) : new O.ac()), new O(n, c);
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
};

class ControlMessage {
  constructor(t) {
    (this.triggerId = t),
      (this.triggerId = t),
      (this.extras = {}),
      (this.isControl = !0);
  }
  static fromJson(t) {
    return new ControlMessage(t.trigger_id);
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
const DOMUtils = { Wu: null, no: _isInView };
const DIRECTIONS = { Oe: "up", Qe: "down", W: "left", X: "right" };
function supportsPassive() {
  if (null == DOMUtils.Wu) {
    DOMUtils.Wu = !1;
    try {
      const t = Object.defineProperty({}, "passive", {
        get: () => {
          DOMUtils.Wu = !0;
        },
      });
      window.addEventListener("testPassive", () => {}, t),
        window.removeEventListener("testPassive", () => {}, t);
    } catch (t) {
      r$1.j.error(getErrorMessage(t));
    }
  }
  return DOMUtils.Wu;
}
function addPassiveEventListener(t, n, e = () => {}) {
  t.addEventListener(n, e, !!supportsPassive() && { passive: !0 });
}
function topIsInView(t) {
  return DOMUtils.no(t, !0, !1, !1);
}
function bottomIsInView(t) {
  return DOMUtils.no(t, !1, !0, !1);
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
        r = i - o.touches[0].clientY;
      Math.abs(l) > Math.abs(r) && Math.abs(l) >= 25
        ? (((l > 0 && n === DIRECTIONS.W) || (l < 0 && n === DIRECTIONS.X)) &&
            e(o),
          (s = null),
          (i = null))
        : Math.abs(r) >= 25 &&
          (((r > 0 &&
            n === DIRECTIONS.Oe &&
            t.scrollTop === t.scrollHeight - t.offsetHeight) ||
            (r < 0 && n === DIRECTIONS.Qe && 0 === t.scrollTop)) &&
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

const KeyCodes = { Fo: 32, oo: 9, To: 13, _h: 27 };

const isIFrame = (e) => null !== e && "IFRAME" === e.tagName;

class InAppMessage {
  constructor(
    t,
    s,
    i,
    h,
    e,
    n,
    T,
    o,
    r,
    l,
    u,
    a,
    I,
    c,
    O,
    A,
    L,
    _,
    m,
    N,
    R,
    S,
    D,
    M,
    C,
    d,
    U,
    b,
    P,
  ) {
    (this.message = t),
      (this.messageAlignment = s),
      (this.slideFrom = i),
      (this.extras = h),
      (this.triggerId = e),
      (this.clickAction = n),
      (this.uri = T),
      (this.openTarget = o),
      (this.dismissType = r),
      (this.duration = l),
      (this.icon = u),
      (this.imageUrl = a),
      (this.imageStyle = I),
      (this.iconColor = c),
      (this.iconBackgroundColor = O),
      (this.backgroundColor = A),
      (this.textColor = L),
      (this.closeButtonColor = _),
      (this.animateIn = m),
      (this.animateOut = N),
      (this.header = R),
      (this.headerAlignment = S),
      (this.headerTextColor = D),
      (this.frameColor = M),
      (this.buttons = C),
      (this.cropType = d),
      (this.orientation = U),
      (this.htmlId = b),
      (this.css = P),
      (this.message = t),
      (this.messageAlignment = s || InAppMessage.TextAlignment.CENTER),
      (this.duration = l || 5e3),
      (this.slideFrom = i || InAppMessage.SlideFrom.BOTTOM),
      (this.extras = h || {}),
      (this.triggerId = e),
      (this.clickAction = n || InAppMessage.ClickAction.NONE),
      (this.uri = T),
      (this.openTarget = o || InAppMessage.OpenTarget.NONE),
      (this.dismissType = r || InAppMessage.DismissType.AUTO_DISMISS),
      (this.icon = u),
      (this.imageUrl = a),
      (this.imageStyle = I || InAppMessage.ImageStyle.TOP),
      (this.iconColor = c || InAppMessage.th.ih),
      (this.iconBackgroundColor = O || InAppMessage.th.sh),
      (this.backgroundColor = A || InAppMessage.th.ih),
      (this.textColor = L || InAppMessage.th.hh),
      (this.closeButtonColor = _ || InAppMessage.th.eh),
      (this.animateIn = m),
      null == this.animateIn && (this.animateIn = !0),
      (this.animateOut = N),
      null == this.animateOut && (this.animateOut = !0),
      (this.header = R),
      (this.headerAlignment = S || InAppMessage.TextAlignment.CENTER),
      (this.headerTextColor = D || InAppMessage.th.hh),
      (this.frameColor = M || InAppMessage.th.Eh),
      (this.buttons = C || []),
      (this.cropType = d || InAppMessage.CropType.FIT_CENTER),
      (this.orientation = U),
      (this.htmlId = b),
      (this.css = P),
      (this.isControl = !1),
      (this.nh = !1),
      (this.Th = !1),
      (this.do = !1),
      (this.oh = !1),
      (this.Me = null),
      (this.ke = null),
      (this.ht = new E()),
      (this.rh = new E()),
      (this.Te = InAppMessage.TextAlignment.CENTER);
  }
  subscribeToClickedEvent(t) {
    return this.ht.lt(t);
  }
  subscribeToDismissedEvent(t) {
    return this.rh.lt(t);
  }
  removeSubscription(t) {
    this.ht.removeSubscription(t), this.rh.removeSubscription(t);
  }
  removeAllSubscriptions() {
    this.ht.removeAllSubscriptions(), this.rh.removeAllSubscriptions();
  }
  closeMessage() {
    this.ye(this.Me);
  }
  xe() {
    return !0;
  }
  io() {
    return this.xe();
  }
  Ne() {
    return null != this.htmlId && this.htmlId.length > 4;
  }
  Ae() {
    return this.Ne() && null != this.css && this.css.length > 0;
  }
  Ce() {
    if (this.Ne() && this.Ae()) return this.htmlId + "-css";
  }
  M() {
    return !this.Th && ((this.Th = !0), !0);
  }
  so() {
    return this.Th;
  }
  p(t) {
    return !this.do && ((this.do = !0), this.ht.Et(), !0);
  }
  F() {
    return !this.oh && ((this.oh = !0), this.rh.Et(), !0);
  }
  hide(t) {
    if (t && t.parentNode) {
      let s = t.closest(".ab-iam-root");
      if ((null == s && (s = t), this.xe() && null != s.parentNode)) {
        const t = s.parentNode.classList;
        t && t.contains(InAppMessage.lh) && t.remove(InAppMessage.lh),
          document.body.removeEventListener("touchmove", InAppMessage.uh);
      }
      s.className = s.className.replace(InAppMessage.ah, InAppMessage.Ih);
    }
    return this.animateOut || !1;
  }
  ye(t, s) {
    if (null == t) return;
    let i;
    (this.Me = null),
      (i =
        -1 === t.className.indexOf("ab-in-app-message")
          ? t.getElementsByClassName("ab-in-app-message")[0]
          : t);
    let h = !1;
    i && (h = this.hide(i));
    const e = document.body;
    let E;
    null != e && (E = e.scrollTop);
    const n = () => {
      if (t && t.parentNode) {
        let s = t.closest(".ab-iam-root");
        null == s && (s = t), s.parentNode && s.parentNode.removeChild(s);
      }
      const i = this.Ce();
      if (null != i) {
        const t = document.getElementById(i);
        t && t.parentNode && t.parentNode.removeChild(t);
      }
      null != e && "Safari" === V.browser && (e.scrollTop = E),
        s ? s() : this.F();
    };
    h ? setTimeout(n, InAppMessage.Oh) : n(), this.ke && this.ke.focus();
  }
  Ge() {
    return document.createTextNode(this.message || "");
  }
  Be(t) {
    let s = "";
    this.message || this.header || !this.xe() || (s = "Modal Image"),
      t.setAttribute("alt", s);
  }
  static uh(t) {
    if (t.targetTouches && t.targetTouches.length > 1) return;
    const s = t.target;
    (s &&
      s.classList &&
      s.classList.contains("ab-message-text") &&
      s.scrollHeight > s.clientHeight) ||
      (document.querySelector(`.${InAppMessage.lh}`) && t.preventDefault());
  }
  Ah(t) {
    const s = t.parentNode;
    this.xe() &&
      null != s &&
      this.orientation !== InAppMessage.Orientation.LANDSCAPE &&
      (null != s.classList && s.classList.add(InAppMessage.lh),
      document.body.addEventListener(
        "touchmove",
        InAppMessage.uh,
        !!supportsPassive() && { passive: !1 },
      )),
      (t.className += " " + InAppMessage.ah);
  }
  static Lh(t) {
    if (
      t.keyCode === KeyCodes._h &&
      !e.nn(L.mh) &&
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
  Nh() {
    this.nh ||
      e.nn(L.mh) ||
      (document.addEventListener("keydown", InAppMessage.Lh, !1),
      e.Rh(() => {
        document.removeEventListener("keydown", InAppMessage.Lh);
      }),
      (this.nh = !0));
  }
  ss(t) {
    const s = {};
    return t
      ? ((s[InAppMessage.hs.ea] = this.message),
        (s[InAppMessage.hs.ra] = this.messageAlignment),
        (s[InAppMessage.hs.Sh] = this.slideFrom),
        (s[InAppMessage.hs.xs] = this.extras),
        (s[InAppMessage.hs.sa] = this.triggerId),
        (s[InAppMessage.hs.ta] = this.clickAction),
        (s[InAppMessage.hs.URI] = this.uri),
        (s[InAppMessage.hs.ia] = this.openTarget),
        (s[InAppMessage.hs.oa] = this.dismissType),
        (s[InAppMessage.hs.pa] = this.duration),
        (s[InAppMessage.hs.ma] = this.icon),
        (s[InAppMessage.hs.os] = this.imageUrl),
        (s[InAppMessage.hs.na] = this.imageStyle),
        (s[InAppMessage.hs.ua] = this.iconColor),
        (s[InAppMessage.hs.ca] = this.iconBackgroundColor),
        (s[InAppMessage.hs.fa] = this.backgroundColor),
        (s[InAppMessage.hs.da] = this.textColor),
        (s[InAppMessage.hs.la] = this.closeButtonColor),
        (s[InAppMessage.hs.ga] = this.animateIn),
        (s[InAppMessage.hs.ja] = this.animateOut),
        (s[InAppMessage.hs.xa] = this.header),
        (s[InAppMessage.hs.za] = this.headerAlignment),
        (s[InAppMessage.hs.ha] = this.headerTextColor),
        (s[InAppMessage.hs.va] = this.frameColor),
        (s[InAppMessage.hs.wa] = this.buttons),
        (s[InAppMessage.hs.ya] = this.cropType),
        (s[InAppMessage.hs.Sa] = this.orientation),
        (s[InAppMessage.hs.ba] = this.htmlId),
        (s[InAppMessage.hs.CSS] = this.css),
        (s[InAppMessage.hs.ts] = t),
        s)
      : s;
  }
}
(InAppMessage.th = {
  hh: 4281545523,
  ih: 4294967295,
  sh: 4278219733,
  Dh: 4293914607,
  Mh: 4283782485,
  Eh: 3224580915,
  eh: 4288387995,
}),
  (InAppMessage.Ie = {
    Ch: "hd",
    Le: "ias",
    dh: "of",
    Uh: "do",
    Xr: "umt",
    Qr: "tf",
    bh: "te",
  }),
  (InAppMessage.SlideFrom = { TOP: "TOP", BOTTOM: "BOTTOM" }),
  (InAppMessage.ClickAction = {
    NEWS_FEED: "NEWS_FEED",
    URI: "URI",
    NONE: "NONE",
  }),
  (InAppMessage.DismissType = {
    AUTO_DISMISS: "AUTO_DISMISS",
    MANUAL: "SWIPE",
  }),
  (InAppMessage.OpenTarget = { NONE: "NONE", BLANK: "BLANK" }),
  (InAppMessage.ImageStyle = { TOP: "TOP", GRAPHIC: "GRAPHIC" }),
  (InAppMessage.Orientation = { PORTRAIT: "PORTRAIT", LANDSCAPE: "LANDSCAPE" }),
  (InAppMessage.TextAlignment = {
    START: "START",
    CENTER: "CENTER",
    END: "END",
  }),
  (InAppMessage.CropType = {
    CENTER_CROP: "CENTER_CROP",
    FIT_CENTER: "FIT_CENTER",
  }),
  (InAppMessage.qe = {
    pn: "SLIDEUP",
    un: "MODAL",
    Se: "MODAL_STYLED",
    on: "FULL",
    ln: "WEB_HTML",
    Ee: "HTML",
    Ue: "HTML_FULL",
  }),
  (InAppMessage.Oh = 500),
  (InAppMessage.Ph = 200),
  (InAppMessage.ah = "ab-show"),
  (InAppMessage.Ih = "ab-hide"),
  (InAppMessage.lh = "ab-pause-scrolling"),
  (InAppMessage.hs = {
    ea: "m",
    ra: "ma",
    Sh: "sf",
    xs: "e",
    sa: "ti",
    ta: "ca",
    URI: "u",
    ia: "oa",
    oa: "dt",
    pa: "d",
    ma: "i",
    os: "iu",
    na: "is",
    ua: "ic",
    ca: "ibc",
    fa: "bc",
    da: "tc",
    la: "cbc",
    ga: "ai",
    ja: "ao",
    xa: "h",
    za: "ha",
    ha: "htc",
    va: "fc",
    wa: "b",
    ya: "ct",
    Sa: "o",
    ba: "hi",
    CSS: "css",
    ts: "type",
    vo: "messageFields",
  });

class HtmlMessage extends InAppMessage {
  constructor(i, o, e, r, d, t, s, v, n, u, a) {
    super(
      i,
      void 0,
      void 0,
      o,
      e,
      void 0,
      void 0,
      void 0,
      (r = r || InAppMessage.DismissType.MANUAL),
      d,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      t,
      s,
      void 0,
      void 0,
      void 0,
      v,
      void 0,
      void 0,
      void 0,
      n,
      u,
    ),
      (this.messageFields = a),
      (this.messageFields = a);
  }
  io() {
    return !1;
  }
  p(i) {
    if (this.Pe === InAppMessage.qe.ln) {
      if (this.do) return !1;
      this.do = !0;
    }
    return this.ht.Et(i), !0;
  }
  ss() {
    const i = super.ss(HtmlMessage.es);
    return (i[InAppMessage.hs.vo] = this.messageFields), i;
  }
  static an(i) {
    return new HtmlMessage(
      i[InAppMessage.hs.ea],
      i[InAppMessage.hs.xs],
      i[InAppMessage.hs.sa],
      i[InAppMessage.hs.oa],
      i[InAppMessage.hs.pa],
      i[InAppMessage.hs.ga],
      i[InAppMessage.hs.ja],
      i[InAppMessage.hs.va],
      i[InAppMessage.hs.ba],
      i[InAppMessage.hs.CSS],
      i[InAppMessage.hs.vo],
    );
  }
}
HtmlMessage.es = InAppMessage.qe.ln;

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
      (this.backgroundColor = t || InAppMessage.th.sh),
      (this.textColor = i || InAppMessage.th.ih),
      (this.borderColor = r || this.backgroundColor),
      (this.clickAction = h || InAppMessage.ClickAction.NONE),
      (this.uri = e),
      null == n && (n = InAppMessageButton.Yi),
      (this.id = n),
      (this.do = !1),
      (this.ht = new E());
  }
  subscribeToClickedEvent(s) {
    return this.ht.lt(s);
  }
  removeSubscription(s) {
    this.ht.removeSubscription(s);
  }
  removeAllSubscriptions() {
    this.ht.removeAllSubscriptions();
  }
  p() {
    return !this.do && ((this.do = !0), this.ht.Et(), !0);
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
InAppMessageButton.Yi = -1;

class FullScreenMessage extends InAppMessage {
  constructor(
    e,
    r,
    s,
    t,
    i,
    a,
    o,
    p,
    m,
    n,
    u,
    c,
    f,
    d,
    l,
    g,
    j,
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
  ) {
    (p = p || InAppMessage.DismissType.MANUAL),
      (k = k || InAppMessage.Orientation.PORTRAIT),
      super(
        e,
        r,
        void 0,
        s,
        t,
        i,
        a,
        o,
        p,
        m,
        n,
        u,
        c,
        f,
        d,
        l,
        g,
        j,
        x,
        z,
        h,
        v,
        w,
        y,
        S,
        (b = b || InAppMessage.CropType.CENTER_CROP),
        k,
        q,
        A,
      ),
      (this.Te = InAppMessage.TextAlignment.CENTER);
  }
  ss() {
    return super.ss(FullScreenMessage.es);
  }
  static an(e) {
    return new FullScreenMessage(
      e[InAppMessage.hs.ea],
      e[InAppMessage.hs.ra],
      e[InAppMessage.hs.xs],
      e[InAppMessage.hs.sa],
      e[InAppMessage.hs.ta],
      e[InAppMessage.hs.URI],
      e[InAppMessage.hs.ia],
      e[InAppMessage.hs.oa],
      e[InAppMessage.hs.pa],
      e[InAppMessage.hs.ma],
      e[InAppMessage.hs.os],
      e[InAppMessage.hs.na],
      e[InAppMessage.hs.ua],
      e[InAppMessage.hs.ca],
      e[InAppMessage.hs.fa],
      e[InAppMessage.hs.da],
      e[InAppMessage.hs.la],
      e[InAppMessage.hs.ga],
      e[InAppMessage.hs.ja],
      e[InAppMessage.hs.xa],
      e[InAppMessage.hs.za],
      e[InAppMessage.hs.ha],
      e[InAppMessage.hs.va],
      buttonsFromSerializedInAppMessage(e[InAppMessage.hs.wa]),
      e[InAppMessage.hs.ya],
      e[InAppMessage.hs.Sa],
      e[InAppMessage.hs.ba],
      e[InAppMessage.hs.CSS],
    );
  }
}
FullScreenMessage.es = InAppMessage.qe.on;

class ModalMessage extends InAppMessage {
  constructor(
    e,
    r,
    s,
    t,
    i,
    o,
    a,
    p,
    m,
    n,
    u,
    c,
    d,
    f,
    l,
    g,
    j,
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
  ) {
    super(
      e,
      r,
      void 0,
      s,
      t,
      i,
      o,
      a,
      (p = p || InAppMessage.DismissType.MANUAL),
      m,
      n,
      u,
      c,
      d,
      f,
      l,
      g,
      j,
      v,
      x,
      z,
      h,
      w,
      y,
      S,
      (b = b || InAppMessage.CropType.FIT_CENTER),
      void 0,
      k,
      q,
    ),
      (this.Te = InAppMessage.TextAlignment.CENTER);
  }
  ss() {
    return super.ss(ModalMessage.es);
  }
  static an(e) {
    return new ModalMessage(
      e[InAppMessage.hs.ea],
      e[InAppMessage.hs.ra],
      e[InAppMessage.hs.xs],
      e[InAppMessage.hs.sa],
      e[InAppMessage.hs.ta],
      e[InAppMessage.hs.URI],
      e[InAppMessage.hs.ia],
      e[InAppMessage.hs.oa],
      e[InAppMessage.hs.pa],
      e[InAppMessage.hs.ma],
      e[InAppMessage.hs.os],
      e[InAppMessage.hs.na],
      e[InAppMessage.hs.ua],
      e[InAppMessage.hs.ca],
      e[InAppMessage.hs.fa],
      e[InAppMessage.hs.da],
      e[InAppMessage.hs.la],
      e[InAppMessage.hs.ga],
      e[InAppMessage.hs.ja],
      e[InAppMessage.hs.xa],
      e[InAppMessage.hs.za],
      e[InAppMessage.hs.ha],
      e[InAppMessage.hs.va],
      buttonsFromSerializedInAppMessage(e[InAppMessage.hs.wa]),
      e[InAppMessage.hs.ya],
      e[InAppMessage.hs.ba],
      e[InAppMessage.hs.CSS],
    );
  }
}
ModalMessage.es = InAppMessage.qe.un;

class SlideUpMessage extends InAppMessage {
  constructor(e, t, s, o, i, r, n, d, a, u, p, m, c, l, v, x, f, h, g, I, M) {
    (x = x || InAppMessage.th.Mh),
      (v = v || InAppMessage.th.Dh),
      super(
        e,
        (t = t || InAppMessage.TextAlignment.START),
        s,
        o,
        i,
        r,
        n,
        d,
        a,
        u,
        p,
        m,
        void 0,
        c,
        l,
        v,
        x,
        f,
        h,
        g,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        I,
        M,
      ),
      (this.Te = InAppMessage.TextAlignment.START);
  }
  xe() {
    return !1;
  }
  Ge() {
    const e = document.createElement("span");
    return e.appendChild(document.createTextNode(this.message || "")), e;
  }
  Ah(e) {
    const t = e.getElementsByClassName("ab-in-app-message")[0];
    DOMUtils.no(t, !0, !0) ||
      (this.slideFrom === InAppMessage.SlideFrom.TOP
        ? (t.style.top = "0px")
        : (t.style.bottom = "0px")),
      super.Ah(e);
  }
  ss() {
    return super.ss(SlideUpMessage.es);
  }
  static an(e) {
    return new SlideUpMessage(
      e[InAppMessage.hs.ea],
      e[InAppMessage.hs.ra],
      e[InAppMessage.hs.Sh],
      e[InAppMessage.hs.xs],
      e[InAppMessage.hs.sa],
      e[InAppMessage.hs.ta],
      e[InAppMessage.hs.URI],
      e[InAppMessage.hs.ia],
      e[InAppMessage.hs.oa],
      e[InAppMessage.hs.pa],
      e[InAppMessage.hs.ma],
      e[InAppMessage.hs.os],
      e[InAppMessage.hs.ua],
      e[InAppMessage.hs.ca],
      e[InAppMessage.hs.fa],
      e[InAppMessage.hs.da],
      e[InAppMessage.hs.la],
      e[InAppMessage.hs.ga],
      e[InAppMessage.hs.ja],
      e[InAppMessage.hs.ba],
      e[InAppMessage.hs.CSS],
    );
  }
}
SlideUpMessage.es = InAppMessage.qe.pn;

function newInAppMessageFromJson(e) {
  if (!e) return null;
  if (e.is_control) return ControlMessage.fromJson(e);
  let s = e.type;
  null != s && (s = s.toUpperCase());
  const o = e.message,
    n = e.text_align_message,
    m = e.slide_from,
    t = e.extras,
    l = e.trigger_id,
    i = e.click_action,
    f = e.uri,
    p = e.open_target,
    a = e.message_close,
    u = e.duration,
    d = e.icon,
    g = e.image_url,
    c = e.image_style,
    j = e.icon_color,
    w = e.icon_bg_color,
    b = e.bg_color,
    h = e.text_color,
    v = e.close_btn_color,
    I = e.header,
    x = e.text_align_header,
    z = e.header_text_color,
    A = e.frame_color,
    F = [];
  let M = e.btns;
  null == M && (M = []);
  for (let e = 0; e < M.length; e++) F.push(InAppMessageButton.fromJson(M[e]));
  const k = e.crop_type,
    y = e.orientation,
    J = e.animate_in,
    S = e.animate_out;
  let q,
    B = e.html_id,
    C = e.css;
  if (
    ((null != B && "" !== B && null != C && "" !== C) ||
      ((B = void 0), (C = void 0)),
    s === ModalMessage.es || s === InAppMessage.qe.Se)
  )
    q = new ModalMessage(
      o,
      n,
      t,
      l,
      i,
      f,
      p,
      a,
      u,
      d,
      g,
      c,
      j,
      w,
      b,
      h,
      v,
      J,
      S,
      I,
      x,
      z,
      A,
      F,
      k,
      B,
      C,
    );
  else if (s === FullScreenMessage.es)
    q = new FullScreenMessage(
      o,
      n,
      t,
      l,
      i,
      f,
      p,
      a,
      u,
      d,
      g,
      c,
      j,
      w,
      b,
      h,
      v,
      J,
      S,
      I,
      x,
      z,
      A,
      F,
      k,
      y,
      B,
      C,
    );
  else if (s === SlideUpMessage.es)
    q = new SlideUpMessage(
      o,
      n,
      m,
      t,
      l,
      i,
      f,
      p,
      a,
      u,
      d,
      g,
      j,
      w,
      b,
      h,
      v,
      J,
      S,
      B,
      C,
    );
  else {
    if (
      s !== HtmlMessage.es &&
      s !== InAppMessage.qe.Ee &&
      s !== InAppMessage.qe.Ue
    )
      return void r$1.j.error("Ignoring message with unknown type " + s);
    {
      const s = e.message_fields;
      (q = new HtmlMessage(o, t, l, a, u, J, S, A, B, C, s)),
        (q.trusted = e.trusted || !1);
    }
  }
  return (q.Pe = s), q;
}
function buttonsFromSerializedInAppMessage(e) {
  const s = [];
  for (const o of e)
    s.push(
      new InAppMessageButton(
        o.text,
        o.backgroundColor,
        o.textColor,
        o.borderColor,
        o.clickAction,
        o.uri,
        o.id,
      ),
    );
  return s;
}

class Qt {
  constructor(t) {
    (this.yl = t), (this.yl = t);
  }
  Bl(t) {
    return null == this.yl || this.yl === t[0];
  }
  static fromJson(t) {
    return new Qt(t ? t.event_name : null);
  }
  ss() {
    return this.yl;
  }
}

class sr {
  constructor(t, s, e, i) {
    (this.Tl = t),
      (this.Al = s),
      (this.comparator = e),
      (this._l = i),
      (this.Tl = t),
      (this.Al = s),
      (this.comparator = e),
      (this._l = i),
      this.Al === sr.Rl.Ml &&
        this.comparator !== sr.Il.Ll &&
        this.comparator !== sr.Il.Ol &&
        this.comparator !== sr.Il.Ul &&
        this.comparator !== sr.Il.Ql &&
        (this._l = dateFromUnixTimestamp(this._l));
  }
  Bl(t) {
    let s = null;
    switch ((null != t && (s = t[this.Tl]), this.comparator)) {
      case sr.Il.Xl:
        return null != s && s.valueOf() === this._l.valueOf();
      case sr.Il.Fl:
        return null == s || s.valueOf() !== this._l.valueOf();
      case sr.Il.Kl:
        return null != s && typeof s == typeof this._l && s > this._l;
      case sr.Il.Ll:
        return this.Al === sr.Rl.Ml
          ? null != s && isDate(s) && secondsAgo(s) <= this._l.valueOf()
          : null != s && typeof s == typeof this._l && s >= this._l;
      case sr.Il.Pl:
        return null != s && typeof s == typeof this._l && s < this._l;
      case sr.Il.Ol:
        return this.Al === sr.Rl.Ml
          ? null != s && isDate(s) && secondsAgo(s) >= this._l.valueOf()
          : null != s && typeof s == typeof this._l && s <= this._l;
      case sr.Il.Yl:
        return (
          null != s &&
          "string" == typeof s &&
          typeof s == typeof this._l &&
          null != s.match(this._l)
        );
      case sr.Il.Zl:
        return null != s;
      case sr.Il.$l:
        return null == s;
      case sr.Il.Ul:
        return null != s && isDate(s) && secondsInTheFuture(s) < this._l;
      case sr.Il.Ql:
        return null != s && isDate(s) && secondsInTheFuture(s) > this._l;
      case sr.Il.Eu:
        return (
          null == s ||
          typeof s != typeof this._l ||
          "string" != typeof s ||
          null == s.match(this._l)
        );
    }
    return !1;
  }
  static fromJson(t) {
    return new sr(
      t.property_key,
      t.property_type,
      t.comparator,
      t.property_value,
    );
  }
  ss() {
    let t = this._l;
    return (
      isDate(this._l) && (t = convertMsToSeconds(t.valueOf())),
      { k: this.Tl, t: this.Al, c: this.comparator, v: t }
    );
  }
  static Yn(t) {
    return new sr(t.k, t.t, t.c, t.v);
  }
}
(sr.Rl = { Tu: "boolean", _u: "number", Nu: "string", Ml: "date" }),
  (sr.Il = {
    Xl: 1,
    Fl: 2,
    Kl: 3,
    Ll: 4,
    Pl: 5,
    Ol: 6,
    Yl: 10,
    Zl: 11,
    $l: 12,
    Ul: 15,
    Ql: 16,
    Eu: 17,
  });

class Yt {
  constructor(t) {
    (this.filters = t), (this.filters = t);
  }
  Bl(t) {
    let r = !0;
    for (let e = 0; e < this.filters.length; e++) {
      const o = this.filters[e];
      let s = !1;
      for (let r = 0; r < o.length; r++)
        if (o[r].Bl(t)) {
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
      for (let t = 0; t < s.length; t++) o.push(sr.fromJson(s[t]));
      r.push(o);
    }
    return new Yt(r);
  }
  ss() {
    const t = [];
    for (let r = 0; r < this.filters.length; r++) {
      const e = this.filters[r],
        o = [];
      for (let t = 0; t < e.length; t++) o.push(e[t].ss());
      t.push(o);
    }
    return t;
  }
  static Yn(t) {
    const r = [];
    for (let e = 0; e < t.length; e++) {
      const o = [],
        s = t[e];
      for (let t = 0; t < s.length; t++) o.push(sr.Yn(s[t]));
      r.push(o);
    }
    return new Yt(r);
  }
}

class Zt {
  constructor(t, s) {
    (this.yl = t), (this.Jl = s), (this.yl = t), (this.Jl = s);
  }
  Bl(t) {
    if (null == this.yl || null == this.Jl) return !1;
    const s = t[0],
      i = t[1];
    return s === this.yl && this.Jl.Bl(i);
  }
  static fromJson(t) {
    return new Zt(
      t ? t.event_name : null,
      t ? Yt.fromJson(t.property_filters) : null,
    );
  }
  ss() {
    return { e: this.yl, pf: this.Jl ? this.Jl.ss() : null };
  }
}

class si {
  constructor(t, i) {
    (this.xu = t), (this.zu = i), (this.xu = t), (this.zu = i);
  }
  Bl(t) {
    if (null == this.xu) return !1;
    const i = ri.Bu(t[0], this.xu);
    if (!i) return !1;
    let r = null == this.zu || 0 === this.zu.length;
    if (null != this.zu)
      for (let i = 0; i < this.zu.length; i++)
        if (this.zu[i] === t[1]) {
          r = !0;
          break;
        }
    return i && r;
  }
  static fromJson(t) {
    return new si(t ? t.id : null, t ? t.buttons : null);
  }
  ss() {
    return this.xu;
  }
}

class rs {
  constructor(t) {
    (this.productId = t), (this.productId = t);
  }
  Bl(t) {
    return null == this.productId || t[0] === this.productId;
  }
  static fromJson(t) {
    return new rs(t ? t.product_id : null);
  }
  ss() {
    return this.productId;
  }
}

class is {
  constructor(t, s) {
    (this.productId = t), (this.Jl = s), (this.productId = t), (this.Jl = s);
  }
  Bl(t) {
    if (null == this.productId || null == this.Jl) return !1;
    const s = t[0],
      i = t[1];
    return s === this.productId && this.Jl.Bl(i);
  }
  static fromJson(t) {
    return new is(
      t ? t.product_id : null,
      t ? Yt.fromJson(t.property_filters) : null,
    );
  }
  ss() {
    return { id: this.productId, pf: this.Jl ? this.Jl.ss() : null };
  }
}

class lr {
  constructor(t) {
    (this.xu = t), (this.xu = t);
  }
  Bl(t) {
    return null == this.xu || ri.Bu(t[0], this.xu);
  }
  static fromJson(t) {
    return new lr(t ? t.campaign_id : null);
  }
  ss() {
    return this.xu;
  }
}

var tt = {
  OPEN: "open",
  Rr: "purchase",
  zr: "push_click",
  $e: "custom_event",
  ro: "iam_click",
  zs: "test",
};

class ri {
  constructor(e, t) {
    (this.type = e), (this.data = t), (this.type = e), (this.data = t);
  }
  sc(e, t) {
    return ri.cc[this.type] === e && (null == this.data || this.data.Bl(t));
  }
  static Bu(e, t) {
    let s = null;
    try {
      s = window.atob(e);
    } catch (t) {
      return (
        r$1.j.info("Failed to unencode analytics id " + e + ": " + getErrorMessage(t)), !1
      );
    }
    return t === s.split("_")[0];
  }
  static fromJson(e) {
    const t = e.type;
    let r = null;
    switch (t) {
      case ri.Wr.OPEN:
      case ri.Wr.zs:
        break;
      case ri.Wr.Rr:
        r = rs.fromJson(e.data);
        break;
      case ri.Wr.nc:
        r = is.fromJson(e.data);
        break;
      case ri.Wr.zr:
        r = lr.fromJson(e.data);
        break;
      case ri.Wr.$e:
        r = Qt.fromJson(e.data);
        break;
      case ri.Wr.lc:
        r = Zt.fromJson(e.data);
        break;
      case ri.Wr.ro:
        r = si.fromJson(e.data);
    }
    return new ri(t, r);
  }
  ss() {
    return { t: this.type, d: this.data ? this.data.ss() : null };
  }
  static Yn(e) {
    let t,
      r = null;
    switch (e.t) {
      case ri.Wr.OPEN:
      case ri.Wr.zs:
        break;
      case ri.Wr.Rr:
        r = new rs(e.d);
        break;
      case ri.Wr.nc:
        (t = e.d || {}), (r = new is(t.id, Yt.Yn(t.pf || [])));
        break;
      case ri.Wr.zr:
        r = new lr(e.d);
        break;
      case ri.Wr.$e:
        r = new Qt(e.d);
        break;
      case ri.Wr.lc:
        (t = e.d || {}), (r = new Zt(t.e, Yt.Yn(t.pf || [])));
        break;
      case ri.Wr.ro:
        r = new si(e.d);
    }
    return new ri(e.t, r);
  }
}
(ri.Wr = {
  OPEN: "open",
  Rr: "purchase",
  nc: "purchase_property",
  zr: "push_click",
  $e: "custom_event",
  lc: "custom_event_property",
  ro: "iam_click",
  zs: "test",
}),
  (ri.cc = {}),
  (ri.cc[ri.Wr.OPEN] = tt.OPEN),
  (ri.cc[ri.Wr.Rr] = tt.Rr),
  (ri.cc[ri.Wr.nc] = tt.Rr),
  (ri.cc[ri.Wr.zr] = tt.zr),
  (ri.cc[ri.Wr.$e] = tt.$e),
  (ri.cc[ri.Wr.lc] = tt.$e),
  (ri.cc[ri.Wr.ro] = tt.ro),
  (ri.cc[ri.Wr.zs] = tt.zs);

class mt {
  constructor(t, i = [], s, e, r = 0, h, l, o = 0, n = mt.Du, a, u, d) {
    (this.id = t),
      (this.Pu = i),
      (this.startTime = s),
      (this.endTime = e),
      (this.priority = r),
      (this.type = h),
      (this.data = l),
      (this.Iu = o),
      (this.Mu = n),
      (this.sn = a),
      (this.Fu = u),
      (this.Hu = d),
      (this.id = t),
      (this.Pu = i || []),
      void 0 === s && (s = null),
      (this.startTime = s),
      void 0 === e && (e = null),
      (this.endTime = e),
      (this.priority = r || 0),
      (this.type = h),
      (this.Iu = o || 0),
      null == a && (a = 1e3 * (this.Iu + 30)),
      (this.sn = a),
      (this.data = l),
      null != n && (this.Mu = n),
      (this.Fu = u),
      (this.Hu = d || null);
  }
  Ju(t) {
    return (
      null == this.Hu || (this.Mu !== mt.Du && t - this.Hu >= 1e3 * this.Mu)
    );
  }
  Lu(t) {
    this.Hu = t;
  }
  Ru(t) {
    const i = t + 1e3 * this.Iu;
    return Math.max(i - new Date().valueOf(), 0);
  }
  Vu(t) {
    const i = new Date().valueOf() - t,
      s = null == t || isNaN(i) || null == this.sn || i < this.sn;
    return (
      s ||
        r$1.j.info(
          `Trigger action ${this.type} is no longer eligible for display - fired ${i}ms ago and has a timeout of ${this.sn}ms.`,
        ),
      !s
    );
  }
  static fromJson(t) {
    const i = t.id,
      s = [];
    for (let i = 0; i < t.trigger_condition.length; i++)
      s.push(ri.fromJson(t.trigger_condition[i]));
    const e = dateFromUnixTimestamp(t.start_time),
      r = dateFromUnixTimestamp(t.end_time),
      h = t.priority,
      o = t.type,
      n = t.delay,
      a = t.re_eligibility,
      u = t.timeout,
      d = t.data,
      m = t.min_seconds_since_last_trigger;
    return validateValueIsFromEnum(
      mt.Wr,
      o,
      "Could not construct Trigger from server data",
      "Trigger.Types",
    )
      ? new mt(i, s, e, r, h, o, d, n, a, u, m)
      : null;
  }
  ss() {
    const t = [];
    for (let i = 0; i < this.Pu.length; i++) t.push(this.Pu[i].ss());
    return {
      i: this.id,
      c: t,
      s: this.startTime,
      e: this.endTime,
      p: this.priority,
      t: this.type,
      da: this.data,
      d: this.Iu,
      r: this.Mu,
      tm: this.sn,
      ss: this.Fu,
      ld: this.Hu,
    };
  }
  static Yn(t) {
    const i = [],
      s = t.c || [];
    for (let t = 0; t < s.length; t++) i.push(ri.Yn(s[t]));
    return new mt(
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
(mt.Wr = { Vr: "inapp", Gu: "templated_iam" }), (mt.Du = -1);

function attachCSS(n, t, o) {
  const c = n || document.querySelector("head"),
    s = `ab-${t}-css-definitions-${"4.9.0".replace(/\./g, "-")}`;
  if (!c) return;
  const a = c.ownerDocument || document;
  if (null == a.getElementById(s)) {
    const n = a.createElement("style");
    (n.innerHTML = o || ""), (n.id = s);
    const t = e.nn(L.po);
    null != t && n.setAttribute("nonce", t), c.appendChild(n);
  }
}

function loadFontAwesome() {
  if (e.nn(L.Po)) return;
  const t = "https://use.fontawesome.com/7f85a56ba4.css";
  if (
    !(null !== document.querySelector('link[rel=stylesheet][href="' + t + '"]'))
  ) {
    const e = document.createElement("link");
    e.setAttribute("rel", "stylesheet"),
      e.setAttribute("href", t),
      document.getElementsByTagName("head")[0].appendChild(e);
  }
}

function attachFeedCSS(t) {
  attachCSS(
    t,
    "feed",
    "body>.ab-feed{position:fixed;top:0;right:0;bottom:0;width:421px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}body>.ab-feed .ab-feed-body{position:absolute;top:0;left:0;right:0;border:none;border-left:1px solid #d0d0d0;padding-top:70px;min-height:100%}body>.ab-feed .ab-initial-spinner{float:none}body>.ab-feed .ab-no-cards-message{position:absolute;width:100%;margin-left:-20px;top:40%}.ab-feed{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 1px 7px 1px rgba(66,82,113,.15);-moz-box-shadow:0 1px 7px 1px rgba(66,82,113,.15);box-shadow:0 1px 7px 1px rgba(66,82,113,.15);width:402px;background-color:#eee;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;font-size:13px;line-height:130%;letter-spacing:normal;overflow-y:auto;overflow-x:visible;z-index:9011;-webkit-overflow-scrolling:touch}.ab-feed :focus,.ab-feed:focus{outline:0}.ab-feed .ab-feed-body{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border:1px solid #d0d0d0;border-top:none;padding:20px 20px 0 20px}.ab-feed.ab-effect-slide{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px);-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-feed.ab-effect-slide.ab-show{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}.ab-feed.ab-effect-slide.ab-hide{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px)}.ab-feed .ab-card{position:relative;-webkit-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-moz-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;width:100%;border:1px solid #d0d0d0;margin-bottom:20px;overflow:hidden;background-color:#fff;-webkit-transition:height .4s ease-in-out,margin .4s ease-in-out;-moz-transition:height .4s ease-in-out,margin .4s ease-in-out;-o-transition:height .4s ease-in-out,margin .4s ease-in-out;transition:height .4s ease-in-out,margin .4s ease-in-out}.ab-feed .ab-card .ab-pinned-indicator{position:absolute;right:0;top:0;margin-right:-1px;width:0;height:0;border-style:solid;border-width:0 24px 24px 0;border-color:transparent #1676d0 transparent transparent}.ab-feed .ab-card .ab-pinned-indicator .fa-star{position:absolute;right:-21px;top:2px;font-size:9px;color:#fff}.ab-feed .ab-card.ab-effect-card.ab-hide{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}.ab-feed .ab-card.ab-effect-card.ab-hide.ab-swiped-left{-webkit-transform:translateX(-450px);-moz-transform:translateX(-450px);-ms-transform:translateX(-450px);transform:translateX(-450px)}.ab-feed .ab-card.ab-effect-card.ab-hide.ab-swiped-right{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px)}.ab-feed .ab-card.ab-effect-card.ab-hide:not(.ab-swiped-left):not(.ab-swiped-right){opacity:0}.ab-feed .ab-card .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-size:15px;border:none;width:15px;min-width:15px;height:15px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:15px;padding-bottom:15px;position:absolute;right:0;top:0;z-index:9021;opacity:0;-webkit-transition:.5s;-moz-transition:.5s;-o-transition:.5s;transition:.5s}.ab-feed .ab-card .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b;height:auto;width:100%}.ab-feed .ab-card .ab-close-button svg.ab-chevron{display:none}.ab-feed .ab-card .ab-close-button:active{background-color:transparent}.ab-feed .ab-card .ab-close-button:focus{background-color:transparent}.ab-feed .ab-card .ab-close-button:hover{background-color:transparent}.ab-feed .ab-card .ab-close-button:hover svg{fill-opacity:.8}.ab-feed .ab-card .ab-close-button:hover{opacity:1}.ab-feed .ab-card .ab-close-button:focus{opacity:1}.ab-feed .ab-card a{float:none;color:inherit;text-decoration:none}.ab-feed .ab-card a:hover{text-decoration:underline}.ab-feed .ab-card .ab-image-area{float:none;display:inline-block;vertical-align:top;line-height:0;overflow:hidden;width:100%;-webkit-box-sizing:initial;-moz-box-sizing:initial;box-sizing:initial}.ab-feed .ab-card .ab-image-area img{float:none;height:auto;width:100%}.ab-feed .ab-card.ab-banner .ab-card-body{display:none}.ab-feed .ab-card.ab-image-only .ab-card-body{display:none}.ab-feed .ab-card .ab-card-body{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:inline-block;width:100%;position:relative}.ab-feed .ab-card .ab-unread-indicator{position:absolute;bottom:0;margin-right:-1px;width:100%;height:5px;background-color:#1676d0}.ab-feed .ab-card .ab-unread-indicator.read{background-color:transparent}.ab-feed .ab-card .ab-title{float:none;letter-spacing:0;margin:0;font-weight:700;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;display:block;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;font-size:18px;line-height:130%;padding:20px 25px 0 25px}.ab-feed .ab-card .ab-description{float:none;color:#545454;padding:15px 25px 20px 25px;word-wrap:break-word;white-space:pre-wrap}.ab-feed .ab-card .ab-description.ab-no-title{padding-top:20px}.ab-feed .ab-card .ab-url-area{float:none;color:#1676d0;margin-top:12px;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif}.ab-feed .ab-card.ab-classic-card .ab-card-body{min-height:40px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.ab-feed .ab-card.ab-classic-card.with-image .ab-card-body{min-height:100px;padding-left:72px}.ab-feed .ab-card.ab-classic-card.with-image .ab-image-area{width:60px;height:60px;padding:20px 0 25px 25px;position:absolute}.ab-feed .ab-card.ab-classic-card.with-image .ab-image-area img{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;max-width:100%;max-height:100%;width:auto;height:auto}.ab-feed .ab-card.ab-classic-card.with-image .ab-title{background-color:transparent;font-size:16px}.ab-feed .ab-card.ab-classic-card.with-image .ab-description{padding-top:10px}.ab-feed .ab-card.ab-control-card{height:0;width:0;margin:0;border:0}.ab-feed .ab-feed-buttons-wrapper{float:none;position:relative;background-color:#282828;height:50px;-webkit-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-moz-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);box-shadow:0 2px 3px 0 rgba(178,178,178,.5);z-index:1}.ab-feed .ab-feed-buttons-wrapper .ab-close-button,.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button{float:none;cursor:pointer;color:#fff;font-size:18px;padding:16px;-webkit-transition:.2s;-moz-transition:.2s;-o-transition:.2s;transition:.2s}.ab-feed .ab-feed-buttons-wrapper .ab-close-button:hover,.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button:hover{font-size:22px}.ab-feed .ab-feed-buttons-wrapper .ab-close-button{float:right}.ab-feed .ab-feed-buttons-wrapper .ab-close-button:hover{padding-top:12px;padding-right:14px}.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button{padding-left:17px}.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button:hover{padding-top:13px;padding-left:14px}.ab-feed .ab-no-cards-message{text-align:center;margin-bottom:20px}@media (max-width:600px){body>.ab-feed{width:100%}}",
  );
}
function setupFeedUI() {
  attachFeedCSS(), loadFontAwesome();
}

function attachInAppMessageCSS(t) {
  attachCSS(
    t,
    "iam",
    ".ab-pause-scrolling,body.ab-pause-scrolling,html.ab-pause-scrolling{overflow:hidden;touch-action:none}.ab-iam-root.v3{position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:9011;-webkit-tap-highlight-color:transparent}.ab-iam-root.v3:focus{outline:0}.ab-iam-root.v3.ab-effect-fullscreen,.ab-iam-root.v3.ab-effect-html,.ab-iam-root.v3.ab-effect-modal{opacity:0}.ab-iam-root.v3.ab-effect-fullscreen.ab-show,.ab-iam-root.v3.ab-effect-html.ab-show,.ab-iam-root.v3.ab-effect-modal.ab-show{opacity:1}.ab-iam-root.v3.ab-effect-fullscreen.ab-show.ab-animate-in,.ab-iam-root.v3.ab-effect-html.ab-show.ab-animate-in,.ab-iam-root.v3.ab-effect-modal.ab-show.ab-animate-in{-webkit-transition:opacity .5s;-moz-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s}.ab-iam-root.v3.ab-effect-fullscreen.ab-hide,.ab-iam-root.v3.ab-effect-html.ab-hide,.ab-iam-root.v3.ab-effect-modal.ab-hide{opacity:0}.ab-iam-root.v3.ab-effect-fullscreen.ab-hide.ab-animate-out,.ab-iam-root.v3.ab-effect-html.ab-hide.ab-animate-out,.ab-iam-root.v3.ab-effect-modal.ab-hide.ab-animate-out{-webkit-transition:opacity .5s;-moz-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s}.ab-iam-root.v3.ab-effect-slide .ab-in-app-message{-webkit-transform:translateX(535px);-moz-transform:translateX(535px);-ms-transform:translateX(535px);transform:translateX(535px)}.ab-iam-root.v3.ab-effect-slide.ab-show .ab-in-app-message{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}.ab-iam-root.v3.ab-effect-slide.ab-show.ab-animate-in .ab-in-app-message{-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message{-webkit-transform:translateX(535px);-moz-transform:translateX(535px);-ms-transform:translateX(535px);transform:translateX(535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-left{-webkit-transform:translateX(-535px);-moz-transform:translateX(-535px);-ms-transform:translateX(-535px);transform:translateX(-535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-up{-webkit-transform:translateY(-535px);-moz-transform:translateY(-535px);-ms-transform:translateY(-535px);transform:translateY(-535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-down{-webkit-transform:translateY(535px);-moz-transform:translateY(535px);-ms-transform:translateY(535px);transform:translateY(535px)}.ab-iam-root.v3.ab-effect-slide.ab-hide.ab-animate-out .ab-in-app-message{-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-iam-root.v3 .ab-ios-scroll-wrapper{position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto;pointer-events:all;touch-action:auto;-webkit-overflow-scrolling:touch}.ab-iam-root.v3 .ab-in-app-message{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:fixed;text-align:center;-webkit-box-shadow:0 0 4px rgba(0,0,0,.3);-moz-box-shadow:0 0 4px rgba(0,0,0,.3);box-shadow:0 0 4px rgba(0,0,0,.3);line-height:normal;letter-spacing:normal;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;z-index:9011;max-width:100%;overflow:hidden;display:inline-block;pointer-events:all;color:#333}.ab-iam-root.v3 .ab-in-app-message.ab-no-shadow{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.ab-iam-root.v3 .ab-in-app-message :focus,.ab-iam-root.v3 .ab-in-app-message:focus{outline:0}.ab-iam-root.v3 .ab-in-app-message.ab-clickable{cursor:pointer}.ab-iam-root.v3 .ab-in-app-message.ab-background{background-color:#fff}.ab-iam-root.v3 .ab-in-app-message .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-size:15px;border:none;width:15px;min-width:15px;height:15px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:15px;padding-bottom:15px;position:absolute;right:0;top:0;z-index:9021}.ab-iam-root.v3 .ab-in-app-message .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b;height:auto;width:100%}.ab-iam-root.v3 .ab-in-app-message .ab-close-button svg.ab-chevron{display:none}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:active{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:focus{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:hover{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-close-button:hover svg{fill-opacity:.8}.ab-iam-root.v3 .ab-in-app-message .ab-message-text{float:none;line-height:1.5;margin:20px 25px;max-width:100%;overflow:hidden;overflow-y:auto;vertical-align:text-bottom;word-wrap:break-word;white-space:pre-wrap;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif}.ab-iam-root.v3 .ab-in-app-message .ab-message-text.start-aligned{text-align:start}.ab-iam-root.v3 .ab-in-app-message .ab-message-text.end-aligned{text-align:end}.ab-iam-root.v3 .ab-in-app-message .ab-message-text.center-aligned{text-align:center}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar{-webkit-appearance:none;width:14px}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-thumb{-webkit-appearance:none;border:4px solid transparent;background-clip:padding-box;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;background-color:rgba(0,0,0,.2)}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-button{width:0;height:0;display:none}.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-corner{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-message-header{float:none;letter-spacing:0;margin:0;font-weight:700;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;display:block;font-size:20px;margin-bottom:10px;line-height:1.3}.ab-iam-root.v3 .ab-in-app-message .ab-message-header.start-aligned{text-align:start}.ab-iam-root.v3 .ab-in-app-message .ab-message-header.end-aligned{text-align:end}.ab-iam-root.v3 .ab-in-app-message .ab-message-header.center-aligned{text-align:center}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message.ab-modal,.ab-iam-root.v3 .ab-in-app-message.ab-slideup{-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;cursor:pointer;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;font-size:14px;font-weight:700;margin:20px;margin-top:calc(constant(safe-area-inset-top,0) + 20px);margin-right:calc(constant(safe-area-inset-right,0) + 20px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 20px);margin-left:calc(constant(safe-area-inset-left,0) + 20px);margin-top:calc(env(safe-area-inset-top,0) + 20px);margin-right:calc(env(safe-area-inset-right,0) + 20px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 20px);margin-left:calc(env(safe-area-inset-left,0) + 20px);max-height:150px;padding:10px;right:0;background-color:#efefef}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone{max-height:66px;margin:10px;margin-top:calc(constant(safe-area-inset-top,0) + 10px);margin-right:calc(constant(safe-area-inset-right,0) + 10px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 10px);margin-left:calc(constant(safe-area-inset-left,0) + 10px);margin-top:calc(env(safe-area-inset-top,0) + 10px);margin-right:calc(env(safe-area-inset-right,0) + 10px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 10px);margin-left:calc(env(safe-area-inset-left,0) + 10px);max-width:90%;max-width:calc(100% - 40px);min-width:90%;min-width:calc(100% - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button svg:not(.ab-chevron){display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button{display:block;height:20px;padding:0 20px 0 18px;pointer-events:none;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:12px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button svg.ab-chevron{display:inline}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-message-text{border-right-width:40px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text{max-width:100%;border-right-width:10px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text span{max-height:66px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-image{max-width:80%;max-width:calc(100% - 50px - 5px - 10px - 25px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area{width:50px;height:50px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area img{max-width:100%;max-height:100%;width:auto;height:auto}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:active .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-message-text{opacity:.8}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:active .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-close-button svg.ab-chevron{fill-opacity:.8}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:table-cell;border-color:transparent;border-style:solid;border-width:5px 25px 5px 10px;max-width:430px;vertical-align:middle;margin:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text span{display:block;max-height:150px;overflow:auto}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-image{max-width:365px;border-top:0;border-bottom:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-size:15px;border:none;width:15px;min-width:15px;height:15px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:15px;padding-bottom:15px;position:absolute;right:0;top:0;z-index:9021}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b;height:auto;width:100%}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg.ab-chevron{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:active{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:focus{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:hover{background-color:transparent}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:hover svg{fill-opacity:.8}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area{float:none;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:table-cell;border-color:transparent;border-style:solid;border-width:5px 0 5px 5px;vertical-align:top;width:60px;margin:0}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area.ab-icon-area{width:auto}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area img{float:none;width:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message.ab-modal{font-size:14px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area{float:none;position:relative;display:block;overflow:hidden}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area .ab-center-cropped-img,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area .ab-center-cropped-img{background-size:cover;background-repeat:no-repeat;background-position:50% 50%;position:absolute;top:0;right:0;bottom:0;left:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-icon,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-icon{margin-top:20px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic{padding:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-message-text{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-message-buttons{bottom:0;left:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area{float:none;height:auto;margin:0}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{display:block;top:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none}.ab-iam-root.v3 .ab-in-app-message.ab-modal{padding-top:20px;width:450px;max-width:450px;max-height:720px}.ab-iam-root.v3 .ab-in-app-message.ab-modal.simulate-phone{max-width:91%;max-width:calc(100% - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal.simulate-phone.graphic .ab-image-area img{max-width:91vw;max-width:calc(100vw - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text{max-height:660px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-image{max-height:524.82758621px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-icon{max-height:610px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons{margin-bottom:93px;max-height:587px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-image{max-height:451.82758621px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-icon{max-height:537px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area{margin-top:-20px;max-height:155.17241379px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area img{max-width:100%;max-height:155.17241379px}.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area.ab-icon-area{height:auto}.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic{width:auto;overflow:hidden}.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area{display:inline}.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{width:auto;max-height:720px;max-width:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen{width:450px;max-height:720px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape{width:720px;max-height:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape .ab-image-area{height:225px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape.graphic .ab-image-area{height:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape .ab-message-text{max-height:112px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-message-text{max-height:247px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-message-text.ab-with-buttons{margin-bottom:93px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area{height:360px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area{height:720px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone{-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-html-message{background-color:transparent;border:none;height:100%;overflow:auto;position:relative;touch-action:auto;width:100%}.ab-iam-root.v3 .ab-in-app-message .ab-message-buttons{position:absolute;bottom:0;width:100%;padding:17px 25px 30px 25px;z-index:inherit;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ab-iam-root.v3 .ab-in-app-message .ab-message-button{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;cursor:pointer;display:inline-block;font-size:14px;font-weight:700;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;height:44px;line-height:normal;letter-spacing:normal;margin:0;max-width:100%;min-width:80px;padding:0 12px;position:relative;text-transform:none;width:48%;width:calc(50% - 5px);border:1px solid #1b78cf;-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;word-wrap:normal;white-space:nowrap}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:first-of-type{float:left;background-color:#fff;color:#1b78cf}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:last-of-type{float:right;background-color:#1b78cf;color:#fff}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:first-of-type:last-of-type{float:none;width:auto}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:after{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:hover{opacity:.8}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:active:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.08)}.ab-iam-root.v3 .ab-in-app-message .ab-message-button:focus:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.15)}.ab-iam-root.v3 .ab-in-app-message .ab-message-button a{color:inherit;text-decoration:inherit}.ab-iam-root.v3 .ab-in-app-message img{float:none;display:inline-block}.ab-iam-root.v3 .ab-in-app-message .ab-icon{float:none;display:inline-block;padding:10px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.ab-iam-root.v3 .ab-in-app-message .ab-icon .fa{float:none;font-size:30px;width:30px}.ab-iam-root.v3 .ab-start-hidden{visibility:hidden}.ab-iam-root.v3 .ab-centered{margin:auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ab-iam-root.v3{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.ab-iam-root.v3 .ab-page-blocker{position:fixed;top:0;left:0;width:100%;height:100%;z-index:9001;pointer-events:all;background-color:rgba(51,51,51,.75)}@media (max-width:600px){.ab-iam-root.v3 .ab-in-app-message.ab-slideup{max-height:66px;margin:10px;margin-top:calc(constant(safe-area-inset-top,0) + 10px);margin-right:calc(constant(safe-area-inset-right,0) + 10px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 10px);margin-left:calc(constant(safe-area-inset-left,0) + 10px);margin-top:calc(env(safe-area-inset-top,0) + 10px);margin-right:calc(env(safe-area-inset-right,0) + 10px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 10px);margin-left:calc(env(safe-area-inset-left,0) + 10px);max-width:90%;max-width:calc(100% - 40px);min-width:90%;min-width:calc(100% - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg:not(.ab-chevron){display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-close-button{display:block;height:20px;padding:0 20px 0 18px;pointer-events:none;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:12px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-close-button svg.ab-chevron{display:inline}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-message-text{border-right-width:40px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text{max-width:100%;border-right-width:10px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text span{max-height:66px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-image{max-width:80%;max-width:calc(100% - 50px - 5px - 10px - 25px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area{width:50px;height:50px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area img{max-width:100%;max-height:100%;width:auto;height:auto}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape{-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-close-button,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-message-text,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape:not(.graphic),.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen:not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape:not(.graphic) .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen:not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic{display:block}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic .ab-message-button,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-width:480px){.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop){max-width:91%;max-width:calc(100% - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop).graphic .ab-image-area img{max-width:91vw;max-width:calc(100vw - 30px)}}@media (max-height:750px){.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop){max-height:91%;max-height:calc(100% - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop).graphic .ab-image-area img{max-height:91vh;max-height:calc(100vh - 30px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text{max-height:65vh;max-height:calc(100vh - 30px - 60px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-image{max-height:45vh;max-height:calc(100vh - 30px - 155.17241379310346px - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-icon{max-height:45vh;max-height:calc(100vh - 30px - 70px - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-buttons{max-height:50vh;max-height:calc(100vh - 30px - 93px - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-buttons.ab-with-image{max-height:30vh;max-height:calc(100vh - 30px - 155.17241379310346px - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-modal:not(.force-desktop) .ab-message-text.ab-with-buttons.ab-with-icon{max-height:30vh;max-height:calc(100vh - 30px - 70px - 93px - 20px)}}@media (min-width:601px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area img{max-height:100%;max-width:100%}}@media (max-height:750px) and (min-width:601px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important;width:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-height:480px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-width:750px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}",
  );
}
function setupInAppMessageUI() {
  attachInAppMessageCSS(), loadFontAwesome();
}

function me(e) {
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

function createCloseButton(t, o, e) {
  const n = document.createElement("button");
  n.setAttribute("aria-label", t),
    n.setAttribute("tabindex", "0"),
    n.setAttribute("role", "button"),
    addPassiveEventListener(n, "touchstart"),
    (n.className = "ab-close-button");
  const r = buildSvg(
    "0 0 15 15",
    "M15 1.5L13.5 0l-6 6-6-6L0 1.5l6 6-6 6L1.5 15l6-6 6 6 1.5-1.5-6-6 6-6z",
    o,
  );
  return (
    n.appendChild(r),
    n.addEventListener("keydown", (t) => {
      (t.keyCode !== KeyCodes.Fo && t.keyCode !== KeyCodes.To) ||
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

function logInAppMessageImpression(o) {
  if (!e.rr()) return !1;
  if (!(o instanceof InAppMessage || o instanceof ControlMessage))
    return r$1.j.error(MUST_BE_IN_APP_MESSAGE_WARNING), !1;
  const s = o instanceof ControlMessage ? r$1.q.eo : r$1.q.Vi;
  return se$1.m().N(o, s).O;
}

function logInAppMessageClick(o) {
  if (!e.rr()) return !1;
  if (!(o instanceof InAppMessage)) return r$1.j.error(MUST_BE_IN_APP_MESSAGE_WARNING), !1;
  const s = se$1.m().N(o, r$1.q.Li);
  if (s) {
    o.so() || logInAppMessageImpression(o);
    for (let r = 0; r < s.ve.length; r++)
      TriggersProviderFactory.er().be(tt.ro, [o.triggerId], s.ve[r]);
  }
  return s.O;
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
  ao: _isPhone,
  mo: _getOrientation,
  Cn: _getCurrentUrl,
};

function getUser() {
  if (e.rr()) return e.br();
}

function _handleBrazeAction(o, s, t) {
  if (e.rr())
    if (BRAZE_ACTION_URI_REGEX.test(o)) {
      const s = getDecodedBrazeAction(o);
      if (!s) return;
      const t = (o) => {
        if (!isValidBrazeActionJson(o))
          return void r$1.j.error(
            `Decoded Braze Action json is invalid: ${JSON.stringify(
              o,
              null,
              2,
            )}`,
          );
        const s = BRAZE_ACTIONS.properties.type,
          i = BRAZE_ACTIONS.properties.me,
          n = BRAZE_ACTIONS.properties.le,
          a = o[s];
        if (a === BRAZE_ACTIONS.types.ue) {
          const e = o[i];
          for (const o of e) t(o);
        } else {
          const s = o[n];
          let t, i;
          switch (a) {
            case BRAZE_ACTIONS.types.logCustomEvent:
              Promise.resolve().then(function () { return logCustomEvent$1; }).then(
                ({ logCustomEvent: logCustomEvent }) => {
                  e.fe()
                    ? ((i = Array.prototype.slice.call(s)),
                      logCustomEvent(...i))
                    : r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
                },
              );
              break;
            case BRAZE_ACTIONS.types.requestPushPermission:
              Promise.resolve().then(function () { return requestPushPermission$1; }).then(
                ({ requestPushPermission: requestPushPermission }) => {
                  e.fe()
                    ? "Safari" === V.browser && V.OS === OperatingSystems.de
                      ? window.navigator.standalone && requestPushPermission()
                      : requestPushPermission()
                    : r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
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
              if (((t = getUser()), t)) {
                t[a](...Array.prototype.slice.call(s));
              }
              break;
            case BRAZE_ACTIONS.types.pe:
            case BRAZE_ACTIONS.types.je:
              (i = Array.prototype.slice.call(s)), WindowUtils.openUri(...i);
              break;
            default:
              r$1.j.info(`Ignoring unknown Braze Action: ${a}`);
          }
        }
      };
      t(s);
    } else WindowUtils.openUri(o, s, t);
}
function handleBrazeAction(e, o) {
  _handleBrazeAction(e, o);
}

function logInAppMessageHtmlClick(s, t, o) {
  if (!e.rr()) return !1;
  if (!(s instanceof HtmlMessage))
    return (
      r$1.j.error(
        "inAppMessage argument to logInAppMessageHtmlClick must be an HtmlMessage object.",
      ),
      !1
    );
  let m = r$1.q.Li;
  null != t && (m = r$1.q.Qi);
  const i = se$1.m().N(s, m, t, o);
  if (i.O)
    for (let r = 0; r < i.ve.length; r++)
      TriggersProviderFactory.er().be(tt.ro, [s.triggerId, t], i.ve[r]);
  return i.O;
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

function at(t, o, n, s, i, u) {
  const c = document.createElement("iframe");
  c.setAttribute("title", "Modal Message"),
    i && (c.style.zIndex = (i + 1).toString());
  const a = (e) => {
      const o = e.getAttribute("href"),
        r = e.onclick;
      return (n) => {
        if (null != r && "function" == typeof r && !1 === r.bind(e)(n)) return;
        let i = parseQueryStringKeyValues(o).abButtonId;
        if (
          ((null != i && "" !== i) || (i = e.getAttribute("id") || void 0),
          null != o && "" !== o && 0 !== o.indexOf("#"))
        ) {
          const r =
              "blank" ===
              (e.getAttribute("target") || "").toLowerCase().replace("_", ""),
            u = s || t.openTarget === InAppMessage.OpenTarget.BLANK || r,
            a = () => {
              logInAppMessageHtmlClick(t, i, o), WindowUtils.openUri(o, u, n);
            };
          u ? a() : t.ye(c, a);
        } else logInAppMessageHtmlClick(t, i, o || void 0);
        return n.stopPropagation(), !1;
      };
    },
    m = (t, e, o) => {
      const r = `([\\w]+)\\s*=\\s*document.createElement\\(['"]${o}['"]\\)`,
        n = t.match(new RegExp(r));
      if (n) {
        const o = `${n[1]}.setAttribute("nonce", "${e}")`;
        return `${t.slice(0, n.index + n[0].length)};${o};${t.slice(
          n.index + n[0].length,
        )}`;
      }
      return null;
    };
  if (
    ((c.onload = () => {
      let s = null;
      if (null != u) {
        (s = document.createElement("html")), (s.innerHTML = t.message || "");
        const e = s.getElementsByTagName("style");
        for (let t = 0; t < e.length; t++) e[t].setAttribute("nonce", u);
        const o = s.getElementsByTagName("script");
        for (let t = 0; t < o.length; t++) {
          o[t].setAttribute("nonce", u),
            (o[t].innerHTML = o[t].innerHTML.replace(
              /<style>/g,
              `<style nonce='${u}'>`,
            ));
          const e = m(o[t].innerHTML, u, "script");
          e && (o[t].innerHTML = e);
          const r = m(o[t].innerHTML, u, "style");
          r && (o[t].innerHTML = r);
        }
      }
      const i = c.contentWindow;
      i.focus(), i.document.write(s ? s.innerHTML : t.message || "");
      const l = i.document.getElementsByTagName("head")[0];
      if (null != l) {
        if ((attachInAppMessageCSS(l), t.Ae())) {
          const e = document.createElement("style");
          (e.innerHTML = t.css || ""),
            (e.id = t.Ce() || ""),
            null != u && e.setAttribute("nonce", u),
            l.appendChild(e);
        }
        const e = i.document.createElement("base");
        null != e && (e.setAttribute("target", "_parent"), l.appendChild(e));
      }
      const f = i.document.getElementsByTagName("title");
      f && f.length > 0 && c.setAttribute("title", f[0].textContent || "");
      const d = {
          closeMessage: function () {
            t.ye(c);
          },
          logClick: function () {
            logInAppMessageHtmlClick(t, ...arguments);
          },
          display: {},
          web: {},
        },
        requestPushPermission = function () {
          return function () {
            const t = arguments;
            Promise.resolve().then(function () { return requestPushPermission$1; }).then((o) => {
              e.fe()
                ? o.requestPushPermission(...Array.prototype.slice.call(t))
                : r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
            });
          };
        },
        p = {
          requestImmediateDataFlush: function () {
            const t = arguments;
            Promise.resolve().then(function () { return requestImmediateDataFlush$1; }).then(
              ({ requestImmediateDataFlush: requestImmediateDataFlush }) => {
                e.fe()
                  ? requestImmediateDataFlush(...Array.prototype.slice.call(t))
                  : r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
              },
            );
          },
          logCustomEvent: function () {
            const t = arguments;
            Promise.resolve().then(function () { return logCustomEvent$1; }).then(
              ({ logCustomEvent: logCustomEvent }) => {
                if (!e.fe()) return void r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
                logCustomEvent(...Array.prototype.slice.call(t));
              },
            );
          },
          logPurchase: function () {
            const t = arguments;
            Promise.resolve().then(function () { return logPurchase$1; }).then(
              ({ logPurchase: logPurchase }) => {
                if (!e.fe()) return void r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
                logPurchase(...Array.prototype.slice.call(t));
              },
            );
          },
          unregisterPush: function () {
            const t = arguments;
            Promise.resolve().then(function () { return unregisterPush$1; }).then(
              ({ unregisterPush: unregisterPush }) => {
                e.fe()
                  ? unregisterPush(...Array.prototype.slice.call(t))
                  : r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
              },
            );
          },
          requestPushPermission: requestPushPermission(),
          changeUser: function () {
            const t = arguments;
            Promise.resolve().then(function () { return changeUser$1; }).then(
              ({ changeUser: changeUser }) => {
                if (!e.fe()) return void r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
                changeUser(...Array.prototype.slice.call(t));
              },
            );
          },
        },
        h = function (t) {
          return function () {
            p[t](...Array.prototype.slice.call(arguments));
          };
        };
      for (const t of keys(p)) d[t] = h(t);
      const b = [
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
        ],
        g = function (t) {
          return function () {
            const e = getUser();
            e && e[t](...Array.prototype.slice.call(arguments));
          };
        },
        y = {};
      for (let t = 0; t < b.length; t++) y[b[t]] = g(b[t]);
      d.getUser = function () {
        return y;
      };
      const A = { showFeed: o },
        j = function (e) {
          return function () {
            const o = arguments;
            t.ye(c, function () {
              A[e](...Array.prototype.slice.call(o));
            });
          };
        },
        C = d.display;
      for (const t of keys(A)) C[t] = j(t);
      const v = { registerAppboyPushMessages: requestPushPermission() },
        w = function (t) {
          return function () {
            v[t](...Array.prototype.slice.call(arguments));
          };
        },
        E = d.web;
      for (const t of keys(v)) E[t] = w(t);
      if (
        ((i.appboyBridge = d), (i.brazeBridge = d), t.Pe !== InAppMessage.qe.Ee)
      ) {
        const t = i.document.getElementsByTagName("a");
        for (let e = 0; e < t.length; e++) t[e].onclick = a(t[e]);
        const e = i.document.getElementsByTagName("button");
        for (let t = 0; t < e.length; t++) e[t].onclick = a(e[t]);
      }
      const $ = i.document.body;
      if (null != $) {
        t.Ne() && ($.id = t.htmlId || "");
        const e = document.createElement("hidden");
        (e.onclick = d.closeMessage),
          (e.className = "ab-programmatic-close-button"),
          $.appendChild(e);
      }
      i.dispatchEvent(new CustomEvent("ab.BridgeReady")),
        -1 !== c.className.indexOf("ab-start-hidden") &&
          ((c.className = c.className.replace("ab-start-hidden", "")), n(c)),
        document.activeElement !== c && c.focus();
    }),
    (c.className =
      "ab-in-app-message ab-start-hidden ab-html-message ab-modal-interactions"),
    V.OS === OperatingSystems.de)
  ) {
    const e = document.createElement("div");
    return (
      (e.className = "ab-ios-scroll-wrapper"), e.appendChild(c), (t.Me = e), e
    );
  }
  return (t.Me = c), c;
}

function logInAppMessageButtonClick(o, t) {
  var s;
  if (!e.rr()) return !1;
  if (!(o instanceof InAppMessageButton))
    return r$1.j.error("button must be an InAppMessageButton object"), !1;
  if (!(t instanceof InAppMessage)) return r$1.j.error(MUST_BE_IN_APP_MESSAGE_WARNING), !1;
  const n = se$1.m().Xi(o, t);
  if (n.O)
    for (let r = 0; r < n.ve.length; r++)
      TriggersProviderFactory.er().be(
        tt.ro,
        [
          t.triggerId,
          null === (s = o.id) || void 0 === s ? void 0 : s.toString(),
        ],
        n.ve[r],
      );
  return n.O;
}

const ce = {
  Je: (t) => {
    const o = t.querySelectorAll(
      ".ab-close-button, .ab-message-text, .ab-message-button",
    );
    let e;
    for (let t = 0; t < o.length; t++) (e = o[t]), (e.tabIndex = 0);
    if (o.length > 0) {
      const e = o[0],
        s = o[o.length - 1];
      t.addEventListener("keydown", (o) => {
        const a = document.activeElement;
        o.keyCode === KeyCodes.oo &&
          (o.shiftKey || (a !== s && a !== t)
            ? !o.shiftKey ||
              (a !== e && a !== t) ||
              (o.preventDefault(), s.focus())
            : (o.preventDefault(), e.focus()));
      });
    }
  },
  Ke: (t, o) => {
    o.setAttribute("role", "dialog"),
      o.setAttribute("aria-modal", "true"),
      o.setAttribute("aria-label", "Modal Message"),
      t && o.setAttribute("aria-labelledby", t);
  },
  He: (t, o, e, s) => {
    if (t.buttons && t.buttons.length > 0) {
      const a = document.createElement("div");
      (a.className = "ab-message-buttons"), e.appendChild(a);
      const l = e.getElementsByClassName("ab-message-text")[0];
      null != l && (l.className += " ab-with-buttons");
      const n = (a) => (l) => (
        t.ye(e, () => {
          logInAppMessageButtonClick(a, t),
            a.clickAction === InAppMessage.ClickAction.URI
              ? _handleBrazeAction(
                  a.uri || "",
                  s || t.openTarget === InAppMessage.OpenTarget.BLANK,
                  l,
                )
              : a.clickAction === InAppMessage.ClickAction.NEWS_FEED && o();
        }),
        l.stopPropagation(),
        !1
      );
      for (let o = 0; o < t.buttons.length; o++) {
        const e = t.buttons[o],
          s = document.createElement("button");
        (s.className = "ab-message-button"),
          s.setAttribute("type", "button"),
          addPassiveEventListener(s, "touchstart");
        let l = e.text;
        "" === e.text && (l = " "),
          s.appendChild(document.createTextNode(l)),
          t.Ae() ||
            ((s.style.backgroundColor = toRgba(e.backgroundColor)),
            (s.style.color = toRgba(e.textColor)),
            (s.style.borderColor = toRgba(e.borderColor))),
          (s.onclick = n(e)),
          a.appendChild(s);
      }
    }
  },
};

function de(e, a, t, n, s, i, l, u = document.body) {
  if (((e.ke = document.activeElement), e instanceof HtmlMessage))
    return at(e, a, t, s, i, l);
  const b = (function (e, a, t, n, s, i, l = document.body) {
    let c = null;
    const d = document.createElement("div");
    (d.className = "ab-in-app-message ab-start-hidden ab-background"),
      i && (d.style.zIndex = (i + 1).toString()),
      e.xe() &&
        ((d.className += " ab-modal-interactions"),
        d.setAttribute("tabindex", "-1")),
      e.Ae() ||
        ((d.style.color = toRgba(e.textColor)),
        (d.style.backgroundColor = toRgba(e.backgroundColor)),
        isTransparent(e.backgroundColor) && (d.className += " ab-no-shadow"));
    const u = () => {
        -1 !== d.className.indexOf("ab-start-hidden") &&
          ((d.className = d.className.replace("ab-start-hidden", "")),
          document.querySelectorAll(".ab-iam-img-loading").length > 0
            ? n(
                `Cannot show in-app message ${e.message} because another message is being shown.`,
                InAppMessage.Ie.Le,
              )
            : t(d));
      },
      b = (o = !0) => {
        let a = document.querySelectorAll(".ab-iam-root");
        (a && 0 !== a.length) || (a = l.querySelectorAll(".ab-iam-root")),
          a &&
            a.length > 0 &&
            (a[0].classList.remove("ab-iam-img-loading"),
            c && (clearTimeout(c), (c = null)),
            o
              ? u()
              : r$1.j.error(
                  `Cannot show in-app message ${e.message} because the image failed to load.`,
                ));
      };
    e.imageStyle === InAppMessage.ImageStyle.GRAPHIC &&
      (d.className += " graphic"),
      e.orientation === InAppMessage.Orientation.LANDSCAPE &&
        (d.className += " landscape"),
      null != e.buttons &&
        0 === e.buttons.length &&
        (e.clickAction !== InAppMessage.ClickAction.NONE &&
          (d.className += " ab-clickable"),
        (d.onclick = (o) => (
          e.ye(d, () => {
            logInAppMessageClick(e),
              e.clickAction === InAppMessage.ClickAction.URI
                ? _handleBrazeAction(
                    e.uri || "",
                    s || e.openTarget === InAppMessage.OpenTarget.BLANK,
                    o,
                  )
                : e.clickAction === InAppMessage.ClickAction.NEWS_FEED && a();
          }),
          o.stopPropagation(),
          !1
        )));
    const p = createCloseButton(
      "Close Message",
      e.Ae() ? void 0 : toRgba(e.closeButtonColor),
      () => {
        e.ye(d);
      },
    );
    d.appendChild(p), i && (p.style.zIndex = (i + 2).toString());
    const g = document.createElement("div");
    g.className = "ab-message-text";
    const f = (e.messageAlignment || e.Te).toLowerCase();
    g.className += " " + f + "-aligned";
    let h = !1;
    const j = document.createElement("div");
    if (((j.className = "ab-image-area"), e.imageUrl)) {
      if (e.cropType === InAppMessage.CropType.CENTER_CROP) {
        const o = document.createElement("span");
        (o.className = "ab-center-cropped-img"),
          (o.style.backgroundImage = "url(" + e.imageUrl + ")"),
          o.setAttribute("role", "img"),
          o.setAttribute("aria-label", "Modal Image"),
          e.Be(o),
          j.appendChild(o);
      } else {
        const o = document.createElement("img");
        if (
          (o.setAttribute("src", e.imageUrl),
          e.Be(o),
          0 === document.querySelectorAll(".ab-iam-img-loading").length)
        ) {
          h = !0;
          const e = document.querySelectorAll(".ab-iam-root");
          e && e.length > 0 && e[0].classList.add("ab-iam-img-loading"),
            (c = window.setTimeout(() => {
              b(!1);
            }, 6e4)),
            (o.onload = () => {
              b();
            }),
            (o.onerror = () => {
              b(!1);
            });
        }
        j.appendChild(o);
      }
      d.appendChild(j), (g.className += " ab-with-image");
    } else if (e.icon) {
      j.className += " ab-icon-area";
      const o = document.createElement("span");
      (o.className = "ab-icon"),
        e.Ae() ||
          ((o.style.backgroundColor = toRgba(e.iconBackgroundColor)),
          (o.style.color = toRgba(e.iconColor)));
      const a = document.createElement("i");
      (a.className = "fa"),
        a.appendChild(document.createTextNode(e.icon)),
        a.setAttribute("aria-hidden", "true"),
        o.appendChild(a),
        j.appendChild(o),
        d.appendChild(j),
        (g.className += " ab-with-icon");
    }
    if ((addPassiveEventListener(g, "touchstart"), e.header && e.header.length > 0)) {
      const o = document.createElement("h1");
      (o.className = "ab-message-header"), (e.De = r$1.Z.Y()), (o.id = e.De);
      const a = (
        e.headerAlignment || InAppMessage.TextAlignment.CENTER
      ).toLowerCase();
      (o.className += " " + a + "-aligned"),
        e.Ae() || (o.style.color = toRgba(e.headerTextColor)),
        o.appendChild(document.createTextNode(e.header)),
        g.appendChild(o);
    }
    return g.appendChild(e.Ge()), d.appendChild(g), h || u(), (e.Me = d), d;
  })(e, a, t, n, s, i, u);
  if (e instanceof FullScreenMessage || e instanceof ModalMessage) {
    const o = e instanceof FullScreenMessage ? "ab-fullscreen" : "ab-modal";
    (b.className += ` ${o} ab-centered`),
      ce.He(e, a, b, s),
      ce.Je(b),
      ce.Ke(e.De, b);
  } else if (e instanceof SlideUpMessage) {
    b.className += " ab-slideup";
    const o = b.getElementsByClassName("ab-close-button")[0];
    if (null != o) {
      const a = buildSvg(
        "0 0 11.38 19.44",
        "M11.38 9.72l-9.33 9.72L0 17.3l7.27-7.58L0 2.14 2.05 0l9.33 9.72z",
        e.Ae() ? void 0 : toRgba(e.closeButtonColor),
      );
      a.setAttribute("class", "ab-chevron"), o.appendChild(a);
    }
    let a, t;
    detectSwipe(b, DIRECTIONS.W, (e) => {
      (b.className += " ab-swiped-left"),
        null != o && null != o.onclick && o.onclick(e);
    }),
      detectSwipe(b, DIRECTIONS.X, (e) => {
        (b.className += " ab-swiped-right"),
          null != o && null != o.onclick && o.onclick(e);
      }),
      e.slideFrom === InAppMessage.SlideFrom.TOP
        ? ((a = DIRECTIONS.Oe), (t = " ab-swiped-up"))
        : ((a = DIRECTIONS.Qe), (t = " ab-swiped-down")),
      detectSwipe(b, a, (e) => {
        (b.className += t), null != o && null != o.onclick && o.onclick(e);
      });
  }
  return b;
}

function showInAppMessage(s, t, o) {
  if (!e.rr()) return;
  if ((setupInAppMessageUI(), null == s)) return !1;
  if (s instanceof ControlMessage)
    return (
      r$1.j.info(
        "User received control for a multivariate test, logging to Braze servers.",
      ),
      logInAppMessageImpression(s),
      !0
    );
  if (!(s instanceof InAppMessage)) return !1;
  if (s.constructor === InAppMessage) return !1;
  const i = se$1.m();
  s.Nh();
  const n = s instanceof HtmlMessage;
  if (n && !s.trusted && !e.nr())
    return (
      r$1.j.error(
        'HTML in-app messages are disabled. Use the "allowUserSuppliedJavascript" option for braze.initialize to enable these messages.',
      ),
      i.Ji(s.triggerId, InAppMessage.Ie.Ch),
      !1
    );
  if ((null == t && (t = document.body), s.xe())) {
    if (t.querySelectorAll(".ab-modal-interactions").length > 0)
      return (
        r$1.j.info(
          `Cannot show in-app message ${s.message} because another message is being shown.`,
        ),
        i.Ji(s.triggerId, InAppMessage.Ie.Le),
        !1
      );
  }
  if (WindowUtils.ao()) {
    const e = WindowUtils.mo();
    if (
      (e === ORIENTATION.PORTRAIT &&
        s.orientation === InAppMessage.Orientation.LANDSCAPE) ||
      (e === ORIENTATION.LANDSCAPE &&
        s.orientation === InAppMessage.Orientation.PORTRAIT)
    ) {
      const t = e === ORIENTATION.PORTRAIT ? "portrait" : "landscape",
        o =
          s.orientation === InAppMessage.Orientation.PORTRAIT
            ? "portrait"
            : "landscape";
      return (
        r$1.j.info(
          `Not showing ${o} in-app message ${s.message} because the screen is currently ${t}`,
        ),
        i.Ji(s.triggerId, InAppMessage.Ie.dh),
        !1
      );
    }
  }
  if (!e.nr()) {
    let e = !1;
    if (s.buttons && s.buttons.length > 0) {
      const t = s.buttons;
      for (let s = 0; s < t.length; s++)
        if (t[s].clickAction === InAppMessage.ClickAction.URI) {
          const o = t[s].uri;
          e = isURIJavascriptOrData(o);
        }
    } else s.clickAction === InAppMessage.ClickAction.URI && (e = isURIJavascriptOrData(s.uri));
    if (e)
      return (
        r$1.j.error(
          'Javascript click actions are disabled. Use the "allowUserSuppliedJavascript" option for braze.initialize to enable these actions.',
        ),
        i.Ji(s.triggerId, InAppMessage.Ie.Ch),
        !1
      );
  }
  const a = document.createElement("div");
  if (
    ((a.className = "ab-iam-root v3"),
    (a.className += me(s)),
    a.setAttribute("role", "complementary"),
    s.Ne() && (a.id = s.htmlId),
    e.nn(L.lo) && (a.style.zIndex = (e.nn(L.lo) + 1).toString()),
    t.appendChild(a),
    s.Ae())
  ) {
    const t = document.createElement("style");
    (t.innerHTML = s.css),
      (t.id = s.Ce()),
      null != e.nn(L.po) && t.setAttribute("nonce", e.nn(L.po)),
      document.getElementsByTagName("head")[0].appendChild(t);
  }
  const m = s instanceof SlideUpMessage,
    l = de(
      s,
      () => {
        Promise.resolve().then(function () { return showFeed$1; }).then((s) => {
          e.fe() ? s.showFeed() : r$1.j.error(BRAZE_MUST_BE_INITIALIZED_ERROR);
        });
      },
      (t) => {
        if (s.xe() && s.io()) {
          const o = document.createElement("div");
          if (
            ((o.className = "ab-page-blocker"),
            s.Ae() || (o.style.backgroundColor = toRgba(s.frameColor)),
            e.nn(L.lo) && (o.style.zIndex = e.nn(L.lo).toString()),
            a.appendChild(o),
            !e.nn(L.mh))
          ) {
            const e = new Date().valueOf();
            o.onclick = (o) => {
              new Date().valueOf() - e > InAppMessage.Ph &&
                (s.ye(t), o.stopPropagation());
            };
          }
          a.appendChild(t), t.focus(), s.Ah(a);
        } else if (m) {
          const e = document.querySelectorAll(".ab-slideup");
          let o = null;
          for (let s = e.length - 1; s >= 0; s--)
            if (e[s] !== t) {
              o = e[s];
              break;
            }
          if (s.slideFrom === InAppMessage.SlideFrom.TOP) {
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
        } else if (n && !e.nn(L.mh)) {
          const e = s;
          isIFrame(t) &&
            t.contentWindow &&
            t.contentWindow.addEventListener("keydown", function (s) {
              s.keyCode === KeyCodes._h && e.closeMessage();
            });
        }
        logInAppMessageImpression(s),
          s.dismissType === InAppMessage.DismissType.AUTO_DISMISS &&
            setTimeout(() => {
              a.contains(t) && s.ye(t);
            }, s.duration),
          "function" == typeof o && o();
      },
      (e, t) => {
        r$1.j.info(e), i.Ji(s.triggerId, t);
      },
      e.nn(L.fo),
      e.nn(L.lo),
      e.nn(L.po),
      t,
    );
  return (n || m) && (a.appendChild(l), s.Ah(a)), !0;
}

function subscribeToInAppMessage(n) {
  if (e.rr())
    return "function" != typeof n
      ? null
      : se$1.m()._i(function (r) {
          return n(r[0]), r.slice(1);
        });
}

function automaticallyShowInAppMessages() {
  if (!e.rr()) return;
  setupInAppMessageUI();
  const s = se$1.m();
  if (null == s.Pi()) {
    const r = subscribeToInAppMessage((s) => showInAppMessage(s));
    s.Oi(r);
  }
  return s.Pi();
}

function deferInAppMessage(s) {
  if (e.rr())
    return s instanceof ControlMessage
      ? (r$1.j.info("Not deferring since this is a ControlMessage."), !1)
      : s instanceof InAppMessage
      ? se$1.m().he(s)
      : (r$1.j.info("Not an instance of InAppMessage, ignoring."), !1);
}

function getDeferredInAppMessage() {
  if (e.rr()) return se$1.m().Re();
}

class aa {
  constructor(t, s, i, r) {
    (this.gt = t),
      (this._e = s),
      (this.u = i),
      (this.ft = r),
      (this.gt = t),
      (this._e = s),
      (this.u = i),
      (this.ft = r),
      (this.Ve = new E()),
      e.jt(this.Ve),
      (this.We = 1e3),
      (this.Xe = 6e4),
      (this.Ye = null);
  }
  Ze() {
    return this.Ve;
  }
  _i(t) {
    return this.Ve.lt(t);
  }
  Pi() {
    return this.Ye;
  }
  Oi(t) {
    this.Ye = t;
  }
  Ji(e, i) {
    if (!e) return new t();
    if (
      !validateValueIsFromEnum(
        InAppMessage.Ie,
        i,
        `${i} is not a valid in-app message display failure`,
        "InAppMessage.DisplayFailures",
      )
    )
      return new t();
    const n = { trigger_ids: [e], error_code: i };
    return s$1.N(r$1.q.Ki, n);
  }
  N(e, i, n, o) {
    const a = new t();
    let l;
    if (e instanceof ControlMessage) l = { trigger_ids: [e.triggerId] };
    else {
      if (i === r$1.q.Li || (e instanceof HtmlMessage && i === r$1.q.Qi)) {
        if (!e.p(o))
          return (
            r$1.j.info(
              "This in-app message has already received a click. Ignoring analytics event.",
            ),
            a
          );
      } else if (i === r$1.q.Vi) {
        if (!e.M())
          return (
            r$1.j.info(
              "This in-app message has already received an impression. Ignoring analytics event.",
            ),
            a
          );
      }
      l = this.Wi(e);
    }
    return null == l ? a : (null != n && (l.bid = n), s$1.N(i, l));
  }
  Xi(e, i) {
    const n = new t();
    if (!e.p())
      return (
        r$1.j.info(
          "This in-app message button has already received a click. Ignoring analytics event.",
        ),
        n
      );
    const o = this.Wi(i);
    return null == o
      ? n
      : e.id === InAppMessageButton.Yi
      ? (r$1.j.info(
          "This in-app message button does not have a tracking id. Not logging event to Braze servers.",
        ),
        n)
      : (null != e.id && (o.bid = e.id), s$1.N(r$1.q.Qi, o));
  }
  Zi(t) {
    const e = t.messageFields;
    return (null != e && e.is_push_primer) || !1;
  }
  Mr(t) {
    if (!(t instanceof InAppMessage)) return;
    const e = (t) => {
      if (!t) return;
      const e = getDecodedBrazeAction(t);
      return containsUnknownBrazeAction(e)
        ? ineligibleBrazeActionURLErrorMessage(INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES._r, "In-App Message")
        : containsPushPrimerBrazeAction(e) && !jt$1.Gr()
        ? ineligibleBrazeActionURLErrorMessage(INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES.Or, "In-App Message")
        : void 0;
    };
    if (this.Zi(t) && !jt$1.Gr())
      return "In-App Message contains a push prompt, but is not eligible for a push prompt. Ignoring.";
    const s = t.buttons || [];
    let i;
    for (const t of s)
      if (
        t.clickAction === InAppMessage.ClickAction.URI &&
        t.uri &&
        BRAZE_ACTION_URI_REGEX.test(t.uri) &&
        ((i = e(t.uri)), i)
      )
        return i;
    return t.clickAction === InAppMessage.ClickAction.URI &&
      t.uri &&
      BRAZE_ACTION_URI_REGEX.test(t.uri)
      ? e(t.uri)
      : void 0;
  }
  Hr(t, e, s, i) {
    if (!this.gt) return;
    const n = this.gt.Jr(!1, !1),
      o = this.gt.Bs(n);
    (o.template = { trigger_id: t.triggerId, trigger_event_type: e }),
      null != s && (o.template.data = s.Kr());
    const a = this.gt.Hs(o, T.Os.Lr);
    this.gt.Qs(o, () => {
      this.gt &&
        (T.Ws(this.u, T.Os.Lr, new Date().valueOf()),
        C.Xs({
          url: `${this.gt.Ys()}/template/`,
          data: o,
          headers: a,
          O: (e) => {
            if ((T.si(this.u, T.Os.Lr, 1), !this.gt.Zs(o, e, a)))
              return (
                this.Ji(t.triggerId, InAppMessage.Ie.Qr),
                void ("function" == typeof t.Ur && t.Ur())
              );
            if ((this.gt.ti(), null == e || null == e.templated_message))
              return void this.Ji(t.triggerId, InAppMessage.Ie.Qr);
            const s = e.templated_message;
            if (s.type !== mt.Wr.Vr)
              return void this.Ji(t.triggerId, InAppMessage.Ie.Xr);
            const i = newInAppMessageFromJson(s.data);
            if (null == i) return void this.Ji(t.triggerId, InAppMessage.Ie.Xr);
            const n = this.Mr(i);
            if (n)
              return r$1.j.error(n), void ("function" == typeof t.Ur && t.Ur());
            "function" == typeof t.Yr
              ? t.Yr(i)
              : this.Ji(t.triggerId, InAppMessage.Ie.Qr);
          },
          error: (r) => {
            let n = `getting user personalization for message ${t.triggerId}`;
            if (new Date().valueOf() - t.Zr > t.sn)
              this.Ji(t.triggerId, InAppMessage.Ie.Qr);
            else {
              T.hi(this.u, T.Os.Lr);
              const r = Math.min(t.sn, this.Xe),
                o = this.We;
              null == i && (i = o);
              const a = Math.min(r, randomInclusive(o, 3 * i));
              (n += `. Retrying in ${a} ms`),
                setTimeout(() => {
                  this.Hr(t, e, s, a);
                }, a);
            }
            this.gt.ii(r, n);
          },
        }));
    });
  }
  Wi(t) {
    if (null == t.triggerId)
      return (
        r$1.j.info(
          "The in-app message has no analytics id. Not logging event to Braze servers.",
        ),
        null
      );
    const e = {};
    return null != t.triggerId && (e.trigger_ids = [t.triggerId]), e;
  }
  he(t) {
    return (
      !!this.u &&
      !(
        !(t && t instanceof InAppMessage && t.constructor !== InAppMessage) ||
        t instanceof ControlMessage
      ) &&
      this.u.D(STORAGE_KEYS.k.rn, t.ss())
    );
  }
  Re() {
    if (!this.u) return null;
    const t = this.u.v(STORAGE_KEYS.k.rn);
    if (!t) return null;
    let e;
    switch (t.type) {
      case InAppMessage.qe.on:
        e = FullScreenMessage.an(t);
        break;
      case InAppMessage.qe.ln:
      case InAppMessage.qe.Ee:
      case InAppMessage.qe.Ue:
        e = HtmlMessage.an(t);
        break;
      case InAppMessage.qe.un:
      case InAppMessage.qe.Se:
        e = ModalMessage.an(t);
        break;
      case InAppMessage.qe.pn:
        e = SlideUpMessage.an(t);
    }
    return e && this.mn(), e;
  }
  mn() {
    this.u && this.u.ni(STORAGE_KEYS.k.rn);
  }
}

const se = {
  i: null,
  t: !1,
  m: () => (
    se.o(), se.i || (se.i = new aa(e.ar(), e.aa(), e.l(), e.ir())), se.i
  ),
  o: () => {
    se.t || (e.g(se), (se.t = !0));
  },
  destroy: () => {
    (se.i = null), (se.t = !1);
  },
};
var se$1 = se;

class wt {
  constructor(t, s, i, h, l) {
    (this.triggerId = t),
      (this.Yr = s),
      (this.Ur = i),
      (this.Zr = h),
      (this.sn = l),
      (this.triggerId = t),
      (this.Yr = s),
      (this.Ur = i),
      (this.Zr = h),
      (this.sn = l);
  }
  static fromJson(t, s, i, h, l) {
    return null == t || null == t.trigger_id
      ? null
      : new wt(t.trigger_id, s, i, h, l);
  }
}

class gr extends y {
  constructor(t, i, s, e, r) {
    super(),
      (this.tg = t),
      (this.yt = i),
      (this.u = s),
      (this.ki = e),
      (this.ig = r),
      (this.tg = t),
      (this.yt = i),
      (this.u = s),
      (this.ki = e),
      (this.ig = r),
      (this.sg = []),
      (this.eg = []),
      (this.hg = null),
      (this.ng = {}),
      (this.og = {}),
      (this.triggers = []),
      (this.ag = 0),
      this.lg(),
      this.gg();
  }
  fg() {
    if (this.u) {
      (this.hg = this.u.v(STORAGE_KEYS.k.iE) || this.hg),
        (this.ng = this.u.v(STORAGE_KEYS.k.aE) || this.ng),
        (this.og = this.u.v(STORAGE_KEYS.k.nE) || this.og);
      for (let t = 0; t < this.triggers.length; t++) {
        const i = this.triggers[t];
        i.id && null != this.og[i.id] && i.Lu(this.og[i.id]);
      }
    }
  }
  lg() {
    if (!this.u) return;
    this.ag = this.u.v(STORAGE_KEYS.k.oE) || 0;
    const t = this.u.v(STORAGE_KEYS.k.rE) || [],
      s = [];
    for (let i = 0; i < t.length; i++) s.push(mt.Yn(t[i]));
    (this.triggers = s), this.fg();
  }
  gg() {
    const t = this,
      s = function (i, s, e, r, h) {
        return function () {
          t.cg(i, s, e, r, h);
        };
      },
      e = {};
    for (const t of this.triggers) t.id && (e[t.id] = t);
    let r = !1;
    for (let t = 0; t < this.triggers.length; t++) {
      const i = this.triggers[t];
      if (i.id && null != this.ng[i.id]) {
        const t = this.ng[i.id],
          h = [];
        for (let r = 0; r < t.length; r++) {
          const n = t[r],
            o = i.Ru(n.Zr || 0);
          if (o > 0) {
            let t, r;
            h.push(n),
              null != n.ug && (t = n.ug),
              null != n.dg && be.TE(n.dg) && (r = be.Yn(n.dg));
            const a = [];
            if (n.pg && isArray(n.pg))
              for (let t = 0; t < n.pg.length; t++) {
                const i = e[n.pg[t]];
                null != i && a.push(i);
              }
            this.eg.push(window.setTimeout(s(i, n.Zr || 0, t, r, a), o));
          }
        }
        this.ng[i.id].length > h.length &&
          ((this.ng[i.id] = h),
          (r = !0),
          0 === this.ng[i.id].length && delete this.ng[i.id]);
      }
    }
    r && this.u && this.u.D(STORAGE_KEYS.k.aE, this.ng);
  }
  mg() {
    if (!this.u) return;
    const t = [];
    for (let i = 0; i < this.triggers.length; i++)
      t.push(this.triggers[i].ss());
    (this.ag = new Date().valueOf()),
      this.u.D(STORAGE_KEYS.k.rE, t),
      this.u.D(STORAGE_KEYS.k.oE, this.ag);
  }
  bg() {
    if (!this.u) return;
    (this.u.v(STORAGE_KEYS.k.oE) || 0) > this.ag ? this.lg() : this.fg();
  }
  Ts(t) {
    let s = !1;
    if (null != t && t.triggers) {
      this.ig.mn(), this.fg();
      const e = {},
        h = {};
      this.triggers = [];
      for (let i = 0; i < t.triggers.length; i++) {
        const r = mt.fromJson(t.triggers[i]);
        if (r) {
          r.id &&
            null != this.og[r.id] &&
            (r.Lu(this.og[r.id]), (e[r.id] = this.og[r.id])),
            r.id && null != this.ng[r.id] && (h[r.id] = this.ng[r.id]);
          for (let t = 0; t < r.Pu.length; t++)
            if (r.Pu[t].sc(tt.zs, null)) {
              s = !0;
              break;
            }
          this.triggers.push(r);
        }
      }
      isEqual(this.og, e) || ((this.og = e), this.u && this.u.D(STORAGE_KEYS.k.nE, this.og)),
        isEqual(this.ng, h) || ((this.ng = h), this.u && this.u.D(STORAGE_KEYS.k.aE, this.ng)),
        this.mg(),
        s &&
          (r$1.j.info("Trigger with test condition found, firing test."),
          this.be(tt.zs)),
        this.be(tt.OPEN);
      const n = this.sg;
      let o;
      this.sg = [];
      for (let t = 0; t < n.length; t++)
        (o = Array.prototype.slice.call(n[t])), this.be(...o);
    }
  }
  cg(t, i, s, e, h) {
    const n = (e) => {
        this.fg();
        const h = new Date().valueOf();
        if (!t.Vu(i))
          return !1 === navigator.onLine && t.type === mt.Wr.Vr && e.imageUrl
            ? (r$1.j.info(
                `Not showing ${t.type} trigger action ${t.id} due to offline state.`,
              ),
              void this.ig.Ji(t.id, InAppMessage.Ie.Uh))
            : void (t.Ju(h) && this.wg(t, h, s)
                ? 0 === this.yt.ic()
                  ? r$1.j.info(
                      `Not displaying trigger ${t.id} because neither automaticallyShowInAppMessages() nor subscribeToInAppMessage() were called.`,
                    )
                  : (this.yt.Et([e]), this.yg(t, h))
                : r$1.j.info(
                    `Not displaying trigger ${t.id} because display time fell outside of the acceptable time window.`,
                  ));
        t.type === mt.Wr.Gu
          ? this.ig.Ji(t.id, InAppMessage.Ie.Qr)
          : this.ig.Ji(t.id, InAppMessage.Ie.bh);
      },
      o = () => {
        this.fg();
        const n = h.pop();
        if (null != n)
          if ((this.Tg(n, i, s, e, h), n.Vu(i))) {
            let t = `Server aborted in-app message display, but the timeout on fallback trigger ${n.id} has already elapsed.`;
            h.length > 0 && (t += " Continuing to fall back."),
              r$1.j.info(t),
              this.ig.Ji(n.id, InAppMessage.Ie.bh),
              o();
          } else {
            r$1.j.info(
              `Server aborted in-app message display. Falling back to lower priority ${n.type} trigger action ${t.id}.`,
            );
            const o = 1e3 * n.Iu - (new Date().valueOf() - i);
            o > 0
              ? this.eg.push(
                  window.setTimeout(() => {
                    this.cg(n, i, s, e, h);
                  }, o),
                )
              : this.cg(n, i, s, e, h);
          }
      };
    let a, l, g;
    switch (t.type) {
      case mt.Wr.Vr:
        if (((a = newInAppMessageFromJson(t.data)), null == a)) {
          r$1.j.error(
            `Could not parse trigger data for trigger ${t.id}, ignoring.`,
          ),
            this.ig.Ji(t.id, InAppMessage.Ie.Xr);
          break;
        }
        if (((l = this.ig.Mr(a)), l)) {
          r$1.j.error(l), o();
          break;
        }
        n(a);
        break;
      case mt.Wr.Gu:
        if (((g = wt.fromJson(t.data, n, o, i, t.sn || 0)), null == g)) {
          r$1.j.error(
            `Could not parse trigger data for trigger ${t.id}, ignoring.`,
          ),
            this.ig.Ji(t.id, InAppMessage.Ie.Xr);
          break;
        }
        this.ig.Hr(g, s, e);
        break;
      default:
        r$1.j.error(
          `Trigger ${t.id} was of unexpected type ${t.type}, ignoring.`,
        ),
          this.ig.Ji(t.id, InAppMessage.Ie.Xr);
    }
  }
  be(t, i = null, s) {
    if (!validateValueIsFromEnum(tt, t, "Cannot fire trigger action.", "TriggerEvents")) return;
    if (this.ki && this.ki.yu())
      return (
        r$1.j.info(
          "Trigger sync is currently in progress, awaiting sync completion before firing trigger event.",
        ),
        void this.sg.push(arguments)
      );
    this.bg();
    const e = new Date().valueOf(),
      h = e - (this.hg || 0);
    let n = !0,
      o = !0;
    const a = [];
    for (let s = 0; s < this.triggers.length; s++) {
      const r = this.triggers[s],
        h = e + 1e3 * r.Iu;
      if (
        r.Ju(h) &&
        (null == r.startTime || r.startTime.valueOf() <= e) &&
        (null == r.endTime || r.endTime.valueOf() >= e)
      ) {
        let s = !1;
        for (let e = 0; e < r.Pu.length; e++)
          if (r.Pu[e].sc(t, i)) {
            s = !0;
            break;
          }
        s && ((n = !1), this.wg(r, h, t) && ((o = !1), a.push(r)));
      }
    }
    if (n)
      return void r$1.j.info(
        `Trigger event ${t} did not match any trigger conditions.`,
      );
    if (o)
      return void r$1.j.info(
        `Ignoring ${t} trigger event because a trigger was displayed ${
          h / 1e3
        }s ago.`,
      );
    a.sort((t, i) => t.priority - i.priority);
    const l = a.pop();
    null != l &&
      (r$1.j.info(
        `Firing ${l.type} trigger action ${l.id} from trigger event ${t}.`,
      ),
      this.Tg(l, e, t, s, a),
      0 === l.Iu
        ? this.cg(l, e, t, s, a)
        : this.eg.push(
            window.setTimeout(() => {
              this.cg(l, e, t, s, a);
            }, 1e3 * l.Iu),
          ));
  }
  changeUser(t = !1) {
    if (((this.triggers = []), this.u && this.u.ni(STORAGE_KEYS.k.rE), !t)) {
      (this.sg = []), (this.hg = null), (this.og = {}), (this.ng = {});
      for (let t = 0; t < this.eg.length; t++) clearTimeout(this.eg[t]);
      (this.eg = []),
        this.u && (this.u.ni(STORAGE_KEYS.k.iE), this.u.ni(STORAGE_KEYS.k.nE), this.u.ni(STORAGE_KEYS.k.aE));
    }
  }
  clearData() {
    (this.triggers = []), (this.hg = null), (this.og = {}), (this.ng = {});
    for (let t = 0; t < this.eg.length; t++) clearTimeout(this.eg[t]);
    this.eg = [];
  }
  wg(t, i, s) {
    if (null == this.hg) return !0;
    if (s === tt.zs)
      return (
        r$1.j.info(
          "Ignoring minimum interval between trigger because it is a test type.",
        ),
        !0
      );
    let e = t.Fu;
    return null == e && (e = this.tg), i - this.hg >= 1e3 * e;
  }
  Tg(t, s, e, r, h) {
    this.fg(), t.id && (this.ng[t.id] = this.ng[t.id] || []);
    const n = {};
    let o;
    (n.Zr = s), (n.ug = e), null != r && (o = r.ss()), (n.dg = o);
    const a = [];
    for (const t of h) t.id && a.push(t.id);
    (n.pg = a),
      t.id && this.ng[t.id].push(n),
      this.u && this.u.D(STORAGE_KEYS.k.aE, this.ng);
  }
  yg(t, s) {
    this.fg(),
      t.Lu(s),
      (this.hg = s),
      t.id && (this.og[t.id] = s),
      this.u && (this.u.D(STORAGE_KEYS.k.iE, s), this.u.D(STORAGE_KEYS.k.nE, this.og));
  }
}

const TriggersProviderFactory = {
  t: !1,
  provider: null,
  er: () => (
    TriggersProviderFactory.o(),
    TriggersProviderFactory.provider || TriggersProviderFactory.rg(),
    TriggersProviderFactory.provider
  ),
  rg: () => {
    if (!TriggersProviderFactory.provider) {
      const r = e.nn(L.No);
      (TriggersProviderFactory.provider = new gr(
        null != r ? r : 30,
        se$1.m().Ze(),
        e.l(),
        e.cr(),
        se$1.m(),
      )),
        e.dr(TriggersProviderFactory.provider);
    }
  },
  o: () => {
    TriggersProviderFactory.t ||
      (TriggersProviderFactory.rg(),
      e.g(TriggersProviderFactory),
      (TriggersProviderFactory.t = !0));
  },
  destroy: () => {
    (TriggersProviderFactory.provider = null), (TriggersProviderFactory.t = !1);
  },
};

class ti {
  constructor(t, i, s, l, h) {
    (this.endpoint = t),
      (this.Mn = i),
      (this.publicKey = s),
      (this.Vl = l),
      (this.al = h),
      (this.endpoint = t || null),
      (this.Mn = i || null),
      (this.publicKey = s || null),
      (this.Vl = l || null),
      (this.al = h || null);
  }
  ss() {
    return {
      e: this.endpoint,
      c: this.Mn,
      p: this.publicKey,
      u: this.Vl,
      v: this.al,
    };
  }
  static Yn(t) {
    return new ti(t.e, rehydrateDateAfterJsonization(t.c), t.p, t.u, t.v);
  }
}

class bt {
  constructor(t, s) {
    (this.wt = t), (this.u = s), (this.wt = t), (this.u = s);
  }
  getUserId() {
    const t = this.u.tu(STORAGE_KEYS.eu.su);
    if (null == t) return null;
    let s = t.iu,
      e = getByteLength(s);
    if (e > User.lr) {
      for (; e > User.lr; ) (s = s.slice(0, s.length - 1)), (e = getByteLength(s));
      (t.iu = s), this.u.uu(STORAGE_KEYS.eu.su, t);
    }
    return s;
  }
  ru(t) {
    const s = null == this.getUserId();
    this.u.uu(STORAGE_KEYS.eu.su, new _t(t)), s && this.u.ou(t);
  }
  setCustomUserAttribute(t, s) {
    if (this.wt.hu(t))
      return (
        r$1.j.info('Custom Attribute "' + t + '" is blocklisted, ignoring.'), !1
      );
    const e = {};
    return (e[t] = s), this.nu(User.lu, e, !0);
  }
  nu(t, s, e = !1, i = !1) {
    const u = this.u.mu(this.getUserId(), t, s);
    let o = "",
      h = t,
      n = s;
    return (
      e &&
        ((o = " custom"),
        "object" == typeof s &&
          ((h = Object.keys(s)[0]),
          (n = s[h]),
          "object" == typeof n && (n = JSON.stringify(n, null, 2)))),
      !i && u && r$1.j.info(`Logged${o} attribute ${h} with value ${n}`),
      u
    );
  }
  _n(t, s, e, u, o) {
    this.nu("push_token", t, !1, !0),
      this.nu("custom_push_public_key", e, !1, !0),
      this.nu("custom_push_user_auth", u, !1, !0),
      this.nu("custom_push_vapid_public_key", o, !1, !0);
    const h = r$1.zt.Ft,
      n = new r$1.xt(h, r$1.j),
      l = new ti(t, s, e, u, o);
    this.u.D(STORAGE_KEYS.k.Bn, l.ss()), n.setItem(h.Jt.cu, h.ie, !0);
  }
  Nn(t) {
    if (
      (this.nu("push_token", null, !1, !0),
      this.nu("custom_push_public_key", null, !1, !0),
      this.nu("custom_push_user_auth", null, !1, !0),
      this.nu("custom_push_vapid_public_key", null, !1, !0),
      t)
    ) {
      const t = r$1.zt.Ft,
        s = new r$1.xt(t, r$1.j);
      this.u.D(STORAGE_KEYS.k.Bn, !1), s.setItem(t.Jt.cu, t.ie, !1);
    }
  }
}

const L = {
  ho: "allowCrawlerActivity",
  Eo: "baseUrl",
  _o: "noCookies",
  Io: "devicePropertyAllowlist",
  Aa: "disablePushTokenMaintenance",
  Ao: "enableLogging",
  So: "enableSdkAuthentication",
  qa: "manageServiceWorkerExternally",
  No: "minimumIntervalBetweenTriggerActionsInSeconds",
  wo: "sessionTimeoutInSeconds",
  Oo: "appVersion",
  _a: "serviceWorkerLocation",
  ka: "safariWebsitePushId",
  Ba: "localization",
  po: "contentSecurityNonce",
  Co: "enableHtmlInAppMessages",
  Lo: "allowUserSuppliedJavascript",
  lo: "inAppMessageZIndex",
  fo: "openInAppMessagesInNewTab",
  tn: "openCardsInNewTab",
  en: "openNewsFeedCardsInNewTab",
  mh: "requireExplicitInAppMessageDismissal",
  Po: "doNotLoadFontAwesome",
  Ro: "sdkFlavor",
};
class Wt {
  constructor() {
    (this.cn = ""),
      (this.Mo = ""),
      (this.jo = void 0),
      (this.Do = null),
      (this.fn = null),
      (this.gt = null),
      (this.ki = null),
      (this.wt = null),
      (this._e = null),
      (this.u = null),
      (this.ft = null),
      (this.Uo = ""),
      (this.Bo = !1),
      (this.Wo = !1),
      (this.zo = new E()),
      (this.Vo = new E()),
      (this.options = {}),
      (this.Go = []),
      (this.Ko = []),
      (this.Ve = []),
      (this.Mo = "4.9.0");
  }
  Ho(t) {
    this.zo.lt(t);
  }
  Rh(t) {
    this.Vo.lt(t);
  }
  initialize(t, s) {
    if (this.fe())
      return (
        r$1.j.info("Braze has already been initialized with an API key."), !0
      );
    this.options = s || {};
    let e = this.nn(L.Ao);
    const n = parseQueryStringKeyValues(WindowUtils.Cn());
    if (
      (n && "true" === n.brazeLogging && (e = !0),
      r$1.j.init(e),
      r$1.j.info(
        `Initialization Options: ${JSON.stringify(this.options, null, 2)}`,
      ),
      null == t || "" === t || "string" != typeof t)
    )
      return r$1.j.error("Braze requires a valid API key to be initialized."), !1;
    this.cn = t;
    let o = this.nn(L.Eo);
    if (null == o || "" === o || "string" != typeof o)
      return r$1.j.error("Braze requires a valid baseUrl to be initialized."), !1;
    !1 === /^https?:/.test(o) && (o = `https://${o}`);
    const h = o;
    if (
      ((o = document.createElement("a")),
      (o.href = h),
      "/" === o.pathname && (o = `${o}api/v3`),
      (this.Uo = o.toString()),
      V.$o && !this.nn(L.ho))
    )
      return (
        r$1.j.info("Ignoring activity from crawler bot " + navigator.userAgent),
        (this.Wo = !0),
        !1
      );
    const a = this.nn(L._o) || !1;
    if (
      ((this.u = Bt.qo(t, a)), a && this.u.xo(t), new O.ee(null, !0).jr(STORAGE_KEYS.re))
    )
      return (
        r$1.j.info("Ignoring all activity due to previous opt out"),
        (this.Wo = !0),
        !1
      );
    for (const t of keys(this.options))
      -1 === values(r$1.Jo).indexOf(t) &&
        r$1.j.warn(`Ignoring unknown initialization option '${t}'.`);
    const l = ["mparticle", "wordpress", "tealium"];
    if (null != this.nn(L.Ro)) {
      const t = this.nn(L.Ro);
      -1 !== l.indexOf(t)
        ? (this.jo = t)
        : r$1.j.error("Invalid sdk flavor passed: " + t);
    }
    let u = this.nn(r$1.Jo.Io);
    if (null != u)
      if (isArray(u)) {
        const t = [];
        for (let i = 0; i < u.length; i++)
          validateValueIsFromEnum(
            DeviceProperties,
            u[i],
            "devicePropertyAllowlist contained an invalid value.",
            "DeviceProperties",
          ) && t.push(u[i]);
        u = t;
      } else
        r$1.j.error(
          "devicePropertyAllowlist must be an array. Defaulting to all properties.",
        ),
          (u = null);
    (this.fn = new Ot(this.u, u)),
      (this.wt = new Mt(this.u)),
      (this.ft = new bt(this.wt, this.u)),
      (this._e = new Dt(this.u, this.ft, this.wt, this.nn(L.wo)));
    const f = new E();
    return (
      (this.Do = new kt(this.u, this.nn(L.So), f)),
      this.jt(f),
      (this.gt = new Pt(
        this.fn,
        this.u,
        this.Do,
        this.ft,
        this._e,
        this.wt,
        this.cn,
        this.Uo,
        this.Mo,
        this.jo || "",
        this.nn(L.Oo),
      )),
      (this.ki = new Rt(
        this.cn,
        this.Uo,
        this._e,
        this.fn,
        this.ft,
        this.wt,
        this.u,
        (t) => {
          if (this.fe()) for (const i of this.gr()) i.Ts(t);
        },
        this.Do,
        this.gt,
      )),
      this.ki.initialize(),
      r$1.j.info(
        `Initialized for the Braze backend at "${this.nn(
          L.Eo,
        )}" with API key "${this.cn}".`,
      ),
      null != this.nn(L.Co) &&
        logDeprecationWarning(
          "enableHtmlInAppMessages",
          "initialization option",
          "allowUserSuppliedJavascript",
        ),
      TriggersProviderFactory.o(),
      this.wt.Ci(() => {
        this.Bo &&
          this.wt &&
          this.wt.vi() &&
          Promise.resolve().then(function () { return refreshFeatureFlags$1; }).then((t) => {
            if (!this.Bo) return;
            (0, t.default)();
          });
      }),
      this.ki.pr(() => {
        this.Bo &&
          this.wt &&
          this.wt.vi() &&
          Promise.resolve().then(function () { return refreshFeatureFlags$1; }).then((t) => {
            if (!this.Bo) return;
            (0, t.default)(void 0, void 0, !0);
          });
      }),
      this.zo.Et(this.options),
      (this.Bo = !0),
      !0
    );
  }
  destroy(t) {
    if ((r$1.j.destroy(), this.fe())) {
      this.Vo.Et(), this.Vo.removeAllSubscriptions();
      for (const t of this.Go) t.destroy();
      this.Go = [];
      for (const t of this.Ko) t.clearData(!1);
      (this.Ko = []),
        this.removeAllSubscriptions(),
        (this.Ve = []),
        null != this.ki && this.ki.destroy(),
        (this.ki = null),
        (this.Do = null),
        (this.fn = null),
        (this.gt = null),
        (this.wt = null),
        (this._e = null),
        (this.ft = null),
        (this.options = {}),
        (this.jo = void 0),
        (this.Bo = !1),
        (this.Wo = !1),
        t && (this.u = null);
    }
  }
  rr() {
    if (this.Yo()) return !1;
    if (!this.fe()) throw new Error(BRAZE_MUST_BE_INITIALIZED_ERROR);
    return !0;
  }
  Ma() {
    return this.cn;
  }
  Sr() {
    return this.Do;
  }
  Ys() {
    return this.Uo;
  }
  te() {
    return this.fn;
  }
  ar() {
    return this.gt;
  }
  nn(t) {
    return this.options[t];
  }
  gr() {
    return this.Ko;
  }
  cr() {
    return this.ki;
  }
  tr() {
    return this.wt;
  }
  aa() {
    return this._e;
  }
  l() {
    return this.u;
  }
  br() {
    if (this.ft && this.ki) return new User(this.ft, this.ki);
  }
  ir() {
    return this.ft;
  }
  nr() {
    return !0 === this.nn(L.Lo) || !0 === this.nn(L.Co);
  }
  g(t) {
    let i = !1;
    for (const s of this.Go) s === t && (i = !0);
    i || this.Go.push(t);
  }
  dr(t) {
    let i = !1;
    for (const s of this.Ko) s.constructor === t.constructor && (i = !0);
    t instanceof y && !i && this.Ko.push(t);
  }
  jt(t) {
    t instanceof E && this.Ve.push(t);
  }
  removeAllSubscriptions() {
    if (this.rr()) for (const t of this.Ve) t.removeAllSubscriptions();
  }
  removeSubscription(t) {
    if (this.rr()) for (const i of this.Ve) i.removeSubscription(t);
  }
  ne(t) {
    this.Wo = t;
  }
  fe() {
    return this.Bo;
  }
  Yo() {
    return this.Wo;
  }
  ks() {
    return this.Mo;
  }
}
const e = new Wt();

const s = {
  N: (o, n, s) => {
    var i;
    const a = new t(),
      l = e.aa();
    if (!l)
      return (
        r$1.j.info(
          `Not logging event with type "${o}" because the current session ID could not be found.`,
        ),
        a
      );
    const m = l.co();
    a.ve.push(
      new be(
        s || (null === (i = e.ir()) || void 0 === i ? void 0 : i.getUserId()),
        o,
        new Date().valueOf(),
        m,
        n,
      ),
    );
    const u = e.l();
    return u && (a.O = u.bo(a.ve)), a;
  },
};
var s$1 = s;

class a {
  constructor(s) {
    (this.u = s), (this.u = s);
  }
  h(n, o) {
    const e = new t();
    if ((n.p(), null == n.url || "" === n.url))
      return (
        r$1.j.info(
          `Card ${n.id} has no url. Not logging click to Braze servers.`,
        ),
        e
      );
    if (o && n.id && this.u) {
      const s = this.u.v(STORAGE_KEYS.k.C) || {};
      (s[n.id] = !0), this.u.D(STORAGE_KEYS.k.C, s);
    }
    const l = this.I([n]);
    if (null == l) return e;
    const u = o ? r$1.q.$ : r$1.q.B;
    return s$1.N(u, l);
  }
  A(n) {
    const o = new t();
    if (!n.F())
      return (
        r$1.j.info(
          `Card ${n.id} refused this dismissal. Ignoring analytics event.`,
        ),
        o
      );
    if (n.id && this.u) {
      const s = this.u.v(STORAGE_KEYS.k.G) || {};
      (s[n.id] = !0), this.u.D(STORAGE_KEYS.k.G, s);
    }
    const e = this.I([n]);
    return null == e ? o : s$1.N(r$1.q.H, e);
  }
  J(n, o) {
    const e = new t(!0),
      l = [],
      u = [];
    let a = {};
    this.u && (a = o ? this.u.v(STORAGE_KEYS.k.K) || {} : this.u.v(STORAGE_KEYS.k.L) || {});
    for (const s of n)
      s.M(),
        s instanceof ControlCard ? u.push(s) : l.push(s),
        s.id && (a[s.id] = !0);
    const h = this.I(l),
      c = this.I(u);
    if (null == h && null == c) return (e.O = !1), e;
    if ((this.u && (o ? this.u.D(STORAGE_KEYS.k.K, a) : this.u.D(STORAGE_KEYS.k.L, a)), null != h)) {
      const t = o ? r$1.q.P : r$1.q.R,
        n = s$1.N(t, h);
      e.S(n);
    }
    if (null != c && o) {
      const t = s$1.N(r$1.q.T, c);
      e.S(t);
    }
    return e;
  }
  I(s) {
    let t,
      r = null;
    for (let n = 0; n < s.length; n++)
      (t = s[n].id),
        null != t &&
          "" !== t &&
          ((r = r || {}), (r.ids = r.ids || []), r.ids.push(t));
    return r;
  }
}

const n = {
  t: !1,
  i: null,
  m: () => (n.o(), n.i || (n.i = new a(e.l())), n.i),
  o: () => {
    n.t || (e.g(n), (n.t = !0));
  },
  destroy: () => {
    (n.i = null), (n.t = !1);
  },
};
var n$1 = n;

function logCardClick(o, a) {
  return (
    !!e.rr() &&
    (o instanceof Card ? n$1.m().h(o, a).O : (r$1.j.error("card " + MUST_BE_CARD_WARNING_SUFFIX), !1))
  );
}

function logCardDismissal(o) {
  return (
    !!e.rr() &&
    (o instanceof Card ? n$1.m().A(o).O : (r$1.j.error("card " + MUST_BE_CARD_WARNING_SUFFIX), !1))
  );
}

function logCardImpressions(o, s) {
  if (!e.rr()) return !1;
  if (!isArray(o)) return r$1.j.error("cards must be an array"), !1;
  for (const s of o)
    if (!(s instanceof Card)) return r$1.j.error(`Each card in cards ${MUST_BE_CARD_WARNING_SUFFIX}`), !1;
  return n$1.m().J(o, s).O;
}

function logContentCardImpressions(o) {
  return logCardImpressions(o, !0);
}

function logContentCardClick(o) {
  return logCardClick(o, !0);
}

class x {
  constructor(e, s) {
    (this.cards = e),
      (this.lastUpdated = s),
      (this.cards = e),
      (this.lastUpdated = s);
  }
  getUnreadCardCount() {
    let e = 0;
    for (const s of this.cards) s.viewed || s instanceof ControlCard || e++;
    return e;
  }
  ur() {
    throw new Error("Must be implemented in a subclass");
  }
  logCardImpressions(e) {
    throw new Error("Must be implemented in a subclass");
  }
  logCardClick(e) {
    throw new Error("Must be implemented in a subclass");
  }
  sr() {
    throw new Error("Must be implemented in a subclass");
  }
}
(x.mr = 6e4), (x.Oh = 500), (x.uo = 1e4);

function newCard(e, n, t, o, i, l, u, d, a, s, w, f, m, C, p, c, x, F) {
  let b;
  if (n === Card.es.ct || n === Card.es.St)
    b = new ClassicCard(e, t, o, i, l, u, d, a, s, w, f, m, C, p, c, x);
  else if (n === Card.es.tt)
    b = new CaptionedImage(e, t, o, i, l, u, d, a, s, w, f, m, C, p, c, x);
  else if (n === Card.es.rs)
    b = new ImageOnly(e, t, i, u, d, a, s, w, f, m, C, p, c, x);
  else {
    if (n !== Card.es.At)
      return r$1.j.error("Ignoring card with unknown type " + n), null;
    b = new ControlCard(e, t, d, s, C, p);
  }
  return F && (b.test = F), b;
}
function newCardFromContentCardsJson(e) {
  if (e[Card.Tt.It]) return null;
  const n = e[Card.Tt.ns],
    r = e[Card.Tt.ts],
    t = e[Card.Tt.ls],
    o = e[Card.Tt.st],
    i = e[Card.Tt.os],
    u = e[Card.Tt.it],
    d = dateFromUnixTimestamp(e[Card.Tt.us]),
    a = d;
  let s;
  s = e[Card.Tt.ds] === Card.Nt ? null : dateFromUnixTimestamp(e[Card.Tt.ds]);
  return newCard(
    n,
    r,
    t,
    o,
    i,
    u,
    a,
    d,
    null,
    s,
    e[Card.Tt.URL],
    e[Card.Tt.ps],
    e[Card.Tt.fs],
    e[Card.Tt.xs],
    e[Card.Tt.gs],
    e[Card.Tt.js],
    e[Card.Tt.ys],
    e[Card.Tt.zs] || !1,
  );
}
function newCardFromFeedJson(e) {
  return newCard(
    e.id,
    e.type,
    e.viewed,
    e.title,
    e.image,
    e.description,
    dateFromUnixTimestamp(e.created),
    dateFromUnixTimestamp(e.updated),
    e.categories,
    dateFromUnixTimestamp(e.expires_at),
    e.url,
    e.domain,
    e.aspect_ratio,
    e.extras,
    !1,
    !1,
  );
}
function newCardFromSerializedValue(e) {
  return (
    newCard(
      e[Card.hs.ns],
      e[Card.hs.ts],
      e[Card.hs.ls],
      e[Card.hs.st],
      e[Card.hs.os],
      e[Card.hs.it],
      rehydrateDateAfterJsonization(e[Card.hs.cs]),
      rehydrateDateAfterJsonization(e[Card.hs.us]),
      e[Card.hs.bs],
      rehydrateDateAfterJsonization(e[Card.hs.ds]),
      e[Card.hs.URL],
      e[Card.hs.ps],
      e[Card.hs.fs],
      e[Card.hs.xs],
      e[Card.hs.gs],
      e[Card.hs.js],
      e[Card.hs.ys],
      e[Card.hs.zs] || !1,
    ) || void 0
  );
}

class v extends y {
  constructor(t, s, i, h, n) {
    super(),
      (this.ft = t),
      (this.u = s),
      (this.wt = i),
      (this.vt = h),
      (this.gt = n),
      (this.ft = t),
      (this.u = s),
      (this.wt = i),
      (this.vt = h),
      (this.gt = n),
      (this.yt = new E()),
      e.jt(this.yt),
      (this.kt = 0),
      (this.Ut = 0),
      (this.cards = []),
      this.Lt();
    const o = r$1.zt.Ft;
    new r$1.xt(o, r$1.j).Mt(o.Jt.qt, (t) => {
      this.Pt(t);
    }),
      (this.$t = null),
      (this._t = null),
      (this.Bt = null),
      (this.Gt = null),
      (this.Ht = null),
      (this.Kt = 10),
      (this.Ot = 0);
  }
  Qt() {
    return this.$t;
  }
  Vt(t) {
    this.$t = t;
  }
  Wt() {
    return this._t;
  }
  Xt(t) {
    this._t = t;
  }
  Lt() {
    if (!this.u) return;
    const t = this.u.v(STORAGE_KEYS.k.Yt) || [],
      s = [];
    for (let i = 0; i < t.length; i++) {
      const e = newCardFromSerializedValue(t[i]);
      null != e && s.push(e);
    }
    (this.cards = this.Zt(this.Cs(s, !1))),
      (this.kt = this.u.v(STORAGE_KEYS.k.ws) || this.kt),
      (this.Ut = this.u.v(STORAGE_KEYS.k.vs) || this.Ut);
  }
  Ns(t, s = !1, e = 0, h = 0) {
    let r;
    if (s) {
      r = [];
      for (const t of this.cards) t.test && r.push(t);
    } else r = this.cards.slice();
    for (let i = 0; i < t.length; i++) {
      const e = t[i];
      let h = null;
      for (let t = 0; t < this.cards.length; t++)
        if (e.id === this.cards[t].id) {
          h = this.cards[t];
          break;
        }
      if (s) {
        const t = newCardFromContentCardsJson(e);
        null != h && h.viewed && t && (t.viewed = !0), null != t && r.push(t);
      } else if (null == h) {
        const t = newCardFromContentCardsJson(e);
        null != t && r.push(t);
      } else {
        if (!h.ot(e))
          for (let t = 0; t < r.length; t++)
            if (e.id === r[t].id) {
              r.splice(t, 1);
              break;
            }
      }
    }
    (this.cards = this.Zt(this.Cs(r, s))),
      this.Rs(),
      (this.kt = e),
      (this.Ut = h),
      this.u && (this.u.D(STORAGE_KEYS.k.ws, this.kt), this.u.D(STORAGE_KEYS.k.vs, this.Ut));
  }
  Ts(t) {
    if (this.Ds() && null != t && t.cards) {
      this.u && this.u.D(STORAGE_KEYS.k.Ss, e.ks());
      const s = t.full_sync;
      s || this.Lt(),
        this.Ns(t.cards, s, t.last_full_sync_at, t.last_card_updated_at),
        this.yt.Et(this.Us(!0));
    }
  }
  As(t) {
    this.u && this.u.D(STORAGE_KEYS.k.Ls, t);
  }
  Fs(t, e, h) {
    const n = () => {
        this.Ms(e, h, !0);
      },
      o = t ? readResponseHeaders(t) : null;
    let l;
    if ((this.Es(), !o || !o["retry-after"])) return void this.As(0);
    const a = o["retry-after"];
    if (isNaN(a) && !isNaN(Date.parse(a)))
      (l = Date.parse(a) - new Date().getTime()), l < 0 && n();
    else {
      if (isNaN(parseFloat(a.toString()))) {
        const t =
          "Received unexpected value for retry-after header in /sync response";
        return s$1.N(r$1.q.qs, { e: t + ": " + a }), void this.As(0);
      }
      l = 1e3 * parseFloat(a.toString());
    }
    this.Bt = window.setTimeout(() => {
      n();
    }, l);
    let u = 0;
    this.u && (u = this.u.v(STORAGE_KEYS.k.Ls)),
      (null == u || isNaN(parseInt(u.toString()))) && (u = 0),
      this.As(parseInt(u.toString()) + 1);
  }
  Pt(t) {
    if (!this.Ds()) return;
    this.Lt();
    const s = this.cards.slice();
    let i = null;
    this.ft && (i = this.ft.getUserId());
    for (let e = 0; e < t.length; e++)
      if (i === t[e].userId || (null == i && null == t[e].userId)) {
        const i = t[e].card;
        let h = null;
        for (let t = 0; t < this.cards.length; t++)
          if (i.id === this.cards[t].id) {
            h = this.cards[t];
            break;
          }
        if (null == h) {
          const t = newCardFromContentCardsJson(i);
          null != t && s.push(t);
        } else {
          if (!h.ot(i))
            for (let t = 0; t < s.length; t++)
              if (i.id === s[t].id) {
                s.splice(t, 1);
                break;
              }
        }
      }
    (this.cards = this.Zt(this.Cs(s, !1))), this.Rs(), this.yt.Et(this.Us(!0));
  }
  Cs(t, s) {
    let e = {},
      h = {},
      r = {};
    this.u &&
      ((e = this.u.v(STORAGE_KEYS.k.C) || {}),
      (h = this.u.v(STORAGE_KEYS.k.K) || {}),
      (r = this.u.v(STORAGE_KEYS.k.G) || {}));
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
      s &&
        this.u &&
        (this.u.D(STORAGE_KEYS.k.C, n), this.u.D(STORAGE_KEYS.k.K, o), this.u.D(STORAGE_KEYS.k.G, l)),
      t
    );
  }
  Zt(t) {
    const s = [],
      e = new Date();
    let h = {};
    this.u && (h = this.u.v(STORAGE_KEYS.k.G) || {});
    let n = !1;
    for (let i = 0; i < t.length; i++) {
      const o = t[i].url;
      if (!this.vt && o && isURIJavascriptOrData(o)) {
        r$1.j.error(
          `Card with url ${o} will not be displayed because Javascript URLs are disabled. Use the "allowUserSuppliedJavascript" option for braze.initialize to enable this card.`,
        );
        continue;
      }
      const l = t[i].expiresAt;
      let a = !0;
      if ((null != l && (a = l >= e), (a = a && !t[i].dismissed), a))
        s.push(t[i]);
      else {
        const s = t[i].id;
        s && (h[s] = !0), (n = !0);
      }
    }
    return n && this.u && this.u.D(STORAGE_KEYS.k.G, h), s;
  }
  Rs() {
    if (!this.u) return;
    const t = [];
    for (let s = 0; s < this.cards.length; s++) t.push(this.cards[s].ss());
    this.u.D(STORAGE_KEYS.k.Yt, t);
  }
  Es() {
    this.Bt && (clearTimeout(this.Bt), (this.Bt = null));
  }
  Is() {
    null != this.Gt && (clearTimeout(this.Gt), (this.Gt = null));
  }
  Js(t = 1e3 * this.Kt, s, i) {
    this.Is(),
      (this.Gt = window.setTimeout(() => {
        this.Ms(s, i, !0);
      }, t)),
      (this.Ht = t);
  }
  Ms(t, s, h = !1, n = !0) {
    var o;
    const l = this.gt,
      a = this.u;
    if (!l || !a) return void ("function" == typeof s && s());
    const u = !h;
    if ((u && (this.Es(), this.As(0)), !this.Ds()))
      return void (
        this.wt &&
        this.wt.Ps(() => {
          this.Ms(t, s);
        })
      );
    let c = !0;
    if (
      (u &&
        (null === (o = this.wt) || void 0 === o ? void 0 : o.$s()) &&
        (c = this._s()),
      !c)
    )
      return void r$1.j.info("Content card sync being throttled.");
    n && this.Is();
    const f = l.Bs({}, !0);
    a.v(STORAGE_KEYS.k.Ss) !== e.ks() && this.Gs(),
      (f.last_full_sync_at = this.kt),
      (f.last_card_updated_at = this.Ut);
    const d = l.Hs(f, T.Os.Ks, h);
    let m = !1;
    l.Qs(f, () => {
      if (this.u) {
        const t = new Date().valueOf();
        u && this.u.D(STORAGE_KEYS.k.Vs, t), T.Ws(this.u, T.Os.Ks, t);
      }
      C.Xs({
        url: l.Ys() + "/content_cards/sync",
        data: f,
        headers: d,
        O: (i, e) => {
          if (!l.Zs(f, i, d))
            return (m = !0), void ("function" == typeof s && s());
          l.ti(),
            this.Fs(e, t, s),
            this.Ts(i),
            (m = !1),
            T.si(this.u, T.Os.Ks, 1),
            "function" == typeof t && t();
        },
        error: (t) => {
          l.ii(t, "retrieving content cards"),
            (m = !0),
            "function" == typeof s && s();
        },
        ei: () => {
          if (m && n && !this.Gt && this.Ot + 1 < MAX_ERROR_RETRIES_CONTENT_CARDS) {
            T.hi(this.u, T.Os.Ks);
            let i = this.Ht;
            (null == i || i < 1e3 * this.Kt) && (i = 1e3 * this.Kt),
              this.Js(Math.min(3e5, randomInclusive(1e3 * this.Kt, 3 * i)), t, s),
              (this.Ot = this.Ot + 1);
          }
        },
      });
    });
  }
  Us(t) {
    t || this.Lt();
    const s = this.Zt(this.cards);
    s.sort((t, s) =>
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
    let e = Math.max(this.Ut || 0, this.kt || 0);
    return (
      0 === e && (e = void 0),
      this.u && this.u.v(STORAGE_KEYS.k.vs) === this.Ut && void 0 === e && (e = this.Ut),
      new ContentCards(s, dateFromUnixTimestamp(e))
    );
  }
  ri(t) {
    return this.yt.lt(t);
  }
  Gs() {
    (this.kt = 0),
      (this.Ut = 0),
      this.u && (this.u.ni(STORAGE_KEYS.k.ws), this.u.ni(STORAGE_KEYS.k.vs));
  }
  changeUser(t) {
    t ||
      ((this.cards = []),
      this.yt.Et(new ContentCards(this.cards.slice(), null)),
      this.u &&
        (this.u.ni(STORAGE_KEYS.k.Yt),
        this.u.ni(STORAGE_KEYS.k.C),
        this.u.ni(STORAGE_KEYS.k.K),
        this.u.ni(STORAGE_KEYS.k.G))),
      this.Gs();
  }
  clearData(t) {
    (this.kt = 0),
      (this.Ut = 0),
      (this.cards = []),
      this.yt.Et(new ContentCards(this.cards.slice(), null)),
      t &&
        this.u &&
        (this.u.ni(STORAGE_KEYS.k.Yt),
        this.u.ni(STORAGE_KEYS.k.C),
        this.u.ni(STORAGE_KEYS.k.K),
        this.u.ni(STORAGE_KEYS.k.G),
        this.u.ni(STORAGE_KEYS.k.ws),
        this.u.ni(STORAGE_KEYS.k.vs));
  }
  Ds() {
    return !(this.wt && !this.wt.oi()) || (0 !== this.wt.li() && this.ai(), !1);
  }
  ui(t) {
    this.u && this.u.D(STORAGE_KEYS.k.ci, t);
  }
  fi() {
    return this.u ? this.u.v(STORAGE_KEYS.k.ci) : null;
  }
  _s() {
    const t = this.u,
      s = this.wt;
    if (!t || !s) return !0;
    const e = t.v(STORAGE_KEYS.k.Vs);
    if (null == e || isNaN(e)) return !0;
    const h = s.di(),
      r = s.mi();
    if (-1 === h || -1 === r) return !0;
    let n = this.fi();
    (null == n || isNaN(n)) && (n = h);
    const o = (new Date().valueOf() - e) / 1e3;
    return (
      (n = Math.min(n + o / r, h)),
      !(n < 1) && ((n = Math.trunc(n) - 1), this.ui(n), !0)
    );
  }
  ai() {
    this.yt.Et(new ContentCards([], new Date())), this.u && this.u.ni(STORAGE_KEYS.k.Yt);
  }
}

const g = {
  t: !1,
  provider: null,
  er: () => (
    g.o(),
    g.provider ||
      ((g.provider = new v(e.ir(), e.l(), e.tr(), e.nr(), e.ar())),
      e.dr(g.provider)),
    g.provider
  ),
  o: () => {
    g.t || (e.g(g), (g.t = !0));
  },
  destroy: () => {
    (g.provider = null), (g.t = !1);
  },
};
var g$1 = g;

function requestContentCardsRefresh(r, t) {
  if (e.rr()) return g$1.er().Ms(r, t);
}

class ContentCards extends x {
  constructor(r, e) {
    super(r, e);
  }
  getUnviewedCardCount() {
    return super.getUnreadCardCount();
  }
  logCardImpressions(r) {
    logCardImpressions(r, !0);
  }
  logCardClick(r) {
    return logCardClick(r, !0);
  }
  sr() {
    requestContentCardsRefresh();
  }
  ur() {
    return !0;
  }
}
ContentCards.mr = 6e4;

function getCachedContentCards() {
  if (e.rr()) return g$1.er().Us(!1);
}

function topHadImpression(t) {
  return null != t && !!t.getAttribute("data-ab-had-top-impression");
}
function impressOnTop(t) {
  null != t && t.setAttribute("data-ab-had-top-impression", "true");
}
function bottomHadImpression(t) {
  return null != t && !!t.getAttribute("data-ab-had-bottom-impression");
}
function impressOnBottom(t) {
  null != t && t.setAttribute("data-ab-had-bottom-impression", "true");
}
function markCardAsRead(t) {
  if (null != t) {
    const o = t.querySelectorAll(".ab-unread-indicator")[0];
    null != o && (o.className += " read");
  }
}
function getCardId(t) {
  return t.getAttribute("data-ab-card-id");
}
function _setImageAltText(t, o) {
  let e = "";
  t.title || t.description || (e = "Feed Image"), o.setAttribute("alt", e);
}
function setCardHeight(t, o) {
  const e = o.querySelectorAll(".ab-image-area");
  let a,
    n = 0;
  e.length > 0 && (n = e[0].offsetWidth);
  for (const o of t)
    if (((a = o._), a && o.imageUrl && "number" == typeof o.aspectRatio)) {
      const t = n / o.aspectRatio;
      t && (a.style.height = `${t}px`);
    }
}
function cardToHtml(t, logCardClick, e) {
  const a = document.createElement("div");
  (a.className = "ab-card ab-effect-card " + t.U),
    t.id &&
      (a.setAttribute("data-ab-card-id", t.id), a.setAttribute("id", t.id)),
    a.setAttribute("role", "article"),
    a.setAttribute("tabindex", "0");
  let n = "",
    i = !1;
  t.url && "" !== t.url && ((n = t.url), (i = !0));
  const s = (o) => (markCardAsRead(a), i && (logCardClick(t), _handleBrazeAction(n, e, o)), !1);
  if (t.pinned) {
    const t = document.createElement("div");
    t.className = "ab-pinned-indicator";
    const o = document.createElement("i");
    (o.className = "fa fa-star"), t.appendChild(o), a.appendChild(t);
  }
  if (t.imageUrl && "" !== t.imageUrl) {
    const o = document.createElement("div");
    o.className = "ab-image-area";
    const e = document.createElement("img");
    if (
      (e.setAttribute("src", t.imageUrl),
      (e.onload = () => {
        a.style.height = "auto";
      }),
      _setImageAltText(t, e),
      o.appendChild(e),
      (a.className += " with-image"),
      i && !t.V)
    ) {
      const t = document.createElement("a");
      t.setAttribute("href", n),
        (t.onclick = s),
        t.appendChild(o),
        a.appendChild(t);
    } else a.appendChild(o);
  }
  const u = document.createElement("div");
  if (((u.className = "ab-card-body"), t.dismissible)) {
    t.logCardDismissal = () => logCardDismissal(t);
    const e = createCloseButton("Dismiss Card", void 0, t.dismissCard.bind(t));
    a.appendChild(e),
      detectSwipe(u, DIRECTIONS.W, (t) => {
        (a.className += " ab-swiped-left"), e.onclick(t);
      }),
      detectSwipe(u, DIRECTIONS.X, (t) => {
        (a.className += " ab-swiped-right"), e.onclick(t);
      });
  }
  let p = "",
    b = !1;
  if ((t.title && "" !== t.title && ((p = t.title), (b = !0)), b)) {
    const t = document.createElement("h1");
    if (
      ((t.className = "ab-title"),
      (t.id = r$1.Z.Y()),
      a.setAttribute("aria-labelledby", t.id),
      i)
    ) {
      const o = document.createElement("a");
      o.setAttribute("href", n),
        (o.onclick = s),
        o.appendChild(document.createTextNode(p)),
        t.appendChild(o);
    } else t.appendChild(document.createTextNode(p));
    u.appendChild(t);
  }
  const l = document.createElement("div");
  if (
    ((l.className = b ? "ab-description" : "ab-description ab-no-title"),
    (l.id = r$1.Z.Y()),
    a.setAttribute("aria-describedby", l.id),
    t.description && l.appendChild(document.createTextNode(t.description)),
    i)
  ) {
    const o = document.createElement("div");
    o.className = "ab-url-area";
    const e = document.createElement("a");
    e.setAttribute("href", n),
      t.linkText && e.appendChild(document.createTextNode(t.linkText)),
      (e.onclick = s),
      o.appendChild(e),
      l.appendChild(o);
  }
  u.appendChild(l), a.appendChild(u);
  const f = document.createElement("div");
  return (
    (f.className = "ab-unread-indicator"),
    t.viewed && (f.className += " read"),
    a.appendChild(f),
    (t._ = a),
    a
  );
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

class nr {
  constructor(t, l = !1) {
    if (
      ((this.language = t),
      null != t && (t = t.toLowerCase()),
      null != t && null == zt[t])
    ) {
      const l = t.indexOf("-");
      l > 0 && (t = t.substring(0, l));
    }
    if (null == zt[t]) {
      const a =
        "Braze does not yet have a localization for language " +
        t +
        ", defaulting to English. Please contact us if you are willing and able to help us translate our SDK into this language.";
      l ? r$1.j.error(a) : r$1.j.info(a), (t = "en");
    }
    this.language = t;
  }
  get(t) {
    return zt[this.language][t];
  }
}

const Ce = {
  t: !1,
  i: null,
  m: () => {
    if ((Ce.o(), !Ce.i)) {
      let r = V.language,
        t = !1;
      e.nn(L.Ba) && ((r = e.nn(L.Ba)), (t = !0)), (Ce.i = new nr(r, t));
    }
    return Ce.i;
  },
  o: () => {
    Ce.t || (e.g(Ce), (Ce.t = !0));
  },
  destroy: () => {
    (Ce.i = null), (Ce.t = !1);
  },
};

function removeSubscription(r) {
  e.rr() && e.removeSubscription(r);
}

const LAST_REQUESTED_REFRESH_DATA_ATTRIBUTE =
  "data-last-requested-refresh";
const scrollListeners = {};
function destroyFeedHtml(e) {
  e &&
    ((e.className = e.className.replace("ab-show", "ab-hide")),
    setTimeout(() => {
      e && e.parentNode && e.parentNode.removeChild(e);
    }, x.Oh));
  const t = e.getAttribute("data-update-subscription-id");
  null != t && removeSubscription(t);
  const o = e.getAttribute("data-listener-id");
  null != o &&
    (window.removeEventListener("scroll", scrollListeners[o]),
    delete scrollListeners[o]);
}
function generateFeedBody(e, t) {
  const o = document.createElement("div");
  if (
    ((o.className = "ab-feed-body"),
    o.setAttribute("aria-label", "Feed"),
    o.setAttribute("role", "feed"),
    null == e.lastUpdated)
  ) {
    const e = document.createElement("div");
    e.className = "ab-no-cards-message";
    const t = document.createElement("i");
    (t.className = "fa fa-spinner fa-spin fa-4x ab-initial-spinner"),
      e.appendChild(t),
      o.appendChild(e);
  } else {
    let s = !1;
    const logCardClick = (t) => e.logCardClick(t);
    for (const n of e.cards) {
      const i = n instanceof ControlCard;
      !i || e.ur()
        ? (o.appendChild(cardToHtml(n, logCardClick, t)), (s = s || !i))
        : r$1.j.error(
            "Received a control card for a legacy news feed. Control cards are only supported with content cards.",
          );
    }
    if (!s) {
      const e = document.createElement("div");
      (e.className = "ab-no-cards-message"),
        (e.innerHTML = Ce.m().get("NO_CARDS_MESSAGE") || ""),
        e.setAttribute("role", "article"),
        o.appendChild(e);
    }
  }
  return o;
}
function detectFeedImpressions(e, t) {
  if (null != e && null != t) {
    const o = [],
      s = t.querySelectorAll(".ab-card");
    e.yo || (e.yo = {});
    for (let t = 0; t < s.length; t++) {
      const n = getCardId(s[t]),
        r = topIsInView(s[t]),
        i = bottomIsInView(s[t]);
      if (e.yo[n]) {
        r || i || markCardAsRead(s[t]);
        continue;
      }
      let a = topHadImpression(s[t]),
        d = bottomHadImpression(s[t]);
      const l = a,
        c = d;
      if (
        (!a && r && ((a = !0), impressOnTop(s[t])),
        !d && i && ((d = !0), impressOnBottom(s[t])),
        a && d)
      ) {
        if (l && c) continue;
        for (const t of e.cards)
          if (t.id === n) {
            (e.yo[t.id] = !0), o.push(t);
            break;
          }
      }
    }
    o.length > 0 && e.logCardImpressions(o);
  }
}
function refreshFeed(e, t) {
  if (null == e || null == t) return;
  t.setAttribute("aria-busy", "true");
  const o = t.querySelectorAll(".ab-refresh-button")[0];
  null != o && (o.className += " fa-spin");
  const s = new Date().valueOf().toString();
  t.setAttribute("data-last-requested-refresh", s),
    setTimeout(() => {
      if (t.getAttribute("data-last-requested-refresh") === s) {
        const e = t.querySelectorAll(".fa-spin");
        for (let t = 0; t < e.length; t++)
          e[t].className = e[t].className.replace(/fa-spin/g, "");
        const o = t.querySelectorAll(".ab-initial-spinner")[0];
        if (null != o) {
          const e = document.createElement("span");
          (e.innerHTML = Ce.m().get("FEED_TIMEOUT_MESSAGE") || ""),
            null != o.parentNode &&
              (o.parentNode.appendChild(e), o.parentNode.removeChild(o));
        }
        "true" === t.getAttribute("aria-busy") &&
          t.setAttribute("aria-busy", "false");
      }
    }, x.uo),
    e.sr();
}
function feedToHtml(e, t, o) {
  const s = document.createElement("div");
  (s.className = "ab-feed ab-hide ab-effect-slide"),
    s.setAttribute("role", "dialog"),
    s.setAttribute("aria-label", "Feed"),
    s.setAttribute("tabindex", "-1");
  const n = document.createElement("div");
  (n.className = "ab-feed-buttons-wrapper"),
    n.setAttribute("role", "group"),
    s.appendChild(n);
  const i = document.createElement("i");
  (i.className = "fa fa-times ab-close-button"),
    i.setAttribute("aria-label", "Close Feed"),
    i.setAttribute("tabindex", "0"),
    i.setAttribute("role", "button");
  const a = (e) => {
    destroyFeedHtml(s), e.stopPropagation();
  };
  i.addEventListener("keydown", (e) => {
    (e.keyCode !== KeyCodes.Fo && e.keyCode !== KeyCodes.To) || a(e);
  }),
    (i.onclick = a);
  const d = document.createElement("i");
  (d.className = "fa fa-refresh ab-refresh-button"),
    e && null == e.lastUpdated && (d.className += " fa-spin"),
    d.setAttribute("aria-label", "Refresh Feed"),
    d.setAttribute("tabindex", "0"),
    d.setAttribute("role", "button");
  const l = (t) => {
    refreshFeed(e, s), t.stopPropagation();
  };
  d.addEventListener("keydown", (e) => {
    (e.keyCode !== KeyCodes.Fo && e.keyCode !== KeyCodes.To) || l(e);
  }),
    (d.onclick = l),
    n.appendChild(d),
    n.appendChild(i),
    s.appendChild(generateFeedBody(e, t));
  const c = () => detectFeedImpressions(e, s);
  if ((s.addEventListener("scroll", c), !o)) {
    window.addEventListener("scroll", c);
    const e = r$1.Z.Y();
    (scrollListeners[e] = c), s.setAttribute("data-listener-id", e);
  }
  return s;
}
function updateFeedCards(e, t, o, s, n) {
  if (!isArray(t)) return;
  const i = [];
  for (const e of t)
    if (e instanceof Card) {
      if (e.url && BRAZE_ACTION_URI_REGEX.test(e.url)) {
        const t = getDecodedBrazeAction(e.url);
        if (containsUnknownBrazeAction(t)) {
          r$1.j.error(ineligibleBrazeActionURLErrorMessage(INELIGIBLE_BRAZE_ACTION_URL_ERROR_TYPES._r, "Content Card"));
          continue;
        }
      }
      i.push(e);
    }
  if (((e.cards = i), (e.lastUpdated = o), null != s))
    if ((s.setAttribute("aria-busy", "false"), null == e.lastUpdated))
      destroyFeedHtml(s);
    else {
      const t = s.querySelectorAll(".ab-feed-body")[0];
      if (null != t) {
        const o = generateFeedBody(e, n);
        t.parentNode && t.parentNode.replaceChild(o, t),
          detectFeedImpressions(e, o.parentNode);
      }
    }
}
function registerFeedSubscriptionId(e, t) {
  e && t.setAttribute("data-update-subscription-id", e);
}

function hideContentCards(n) {
  if (!e.rr()) return;
  const o = document.querySelectorAll(".ab-feed");
  for (let e = 0; e < o.length; e++)
    (null == n || (null != n && o[e].parentNode === n)) && destroyFeedHtml(o[e]);
}

function logContentCardsDisplayed() {
  if (e.rr()) return logDeprecationWarning("logContentCardsDisplayed", "method"), !0;
}

function showContentCards(n, t) {
  if (!e.rr()) return;
  setupFeedUI();
  let o = !1;
  null == n && ((n = document.body), (o = !0));
  const a = e.nn(L.tn) || e.nn(L.en) || !1,
    i = g$1.er().Us(!1);
  "function" == typeof t && updateFeedCards(i, t(i.cards.slice()), i.lastUpdated, null, a);
  const s = feedToHtml(i, a, o),
    l = g$1.er(),
    f = l.Qt();
  (null == i.lastUpdated ||
    new Date().valueOf() - i.lastUpdated.valueOf() > ContentCards.mr) &&
    (null == f || new Date().valueOf() - f > ContentCards.mr) &&
    (r$1.j.info(
      `Cached content cards were older than max TTL of ${ContentCards.mr} ms, requesting an update from the server.`,
    ),
    refreshFeed(i, s),
    l.Vt(new Date().valueOf()));
  const c = new Date().valueOf(),
    u = subscribeToContentCardsUpdates(function (n) {
      const e = s.querySelectorAll(".ab-refresh-button")[0];
      if (null != e) {
        let n = 500,
          t = (n -= new Date().valueOf() - c);
        const o = s.getAttribute(LAST_REQUESTED_REFRESH_DATA_ATTRIBUTE);
        o && ((t = parseInt(o)), isNaN(t) || (n -= new Date().valueOf() - t)),
          setTimeout(
            function () {
              e.className = e.className.replace(/fa-spin/g, "");
            },
            Math.max(n, 0),
          );
      }
      let o = n.cards;
      "function" == typeof t && (o = t(o.slice())),
        updateFeedCards(i, o, n.lastUpdated, s, a);
    });
  registerFeedSubscriptionId(u, s);
  const d = function (n) {
    const t = n.querySelectorAll(".ab-feed");
    let e = null;
    for (let o = 0; o < t.length; o++) t[o].parentNode === n && (e = t[o]);
    null != e
      ? (destroyFeedHtml(e), null != e.parentNode && e.parentNode.replaceChild(s, e))
      : n.appendChild(s),
      setTimeout(function () {
        s.className = s.className.replace("ab-hide", "ab-show");
      }, 0),
      o && s.focus(),
      detectFeedImpressions(i, s),
      setCardHeight(i.cards, n);
  };
  var m;
  null != n
    ? d(n)
    : (window.onload =
        ((m = window.onload),
        function () {
          "function" == typeof m && m(new Event("oldLoad")), d(document.body);
        }));
}

function subscribeToContentCardsUpdates(r) {
  if (!e.rr()) return;
  const t = g$1.er(),
    n = t.ri(r);
  if (!t.Wt()) {
    const r = e.cr();
    if (r) {
      const n = r.pr(() => {
        t.Ms();
      });
      n && t.Xt(n);
    }
  }
  return n;
}

function toggleContentCards(n, o) {
  e.rr() &&
    (document.querySelectorAll(".ab-feed").length > 0
      ? hideContentCards()
      : showContentCards(n, o));
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
  if (!e.rr()) return;
  if (!isArray(a))
    return (
      r$1.j.error("Cannot set SDK metadata because metadata is not an array."), !1
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
  const t = e.ar();
  return t && t.addSdkMetadata(a), !0;
}

function changeUser(i, t) {
  if (!e.rr()) return;
  if (null == i || 0 === i.length || i != i)
    return void r$1.j.error("changeUser requires a non-empty userId.");
  if (getByteLength(i) > User.lr)
    return void r$1.j.error(
      `Rejected user id "${i}" because it is longer than ${User.lr} bytes.`,
    );
  if (null != t && !validateStandardString(t, "set signature for new user", "signature")) return;
  const s = e.cr();
  s && s.changeUser(i.toString(), e.gr(), t);
}

var changeUser$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	changeUser: changeUser
});

function destroy() {
  r$1.j.info("Destroying Braze instance"), e.destroy(!0);
}

function disableSDK() {
  const a = e.cr();
  a && a.requestImmediateDataFlush();
  const s = new O.ee(null, !0),
    n = "This-cookie-will-expire-in-" + s.ae();
  s.store(STORAGE_KEYS.re, n);
  const o = r$1.zt.Ft;
  new r$1.xt(o, r$1.j).setItem(o.Jt.se, o.ie, !0),
    r$1.j.info("disableSDK was called"),
    e.destroy(!1),
    e.ne(!0);
}

function enableSDK() {
  new O.ee(null, !0).remove(STORAGE_KEYS.re);
  const a = r$1.zt.Ft;
  new r$1.xt(a, r$1.j).oe(a.Jt.se, a.ie),
    r$1.j.info("enableSDK was called"),
    e.destroy(!1),
    e.ne(!1);
}

function getDeviceId(i) {
  if (!e.rr()) return;
  null == i &&
    r$1.j.error(
      "getDeviceId must be supplied with a callback. e.g., braze.getDeviceId(function(deviceId) {console.log('the device id is ' + deviceId)})",
    );
  const t = e.te();
  "function" == typeof i && t && i(t.ce().id);
}

function initialize(i, n) {
  return e.initialize(i, n);
}

function isDisabled() {
  return !!new O.ee(null, !0).jr(STORAGE_KEYS.re);
}

function logCustomEvent(t, o) {
  if (!e.rr()) return !1;
  if (null == t || t.length <= 0)
    return (
      r$1.j.error(
        `logCustomEvent requires a non-empty eventName, got "${t}". Ignoring event.`,
      ),
      !1
    );
  if (!validateCustomString(t, "log custom event", "the event name")) return !1;
  const [n, i] = validateCustomProperties(
    o,
    LOG_CUSTOM_EVENT_STRING,
    "eventProperties",
    `log custom event "${t}"`,
    "event",
  );
  if (!n) return !1;
  const m = e.tr();
  if (m && m.ge(t))
    return r$1.j.info(`Custom Event "${t}" is blocklisted, ignoring.`), !1;
  const g = s$1.N(r$1.q.CustomEvent, { n: t, p: i });
  if (g.O) {
    r$1.j.info(`Logged custom event "${t}".`);
    for (const e of g.ve) TriggersProviderFactory.er().be(tt.$e, [t, o], e);
  }
  return g.O;
}

var logCustomEvent$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	logCustomEvent: logCustomEvent
});

function logPurchase(o, i, n, t, D) {
  if (!e.rr()) return !1;
  if (
    (null == n && (n = "USD"), null == t && (t = 1), null == o || o.length <= 0)
  )
    return (
      r$1.j.error(
        `logPurchase requires a non-empty productId, got "${o}", ignoring.`,
      ),
      !1
    );
  if (!validateCustomString(o, "log purchase", "the purchase name")) return !1;
  if (null == i || isNaN(parseFloat(i.toString())))
    return (
      r$1.j.error(`logPurchase requires a numeric price, got ${i}, ignoring.`), !1
    );
  const a = parseFloat(i.toString()).toFixed(2);
  if (null == t || isNaN(parseInt(t.toString())))
    return (
      r$1.j.error(
        `logPurchase requires an integer quantity, got ${t}, ignoring.`,
      ),
      !1
    );
  const u = parseInt(t.toString());
  if (u < 1 || u > MAX_PURCHASE_QUANTITY)
    return (
      r$1.j.error(
        `logPurchase requires a quantity >1 and <${MAX_PURCHASE_QUANTITY}, got ${u}, ignoring.`,
      ),
      !1
    );
  n = null != n ? n.toUpperCase() : n;
  if (
    -1 ===
    [
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
    ].indexOf(n)
  )
    return (
      r$1.j.error(
        `logPurchase requires a valid currencyCode, got ${n}, ignoring.`,
      ),
      !1
    );
  const [g, P] = validateCustomProperties(
    D,
    "logPurchase",
    "purchaseProperties",
    `log purchase "${o}"`,
    "purchase",
  );
  if (!g) return !1;
  const R = e.tr();
  if (R && R.Dr(o))
    return r$1.j.info(`Purchase "${o}" is blocklisted, ignoring.`), !1;
  const c = s$1.N(r$1.q.Pr, { pid: o, c: n, p: a, q: u, pr: P });
  if (c.O) {
    r$1.j.info(
      `Logged ${u} purchase${u > 1 ? "s" : ""} of "${o}" for ${n} ${a}.`,
    );
    for (const r of c.ve) TriggersProviderFactory.er().be(tt.Rr, [o, D], r);
  }
  return c.O;
}

var logPurchase$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	logPurchase: logPurchase
});

function openSession() {
  if (!e.rr()) return;
  const i = e.cr();
  if (!i) return;
  i.openSession();
  const t = r$1.zt.Ft,
    o = new r$1.xt(t, r$1.j);
  o.hr(t.Jt.kr, (e, s) => {
    const n = s.lastClick,
      c = s.trackingString;
    r$1.j.info(`Firing push click trigger from ${c} push click at ${n}`);
    const g = i.vr(n, c),
      f = function () {
        TriggersProviderFactory.er().be(tt.zr, [c], g);
      };
    i.$r(f, f), o.oe(t.Jt.kr, e);
  }),
    o.Mt(t.Jt.wr, function (r) {
      i.yr(r);
    });
}

function removeAllSubscriptions() {
  e.rr() && e.removeAllSubscriptions();
}

function requestImmediateDataFlush(t) {
  if (!e.rr()) return;
  const r = e.cr();
  r && r.requestImmediateDataFlush(t);
}

var requestImmediateDataFlush$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	requestImmediateDataFlush: requestImmediateDataFlush
});

function setLogger(e) {
  r$1.j.setLogger(e);
}

function setSdkAuthenticationSignature(t) {
  if (!e.rr()) return !1;
  if ("" === t || !validateStandardString(t, "set signature", "signature", !1)) return !1;
  const r = e.Sr();
  return !!r && (r.setSdkAuthenticationSignature(t), !0);
}

function subscribeToSdkAuthenticationFailures(r) {
  if (!e.rr()) return;
  const n = e.Sr();
  return n ? n.subscribeToSdkAuthenticationFailures(r) : void 0;
}

function toggleLogging() {
  r$1.j.toggleLogging();
}

function wipeData() {
  if (null == e.l()) throw new Error(BRAZE_MUST_BE_INITIALIZED_ERROR);
  const o = e.l();
  o && o.clearData();
  const t = keys(r$1.zt);
  for (let o = 0; o < t.length; o++) {
    const n = t[o],
      s = r$1.zt[n];
    new r$1.xt(s, r$1.j).clearData();
  }
  if (e.rr()) for (const o of e.gr()) o.clearData(!0);
}

class re extends y {
  constructor(t, s) {
    super(),
      (this.u = t),
      (this.ki = s),
      (this.cards = []),
      (this.Ai = null),
      (this.u = t),
      (this.ki = s),
      (this.yt = new E()),
      e.jt(this.yt),
      this.Lt();
  }
  Lt() {
    let t = [];
    this.u && (t = this.u.v(STORAGE_KEYS.k.Bi) || []);
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const e = newCardFromSerializedValue(t[i]);
      null != e && s.push(e);
    }
    (this.cards = s), this.u && (this.Ai = rehydrateDateAfterJsonization(this.u.v(STORAGE_KEYS.k.Ei)));
  }
  Gi(t) {
    const s = [];
    let e = null,
      r = {};
    this.u && (r = this.u.v(STORAGE_KEYS.k.L) || {});
    const h = {};
    for (let i = 0; i < t.length; i++) {
      e = t[i];
      const o = newCardFromFeedJson(e);
      if (null != o) {
        const t = o.id;
        t && r[t] && ((o.viewed = !0), (h[t] = !0)), s.push(o);
      }
    }
    (this.cards = s),
      this.Rs(),
      (this.Ai = new Date()),
      this.u && (this.u.D(STORAGE_KEYS.k.L, h), this.u.D(STORAGE_KEYS.k.Ei, this.Ai));
  }
  Rs() {
    if (!this.u) return;
    const t = [];
    for (let s = 0; s < this.cards.length; s++) t.push(this.cards[s].ss());
    this.u.D(STORAGE_KEYS.k.Bi, t);
  }
  Ts(t) {
    null != t &&
      t.feed &&
      (this.Lt(),
      this.Gi(t.feed),
      this.yt.Et(new Feed(this.cards.slice(), this.Ai)));
  }
  Hi() {
    this.Lt();
    const t = [],
      s = new Date();
    for (let i = 0; i < this.cards.length; i++) {
      const e = this.cards[i].expiresAt;
      let r = !0;
      null != e && (r = e >= s), r && t.push(this.cards[i]);
    }
    return new Feed(t, this.Ai);
  }
  Ms() {
    this.ki && this.ki.requestFeedRefresh();
  }
  ri(t) {
    return this.yt.lt(t);
  }
  clearData(t) {
    null == t && (t = !1),
      (this.cards = []),
      (this.Ai = null),
      t && this.u && (this.u.ni(STORAGE_KEYS.k.Bi), this.u.ni(STORAGE_KEYS.k.Ei)),
      this.yt.Et(new Feed(this.cards.slice(), this.Ai));
  }
}

const ie = {
  t: !1,
  provider: null,
  er: () => (
    ie.o(),
    ie.provider || ((ie.provider = new re(e.l(), e.cr())), e.dr(ie.provider)),
    ie.provider
  ),
  o: () => {
    ie.t || (e.g(ie), (ie.t = !0));
  },
  destroy: () => {
    (ie.provider = null), (ie.t = !1);
  },
};
var ie$1 = ie;

function requestFeedRefresh() {
  if (e.rr()) return ie$1.er().Ms();
}

class Feed extends x {
  constructor(r, e) {
    super(r, e);
  }
  logCardImpressions(r) {
    logCardImpressions(r, !1);
  }
  logCardClick(r) {
    return logCardClick(r, !1);
  }
  sr() {
    requestFeedRefresh();
  }
  ur() {
    return !1;
  }
}

function getCachedFeed() {
  if (e.rr()) return ie$1.er().Hi();
}

function destroyFeed() {
  if (!e.rr()) return;
  const o = document.querySelectorAll(".ab-feed");
  for (let e = 0; e < o.length; e++) destroyFeedHtml(o[e]);
}

function logFeedDisplayed() {
  if (!e.rr()) return;
  const i = e.ar();
  return i ? i.qr(r$1.Cr.Br).O : void 0;
}

function showFeed(t, n, o) {
  if (!e.rr()) return;
  setupFeedUI();
  const s = (e, t) => {
      if (null == t) return e;
      const n = [];
      for (let e = 0; e < t.length; e++) n.push(t[e].toLowerCase());
      const o = [];
      for (let t = 0; t < e.length; t++) {
        const r = [],
          s = e[t].categories || [];
        for (let e = 0; e < s.length; e++) r.push(s[e].toLowerCase());
        intersection(r, n).length > 0 && o.push(e[t]);
      }
      return o;
    },
    i = e.nn(L.tn) || e.nn(L.en) || !1;
  let l = !1;
  null == t && ((t = document.body), (l = !0));
  let a,
    f = !1;
  null == n
    ? ((a = ie$1.er().Hi()),
      updateFeedCards(a, s(a.cards, o), a.lastUpdated, null, i),
      (f = !0))
    : (a = new Feed(s(n, o), new Date()));
  const u = feedToHtml(a, i, l);
  if (f) {
    (null == a.lastUpdated ||
      new Date().valueOf() - a.lastUpdated.valueOf() > Feed.mr) &&
      (r$1.j.info(
        `Cached feed was older than max TTL of ${Feed.mr} ms, requesting an update from the server.`,
      ),
      refreshFeed(a, u));
    const e = new Date().valueOf(),
      t = subscribeToFeedUpdates(function (t) {
        const n = u.querySelectorAll(".ab-refresh-button")[0];
        if (null != n) {
          let t = 500;
          t -= new Date().valueOf() - e;
          const o = u.getAttribute(LAST_REQUESTED_REFRESH_DATA_ATTRIBUTE);
          if (o) {
            const e = parseInt(o);
            isNaN(e) || (t -= new Date().valueOf() - e);
          }
          setTimeout(
            function () {
              n.className = n.className.replace(/fa-spin/g, "");
            },
            Math.max(t, 0),
          );
        }
        updateFeedCards(a, s(t.cards, o), t.lastUpdated, u, i);
      });
    registerFeedSubscriptionId(t, u);
  }
  const d = (e) => {
    const t = e.querySelectorAll(".ab-feed");
    let n = null;
    for (let o = 0; o < t.length; o++) t[o].parentNode === e && (n = t[o]);
    null != n
      ? (destroyFeedHtml(n), n.parentNode && n.parentNode.replaceChild(u, n))
      : e.appendChild(u),
      setTimeout(function () {
        u.className = u.className.replace("ab-hide", "ab-show");
      }, 0),
      l && u.focus(),
      logFeedDisplayed(),
      detectFeedImpressions(a, u),
      a && setCardHeight(a.cards, e);
  };
  var m;
  null != t
    ? d(t)
    : (window.onload =
        ((m = window.onload),
        function () {
          "function" == typeof m && m(new Event("oldLoad")), d(document.body);
        }));
}

var showFeed$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	showFeed: showFeed
});

function subscribeToFeedUpdates(r) {
  if (e.rr()) return ie$1.er().ri(r);
}

function toggleFeed(o, n, r) {
  e.rr() &&
    (document.querySelectorAll(".ab-feed").length > 0
      ? destroyFeed()
      : showFeed(o, n, r));
}

function isPushBlocked() {
  if (e.rr()) return jt$1.isPushBlocked();
}

function isPushPermissionGranted() {
  if (e.rr()) return jt$1.isPushPermissionGranted();
}

function isPushSupported() {
  if (e.rr()) return jt$1.isPushSupported();
}

class ea {
  constructor(i, t, e, s, r, n, o, u, h, a) {
    (this.hn = i),
      (this.cn = t),
      (this.fn = e),
      (this.dn = r),
      (this.bn = n),
      (this.wt = o),
      (this.yn = u),
      (this.gn = h),
      (this.u = a),
      (this.hn = i),
      (this.cn = t),
      (this.fn = e),
      (this.wn = s + "/safari/" + t),
      (this.dn = r || "/service-worker.js"),
      (this.bn = n),
      (this.wt = o),
      (this.yn = u || !1),
      (this.gn = h || !1),
      (this.u = a),
      (this.vn = jt$1.kn()),
      (this.Pn = jt$1.Dn());
  }
  Sn() {
    return this.gn;
  }
  An(i, t, e, s, n) {
    i.unsubscribe()
      .then((i) => {
        i
          ? this.jn(t, e, s, n)
          : (r$1.j.error("Failed to unsubscribe device from push."),
            "function" == typeof n && n(!1));
      })
      .catch((i) => {
        r$1.j.error("Push unsubscription error: " + i),
          "function" == typeof n && n(!1);
      });
  }
  Un(i, t, e) {
    const s = ((i) => {
      if ("string" == typeof i) return i;
      if (0 !== i.endpoint.indexOf("https://android.googleapis.com/gcm/send"))
        return i.endpoint;
      let t = i.endpoint;
      const e = i;
      return (
        e.Wn &&
          -1 === i.endpoint.indexOf(e.Wn) &&
          (t = i.endpoint + "/" + e.Wn),
        t
      );
    })(i);
    let r = null,
      n = null;
    const o = i;
    if (null != o.getKey)
      try {
        const i = Array.from(new Uint8Array(o.getKey("p256dh"))),
          t = Array.from(new Uint8Array(o.getKey("auth")));
        (r = btoa(String.fromCharCode.apply(null, i))),
          (n = btoa(String.fromCharCode.apply(null, t)));
      } catch (i) {
        if ("invalid arguments" !== getErrorMessage(i)) throw i;
      }
    const u = ((i) => {
      let t;
      return i.options &&
        (t = i.options.applicationServerKey) &&
        t.byteLength &&
        t.byteLength > 0
        ? btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(t))))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
        : null;
    })(o);
    this.hn && this.hn._n(s, t, r, n, u),
      s && "function" == typeof e && e(s, r, n);
  }
  xn() {
    this.hn && this.hn.Nn(!0);
  }
  Tn(i, t) {
    this.hn && this.hn.Nn(!1), r$1.j.info(i), "function" == typeof t && t(!1);
  }
  zn(i, t, e, s) {
    var n;
    if ("default" === t.permission)
      try {
        window.safari.pushNotification.requestPermission(
          this.wn,
          i,
          {
            api_key: this.cn,
            device_id:
              (null === (n = this.fn) || void 0 === n ? void 0 : n.ce().id) ||
              "",
          },
          (t) => {
            "granted" === t.permission &&
              this.hn &&
              this.hn.setPushNotificationSubscriptionType(
                User.NotificationSubscriptionTypes.OPTED_IN,
              ),
              this.zn(i, t, e, s);
          },
        );
      } catch (i) {
        this.Tn("Could not request permission for push: " + i, s);
      }
    else
      "denied" === t.permission
        ? this.Tn(
            "The user has blocked notifications from this site, or Safari push is not configured in the Braze dashboard.",
            s,
          )
        : "granted" === t.permission &&
          (r$1.j.info("Device successfully subscribed to push."),
          this.Un(t.deviceToken, new Date(), e));
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
          r$1.j.error("Received unexpected permission result " + s);
      }
    };
    let n = !1;
    const o = window.Notification.requestPermission((i) => {
      n && s(i);
    });
    o
      ? o.then((i) => {
          s(i);
        })
      : (n = !0);
  }
  jn(i, t, e, s) {
    const n = { userVisibleOnly: !0 };
    null != t && (n.applicationServerKey = t),
      i.pushManager
        .subscribe(n)
        .then((i) => {
          r$1.j.info("Device successfully subscribed to push."),
            this.Un(i, new Date(), e);
        })
        .catch((i) => {
          jt$1.isPushBlocked()
            ? (r$1.j.info("Permission for push notifications was denied."),
              "function" == typeof s && s(!1))
            : (r$1.j.error("Push subscription failed: " + i),
              "function" == typeof s && s(!0));
        });
  }
  In() {
    return this.yn
      ? navigator.serviceWorker.getRegistration(this.dn)
      : navigator.serviceWorker.register(this.dn).then(() =>
          navigator.serviceWorker.ready.then(
            (i) => (
              i &&
                "function" == typeof i.update &&
                i.update().catch((i) => {
                  r$1.j.info("ServiceWorker update failed: " + i);
                }),
              i
            ),
          ),
        );
  }
  Vn(i) {
    this.yn ||
      (i.unregister(), r$1.j.info("Service worker successfully unregistered."));
  }
  subscribe(t, e) {
    if (!jt$1.isPushSupported())
      return r$1.j.info(ea.qn), void ("function" == typeof e && e(!1));
    if (this.vn) {
      if (!this.yn && null != window.location) {
        let i = this.dn;
        -1 === i.indexOf(window.location.host) &&
          (i = window.location.host + i),
          -1 === i.indexOf(window.location.protocol) &&
            (i = window.location.protocol + "//" + i);
        const t = i.substr(0, i.lastIndexOf("/") + 1);
        if (0 !== WindowUtils.Cn().indexOf(t))
          return (
            r$1.j.error(
              "Cannot subscribe to push from a path higher than the service worker location (tried to subscribe from " +
                window.location.pathname +
                " but service worker is at " +
                i +
                ")",
            ),
            void ("function" == typeof e && e(!0))
          );
      }
      if (jt$1.isPushBlocked())
        return void this.Tn(
          "Notifications from this site are blocked. This may be a temporary embargo or a permanent denial.",
          e,
        );
      if (this.wt && !this.wt.En() && 0 === this.wt.li())
        return (
          r$1.j.info(
            "Waiting for VAPID key from server config before subscribing to push.",
          ),
          void this.wt.Rn(() => {
            this.subscribe(t, e);
          })
        );
      const s = () => {
          r$1.j.info("Permission for push notifications was denied."),
            "function" == typeof e && e(!1);
        },
        n = () => {
          let i = "Permission for push notifications was ignored.";
          jt$1.isPushBlocked() &&
            (i +=
              " The browser has automatically blocked further permission requests for a period (probably 1 week)."),
            r$1.j.info(i),
            "function" == typeof e && e(!0);
        },
        o = jt$1.isPushPermissionGranted(),
        u = () => {
          !o &&
            this.hn &&
            this.hn.setPushNotificationSubscriptionType(
              User.NotificationSubscriptionTypes.OPTED_IN,
            ),
            this.In()
              .then((s) => {
                if (null == s)
                  return (
                    r$1.j.error(
                      "No service worker registration. Set the `manageServiceWorkerExternally` initialization option to false or ensure that your service worker is registered before calling registerPush.",
                    ),
                    void ("function" == typeof e && e(!0))
                  );
                s.pushManager
                  .getSubscription()
                  .then((n) => {
                    let o = null;
                    if (
                      (this.wt &&
                        null != this.wt.En() &&
                        (o = r$1.On.Fn(this.wt.En())),
                      n)
                    ) {
                      let u,
                        h = null,
                        a = null;
                      if ((this.u && (u = this.u.v(STORAGE_KEYS.k.Bn)), u && !isArray(u))) {
                        let i;
                        try {
                          i = ti.Yn(u).Mn;
                        } catch (t) {
                          i = null;
                        }
                        null == i ||
                          isNaN(i.getTime()) ||
                          0 === i.getTime() ||
                          ((h = i),
                          (a = new Date(h)),
                          a.setMonth(h.getMonth() + 6));
                      }
                      null != o &&
                      n.options &&
                      n.options.applicationServerKey &&
                      n.options.applicationServerKey.byteLength &&
                      n.options.applicationServerKey.byteLength > 0 &&
                      !isEqual(o, new Uint8Array(n.options.applicationServerKey))
                        ? (n.options.applicationServerKey.byteLength > 12
                            ? r$1.j.info(
                                "Device was already subscribed to push using a different VAPID provider, creating new subscription.",
                              )
                            : r$1.j.info(
                                "Attempting to upgrade a gcm_sender_id-based push registration to VAPID - depending on the browser this may or may not result in the same gcm_sender_id-based subscription.",
                              ),
                          this.An(n, s, o, t, e))
                        : n.expirationTime &&
                          new Date(n.expirationTime).valueOf() <=
                            new Date().valueOf()
                        ? (r$1.j.info(
                            "Push subscription is expired, creating new subscription.",
                          ),
                          this.An(n, s, o, t, e))
                        : u && isArray(u)
                        ? this.An(n, s, o, t, e)
                        : null == a
                        ? (r$1.j.info(
                            "No push subscription creation date found, creating new subscription.",
                          ),
                          this.An(n, s, o, t, e))
                        : a.valueOf() <= new Date().valueOf()
                        ? (r$1.j.info(
                            "Push subscription older than 6 months, creating new subscription.",
                          ),
                          this.An(n, s, o, t, e))
                        : (r$1.j.info(
                            "Device already subscribed to push, sending existing subscription to backend.",
                          ),
                          this.Un(n, h, t));
                    } else this.jn(s, o, t, e);
                  })
                  .catch((i) => {
                    r$1.j.error(
                      "Error checking current push subscriptions: " + i,
                    );
                  });
              })
              .catch((i) => {
                r$1.j.error("ServiceWorker registration failed: " + i);
              });
        };
      this.requestPermission(u, n, s);
    } else if (this.Pn) {
      if (null == this.bn || "" === this.bn)
        return (
          r$1.j.error(
            "You must supply the safariWebsitePushId initialization option in order to use registerPush on Safari",
          ),
          void ("function" == typeof e && e(!0))
        );
      const i = window.safari.pushNotification.permission(this.bn);
      this.zn(this.bn, i, t, e);
    }
  }
  unsubscribe(i, t) {
    if (!jt$1.isPushSupported())
      return r$1.j.info(ea.qn), void ("function" == typeof t && t());
    this.vn
      ? navigator.serviceWorker.getRegistration().then((e) => {
          e
            ? e.pushManager
                .getSubscription()
                .then((s) => {
                  s &&
                    (this.xn(),
                    s
                      .unsubscribe()
                      .then((s) => {
                        s
                          ? (r$1.j.info(
                              "Device successfully unsubscribed from push.",
                            ),
                            "function" == typeof i && i())
                          : (r$1.j.error(
                              "Failed to unsubscribe device from push.",
                            ),
                            "function" == typeof t && t()),
                          this.Vn(e);
                      })
                      .catch((i) => {
                        r$1.j.error("Push unsubscription error: " + i),
                          "function" == typeof t && t();
                      }));
                })
                .catch((i) => {
                  r$1.j.error("Error unsubscribing from push: " + i),
                    "function" == typeof t && t();
                })
            : (r$1.j.info("Device already unsubscribed from push."),
              "function" == typeof i && i());
        })
      : this.Pn &&
        (this.xn(),
        r$1.j.info("Device unsubscribed from push."),
        "function" == typeof i && i());
  }
}
ea.qn = "Push notifications are not supported in this browser.";

const na = {
  t: !1,
  i: null,
  m: () => (
    na.o(),
    na.i ||
      (na.i = new ea(
        e.br(),
        e.Ma(),
        e.te(),
        e.Ys(),
        e.nn(L._a),
        e.nn(L.ka),
        e.tr(),
        e.nn(L.qa),
        e.nn(L.Aa),
        e.l(),
      )),
    na.i
  ),
  o: () => {
    na.t || (e.g(na), (na.t = !0));
  },
  destroy: () => {
    (na.i = null), (na.t = !1);
  },
};
var na$1 = na;

var pushManagerFactory = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': na$1
});

function requestPushPermission(r, n) {
  if (e.rr())
    return na$1.m().subscribe((n, o, t) => {
      const s = e.cr();
      s && s.requestImmediateDataFlush(), "function" == typeof r && r(n, o, t);
    }, n);
}

var requestPushPermission$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	requestPushPermission: requestPushPermission
});

function unregisterPush(r, n) {
  if (e.rr()) return na$1.m().unsubscribe(r, n);
}

var unregisterPush$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	unregisterPush: unregisterPush
});

class FeatureFlag {
  constructor(t, r = !1, e = {}, s) {
    (this.id = t),
      (this.enabled = r),
      (this.properties = e),
      (this.trackingString = s),
      (this.id = t),
      (this.enabled = r),
      (this.properties = e),
      (this.trackingString = s);
  }
  getStringProperty(t) {
    const r = this.properties[t];
    return null == r
      ? (this.Er(t), null)
      : this.Ir(r)
      ? r.value
      : (this.Nr("string"), null);
  }
  getNumberProperty(t) {
    const r = this.properties[t];
    return null == r
      ? (this.Er(t), null)
      : this.Tr(r)
      ? r.value
      : (this.Nr("number"), null);
  }
  getBooleanProperty(t) {
    const r = this.properties[t];
    return null == r
      ? (this.Er(t), null)
      : this.Ar(r)
      ? r.value
      : (this.Nr("boolean"), null);
  }
  ss() {
    const t = {};
    return (
      (t[FeatureFlag.hs.ns] = this.id),
      (t[FeatureFlag.hs.Fe] = this.enabled),
      (t[FeatureFlag.hs.we] = this.properties),
      (t[FeatureFlag.hs.ze] = this.trackingString),
      t
    );
  }
  Nr(t) {
    r$1.j.info(`Property is not of type ${t}.`);
  }
  Er(t) {
    r$1.j.info(`${t} not found in feature flag properties.`);
  }
  Ir(t) {
    return "string" === t.type && "string" == typeof t.value;
  }
  Tr(t) {
    return "number" === t.type && "number" == typeof t.value;
  }
  Ar(t) {
    return "boolean" === t.type && "boolean" == typeof t.value;
  }
}
(FeatureFlag.hs = { ns: "id", Fe: "e", we: "pr", ze: "fts" }),
  (FeatureFlag.Tt = { ns: "id", Fe: "enabled", we: "properties", ze: "fts" });

function newFeatureFlagFromJson(e) {
  if (e[FeatureFlag.Tt.ns] && "boolean" == typeof e[FeatureFlag.Tt.Fe])
    return new FeatureFlag(
      e[FeatureFlag.Tt.ns],
      e[FeatureFlag.Tt.Fe],
      e[FeatureFlag.Tt.we],
      e[FeatureFlag.Tt.ze],
    );
  r$1.j.info(`Unable to create feature flag from ${JSON.stringify(e, null, 2)}`);
}
function newFeatureFlagFromSerializedValue(e) {
  if (e[FeatureFlag.hs.ns] && "boolean" == typeof e[FeatureFlag.hs.Fe])
    return new FeatureFlag(
      e[FeatureFlag.hs.ns],
      e[FeatureFlag.hs.Fe],
      e[FeatureFlag.hs.we],
      e[FeatureFlag.hs.ze],
    );
  r$1.j.info(
    `Unable to deserialize feature flag from ${JSON.stringify(e, null, 2)}`,
  );
}

class er extends y {
  constructor(t, s, i) {
    super(),
      (this.wt = t),
      (this.gt = s),
      (this.u = i),
      (this.pi = []),
      (this.gi = 0),
      (this.wt = t),
      (this.gt = s),
      (this.u = i),
      (this.Fi = null),
      (this.wi = new E()),
      (this.yi = 10),
      (this.ji = null),
      (this.bi = null),
      e.jt(this.wi);
  }
  Ts(t) {
    if ((!this.wt || this.wt.vi()) && null != t && t.feature_flags) {
      this.pi = [];
      for (const s of t.feature_flags) {
        const t = newFeatureFlagFromJson(s);
        t && this.pi.push(t);
      }
      (this.gi = new Date().getTime()), this.Ti(), this.wi.Et(this.pi);
    }
  }
  Di() {
    let t = {};
    this.u && (t = this.u.v(STORAGE_KEYS.k.Ri));
    const s = {};
    for (const i in t) {
      const e = newFeatureFlagFromSerializedValue(t[i]);
      e && (s[e.id] = e);
    }
    return s;
  }
  Ni() {
    var t;
    return (null === (t = this.u) || void 0 === t ? void 0 : t.v(STORAGE_KEYS.k.qi)) || {};
  }
  xi(t) {
    this.u && this.u.D(STORAGE_KEYS.k.qi, t);
  }
  ri(t) {
    return this.wi.lt(t);
  }
  refreshFeatureFlags(t, s, i = !1, e = !0) {
    if (!this.zi(i))
      return (
        !this.Fi &&
          this.wt &&
          (this.Fi = this.wt.Ci(() => {
            this.refreshFeatureFlags(t, s);
          })),
        void ("function" == typeof s && s())
      );
    if ((e && this.Ii(), !this.gt)) return void ("function" == typeof s && s());
    const r = this.gt.Bs({}, !0),
      h = this.gt.Hs(r, T.Os.Si);
    let o = !1;
    this.gt.Qs(r, () => {
      this.gt
        ? (T.Ws(this.u, T.Os.Si, new Date().valueOf()),
          C.Xs({
            url: `${this.gt.Ys()}/feature_flags/sync`,
            headers: h,
            data: r,
            O: (i) => {
              if (!this.gt.Zs(r, i, h))
                return (o = !0), void ("function" == typeof s && s());
              this.gt.ti(),
                this.Ts(i),
                (o = !1),
                T.si(this.u, T.Os.Si, 1),
                "function" == typeof t && t();
            },
            error: (t) => {
              this.gt.ii(t, "retrieving feature flags"),
                (o = !0),
                "function" == typeof s && s();
            },
            ei: () => {
              if (e && o && !this.bi) {
                T.hi(this.u, T.Os.Si);
                let e = this.ji;
                (null == e || e < 1e3 * this.yi) && (e = 1e3 * this.yi),
                  this.$i(Math.min(3e5, randomInclusive(1e3 * this.yi, 3 * e)), t, s, i);
              }
            },
          }))
        : "function" == typeof s && s();
    });
  }
  Ii() {
    null != this.bi && (clearTimeout(this.bi), (this.bi = null));
  }
  $i(t = 1e3 * this.yi, s, i, e = !1) {
    this.Ii(),
      (this.bi = window.setTimeout(() => {
        this.refreshFeatureFlags(s, i, e);
      }, t)),
      (this.ji = t);
  }
  zi(t) {
    if (!this.wt) return !1;
    if (!t) {
      const t = this.wt.Mi();
      if (null == t) return !1;
      let s = !1;
      if (!isNaN(t)) {
        if (-1 === t) return r$1.j.info("Feature flag refreshes not allowed"), !1;
        s = new Date().getTime() >= (this.gi || 0) + 1e3 * t;
      }
      if (!s)
        return (
          r$1.j.info(`Feature flag refreshes were rate limited to ${t} seconds`),
          !1
        );
    }
    return this.wt.vi();
  }
  Ti() {
    if (!this.u) return;
    const t = {};
    for (const s of this.pi) {
      const i = s.ss();
      t[s.id] = i;
    }
    this.u.D(STORAGE_KEYS.k.Ri, t), this.u.D(STORAGE_KEYS.k.Ui, this.gi);
  }
}

const ir = {
  t: !1,
  provider: null,
  er: () => (
    ir.o(),
    ir.provider ||
      ((ir.provider = new er(e.tr(), e.ar(), e.l())), e.dr(ir.provider)),
    ir.provider
  ),
  o: () => {
    ir.t || (e.g(ir), (ir.t = !0));
  },
  destroy: () => {
    (ir.provider = null), (ir.t = !1);
  },
};
var ir$1 = ir;

function tr(r, t, a = !1) {
  if (e.rr()) return ir$1.er().refreshFeatureFlags(r, t, a);
}
function refreshFeatureFlags(r, e) {
  tr(r, e);
}

var refreshFeatureFlags$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	refreshFeatureFlags: refreshFeatureFlags,
	'default': tr
});

function getFeatureFlag(t) {
  if (!e.rr()) return;
  const a = e.tr();
  if (a && !a.vi())
    return r$1.j.info("Feature flags are not enabled."), new FeatureFlag(t);
  const o = ir$1.er().Di();
  return o[t] ? o[t] : new FeatureFlag(t);
}

function getAllFeatureFlags() {
  if (!e.rr()) return;
  const t = [],
    a = e.tr();
  if (a && !a.vi()) return r$1.j.info("Feature flags are not enabled."), t;
  const o = ir$1.er().Di();
  for (const r in o) t.push(o[r]);
  return t;
}

function subscribeToFeatureFlagsUpdates(r) {
  if (!e.rr()) return;
  const t = getAllFeatureFlags();
  t && "function" == typeof r && r(t);
  return ir$1.er().ri(r);
}

function logFeatureFlagImpression(t) {
  if (!e.rr()) return;
  if (!t) return !1;
  const o = ir$1.er().Di();
  if (!o[t]) return !1;
  const n = o[t].trackingString;
  if (!n)
    return (
      r$1.j.info(
        "Not logging a feature flag impression. The feature flag was not part of any matching campaign.",
      ),
      !1
    );
  const a = ir$1.er().Ni();
  if (a[n]) return !1;
  (a[n] = !0), ir$1.er().xi(a);
  const i = { fid: t, fts: n };
  return s$1.N(r$1.q.Fr, i).O;
}

var src = /*#__PURE__*/Object.freeze({
	__proto__: null,
	WindowUtils: WindowUtils,
	logCardClick: logCardClick,
	logCardDismissal: logCardDismissal,
	logCardImpressions: logCardImpressions,
	logContentCardImpressions: logContentCardImpressions,
	logContentCardClick: logContentCardClick,
	Card: Card,
	Banner: Banner,
	ImageOnly: ImageOnly,
	CaptionedImage: CaptionedImage,
	ClassicCard: ClassicCard,
	ControlCard: ControlCard,
	ContentCards: ContentCards,
	getCachedContentCards: getCachedContentCards,
	hideContentCards: hideContentCards,
	logContentCardsDisplayed: logContentCardsDisplayed,
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
	logCustomEvent: logCustomEvent,
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
	Feed: Feed,
	getCachedFeed: getCachedFeed,
	destroyFeed: destroyFeed,
	logFeedDisplayed: logFeedDisplayed,
	requestFeedRefresh: requestFeedRefresh,
	showFeed: showFeed,
	subscribeToFeedUpdates: subscribeToFeedUpdates,
	toggleFeed: toggleFeed,
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
	logFeatureFlagImpression: logFeatureFlagImpression
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(src);

/* eslint-disable no-undef */

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
    suffix = 'v4',
    moduleId = 28,
    version = '4.1.3',
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
    '08': 'sdk.iad-08.braze.com',
    EU: 'sdk.fra-01.braze.eu',
    EU02: 'sdk.fra-02.braze.eu',
};

var constructor = function () {
    var self = this,
        forwarderSettings,
        options = {},
        reportingService,
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

        reportEvent = braze.logPurchase(
            eventName,
            event.ProductAction.TotalAmount,
            event.CurrencyCode,
            quantity,
            eventAttributes
        );
    }

    function logPurchaseEventPerProduct(event) {
        if (event.ProductAction.ProductList) {
            event.ProductAction.ProductList.forEach(function(product) {
                var productName;

                if (forwarderSettings.forwardSkuAsProductName === 'True') {
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

            reportEvent = logBrazeEvent(brazeEvent);
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
        if (!(key in DefaultAttributeMethods)) {
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
        } else {
            return setDefaultAttribute(key, value);
        }
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

            kitLogger('braze.changeUser', brazeUserIDType);

            braze.changeUser(brazeUserIDType);

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
        // https://www.braze.com/docs/developer_guide/platform_integration_guides/web/push_notifications/integration/#soft-push-prompts
        braze.subscribeToInAppMessage(function (inAppMessage) {
            var shouldDisplay = true;
            var pushPrimer = false;
            if (inAppMessage instanceof braze.InAppMessage) {
                // Read the key-value pair for msg-id
                var msgId = inAppMessage.extras['msg-id'];

                // If this is our push primer message
                if (msgId == 'push-primer') {
                    pushPrimer = true;
                    // We don't want to display the soft push prompt to users on browsers that don't support push, or if the user
                    // has already granted/blocked permission
                    if (
                        !braze.isPushSupported() ||
                        braze.isPushPermissionGranted() ||
                        braze.isPushBlocked()
                    ) {
                        shouldDisplay = false;
                    }
                    if (inAppMessage.buttons[0] != null) {
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
            reportingService = service;
            // 30 min is Braze default
            options.sessionTimeoutInSeconds =
                forwarderSettings.ABKSessionTimeoutKey || 1800;
            options.sdkFlavor = 'mparticle';
            options.enableHtmlInAppMessages =
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

        if (forwarderSettings.userIdentificationType === 'MPID' && mParticle.Identity != null && mParticle.Identity.getCurrentUser().getMPID() != null) {
            onUserIdentified(mParticle.Identity.getCurrentUser());
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

var BrazeKitDev = {
    register: register,
    getVersion: function () {
        return version;
    },
};

exports["default"] = BrazeKitDev;
