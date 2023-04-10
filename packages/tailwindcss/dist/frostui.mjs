var Bt = Object.defineProperty;
var Wt = (e, i, t) => i in e ? Bt(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var d = (e, i, t) => (Wt(e, typeof i != "symbol" ? i + "" : i, t), t);
const z = /* @__PURE__ */ new Map(), ht = {
  set(e, i, t) {
    z.has(e) || z.set(e, /* @__PURE__ */ new Map()), z.get(e).set(i, t);
  },
  get(e, i) {
    var t;
    return ((t = z.get(e)) == null ? void 0 : t.get(i)) || null;
  },
  remove(e, i) {
    var t;
    return ((t = z.get(e)) == null ? void 0 : t.delete(i)) || !0;
  }
}, q = /* @__PURE__ */ new Map(), dt = {
  addListener(e, i, t) {
    q.has(e) || q.set(e, /* @__PURE__ */ new Map());
    const n = q.get(e);
    let s = n.get(i);
    s == null && (s = []), s.push(t), n.set(i, s);
  },
  removeListener(e, i, t) {
    if (!q.has(e))
      return;
    const n = q.get(e);
    let s = n.get(i);
    s != null && (s = s.filter((l) => l != t), n.set(i, s));
  },
  getCallbacks(e, i) {
    var t;
    return ((t = q.get(e)) == null ? void 0 : t.get(i)) ?? [];
  }
}, E = {
  findAll(e) {
    return Array.from(document.querySelectorAll(e));
  },
  findAllInElement(e, i) {
    return Array.from(e.querySelectorAll(i));
  },
  findOnlyChildrenInElement(e, i) {
    return Array.from(e.querySelectorAll(":scope > " + i));
  },
  find(e) {
    return document.querySelector(e);
  },
  findById(e) {
    return document.getElementById(e);
  },
  findOrById(e) {
    return e.length != 0 && e.charAt(0) == "#" ? document.querySelector(e) : document.getElementById(e);
  },
  nextElementSibling(e) {
    return e.nextElementSibling instanceof HTMLElement ? e.nextElementSibling : null;
  },
  getSiblingElement(e) {
    return e.nextElementSibling;
  },
  addOverlay(e) {
    const i = document.createElement("div");
    return i.classList.add(...e), i.classList.add("hidden"), i.setAttribute("data-fc-overlay-backdrop", ""), document.body.appendChild(i), i;
  },
  showOverlay() {
    var e;
    (e = this.getOverlay()) == null || e.classList.remove("hidden");
  },
  hideOverlay() {
    var e;
    (e = this.getOverlay()) == null || e.classList.add("hidden");
  },
  getOverlay() {
    return document.querySelector('[data-fc-overlay-backdrop=""]');
  },
  isElementSameOrContains(e, i) {
    return e.contains(i) || e == i;
  },
  isElementContains(e, i) {
    return e.contains(i) && e != i;
  }
};
class $ {
  constructor(i, t) {
    d(this, "_element");
    d(this, "_destroyed", !1);
    d(this, "_config", {});
    typeof i == "string" ? this._element = E.findOrById(i) : this._element = i, this._config = t ?? {}, this._element != null && ht.set(this.constructor.type, this._element, this);
  }
  get config() {
    return this._config ?? {};
  }
  static getInstance(i) {
    return i == null ? null : ht.get(this.type, i);
  }
  static getInstanceOrCreate(i, t) {
    if (i == null)
      return null;
    const n = this.getInstance(i);
    return n ?? new this(i, t);
  }
  addEventListener(i, t) {
    dt.addListener(this, i, t);
  }
  removeEventListener(i, t) {
    dt.removeListener(this, i, t);
  }
  dispatchEvent(i) {
    dt.getCallbacks(this, i).forEach((t) => t());
  }
  destroy() {
    this._destroyed = !0, this._element != null && ht.remove(this.constructor.type, this._element);
  }
}
d($, "type", "");
const et = {
  addAfterEvent(e, i, t) {
    const n = (s) => {
      i(s), e.removeEventListener(t, n, !0);
    };
    e.addEventListener(t, n, !0);
  },
  afterTransition(e, i) {
    window.getComputedStyle(e, null).getPropertyValue("transition-duration") !== "0s" ? this.addAfterEvent(e, i, "transitionend") : i();
  },
  isMouseEventWithinElement(e, i) {
    const t = {
      x: i.pageX,
      y: i.pageY
    }, n = e.getBoundingClientRect();
    return t.x < n.right && t.x > n.left && t.y < n.bottom && t.y > n.top;
  },
  listenOverlayClick(e) {
    var i;
    (i = E.getOverlay()) == null || i.addEventListener("click", e);
  }
}, _ = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    this.init();
  }
  init() {
    this._element != null && (this._element.classList.add(_.DEFAULT.class.base), this._targetElement = this.getTargetElement()), this.initOptions(), this.initListener();
  }
  initOptions() {
    this._targetElement != null && !this._targetElement.classList.contains(_.DEFAULT.class.hidden) && this._element.classList.add(_.DEFAULT.class.open), this.config.toggle && this.toggle();
  }
  initListener() {
    this._element.addEventListener("click", (t) => {
      this.toggle();
    });
  }
  get isShown() {
    var t;
    return ((t = this._element) == null ? void 0 : t.classList.contains(_.DEFAULT.class.open)) ?? !1;
  }
  show() {
    this._destroyed || (this.dispatchEvent(_.EVENTS.show), this._targetElement != null && this._element != null && (this._element.classList.add(_.DEFAULT.class.open), this._targetElement.classList.remove(_.DEFAULT.class.hidden), this._targetElement.style.height = "0px", this._targetElement.style.height = `${this._targetElement.scrollHeight}px`, et.afterTransition(this._targetElement, () => {
      this.isShown && (this._targetElement.style.height = "");
    })), this.dispatchEvent(_.EVENTS.shown));
  }
  hide() {
    this._destroyed || (this.dispatchEvent(_.EVENTS.hide), this._targetElement != null && this._element != null && (this._element.classList.remove(_.DEFAULT.class.open), this._targetElement.style.height = `${this._targetElement.scrollHeight}px`, et.afterTransition(this._targetElement, () => {
      this.isShown || (this._targetElement.classList.add(_.DEFAULT.class.hidden), this._targetElement.style.height = "");
    }), setTimeout(() => {
      this._targetElement.style.height = "0px";
    })), this.dispatchEvent(_.EVENTS.hidden));
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(_.DEFAULT.attr.target);
    return typeof t == "string" ? E.findOrById(t) : t instanceof HTMLElement ? t : E.nextElementSibling(this._element);
  }
};
let S = _;
d(S, "type", "collapse"), d(S, "SELECTOR", '[data-fc-type="collapse"]'), d(S, "EVENTS", {
  show: "fc.collapse.show",
  shown: "fc.collapse.shown",
  hide: "fc.collapse.hide",
  hidden: "fc.collapse.hidden"
}), d(S, "DEFAULT", {
  class: {
    base: "fc-collapse",
    hidden: "hidden",
    open: "open"
  },
  attr: {
    target: "data-fc-target"
  }
});
const st = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "targetCollapses", []);
    this.init();
  }
  init() {
    if (this._element != null) {
      const t = E.findAllInElement(this._element, S.SELECTOR);
      let n = !1;
      for (let s of t)
        if (s.hasAttribute(st.DEFAULT.attr.parent)) {
          n = !0;
          break;
        }
      if (!n)
        this.targetCollapses = t.map((s) => S.getInstanceOrCreate(s));
      else {
        const s = this._element.id;
        this.targetCollapses = t.filter((l) => l.getAttribute(st.DEFAULT.attr.parent) == s).map((l) => S.getInstanceOrCreate(l));
      }
      this.initListeners();
    }
  }
  initListeners() {
    this.targetCollapses.forEach((t) => {
      t.addEventListener(S.EVENTS.show, () => {
        this._destroyed || this.targetCollapses.filter((n) => n != t).forEach((n) => n.hide());
      });
    });
  }
};
let B = st;
d(B, "type", "accordion"), d(B, "SELECTOR", '[data-fc-type="accordion"]'), d(B, "DEFAULT", {
  attr: {
    parent: "data-fc-parent"
  }
});
function ut(e) {
  return e.split("-")[1];
}
function At(e) {
  return e === "y" ? "height" : "width";
}
function lt(e) {
  return e.split("-")[0];
}
function rt(e) {
  return ["top", "bottom"].includes(lt(e)) ? "x" : "y";
}
function Lt(e, i, t) {
  let { reference: n, floating: s } = e;
  const l = n.x + n.width / 2 - s.width / 2, r = n.y + n.height / 2 - s.height / 2, a = rt(i), h = At(a), c = n[h] / 2 - s[h] / 2, f = a === "x";
  let o;
  switch (lt(i)) {
    case "top":
      o = { x: l, y: n.y - s.height };
      break;
    case "bottom":
      o = { x: l, y: n.y + n.height };
      break;
    case "right":
      o = { x: n.x + n.width, y: r };
      break;
    case "left":
      o = { x: n.x - s.width, y: r };
      break;
    default:
      o = { x: n.x, y: n.y };
  }
  switch (ut(i)) {
    case "start":
      o[a] -= c * (t && f ? -1 : 1);
      break;
    case "end":
      o[a] += c * (t && f ? -1 : 1);
  }
  return o;
}
const It = async (e, i, t) => {
  const { placement: n = "bottom", strategy: s = "absolute", middleware: l = [], platform: r } = t, a = l.filter(Boolean), h = await (r.isRTL == null ? void 0 : r.isRTL(i));
  let c = await r.getElementRects({ reference: e, floating: i, strategy: s }), { x: f, y: o } = Lt(c, n, h), g = n, m = {}, p = 0;
  for (let u = 0; u < a.length; u++) {
    const { name: y, fn: w } = a[u], { x: v, y: x, data: F, reset: k } = await w({ x: f, y: o, initialPlacement: n, placement: g, strategy: s, middlewareData: m, rects: c, platform: r, elements: { reference: e, floating: i } });
    f = v ?? f, o = x ?? o, m = { ...m, [y]: { ...m[y], ...F } }, k && p <= 50 && (p++, typeof k == "object" && (k.placement && (g = k.placement), k.rects && (c = k.rects === !0 ? await r.getElementRects({ reference: e, floating: i, strategy: s }) : k.rects), { x: f, y: o } = Lt(c, g, h)), u = -1);
  }
  return { x: f, y: o, placement: g, strategy: s, middlewareData: m };
};
function _t(e) {
  return typeof e != "number" ? function(i) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...i };
  }(e) : { top: e, right: e, bottom: e, left: e };
}
function it(e) {
  return { ...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
}
async function Mt(e, i) {
  var t;
  i === void 0 && (i = {});
  const { x: n, y: s, platform: l, rects: r, elements: a, strategy: h } = e, { boundary: c = "clippingAncestors", rootBoundary: f = "viewport", elementContext: o = "floating", altBoundary: g = !1, padding: m = 0 } = i, p = _t(m), u = a[g ? o === "floating" ? "reference" : "floating" : o], y = it(await l.getClippingRect({ element: (t = await (l.isElement == null ? void 0 : l.isElement(u))) == null || t ? u : u.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(a.floating)), boundary: c, rootBoundary: f, strategy: h })), w = o === "floating" ? { ...r.floating, x: n, y: s } : r.reference, v = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(a.floating)), x = await (l.isElement == null ? void 0 : l.isElement(v)) && await (l.getScale == null ? void 0 : l.getScale(v)) || { x: 1, y: 1 }, F = it(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: w, offsetParent: v, strategy: h }) : w);
  return { top: (y.top - F.top + p.top) / x.y, bottom: (F.bottom - y.bottom + p.bottom) / x.y, left: (y.left - F.left + p.left) / x.x, right: (F.right - y.right + p.right) / x.x };
}
const Pt = Math.min, jt = Math.max;
function ft(e, i, t) {
  return jt(e, Pt(i, t));
}
const qt = (e) => ({ name: "arrow", options: e, async fn(i) {
  const { element: t, padding: n = 0 } = e || {}, { x: s, y: l, placement: r, rects: a, platform: h, elements: c } = i;
  if (t == null)
    return {};
  const f = _t(n), o = { x: s, y: l }, g = rt(r), m = At(g), p = await h.getDimensions(t), u = g === "y", y = u ? "top" : "left", w = u ? "bottom" : "right", v = u ? "clientHeight" : "clientWidth", x = a.reference[m] + a.reference[g] - o[g] - a.floating[m], F = o[g] - a.reference[g], k = await (h.getOffsetParent == null ? void 0 : h.getOffsetParent(t));
  let Q = k ? k[v] : 0;
  Q && await (h.isElement == null ? void 0 : h.isElement(k)) || (Q = c.floating[v] || a.floating[m]);
  const Ht = x / 2 - F / 2, Z = f[y], yt = Q - p[m] - f[w], j = Q / 2 - p[m] / 2 + Ht, ct = ft(Z, j, yt), $t = ut(r) != null && j != ct && a.reference[m] / 2 - (j < Z ? f[y] : f[w]) - p[m] / 2 < 0;
  return { [g]: o[g] - ($t ? j < Z ? Z - j : yt - j : 0), data: { [g]: ct, centerOffset: j - ct } };
} }), Xt = ["top", "right", "bottom", "left"];
Xt.reduce((e, i) => e.concat(i, i + "-start", i + "-end"), []);
const Yt = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(i) {
    const { x: t, y: n } = i, s = await async function(l, r) {
      const { placement: a, platform: h, elements: c } = l, f = await (h.isRTL == null ? void 0 : h.isRTL(c.floating)), o = lt(a), g = ut(a), m = rt(a) === "x", p = ["left", "top"].includes(o) ? -1 : 1, u = f && m ? -1 : 1, y = typeof r == "function" ? r(l) : r;
      let { mainAxis: w, crossAxis: v, alignmentAxis: x } = typeof y == "number" ? { mainAxis: y, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...y };
      return g && typeof x == "number" && (v = g === "end" ? -1 * x : x), m ? { x: v * u, y: w * p } : { x: w * p, y: v * u };
    }(i, e);
    return { x: t + s.x, y: n + s.y, data: s };
  } };
};
function zt(e) {
  return e === "x" ? "y" : "x";
}
const Gt = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(i) {
    const { x: t, y: n, placement: s } = i, { mainAxis: l = !0, crossAxis: r = !1, limiter: a = { fn: (y) => {
      let { x: w, y: v } = y;
      return { x: w, y: v };
    } }, ...h } = e, c = { x: t, y: n }, f = await Mt(i, h), o = rt(lt(s)), g = zt(o);
    let m = c[o], p = c[g];
    if (l) {
      const y = o === "y" ? "bottom" : "right";
      m = ft(m + f[o === "y" ? "top" : "left"], m, m - f[y]);
    }
    if (r) {
      const y = g === "y" ? "bottom" : "right";
      p = ft(p + f[g === "y" ? "top" : "left"], p, p - f[y]);
    }
    const u = a.fn({ ...i, [o]: m, [g]: p });
    return { ...u, data: { x: u.x - t, y: u.y - n } };
  } };
};
function D(e) {
  var i;
  return ((i = e.ownerDocument) == null ? void 0 : i.defaultView) || window;
}
function O(e) {
  return D(e).getComputedStyle(e);
}
function St(e) {
  return e instanceof D(e).Node;
}
function P(e) {
  return St(e) ? (e.nodeName || "").toLowerCase() : "";
}
let tt;
function Dt() {
  if (tt)
    return tt;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (tt = e.brands.map((i) => i.brand + "/" + i.version).join(" "), tt) : navigator.userAgent;
}
function U(e) {
  return e instanceof D(e).HTMLElement;
}
function I(e) {
  return e instanceof D(e).Element;
}
function wt(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof D(e).ShadowRoot || e instanceof ShadowRoot;
}
function at(e) {
  const { overflow: i, overflowX: t, overflowY: n, display: s } = O(e);
  return /auto|scroll|overlay|hidden|clip/.test(i + n + t) && !["inline", "contents"].includes(s);
}
function Jt(e) {
  return ["table", "td", "th"].includes(P(e));
}
function gt(e) {
  const i = /firefox/i.test(Dt()), t = O(e), n = t.backdropFilter || t.WebkitBackdropFilter;
  return t.transform !== "none" || t.perspective !== "none" || !!n && n !== "none" || i && t.willChange === "filter" || i && !!t.filter && t.filter !== "none" || ["transform", "perspective"].some((s) => t.willChange.includes(s)) || ["paint", "layout", "strict", "content"].some((s) => {
    const l = t.contain;
    return l != null && l.includes(s);
  });
}
function mt() {
  return /^((?!chrome|android).)*safari/i.test(Dt());
}
function Et(e) {
  return ["html", "body", "#document"].includes(P(e));
}
const vt = Math.min, G = Math.max, nt = Math.round;
function Ft(e) {
  const i = O(e);
  let t = parseFloat(i.width), n = parseFloat(i.height);
  const s = U(e), l = s ? e.offsetWidth : t, r = s ? e.offsetHeight : n, a = nt(t) !== l || nt(n) !== r;
  return a && (t = l, n = r), { width: t, height: n, fallback: a };
}
function kt(e) {
  return I(e) ? e : e.contextElement;
}
const Ut = { x: 1, y: 1 };
function Y(e) {
  const i = kt(e);
  if (!U(i))
    return Ut;
  const t = i.getBoundingClientRect(), { width: n, height: s, fallback: l } = Ft(i);
  let r = (l ? nt(t.width) : t.width) / n, a = (l ? nt(t.height) : t.height) / s;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function J(e, i, t, n) {
  var s, l;
  i === void 0 && (i = !1), t === void 0 && (t = !1);
  const r = e.getBoundingClientRect(), a = kt(e);
  let h = Ut;
  i && (n ? I(n) && (h = Y(n)) : h = Y(e));
  const c = a ? D(a) : window, f = mt() && t;
  let o = (r.left + (f && ((s = c.visualViewport) == null ? void 0 : s.offsetLeft) || 0)) / h.x, g = (r.top + (f && ((l = c.visualViewport) == null ? void 0 : l.offsetTop) || 0)) / h.y, m = r.width / h.x, p = r.height / h.y;
  if (a) {
    const u = D(a), y = n && I(n) ? D(n) : n;
    let w = u.frameElement;
    for (; w && n && y !== u; ) {
      const v = Y(w), x = w.getBoundingClientRect(), F = getComputedStyle(w);
      x.x += (w.clientLeft + parseFloat(F.paddingLeft)) * v.x, x.y += (w.clientTop + parseFloat(F.paddingTop)) * v.y, o *= v.x, g *= v.y, m *= v.x, p *= v.y, o += x.x, g += x.y, w = D(w).frameElement;
    }
  }
  return it({ width: m, height: p, x: o, y: g });
}
function M(e) {
  return ((St(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function ot(e) {
  return I(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Ot(e) {
  return J(M(e)).left + ot(e).scrollLeft;
}
function K(e) {
  if (P(e) === "html")
    return e;
  const i = e.assignedSlot || e.parentNode || wt(e) && e.host || M(e);
  return wt(i) ? i.host : i;
}
function Ct(e) {
  const i = K(e);
  return Et(i) ? i.ownerDocument.body : U(i) && at(i) ? i : Ct(i);
}
function Rt(e, i) {
  var t;
  i === void 0 && (i = []);
  const n = Ct(e), s = n === ((t = e.ownerDocument) == null ? void 0 : t.body), l = D(n);
  return s ? i.concat(l, l.visualViewport || [], at(n) ? n : []) : i.concat(n, Rt(n));
}
function Tt(e, i, t) {
  let n;
  if (i === "viewport")
    n = function(r, a) {
      const h = D(r), c = M(r), f = h.visualViewport;
      let o = c.clientWidth, g = c.clientHeight, m = 0, p = 0;
      if (f) {
        o = f.width, g = f.height;
        const u = mt();
        (!u || u && a === "fixed") && (m = f.offsetLeft, p = f.offsetTop);
      }
      return { width: o, height: g, x: m, y: p };
    }(e, t);
  else if (i === "document")
    n = function(r) {
      const a = M(r), h = ot(r), c = r.ownerDocument.body, f = G(a.scrollWidth, a.clientWidth, c.scrollWidth, c.clientWidth), o = G(a.scrollHeight, a.clientHeight, c.scrollHeight, c.clientHeight);
      let g = -h.scrollLeft + Ot(r);
      const m = -h.scrollTop;
      return O(c).direction === "rtl" && (g += G(a.clientWidth, c.clientWidth) - f), { width: f, height: o, x: g, y: m };
    }(M(e));
  else if (I(i))
    n = function(r, a) {
      const h = J(r, !0, a === "fixed"), c = h.top + r.clientTop, f = h.left + r.clientLeft, o = U(r) ? Y(r) : { x: 1, y: 1 };
      return { width: r.clientWidth * o.x, height: r.clientHeight * o.y, x: f * o.x, y: c * o.y };
    }(i, t);
  else {
    const r = { ...i };
    if (mt()) {
      var s, l;
      const a = D(e);
      r.x -= ((s = a.visualViewport) == null ? void 0 : s.offsetLeft) || 0, r.y -= ((l = a.visualViewport) == null ? void 0 : l.offsetTop) || 0;
    }
    n = r;
  }
  return it(n);
}
function bt(e, i) {
  return U(e) && O(e).position !== "fixed" ? i ? i(e) : e.offsetParent : null;
}
function xt(e, i) {
  const t = D(e);
  if (!U(e))
    return t;
  let n = bt(e, i);
  for (; n && Jt(n) && O(n).position === "static"; )
    n = bt(n, i);
  return n && (P(n) === "html" || P(n) === "body" && O(n).position === "static" && !gt(n)) ? t : n || function(s) {
    let l = K(s);
    for (; U(l) && !Et(l); ) {
      if (gt(l))
        return l;
      l = K(l);
    }
    return null;
  }(e) || t;
}
function Kt(e, i, t) {
  const n = U(i), s = M(i), l = J(e, !0, t === "fixed", i);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || !n && t !== "fixed")
    if ((P(i) !== "body" || at(s)) && (r = ot(i)), U(i)) {
      const h = J(i, !0);
      a.x = h.x + i.clientLeft, a.y = h.y + i.clientTop;
    } else
      s && (a.x = Ot(s));
  return { x: l.left + r.scrollLeft - a.x, y: l.top + r.scrollTop - a.y, width: l.width, height: l.height };
}
const Qt = { getClippingRect: function(e) {
  let { element: i, boundary: t, rootBoundary: n, strategy: s } = e;
  const l = t === "clippingAncestors" ? function(c, f) {
    const o = f.get(c);
    if (o)
      return o;
    let g = Rt(c).filter((y) => I(y) && P(y) !== "body"), m = null;
    const p = O(c).position === "fixed";
    let u = p ? K(c) : c;
    for (; I(u) && !Et(u); ) {
      const y = O(u), w = gt(u);
      y.position === "fixed" ? m = null : (p ? w || m : w || y.position !== "static" || !m || !["absolute", "fixed"].includes(m.position)) ? m = y : g = g.filter((v) => v !== u), u = K(u);
    }
    return f.set(c, g), g;
  }(i, this._c) : [].concat(t), r = [...l, n], a = r[0], h = r.reduce((c, f) => {
    const o = Tt(i, f, s);
    return c.top = G(o.top, c.top), c.right = vt(o.right, c.right), c.bottom = vt(o.bottom, c.bottom), c.left = G(o.left, c.left), c;
  }, Tt(i, a, s));
  return { width: h.right - h.left, height: h.bottom - h.top, x: h.left, y: h.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: i, offsetParent: t, strategy: n } = e;
  const s = U(t), l = M(t);
  if (t === l)
    return i;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const h = { x: 0, y: 0 };
  if ((s || !s && n !== "fixed") && ((P(t) !== "body" || at(l)) && (r = ot(t)), U(t))) {
    const c = J(t);
    a = Y(t), h.x = c.x + t.clientLeft, h.y = c.y + t.clientTop;
  }
  return { width: i.width * a.x, height: i.height * a.y, x: i.x * a.x - r.scrollLeft * a.x + h.x, y: i.y * a.y - r.scrollTop * a.y + h.y };
}, isElement: I, getDimensions: function(e) {
  return Ft(e);
}, getOffsetParent: xt, getDocumentElement: M, getScale: Y, async getElementRects(e) {
  let { reference: i, floating: t, strategy: n } = e;
  const s = this.getOffsetParent || xt, l = this.getDimensions;
  return { reference: Kt(i, await s(t), n), floating: { x: 0, y: 0, ...await l(t) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => O(e).direction === "rtl" }, Vt = (e, i, t) => {
  const n = /* @__PURE__ */ new Map(), s = { platform: Qt, ...t }, l = { ...s.platform, _c: n };
  return It(e, i, { ...s, platform: l });
}, A = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    d(this, "clicked", !1);
    d(this, "keyListener", (t) => {
      t.key == "Escape" && this.hide();
    });
    this.init();
  }
  get isShown() {
    var t;
    return ((t = this._targetElement) == null ? void 0 : t.classList.contains(A.DEFAULT.class.hidden)) === !1;
  }
  get isHover() {
    return this.config.trigger === "hover";
  }
  init() {
    this._element != null && (this._targetElement = this.getTargetElement(), this.initOptions(), this.initListener());
  }
  initOptions() {
    var t, n, s, l, r, a;
    (t = this._targetElement) == null || t.classList.add(A.DEFAULT.class.base), (s = this.config).placement ?? (s.placement = ((n = this._element) == null ? void 0 : n.getAttribute(A.DEFAULT.attr.placement)) ?? "bottom-start"), (r = this.config).trigger ?? (r.trigger = ((l = this._element) == null ? void 0 : l.getAttribute(A.DEFAULT.attr.trigger)) == "hover" ? "hover" : "click"), ((a = this._targetElement) == null ? void 0 : a.classList.contains(A.DEFAULT.class.hidden)) === !1 && this.show();
  }
  initListener() {
    var t, n;
    (t = this._element) == null || t.addEventListener("click", () => {
      this._destroyed || (this.isHover ? (this.clicked ? this.hide() : this.show(), this.clicked = !this.clicked) : this.toggle());
    }), this.isHover && ((n = this._element) == null || n.addEventListener("mouseover", () => {
      this.show();
    }), window.addEventListener("mousemove", (s) => {
      this._destroyed || this._targetElement != null && this._element != null && s.target instanceof HTMLElement && !this.clicked && !E.isElementSameOrContains(this._targetElement, s.target) && !E.isElementSameOrContains(this._element, s.target) && this.hide();
    })), window.addEventListener("click", (s) => {
      this._destroyed || this._targetElement != null && this._element != null && s.target instanceof HTMLElement && !E.isElementSameOrContains(this._targetElement, s.target) && !E.isElementSameOrContains(this._element, s.target) && this.hide();
    });
  }
  show() {
    this.dispatchEvent(A.EVENTS.show), this.addComputePositionInTargetElement(), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(A.DEFAULT.class.hidden), setTimeout(() => {
      this._element.classList.add(A.DEFAULT.class.open), this._targetElement.classList.add(A.DEFAULT.class.open);
    }, 1)), window.addEventListener("keydown", this.keyListener), this.dispatchEvent(A.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(A.EVENTS.hide), this.clicked = !1, this._targetElement != null && ((t = this._element) == null || t.classList.remove(A.DEFAULT.class.open), this._targetElement.classList.remove(A.DEFAULT.class.open), this._targetElement.classList.add(A.DEFAULT.class.hidden)), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(A.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  addComputePositionInTargetElement() {
    this._element != null && this._targetElement != null && (this._targetElement.classList.add("absolute"), Vt(this._element, this._targetElement, {
      placement: this.config.placement
    }).then(({ x: t, y: n }) => {
      this._targetElement != null && Object.assign(this._targetElement.style, {
        left: `${t}px`,
        top: `${n}px`
      });
    }));
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this._element.getAttribute(A.DEFAULT.attr.target), n = this.config.target ?? t;
    return typeof n == "string" ? E.findOrById(n) : n instanceof HTMLElement ? n : E.nextElementSibling(this._element);
  }
};
let C = A;
d(C, "type", "dropdown"), d(C, "SELECTOR", '[data-fc-type="dropdown"]'), d(C, "EVENTS", {
  show: "fc.dropdown.show",
  shown: "fc.dropdown.shown",
  hide: "fc.dropdown.hide",
  hidden: "fc.dropdown.hidden"
}), d(C, "DEFAULT", {
  class: {
    base: "fc-dropdown",
    hidden: "hidden",
    open: "open"
  },
  attr: {
    target: "data-fc-target",
    placement: "data-fc-placement",
    trigger: "data-fc-trigger"
  }
});
const pt = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "_elements", /* @__PURE__ */ new Map());
    this.init();
  }
  init() {
    if (this._element != null) {
      const t = /* @__PURE__ */ new Map(), n = this._element.querySelectorAll("[data-fc-target]");
      for (const s of n) {
        const l = s.getAttribute(pt.DEFAULT.attr.target);
        if (l != null) {
          const r = E.findOrById(l);
          r != null && t.set(s, r);
        }
      }
      this._elements = t, this.initListener();
    }
  }
  initListener() {
    for (const t of this._elements.keys())
      t.addEventListener("click", () => {
        this.showTab(t);
      });
  }
  showTab(t) {
    for (const n of this._elements.keys()) {
      const s = this._elements.get(n);
      t == n ? (s.classList.remove("hidden"), setTimeout(() => {
        n.classList.add("active"), s.classList.add("active");
      })) : (n.classList.remove("active"), s.classList.remove("active"), setTimeout(() => {
        s.classList.add("hidden");
      }));
    }
  }
};
let W = pt;
d(W, "type", "tab"), d(W, "SELECTOR", '[data-fc-type="tab"]'), d(W, "DEFAULT", {
  attr: {
    target: "data-fc-target"
  }
});
const T = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    d(this, "_windowClickListen", !1);
    d(this, "keyListener", (t) => {
      t.key == "Escape" && !this.isStatic && this.hide();
    });
    d(this, "onWindowClicked", (t) => {
      !this.isStatic && t.target instanceof HTMLElement && this._targetElement && this.isShown && (E.isElementContains(this._targetElement, t.target) || this.hide());
    });
    this.init();
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(T.DEFAULT.class.hidden));
  }
  get isStatic() {
    return this.config.behavior === "static";
  }
  init() {
    var t;
    this._element != null && (this._targetElement = this.getTargetElement(), (t = this._targetElement) == null || t.classList.add(T.DEFAULT.class.base), this.initOptions(), this.initListener());
  }
  initOptions() {
    var n;
    let t = (n = this._element) == null ? void 0 : n.getAttribute(T.DEFAULT.attr.behavior);
    t ? this.config.behavior = t == "static" ? "static" : "default" : this.config.behavior == null && (this.config.behavior = "default");
  }
  initListener() {
    var t;
    this._element != null && (this._element.addEventListener("click", (n) => {
      this.toggle();
    }), (t = this._targetElement) == null || t.querySelectorAll(`[${T.DEFAULT.attr.dismiss}]`).forEach((n) => {
      n.addEventListener("click", () => {
        this.hide();
      });
    }));
  }
  show() {
    if (this.dispatchEvent(T.EVENTS.show), this._targetElement != null && this._element != null) {
      const t = document.documentElement.clientWidth;
      document.body.style.paddingRight = Math.abs(window.innerWidth - t) + "px", document.body.classList.add(T.DEFAULT.class.overflowHidden), this._element.classList.add(T.DEFAULT.class.open), this._targetElement.classList.remove(T.DEFAULT.class.hidden), setTimeout(() => {
        this._targetElement.classList.add(T.DEFAULT.class.open), E.showOverlay(), this._windowClickListen || (window.addEventListener("click", this.onWindowClicked), this._windowClickListen = !0);
      }, 1);
    }
    window.addEventListener("keydown", this.keyListener), this.dispatchEvent(T.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(T.EVENTS.hide), this._targetElement != null && this.isShown && (document.body.classList.remove(T.DEFAULT.class.overflowHidden), (t = this._element) == null || t.classList.remove(T.DEFAULT.class.open), this._targetElement.classList.remove(T.DEFAULT.class.open), Object.assign(document.body.style, {
      paddingRight: null
    }), setTimeout(() => {
      window.removeEventListener("click", this.onWindowClicked), this._windowClickListen = !1, E.hideOverlay(), this._targetElement.classList.add(T.DEFAULT.class.hidden);
    }, 1)), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(T.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(T.DEFAULT.attr.target);
    return typeof t == "string" ? E.findOrById(t) : t instanceof HTMLElement ? t : E.nextElementSibling(this._element);
  }
};
let R = T;
d(R, "type", "modal"), d(R, "SELECTOR", '[data-fc-type="modal"]'), d(R, "EVENTS", {
  show: "fc.modal.show",
  shown: "fc.modal.shown",
  hide: "fc.modal.hide",
  hidden: "fc.modal.hidden"
}), d(R, "DEFAULT", {
  class: {
    base: "fc-modal",
    hidden: "hidden",
    open: "open",
    overflowHidden: "overflow-hidden"
  },
  attr: {
    target: "data-fc-target",
    dismiss: "data-fc-dismiss",
    behavior: "data-fc-behavior"
  }
});
const L = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    d(this, "_arrowElement", null);
    d(this, "_targetOffset", 8);
    this.init();
  }
  init() {
    const t = this._element.getAttribute(L.DEFAULT.attr.target);
    t ? this._targetElement = E.findOrById(t) : this._targetElement = E.nextElementSibling(this._element), this._targetElement && (this._arrowElement = this._targetElement.querySelector(`[${L.DEFAULT.attr.arrow}]`)), this.initOptions(), this.initListener();
  }
  initOptions() {
    var t, n, s, l, r;
    if ((t = this._element) != null && t.hasAttribute(L.DEFAULT.attr.placement) && (this.config.placement = (n = this._element) == null ? void 0 : n.getAttribute(L.DEFAULT.attr.placement)), (s = this._element) != null && s.hasAttribute(L.DEFAULT.attr.trigger) && (this.config.trigger = ((l = this._element) == null ? void 0 : l.getAttribute(L.DEFAULT.attr.trigger)) === "click" ? "click" : "hover"), (r = this._element) != null && r.hasAttribute(L.DEFAULT.attr.offset)) {
      const a = this._element.getAttribute(L.DEFAULT.attr.offset);
      isNaN(parseInt(a)) || (this._targetOffset = parseInt(a));
    }
  }
  initListener() {
    this._element != null && (this.isClickTrigger ? this._element.addEventListener("click", () => {
      this.toggle();
    }) : (this._element.addEventListener("mouseenter", () => {
      this.show();
    }), this._element.addEventListener("mouseleave", () => {
      this.hide();
    })));
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(L.DEFAULT.class.hidden));
  }
  get isClickTrigger() {
    return this.config.trigger === "click";
  }
  show() {
    this.computeTooltipPosition(), this.dispatchEvent(L.EVENTS.show), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(L.DEFAULT.class.hidden), this._targetElement.classList.remove(L.DEFAULT.class.opacity0), setTimeout(() => {
      this._element.classList.add(L.DEFAULT.class.open), this._targetElement.classList.add(L.DEFAULT.class.open), this._targetElement.classList.add(L.DEFAULT.class.opacity100);
    }, 1)), this.dispatchEvent(L.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(L.EVENTS.hide), this._targetElement != null && ((t = this._element) == null || t.classList.remove(L.DEFAULT.class.open), this._targetElement.classList.add(L.DEFAULT.class.opacity0), this._targetElement.classList.remove(L.DEFAULT.class.opacity100), this._targetElement.classList.add(L.DEFAULT.class.hidden)), this.dispatchEvent(L.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  computeTooltipPosition() {
    const t = [Yt(this._targetOffset), Gt({ padding: 2 })];
    this._arrowElement && t.push(qt({ element: this._arrowElement })), this._element != null && this._targetElement != null && (this._targetElement.classList.add(L.DEFAULT.class.absolute), this._arrowElement && this._arrowElement.classList.add(L.DEFAULT.class.absolute), Vt(this._element, this._targetElement, {
      placement: this.config.placement,
      middleware: t
    }).then(({ x: n, y: s, middlewareData: l }) => {
      var r, a, h, c;
      if (Object.assign(this._targetElement.style, {
        left: `${n}px`,
        top: `${s}px`
      }), l.arrow && this._arrowElement) {
        const { x: f, y: o } = l.arrow, g = f != null ? `${f}px` : `${-this._arrowElement.offsetWidth / 2}px`, m = o != null ? `${o}px` : `${-this._arrowElement.offsetHeight / 2}px`, p = {
          left: (r = this.config.placement) != null && r.includes("left") ? null : g,
          top: (a = this.config.placement) != null && a.includes("top") ? null : m,
          right: (h = this.config.placement) != null && h.includes("left") ? g : null,
          bottom: (c = this.config.placement) != null && c.includes("top") ? m : null
        };
        Object.assign(this._arrowElement.style, p);
      }
    }));
  }
};
let V = L;
d(V, "type", "tooltip"), d(V, "SELECTOR", '[data-fc-type="tooltip"]'), d(V, "EVENTS", {
  show: "fc.tooltip.show",
  shown: "fc.tooltip.shown",
  hide: "fc.tooltip.hide",
  hidden: "fc.tooltip.hidden"
}), d(V, "DEFAULT", {
  class: {
    base: "fc-collapse",
    hidden: "hidden",
    open: "open",
    opacity0: "opacity-0",
    opacity100: "opacity-100",
    absolute: "absolute"
  },
  attr: {
    target: "data-fc-target",
    placement: "data-fc-placement",
    trigger: "data-fc-trigger",
    arrow: "data-fc-arrow",
    offset: "data-fc-offset"
  }
});
const b = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    d(this, "keyListener", (t) => {
      t.key == "Escape" && !this.isStatic && this.hide();
    });
    this.init();
  }
  init() {
    var t;
    this._element != null && (this._targetElement = this.getTargetElement(), (t = this._targetElement) == null || t.classList.add(b.DEFAULT.class.base), this.initOptions(), this.initListener());
  }
  initOptions() {
    var l, r, a;
    let t = (l = this._element) == null ? void 0 : l.getAttribute(b.DEFAULT.attr.scroll);
    t ? this.config.scroll = t !== "false" : this.config.scroll == null && (this.config.scroll = !1);
    let n = (r = this._element) == null ? void 0 : r.getAttribute(b.DEFAULT.attr.backdrop);
    n ? this.config.backdrop = n !== "false" : this.config.backdrop == null && (this.config.backdrop = !0);
    let s = (a = this._element) == null ? void 0 : a.getAttribute(b.DEFAULT.attr.behavior);
    s ? this.config.behavior = s == "static" ? "static" : "default" : this.config.behavior == null && (this.config.behavior = "default");
  }
  initListener() {
    var t;
    this._element != null && (this._element.addEventListener("click", () => {
      this.toggle();
    }), (t = this._targetElement) == null || t.querySelectorAll(`[${b.DEFAULT.attr.dismiss}]`).forEach((n) => {
      n.addEventListener("click", () => {
        this.hide();
      });
    }), et.listenOverlayClick(() => {
      this.isStatic || this.hide();
    }));
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(b.DEFAULT.class.hidden));
  }
  get isStatic() {
    return this.config.behavior === "static";
  }
  show() {
    if (this.dispatchEvent(b.EVENTS.show), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(b.DEFAULT.class.hidden), this._element.classList.add(b.DEFAULT.class.open), this.config.backdrop && E.showOverlay(), setTimeout(() => {
      this._targetElement.classList.add(b.DEFAULT.class.open);
    }, 1), !this.config.scroll)) {
      const t = document.documentElement.clientWidth;
      document.body.style.paddingRight = Math.abs(window.innerWidth - t) + "px", document.body.classList.add("overflow-hidden");
    }
    window.addEventListener("keydown", this.keyListener), this.dispatchEvent(b.EVENTS.shown);
  }
  hide() {
    var t;
    this.isShown && (this.dispatchEvent(b.EVENTS.hide), this._targetElement != null && this.isShown && ((t = this._element) == null || t.classList.remove(b.DEFAULT.class.open), this._targetElement.classList.remove(b.DEFAULT.class.open), et.afterTransition(this._targetElement, () => {
      this._targetElement.classList.add(b.DEFAULT.class.hidden), this.config.backdrop && E.hideOverlay();
    }), this.config.scroll || (document.body.classList.remove("overflow-hidden"), Object.assign(document.body.style, {
      paddingRight: null
    }))), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(b.EVENTS.hidden));
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(b.DEFAULT.attr.target);
    return typeof t == "string" ? E.findOrById(t) : t instanceof HTMLElement ? t : E.nextElementSibling(this._element);
  }
};
let N = b;
d(N, "type", "offcanvas"), d(N, "SELECTOR", '[data-fc-type="offcanvas"]'), d(N, "EVENTS", {
  show: "fc.offcanvas.show",
  shown: "fc.offcanvas.shown",
  hide: "fc.offcanvas.hide",
  hidden: "fc.offcanvas.hidden"
}), d(N, "DEFAULT", {
  class: {
    base: "fc-offcanvas",
    hidden: "hidden",
    open: "open"
  },
  attr: {
    target: "data-fc-target",
    dismiss: "data-fc-dismiss",
    behavior: "data-fc-behavior",
    scroll: "data-fc-scroll",
    backdrop: "data-fc-backdrop"
  }
});
const X = class extends $ {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    this.init();
  }
  init() {
    this._element != null && (this._targetElement = this._getTargetElement()), this._targetElement && this.initListener();
  }
  initListener() {
    this._element.addEventListener("click", (t) => {
      this.hide();
    });
  }
  hide() {
    this.dispatchEvent(X.EVENTS.hide), this._targetElement != null && this._targetElement.classList.add(X.DEFAULT.class.hidden), this.dispatchEvent(X.EVENTS.hidden);
  }
  _getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(X.DEFAULT.attr.target);
    return typeof t == "string" ? E.findOrById(t) : t instanceof HTMLElement ? t : this._element.parentElement;
  }
};
let H = X;
d(H, "type", "dismissable"), d(H, "SELECTOR", "[data-fc-dismiss]"), d(H, "EVENTS", {
  hide: "fc.dismissable.hide",
  hidden: "fc.dismissable.hidden"
}), d(H, "DEFAULT", {
  class: {
    hidden: "hidden"
  },
  attr: {
    target: "data-fc-dismiss"
  }
});
function Nt() {
  E.findAll(S.SELECTOR).forEach((e) => new S(e)), E.findAll(B.SELECTOR).forEach((e) => new B(e)), E.findAll(C.SELECTOR).forEach((e) => new C(e)), E.findAll(W.SELECTOR).forEach((e) => new W(e)), E.findAll(R.SELECTOR).forEach((e) => new R(e)), E.findAll(N.SELECTOR).forEach((e) => new N(e)), E.findAll(V.SELECTOR).forEach((e) => new V(e)), E.findAll(H.SELECTOR).forEach((e) => new H(e));
}
const Zt = {
  autoAwake: Nt,
  Collapse: S,
  Accordion: B,
  Dropdown: C,
  Tooltip: V,
  Modal: R,
  Offcanvas: N,
  Dismissable: H,
  Tab: W
};
window.frost = Zt;
E.addOverlay(["transition-all", "fixed", "inset-0", "z-40", "bg-gray-900", "bg-opacity-50", "dark:bg-opacity-80"]);
Nt();
export {
  B as Accordion,
  S as Collapse,
  H as Dismissable,
  C as Dropdown,
  R as Modal,
  N as Offcanvas,
  W as Tab,
  V as Tooltip,
  Nt as autoAwake
};
