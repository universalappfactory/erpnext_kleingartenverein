import { createResource } from 'frappe-ui'
import { reactive, unref, watch } from 'vue'
import { AttachmentData } from './tenants'

interface Selected
{
    item: any | undefined
    attachments: AttachmentData[] | undefined
    plot_attachments: AttachmentData[] | undefined
}



export function useTenantEditor() {

    const tenants = reactive([])
    const first = reactive<Selected>({
        item: undefined,
        attachments: undefined,
        plot_attachments: undefined
    })
    const page = {
        hasNext: false
    }
    const pageInfo = reactive(page)


    const teantsResource = createResource({
        url: '/api/method/erpnext_kleingartenverein.api.get_tenant_data'
    })

    const getAttachments = (data: any) => {
        const result : AttachmentData[] = []

        if (data.files) 
        {
            result.push(...data.files.map(f => {
                return {
                    description: f.file_name,
                    url: f.file_url
                } as AttachmentData
            }))
        }

        if (data.attachments) 
        {
            result.push(...data.attachments.map(f => {
                return {
                    description: f.attachment_description,
                    url: f.attachment
                } as AttachmentData
            }))
        }

        return result
    }

    const getPlotAttachments = (data: any) => {
        const result : AttachmentData[] = []

        if (data.plot_files) 
        {
            result.push(...data.plot_files.map(f => {
                return {
                    description: f.file_name,
                    url: f.file_url
                } as AttachmentData
            }))
        }

        if (data.plot_attachments) 
        {
            result.push(...data.plot_attachments.map(f => {
                return {
                    description: f.attachment_description,
                    url: f.attachment
                } as AttachmentData
            }))
        }

        return result
    }

    watch(teantsResource, () => {
        pageInfo.hasNext = teantsResource.hasNextPage

        if (teantsResource.data) {
            if (teantsResource.start === 0) {
                clear()
                tenants.push(...teantsResource.data)
                first.item = undefined
                first.attachments = undefined
                first.plot_attachments = undefined
            } else {
                tenants.push(...teantsResource.data.slice(teantsResource.start, teantsResource.start + teantsResource.pageLength))
                first.item = teantsResource.data[0]
                first.attachments = getAttachments(teantsResource.data[0])
                first.plot_attachments = getPlotAttachments(teantsResource.data[0])
            }
        } else {
            clear()
        }
    })


    const loadMore = () => teantsResource.next()

    const byName = (name: string) => {
        if (!name || name.trim() === '') {
            clear()
            return;
        }

        clear()
        teantsResource.reset()
        teantsResource.fetch({ "name": name })
    }

    const clear = () => {
        first.item = undefined
        tenants.splice(0, tenants.length)
    }
    
    return { tenants, loadMore, pageInfo, clear, byName, first }
}