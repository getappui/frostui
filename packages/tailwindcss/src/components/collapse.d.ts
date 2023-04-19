import BaseComponent from '~/components/base';
import { type CollapseOption } from '~/types/components';
export default class Collapse extends BaseComponent<CollapseOption> {
    static readonly type = "collapse";
    static readonly SELECTOR: string;
    static readonly EVENTS: {
        show: string;
        shown: string;
        hide: string;
        hidden: string;
    };
    static readonly DEFAULT: {
        class: {
            base: string;
            hidden: string;
            open: string;
        };
        attr: {
            target: string;
        };
    };
    private _targetElement;
    constructor(element: HTMLElement | string | null, config?: CollapseOption | null);
    protected init(): void;
    private initOptions;
    private initListener;
    get isShown(): boolean;
    show(): void;
    hide(): void;
    toggle(): void;
    private getTargetElement;
}
