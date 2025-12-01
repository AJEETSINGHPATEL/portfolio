import localforage from 'localforage';

// ===== STORAGE SYSTEM =====

// Configure localforage for images
const imageStore = localforage.createInstance({
    name: 'portfolio-builder',
    storeName: 'images'
});

// Configure localforage for data
const dataStore = localforage.createInstance({
    name: 'portfolio-builder',
    storeName: 'data'
});

// Storage API
export const storage = {
    // Save form data
    async saveFormData(type, templateId, data) {
        const key = `${type}_${templateId}_${Date.now()}`;
        await dataStore.setItem(key, {
            type,
            templateId,
            data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return key;
    },

    // Get all saved items
    async getSavedItems() {
        const items = [];
        await dataStore.iterate((value, key) => {
            items.push({ id: key, ...value });
        });
        return items.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    },

    // Get single item
    async getItem(id) {
        return await dataStore.getItem(id);
    },

    // Update item
    async updateItem(id, data) {
        const existing = await dataStore.getItem(id);
        if (existing) {
            existing.data = data;
            existing.updatedAt = new Date().toISOString();
            await dataStore.setItem(id, existing);
        }
    },

    // Delete item
    async deleteItem(id) {
        await dataStore.removeItem(id);
    },

    // Save image
    async saveImage(imageData) {
        const id = `img_${Date.now()}`;
        await imageStore.setItem(id, imageData);
        return id;
    },

    // Get image
    async getImage(id) {
        return await imageStore.getItem(id);
    },

    // Export all data
    async exportData() {
        const data = {};
        await dataStore.iterate((value, key) => {
            data[key] = value;
        });
        return JSON.stringify(data, null, 2);
    },

    // Import data
    async importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            for (const [key, value] of Object.entries(data)) {
                await dataStore.setItem(key, value);
            }
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    },

    // Clear all data
    async clearAll() {
        await dataStore.clear();
        await imageStore.clear();
    }
};

// Auto-save functionality
let autoSaveTimeout;
export function setupAutoSave(getData, interval = 2000) {
    return () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(async () => {
            const data = getData();
            if (data.id) {
                await storage.updateItem(data.id, data.formData);
            }
        }, interval);
    };
}
