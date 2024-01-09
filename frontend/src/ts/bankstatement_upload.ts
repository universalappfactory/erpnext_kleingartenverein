import { ref } from "vue";
import { UploadData, useUpload } from "./upload";

export interface UploadBankStatementMessage {
    success: boolean
    message: string
}

export function useBankstatementUpload()
{
    const loading = ref(false)

    const { executeUpload, isFinished, file } = useUpload({
        url: "/api/method/erpnext_kleingartenverein.dashboard_api.upload_bank_statement"
    })

    const handleError = (error: any) => {
        console.error(error)
        const err = error as Error;
        uploadMessage.value = {
            message: err ? err.message : "unkown",
            success: false
        }
        console.log(uploadMessage)
    }

    const uploadMessage = ref<UploadBankStatementMessage | undefined>()

    const upload = async (file: File) => {
        try {
            loading.value = true
            const content: UploadData = {
                file: file 
            }

            console.log("do upload")
            await executeUpload(content)
            uploadMessage.value = {
                message: "Ok",
                success: true
            }
        } catch(e) {
            handleError(e)
        } finally {
            loading.value = false
        }
    }

    return { file, upload, uploadMessage, loading }
}