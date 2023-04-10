import Collapse from '~/components/collapse'
import { DomEngine } from '~/dom/engine'
import Accordion from '~/components/accordion'
import Dropdown from '~/components/dropdown'
import Tab from '~/components/tab'
import Modal from '~/components/modal'
import Tooltip from '~/components/tooltip'
import Offcanvas from '~/components/offcanvas'
import Dismissable from '~/components/dismissable'

function autoAwake () {
    DomEngine.findAll(Collapse.SELECTOR).forEach((l) => new Collapse(l))
    DomEngine.findAll(Accordion.SELECTOR).forEach((l) => new Accordion(l))
    DomEngine.findAll(Dropdown.SELECTOR).forEach((l) => new Dropdown(l))
    DomEngine.findAll(Tab.SELECTOR).forEach((l) => new Tab(l))
    DomEngine.findAll(Modal.SELECTOR).forEach((l) => new Modal(l))
    DomEngine.findAll(Offcanvas.SELECTOR).forEach((l) => new Offcanvas(l))
    DomEngine.findAll(Tooltip.SELECTOR).forEach((l) => new Tooltip(l))
    DomEngine.findAll(Dismissable.SELECTOR).forEach((l) => new Dismissable(l))
}

const frost = {
    autoAwake,
    Collapse,
    Accordion,
    Dropdown,
    Tooltip,
    Modal,
    Offcanvas,
    Dismissable,
    Tab
}

export {
    autoAwake, Collapse, Accordion, Dropdown, Tooltip, Modal, Offcanvas, Dismissable, Tab
}

(window as any).frost = frost
DomEngine.addOverlay(['transition-all', 'fixed', 'inset-0', 'z-40', 'bg-gray-900', 'bg-opacity-50', 'dark:bg-opacity-80'])
autoAwake()
