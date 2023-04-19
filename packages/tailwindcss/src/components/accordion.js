import BaseComponent from '~/components/base';
import { DomEngine } from '~/dom/engine';
import Collapse from '~/components/collapse';
export default class Accordion extends BaseComponent {
    static type = 'accordion';
    static SELECTOR = '[data-fc-type="accordion"]';
    static DEFAULT = {
        attr: {
            parent: 'data-fc-parent'
        }
    };
    targetCollapses = [];
    constructor(element, config) {
        super(element, config);
        this.init();
    }
    init() {
        if (this._element != null) {
            const targetCollapsesElements = DomEngine.findAllInElement(this._element, Collapse.SELECTOR);
            let discovered = false;
            for (let ele of targetCollapsesElements) {
                if (ele.hasAttribute(Accordion.DEFAULT.attr.parent)) {
                    discovered = true;
                    break;
                }
            }
            if (!discovered) {
                this.targetCollapses = targetCollapsesElements.map((e) => Collapse.getInstanceOrCreate(e));
            }
            else {
                const id = this._element.id;
                this.targetCollapses = targetCollapsesElements.filter((e) => e.getAttribute(Accordion.DEFAULT.attr.parent) == id)
                    .map((e) => Collapse.getInstanceOrCreate(e));
            }
            this.initListeners();
        }
    }
    initListeners() {
        this.targetCollapses.forEach((collapse) => {
            collapse.addEventListener(Collapse.EVENTS.show, () => {
                if (!this._destroyed) {
                    this.targetCollapses.filter((c) => c != collapse).forEach((c) => c.hide());
                }
            });
        });
    }
}
