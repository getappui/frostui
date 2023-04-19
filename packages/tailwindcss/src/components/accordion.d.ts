import BaseComponent from '~/components/base';
import { type AccordionOption } from '~/types';
export default class Accordion extends BaseComponent<AccordionOption> {
    static readonly type: string;
    static readonly SELECTOR: string;
    static readonly DEFAULT: {
        attr: {
            parent: string;
        };
    };
    private targetCollapses;
    constructor(element: HTMLElement | string | null, config?: AccordionOption | null);
    private init;
    private initListeners;
}
