var te = Object.defineProperty;
var ee = (e, i, t) => i in e ? te(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var d = (e, i, t) => (ee(e, typeof i != "symbol" ? i + "" : i, t), t);
const rt = /* @__PURE__ */ new Map(), vt = {
  set(e, i, t) {
    rt.has(e) || rt.set(e, /* @__PURE__ */ new Map()), rt.get(e).set(i, t);
  },
  get(e, i) {
    var t;
    return ((t = rt.get(e)) == null ? void 0 : t.get(i)) || null;
  },
  remove(e, i) {
    var t;
    return ((t = rt.get(e)) == null ? void 0 : t.delete(i)) || !0;
  }
}, et = /* @__PURE__ */ new Map(), Tt = {
  addListener(e, i, t) {
    et.has(e) || et.set(e, /* @__PURE__ */ new Map());
    const n = et.get(e);
    let s = n.get(i);
    s == null && (s = []), s.push(t), n.set(i, s);
  },
  removeListener(e, i, t) {
    if (!et.has(e))
      return;
    const n = et.get(e);
    let s = n.get(i);
    s != null && (s = s.filter((r) => r != t), n.set(i, s));
  },
  getCallbacks(e, i) {
    var t;
    return ((t = et.get(e)) == null ? void 0 : t.get(i)) ?? [];
  }
}, v = {
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
class I {
  constructor(i, t) {
    d(this, "_element");
    d(this, "_destroyed", !1);
    d(this, "_config", {});
    typeof i == "string" ? this._element = v.findOrById(i) : this._element = i, this._config = t ?? {}, this._element != null && vt.set(this.constructor.type, this._element, this);
  }
  get config() {
    return this._config ?? {};
  }
  static getInstance(i) {
    return i == null ? null : vt.get(this.type, i);
  }
  static getInstanceOrCreate(i, t) {
    if (i == null)
      return null;
    const n = this.getInstance(i);
    return n ?? new this(i, t);
  }
  addEventListener(i, t) {
    Tt.addListener(this, i, t);
  }
  removeEventListener(i, t) {
    Tt.removeListener(this, i, t);
  }
  dispatchEvent(i) {
    Tt.getCallbacks(this, i).forEach((t) => t());
  }
  destroy() {
    this._destroyed = !0, this._element != null && vt.remove(this.constructor.type, this._element);
  }
}
d(I, "type", "");
const gt = {
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
    (i = v.getOverlay()) == null || i.addEventListener("click", e);
  }
}, D = class extends I {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    this.init();
  }
  init() {
    this._element != null && (this._element.classList.add(D.DEFAULT.class.base), this._targetElement = this.getTargetElement()), this.initOptions(), this.initListener();
  }
  initOptions() {
    this._targetElement != null && !this._targetElement.classList.contains(D.DEFAULT.class.hidden) && this._element.classList.add(D.DEFAULT.class.open), this.config.toggle && this.toggle();
  }
  initListener() {
    this._element.addEventListener("click", () => {
      this.toggle();
    });
  }
  get isShown() {
    var t;
    return ((t = this._element) == null ? void 0 : t.classList.contains(D.DEFAULT.class.open)) ?? !1;
  }
  show() {
    this._destroyed || (this.dispatchEvent(D.EVENTS.show), this._targetElement != null && this._element != null && (this._element.classList.add(D.DEFAULT.class.open), this._targetElement.classList.remove(D.DEFAULT.class.hidden), this._targetElement.style.height = "0px", this._targetElement.style.height = `${this._targetElement.scrollHeight}px`, gt.afterTransition(this._targetElement, () => {
      this.isShown && (this._targetElement.style.height = "");
    })), this.dispatchEvent(D.EVENTS.shown));
  }
  hide() {
    this._destroyed || (this.dispatchEvent(D.EVENTS.hide), this._targetElement != null && this._element != null && (this._element.classList.remove(D.DEFAULT.class.open), this._targetElement.style.height = `${this._targetElement.scrollHeight}px`, gt.afterTransition(this._targetElement, () => {
      this.isShown || (this._targetElement.classList.add(D.DEFAULT.class.hidden), this._targetElement.style.height = "");
    }), setTimeout(() => {
      this._targetElement.style.height = "0px";
    })), this.dispatchEvent(D.EVENTS.hidden));
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(D.DEFAULT.attr.target);
    return typeof t == "string" ? v.findOrById(t) : t instanceof HTMLElement ? t : v.nextElementSibling(this._element);
  }
};
let O = D;
d(O, "type", "collapse"), d(O, "SELECTOR", '[data-fc-type="collapse"]'), d(O, "EVENTS", {
  show: "fc.collapse.show",
  shown: "fc.collapse.shown",
  hide: "fc.collapse.hide",
  hidden: "fc.collapse.hidden"
}), d(O, "DEFAULT", {
  class: {
    base: "fc-collapse",
    hidden: "hidden",
    open: "open"
  },
  attr: {
    target: "data-fc-target"
  }
});
const pt = class extends I {
  constructor(t, n) {
    super(t, n);
    d(this, "targetCollapses", []);
    this.init();
  }
  init() {
    if (this._element != null) {
      const t = v.findAllInElement(this._element, O.SELECTOR);
      let n = !1;
      for (let s of t)
        if (s.hasAttribute(pt.DEFAULT.attr.parent)) {
          n = !0;
          break;
        }
      if (!n)
        this.targetCollapses = t.map((s) => O.getInstanceOrCreate(s));
      else {
        const s = this._element.id;
        this.targetCollapses = t.filter((r) => r.getAttribute(pt.DEFAULT.attr.parent) == s).map((r) => O.getInstanceOrCreate(r));
      }
      this.initListeners();
    }
  }
  initListeners() {
    this.targetCollapses.forEach((t) => {
      t.addEventListener(O.EVENTS.show, () => {
        this._destroyed || this.targetCollapses.filter((n) => n != t).forEach((n) => n.hide());
      });
    });
  }
};
let Q = pt;
d(Q, "type", "accordion"), d(Q, "SELECTOR", '[data-fc-type="accordion"]'), d(Q, "DEFAULT", {
  attr: {
    parent: "data-fc-parent"
  }
});
function ht(e) {
  return e.split("-")[1];
}
function St(e) {
  return e === "y" ? "height" : "width";
}
function tt(e) {
  return e.split("-")[0];
}
function dt(e) {
  return ["top", "bottom"].includes(tt(e)) ? "x" : "y";
}
function Ot(e, i, t) {
  let { reference: n, floating: s } = e;
  const r = n.x + n.width / 2 - s.width / 2, l = n.y + n.height / 2 - s.height / 2, a = dt(i), h = St(a), o = n[h] / 2 - s[h] / 2, f = a === "x";
  let c;
  switch (tt(i)) {
    case "top":
      c = { x: r, y: n.y - s.height };
      break;
    case "bottom":
      c = { x: r, y: n.y + n.height };
      break;
    case "right":
      c = { x: n.x + n.width, y: l };
      break;
    case "left":
      c = { x: n.x - s.width, y: l };
      break;
    default:
      c = { x: n.x, y: n.y };
  }
  switch (ht(i)) {
    case "start":
      c[a] -= o * (t && f ? -1 : 1);
      break;
    case "end":
      c[a] += o * (t && f ? -1 : 1);
  }
  return c;
}
const ie = async (e, i, t) => {
  const { placement: n = "bottom", strategy: s = "absolute", middleware: r = [], platform: l } = t, a = r.filter(Boolean), h = await (l.isRTL == null ? void 0 : l.isRTL(i));
  let o = await l.getElementRects({ reference: e, floating: i, strategy: s }), { x: f, y: c } = Ot(o, n, h), g = n, m = {}, E = 0;
  for (let u = 0; u < a.length; u++) {
    const { name: p, fn: L } = a[u], { x: y, y: T, data: F, reset: S } = await L({ x: f, y: c, initialPlacement: n, placement: g, strategy: s, middlewareData: m, rects: o, platform: l, elements: { reference: e, floating: i } });
    f = y ?? f, c = T ?? c, m = { ...m, [p]: { ...m[p], ...F } }, S && E <= 50 && (E++, typeof S == "object" && (S.placement && (g = S.placement), S.rects && (o = S.rects === !0 ? await l.getElementRects({ reference: e, floating: i, strategy: s }) : S.rects), { x: f, y: c } = Ot(o, g, h)), u = -1);
  }
  return { x: f, y: c, placement: g, strategy: s, middlewareData: m };
};
function Ht(e) {
  return typeof e != "number" ? function(i) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...i };
  }(e) : { top: e, right: e, bottom: e, left: e };
}
function mt(e) {
  return { ...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
}
async function It(e, i) {
  var t;
  i === void 0 && (i = {});
  const { x: n, y: s, platform: r, rects: l, elements: a, strategy: h } = e, { boundary: o = "clippingAncestors", rootBoundary: f = "viewport", elementContext: c = "floating", altBoundary: g = !1, padding: m = 0 } = i, E = Ht(m), u = a[g ? c === "floating" ? "reference" : "floating" : c], p = mt(await r.getClippingRect({ element: (t = await (r.isElement == null ? void 0 : r.isElement(u))) == null || t ? u : u.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(a.floating)), boundary: o, rootBoundary: f, strategy: h })), L = c === "floating" ? { ...l.floating, x: n, y: s } : l.reference, y = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(a.floating)), T = await (r.isElement == null ? void 0 : r.isElement(y)) && await (r.getScale == null ? void 0 : r.getScale(y)) || { x: 1, y: 1 }, F = mt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: L, offsetParent: y, strategy: h }) : L);
  return { top: (p.top - F.top + E.top) / T.y, bottom: (F.bottom - p.bottom + E.bottom) / T.y, left: (p.left - F.left + E.left) / T.x, right: (F.right - p.right + E.right) / T.x };
}
const ne = Math.min, se = Math.max;
function xt(e, i, t) {
  return se(e, ne(i, t));
}
const le = (e) => ({ name: "arrow", options: e, async fn(i) {
  const { element: t, padding: n = 0 } = e || {}, { x: s, y: r, placement: l, rects: a, platform: h, elements: o } = i;
  if (t == null)
    return {};
  const f = Ht(n), c = { x: s, y: r }, g = dt(l), m = St(g), E = await h.getDimensions(t), u = g === "y", p = u ? "top" : "left", L = u ? "bottom" : "right", y = u ? "clientHeight" : "clientWidth", T = a.reference[m] + a.reference[g] - c[g] - a.floating[m], F = c[g] - a.reference[g], S = await (h.getOffsetParent == null ? void 0 : h.getOffsetParent(t));
  let $ = S ? S[y] : 0;
  $ && await (h.isElement == null ? void 0 : h.isElement(S)) || ($ = o.floating[y] || a.floating[m]);
  const G = T / 2 - F / 2, J = f[p], st = $ - E[m] - f[L], V = $ / 2 - E[m] / 2 + G, _ = xt(J, V, st), C = ht(l) != null && V != _ && a.reference[m] / 2 - (V < J ? f[p] : f[L]) - E[m] / 2 < 0;
  return { [g]: c[g] - (C ? V < J ? J - V : st - V : 0), data: { [g]: _, centerOffset: V - _ } };
} }), re = ["top", "right", "bottom", "left"];
re.reduce((e, i) => e.concat(i, i + "-start", i + "-end"), []);
const ae = { left: "right", right: "left", bottom: "top", top: "bottom" };
function ut(e) {
  return e.replace(/left|right|bottom|top/g, (i) => ae[i]);
}
function oe(e, i, t) {
  t === void 0 && (t = !1);
  const n = ht(e), s = dt(e), r = St(s);
  let l = s === "x" ? n === (t ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return i.reference[r] > i.floating[r] && (l = ut(l)), { main: l, cross: ut(l) };
}
const ce = { start: "end", end: "start" };
function bt(e) {
  return e.replace(/start|end/g, (i) => ce[i]);
}
const he = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(i) {
    var t;
    const { placement: n, middlewareData: s, rects: r, initialPlacement: l, platform: a, elements: h } = i, { mainAxis: o = !0, crossAxis: f = !0, fallbackPlacements: c, fallbackStrategy: g = "bestFit", fallbackAxisSideDirection: m = "none", flipAlignment: E = !0, ...u } = e, p = tt(n), L = tt(l) === l, y = await (a.isRTL == null ? void 0 : a.isRTL(h.floating)), T = c || (L || !E ? [ut(l)] : function(_) {
      const C = ut(_);
      return [bt(_), C, bt(C)];
    }(l));
    c || m === "none" || T.push(...function(_, C, K, P) {
      const H = ht(_);
      let U = function(lt, wt, Kt) {
        const kt = ["left", "right"], Ut = ["right", "left"], Qt = ["top", "bottom"], Zt = ["bottom", "top"];
        switch (lt) {
          case "top":
          case "bottom":
            return Kt ? wt ? Ut : kt : wt ? kt : Ut;
          case "left":
          case "right":
            return wt ? Qt : Zt;
          default:
            return [];
        }
      }(tt(_), K === "start", P);
      return H && (U = U.map((lt) => lt + "-" + H), C && (U = U.concat(U.map(bt)))), U;
    }(l, E, m, y));
    const F = [l, ...T], S = await It(i, u), $ = [];
    let G = ((t = s.flip) == null ? void 0 : t.overflows) || [];
    if (o && $.push(S[p]), f) {
      const { main: _, cross: C } = oe(n, r, y);
      $.push(S[_], S[C]);
    }
    if (G = [...G, { placement: n, overflows: $ }], !$.every((_) => _ <= 0)) {
      var J, st;
      const _ = (((J = s.flip) == null ? void 0 : J.index) || 0) + 1, C = F[_];
      if (C)
        return { data: { index: _, overflows: G }, reset: { placement: C } };
      let K = (st = G.filter((P) => P.overflows[0] <= 0).sort((P, H) => P.overflows[1] - H.overflows[1])[0]) == null ? void 0 : st.placement;
      if (!K)
        switch (g) {
          case "bestFit": {
            var V;
            const P = (V = G.map((H) => [H.placement, H.overflows.filter((U) => U > 0).reduce((U, lt) => U + lt, 0)]).sort((H, U) => H[1] - U[1])[0]) == null ? void 0 : V[0];
            P && (K = P);
            break;
          }
          case "initialPlacement":
            K = l;
        }
      if (n !== K)
        return { reset: { placement: K } };
    }
    return {};
  } };
}, Pt = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(i) {
    const { x: t, y: n } = i, s = await async function(r, l) {
      const { placement: a, platform: h, elements: o } = r, f = await (h.isRTL == null ? void 0 : h.isRTL(o.floating)), c = tt(a), g = ht(a), m = dt(a) === "x", E = ["left", "top"].includes(c) ? -1 : 1, u = f && m ? -1 : 1, p = typeof l == "function" ? l(r) : l;
      let { mainAxis: L, crossAxis: y, alignmentAxis: T } = typeof p == "number" ? { mainAxis: p, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...p };
      return g && typeof T == "number" && (y = g === "end" ? -1 * T : T), m ? { x: y * u, y: L * E } : { x: L * E, y: y * u };
    }(i, e);
    return { x: t + s.x, y: n + s.y, data: s };
  } };
};
function de(e) {
  return e === "x" ? "y" : "x";
}
const fe = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(i) {
    const { x: t, y: n, placement: s } = i, { mainAxis: r = !0, crossAxis: l = !1, limiter: a = { fn: (p) => {
      let { x: L, y } = p;
      return { x: L, y };
    } }, ...h } = e, o = { x: t, y: n }, f = await It(i, h), c = dt(tt(s)), g = de(c);
    let m = o[c], E = o[g];
    if (r) {
      const p = c === "y" ? "bottom" : "right";
      m = xt(m + f[c === "y" ? "top" : "left"], m, m - f[p]);
    }
    if (l) {
      const p = g === "y" ? "bottom" : "right";
      E = xt(E + f[g === "y" ? "top" : "left"], E, E - f[p]);
    }
    const u = a.fn({ ...i, [c]: m, [g]: E });
    return { ...u, data: { x: u.x - t, y: u.y - n } };
  } };
};
function k(e) {
  var i;
  return ((i = e.ownerDocument) == null ? void 0 : i.defaultView) || window;
}
function N(e) {
  return k(e).getComputedStyle(e);
}
function Wt(e) {
  return e instanceof k(e).Node;
}
function z(e) {
  return Wt(e) ? (e.nodeName || "").toLowerCase() : "";
}
let ft;
function Bt() {
  if (ft)
    return ft;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (ft = e.brands.map((i) => i.brand + "/" + i.version).join(" "), ft) : navigator.userAgent;
}
function R(e) {
  return e instanceof k(e).HTMLElement;
}
function X(e) {
  return e instanceof k(e).Element;
}
function Ct(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof k(e).ShadowRoot || e instanceof ShadowRoot;
}
function yt(e) {
  const { overflow: i, overflowX: t, overflowY: n, display: s } = N(e);
  return /auto|scroll|overlay|hidden|clip/.test(i + n + t) && !["inline", "contents"].includes(s);
}
function ge(e) {
  return ["table", "td", "th"].includes(z(e));
}
function At(e) {
  const i = /firefox/i.test(Bt()), t = N(e), n = t.backdropFilter || t.WebkitBackdropFilter;
  return t.transform !== "none" || t.perspective !== "none" || !!n && n !== "none" || i && t.willChange === "filter" || i && !!t.filter && t.filter !== "none" || ["transform", "perspective"].some((s) => t.willChange.includes(s)) || ["paint", "layout", "strict", "content"].some((s) => {
    const r = t.contain;
    return r != null && r.includes(s);
  });
}
function _t() {
  return /^((?!chrome|android).)*safari/i.test(Bt());
}
function Dt(e) {
  return ["html", "body", "#document"].includes(z(e));
}
const Rt = Math.min, at = Math.max, Et = Math.round;
function Mt(e) {
  const i = N(e);
  let t = parseFloat(i.width), n = parseFloat(i.height);
  const s = R(e), r = s ? e.offsetWidth : t, l = s ? e.offsetHeight : n, a = Et(t) !== r || Et(n) !== l;
  return a && (t = r, n = l), { width: t, height: n, fallback: a };
}
function jt(e) {
  return X(e) ? e : e.contextElement;
}
const qt = { x: 1, y: 1 };
function nt(e) {
  const i = jt(e);
  if (!R(i))
    return qt;
  const t = i.getBoundingClientRect(), { width: n, height: s, fallback: r } = Mt(i);
  let l = (r ? Et(t.width) : t.width) / n, a = (r ? Et(t.height) : t.height) / s;
  return l && Number.isFinite(l) || (l = 1), a && Number.isFinite(a) || (a = 1), { x: l, y: a };
}
function ot(e, i, t, n) {
  var s, r;
  i === void 0 && (i = !1), t === void 0 && (t = !1);
  const l = e.getBoundingClientRect(), a = jt(e);
  let h = qt;
  i && (n ? X(n) && (h = nt(n)) : h = nt(e));
  const o = a ? k(a) : window, f = _t() && t;
  let c = (l.left + (f && ((s = o.visualViewport) == null ? void 0 : s.offsetLeft) || 0)) / h.x, g = (l.top + (f && ((r = o.visualViewport) == null ? void 0 : r.offsetTop) || 0)) / h.y, m = l.width / h.x, E = l.height / h.y;
  if (a) {
    const u = k(a), p = n && X(n) ? k(n) : n;
    let L = u.frameElement;
    for (; L && n && p !== u; ) {
      const y = nt(L), T = L.getBoundingClientRect(), F = getComputedStyle(L);
      T.x += (L.clientLeft + parseFloat(F.paddingLeft)) * y.x, T.y += (L.clientTop + parseFloat(F.paddingTop)) * y.y, c *= y.x, g *= y.y, m *= y.x, E *= y.y, c += T.x, g += T.y, L = k(L).frameElement;
    }
  }
  return mt({ width: m, height: E, x: c, y: g });
}
function Y(e) {
  return ((Wt(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Lt(e) {
  return X(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Xt(e) {
  return ot(Y(e)).left + Lt(e).scrollLeft;
}
function ct(e) {
  if (z(e) === "html")
    return e;
  const i = e.assignedSlot || e.parentNode || Ct(e) && e.host || Y(e);
  return Ct(i) ? i.host : i;
}
function Yt(e) {
  const i = ct(e);
  return Dt(i) ? i.ownerDocument.body : R(i) && yt(i) ? i : Yt(i);
}
function zt(e, i) {
  var t;
  i === void 0 && (i = []);
  const n = Yt(e), s = n === ((t = e.ownerDocument) == null ? void 0 : t.body), r = k(n);
  return s ? i.concat(r, r.visualViewport || [], yt(n) ? n : []) : i.concat(n, zt(n));
}
function Vt(e, i, t) {
  let n;
  if (i === "viewport")
    n = function(l, a) {
      const h = k(l), o = Y(l), f = h.visualViewport;
      let c = o.clientWidth, g = o.clientHeight, m = 0, E = 0;
      if (f) {
        c = f.width, g = f.height;
        const u = _t();
        (!u || u && a === "fixed") && (m = f.offsetLeft, E = f.offsetTop);
      }
      return { width: c, height: g, x: m, y: E };
    }(e, t);
  else if (i === "document")
    n = function(l) {
      const a = Y(l), h = Lt(l), o = l.ownerDocument.body, f = at(a.scrollWidth, a.clientWidth, o.scrollWidth, o.clientWidth), c = at(a.scrollHeight, a.clientHeight, o.scrollHeight, o.clientHeight);
      let g = -h.scrollLeft + Xt(l);
      const m = -h.scrollTop;
      return N(o).direction === "rtl" && (g += at(a.clientWidth, o.clientWidth) - f), { width: f, height: c, x: g, y: m };
    }(Y(e));
  else if (X(i))
    n = function(l, a) {
      const h = ot(l, !0, a === "fixed"), o = h.top + l.clientTop, f = h.left + l.clientLeft, c = R(l) ? nt(l) : { x: 1, y: 1 };
      return { width: l.clientWidth * c.x, height: l.clientHeight * c.y, x: f * c.x, y: o * c.y };
    }(i, t);
  else {
    const l = { ...i };
    if (_t()) {
      var s, r;
      const a = k(e);
      l.x -= ((s = a.visualViewport) == null ? void 0 : s.offsetLeft) || 0, l.y -= ((r = a.visualViewport) == null ? void 0 : r.offsetTop) || 0;
    }
    n = l;
  }
  return mt(n);
}
function Nt(e, i) {
  return R(e) && N(e).position !== "fixed" ? i ? i(e) : e.offsetParent : null;
}
function $t(e, i) {
  const t = k(e);
  if (!R(e))
    return t;
  let n = Nt(e, i);
  for (; n && ge(n) && N(n).position === "static"; )
    n = Nt(n, i);
  return n && (z(n) === "html" || z(n) === "body" && N(n).position === "static" && !At(n)) ? t : n || function(s) {
    let r = ct(s);
    for (; R(r) && !Dt(r); ) {
      if (At(r))
        return r;
      r = ct(r);
    }
    return null;
  }(e) || t;
}
function me(e, i, t) {
  const n = R(i), s = Y(i), r = ot(e, !0, t === "fixed", i);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || !n && t !== "fixed")
    if ((z(i) !== "body" || yt(s)) && (l = Lt(i)), R(i)) {
      const h = ot(i, !0);
      a.x = h.x + i.clientLeft, a.y = h.y + i.clientTop;
    } else
      s && (a.x = Xt(s));
  return { x: r.left + l.scrollLeft - a.x, y: r.top + l.scrollTop - a.y, width: r.width, height: r.height };
}
const ue = { getClippingRect: function(e) {
  let { element: i, boundary: t, rootBoundary: n, strategy: s } = e;
  const r = t === "clippingAncestors" ? function(o, f) {
    const c = f.get(o);
    if (c)
      return c;
    let g = zt(o).filter((p) => X(p) && z(p) !== "body"), m = null;
    const E = N(o).position === "fixed";
    let u = E ? ct(o) : o;
    for (; X(u) && !Dt(u); ) {
      const p = N(u), L = At(u);
      p.position === "fixed" && (m = null), (E ? L || m : L || p.position !== "static" || !m || !["absolute", "fixed"].includes(m.position)) ? m = p : g = g.filter((y) => y !== u), u = ct(u);
    }
    return f.set(o, g), g;
  }(i, this._c) : [].concat(t), l = [...r, n], a = l[0], h = l.reduce((o, f) => {
    const c = Vt(i, f, s);
    return o.top = at(c.top, o.top), o.right = Rt(c.right, o.right), o.bottom = Rt(c.bottom, o.bottom), o.left = at(c.left, o.left), o;
  }, Vt(i, a, s));
  return { width: h.right - h.left, height: h.bottom - h.top, x: h.left, y: h.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: i, offsetParent: t, strategy: n } = e;
  const s = R(t), r = Y(t);
  if (t === r)
    return i;
  let l = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const h = { x: 0, y: 0 };
  if ((s || !s && n !== "fixed") && ((z(t) !== "body" || yt(r)) && (l = Lt(t)), R(t))) {
    const o = ot(t);
    a = nt(t), h.x = o.x + t.clientLeft, h.y = o.y + t.clientTop;
  }
  return { width: i.width * a.x, height: i.height * a.y, x: i.x * a.x - l.scrollLeft * a.x + h.x, y: i.y * a.y - l.scrollTop * a.y + h.y };
}, isElement: X, getDimensions: function(e) {
  return Mt(e);
}, getOffsetParent: $t, getDocumentElement: Y, getScale: nt, async getElementRects(e) {
  let { reference: i, floating: t, strategy: n } = e;
  const s = this.getOffsetParent || $t, r = this.getDimensions;
  return { reference: me(i, await s(t), n), floating: { x: 0, y: 0, ...await r(t) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => N(e).direction === "rtl" }, Gt = (e, i, t) => {
  const n = /* @__PURE__ */ new Map(), s = { platform: ue, ...t }, r = { ...s.platform, _c: n };
  return ie(e, i, { ...s, platform: r });
}, b = class extends I {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    d(this, "clicked", !1);
    d(this, "_targetOffset", 8);
    d(this, "keyListener", (t) => {
      t.key == "Escape" && this.hide();
    });
    this.init();
  }
  get isShown() {
    var t;
    return ((t = this._targetElement) == null ? void 0 : t.classList.contains(b.DEFAULT.class.hidden)) === !1;
  }
  get isHover() {
    return this.config.trigger === "hover";
  }
  show() {
    this.dispatchEvent(b.EVENTS.show), this.addComputePositionInTargetElement(), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(b.DEFAULT.class.hidden), setTimeout(() => {
      this._element.classList.add(b.DEFAULT.class.open), this._targetElement.classList.add(b.DEFAULT.class.open);
    }, 1)), window.addEventListener("keydown", this.keyListener), this.dispatchEvent(b.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(b.EVENTS.hide), this.clicked = !1, this._targetElement != null && ((t = this._element) == null || t.classList.remove(b.DEFAULT.class.open), this._targetElement.classList.remove(b.DEFAULT.class.open), this._targetElement.classList.add(b.DEFAULT.class.hidden)), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(b.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  init() {
    this._element != null && (this._targetElement = this.getTargetElement(), this.initOptions(), this.initListener());
  }
  initOptions() {
    var t, n, s, r, l, a, h, o;
    if ((t = this._element) == null || t.classList.add(b.DEFAULT.class.base), (n = this._targetElement) == null || n.classList.add(b.DEFAULT.class.base), (r = this.config).placement ?? (r.placement = ((s = this._element) == null ? void 0 : s.getAttribute(b.DEFAULT.attr.placement)) ?? "bottom-start"), (a = this.config).trigger ?? (a.trigger = ((l = this._element) == null ? void 0 : l.getAttribute(b.DEFAULT.attr.trigger)) == "hover" ? "hover" : "click"), ((h = this._targetElement) == null ? void 0 : h.classList.contains(b.DEFAULT.class.hidden)) === !1 && this.show(), (o = this._element) != null && o.hasAttribute(b.DEFAULT.attr.offset)) {
      const f = this._element.getAttribute(b.DEFAULT.attr.offset);
      isNaN(parseInt(f)) || (this._targetOffset = parseInt(f));
    }
  }
  initListener() {
    var t, n;
    (t = this._element) == null || t.addEventListener("click", () => {
      this._destroyed || (this.isHover ? (this.clicked ? this.hide() : this.show(), this.clicked = !this.clicked) : this.toggle());
    }), this.isHover && ((n = this._element) == null || n.addEventListener("mouseover", () => {
      this.show();
    }), window.addEventListener("mousemove", (s) => {
      this._destroyed || this._targetElement != null && this._element != null && s.target instanceof HTMLElement && !this.clicked && !v.isElementSameOrContains(this._targetElement, s.target) && !v.isElementSameOrContains(this._element, s.target) && this.hide();
    })), window.addEventListener("click", (s) => {
      this._destroyed || this._targetElement != null && this._element != null && s.target instanceof HTMLElement && !v.isElementSameOrContains(this._targetElement, s.target) && !v.isElementSameOrContains(this._element, s.target) && this.hide();
    });
  }
  addComputePositionInTargetElement() {
    console.info(this._targetOffset);
    const t = [Pt(this._targetOffset)];
    this._element != null && this._targetElement != null && (this._targetElement.classList.add("absolute"), Gt(this._element, this._targetElement, {
      placement: this.config.placement,
      middleware: t
    }).then(({ x: n, y: s }) => {
      this._targetElement != null && Object.assign(this._targetElement.style, {
        left: `${n}px`,
        top: `${s}px`
      });
    }));
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this._element.getAttribute(b.DEFAULT.attr.target), n = this.config.target ?? t;
    return typeof n == "string" ? v.findOrById(n) : n instanceof HTMLElement ? n : v.nextElementSibling(this._element);
  }
};
let W = b;
d(W, "type", "dropdown"), d(W, "SELECTOR", '[data-fc-type="dropdown"]'), d(W, "EVENTS", {
  show: "fc.dropdown.show",
  shown: "fc.dropdown.shown",
  hide: "fc.dropdown.hide",
  hidden: "fc.dropdown.hidden"
}), d(W, "DEFAULT", {
  class: {
    base: "fc-dropdown",
    hidden: "hidden",
    open: "open"
  },
  attr: {
    target: "data-fc-target",
    placement: "data-fc-placement",
    trigger: "data-fc-trigger",
    offset: "data-fc-offset"
  }
});
const Ft = class extends I {
  constructor(t, n) {
    super(t, n);
    d(this, "_elements", /* @__PURE__ */ new Map());
    this.init();
  }
  init() {
    if (this._element != null) {
      const t = /* @__PURE__ */ new Map(), n = this._element.querySelectorAll("[data-fc-target]");
      for (const s of n) {
        const r = s.getAttribute(Ft.DEFAULT.attr.target);
        if (r != null) {
          const l = v.findOrById(r);
          l != null && t.set(s, l);
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
    const n = this._elements.get(t), s = Array.from(this._elements.keys()).filter((l) => l != t), r = s.map((l) => this._elements.get(l));
    n == null || n.classList.remove("hidden"), r.forEach((l) => l.classList.add("hidden")), n == null || n.classList.add("active"), t.classList.add("active"), r.forEach((l) => l.classList.remove("active")), s.forEach((l) => l.classList.remove("active"));
  }
};
let Z = Ft;
d(Z, "type", "tab"), d(Z, "SELECTOR", '[data-fc-type="tab"]'), d(Z, "DEFAULT", {
  attr: {
    target: "data-fc-target"
  }
});
const x = class extends I {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    d(this, "_windowClickListen", !1);
    d(this, "keyListener", (t) => {
      t.key == "Escape" && !this.isStatic && this.hide();
    });
    d(this, "onWindowClicked", (t) => {
      !this.isStatic && t.target instanceof HTMLElement && this._targetElement && this.isShown && (v.isElementContains(this._targetElement, t.target) || this.hide());
    });
    this.init();
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(x.DEFAULT.class.hidden));
  }
  get isStatic() {
    return this.config.behavior === "static";
  }
  init() {
    var t;
    this._element != null && (this._targetElement = this.getTargetElement(), (t = this._targetElement) == null || t.classList.add(x.DEFAULT.class.base), this.initOptions(), this.initListener());
  }
  initOptions() {
    var n;
    let t = (n = this._element) == null ? void 0 : n.getAttribute(x.DEFAULT.attr.behavior);
    t ? this.config.behavior = t == "static" ? "static" : "default" : this.config.behavior == null && (this.config.behavior = "default");
  }
  initListener() {
    var t;
    this._element != null && (this._element.addEventListener("click", () => {
      this.toggle();
    }), (t = this._targetElement) == null || t.querySelectorAll(`[${x.DEFAULT.attr.dismiss}]`).forEach((n) => {
      n.addEventListener("click", () => {
        this.hide();
      });
    }));
  }
  show() {
    if (this.dispatchEvent(x.EVENTS.show), this._targetElement != null && this._element != null) {
      const t = document.documentElement.clientWidth;
      document.body.style.paddingRight = Math.abs(window.innerWidth - t) + "px", document.body.classList.add(x.DEFAULT.class.overflowHidden), this._element.classList.add(x.DEFAULT.class.open), this._targetElement.classList.remove(x.DEFAULT.class.hidden), setTimeout(() => {
        this._targetElement.classList.add(x.DEFAULT.class.open), v.showOverlay(), this._windowClickListen || (window.addEventListener("click", this.onWindowClicked), this._windowClickListen = !0);
      }, 1);
    }
    window.addEventListener("keydown", this.keyListener), this.dispatchEvent(x.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(x.EVENTS.hide), this._targetElement != null && this.isShown && (document.body.classList.remove(x.DEFAULT.class.overflowHidden), (t = this._element) == null || t.classList.remove(x.DEFAULT.class.open), this._targetElement.classList.remove(x.DEFAULT.class.open), Object.assign(document.body.style, {
      paddingRight: null
    }), setTimeout(() => {
      window.removeEventListener("click", this.onWindowClicked), this._windowClickListen = !1, v.hideOverlay(), this._targetElement.classList.add(x.DEFAULT.class.hidden);
    }, 1)), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(x.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(x.DEFAULT.attr.target);
    return typeof t == "string" ? v.findOrById(t) : t instanceof HTMLElement ? t : v.nextElementSibling(this._element);
  }
};
let B = x;
d(B, "type", "modal"), d(B, "SELECTOR", '[data-fc-type="modal"]'), d(B, "EVENTS", {
  show: "fc.modal.show",
  shown: "fc.modal.shown",
  hide: "fc.modal.hide",
  hidden: "fc.modal.hidden"
}), d(B, "DEFAULT", {
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
const w = class extends I {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    d(this, "_arrowElement", null);
    d(this, "_targetOffset", 8);
    this.init();
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(w.DEFAULT.class.hidden));
  }
  get isClickTrigger() {
    return this.config.trigger === "click";
  }
  show() {
    this.computeTooltipPosition(), this.dispatchEvent(w.EVENTS.show), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(w.DEFAULT.class.hidden), this._targetElement.classList.remove(w.DEFAULT.class.opacity0), setTimeout(() => {
      this._element.classList.add(w.DEFAULT.class.open), this._targetElement.classList.add(w.DEFAULT.class.open), this._targetElement.classList.add(w.DEFAULT.class.opacity100);
    }, 1)), this.dispatchEvent(w.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(w.EVENTS.hide), this._targetElement != null && ((t = this._element) == null || t.classList.remove(w.DEFAULT.class.open), this._targetElement.classList.add(w.DEFAULT.class.opacity0), this._targetElement.classList.remove(w.DEFAULT.class.opacity100), this._targetElement.classList.add(w.DEFAULT.class.hidden)), this.dispatchEvent(w.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  init() {
    const t = this._element.getAttribute(w.DEFAULT.attr.target);
    t ? this._targetElement = v.findOrById(t) : this._targetElement = v.nextElementSibling(this._element), this._targetElement && (this._arrowElement = this._targetElement.querySelector(`[${w.DEFAULT.attr.arrow}]`)), this.initOptions(), this.initListener();
  }
  initOptions() {
    var t, n, s, r, l;
    if ((t = this._element) != null && t.hasAttribute(w.DEFAULT.attr.placement) && (this.config.placement = (n = this._element) == null ? void 0 : n.getAttribute(w.DEFAULT.attr.placement)), (s = this._element) != null && s.hasAttribute(w.DEFAULT.attr.trigger) && (this.config.trigger = ((r = this._element) == null ? void 0 : r.getAttribute(w.DEFAULT.attr.trigger)) === "click" ? "click" : "hover"), (l = this._element) != null && l.hasAttribute(w.DEFAULT.attr.offset)) {
      const a = this._element.getAttribute(w.DEFAULT.attr.offset);
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
  computeTooltipPosition() {
    const t = [Pt(this._targetOffset), fe({ padding: 2 }), he({ fallbackStrategy: "bestFit" })];
    this._arrowElement && t.push(le({ element: this._arrowElement })), this._element != null && this._targetElement != null && (this._targetElement.classList.add(w.DEFAULT.class.absolute), this._arrowElement && this._arrowElement.classList.add(w.DEFAULT.class.absolute), Gt(this._element, this._targetElement, {
      placement: this.config.placement,
      middleware: t
    }).then(({ x: n, y: s, middlewareData: r }) => {
      var l, a, h, o;
      if (Object.assign(this._targetElement.style, {
        left: `${n}px`,
        top: `${s}px`
      }), r.arrow && this._arrowElement) {
        const { x: f, y: c } = r.arrow, g = f != null ? `${f}px` : `${-this._arrowElement.offsetWidth / 2}px`, m = c != null ? `${c}px` : `${-this._arrowElement.offsetHeight / 2}px`, E = {
          left: (l = this.config.placement) != null && l.includes("left") ? null : g,
          top: (a = this.config.placement) != null && a.includes("top") ? null : m,
          right: (h = this.config.placement) != null && h.includes("left") ? g : null,
          bottom: (o = this.config.placement) != null && o.includes("top") ? m : null
        };
        Object.assign(this._arrowElement.style, E);
      }
    }));
  }
};
let M = w;
d(M, "type", "tooltip"), d(M, "SELECTOR", '[data-fc-type="tooltip"]'), d(M, "EVENTS", {
  show: "fc.tooltip.show",
  shown: "fc.tooltip.shown",
  hide: "fc.tooltip.hide",
  hidden: "fc.tooltip.hidden"
}), d(M, "DEFAULT", {
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
const A = class extends I {
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
    this._element != null && (this._targetElement = this.getTargetElement(), (t = this._targetElement) == null || t.classList.add(A.DEFAULT.class.base), this.initOptions(), this.initListener());
  }
  initOptions() {
    var r, l, a;
    let t = (r = this._element) == null ? void 0 : r.getAttribute(A.DEFAULT.attr.scroll);
    t ? this.config.scroll = t !== "false" : this.config.scroll == null && (this.config.scroll = !1);
    let n = (l = this._element) == null ? void 0 : l.getAttribute(A.DEFAULT.attr.backdrop);
    n ? this.config.backdrop = n !== "false" : this.config.backdrop == null && (this.config.backdrop = !0);
    let s = (a = this._element) == null ? void 0 : a.getAttribute(A.DEFAULT.attr.behavior);
    s ? this.config.behavior = s == "static" ? "static" : "default" : this.config.behavior == null && (this.config.behavior = "default");
  }
  initListener() {
    var t;
    this._element != null && (this._element.addEventListener("click", () => {
      this.toggle();
    }), (t = this._targetElement) == null || t.querySelectorAll(`[${A.DEFAULT.attr.dismiss}]`).forEach((n) => {
      n.addEventListener("click", () => {
        this.hide();
      });
    }), gt.listenOverlayClick(() => {
      this.isStatic || this.hide();
    }));
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(A.DEFAULT.class.hidden));
  }
  get isStatic() {
    return this.config.behavior === "static";
  }
  show() {
    if (this.dispatchEvent(A.EVENTS.show), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(A.DEFAULT.class.hidden), this._element.classList.add(A.DEFAULT.class.open), this.config.backdrop && v.showOverlay(), setTimeout(() => {
      this._targetElement.classList.add(A.DEFAULT.class.open);
    }, 1), !this.config.scroll)) {
      const t = document.documentElement.clientWidth;
      document.body.style.paddingRight = Math.abs(window.innerWidth - t) + "px", document.body.classList.add("overflow-hidden");
    }
    window.addEventListener("keydown", this.keyListener), this.dispatchEvent(A.EVENTS.shown);
  }
  hide() {
    var t;
    this.isShown && (this.dispatchEvent(A.EVENTS.hide), this._targetElement != null && this.isShown && ((t = this._element) == null || t.classList.remove(A.DEFAULT.class.open), this._targetElement.classList.remove(A.DEFAULT.class.open), gt.afterTransition(this._targetElement, () => {
      this._targetElement.classList.add(A.DEFAULT.class.hidden), this.config.backdrop && v.hideOverlay();
    }), this.config.scroll || (document.body.classList.remove("overflow-hidden"), Object.assign(document.body.style, {
      paddingRight: null
    }))), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(A.EVENTS.hidden));
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(A.DEFAULT.attr.target);
    return typeof t == "string" ? v.findOrById(t) : t instanceof HTMLElement ? t : v.nextElementSibling(this._element);
  }
};
let j = A;
d(j, "type", "offcanvas"), d(j, "SELECTOR", '[data-fc-type="offcanvas"]'), d(j, "EVENTS", {
  show: "fc.offcanvas.show",
  shown: "fc.offcanvas.shown",
  hide: "fc.offcanvas.hide",
  hidden: "fc.offcanvas.hidden"
}), d(j, "DEFAULT", {
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
const it = class extends I {
  constructor(t, n) {
    super(t, n);
    d(this, "_targetElement", null);
    this.init();
  }
  init() {
    this._element != null && (this._targetElement = this._getTargetElement()), this._targetElement && this.initListener();
  }
  initListener() {
    this._element.addEventListener("click", () => {
      this.hide();
    });
  }
  hide() {
    this.dispatchEvent(it.EVENTS.hide), this._targetElement != null && this._targetElement.classList.add(it.DEFAULT.class.hidden), this.dispatchEvent(it.EVENTS.hidden);
  }
  _getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(it.DEFAULT.attr.target);
    return typeof t == "string" ? v.findOrById(t) : t instanceof HTMLElement ? t : this._element.parentElement;
  }
};
let q = it;
d(q, "type", "dismissable"), d(q, "SELECTOR", "[data-fc-dismiss]"), d(q, "EVENTS", {
  hide: "fc.dismissable.hide",
  hidden: "fc.dismissable.hidden"
}), d(q, "DEFAULT", {
  class: {
    hidden: "hidden"
  },
  attr: {
    target: "data-fc-dismiss"
  }
});
function Jt() {
  [O, Q, W, Z, B, j, M, q].map((e) => v.findAll(e.SELECTOR).forEach((i) => e.getInstanceOrCreate(i)));
}
const Ee = {
  autoAwake: Jt,
  Collapse: O,
  Accordion: Q,
  Dropdown: W,
  Tooltip: M,
  Modal: B,
  Offcanvas: j,
  Dismissable: q,
  Tab: Z
};
typeof window < "u" && (window.frost = Ee, v.addOverlay(["transition-all", "fixed", "inset-0", "z-40", "bg-gray-900", "bg-opacity-50", "dark:bg-opacity-80"]), Jt());
export {
  Q as Accordion,
  O as Collapse,
  q as Dismissable,
  W as Dropdown,
  B as Modal,
  j as Offcanvas,
  Z as Tab,
  M as Tooltip,
  Jt as autoAwake
};
