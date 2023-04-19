import { DomEngine } from '~/dom/engine';
export const DomEvent = {
    addAfterEvent(element, callback, event) {
        const handleEvent = (e) => {
            callback(e);
            element.removeEventListener(event, handleEvent, true);
        };
        element.addEventListener(event, handleEvent, true);
    },
    afterTransition(element, callback) {
        if (window.getComputedStyle(element, null).getPropertyValue('transition-duration') !== '0s') {
            this.addAfterEvent(element, callback, 'transitionend');
        }
        else {
            callback();
        }
    },
    isMouseEventWithinElement(element, event) {
        const pos = {
            x: event.pageX,
            y: event.pageY
        };
        const rect = element.getBoundingClientRect();
        return pos.x < rect.right && pos.x > rect.left && pos.y < rect.bottom && pos.y > rect.top;
    },
    listenOverlayClick(callback) {
        DomEngine.getOverlay()?.addEventListener('click', callback);
    },
};
