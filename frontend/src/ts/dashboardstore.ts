import { defineStore } from 'pinia'
import { NavigationItem } from './navigation'

interface State {
    navigationItems: NavigationItem[]
}

export const useDashboardStore = defineStore('dashboardStore', {
    state: (): State => ({
        navigationItems: [],
    }),
    getters: {
        navigation: (state) => state.navigationItems,
    },
    actions: {
        appendItems(items: NavigationItem[]) {
            this.navigationItems.splice(0, this.navigationItems.length);
            for (const item in items) {
                this.navigationItems.push(item)
            }
        },
    },
})