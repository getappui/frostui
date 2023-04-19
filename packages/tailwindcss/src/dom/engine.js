export const DomEngine = {
    findAll(selector) {
        return Array.from(document.querySelectorAll(selector));
    },
    findAllInElement(element, selector) {
        return Array.from(element.querySelectorAll(selector));
    },
    findOnlyChildrenInElement(element, selector) {
        return Array.from(element.querySelectorAll(':scope > ' + selector));
    },
    find(selector) {
        return document.querySelector(selector);
    },
    findById(id) {
        return document.getElementById(id);
    },
    findOrById(queryId) {
        return queryId.length != 0 && queryId.charAt(0) == '#' ? document.querySelector(queryId) : document.getElementById(queryId);
    },
    nextElementSibling(element) {
        return element.nextElementSibling instanceof HTMLElement ? element.nextElementSibling : null;
    },
    getSiblingElement(element) {
        return element.nextElementSibling;
    },
    addOverlay(classNames) {
        const overlay = document.createElement('div');
        overlay.classList.add(...classNames);
        overlay.classList.add('hidden');
        overlay.setAttribute('data-fc-overlay-backdrop', '');
        document.body.appendChild(overlay);
        return overlay;
    },
    showOverlay() {
        this.getOverlay()?.classList.remove('hidden');
    },
    hideOverlay() {
        this.getOverlay()?.classList.add('hidden');
    },
    getOverlay() {
        return document.querySelector('[data-fc-overlay-backdrop=""]');
    },
    isElementSameOrContains(parent, child) {
        return parent.contains(child) || parent == child;
    },
    isElementContains(parent, child) {
        return parent.contains(child) && parent != child;
    }
};
