export declare const DomEngine: {
    findAll(selector: string): HTMLElement[];
    findAllInElement(element: HTMLElement, selector: string): HTMLElement[];
    findOnlyChildrenInElement(element: HTMLElement, selector: string): HTMLElement[];
    find(selector: string): HTMLElement | null;
    findById(id: string): HTMLElement | null;
    findOrById(queryId: string): HTMLElement | null;
    nextElementSibling(element: HTMLElement): HTMLElement | null;
    getSiblingElement(element: HTMLElement): Element | null;
    addOverlay(classNames: string[]): HTMLDivElement;
    showOverlay(): void;
    hideOverlay(): void;
    getOverlay(): HTMLElement | null;
    isElementSameOrContains(parent: HTMLElement, child: HTMLElement): boolean;
    isElementContains(parent: HTMLElement, child: HTMLElement): boolean;
};
