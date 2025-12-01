// ===== STATE MANAGEMENT =====
class State {
    constructor() {
        this.data = {
            currentType: null, // 'portfolio' or 'resume'
            currentTemplate: null,
            formData: {},
            savedItems: [],
            settings: {
                autoSave: true,
                theme: 'dark'
            }
        };
        this.listeners = [];
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        this.notify();
    }

    update(updates) {
        Object.assign(this.data, updates);
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        this.listeners.forEach(listener => listener(this.data));
    }

    reset() {
        this.data.formData = {};
        this.data.currentTemplate = null;
        this.notify();
    }
}

export const state = new State();
