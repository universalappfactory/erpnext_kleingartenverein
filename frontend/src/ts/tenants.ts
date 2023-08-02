import { createListResource, createResource } from 'frappe-ui'
import { reactive, watch } from 'vue'


export function useTenants() {

    const tenants = reactive([])
    const page = {
        hasNext: false
    }
    const pageInfo = reactive(page)

    const teantsResource = createListResource({
        doctype: 'Customer',
        fields: ['*'],
        orderBy: 'plot_link asc',
        filters: {
            customer_group: 'Tenant'
        },
        start: 0,
        pageLength: 20,
    })

    const searchResource = createResource({
        url: '/api/method/erpnext_kleingartenverein.api.search_tenants'
    })

    watch(searchResource, () => {
        console.log(searchResource)
        console.log(searchResource.start)

        pageInfo.hasNext = searchResource.hasNextPage
        if (searchResource.data) {
            if (searchResource.start === 0) {
                tenants.splice(0, tenants.length)
            }

            tenants.push(...searchResource.data)
        } else {
            tenants.splice(0, tenants.length)
        }
    })

    watch(teantsResource, () => {
        console.log(teantsResource)

        console.log(teantsResource)
        console.log(teantsResource.start)

        pageInfo.hasNext = teantsResource.hasNextPage

        if (teantsResource.data) {
            if (teantsResource.start === 0) {
                clear()
                tenants.push(...teantsResource.data)
            } else {
                tenants.push(...teantsResource.data.slice(teantsResource.start, teantsResource.start + teantsResource.pageLength))
            }
        } else {
            clear()
        }
    })

    const search = (query: string) => {
        if (!query || query.trim() === '') {
            return;
        }

        clear()
        searchResource.reset()
        searchResource.fetch({ "query": query })
    }

    const loadMore = () => teantsResource.next()

    const fetch = () => teantsResource.fetch()

    const clear = () =>  {
        tenants.splice(0, tenants.length)
    }

    return { tenants, loadMore, search, pageInfo, fetch, clear }
}