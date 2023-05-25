var re = Object.defineProperty;
var oe = (e, i, t) => i in e ? re(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var o = (e, i, t) => (oe(e, typeof i != "symbol" ? i + "" : i, t), t);
const ht = /* @__PURE__ */ new Map(), St = {
  set(e, i, t) {
    ht.has(e) || ht.set(e, /* @__PURE__ */ new Map()), ht.get(e).set(i, t);
  },
  get(e, i) {
    var t;
    return ((t = ht.get(e)) == null ? void 0 : t.get(i)) || null;
  },
  remove(e, i) {
    var t;
    return ((t = ht.get(e)) == null ? void 0 : t.delete(i)) || !0;
  }
}, nt = /* @__PURE__ */ new Map(), Ft = {
  addListener(e, i, t) {
    nt.has(e) || nt.set(e, /* @__PURE__ */ new Map());
    const s = nt.get(e);
    let n = s.get(i);
    n == null && (n = []), n.push(t), s.set(i, n);
  },
  removeListener(e, i, t) {
    if (!nt.has(e))
      return;
    const s = nt.get(e);
    let n = s.get(i);
    n != null && (n = n.filter((a) => a != t), s.set(i, n));
  },
  getCallbacks(e, i) {
    var t;
    return ((t = nt.get(e)) == null ? void 0 : t.get(i)) ?? [];
  }
}, p = {
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
  },
  getAttribute(e, i, t = null) {
    return e.hasAttribute(i) ? e.getAttribute(i) : t;
  }
};
class I {
  constructor(i, t) {
    o(this, "_element");
    o(this, "_destroyed", !1);
    o(this, "_config", {});
    typeof i == "string" ? this._element = p.findOrById(i) : this._element = i, this._config = t ?? {}, this._element != null && St.set(this.constructor.type, this._element, this);
  }
  get config() {
    return this._config ?? {};
  }
  static getInstance(i) {
    return i == null ? null : St.get(this.type, i);
  }
  static getInstanceOrCreate(i, t) {
    if (i == null)
      return null;
    const s = this.getInstance(i);
    return s ?? new this(i, t);
  }
  addEventListener(i, t) {
    Ft.addListener(this, i, t);
  }
  removeEventListener(i, t) {
    Ft.removeListener(this, i, t);
  }
  dispatchEvent(i) {
    Ft.getCallbacks(this, i).forEach((t) => t());
  }
  destroy() {
    this._destroyed = !0, this._element != null && St.remove(this.constructor.type, this._element);
  }
}
o(I, "type", "");
const Lt = {
  addAfterEvent(e, i, t) {
    const s = (n) => {
      i(n), e.removeEventListener(t, s, !0);
    };
    e.addEventListener(t, s, !0);
  },
  afterTransition(e, i) {
    window.getComputedStyle(e, null).getPropertyValue("transition-duration") !== "0s" ? this.addAfterEvent(e, i, "transitionend") : i();
  },
  isMouseEventWithinElement(e, i) {
    const t = {
      x: i.pageX,
      y: i.pageY
    }, s = e.getBoundingClientRect();
    return t.x < s.right && t.x > s.left && t.y < s.bottom && t.y > s.top;
  },
  listenOverlayClick(e) {
    var i;
    (i = p.getOverlay()) == null || i.addEventListener("click", e);
  }
}, S = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "_targetElement", null);
    this.init();
  }
  init() {
    this._element != null && (this._element.classList.add(S.DEFAULT.class.base), this._targetElement = this.getTargetElement()), this.initOptions(), this.initListener();
  }
  initOptions() {
    this._targetElement != null && !this._targetElement.classList.contains(S.DEFAULT.class.hidden) && this._element.classList.add(S.DEFAULT.class.open), this.config.toggle && this.toggle();
  }
  initListener() {
    this._element.addEventListener("click", () => {
      this.toggle();
    });
  }
  get isShown() {
    var t;
    return ((t = this._element) == null ? void 0 : t.classList.contains(S.DEFAULT.class.open)) ?? !1;
  }
  show() {
    this._destroyed || (this.dispatchEvent(S.EVENTS.show), this._targetElement != null && this._element != null && (this._element.classList.add(S.DEFAULT.class.open), this._targetElement.classList.remove(S.DEFAULT.class.hidden), this._targetElement.style.height = "0px", this._targetElement.style.height = `${this._targetElement.scrollHeight}px`, Lt.afterTransition(this._targetElement, () => {
      this.isShown && (this._targetElement.style.height = "");
    })), this.dispatchEvent(S.EVENTS.shown));
  }
  hide() {
    this._destroyed || (this.dispatchEvent(S.EVENTS.hide), this._targetElement != null && this._element != null && (this._element.classList.remove(S.DEFAULT.class.open), this._targetElement.style.height = `${this._targetElement.scrollHeight}px`, Lt.afterTransition(this._targetElement, () => {
      this.isShown || (this._targetElement.classList.add(S.DEFAULT.class.hidden), this._targetElement.style.height = "");
    }), setTimeout(() => {
      this._targetElement.style.height = "0px";
    })), this.dispatchEvent(S.EVENTS.hidden));
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(S.DEFAULT.attr.target);
    return typeof t == "string" ? p.findOrById(t) : t instanceof HTMLElement ? t : p.nextElementSibling(this._element);
  }
};
let C = S;
o(C, "type", "collapse"), o(C, "SELECTOR", '[data-fc-type="collapse"]'), o(C, "EVENTS", {
  show: "fc.collapse.show",
  shown: "fc.collapse.shown",
  hide: "fc.collapse.hide",
  hidden: "fc.collapse.hidden"
}), o(C, "DEFAULT", {
  class: {
    base: "fc-collapse",
    hidden: "hidden",
    open: "open"
  },
  attr: {
    target: "data-fc-target"
  }
});
const Tt = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "targetCollapses", []);
    this.init();
  }
  init() {
    if (this._element != null) {
      const t = p.findAllInElement(this._element, C.SELECTOR);
      let s = !1;
      for (let n of t)
        if (n.hasAttribute(Tt.DEFAULT.attr.parent)) {
          s = !0;
          break;
        }
      if (!s)
        this.targetCollapses = t.map((n) => C.getInstanceOrCreate(n));
      else {
        const n = this._element.id;
        this.targetCollapses = t.filter((a) => a.getAttribute(Tt.DEFAULT.attr.parent) == n).map((a) => C.getInstanceOrCreate(a));
      }
      this.initListeners();
    }
  }
  initListeners() {
    this.targetCollapses.forEach((t) => {
      t.addEventListener(C.EVENTS.show, () => {
        this._destroyed || this.targetCollapses.filter((s) => s != t).forEach((s) => s.hide());
      });
    });
  }
};
let Z = Tt;
o(Z, "type", "accordion"), o(Z, "SELECTOR", '[data-fc-type="accordion"]'), o(Z, "DEFAULT", {
  attr: {
    parent: "data-fc-parent"
  }
});
function gt(e) {
  return e.split("-")[1];
}
function Rt(e) {
  return e === "y" ? "height" : "width";
}
function st(e) {
  return e.split("-")[0];
}
function ut(e) {
  return ["top", "bottom"].includes(st(e)) ? "x" : "y";
}
function Ht(e, i, t) {
  let { reference: s, floating: n } = e;
  const a = s.x + s.width / 2 - n.width / 2, l = s.y + s.height / 2 - n.height / 2, r = ut(i), d = Rt(r), h = s[d] / 2 - n[d] / 2, f = r === "x";
  let c;
  switch (st(i)) {
    case "top":
      c = { x: a, y: s.y - n.height };
      break;
    case "bottom":
      c = { x: a, y: s.y + s.height };
      break;
    case "right":
      c = { x: s.x + s.width, y: l };
      break;
    case "left":
      c = { x: s.x - n.width, y: l };
      break;
    default:
      c = { x: s.x, y: s.y };
  }
  switch (gt(i)) {
    case "start":
      c[r] -= h * (t && f ? -1 : 1);
      break;
    case "end":
      c[r] += h * (t && f ? -1 : 1);
  }
  return c;
}
const ce = async (e, i, t) => {
  const { placement: s = "bottom", strategy: n = "absolute", middleware: a = [], platform: l } = t, r = a.filter(Boolean), d = await (l.isRTL == null ? void 0 : l.isRTL(i));
  let h = await l.getElementRects({ reference: e, floating: i, strategy: n }), { x: f, y: c } = Ht(h, s, d), m = s, g = {}, E = 0;
  for (let u = 0; u < r.length; u++) {
    const { name: L, fn: w } = r[u], { x: y, y: b, data: D, reset: k } = await w({ x: f, y: c, initialPlacement: s, placement: m, strategy: n, middlewareData: g, rects: h, platform: l, elements: { reference: e, floating: i } });
    f = y ?? f, c = b ?? c, g = { ...g, [L]: { ...g[L], ...D } }, k && E <= 50 && (E++, typeof k == "object" && (k.placement && (m = k.placement), k.rects && (h = k.rects === !0 ? await l.getElementRects({ reference: e, floating: i, strategy: n }) : k.rects), { x: f, y: c } = Ht(h, m, d)), u = -1);
  }
  return { x: f, y: c, placement: m, strategy: n, middlewareData: g };
};
function qt(e) {
  return typeof e != "number" ? function(i) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...i };
  }(e) : { top: e, right: e, bottom: e, left: e };
}
function yt(e) {
  return { ...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
}
async function zt(e, i) {
  var t;
  i === void 0 && (i = {});
  const { x: s, y: n, platform: a, rects: l, elements: r, strategy: d } = e, { boundary: h = "clippingAncestors", rootBoundary: f = "viewport", elementContext: c = "floating", altBoundary: m = !1, padding: g = 0 } = i, E = qt(g), u = r[m ? c === "floating" ? "reference" : "floating" : c], L = yt(await a.getClippingRect({ element: (t = await (a.isElement == null ? void 0 : a.isElement(u))) == null || t ? u : u.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(r.floating)), boundary: h, rootBoundary: f, strategy: d })), w = c === "floating" ? { ...l.floating, x: s, y: n } : l.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(r.floating)), b = await (a.isElement == null ? void 0 : a.isElement(y)) && await (a.getScale == null ? void 0 : a.getScale(y)) || { x: 1, y: 1 }, D = yt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: w, offsetParent: y, strategy: d }) : w);
  return { top: (L.top - D.top + E.top) / b.y, bottom: (D.bottom - L.bottom + E.bottom) / b.y, left: (L.left - D.left + E.left) / b.x, right: (D.right - L.right + E.right) / b.x };
}
const he = Math.min, de = Math.max;
function Ut(e, i, t) {
  return de(e, he(i, t));
}
const fe = (e) => ({ name: "arrow", options: e, async fn(i) {
  const { element: t, padding: s = 0 } = e || {}, { x: n, y: a, placement: l, rects: r, platform: d, elements: h } = i;
  if (t == null)
    return {};
  const f = qt(s), c = { x: n, y: a }, m = ut(l), g = Rt(m), E = await d.getDimensions(t), u = m === "y", L = u ? "top" : "left", w = u ? "bottom" : "right", y = u ? "clientHeight" : "clientWidth", b = r.reference[g] + r.reference[m] - c[m] - r.floating[g], D = c[m] - r.reference[m], k = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(t));
  let H = k ? k[y] : 0;
  H && await (d.isElement == null ? void 0 : d.isElement(k)) || (H = h.floating[y] || r.floating[g]);
  const Y = b / 2 - D / 2, G = f[L], ot = H - E[g] - f[w], V = H / 2 - E[g] / 2 + Y, A = Ut(G, V, ot), R = gt(l) != null && V != A && r.reference[g] / 2 - (V < G ? f[L] : f[w]) - E[g] / 2 < 0;
  return { [m]: c[m] - (R ? V < G ? G - V : ot - V : 0), data: { [m]: A, centerOffset: V - A } };
} }), me = ["top", "right", "bottom", "left"];
me.reduce((e, i) => e.concat(i, i + "-start", i + "-end"), []);
const ge = { left: "right", right: "left", bottom: "top", top: "bottom" };
function wt(e) {
  return e.replace(/left|right|bottom|top/g, (i) => ge[i]);
}
function ue(e, i, t) {
  t === void 0 && (t = !1);
  const s = gt(e), n = ut(e), a = Rt(n);
  let l = n === "x" ? s === (t ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return i.reference[a] > i.floating[a] && (l = wt(l)), { main: l, cross: wt(l) };
}
const Ee = { start: "end", end: "start" };
function Dt(e) {
  return e.replace(/start|end/g, (i) => Ee[i]);
}
const pe = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(i) {
    var t;
    const { placement: s, middlewareData: n, rects: a, initialPlacement: l, platform: r, elements: d } = i, { mainAxis: h = !0, crossAxis: f = !0, fallbackPlacements: c, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: g = "none", flipAlignment: E = !0, ...u } = e, L = st(s), w = st(l) === l, y = await (r.isRTL == null ? void 0 : r.isRTL(d.floating)), b = c || (w || !E ? [wt(l)] : function(A) {
      const R = wt(A);
      return [Dt(A), R, Dt(R)];
    }(l));
    c || g === "none" || b.push(...function(A, R, Q, B) {
      const M = gt(A);
      let O = function(ct, kt, ne) {
        const $t = ["left", "right"], It = ["right", "left"], le = ["top", "bottom"], ae = ["bottom", "top"];
        switch (ct) {
          case "top":
          case "bottom":
            return ne ? kt ? It : $t : kt ? $t : It;
          case "left":
          case "right":
            return kt ? le : ae;
          default:
            return [];
        }
      }(st(A), Q === "start", B);
      return M && (O = O.map((ct) => ct + "-" + M), R && (O = O.concat(O.map(Dt)))), O;
    }(l, E, g, y));
    const D = [l, ...b], k = await zt(i, u), H = [];
    let Y = ((t = n.flip) == null ? void 0 : t.overflows) || [];
    if (h && H.push(k[L]), f) {
      const { main: A, cross: R } = ue(s, a, y);
      H.push(k[A], k[R]);
    }
    if (Y = [...Y, { placement: s, overflows: H }], !H.every((A) => A <= 0)) {
      var G, ot;
      const A = (((G = n.flip) == null ? void 0 : G.index) || 0) + 1, R = D[A];
      if (R)
        return { data: { index: A, overflows: Y }, reset: { placement: R } };
      let Q = (ot = Y.filter((B) => B.overflows[0] <= 0).sort((B, M) => B.overflows[1] - M.overflows[1])[0]) == null ? void 0 : ot.placement;
      if (!Q)
        switch (m) {
          case "bestFit": {
            var V;
            const B = (V = Y.map((M) => [M.placement, M.overflows.filter((O) => O > 0).reduce((O, ct) => O + ct, 0)]).sort((M, O) => M[1] - O[1])[0]) == null ? void 0 : V[0];
            B && (Q = B);
            break;
          }
          case "initialPlacement":
            Q = l;
        }
      if (s !== Q)
        return { reset: { placement: Q } };
    }
    return {};
  } };
}, Jt = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(i) {
    const { x: t, y: s } = i, n = await async function(a, l) {
      const { placement: r, platform: d, elements: h } = a, f = await (d.isRTL == null ? void 0 : d.isRTL(h.floating)), c = st(r), m = gt(r), g = ut(r) === "x", E = ["left", "top"].includes(c) ? -1 : 1, u = f && g ? -1 : 1, L = typeof l == "function" ? l(a) : l;
      let { mainAxis: w, crossAxis: y, alignmentAxis: b } = typeof L == "number" ? { mainAxis: L, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...L };
      return m && typeof b == "number" && (y = m === "end" ? -1 * b : b), g ? { x: y * u, y: w * E } : { x: w * E, y: y * u };
    }(i, e);
    return { x: t + n.x, y: s + n.y, data: n };
  } };
};
function Le(e) {
  return e === "x" ? "y" : "x";
}
const ye = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(i) {
    const { x: t, y: s, placement: n } = i, { mainAxis: a = !0, crossAxis: l = !1, limiter: r = { fn: (L) => {
      let { x: w, y } = L;
      return { x: w, y };
    } }, ...d } = e, h = { x: t, y: s }, f = await zt(i, d), c = ut(st(n)), m = Le(c);
    let g = h[c], E = h[m];
    if (a) {
      const L = c === "y" ? "bottom" : "right";
      g = Ut(g + f[c === "y" ? "top" : "left"], g, g - f[L]);
    }
    if (l) {
      const L = m === "y" ? "bottom" : "right";
      E = Ut(E + f[m === "y" ? "top" : "left"], E, E - f[L]);
    }
    const u = r.fn({ ...i, [c]: g, [m]: E });
    return { ...u, data: { x: u.x - t, y: u.y - s } };
  } };
};
function U(e) {
  var i;
  return ((i = e.ownerDocument) == null ? void 0 : i.defaultView) || window;
}
function $(e) {
  return U(e).getComputedStyle(e);
}
function Kt(e) {
  return e instanceof U(e).Node;
}
function X(e) {
  return Kt(e) ? (e.nodeName || "").toLowerCase() : "";
}
let Et;
function Xt() {
  if (Et)
    return Et;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (Et = e.brands.map((i) => i.brand + "/" + i.version).join(" "), Et) : navigator.userAgent;
}
function N(e) {
  return e instanceof U(e).HTMLElement;
}
function J(e) {
  return e instanceof U(e).Element;
}
function Mt(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof U(e).ShadowRoot || e instanceof ShadowRoot;
}
function _t(e) {
  const { overflow: i, overflowX: t, overflowY: s, display: n } = $(e);
  return /auto|scroll|overlay|hidden|clip/.test(i + s + t) && !["inline", "contents"].includes(n);
}
function we(e) {
  return ["table", "td", "th"].includes(X(e));
}
function Ot(e) {
  const i = /firefox/i.test(Xt()), t = $(e), s = t.backdropFilter || t.WebkitBackdropFilter;
  return t.transform !== "none" || t.perspective !== "none" || !!s && s !== "none" || i && t.willChange === "filter" || i && !!t.filter && t.filter !== "none" || ["transform", "perspective"].some((n) => t.willChange.includes(n)) || ["paint", "layout", "strict", "content"].some((n) => {
    const a = t.contain;
    return a != null && a.includes(n);
  });
}
function Ct() {
  return /^((?!chrome|android).)*safari/i.test(Xt());
}
function Nt(e) {
  return ["html", "body", "#document"].includes(X(e));
}
const Bt = Math.min, dt = Math.max, vt = Math.round;
function Yt(e) {
  const i = $(e);
  let t = parseFloat(i.width), s = parseFloat(i.height);
  const n = N(e), a = n ? e.offsetWidth : t, l = n ? e.offsetHeight : s, r = vt(t) !== a || vt(s) !== l;
  return r && (t = a, s = l), { width: t, height: s, fallback: r };
}
function Gt(e) {
  return J(e) ? e : e.contextElement;
}
const Qt = { x: 1, y: 1 };
function rt(e) {
  const i = Gt(e);
  if (!N(i))
    return Qt;
  const t = i.getBoundingClientRect(), { width: s, height: n, fallback: a } = Yt(i);
  let l = (a ? vt(t.width) : t.width) / s, r = (a ? vt(t.height) : t.height) / n;
  return l && Number.isFinite(l) || (l = 1), r && Number.isFinite(r) || (r = 1), { x: l, y: r };
}
function ft(e, i, t, s) {
  var n, a;
  i === void 0 && (i = !1), t === void 0 && (t = !1);
  const l = e.getBoundingClientRect(), r = Gt(e);
  let d = Qt;
  i && (s ? J(s) && (d = rt(s)) : d = rt(e));
  const h = r ? U(r) : window, f = Ct() && t;
  let c = (l.left + (f && ((n = h.visualViewport) == null ? void 0 : n.offsetLeft) || 0)) / d.x, m = (l.top + (f && ((a = h.visualViewport) == null ? void 0 : a.offsetTop) || 0)) / d.y, g = l.width / d.x, E = l.height / d.y;
  if (r) {
    const u = U(r), L = s && J(s) ? U(s) : s;
    let w = u.frameElement;
    for (; w && s && L !== u; ) {
      const y = rt(w), b = w.getBoundingClientRect(), D = getComputedStyle(w);
      b.x += (w.clientLeft + parseFloat(D.paddingLeft)) * y.x, b.y += (w.clientTop + parseFloat(D.paddingTop)) * y.y, c *= y.x, m *= y.y, g *= y.x, E *= y.y, c += b.x, m += b.y, w = U(w).frameElement;
    }
  }
  return yt({ width: g, height: E, x: c, y: m });
}
function K(e) {
  return ((Kt(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function At(e) {
  return J(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Zt(e) {
  return ft(K(e)).left + At(e).scrollLeft;
}
function mt(e) {
  if (X(e) === "html")
    return e;
  const i = e.assignedSlot || e.parentNode || Mt(e) && e.host || K(e);
  return Mt(i) ? i.host : i;
}
function te(e) {
  const i = mt(e);
  return Nt(i) ? i.ownerDocument.body : N(i) && _t(i) ? i : te(i);
}
function ee(e, i) {
  var t;
  i === void 0 && (i = []);
  const s = te(e), n = s === ((t = e.ownerDocument) == null ? void 0 : t.body), a = U(s);
  return n ? i.concat(a, a.visualViewport || [], _t(s) ? s : []) : i.concat(s, ee(s));
}
function Pt(e, i, t) {
  let s;
  if (i === "viewport")
    s = function(l, r) {
      const d = U(l), h = K(l), f = d.visualViewport;
      let c = h.clientWidth, m = h.clientHeight, g = 0, E = 0;
      if (f) {
        c = f.width, m = f.height;
        const u = Ct();
        (!u || u && r === "fixed") && (g = f.offsetLeft, E = f.offsetTop);
      }
      return { width: c, height: m, x: g, y: E };
    }(e, t);
  else if (i === "document")
    s = function(l) {
      const r = K(l), d = At(l), h = l.ownerDocument.body, f = dt(r.scrollWidth, r.clientWidth, h.scrollWidth, h.clientWidth), c = dt(r.scrollHeight, r.clientHeight, h.scrollHeight, h.clientHeight);
      let m = -d.scrollLeft + Zt(l);
      const g = -d.scrollTop;
      return $(h).direction === "rtl" && (m += dt(r.clientWidth, h.clientWidth) - f), { width: f, height: c, x: m, y: g };
    }(K(e));
  else if (J(i))
    s = function(l, r) {
      const d = ft(l, !0, r === "fixed"), h = d.top + l.clientTop, f = d.left + l.clientLeft, c = N(l) ? rt(l) : { x: 1, y: 1 };
      return { width: l.clientWidth * c.x, height: l.clientHeight * c.y, x: f * c.x, y: h * c.y };
    }(i, t);
  else {
    const l = { ...i };
    if (Ct()) {
      var n, a;
      const r = U(e);
      l.x -= ((n = r.visualViewport) == null ? void 0 : n.offsetLeft) || 0, l.y -= ((a = r.visualViewport) == null ? void 0 : a.offsetTop) || 0;
    }
    s = l;
  }
  return yt(s);
}
function Wt(e, i) {
  return N(e) && $(e).position !== "fixed" ? i ? i(e) : e.offsetParent : null;
}
function jt(e, i) {
  const t = U(e);
  if (!N(e))
    return t;
  let s = Wt(e, i);
  for (; s && we(s) && $(s).position === "static"; )
    s = Wt(s, i);
  return s && (X(s) === "html" || X(s) === "body" && $(s).position === "static" && !Ot(s)) ? t : s || function(n) {
    let a = mt(n);
    for (; N(a) && !Nt(a); ) {
      if (Ot(a))
        return a;
      a = mt(a);
    }
    return null;
  }(e) || t;
}
function ve(e, i, t) {
  const s = N(i), n = K(i), a = ft(e, !0, t === "fixed", i);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const r = { x: 0, y: 0 };
  if (s || !s && t !== "fixed")
    if ((X(i) !== "body" || _t(n)) && (l = At(i)), N(i)) {
      const d = ft(i, !0);
      r.x = d.x + i.clientLeft, r.y = d.y + i.clientTop;
    } else
      n && (r.x = Zt(n));
  return { x: a.left + l.scrollLeft - r.x, y: a.top + l.scrollTop - r.y, width: a.width, height: a.height };
}
const Te = { getClippingRect: function(e) {
  let { element: i, boundary: t, rootBoundary: s, strategy: n } = e;
  const a = t === "clippingAncestors" ? function(h, f) {
    const c = f.get(h);
    if (c)
      return c;
    let m = ee(h).filter((L) => J(L) && X(L) !== "body"), g = null;
    const E = $(h).position === "fixed";
    let u = E ? mt(h) : h;
    for (; J(u) && !Nt(u); ) {
      const L = $(u), w = Ot(u);
      L.position === "fixed" && (g = null), (E ? w || g : w || L.position !== "static" || !g || !["absolute", "fixed"].includes(g.position)) ? g = L : m = m.filter((y) => y !== u), u = mt(u);
    }
    return f.set(h, m), m;
  }(i, this._c) : [].concat(t), l = [...a, s], r = l[0], d = l.reduce((h, f) => {
    const c = Pt(i, f, n);
    return h.top = dt(c.top, h.top), h.right = Bt(c.right, h.right), h.bottom = Bt(c.bottom, h.bottom), h.left = dt(c.left, h.left), h;
  }, Pt(i, r, n));
  return { width: d.right - d.left, height: d.bottom - d.top, x: d.left, y: d.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: i, offsetParent: t, strategy: s } = e;
  const n = N(t), a = K(t);
  if (t === a)
    return i;
  let l = { scrollLeft: 0, scrollTop: 0 }, r = { x: 1, y: 1 };
  const d = { x: 0, y: 0 };
  if ((n || !n && s !== "fixed") && ((X(t) !== "body" || _t(a)) && (l = At(t)), N(t))) {
    const h = ft(t);
    r = rt(t), d.x = h.x + t.clientLeft, d.y = h.y + t.clientTop;
  }
  return { width: i.width * r.x, height: i.height * r.y, x: i.x * r.x - l.scrollLeft * r.x + d.x, y: i.y * r.y - l.scrollTop * r.y + d.y };
}, isElement: J, getDimensions: function(e) {
  return Yt(e);
}, getOffsetParent: jt, getDocumentElement: K, getScale: rt, async getElementRects(e) {
  let { reference: i, floating: t, strategy: s } = e;
  const n = this.getOffsetParent || jt, a = this.getDimensions;
  return { reference: ve(i, await n(t), s), floating: { x: 0, y: 0, ...await a(t) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => $(e).direction === "rtl" }, ie = (e, i, t) => {
  const s = /* @__PURE__ */ new Map(), n = { platform: Te, ...t }, a = { ...n.platform, _c: s };
  return ce(e, i, { ...n, platform: a });
}, T = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "_targetElement", null);
    o(this, "clicked", !1);
    o(this, "_targetOffset", 4);
    o(this, "_placement", null);
    o(this, "_trigger", null);
    o(this, "_autoclose", null);
    o(this, "keyListener", (t) => {
      t.key == "Escape" && this.hide();
    });
    this.init();
  }
  get isShown() {
    var t;
    return ((t = this._targetElement) == null ? void 0 : t.classList.contains(T.DEFAULT.class.hidden)) === !1;
  }
  get isHover() {
    return this._trigger === "hover";
  }
  show() {
    this.dispatchEvent(T.EVENTS.show), this.addComputePositionInTargetElement(), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(T.DEFAULT.class.hidden), setTimeout(() => {
      this._element.classList.add(T.DEFAULT.class.open), this._targetElement.classList.add(T.DEFAULT.class.open);
    }, 1)), window.addEventListener("keydown", this.keyListener), this.dispatchEvent(T.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(T.EVENTS.hide), this.clicked = !1, this._targetElement != null && ((t = this._element) == null || t.classList.remove(T.DEFAULT.class.open), this._targetElement.classList.remove(T.DEFAULT.class.open), this._targetElement.classList.add(T.DEFAULT.class.hidden)), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(T.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  init() {
    this._element != null && (this._targetElement = this.getTargetElement(), this.initOptions(), this.initListener());
  }
  initOptions() {
    var t, s, n, a;
    if ((t = this._element) == null || t.classList.add(T.DEFAULT.class.base), (s = this._targetElement) == null || s.classList.add(T.DEFAULT.class.base), this._placement = p.getAttribute(this._element, T.DEFAULT.attr.placement, this.config.placement), this._trigger = p.getAttribute(this._element, T.DEFAULT.attr.trigger, this.config.trigger ?? "click"), this._autoclose = p.getAttribute(this._element, T.DEFAULT.attr.autoclose, this.config.autoclose ?? "both"), ((n = this._targetElement) == null ? void 0 : n.classList.contains(T.DEFAULT.class.hidden)) === !1 && this.show(), (a = this._element) != null && a.hasAttribute(T.DEFAULT.attr.offset)) {
      const l = this._element.getAttribute(T.DEFAULT.attr.offset);
      isNaN(parseInt(l)) || (this._targetOffset = parseInt(l));
    }
  }
  initListener() {
    var t, s;
    (t = this._element) == null || t.addEventListener("click", () => {
      this._destroyed || (this.isHover ? (this.clicked ? this.hide() : this.show(), this.clicked = !this.clicked) : this.toggle());
    }), this.isHover && ((s = this._element) == null || s.addEventListener("mouseover", () => {
      this.show();
    }), window.addEventListener("mousemove", (n) => {
      this._destroyed || this._targetElement != null && this._element != null && n.target instanceof HTMLElement && !this.clicked && !p.isElementSameOrContains(this._targetElement, n.target) && !p.isElementSameOrContains(this._element, n.target) && this.hide();
    })), window.addEventListener("click", (n) => {
      if (!this._destroyed && this._targetElement != null && this._element != null && n.target instanceof HTMLElement) {
        if (p.isElementSameOrContains(this._element, n.target))
          return;
        const a = p.isElementSameOrContains(this._targetElement, n.target);
        (this._autoclose == "outside" && !a || this._autoclose == "inside" && a || this._autoclose == "both") && this.hide();
      }
    });
  }
  addComputePositionInTargetElement() {
    const t = [Jt(this._targetOffset)];
    this._element != null && this._targetElement != null && (this._targetElement.classList.add("absolute"), ie(this._element, this._targetElement, {
      placement: this._placement ?? "bottom-start",
      middleware: t
    }).then(({ x: s, y: n }) => {
      this._targetElement != null && Object.assign(this._targetElement.style, {
        left: `${s}px`,
        top: `${n}px`
      });
    }));
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this._element.getAttribute(T.DEFAULT.attr.target), s = this.config.target ?? t;
    return typeof s == "string" ? p.findOrById(s) : s instanceof HTMLElement ? s : p.nextElementSibling(this._element);
  }
};
let P = T;
o(P, "type", "dropdown"), o(P, "SELECTOR", '[data-fc-type="dropdown"]'), o(P, "EVENTS", {
  show: "fc.dropdown.show",
  shown: "fc.dropdown.shown",
  hide: "fc.dropdown.hide",
  hidden: "fc.dropdown.hidden"
}), o(P, "DEFAULT", {
  class: {
    base: "fc-dropdown",
    hidden: "hidden",
    open: "open"
  },
  attr: {
    target: "data-fc-target",
    placement: "data-fc-placement",
    trigger: "data-fc-trigger",
    offset: "data-fc-offset",
    autoclose: "data-fc-autoclose"
  }
});
const Vt = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "_elements", /* @__PURE__ */ new Map());
    this.init();
  }
  init() {
    if (this._element != null) {
      const t = /* @__PURE__ */ new Map(), s = this._element.querySelectorAll("[data-fc-target]");
      for (const n of s) {
        const a = n.getAttribute(Vt.DEFAULT.attr.target);
        if (a != null) {
          const l = p.findOrById(a);
          l != null && t.set(n, l);
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
    const s = this._elements.get(t), n = Array.from(this._elements.keys()).filter((l) => l != t), a = n.map((l) => this._elements.get(l));
    s == null || s.classList.remove("hidden"), a.forEach((l) => l.classList.add("hidden")), s == null || s.classList.add("active"), t.classList.add("active"), a.forEach((l) => l.classList.remove("active")), n.forEach((l) => l.classList.remove("active"));
  }
};
let tt = Vt;
o(tt, "type", "tab"), o(tt, "SELECTOR", '[data-fc-type="tab"]'), o(tt, "DEFAULT", {
  attr: {
    target: "data-fc-target"
  }
});
const x = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "_targetElement", null);
    o(this, "_windowClickListen", !1);
    o(this, "keyListener", (t) => {
      t.key == "Escape" && !this.isStatic && this.hide();
    });
    o(this, "onWindowClicked", (t) => {
      !this.isStatic && t.target instanceof HTMLElement && this._targetElement && this.isShown && (p.isElementContains(this._targetElement, t.target) || this.hide());
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
    var s;
    let t = (s = this._element) == null ? void 0 : s.getAttribute(x.DEFAULT.attr.behavior);
    t ? this.config.behavior = t == "static" ? "static" : "default" : this.config.behavior == null && (this.config.behavior = "default");
  }
  initListener() {
    var t;
    this._element != null && (this._element.addEventListener("click", () => {
      this.toggle();
    }), (t = this._targetElement) == null || t.querySelectorAll(`[${x.DEFAULT.attr.dismiss}]`).forEach((s) => {
      s.addEventListener("click", () => {
        this.hide();
      });
    }));
  }
  show() {
    if (this.dispatchEvent(x.EVENTS.show), this._targetElement != null && this._element != null) {
      const t = document.documentElement.clientWidth;
      document.body.style.paddingRight = Math.abs(window.innerWidth - t) + "px", document.body.classList.add(x.DEFAULT.class.overflowHidden), this._element.classList.add(x.DEFAULT.class.open), this._targetElement.classList.remove(x.DEFAULT.class.hidden), setTimeout(() => {
        this._targetElement.classList.add(x.DEFAULT.class.open), p.showOverlay(), this._windowClickListen || (window.addEventListener("click", this.onWindowClicked), this._windowClickListen = !0);
      }, 1);
    }
    window.addEventListener("keydown", this.keyListener), this.dispatchEvent(x.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(x.EVENTS.hide), this._targetElement != null && this.isShown && (document.body.classList.remove(x.DEFAULT.class.overflowHidden), (t = this._element) == null || t.classList.remove(x.DEFAULT.class.open), this._targetElement.classList.remove(x.DEFAULT.class.open), Object.assign(document.body.style, {
      paddingRight: null
    }), setTimeout(() => {
      window.removeEventListener("click", this.onWindowClicked), this._windowClickListen = !1, p.hideOverlay(), this._targetElement.classList.add(x.DEFAULT.class.hidden);
    }, 1)), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(x.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(x.DEFAULT.attr.target);
    return typeof t == "string" ? p.findOrById(t) : t instanceof HTMLElement ? t : p.nextElementSibling(this._element);
  }
};
let W = x;
o(W, "type", "modal"), o(W, "SELECTOR", '[data-fc-type="modal"]'), o(W, "EVENTS", {
  show: "fc.modal.show",
  shown: "fc.modal.shown",
  hide: "fc.modal.hide",
  hidden: "fc.modal.hidden"
}), o(W, "DEFAULT", {
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
const v = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "_targetElement", null);
    o(this, "_arrowElement", null);
    o(this, "_targetOffset", 8);
    this.init();
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(v.DEFAULT.class.hidden));
  }
  get isClickTrigger() {
    return this.config.trigger === "click";
  }
  show() {
    this.computeTooltipPosition(), this.dispatchEvent(v.EVENTS.show), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(v.DEFAULT.class.hidden), this._targetElement.classList.remove(v.DEFAULT.class.opacity0), setTimeout(() => {
      this._element.classList.add(v.DEFAULT.class.open), this._targetElement.classList.add(v.DEFAULT.class.open), this._targetElement.classList.add(v.DEFAULT.class.opacity100);
    }, 1)), this.dispatchEvent(v.EVENTS.shown);
  }
  hide() {
    var t;
    this.dispatchEvent(v.EVENTS.hide), this._targetElement != null && ((t = this._element) == null || t.classList.remove(v.DEFAULT.class.open), this._targetElement.classList.add(v.DEFAULT.class.opacity0), this._targetElement.classList.remove(v.DEFAULT.class.opacity100), this._targetElement.classList.add(v.DEFAULT.class.hidden)), this.dispatchEvent(v.EVENTS.hidden);
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  init() {
    const t = this._element.getAttribute(v.DEFAULT.attr.target);
    t ? this._targetElement = p.findOrById(t) : this._targetElement = p.nextElementSibling(this._element), this._targetElement && (this._arrowElement = this._targetElement.querySelector(`[${v.DEFAULT.attr.arrow}]`)), this.initOptions(), this.initListener();
  }
  initOptions() {
    var t, s, n, a, l;
    if ((t = this._element) != null && t.hasAttribute(v.DEFAULT.attr.placement) && (this.config.placement = (s = this._element) == null ? void 0 : s.getAttribute(v.DEFAULT.attr.placement)), (n = this._element) != null && n.hasAttribute(v.DEFAULT.attr.trigger) && (this.config.trigger = ((a = this._element) == null ? void 0 : a.getAttribute(v.DEFAULT.attr.trigger)) === "click" ? "click" : "hover"), (l = this._element) != null && l.hasAttribute(v.DEFAULT.attr.offset)) {
      const r = this._element.getAttribute(v.DEFAULT.attr.offset);
      isNaN(parseInt(r)) || (this._targetOffset = parseInt(r));
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
    const t = [Jt(this._targetOffset), ye({ padding: 2 }), pe({ fallbackStrategy: "bestFit" })];
    this._arrowElement && t.push(fe({ element: this._arrowElement })), this._element != null && this._targetElement != null && (this._targetElement.classList.add(v.DEFAULT.class.absolute), this._arrowElement && this._arrowElement.classList.add(v.DEFAULT.class.absolute), ie(this._element, this._targetElement, {
      placement: this.config.placement,
      middleware: t
    }).then(({ x: s, y: n, middlewareData: a }) => {
      var l, r, d, h;
      if (Object.assign(this._targetElement.style, {
        left: `${s}px`,
        top: `${n}px`
      }), a.arrow && this._arrowElement) {
        const { x: f, y: c } = a.arrow, m = f != null ? `${f}px` : `${-this._arrowElement.offsetWidth / 2}px`, g = c != null ? `${c}px` : `${-this._arrowElement.offsetHeight / 2}px`, E = {
          left: (l = this.config.placement) != null && l.includes("left") ? null : m,
          top: (r = this.config.placement) != null && r.includes("top") ? null : g,
          right: (d = this.config.placement) != null && d.includes("left") ? m : null,
          bottom: (h = this.config.placement) != null && h.includes("top") ? g : null
        };
        Object.assign(this._arrowElement.style, E);
      }
    }));
  }
};
let j = v;
o(j, "type", "tooltip"), o(j, "SELECTOR", '[data-fc-type="tooltip"]'), o(j, "EVENTS", {
  show: "fc.tooltip.show",
  shown: "fc.tooltip.shown",
  hide: "fc.tooltip.hide",
  hidden: "fc.tooltip.hidden"
}), o(j, "DEFAULT", {
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
const _ = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "_targetElement", null);
    o(this, "keyListener", (t) => {
      t.key == "Escape" && !this.isStatic && this.hide();
    });
    this.init();
  }
  init() {
    var t;
    this._element != null && (this._targetElement = this.getTargetElement(), (t = this._targetElement) == null || t.classList.add(_.DEFAULT.class.base), this.initOptions(), this.initListener());
  }
  initOptions() {
    var a, l, r;
    let t = (a = this._element) == null ? void 0 : a.getAttribute(_.DEFAULT.attr.scroll);
    t ? this.config.scroll = t !== "false" : this.config.scroll == null && (this.config.scroll = !1);
    let s = (l = this._element) == null ? void 0 : l.getAttribute(_.DEFAULT.attr.backdrop);
    s ? this.config.backdrop = s !== "false" : this.config.backdrop == null && (this.config.backdrop = !0);
    let n = (r = this._element) == null ? void 0 : r.getAttribute(_.DEFAULT.attr.behavior);
    n ? this.config.behavior = n == "static" ? "static" : "default" : this.config.behavior == null && (this.config.behavior = "default");
  }
  initListener() {
    var t;
    this._element != null && (this._element.addEventListener("click", () => {
      this.toggle();
    }), (t = this._targetElement) == null || t.querySelectorAll(`[${_.DEFAULT.attr.dismiss}]`).forEach((s) => {
      s.addEventListener("click", () => {
        this.hide();
      });
    }), Lt.listenOverlayClick(() => {
      this.isStatic || this.hide();
    }));
  }
  get isShown() {
    var t;
    return !((t = this._targetElement) != null && t.classList.contains(_.DEFAULT.class.hidden));
  }
  get isStatic() {
    return this.config.behavior === "static";
  }
  show() {
    if (this.dispatchEvent(_.EVENTS.show), this._targetElement != null && this._element != null && (this._targetElement.classList.remove(_.DEFAULT.class.hidden), this._element.classList.add(_.DEFAULT.class.open), this.config.backdrop && p.showOverlay(), setTimeout(() => {
      this._targetElement.classList.add(_.DEFAULT.class.open);
    }, 1), !this.config.scroll)) {
      const t = document.documentElement.clientWidth;
      document.body.style.paddingRight = Math.abs(window.innerWidth - t) + "px", document.body.classList.add("overflow-hidden");
    }
    window.addEventListener("keydown", this.keyListener), this.dispatchEvent(_.EVENTS.shown);
  }
  hide() {
    var t;
    this.isShown && (this.dispatchEvent(_.EVENTS.hide), this._targetElement != null && this.isShown && ((t = this._element) == null || t.classList.remove(_.DEFAULT.class.open), this._targetElement.classList.remove(_.DEFAULT.class.open), Lt.afterTransition(this._targetElement, () => {
      this._targetElement.classList.add(_.DEFAULT.class.hidden), this.config.backdrop && p.hideOverlay();
    }), this.config.scroll || (document.body.classList.remove("overflow-hidden"), Object.assign(document.body.style, {
      paddingRight: null
    }))), window.removeEventListener("keydown", this.keyListener), this.dispatchEvent(_.EVENTS.hidden));
  }
  toggle() {
    this.isShown ? this.hide() : this.show();
  }
  getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(_.DEFAULT.attr.target);
    return typeof t == "string" ? p.findOrById(t) : t instanceof HTMLElement ? t : p.nextElementSibling(this._element);
  }
};
let q = _;
o(q, "type", "offcanvas"), o(q, "SELECTOR", '[data-fc-type="offcanvas"]'), o(q, "EVENTS", {
  show: "fc.offcanvas.show",
  shown: "fc.offcanvas.shown",
  hide: "fc.offcanvas.hide",
  hidden: "fc.offcanvas.hidden"
}), o(q, "DEFAULT", {
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
const at = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "_targetElement", null);
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
    this.dispatchEvent(at.EVENTS.hide), this._targetElement != null && this._targetElement.classList.add(at.DEFAULT.class.hidden), this.dispatchEvent(at.EVENTS.hidden);
  }
  _getTargetElement() {
    if (this._element == null)
      return null;
    const t = this.config.target ?? this._element.getAttribute(at.DEFAULT.attr.target);
    return typeof t == "string" ? p.findOrById(t) : t instanceof HTMLElement ? t : this._element.parentElement;
  }
};
let z = at;
o(z, "type", "dismissable"), o(z, "SELECTOR", "[data-fc-dismiss]"), o(z, "EVENTS", {
  hide: "fc.dismissable.hide",
  hidden: "fc.dismissable.hidden"
}), o(z, "DEFAULT", {
  class: {
    hidden: "hidden"
  },
  attr: {
    target: "data-fc-dismiss"
  }
});
const be = {
  clearArray(e) {
    return e.filter((i) => i != null);
  },
  deepClone(e) {
    return JSON.parse(JSON.stringify(e));
  }
}, bt = class {
  static get state() {
    return this._initialize || (this._initialize = this.retrieveFromLocal()), this._state;
  }
  static init() {
    this._initialize = this.retrieveFromLocal(), this._old_state = be.deepClone(this._state);
  }
  static changeTheme(i) {
    this._state.theme = i, this.updateState();
  }
  static updateState() {
    this.updateInLocal(), this.notifyListener();
  }
  static updateInLocal() {
    localStorage.setItem(this.stateKey, JSON.stringify(this._state));
  }
  static retrieveFromLocal() {
    const i = localStorage.getItem(this.stateKey);
    if (i == null)
      return this._state = this.defaultState, !0;
    const t = JSON.parse(i);
    return Object.keys(t).forEach((s) => t[s] == null ? t[s] = this.defaultState[s] : void 0), this._state = t, !0;
  }
  static attachListener(i) {
    this._listener.push(i);
  }
  static detachListener(i) {
    this._listener = this._listener.filter((t) => t != i);
  }
  static notifyListener() {
    for (const i of this._listener)
      i(bt.state);
  }
};
let F = bt;
o(F, "_old_state", null), o(F, "_initialize", !1), o(F, "stateKey", "frost.app_state"), o(F, "defaultState", { theme: "light" }), o(F, "_listener", []), o(F, "_state", bt.defaultState);
class et {
  static init() {
    F.attachListener(this.themeChangeListener), this.themeChangeListener(F.state);
  }
  static themeChangeListener(i) {
    i.theme == "system" ? (et.changeTheme(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", et.windowThemeListener)) : (et.changeTheme(i.theme), window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", et.windowThemeListener));
  }
  static windowThemeListener(i) {
    et.changeTheme(i.matches ? "dark" : "light");
  }
  static changeTheme(i) {
    const t = document.getElementsByTagName("html")[0];
    i === "dark" ? t.classList.add("dark") : t.classList.remove("dark");
  }
}
const it = class extends I {
  constructor(t, s) {
    super(t, s);
    o(this, "theme", null);
    o(this, "trigger", null);
    this.init();
  }
  notifyThemeChanged(t) {
    var s, n;
    if (this.trigger != "switch")
      (s = this._element) == null || s.classList.remove("light-theme", "dark-theme", "system-theme"), (n = this._element) == null || n.classList.add(`${t}-theme`);
    else if (this._element instanceof HTMLInputElement) {
      const a = this._element;
      t != "dark" ? (a.removeAttribute("checked"), a.checked = !1) : (a.setAttribute("checked", "checked"), a.checked = !0);
    }
  }
  init() {
    this._element != null && (this._element.classList.add(it.DEFAULT.class.base), this.theme = p.getAttribute(this._element, it.DEFAULT.attr.theme, this.config.theme), this.trigger = p.getAttribute(this._element, it.DEFAULT.attr.trigger, this.config.trigger), this.initListeners(), this.notifyThemeChanged(F.state.theme));
  }
  initListeners() {
    var t;
    if (this.trigger == "switch" && this._element instanceof HTMLInputElement) {
      const s = this._element;
      s == null || s.addEventListener("change", (n) => {
        F.changeTheme(s.checked ? "dark" : "light"), this.setOtherSwitch();
      });
    } else
      this.theme != null && this.trigger != "never" && ((t = this._element) == null || t.addEventListener("click", () => {
        F.changeTheme(this.theme), this.setOtherSwitch();
      }));
  }
  setOtherSwitch() {
    const t = F.state.theme;
    p.findAll(it.SELECTOR).map((s) => it.getInstanceOrCreate(s)).forEach((s) => {
      s == null || s.notifyThemeChanged(t);
    });
  }
};
let lt = it;
o(lt, "type", "theme_switcher"), o(lt, "SELECTOR", '[data-fc-type="theme_switcher"]'), o(lt, "DEFAULT", {
  class: {
    base: "fc-theme"
  },
  attr: {
    theme: "data-fc-theme",
    trigger: "data-fc-trigger"
  }
});
const xt = class {
  static get instance() {
    return this._instance == null && (this._instance = new xt()), this._instance;
  }
  init() {
    typeof window < "u" && (F.init(), et.init(), p.addOverlay(["transition-all", "fixed", "inset-0", "z-40", "bg-gray-900", "bg-opacity-50", "dark:bg-opacity-80"]), xt.instance.awakeComponents());
  }
  awakeComponents() {
    [C, Z, P, tt, W, q, j, z, lt].map((i) => p.findAll(i.SELECTOR).forEach((t) => i.getInstanceOrCreate(t)));
  }
};
let pt = xt;
o(pt, "_instance", null);
const se = pt.instance, xe = {
  Collapse: C,
  Accordion: Z,
  Dropdown: P,
  Tooltip: j,
  Modal: W,
  Offcanvas: q,
  Dismissable: z,
  Tab: tt,
  app: se
}, _e = se.init;
typeof window < "u" && (window.frost = xe, _e());
export {
  Z as Accordion,
  C as Collapse,
  z as Dismissable,
  P as Dropdown,
  W as Modal,
  q as Offcanvas,
  tt as Tab,
  lt as ThemeSwitcher,
  j as Tooltip,
  _e as initFrost
};
