import BaseComponent from '~/components/base';
import { DomEngine } from '~/dom/engine';
import { DomEvent } from '~/dom/event';
export default class Collapse extends BaseComponent {
    static type = 'collapse';
    static SELECTOR = '[data-fc-type="collapse"]';
    static EVENTS = {
        show: 'fc.collapse.show',
        shown: 'fc.collapse.shown',
        hide: 'fc.collapse.hide',
        hidden: 'fc.collapse.hidden'
    };
    static DEFAULT = {
        class: {
            base: 'fc-collapse',
            hidden: 'hidden',
            open: 'open'
        },
        attr: {
            target: 'data-fc-target'
        }
    };
    _targetElement = null;
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    init() {
        if (this._element != null) {
            this._element.classList.add(Collapse.DEFAULT.class.base);
            this._targetElement = this.getTargetElement();
        }
        this.initOptions();
        this.initListener();
    }
    initOptions() {
        if (this._targetElement != null && !this._targetElement.classList.contains(Collapse.DEFAULT.class.hidden)) {
            this._element.classList.add(Collapse.DEFAULT.class.open);
        }
        if (this.config.toggle) {
            this.toggle();
        }
    }
    initListener() {
        this._element.addEventListener('click', () => {
            this.toggle();
        });
    }
    get isShown() {
        return this._element?.classList.contains(Collapse.DEFAULT.class.open) ?? false;
    }
    ;
    show() {
        if (this._destroyed)
            return;
        this.dispatchEvent(Collapse.EVENTS.show);
        if (this._targetElement != null && this._element != null) {
            this._element.classList.add(Collapse.DEFAULT.class.open);
            this._targetElement.classList.remove(Collapse.DEFAULT.class.hidden);
            this._targetElement.style.height = '0px';
            this._targetElement.style.height = `${this._targetElement.scrollHeight}px`;
            DomEvent.afterTransition(this._targetElement, () => {
                if (!this.isShown)
                    return;
                this._targetElement.style.height = '';
            });
        }
        this.dispatchEvent(Collapse.EVENTS.shown);
    }
    hide() {
        if (this._destroyed)
            return;
        this.dispatchEvent(Collapse.EVENTS.hide);
        if (this._targetElement != null && this._element != null) {
            this._element.classList.remove(Collapse.DEFAULT.class.open);
            this._targetElement.style.height = `${this._targetElement.scrollHeight}px`;
            DomEvent.afterTransition(this._targetElement, () => {
                if (this.isShown)
                    return;
                this._targetElement.classList.add(Collapse.DEFAULT.class.hidden);
                this._targetElement.style.height = '';
            });
            setTimeout(() => {
                this._targetElement.style.height = '0px';
            });
        }
        this.dispatchEvent(Collapse.EVENTS.hidden);
    }
    toggle() {
        this.isShown ? this.hide() : this.show();
    }
    getTargetElement() {
        if (this._element == null) {
            return null;
        }
        const target = this.config.target ?? this._element.getAttribute(Collapse.DEFAULT.attr.target);
        if (typeof target === 'string') {
            return DomEngine.findOrById(target);
        }
        if (target instanceof HTMLElement) {
            return target;
        }
        return DomEngine.nextElementSibling(this._element);
    }
}
