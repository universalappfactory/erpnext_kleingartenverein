import { createListResource, createResource } from 'frappe-ui'
import { Ref, UnwrapNestedRefs, reactive, ref, unref, watch } from 'vue'
import { watchThrottled } from '@vueuse/core'


export interface FilterItem {
    text: string,
    selected: boolean
}

export interface ContactData {
    first_name: string
    last_name: string
    email_id: string
    mobile_no: string
    phone: string
}

export interface AddressData {
    address_line1: string
    address_line2: string
    city: string
    county: string
    state: string
    pincode: string
}

export interface TenantData {
    contact: ContactData | undefined
    address: AddressData | undefined
    selected: boolean | undefined
    name: string | undefined
}

export interface PlotData {
    plot_number: string
    plot_size_sqm: string
}

export interface AttachmentData {
    description: string,
    url: string
}

export type TenantFunctions = { tenants: { contact: { first_name: string; last_name: string; email_id: string; mobile_no: string; phone: string }; address: { address_line1: string; address_line2: string; city: string; county: string; state: string; pincode: string }; selected: boolean; name: string }[]; loadMore: () => any; search: (query: string) => void; pageInfo: { hasNext: boolean }; fetch: () => any; clear: () => void; filters: { text: string; selected: boolean }[]; byName: (name: string) => { contact: { first_name: string; last_name: string; email_id: string; mobile_no: string; phone: string }; address: { address_line1: string; address_line2: string; city: string; county: string; state: string; pincode: string }; selected: boolean; name: string }; selection: any[]; select: (name: string) => void; unselect: (name: string) => void, searchText: Ref<string>, hasItems: Ref<Boolean>, selectAll: () => void }


export function useTenants(): TenantFunctions {

    const tenants = reactive<TenantData[]>([]) //ToDo this is not TenantData!
    const page = {
        hasNext: false
    }
    const pageInfo = reactive(page)
    const selection = reactive([])
    const searchText = ref('')
    const hasItems = ref(false)

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

    function createData(input: any): TenantData {
        let result = input as TenantData;
        result.selected = selection.findIndex(x => x.name === result.name) > -1 ? true : false
        return result
    }

    function mapData(input: Array<any>): TenantData[] {
        return input.map(createData)
    }

    watch(teantsResource, () => {
        pageInfo.hasNext = teantsResource.hasNextPage

        if (teantsResource.data) {
            if (teantsResource.start === 0) {
                clear()
                let data = mapData(teantsResource.data);
                tenants.push(...data)
            } else {
                tenants.push(...mapData(teantsResource.data.slice(teantsResource.start, teantsResource.start + teantsResource.pageLength)))
            }
            hasItems.value = tenants.length > 0
        } else {
            clear()
            hasItems.value = false
        }
    })


    watchThrottled(searchText, (val) => {
        search(searchText.value)
    }, {
        throttle: 1000
    })

    // const updateResult = () => {
    //     pageInfo.hasNext = teantsResource.hasNextPage

    //     if (teantsResource.data) {
    //         if (teantsResource.start === 0) {
    //             clear()
    //             let data = mapData(teantsResource.data);
    //             tenants.push(...data)
    //         } else {
    //             tenants.push(...mapData(teantsResource.data.slice(teantsResource.start, teantsResource.start + teantsResource.pageLength)))
    //         }
    //     } else {
    //         clear()
    //     }
    // }

    const search = (query: string) => {
        if (!query || query.trim() === '') {
            clear()
            fetch()
            return;
        }

        clear()
        searchResource.reset()
        searchResource
            .fetch({ "query": query, "filter": filters.filter(f => f.selected).map(f => unref(f)) })
            .then(() => {
                pageInfo.hasNext = searchResource.hasNextPage
                if (searchResource.data) {
                    if (searchResource.start === 0) {
                        tenants.splice(0, tenants.length)
                    }

                    let data = mapData(searchResource.data)
                    tenants.push(...data)
                } else {
                    tenants.splice(0, tenants.length)
                }
            })
    }

    const loadMore = async () => teantsResource.next()

    const fetch = () => {
        teantsResource.fetch()
    }

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

    const byName = (name: string) => {
        return tenants.find(t => t.name === name)
    }

    const select = (name: string) => {
        const tenant = byName(name)
        if (tenant) {
            tenant.selected = true
            const idx = selection.findIndex(x => x.name === name)
            if (idx === -1) {
                selection.push(tenant)
            }
        }
    }

    const selectAll = () => {
        for (const tenant of tenants) {
            select(tenant.name)
        }
    }

    const unselect = (name: string) => {
        const tenant = byName(name)
        if (tenant) {
            tenant.selected = false
            const idx = selection.findIndex(t => t.name === name)
            if (idx > -1) {
                selection.splice(idx, 1)
            }
        }
    }


    return { tenants, searchText, loadMore, search, pageInfo, fetch, clear, filters, byName, selection, select, unselect, hasItems, selectAll }
}