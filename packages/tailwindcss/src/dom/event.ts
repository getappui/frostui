/**
 * Dom Event
 * @alias: Shortened DOM events utilities
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

import { DomEngine } from '~/dom/engine'

export const DomEvent = {

    addAfterEvent (element: HTMLElement, callback: Function, event: keyof HTMLElementEventMap | string) {
        const handleEvent = (e: any) => {
            callback(e)
            element.removeEventListener(event, handleEvent, true)
        }
        element.addEventListener(event, handleEvent, true)
    },

    afterTransition (element: HTMLElement, callback: Function) {
        if (window.getComputedStyle(element, null).getPropertyValue('transition-duration') !== '0s') {
            this.addAfterEvent(element, callback, 'transitionend')
        } else {
            callback()
        }
    },

    isMouseEventWithinElement (element: HTMLElement, event: MouseEvent) {
        const pos = {
            x: event.pageX,
            y: event.pageY
        }
        const rect = element.getBoundingClientRect()
        return pos.x < rect.right && pos.x > rect.left && pos.y < rect.bottom && pos.y > rect.top
    },
    listenOverlayClick (callback: EventListener) {
        DomEngine.getOverlay()?.addEventListener('click', callback)
    },

}
