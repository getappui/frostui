/**
 * Tab
 * @alias: Need small navigation?
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

import BaseComponent from './base'
import { type TabOption } from '~/types'
import { DomEngine } from '~/dom/engine'

export default class Tab extends BaseComponent<TabOption> {

    static readonly type: string = 'tab'
    static readonly SELECTOR: string = '[data-fc-type="tab"]'

    // Element
    private _elements = new Map<HTMLElement, HTMLElement>()

    // Default Parameters
    static readonly DEFAULT = {
        attr: {
            target: 'data-fc-target',
        }
    }

    constructor (element: HTMLElement | string | null, config?: TabOption | null) {
        super(element, config)
        this.init()
    }

    private init (): void {
        if (this._element != null) {

            const map = new Map<HTMLElement, HTMLElement>()

            const tabElements = this._element.querySelectorAll('[data-fc-target]')
            for (const tab of tabElements) {
                const id = tab.getAttribute(Tab.DEFAULT.attr.target)
                if (id != null) {
                    const content = DomEngine.findOrById(id)
                    if (content != null) {
                        map.set(tab as HTMLElement, content as HTMLElement)
                    }
                }
            }

            // TODO: Auto discover - In development
            // if (this._element.children.length != 2) {
            //    return console.error('Tab is not setup properly')
            // }
            // const tabElements = this._element.children[0].children
            // const contentElements = this._element.children[1]
            // for (const tab of tabElements) {
            //   const id = tab.getAttribute(Tab.DEFAULT.attr.target)
            //   if (id != null) {
            //     const content = contentElements.querySelector(id)
            //     if (content != null) {
            //       map.set(tab as HTMLElement, content as HTMLElement)
            //     }
            //   }
            // }
            //
            this._elements = map

            this.initListener()
        }
    }

    private initListener () {
        for (const tab of this._elements.keys()) {
            tab.addEventListener('click', () => {
                this.showTab(tab)
            })
        }
    }

    private showTab (selectedTab: HTMLElement) {
        for (const tab of this._elements.keys()) {
            const content = this._elements.get(tab)!
            if (selectedTab == tab) {
                content.classList.remove('hidden')
                setTimeout(() => {
                    tab.classList.add('active')
                    content.classList.add('active')
                })
            } else {
                tab.classList.remove('active')
                content.classList.remove('active')
                setTimeout(() => {
                    content.classList.add('hidden')
                })
            }
        }
    }
}
