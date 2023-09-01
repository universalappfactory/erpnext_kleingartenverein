import { ref, onMounted, onUnmounted, watch, reactive } from 'vue'
import { useDashboardStore } from './dashboardstore'
import { createListResource, createResource } from 'frappe-ui'
import { createSharedComposable } from '@vueuse/core'
import { NavigationItem, ReadMarker } from './navigation'
import { storeToRefs } from 'pinia'

export function useDashboard() {
    let dashboardStore = undefined

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

    const userInfo = createResource({
        url: '/api/method/erpnext_kleingartenverein.api.get_user_info'
    })
    userInfo.fetch()

    const markAsReadCall = createResource({
        url: '/api/method/erpnext_kleingartenverein.api.mark_as_read'
    })

    const mapMarker = function (markers: ReadMarker[] | undefined) {
        if (!markers) {
            return
        }

        if (markers.length > 0) {
            dashboardStore?.appendItems(markers)
        } else {
            dashboardStore?.clearReadMarkers()
        }
        dashboardStore?.calculateOpenCount()
    }

    watch(readMarker, () => {
        mapMarker(readMarker.data)
    })

    watch(navigationResource, () => {
        for (const itm of navigationResource.data) {
            dashboardStore?.append({
                displayTitle: itm.displayTitle,
                href: itm.href,
                icon: itm.icon,
                mode: itm.mode,
                openCount: 0,
                read_marker_doctype: itm.read_marker_doctype
            })
        }
        readMarker.fetch()
    })


    onMounted(() => {
        dashboardStore = useDashboardStore()
        dashboardStore.clearNavigation()
        dashboardStore.clearReadMarkers()
    })

    onUnmounted(() => {
    })


    const markAsRead = function (doctype: string, name: string) {
        dashboardStore.clearReadMarkers()
        markAsReadCall.submit({ doctype: doctype, name: name })
        readMarker.reset()
        readMarker.fetch()
    }

    return { readMarker, userInfo, markAsRead }
}

export const useSharedDashboard = createSharedComposable(useDashboard)