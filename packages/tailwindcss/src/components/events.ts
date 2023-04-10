/**
 * Component Events
 * @alias: Every reaction on component will record 👀
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

import type BaseComponent from '~/components/base'

// Instance Map
const componentEvents = new Map<BaseComponent, Map<string, Function[]>>()

export default {
    addListener (component: BaseComponent, type: string, callback: Function): void {
        if (!componentEvents.has(component)) {
            componentEvents.set(component, new Map())
        }
        const set = componentEvents.get(component)
        let list = set!.get(type)
        if (list == null) {
            list = []
        }
        list.push(callback)
        set!.set(type, list)
    },
    removeListener (component: BaseComponent, type: string, callback: Function) {
        if (!componentEvents.has(component)) {
            return
        }
        const set = componentEvents.get(component)
        let list = set!.get(type)
        if (list == null) {
            return
        }
        list = list.filter((l) => l != callback)
        set!.set(type, list)
    },
    getCallbacks (component: BaseComponent, type: string): Function[] {
        return componentEvents.get(component)?.get(type) ?? []
    }
}
