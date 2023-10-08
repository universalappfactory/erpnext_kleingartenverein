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
        console.log('content', content.file)
        const r = await execute({
            data: content,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: options.method ?? 'POST',
        })
    }

    return { executeUpload, isFinished }
}