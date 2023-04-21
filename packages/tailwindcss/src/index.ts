import { FrostApp } from '~/frost'
import Collapse from '~/components/collapse'
import Accordion from '~/components/accordion'
import Dropdown from '~/components/dropdown'
import Tooltip from '~/components/tooltip'
import Modal from '~/components/modal'
import Offcanvas from '~/components/offcanvas'
import Dismissable from '~/components/dismissable'
import ThemeSwitcher from '~/components/theme_switcher'
import Tab from '~/components/tab'

const app = FrostApp.instance


const frost = {
    Collapse,
    Accordion,
    Dropdown,
    Tooltip,
    Modal,
    Offcanvas,
    Dismissable,
    Tab,
    app
}

const initFrost = app.init

if (typeof window != 'undefined') {
    (window as any).frost = frost
    initFrost()
}

export {
    initFrost, Collapse, Accordion, Dropdown, Tooltip, Modal, Offcanvas, Dismissable, Tab, ThemeSwitcher
}
