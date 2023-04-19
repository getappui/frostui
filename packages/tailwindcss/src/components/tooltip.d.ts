import BaseComponent from './base';
import { type TooltipOption } from '~/types';
export default class Tooltip extends BaseComponent<TooltipOption> {
    static readonly type: string;
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
            opacity0: string;
            opacity100: string;
            absolute: string;
        };
        attr: {
            target: string;
            placement: string;
            trigger: string;
            arrow: string;
            offset: string;
        };
    };
    private _targetElement;
    private _arrowElement;
    private _targetOffset;
    constructor(element: HTMLElement | string | null, config?: TooltipOption | null);
    get isShown(): boolean;
    get isClickTrigger(): boolean;
    show(): void;
    hide(): void;
    toggle(): void;
    private init;
    private initOptions;
    private initListener;
    private computeTooltipPosition;
}
