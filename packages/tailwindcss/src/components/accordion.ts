/**
 * Accordion
 * @alias: Build accordion over collapse components
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

import BaseComponent from '~/components/base'
import { DomEngine } from '~/dom/engine'
import Collapse from '~/components/collapse'
import { type AccordionOption } from '~/types'

export default class Accordion extends BaseComponent<AccordionOption> {

    static readonly type: string = 'accordion'
    static readonly SELECTOR: string = '[data-fc-type="accordion"]'

    //Default Parameters
    static readonly DEFAULT = {
        attr: {
            parent: 'data-fc-parent'
        }
    }

    private targetCollapses: Collapse[] = []

    constructor (element: HTMLElement | string | null, config?: AccordionOption | null) {
        super(element, config)
        this.init()
    }

    private init (): void {
        if (this._element != null) {
            const targetCollapsesElements = DomEngine.findAllInElement(this._element, Collapse.SELECTOR)
            let discovered = false
            for (let ele of targetCollapsesElements) {
                if (ele.hasAttribute(Accordion.DEFAULT.attr.parent)) {
                    discovered = true
                    break
                }
            }

            if (!discovered) {
                this.targetCollapses = targetCollapsesElements.map((e) => Collapse.getInstanceOrCreate<Collapse>(e)!)
            } else {
                const id = this._element.id
                this.targetCollapses = targetCollapsesElements.filter((e) => e.getAttribute(Accordion.DEFAULT.attr.parent) == id)
                    .map((e) => Collapse.getInstanceOrCreate<Collapse>(e)!)
            }

            //TODO: In Dev: Auto discover mode
            // this.targetCollapses = DomEngine.findOnlyChildrenInElement(this._element, Collapse.SELECTOR)
            //     .map((e) => Collapse.getInstanceOrCreate<Collapse>(e)!)

            this.initListeners()
        }
    }

    private initListeners () {
        this.targetCollapses.forEach((collapse) => {
            collapse.addEventListener(Collapse.EVENTS.show, () => {
                if (!this._destroyed) {
                    this.targetCollapses.filter((c) => c != collapse).forEach((c) => c.hide())
                }
            })
        })
    }
}
