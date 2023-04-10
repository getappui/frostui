/**
 * Dismissable
 * @alias: Remove, if you read ✖
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

import BaseComponent from './base'
import { DismissableOption } from '~/types'
import { DomEngine } from '~/dom/engine'

export default class Dismissable extends BaseComponent<DismissableOption> {

    static readonly type: string = 'dismissable'
    static readonly SELECTOR: string = '[data-fc-dismiss]'

    // Events
    static readonly EVENTS = {
        hide: 'fc.dismissable.hide',
        hidden: 'fc.dismissable.hidden'
    }

    // Default Parameters
    static readonly DEFAULT = {
        class: {
            hidden: 'hidden',
        },
        attr: {
            target: 'data-fc-dismiss'
        }
    }

    //Target Element
    private _targetElement: HTMLElement | null = null

    constructor (element: HTMLElement | string | null, config?: DismissableOption | null) {
        super(element, config)
        this.init()
    }

    protected init () {
        if (this._element != null) {
            this._targetElement = this._getTargetElement()
        }

        if (this._targetElement) {
            this.initListener()
        }
    }

    private initListener () {
        this._element!.addEventListener('click', () => {
            this.hide()
        })
    }

    public hide (): void {
        this.dispatchEvent(Dismissable.EVENTS.hide)

        if (this._targetElement != null) {
            this._targetElement!.classList.add(Dismissable.DEFAULT.class.hidden)
        }

        this.dispatchEvent(Dismissable.EVENTS.hidden)
    }

    // Helper
    private _getTargetElement (): HTMLElement | null {
        if (this._element == null) {
            return null
        }

        const target = this.config.target ?? this._element.getAttribute(Dismissable.DEFAULT.attr.target)

        if (typeof target === 'string') {
            return DomEngine.findOrById(target)
        }

        if (target instanceof HTMLElement) {
            return target
        }

        return this._element.parentElement
    }
}
