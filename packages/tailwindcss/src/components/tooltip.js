import BaseComponent from './base';
import { DomEngine } from '~/dom/engine';
import { arrow, computePosition, offset, shift, flip } from '@floating-ui/dom';
export default class Tooltip extends BaseComponent {
    static type = 'tooltip';
    static SELECTOR = '[data-fc-type="tooltip"]';
    static EVENTS = {
        show: 'fc.tooltip.show',
        shown: 'fc.tooltip.shown',
        hide: 'fc.tooltip.hide',
        hidden: 'fc.tooltip.hidden'
    };
    static DEFAULT = {
        class: {
            base: 'fc-collapse',
            hidden: 'hidden',
            open: 'open',
            opacity0: 'opacity-0',
            opacity100: 'opacity-100',
            absolute: 'absolute'
        },
        attr: {
            target: 'data-fc-target',
            placement: 'data-fc-placement',
            trigger: 'data-fc-trigger',
            arrow: 'data-fc-arrow',
            offset: 'data-fc-offset',
        }
    };
    _targetElement = null;
    _arrowElement = null;
    _targetOffset = 8;
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    get isShown() {
        return !this._targetElement?.classList.contains(Tooltip.DEFAULT.class.hidden) ?? false;
    }
    get isClickTrigger() {
        return this.config.trigger === 'click';
    }
    show() {
        this.computeTooltipPosition();
        this.dispatchEvent(Tooltip.EVENTS.show);
        if (this._targetElement != null && this._element != null) {
            this._targetElement.classList.remove(Tooltip.DEFAULT.class.hidden);
            this._targetElement.classList.remove(Tooltip.DEFAULT.class.opacity0);
            setTimeout(() => {
                this._element.classList.add(Tooltip.DEFAULT.class.open);
                this._targetElement.classList.add(Tooltip.DEFAULT.class.open);
                this._targetElement.classList.add(Tooltip.DEFAULT.class.opacity100);
            }, 1);
        }
        this.dispatchEvent(Tooltip.EVENTS.shown);
    }
    hide() {
        this.dispatchEvent(Tooltip.EVENTS.hide);
        if (this._targetElement != null) {
            this._element?.classList.remove(Tooltip.DEFAULT.class.open);
            this._targetElement.classList.add(Tooltip.DEFAULT.class.opacity0);
            this._targetElement.classList.remove(Tooltip.DEFAULT.class.opacity100);
            this._targetElement.classList.add(Tooltip.DEFAULT.class.hidden);
        }
        this.dispatchEvent(Tooltip.EVENTS.hidden);
    }
    toggle() {
        this.isShown ? this.hide() : this.show();
    }
    init() {
        const target = this._element.getAttribute(Tooltip.DEFAULT.attr.target);
        if (target) {
            this._targetElement = DomEngine.findOrById(target);
        }
        else {
            this._targetElement = DomEngine.nextElementSibling(this._element);
        }
        if (this._targetElement) {
            this._arrowElement = this._targetElement.querySelector(`[${Tooltip.DEFAULT.attr.arrow}]`);
        }
        this.initOptions();
        this.initListener();
    }
    initOptions() {
        if (this._element?.hasAttribute(Tooltip.DEFAULT.attr.placement)) {
            this.config.placement = this._element?.getAttribute(Tooltip.DEFAULT.attr.placement);
        }
        if (this._element?.hasAttribute(Tooltip.DEFAULT.attr.trigger)) {
            this.config.trigger = this._element?.getAttribute(Tooltip.DEFAULT.attr.trigger) === 'click' ? 'click' : 'hover';
        }
        if (this._element?.hasAttribute(Tooltip.DEFAULT.attr.offset)) {
            const offsetData = this._element.getAttribute(Tooltip.DEFAULT.attr.offset);
            if (!isNaN(parseInt(offsetData))) {
                this._targetOffset = parseInt(offsetData);
            }
        }
    }
    initListener() {
        if (this._element != null) {
            if (!this.isClickTrigger) {
                this._element.addEventListener('mouseenter', () => {
                    this.show();
                });
                this._element.addEventListener('mouseleave', () => {
                    this.hide();
                });
            }
            else {
                this._element.addEventListener('click', () => {
                    this.toggle();
                });
            }
        }
    }
    computeTooltipPosition() {
        const middlewares = [offset(this._targetOffset), shift({ padding: 2 }), flip({ fallbackStrategy: 'bestFit' })];
        if (this._arrowElement) {
            middlewares.push(arrow({ element: this._arrowElement }));
        }
        if (this._element != null && this._targetElement != null) {
            this._targetElement.classList.add(Tooltip.DEFAULT.class.absolute);
            if (this._arrowElement) {
                this._arrowElement.classList.add(Tooltip.DEFAULT.class.absolute);
            }
            computePosition(this._element, this._targetElement, {
                placement: this.config.placement,
                middleware: middlewares
            }).then(({ x, y, middlewareData }) => {
                Object.assign(this._targetElement.style, {
                    left: `${x}px`,
                    top: `${y}px`
                });
                if (middlewareData.arrow && this._arrowElement) {
                    const { x, y } = middlewareData.arrow;
                    const dx = x != null ? `${x}px` : `${-this._arrowElement.offsetWidth / 2}px`;
                    const dy = y != null ? `${y}px` : `${-this._arrowElement.offsetHeight / 2}px`;
                    const position = {
                        left: this.config.placement?.includes('left') ? null : dx,
                        top: this.config.placement?.includes('top') ? null : dy,
                        right: this.config.placement?.includes('left') ? dx : null,
                        bottom: this.config.placement?.includes('top') ? dy : null,
                    };
                    Object.assign(this._arrowElement.style, position);
                }
            });
        }
    }
}
