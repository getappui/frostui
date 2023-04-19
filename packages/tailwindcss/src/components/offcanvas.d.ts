import BaseComponent from './base';
import { OffcanvasOption } from '~/types';
export default class Offcanvas extends BaseComponent<OffcanvasOption> {
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
            dismiss: string;
            behavior: string;
            scroll: string;
            backdrop: string;
        };
    };
    private _targetElement;
    constructor(element: HTMLElement | string | null, config?: OffcanvasOption | null);
    private init;
    private initOptions;
    private initListener;
    private keyListener;
    get isShown(): boolean;
    get isStatic(): boolean;
    show(): void;
    hide(): void;
    toggle(): void;
    private getTargetElement;
}
