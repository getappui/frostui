import Collapse from '~/components/collapse'
import { DomEngine } from '~/dom/engine'
import Accordion from '~/components/accordion'
import Dropdown from '~/components/dropdown'
import Tab from '~/components/tab'
import Modal from '~/components/modal'
import Tooltip from '~/components/tooltip'
import Offcanvas from '~/components/offcanvas'
import Dismissable from '~/components/dismissable'
import { AppState } from '~/dom/state'
import { ThemeController } from '~/controllers/theme_controller'
import ThemeSwitcher from '~/components/theme_switcher'

export class FrostApp {

    private static _instance: FrostApp | null = null

    static get instance (): FrostApp {
        if (this._instance==null) {
            this._instance = new FrostApp()
        }
        return this._instance
    }

    init () {
        if (typeof window !== 'undefined') {
            AppState.init()
            ThemeController.init()
            DomEngine.addOverlay(['transition-all', 'fixed', 'inset-0', 'z-40', 'bg-gray-900', 'bg-opacity-50', 'dark:bg-opacity-80'])
            FrostApp.instance.awakeComponents();
        }
    }

    private awakeComponents () {
        [Collapse, Accordion, Dropdown, Tab, Modal, Offcanvas, Tooltip, Dismissable, ThemeSwitcher]
            .map((c) => DomEngine.findAll(c.SELECTOR).forEach((l) => c.getInstanceOrCreate(l)))
    }

}

