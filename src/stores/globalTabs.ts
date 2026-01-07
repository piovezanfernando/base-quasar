import { defineStore } from 'pinia';
import { markRaw } from 'vue';

export interface GlobalTab {
    id: string;
    label: string;
    componentName: string; // The specific component to render (e.g., 'ClassificationPage')
    icon?: string;
    meta?: any;
}

export const useGlobalTabsStore = defineStore('globalTabs', {
    state: () => ({
        tabs: [] as GlobalTab[],
        activeTabId: null as string | null,
    }),

    actions: {
        /**
         * Opens a tab. If receiving a duplicate ID, just activates it.
         */
        openTab(tab: GlobalTab) {
            const existing = this.tabs.find((t) => t.id === tab.id);
            if (existing) {
                this.activeTabId = existing.id;
                return;
            }

            this.tabs.push(tab);
            this.activeTabId = tab.id;
        },

        /**
         * Closes a tab and tries to activate the nearest neighbor.
         */
        closeTab(id: string) {
            const index = this.tabs.findIndex((t) => t.id === id);
            if (index === -1) return;

            this.tabs.splice(index, 1);

            // If we closed the active tab, switch to another one
            if (this.activeTabId === id) {
                if (this.tabs.length > 0) {
                    // Try previous one, or the new one at specific index
                    const newIndex = Math.max(0, index - 1);
                    this.activeTabId = this.tabs[newIndex].id;
                } else {
                    this.activeTabId = null;
                }
            }
        },

        activateTab(id: string) {
            this.activeTabId = id;
        }
    }
});
