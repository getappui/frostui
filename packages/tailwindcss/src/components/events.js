const componentEvents = new Map();
export default {
    addListener(component, type, callback) {
        if (!componentEvents.has(component)) {
            componentEvents.set(component, new Map());
        }
        const set = componentEvents.get(component);
        let list = set.get(type);
        if (list == null) {
            list = [];
        }
        list.push(callback);
        set.set(type, list);
    },
    removeListener(component, type, callback) {
        if (!componentEvents.has(component)) {
            return;
        }
        const set = componentEvents.get(component);
        let list = set.get(type);
        if (list == null) {
            return;
        }
        list = list.filter((l) => l != callback);
        set.set(type, list);
    },
    getCallbacks(component, type) {
        return componentEvents.get(component)?.get(type) ?? [];
    }
};
