import { createResource } from 'frappe-ui'
import { reactive } from 'vue'

export interface UseResourceOptions<T> {
    url: string
    mapFn?: (input :any) => T
}


export function useResource<T>(options: UseResourceOptions<T>) {
    const items = reactive<Array<T>>([])

    const dataResource = createResource({
        url: options.url
    })


    const fetch = async () => {
        try {
            items.splice(0, items.length)
            await dataResource.fetch()
            items.push(...dataResource.data.map(d => {
                if (options.mapFn) {
                    return options.mapFn(d)
                } else {
                    return { ...d } as T
                }
            }))


        } catch (e) {
            console.error(e)
        }
    }

    return {
        fetch, items
    }
}