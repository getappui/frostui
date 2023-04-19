import { type BaseComponentOption } from '~/types/components';
export default class BaseComponent<CO extends BaseComponentOption = BaseComponentOption> {
    static type: string;
    protected _element: HTMLElement | null;
    protected _destroyed: boolean;
    constructor(element: HTMLElement | string | null, config?: CO | null);
    protected _config?: CO;
    get config(): CO;
    static getInstance<T extends BaseComponent>(element: HTMLElement | null): T | null;
    static getInstanceOrCreate<T extends BaseComponent>(element: HTMLElement | null, config?: BaseComponentOption): T | null;
    addEventListener(event: string, callback: Function): void;
    removeEventListener(event: string, callback: Function): void;
    protected dispatchEvent(event: string): void;
    protected destroy(): void;
}
