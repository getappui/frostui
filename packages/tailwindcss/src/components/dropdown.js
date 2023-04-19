import BaseComponent from './base';
import { DomEngine } from '~/dom/engine';
import { computePosition, offset } from '@floating-ui/dom';
export default class Dropdown extends BaseComponent {
    static type = 'dropdown';
    static SELECTOR = '[data-fc-type="dropdown"]';
    static EVENTS = {
        show: 'fc.dropdown.show',
        shown: 'fc.dropdown.shown',
        hide: 'fc.dropdown.hide',
        hidden: 'fc.dropdown.hidden'
    };
    static DEFAULT = {
        class: {
            base: 'fc-dropdown',
            hidden: 'hidden',
            open: 'open'
        },
        attr: {
            target: 'data-fc-target',
            placement: 'data-fc-placement',
            trigger: 'data-fc-trigger',
            offset: 'data-fc-offset',
        }
    };
    _targetElement = null;
    clicked = false;
    _targetOffset = 8;
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    get isShown() {
        return ((this._targetElement?.classList.contains(Dropdown.DEFAULT.class.hidden)) === false) ?? false;
    }
    ;
    get isHover() {
        return this.config.trigger === 'hover';
    }
    ;
    show() {
        this.dispatchEvent(Dropdown.EVENTS.show);
        this.addComputePositionInTargetElement();
        if ((this._targetElement != null) && (this._element != null)) {
            this._targetElement.classList.remove(Dropdown.DEFAULT.class.hidden);
            setTimeout(() => {
                this._element.classList.add(Dropdown.DEFAULT.class.open);
                this._targetElement.classList.add(Dropdown.DEFAULT.class.open);
            }, 1);
        }
        window.addEventListener('keydown', this.keyListener);
        this.dispatchEvent(Dropdown.EVENTS.shown);
    }
    hide() {
        this.dispatchEvent(Dropdown.EVENTS.hide);
        this.clicked = false;
        if (this._targetElement != null) {
            this._element?.classList.remove(Dropdown.DEFAULT.class.open);
            this._targetElement.classList.remove(Dropdown.DEFAULT.class.open);
            this._targetElement.classList.add(Dropdown.DEFAULT.class.hidden);
        }
        window.removeEventListener('keydown', this.keyListener);
        this.dispatchEvent(Dropdown.EVENTS.hidden);
    }
    toggle() {
        this.isShown ? this.hide() : this.show();
    }
    init() {
        if (this._element != null) {
            this._targetElement = this.getTargetElement();
            this.initOptions();
            this.initListener();
        }
    }
    initOptions() {
        this._element?.classList.add(Dropdown.DEFAULT.class.base);
        this._targetElement?.classList.add(Dropdown.DEFAULT.class.base);
        this.config.placement ??= (this._element?.getAttribute(Dropdown.DEFAULT.attr.placement) ?? 'bottom-start');
        this.config.trigger ??= (this._element?.getAttribute(Dropdown.DEFAULT.attr.trigger) == 'hover' ? 'hover' : 'click');
        if ((this._targetElement?.classList.contains(Dropdown.DEFAULT.class.hidden)) === false) {
            this.show();
        }
        if (this._element?.hasAttribute(Dropdown.DEFAULT.attr.offset)) {
            const offsetData = this._element.getAttribute(Dropdown.DEFAULT.attr.offset);
            if (!isNaN(parseInt(offsetData))) {
                this._targetOffset = parseInt(offsetData);
            }
        }
    }
    initListener() {
        this._element?.addEventListener('click', () => {
            if (this._destroyed)
                return;
            if (!this.isHover) {
                this.toggle();
            }
            else {
                this.clicked ? this.hide() : this.show();
                this.clicked = !this.clicked;
            }
        });
        if (this.isHover) {
            this._element?.addEventListener('mouseover', () => {
                this.show();
            });
            window.addEventListener('mousemove', (event) => {
                if (this._destroyed)
                    return;
                if (this._targetElement != null && this._element != null && event.target instanceof HTMLElement) {
                    if (!this.clicked && !DomEngine.isElementSameOrContains(this._targetElement, event.target) && !DomEngine.isElementSameOrContains(this._element, event.target)) {
                        this.hide();
                    }
                }
            });
        }
        window.addEventListener('click', (event) => {
            if (this._destroyed)
                return;
            if ((this._targetElement != null) && (this._element != null) && event.target instanceof HTMLElement) {
                if (!DomEngine.isElementSameOrContains(this._targetElement, event.target) && !DomEngine.isElementSameOrContains(this._element, event.target)) {
                    this.hide();
                }
            }
        });
    }
    keyListener = (e) => {
        if (e.key == 'Escape') {
            this.hide();
        }
    };
    addComputePositionInTargetElement() {
        console.info(this._targetOffset);
        const middlewares = [offset(this._targetOffset)];
        if (this._element != null && this._targetElement != null) {
            this._targetElement.classList.add('absolute');
            computePosition(this._element, this._targetElement, {
                placement: this.config.placement,
                middleware: middlewares
            }).then(({ x, y }) => {
                if (this._targetElement != null) {
                    Object.assign(this._targetElement.style, {
                        left: `${x}px`,
                        top: `${y}px`
                    });
                }
            });
        }
    }
    getTargetElement() {
        if (this._element == null) {
            return null;
        }
        const target = this._element.getAttribute(Dropdown.DEFAULT.attr.target);
        const configTarget = this.config.target ?? target;
        if (typeof configTarget === 'string') {
            return DomEngine.findOrById(configTarget);
        }
        if (configTarget instanceof HTMLElement) {
            return configTarget;
        }
        return DomEngine.nextElementSibling(this._element);
    }
}
