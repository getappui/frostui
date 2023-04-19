import BaseComponent from './base';
import { DomEngine } from '~/dom/engine';
export default class Tab extends BaseComponent {
    static type = 'tab';
    static SELECTOR = '[data-fc-type="tab"]';
    static DEFAULT = {
        attr: {
            target: 'data-fc-target',
        }
    };
    _elements = new Map();
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    init() {
        if (this._element != null) {
            const map = new Map();
            const tabElements = this._element.querySelectorAll('[data-fc-target]');
            for (const tab of tabElements) {
                const id = tab.getAttribute(Tab.DEFAULT.attr.target);
                if (id != null) {
                    const content = DomEngine.findOrById(id);
                    if (content != null) {
                        map.set(tab, content);
                    }
                }
            }
            this._elements = map;
            this.initListener();
        }
    }
    initListener() {
        for (const tab of this._elements.keys()) {
            tab.addEventListener('click', () => {
                this.showTab(tab);
            });
        }
    }
    showTab(selectedTab) {
        const activatedContent = this._elements.get(selectedTab);
        const otherTabs = Array.from(this._elements.keys()).filter((e) => e != selectedTab);
        const otherContent = otherTabs.map((e) => this._elements.get(e));
        activatedContent?.classList.remove('hidden');
        otherContent.forEach((e) => e.classList.add('hidden'));
        activatedContent?.classList.add('active');
        selectedTab.classList.add('active');
        otherContent.forEach((e) => e.classList.remove('active'));
        otherTabs.forEach((e) => e.classList.remove('active'));
    }
}
