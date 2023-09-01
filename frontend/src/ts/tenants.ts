import { createListResource, createResource } from 'frappe-ui'
import { reactive, unref, watch } from 'vue'

export interface FilterItem {
    text: string,
    selected: boolean
}

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
            clear()
            fetch()
            return;
        }

        clear()
        searchResource.reset()
        searchResource.fetch({ "query": query, "filter": filters.filter(f => f.selected).map(f => unref(f)) })
    }

    const loadMore = () => teantsResource.next()

    const fetch = () => teantsResource.fetch()

    const clear = () => {
        tenants.splice(0, tenants.length)
    }

    const filters = reactive<FilterItem[]>(
        [
            {
                selected: false,
                text: 'search_bar.status_under_supervision'
            }
        ]
    )

    const byName= (name: string) => {
        return tenants.find(t => t.name === name)
    }

    return { tenants, loadMore, search, pageInfo, fetch, clear, filters, byName }
}