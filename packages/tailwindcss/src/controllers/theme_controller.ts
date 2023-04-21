import { IAppState } from '~/types'
import { AppState } from '~/dom/state'

export class ThemeController {

    static init () {
        AppState.attachListener(this.themeChangeListener);
        this.themeChangeListener(AppState.state);
    }

    static themeChangeListener (state: IAppState) {
        if (state.theme == 'system') {
            ThemeController.changeTheme((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light')
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ThemeController.windowThemeListener)
        } else {
            ThemeController.changeTheme(state.theme)
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', ThemeController.windowThemeListener)
        }
    }

    static windowThemeListener (event: MediaQueryListEvent) {
        ThemeController.changeTheme(event.matches ? 'dark' : 'light')
    }

    static changeTheme (theme: 'light' | 'dark') {
        const htmlElement = document.getElementsByTagName('html')[0]
        if (theme === 'dark') {
            htmlElement.classList.add('dark')
        } else {
            htmlElement.classList.remove('dark')
        }
    }

}
