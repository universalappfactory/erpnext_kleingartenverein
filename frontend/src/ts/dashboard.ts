import { ref, onMounted, onUnmounted, watch, reactive } from 'vue'
import { useDashboardStore } from './dashboardstore'
import { createListResource, createResource } from 'frappe-ui'
import { createSharedComposable, useMouse } from '@vueuse/core'
import { NavigationItem, ReadMarker } from './navigation'

export function useDashboard() {
    let dashboardStore = undefined
    const navigation: NavigationItem[] = reactive([])

    const navigationResource = createListResource({
        doctype: 'Event',
        fields: ['*'],
        filters: {
            event_type: "Public",
            status: "Open",
        },
        orderBy: 'starts_on asc',
        start: 0,
        pageLength: 20,
        url: '/api/method/erpnext_kleingartenverein.api.get_dashboard_navigation'
    })
    navigationResource.fetch()

    const readMarker = createResource({
        url: '/api/method/erpnext_kleingartenverein.api.get_unread_document_count'
    })
    readMarker.fetch()

    const userInfo = createResource({
        url: '/api/method/erpnext_kleingartenverein.api.get_user_info'
    })
    userInfo.fetch()

    const mapMarker = function (markers: ReadMarker[] | undefined) {
        if (!markers) {
            return
        }
        
        dashboardStore.appendItems(markers)
        for (const rm of markers) {
            const matching = navigation.find(n => n.read_marker_doctype && n.read_marker_doctype === rm.doctype)
            if (matching) {
                matching.openCount += rm.count
            }
        }
    }

    watch(readMarker, () => {
        mapMarker(readMarker.data)
    })

    watch(navigationResource, () => {
        for (const itm of navigationResource.data) {
            navigation.push({
                displayTitle: itm.displayTitle,
                href: itm.href,
                icon: itm.icon,
                mode: itm.mode,
                openCount: 0,
                read_marker_doctype: itm.read_marker_doctype
            })
        }
        mapMarker(readMarker.data)
    })


    // a composable can also hook into its owner component's
    // lifecycle to setup and teardown side effects.
    onMounted(() => {
        dashboardStore = useDashboardStore()

    })

    onUnmounted(() => {
    })

    // expose managed state as return value
    return { navigation, readMarker, userInfo }
}

export const useSharedDashboard = createSharedComposable(useDashboard)