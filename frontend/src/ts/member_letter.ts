import { createListResource, createResource } from 'frappe-ui'
import { reactive, ref, unref, watch } from 'vue'
import { SelectItem } from './buttons/select'


export interface PreviewData {
    recipients: string[]
    content: string
}

export function useMemberLetter() {
    const templates = reactive<SelectItem[]>([])

    const noTemplate: SelectItem = {
        content: '',
        description: 'Leer',
        value: ''
    }

    const page = {
        hasNext: false
    }
    const pageInfo = reactive(page)
    const selectedTemplate = reactive<SelectItem | undefined>(undefined)
    let letterContent = ''
    const isLoading = ref(false)

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

    const previewResource = createResource({
        url: '/api/method/erpnext_kleingartenverein.letter_api.get_print_preview'
    })

    const createPreview = () => {
        isLoading.value=true
        const previewData: PreviewData = {
            recipients: ['Dirk Lehmeier'],
            content: '# Hallo Welt'
        }
        previewResource.reset()
        previewResource.fetch({
            data: previewData
        }).then(x => {
            console.log(x)
        })
    }

    const mapData = (input: Array<any>) => {
        return input.map(x => {
            const result: SelectItem = {
                value: x.name,
                description: x.name,
                content: x.content
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
                templates.push(noTemplate)
                templates.push(...data)
            } else {
                templates.push(noTemplate)
                templates.push(...mapData(templatesResource.data.slice(templatesResource.start, templatesResource.start + templatesResource.pageLength)))
            }
        } else {
            clear()
        }
    })

    function fetchData() {
        templatesResource.fetch()
    }

    function contentChanged(contents: string) {
        letterContent = contents
    }

    return { templatesResource, fetchData, templates, selectedTemplate, contentChanged, createPreview, isLoading }
}