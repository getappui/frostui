import { type IAppState, IThemeType } from '~/types'
import { Utils } from '~/utils/utils'

type IStateChangeListener = (state: IAppState) => void

export class AppState {

    protected static _old_state: IAppState | null = null
    private static _initialize = false
    private static stateKey = 'frost.app_state'
    private static defaultState: IAppState = { theme: 'light' }
    private static _listener: IStateChangeListener[] = []

    protected static _state: IAppState = this.defaultState

    static get state (): IAppState {
        if (!this._initialize) {
            this._initialize = this.retrieveFromLocal()
        }
        return this._state
    }

    static init (): void {
        this._initialize = this.retrieveFromLocal()
        this._old_state = Utils.deepClone(this._state)
        // new Proxy(this._state, {
        //     set (target: IAppState, p: string | symbol, newValue: any, receiver: any): boolean {
        //         return true;
        //     }
        // })
    }

    static changeTheme (theme: IThemeType): void {
        this._state.theme = theme
        this.updateState()
    }

    private static updateState (): void {
        this.updateInLocal();
        this.notifyListener();
    }

    private static updateInLocal (): void {
        localStorage.setItem(this.stateKey, JSON.stringify(this._state))
    }

    private static retrieveFromLocal (): boolean {
        const stateText = localStorage.getItem(this.stateKey)
        if (stateText == null) {
            this._state = this.defaultState
            return true
        }

        const state = JSON.parse(stateText) as IAppState
        Object.keys(state).forEach((key) => (state as any)[key] == null ? (state as any)[key] = (this.defaultState as any)[key] : void 0)
        this._state = state;
        return true
    }

    static attachListener (listener: IStateChangeListener) {
        this._listener.push(listener)
    }

    static detachListener (listener: IStateChangeListener) {
        this._listener = this._listener.filter((l) => l != listener)
    }

    private static notifyListener(){
        for(const listener of this._listener){
            listener(AppState.state);
        }
    }
}
