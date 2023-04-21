/**
 * Dom Engine
 * @alias: Shortened DOM related utilities
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

export const DomEngine = {

    findAll (selector: string): HTMLElement[] {
        return Array.from(document.querySelectorAll<HTMLElement>(selector))
    },
    findAllInElement (element: HTMLElement, selector: string): HTMLElement[] {
        return Array.from(element.querySelectorAll<HTMLElement>(selector))
    },
    findOnlyChildrenInElement (element: HTMLElement, selector: string): HTMLElement[] {
        return Array.from(element.querySelectorAll<HTMLElement>(':scope > ' + selector))
    },

    find (selector: string): HTMLElement | null {
        return document.querySelector<HTMLElement>(selector)
    },

    findById (id: string): HTMLElement | null {
        return document.getElementById(id)
    },

    findOrById (queryId: string): HTMLElement | null {
        return queryId.length != 0 && queryId.charAt(0) == '#' ? document.querySelector(queryId) : document.getElementById(queryId)
    },

    nextElementSibling (element: HTMLElement): HTMLElement | null {
        return element.nextElementSibling instanceof HTMLElement ? element.nextElementSibling : null
    },

    getSiblingElement (element: HTMLElement): Element | null {
        return element.nextElementSibling
    },
    addOverlay (classNames: string[]) {
        const overlay = document.createElement('div')
        overlay.classList.add(...classNames)
        overlay.classList.add('hidden')
        overlay.setAttribute('data-fc-overlay-backdrop', '')
        document.body.appendChild(overlay)
        return overlay
    },
    showOverlay (): void {
        this.getOverlay()?.classList.remove('hidden')
    },
    hideOverlay (): void {
        this.getOverlay()?.classList.add('hidden')
    },
    getOverlay (): HTMLElement | null {
        return document.querySelector('[data-fc-overlay-backdrop=""]')
    },
    isElementSameOrContains (parent: HTMLElement, child: HTMLElement) {
        return parent.contains(child) || parent == child
    },
    isElementContains (parent: HTMLElement, child: HTMLElement) {
        return parent.contains(child) && parent != child
    },
    getAttribute<T>(element: HTMLElement, qualifiedName: string, defaultValue: T|null = null): T|null {
        return element.hasAttribute(qualifiedName) ? element.getAttribute(qualifiedName) as T : defaultValue
    }

}
