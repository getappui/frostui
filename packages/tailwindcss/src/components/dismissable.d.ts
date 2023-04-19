import BaseComponent from './base';
import { DismissableOption } from '~/types';
export default class Dismissable extends BaseComponent<DismissableOption> {
    static readonly type: string;
    static readonly SELECTOR: string;
    static readonly EVENTS: {
        hide: string;
        hidden: string;
    };
    static readonly DEFAULT: {
        class: {
            hidden: string;
        };
        attr: {
            target: string;
        };
    };
    private _targetElement;
    constructor(element: HTMLElement | string | null, config?: DismissableOption | null);
    protected init(): void;
    private initListener;
    hide(): void;
    private _getTargetElement;
}
