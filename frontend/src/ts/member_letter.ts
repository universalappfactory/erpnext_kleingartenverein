import { createListResource, createResource } from 'frappe-ui'
import { UnwrapNestedRefs, reactive, unref, watch } from 'vue'
import { DropdownItem } from './dropdown'
import { TenantData } from './tenants'

export function useMemberLetter() {
    const templates = reactive<DropdownItem[]>([])

    const page = {
        hasNext: false
    }
    const pageInfo = reactive(page)

    const templatesResource = createListResource({
        doctype: 'Member Letter Template',
        fields: ['*'],
        orderBy: 'description asc',
        start: 0,
        pageLength: 20,
    })

    const clear = () => {
        templates.splice(0, templates.length)
    }

    const mapData = (input: Array<any>) => {
        return input.map(x => {
            const result: DropdownItem = {
                label: x.name
            }
            return result
        })
    }

    watch(templatesResource, () => {
        pageInfo.hasNext = templatesResource.hasNextPage

        if (templatesResource.data) {
            if (templatesResource.start === 0) {
                clear()
                let data = mapData(templatesResource.data);
                templates.push(...data)
            } else {
                templates.push(...mapData(templatesResource.data.slice(templatesResource.start, templatesResource.start + templatesResource.pageLength)))
            }
        } else {
            clear()
        }
    })

    function fetchData() {
        templatesResource.fetch()
    }

    return { templatesResource, fetchData, templates }
}