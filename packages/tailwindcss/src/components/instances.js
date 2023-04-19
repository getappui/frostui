const components = new Map();
export default {
    set(type, element, component) {
        if (!components.has(type)) {
            components.set(type, new Map());
        }
        const set = components.get(type);
        set.set(element, component);
    },
    get(type, element) {
        return components.get(type)?.get(element) || null;
    },
    remove(type, element) {
        return components.get(type)?.delete(element) || true;
    }
};
