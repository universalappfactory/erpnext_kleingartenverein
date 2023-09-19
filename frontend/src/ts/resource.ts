import { createResource } from 'frappe-ui'
import { reactive } from 'vue'

export interface UseResourceOptions {
    url: string
}


export function useResource<T>(options: UseResourceOptions) {
    const items = reactive<Array<T>>([])

    const dataResource = createResource({
        url: options.url
    })


    const fetch = async () => {
        try {
            items.splice(0, items.length)
            await dataResource.fetch()
            items.push(...dataResource.data.map(d => {
                return { ...d } as T
            }))


        } catch (e) {
            console.error(e)
        }
    }

    return {
        fetch, items
    }
}