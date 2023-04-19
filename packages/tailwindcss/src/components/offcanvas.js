import BaseComponent from './base';
import { DomEngine } from '~/dom/engine';
import { DomEvent } from '~/dom/event';
export default class Offcanvas extends BaseComponent {
    static type = 'offcanvas';
    static SELECTOR = '[data-fc-type="offcanvas"]';
    static EVENTS = {
        show: 'fc.offcanvas.show',
        shown: 'fc.offcanvas.shown',
        hide: 'fc.offcanvas.hide',
        hidden: 'fc.offcanvas.hidden'
    };
    static DEFAULT = {
        class: {
            base: 'fc-offcanvas',
            hidden: 'hidden',
            open: 'open',
        },
        attr: {
            target: 'data-fc-target',
            dismiss: 'data-fc-dismiss',
            behavior: 'data-fc-behavior',
            scroll: 'data-fc-scroll',
            backdrop: 'data-fc-backdrop',
        }
    };
    _targetElement = null;
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    init() {
        if (this._element != null) {
            this._targetElement = this.getTargetElement();
            this._targetElement?.classList.add(Offcanvas.DEFAULT.class.base);
            this.initOptions();
            this.initListener();
        }
    }
    initOptions() {
        let scrollE = this._element?.getAttribute(Offcanvas.DEFAULT.attr.scroll);
        if (scrollE) {
            this.config.scroll = scrollE !== 'false';
        }
        else if (this.config.scroll == null) {
            this.config.scroll = false;
        }
        let backdropE = this._element?.getAttribute(Offcanvas.DEFAULT.attr.backdrop);
        if (backdropE) {
            this.config.backdrop = backdropE !== 'false';
        }
        else if (this.config.backdrop == null) {
            this.config.backdrop = true;
        }
        let behaviourE = this._element?.getAttribute(Offcanvas.DEFAULT.attr.behavior);
        if (behaviourE) {
            this.config.behavior = behaviourE == 'static' ? 'static' : 'default';
        }
        else if (this.config.behavior == null) {
            this.config.behavior = 'default';
        }
    }
    initListener() {
        if (this._element != null) {
            this._element.addEventListener('click', () => {
                this.toggle();
            });
            this._targetElement?.querySelectorAll(`[${Offcanvas.DEFAULT.attr.dismiss}]`).forEach((e) => {
                e.addEventListener('click', () => {
                    this.hide();
                });
            });
            DomEvent.listenOverlayClick(() => {
                if (!this.isStatic) {
                    this.hide();
                }
            });
        }
    }
    keyListener = (e) => {
        if (e.key == 'Escape' && !this.isStatic) {
            this.hide();
        }
    };
    get isShown() {
        return !this._targetElement?.classList.contains(Offcanvas.DEFAULT.class.hidden) ?? true;
    }
    get isStatic() {
        return this.config.behavior === 'static';
    }
    show() {
        this.dispatchEvent(Offcanvas.EVENTS.show);
        if (this._targetElement != null && this._element != null) {
            this._targetElement.classList.remove(Offcanvas.DEFAULT.class.hidden);
            this._element.classList.add(Offcanvas.DEFAULT.class.open);
            if (this.config.backdrop) {
                DomEngine.showOverlay();
            }
            setTimeout(() => {
                this._targetElement.classList.add(Offcanvas.DEFAULT.class.open);
            }, 1);
            if (!this.config.scroll) {
                const documentWidth = document.documentElement.clientWidth;
                document.body.style.paddingRight = Math.abs(window.innerWidth - documentWidth) + 'px';
                document.body.classList.add('overflow-hidden');
            }
        }
        window.addEventListener('keydown', this.keyListener);
        this.dispatchEvent(Offcanvas.EVENTS.shown);
    }
    hide() {
        if (!this.isShown)
            return;
        this.dispatchEvent(Offcanvas.EVENTS.hide);
        if (this._targetElement != null && this.isShown) {
            this._element?.classList.remove(Offcanvas.DEFAULT.class.open);
            this._targetElement.classList.remove(Offcanvas.DEFAULT.class.open);
            DomEvent.afterTransition(this._targetElement, () => {
                this._targetElement.classList.add(Offcanvas.DEFAULT.class.hidden);
                if (this.config.backdrop) {
                    DomEngine.hideOverlay();
                }
            });
            if (!this.config.scroll) {
                document.body.classList.remove('overflow-hidden');
                Object.assign(document.body.style, {
                    paddingRight: null
                });
            }
        }
        window.removeEventListener('keydown', this.keyListener);
        this.dispatchEvent(Offcanvas.EVENTS.hidden);
    }
    toggle() {
        this.isShown ? this.hide() : this.show();
    }
    getTargetElement() {
        if (this._element == null) {
            return null;
        }
        const target = this.config.target ?? this._element.getAttribute(Offcanvas.DEFAULT.attr.target);
        if (typeof target === 'string') {
            return DomEngine.findOrById(target);
        }
        if (target instanceof HTMLElement) {
            return target;
        }
        return DomEngine.nextElementSibling(this._element);
    }
}
