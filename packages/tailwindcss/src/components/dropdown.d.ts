import BaseComponent from './base';
import { type DropdownOption } from '~/types';
export default class Dropdown extends BaseComponent<DropdownOption> {
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
        };
        attr: {
            target: string;
            placement: string;
            trigger: string;
            offset: string;
        };
    };
    private _targetElement;
    private clicked;
    private _targetOffset;
    constructor(element: HTMLElement | string | null, config?: DropdownOption | null);
    get isShown(): boolean;
    get isHover(): boolean;
    show(): void;
    hide(): void;
    toggle(): void;
    private init;
    private initOptions;
    private initListener;
    private keyListener;
    private addComputePositionInTargetElement;
    private getTargetElement;
}
