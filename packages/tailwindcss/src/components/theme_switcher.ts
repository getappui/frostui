/**
 * Theme Switcher
 * @alias: Inline theme changer, No need custom javascript
 * @version: 0.1.0
 * @author: Getappui
 * @copyright: 2023 Getappui
 * @license: MIT
 */
import BaseComponent from './base'
import { IThemeSwitcherTrigger, IThemeType, ThemeSwitcherOption } from '~/types'
import { AppState } from '~/dom/state'
import { DomEngine } from '~/dom/engine'

export default class ThemeSwitcher extends BaseComponent<ThemeSwitcherOption> {

    static readonly type: string = 'theme_switcher'
    static readonly SELECTOR: string = '[data-fc-type="theme_switcher"]'

    //Default Parameters
    static readonly DEFAULT = {
        class: {
            base: 'fc-theme'
        },
        attr: {
            theme: 'data-fc-theme',
            trigger: 'data-fc-trigger',
        }
    }
    public theme: IThemeType | null = null
    public trigger: IThemeSwitcherTrigger | null = null

    constructor (element: HTMLElement | string | null, config?: ThemeSwitcherOption | null) {
        super(element, config)
        this.init()
    }

    public notifyThemeChanged (theme: IThemeType) {
        if (this.trigger != 'switch') {
            this._element?.classList.remove(...['light-theme', 'dark-theme', 'system-theme'])
            this._element?.classList.add(`${theme}-theme`);
        } else if (this._element instanceof HTMLInputElement) {
            const input = this._element as HTMLInputElement
            if (theme != 'dark') {
                input.removeAttribute('checked')
                input.checked=false;
            } else {
                input.setAttribute('checked', 'checked')
                input.checked=true;
            }
        }

    }

    private init (): void {
        if (this._element != null) {
            this._element.classList.add(ThemeSwitcher.DEFAULT.class.base)

            this.theme = DomEngine.getAttribute(this._element, ThemeSwitcher.DEFAULT.attr.theme, this.config.theme)
            this.trigger = DomEngine.getAttribute(this._element, ThemeSwitcher.DEFAULT.attr.trigger, this.config.trigger)

            this.initListeners()
            this.notifyThemeChanged(AppState.state.theme)

        }
    }

    private initListeners () {
        if (this.trigger == 'switch' && this._element instanceof HTMLInputElement) {
            const input = this._element as HTMLInputElement
            input?.addEventListener('change', (e) => {
                AppState.changeTheme(input.checked ? 'dark' : 'light')
                this.setOtherSwitch()
            })
        } else if (this.theme != null && this.trigger != 'never') {
            this._element?.addEventListener('click', () => {
                AppState.changeTheme(this.theme!)
                this.setOtherSwitch()
            })
        }
    }

    private setOtherSwitch () {
        const theme = AppState.state.theme
        DomEngine.findAll(ThemeSwitcher.SELECTOR).map((e) => ThemeSwitcher.getInstanceOrCreate<ThemeSwitcher>(e)).forEach((switcher) => {
            switcher?.notifyThemeChanged(theme)
        })
    }

}
