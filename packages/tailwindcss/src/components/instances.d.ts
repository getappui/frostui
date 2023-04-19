import type BaseComponent from '~/components/base';
declare const _default: {
    set(type: string, element: HTMLElement, component: BaseComponent): void;
    get<T extends BaseComponent<import("../types").BaseComponentOption>>(type: string, element: HTMLElement): T | null;
    remove(type: string, element: HTMLElement): boolean;
};
export default _default;
