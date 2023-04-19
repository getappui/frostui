import BaseComponent from './base';
import { type TabOption } from '~/types';
export default class Tab extends BaseComponent<TabOption> {
    static readonly type: string;
    static readonly SELECTOR: string;
    static readonly DEFAULT: {
        attr: {
            target: string;
        };
    };
    private _elements;
    constructor(element: HTMLElement | string | null, config?: TabOption | null);
    private init;
    private initListener;
    private showTab;
}
