import { watchThrottled } from "@vueuse/core"
import { reactive, ref, watch } from "vue"

export interface DropDownSearchItem {
    displayText: string
    selected: boolean
}

export interface SearchOptions
{
    query: string
}

export function useDropdownSearch()
{
    const searchOptions = reactive<SearchOptions>({
        query: "query"
    })

    const items = reactive<DropDownSearchItem[]>([
        {
            displayText: "asd",
            selected: true
        }
    ])

    watchThrottled(
        searchOptions,
        () => { console.log('changed!') },
        { throttle: 500 },
    )

    return {
        searchOptions: searchOptions,
        items
    }
}