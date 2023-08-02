import { defineStore } from 'pinia'
import { NavigationItem, ReadMarker } from './navigation'

export interface UserInfo
{
    user: string,
    email: string
}

const emptyUser: UserInfo = {
    user: '',
    email: ''
}

interface State {
    navigationItems: NavigationItem[]
    readMarkerItems: ReadMarker[]
    user: UserInfo
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
        readMarkerItems: [],
        user: emptyUser
    }),
    getters: {
        navigation: (state) => state.navigationItems,
        readMarkers: (state) => state.readMarkerItems,
        currentUser: (state) => state.user,
        isUnread: (state) => {
            return (documentName: string) => {
                return state.readMarkerItems.find((marker) => marker.document === documentName) !== undefined
            }
        },
    },
    actions: {
        clearNavigation() {
            this.navigationItems.splice(0, this.navigationItems.length)
        },
        clearReadMarkers() {
            this.readMarkerItems.splice(0, this.readMarkerItems.length)
        },
        replaceItems<T>(items: T[]) {
            if (items.length == 0) {
                return
            }

            if (isNavigationItem(items[0])) {
                this.clearNavigation()
                this.navigationItems.push(...items)
            }

            if (isReadMarker(items[0])) {
                this.clearReadMarkers()
                this.readMarkers.push(...items)
            }
        },
        appendItems<T>(items: T[]) {
            if (items.length == 0) {
                return
            }

            const first = items[0]
            if (isNavigationItem(items[0])) {
                this.navigationItems.push(...items)
            }

            if (isReadMarker(items[0])) {
                this.readMarkers.push(...items)
            }
        },
        append<T>(item: T) {
            this.appendItems([item])
        },
        replace<T>(item: T) {
            this.replaceItems([item])
        },
        calculateOpenCount() {
            for (const nav of this.navigation) {
                const count = this.readMarkers
                        .filter(rm => rm.doctype === nav.read_marker_doctype)
                        .map(m => m.count)
                        .reduce((total, record) => {
                            return total + record
                        }, 0)
                        
                nav.openCount = count
            }
        }
    },
})