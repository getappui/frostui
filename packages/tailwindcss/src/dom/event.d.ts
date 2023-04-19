export declare const DomEvent: {
    addAfterEvent(element: HTMLElement, callback: Function, event: keyof HTMLElementEventMap | string): void;
    afterTransition(element: HTMLElement, callback: Function): void;
    isMouseEventWithinElement(element: HTMLElement, event: MouseEvent): boolean;
    listenOverlayClick(callback: EventListener): void;
};
