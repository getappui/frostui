import Instances from '~/components/instances';
import ComponentEvent from '~/components/events';
import { DomEngine } from '~/dom/engine';
export default class BaseComponent {
    static type = '';
    _element;
    _destroyed = false;
    constructor(element, config) {
        if (typeof element === 'string') {
            this._element = DomEngine.findOrById(element);
        }
        else {
            this._element = element;
        }
        this._config = (config ?? {});
        if (this._element != null) {
            Instances.set(this.constructor.type, this._element, this);
        }
    }
    _config = {};
    get config() {
        return (this._config ?? {});
    }
    static getInstance(element) {
        if (element == null)
            return null;
        return Instances.get(this.type, element);
    }
    static getInstanceOrCreate(element, config) {
        if (element == null)
            return null;
        const instance = this.getInstance(element);
        if (instance != null) {
            return instance;
        }
        return new this(element, config);
    }
    addEventListener(event, callback) {
        ComponentEvent.addListener(this, event, callback);
    }
    removeEventListener(event, callback) {
        ComponentEvent.removeListener(this, event, callback);
    }
    dispatchEvent(event) {
        ComponentEvent.getCallbacks(this, event).forEach((e) => e());
    }
    destroy() {
        this._destroyed = true;
        if (this._element != null) {
            Instances.remove(this.constructor.type, this._element);
        }
    }
}
