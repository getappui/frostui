import BaseComponent from './base';
import { DomEngine } from '~/dom/engine';
export default class Modal extends BaseComponent {
    static type = 'modal';
    static SELECTOR = '[data-fc-type="modal"]';
    static EVENTS = {
        show: 'fc.modal.show',
        shown: 'fc.modal.shown',
        hide: 'fc.modal.hide',
        hidden: 'fc.modal.hidden'
    };
    static DEFAULT = {
        class: {
            base: 'fc-modal',
            hidden: 'hidden',
            open: 'open',
            overflowHidden: 'overflow-hidden'
        },
        attr: {
            target: 'data-fc-target',
            dismiss: 'data-fc-dismiss',
            behavior: 'data-fc-behavior'
        }
    };
    _targetElement = null;
    _windowClickListen = false;
    get isShown() {
        return !this._targetElement?.classList.contains(Modal.DEFAULT.class.hidden) ?? true;
    }
    get isStatic() {
        return this.config.behavior === 'static';
    }
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    init() {
        if (this._element != null) {
            this._targetElement = this.getTargetElement();
            this._targetElement?.classList.add(Modal.DEFAULT.class.base);
            this.initOptions();
            this.initListener();
        }
    }
    initOptions() {
        let behaviourE = this._element?.getAttribute(Modal.DEFAULT.attr.behavior);
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
            this._targetElement?.querySelectorAll(`[${Modal.DEFAULT.attr.dismiss}]`).forEach((e) => {
                e.addEventListener('click', () => {
                    this.hide();
                });
            });
        }
    }
    keyListener = (e) => {
        if (e.key == 'Escape' && !this.isStatic) {
            this.hide();
        }
    };
    onWindowClicked = (event) => {
        if (!this.isStatic && event.target instanceof HTMLElement && this._targetElement && this.isShown) {
            if (!DomEngine.isElementContains(this._targetElement, event.target)) {
                this.hide();
            }
        }
    };
    show() {
        this.dispatchEvent(Modal.EVENTS.show);
        if (this._targetElement != null && this._element != null) {
            const documentWidth = document.documentElement.clientWidth;
            document.body.style.paddingRight = Math.abs(window.innerWidth - documentWidth) + 'px';
            document.body.classList.add(Modal.DEFAULT.class.overflowHidden);
            this._element.classList.add(Modal.DEFAULT.class.open);
            this._targetElement.classList.remove(Modal.DEFAULT.class.hidden);
            setTimeout(() => {
                this._targetElement.classList.add(Modal.DEFAULT.class.open);
                DomEngine.showOverlay();
                if (!this._windowClickListen) {
                    window.addEventListener('click', this.onWindowClicked);
                    this._windowClickListen = true;
                }
            }, 1);
        }
        window.addEventListener('keydown', this.keyListener);
        this.dispatchEvent(Modal.EVENTS.shown);
    }
    hide() {
        this.dispatchEvent(Modal.EVENTS.hide);
        if (this._targetElement != null && this.isShown) {
            document.body.classList.remove(Modal.DEFAULT.class.overflowHidden);
            this._element?.classList.remove(Modal.DEFAULT.class.open);
            this._targetElement.classList.remove(Modal.DEFAULT.class.open);
            Object.assign(document.body.style, {
                paddingRight: null
            });
            setTimeout(() => {
                window.removeEventListener('click', this.onWindowClicked);
                this._windowClickListen = false;
                DomEngine.hideOverlay();
                this._targetElement.classList.add(Modal.DEFAULT.class.hidden);
            }, 1);
        }
        window.removeEventListener('keydown', this.keyListener);
        this.dispatchEvent(Modal.EVENTS.hidden);
    }
    toggle() {
        this.isShown ? this.hide() : this.show();
    }
    getTargetElement() {
        if (this._element == null) {
            return null;
        }
        const target = this.config.target ?? this._element.getAttribute(Modal.DEFAULT.attr.target);
        if (typeof target === 'string') {
            return DomEngine.findOrById(target);
        }
        if (target instanceof HTMLElement) {
            return target;
        }
        return DomEngine.nextElementSibling(this._element);
    }
}
