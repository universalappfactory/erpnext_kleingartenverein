import { ref, onMounted, onUnmounted } from 'vue'
import { useDashboardStore  } from './dashboardstore'
import { createListResource } from 'frappe-ui'

export function useDashboard() {
    // state encapsulated and managed by the composable
    const x = ref(0)
    const y = ref(0)
    let dashboardStore = undefined

    const navigation = createListResource({
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

     navigation.fetch()

    // a composable can update its managed state over time.
    function update(event) {
      x.value = event.pageX
      y.value = event.pageY
    }
  
    // a composable can also hook into its owner component's
    // lifecycle to setup and teardown side effects.
    onMounted(() => {
        dashboardStore = useDashboardStore()
        
    })

    onUnmounted(() => {
        console.log('onUnmounted')
    })
  
    // expose managed state as return value
    return { x, y, navigation }
  }