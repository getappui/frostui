/**
 * Component Instances
 * @alias: Never repeat component instance 😎
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

import type BaseComponent from '~/components/base'

const components: Map<string, Map<HTMLElement, BaseComponent>> = new Map<string, Map<HTMLElement, BaseComponent>>()

export default {
    set (type: string, element: HTMLElement, component: BaseComponent): void {
        if (!components.has(type)) {
            components.set(type, new Map())
        }
        const set = components.get(type)
        set!.set(element, component)
    },
    get<T extends BaseComponent> (type: string, element: HTMLElement): T | null {
        return components.get(type)?.get(element) as T || null
    },
    remove (type: string, element: HTMLElement): boolean {
        return components.get(type)?.delete(element) || true
    }
}
