import { defineStore } from 'pinia'
import { NavigationItem, ReadMarker } from './navigation'

interface State {
    navigationItems: NavigationItem[]
    readMarkers: ReadMarker[]
}

function isNavigationItem(obj: any): obj is NavigationItem {
    return obj.hasOwnProperty('href');
}
function isReadMarker(obj: any): obj is ReadMarker {
    return obj.hasOwnProperty('doctype');
}

export const useDashboardStore = defineStore('dashboardStore', {
    state: (): State => ({
        navigationItems: [],
        readMarkers: []
    }),
    getters: {
        navigation: (state) => state.navigationItems,

        isUnread: (state) => {
            return (documentName: string) => {
                return state.readMarkers.find((marker) => marker.document === documentName) !== undefined
            }
        },
    },
    actions: {
        appendItems<T>(items: T[]) {
            if (items.length == 0) {
                return
            }

            const first = items[0]
            if (isNavigationItem(items[0])) {
                this.navigationItems.splice(0, this.navigationItems.length)
            }

            if (isReadMarker(items[0])) {
                this.readMarkers.splice(0, this.readMarkers.length)
                for (const item of items) {
                    this.readMarkers.push(item)
                }
            }
        },
    },
})