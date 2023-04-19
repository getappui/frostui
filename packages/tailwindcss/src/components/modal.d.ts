import BaseComponent from './base';
import { type ModalOption } from '~/types';
export default class Modal extends BaseComponent<ModalOption> {
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
            overflowHidden: string;
        };
        attr: {
            target: string;
            dismiss: string;
            behavior: string;
        };
    };
    private _targetElement;
    private _windowClickListen;
    get isShown(): boolean;
    get isStatic(): boolean;
    constructor(element: HTMLElement | string | null, config?: ModalOption | null);
    private init;
    private initOptions;
    private initListener;
    private keyListener;
    onWindowClicked: (event: MouseEvent) => void;
    show(): void;
    hide(): void;
    toggle(): void;
    private getTargetElement;
}
