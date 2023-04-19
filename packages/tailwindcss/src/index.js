import Collapse from '~/components/collapse';
import { DomEngine } from '~/dom/engine';
import Accordion from '~/components/accordion';
import Dropdown from '~/components/dropdown';
import Tab from '~/components/tab';
import Modal from '~/components/modal';
import Tooltip from '~/components/tooltip';
import Offcanvas from '~/components/offcanvas';
import Dismissable from '~/components/dismissable';
function autoAwake() {
    [Collapse, Accordion, Dropdown, Tab, Modal, Offcanvas, Tooltip, Dismissable]
        .map((c) => DomEngine.findAll(c.SELECTOR).forEach((l) => c.getInstanceOrCreate(l)));
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
};
export { autoAwake, Collapse, Accordion, Dropdown, Tooltip, Modal, Offcanvas, Dismissable, Tab };
if (typeof window !== 'undefined') {
    window.frost = frost;
    DomEngine.addOverlay(['transition-all', 'fixed', 'inset-0', 'z-40', 'bg-gray-900', 'bg-opacity-50', 'dark:bg-opacity-80']);
    autoAwake();
}
