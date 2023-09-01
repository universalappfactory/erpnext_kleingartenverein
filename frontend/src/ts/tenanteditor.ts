import { createListResource, createResource } from 'frappe-ui'
import { reactive, unref, watch } from 'vue'

interface Selected
{
    item: any | undefined
    attachments: AttachmentData[] | undefined
}

export interface ContactData
{
    first_name: string
    last_name: string
    email_id: string
    mobile_no: string
    phone: string
}

export interface AddressData
{
    address_line1: string
    address_line2: string
    city: string
    county: string
    state: string
    pincode: string
}

export interface TenantData
{
    contact: ContactData | undefined
    address: AddressData | undefined
}

export interface AttachmentData
{
    description: string,
    url: string
}

export function useTenantEditor() {

    const tenants = reactive([])
    const first = reactive<Selected>({
        item: undefined,
        attachments: undefined
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

        console.log('XXXASD', result)
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
            } else {
                tenants.push(...teantsResource.data.slice(teantsResource.start, teantsResource.start + teantsResource.pageLength))
                first.item = teantsResource.data[0]
                first.attachments = getAttachments(teantsResource.data[0])
            }
        } else {
            clear()
        }
    })


    const loadMore = () => teantsResource.next()

    // const fetch = () => teantsResource.fetch()

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