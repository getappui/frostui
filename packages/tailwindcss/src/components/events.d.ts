import type BaseComponent from '~/components/base';
declare const _default: {
    addListener(component: BaseComponent, type: string, callback: Function): void;
    removeListener(component: BaseComponent, type: string, callback: Function): void;
    getCallbacks(component: BaseComponent, type: string): Function[];
};
export default _default;
