import { createListResource, initSocket, createResource } from 'frappe-ui'
import { onMounted, reactive, ref, unref, watch } from 'vue'
import { SelectItem } from './buttons/select'
import { useTimeoutPoll } from '@vueuse/core'

export interface LetterData {
    recipients: string[]
    content: string
    description: string
    printFormat: string
}


export function useMemberLetter() {
    const templates = reactive<SelectItem[]>([])
    const printTemplates = reactive<SelectItem[]>([])
    const selectedPrintTemplate = ref('')
    const processingFinished = ref(false)

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
    const description = ref('')
    const submitError = ref(false)
    const letterAttachments = ref([])
    let letterNames = []
    let currentRequestId = ''

    const validationStatus = reactive({
        "description": "",
        "content": "",
        "recepients": ""
    })

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

    const statusResource = createResource({
        url: '/api/method/erpnext_kleingartenverein.letter_api.get_job_status'
    })

    const letterResource = createResource({
        url: '/api/method/erpnext_kleingartenverein.letter_api.get_letters'
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

    const checkStatus = async () => {
        if (currentRequestId !== '') {
            try {
                const status = await statusResource.fetch({
                    id: currentRequestId
                })
                if (status === 'finished') {
                    pause()
                    currentRequestId = ''
                    isLoading.value = false;
                    processingFinished.value = true;

                    await getLetters()
                } else if (status === 'failed') {
                    pause()
                    currentRequestId = ''
                    isLoading.value = false;
                    submitError.value = true
                }
            }
            catch (e) {
                console.error(e)
                pause()
            }
        }
    }

    const getLetters = async () => {

        try {
            const letters = await letterResource.fetch({
                letters: letterNames
            })

            letterAttachments.value.splice(0, letterAttachments.value.length)
            if (letters && letters.length > 0) {

                letterAttachments.value.push(...letters.map(x => unref(x)))
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    const { isActive, pause, resume } = useTimeoutPoll(checkStatus, 1000, {
        immediate: false
    })

    onMounted(() => {
        printFormatResource.fetch()
        processingFinished.value = false
    })

    const printLetters = async (recipients) => {

        if (!isValid(recipients)) {
            return;
        }

        if (isLoading.value || currentRequestId !== '') {
            return;
        }

        processingFinished.value = false
        submitError.value = false
        letterAttachments.value.splice(0, letterAttachments.value.length)

        isLoading.value = true
        const previewData: LetterData = {
            recipients: recipients,
            content: letterContent,
            description: description.value,
            printFormat: selectedPrintTemplate.value
        }
        printResource.reset()
        try {

            let printResult = await printResource.fetch({
                data: previewData
            })

            currentRequestId = printResult.id
            letterNames = printResult.letters
            resume()
        } catch (e) {
            console.error(e)
            isLoading.value = false;
            submitError.value = true
        }

    }

    watch(printFormatResource, () => {
        if (printFormatResource.data) {
            printTemplates.splice(0, printTemplates.length)
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

    const setDescription = (value: string) => {
        description.value = value
    }

    const isValid = (recipients) => {
        let hasError = false;
        if (description.value === '') {
            validationStatus.description = "error"
            hasError = true
        } else {
            validationStatus.description = "success"
        }

        if (letterContent === '') {
            validationStatus.content = "error"
            hasError = true
        } else {
            validationStatus.content = "success"
        }

        if (!recipients || recipients.length <= 0) {
            validationStatus.recepients = "error"
            hasError = true
        } else {
            validationStatus.recepients = "success"
        }

        return !hasError
    }

    return { isValid, letterAttachments, submitError, processingFinished, validationStatus, templatesResource, fetchData, templates, selectedTemplate, contentChanged, isLoading, printLetters, description, printTemplates, selectedPrintTemplate, setDescription }
}