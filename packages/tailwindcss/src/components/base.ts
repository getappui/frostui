/**
 * Base Component
 * @alias: It's base of frost 😀
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */

import { type BaseComponentOption } from '~/types/components'
import Instances from '~/components/instances'
import ComponentEvent from '~/components/events'
import { DomEngine } from '~/dom/engine'

export default class BaseComponent<CO extends BaseComponentOption = BaseComponentOption> {

    //Child class need to override `type` to store and retrieve instances
    static type: string = ''

    //Trigger Element
    protected _element: HTMLElement | null
    protected _destroyed: boolean = false

    constructor (element: HTMLElement | string | null, config?: CO | null) {
        if (typeof element === 'string') {
            this._element = DomEngine.findOrById(element)
        } else {
            this._element = element
        }

        this._config = (config ?? {}) as CO

        if (this._element != null) {
            Instances.set((this.constructor as typeof BaseComponent).type, this._element, this)
        }
    }

    //Component Configuration
    protected _config?: CO = {} as CO

    //Config Accessor
    public get config (): CO {
        return (this._config ?? {}) as CO
    }

    // Instances
    public static getInstance<T extends BaseComponent> (
        element: HTMLElement | null
    ): T | null {
        if (element == null) return null
        return Instances.get<T>(this.type, element)
    }

    public static getInstanceOrCreate<T extends BaseComponent> (
        element: HTMLElement | null,
        config?: BaseComponentOption): T | null {
        if (element == null) return null

        const instance = this.getInstance<T>(element)
        if (instance != null) {
            return instance
        }
        return new this(element, config) as T
    }

    // Register & Dispatch Events
    public addEventListener (event: string, callback: Function): void {
        ComponentEvent.addListener(this, event, callback)
    }

    public removeEventListener (event: string, callback: Function): void {
        ComponentEvent.removeListener(this, event, callback)
    }

    protected dispatchEvent (event: string): void {
        ComponentEvent.getCallbacks(this, event).forEach((e) => e())
    }

    // Destroy
    protected destroy (): void {
        this._destroyed = true

        // Component instance will clear after disposing
        if (this._element != null) {
            Instances.remove((this.constructor as typeof BaseComponent).type, this._element)
        }
    }
}
