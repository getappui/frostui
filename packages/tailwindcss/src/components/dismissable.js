import BaseComponent from './base';
import { DomEngine } from '~/dom/engine';
export default class Dismissable extends BaseComponent {
    static type = 'dismissable';
    static SELECTOR = '[data-fc-dismiss]';
    static EVENTS = {
        hide: 'fc.dismissable.hide',
        hidden: 'fc.dismissable.hidden'
    };
    static DEFAULT = {
        class: {
            hidden: 'hidden',
        },
        attr: {
            target: 'data-fc-dismiss'
        }
    };
    _targetElement = null;
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    init() {
        if (this._element != null) {
            this._targetElement = this._getTargetElement();
        }
        if (this._targetElement) {
            this.initListener();
        }
    }
    initListener() {
        this._element.addEventListener('click', () => {
            this.hide();
        });
    }
    hide() {
        this.dispatchEvent(Dismissable.EVENTS.hide);
        if (this._targetElement != null) {
            this._targetElement.classList.add(Dismissable.DEFAULT.class.hidden);
        }
        this.dispatchEvent(Dismissable.EVENTS.hidden);
    }
    _getTargetElement() {
        if (this._element == null) {
            return null;
        }
        const target = this.config.target ?? this._element.getAttribute(Dismissable.DEFAULT.attr.target);
        if (typeof target === 'string') {
            return DomEngine.findOrById(target);
        }
        if (target instanceof HTMLElement) {
            return target;
        }
        return this._element.parentElement;
    }
}
