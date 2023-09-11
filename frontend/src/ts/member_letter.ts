import { createListResource, createResource } from 'frappe-ui'
import { onMounted, reactive, ref, unref, watch } from 'vue'
import { SelectItem } from './buttons/select'


export interface LetterData {
    recipients: string[]
    content: string
    description: string
}

export function useMemberLetter() {
    const templates = reactive<SelectItem[]>([])
    const printTemplates = reactive<SelectItem[]>([])
    const selectedPrintTemplate = ref('')

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
    const isLoading = ref(true)
    const description = ref('')

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

    const printResource = createResource({
        url: '/api/method/erpnext_kleingartenverein.letter_api.print_letters'
    })

    const printFormatResource = createListResource({
        doctype: 'Print Format',
        fields: ['*'],
        orderBy: 'name asc',
        filters: {
            doc_type: 'Single Member Letter'
        },
        start: 0,
        pageLength: 20,
    })

    onMounted(() => {
        printFormatResource.fetch()
    })

    // const createPreview = () => {
    //     isLoading.value=true
    //     const previewData: PreviewData = {templatesResource
    //         recipients: ['Dirk Lehmeier'],
    //         content: '# Hallo Welt'
    //     }
    //     previewResource.reset()
    //     previewResource.fetch({
    //         data: previewData
    //     }).then(x => {
    //         console.log(x)
    //     })
    // }

    const printLetters = async (recipients) => {
        isLoading.value = true
        const previewData: LetterData = {
            recipients: recipients,
            content: letterContent,
            description: description.value
        }
        printResource.reset()
        try {

            await printResource.fetch({
                data: previewData
            })

            console.log(printResource)
            console.log('DONE')
            
        } catch(e) {
            console.error(e)
            alert(e)
        }

    }

    watch(printFormatResource, () => {
        if (printFormatResource.data) {
            printTemplates.splice(0,printTemplates.length)
            printTemplates.push(...printFormatResource.data.map(x => {
                return {
                    content: x.name,
                    value: x.name,
                    description: x.name
                }
            }))
            if (printTemplates.length > 0) {
                selectedPrintTemplate.value = printTemplates[0].value
            }
        }
    })

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

    return { templatesResource, fetchData, templates, selectedTemplate, contentChanged, isLoading, printLetters, description, printTemplates, selectedPrintTemplate }
}