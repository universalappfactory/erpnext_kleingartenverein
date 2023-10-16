import { useAxios } from "@vueuse/integrations/useAxios";

export interface UseUploadOptions {
    url: string,
    method?: string
}

export interface UploadData {
    file: File
    additionalData?: Record<string, any>
}

export function useUpload(options: UseUploadOptions) {
    const { execute, isFinished } = useAxios(
        options.url,
        {
            method: options.method ?? "POST",
        },
        { immediate: false }
    );

    const executeUpload = async (content: UploadData) => {
        const frappe = window['frappe']
        return await execute({
            data: content,
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Frappe-CSRF-Token": frappe.csrf_token
            },
            method: options.method ?? 'POST',
        })
    }

    return { executeUpload, isFinished }
}