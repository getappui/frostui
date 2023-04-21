/**
 * Dropdown
 * @alias: Looking for more options
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 * @thanks: Floating UI [Previously Popper]
 */

import BaseComponent from './base'
import { type DropdownOption, IDropdownAutoclose, IDropdownTrigger, type IPlacement } from '~/types'
import { DomEngine } from '~/dom/engine'
import { computePosition, offset } from '@floating-ui/dom'

export default class Dropdown extends BaseComponent<DropdownOption> {

    static readonly type: string = 'dropdown'
    static readonly SELECTOR: string = '[data-fc-type="dropdown"]'

    // Events
    static readonly EVENTS = {
        show: 'fc.dropdown.show',
        shown: 'fc.dropdown.shown',
        hide: 'fc.dropdown.hide',
        hidden: 'fc.dropdown.hidden'
    }

    // Default Parameters
    static readonly DEFAULT = {
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
            autoclose: 'data-fc-autoclose'
        }
    }

    // Target Element
    private _targetElement: HTMLElement | null = null

    // Open dropdown via click or hover
    private clicked = false
    private _targetOffset = 8
    private _placement: IPlacement | null = null
    private _trigger: IDropdownTrigger | null = null
    private _autoclose: IDropdownAutoclose | null = null

    constructor (element: HTMLElement | string | null, config?: DropdownOption | null) {
        super(element, config)
        this.init()
    }

    // Getters
    public get isShown (): boolean {
        return ((this._targetElement?.classList.contains(Dropdown.DEFAULT.class.hidden)) === false) ?? false
    };

    public get isHover (): boolean {
        return this._trigger === 'hover'
    };

    public show (): void {
        this.dispatchEvent(Dropdown.EVENTS.show)

        this.addComputePositionInTargetElement()
        if ((this._targetElement != null) && (this._element != null)) {
            this._targetElement.classList.remove(Dropdown.DEFAULT.class.hidden)
            setTimeout(() => {
                this._element!.classList.add(Dropdown.DEFAULT.class.open)
                this._targetElement!.classList.add(Dropdown.DEFAULT.class.open)
            }, 1)
        }
        window.addEventListener('keydown', this.keyListener)

        this.dispatchEvent(Dropdown.EVENTS.shown)
    }

    public hide (): void {
        this.dispatchEvent(Dropdown.EVENTS.hide)

        this.clicked = false
        if (this._targetElement != null) {
            this._element?.classList.remove(Dropdown.DEFAULT.class.open)
            this._targetElement.classList.remove(Dropdown.DEFAULT.class.open)
            this._targetElement.classList.add(Dropdown.DEFAULT.class.hidden)
        }
        window.removeEventListener('keydown', this.keyListener)

        this.dispatchEvent(Dropdown.EVENTS.hidden)
    }

    public toggle (): void {
        this.isShown ? this.hide() : this.show()
    }

    private init (): void {
        if (this._element != null) {
            this._targetElement = this.getTargetElement()

            this.initOptions()
            this.initListener()
        }
    }

    private initOptions (): void {
        this._element?.classList.add(Dropdown.DEFAULT.class.base)
        this._targetElement?.classList.add(Dropdown.DEFAULT.class.base)

        this._placement = DomEngine.getAttribute(this._element!, Dropdown.DEFAULT.attr.placement, this.config.placement)
        this._trigger = DomEngine.getAttribute(this._element!, Dropdown.DEFAULT.attr.trigger, this.config.trigger ?? 'click')
        this._autoclose = DomEngine.getAttribute(this._element!, Dropdown.DEFAULT.attr.autoclose, this.config.autoclose)

        if ((this._targetElement?.classList.contains(Dropdown.DEFAULT.class.hidden)) === false) {
            this.show()
        }

        if (this._element?.hasAttribute(Dropdown.DEFAULT.attr.offset)) {
            const offsetData = this._element!.getAttribute(Dropdown.DEFAULT.attr.offset)
            if (!isNaN(parseInt(offsetData!))) {
                this._targetOffset = parseInt(offsetData!)
            }
        }
    }

    private initListener (): void {
        this._element?.addEventListener('click', () => {
            if (this._destroyed) return
            if (!this.isHover) {
                this.toggle()
            } else {
                this.clicked ? this.hide() : this.show()
                this.clicked = !this.clicked
            }
        })

        if (this.isHover) {
            this._element?.addEventListener('mouseover', () => {
                this.show()
            })
            window.addEventListener('mousemove', (event) => {
                if (this._destroyed) return
                if (this._targetElement != null && this._element != null && event.target instanceof HTMLElement) {
                    if (!this.clicked && !DomEngine.isElementSameOrContains(this._targetElement, event.target) && !DomEngine.isElementSameOrContains(this._element, event.target)) {
                        this.hide()
                    }
                }
            })
        }

        // Click outside

        window.addEventListener('click', (event) => {
            if (this._destroyed) return
            if ((this._targetElement != null) && (this._element != null) && event.target instanceof HTMLElement) {
                if (DomEngine.isElementSameOrContains(this._element, event.target)) {
                    return
                }

                const contains = DomEngine.isElementSameOrContains(this._targetElement, event.target)
                if ((this._autoclose == 'outside' && !contains) || (this._autoclose == 'inside' && contains) || this._autoclose == 'both') {
                    this.hide()
                }
            }
        })

    }

    private keyListener = (e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            this.hide()
        }
    }

    // Helper
    private addComputePositionInTargetElement (): void {
        const middlewares = [offset(this._targetOffset)]

        if (this._element != null && this._targetElement != null) {
            this._targetElement.classList.add('absolute')

            computePosition(this._element, this._targetElement, {
                placement: this._placement ?? 'bottom-start',
                middleware: middlewares
            }).then(({
                x,
                y
            }) => {
                if (this._targetElement != null) {
                    Object.assign(this._targetElement.style, {
                        left: `${x}px`,
                        top: `${y}px`
                    })
                }
            })
        }
    }

    private getTargetElement (): HTMLElement | null {
        if (this._element == null) {
            return null
        }

        const target = this._element.getAttribute(Dropdown.DEFAULT.attr.target)
        const configTarget = this.config.target ?? target

        if (typeof configTarget === 'string') {
            return DomEngine.findOrById(configTarget)
        }

        if (configTarget instanceof HTMLElement) {
            return configTarget
        }

        return DomEngine.nextElementSibling(this._element)
    }
}
