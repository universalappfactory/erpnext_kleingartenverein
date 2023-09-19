import { createListResource } from 'frappe-ui'
import { reactive } from 'vue'

export interface UseListOptions {
    docType: string,
    oderBy?: string,
    filters?: Record<string, string>
}

export interface PageInfo {
    hasNext: boolean,
    withError: boolean
}


export function useList<T>(options: UseListOptions) {
    const items = reactive<Array<T>>([])
    const pageInfo = reactive<PageInfo>({ hasNext: false, withError: false })

    const dataResource = createListResource({
        doctype: options.docType,
        fields: ['*'],
        orderBy: options.oderBy ?? '',
        filters: options.filters,
        start: 0,
        pageLength: 20,
    })

    async function previous() {
        try {
            dataResource.start = dataResource.start - dataResource.pageLength
            const result = await dataResource.list.fetch()
            items.push(...result.map(d => {
                return { ...d } as T
            }))

            pageInfo.hasNext = dataResource.hasNextPage
        } catch (e) {
            console.error(e)
            pageInfo.withError = true
        }
    }

    async function next() {
        try {
            dataResource.start = dataResource.start + dataResource.pageLength
            const result = await dataResource.list.fetch()
            items.push(...result.map(d => {
                return { ...d } as T
            }))

            pageInfo.hasNext = dataResource.hasNextPage
        } catch (e) {
            console.error(e)
            pageInfo.withError = true
        }
    }

    const fetch = async () => {
        try {
            items.splice(0, items.length)
            await dataResource.list.fetch()
            items.push(...dataResource.data.map(d => {
                return { ...d } as T
            }))

            pageInfo.hasNext = dataResource.hasNextPage

        } catch (e) {
            console.error(e)
            pageInfo.withError = true
        }
    }

    return {
        fetch, previous, next, items, pageInfo
    }
}