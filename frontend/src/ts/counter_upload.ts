import { useResource } from "./resource";
import { onMounted, ref, computed, watch, unref } from "vue";
import { useUpload } from "./upload";
import { useErrorClasses, DEFAULT_ERROR_CLASS } from "./error_classes";
import * as yup from 'yup';

export interface Plot {
    name: string,
    value: string
}

const uploadCounterContentSchema = yup.object({
    tenant: yup.string().trim().required('tenant'),
    plot: yup.string().trim().required('plot'),
    counterValue: yup.number().positive('counterValue').required('counterValue').label('counterValue'),
    sendConfirmationMail: yup.boolean()
});

interface CounterContent extends yup.InferType<typeof uploadCounterContentSchema> {
    // using interface instead of type generally gives nicer editor feedback
}

export function useCounterUpload() {

    const plots = useResource<Plot>({
        url: "/api/method/erpnext_kleingartenverein.public_api.get_plot_list",
        mapFn: (input: any) => {
            return {
                name: input.plot_number,
                value: input.plot_number
            }
        }
    })

    
    const { executeUpload, isFinished } = useUpload({
        url: "/api/method/erpnext_kleingartenverein.public_api.upload_counter_value"
    })

    const plot = ref<string | undefined>();
    const tenant = ref<string | undefined>()
    const counterValue = ref<number | undefined>();
    const file = ref<File | undefined>();
    const hasError = ref(false);
    const sendConfirmationMail = ref(false);
    const emptyFile = ref<boolean | false>();
    const uploadClicked = ref(false)
    const isLoading = ref(false)
    const uploadSuccess = ref(false)
    const errorMessage = ref('')

    const toContent: () => CounterContent = () => {
        return {
            tenant: tenant.value,
            plot: plot.value,
            counterValue: counterValue.value,
            sendConfirmationMail: sendConfirmationMail.value
        }
    }

    onMounted(async () => {
        await plots.fetch()
    })

    const clearFile = () => {
        file.value = undefined
    }

    const preview = computed(() => {
        if (file.value) {
            return URL.createObjectURL(file.value);
        }
    });

    const errorClasses = useErrorClasses({
        isError: (input: string) => {
            if (input.includes("counterValue")) {
                return ["counterValue", DEFAULT_ERROR_CLASS]
            }
            return undefined
        }
    })

    const parseUploadResult = (result: any) => {
        try {
            const messages = unref(result.data.value.message);
            let message = undefined
            if (messages instanceof Array) {
                message = messages[0]
            } else {
                message = messages
            }

            if (message) {
                const success = message.success
                if (success && success === true) {
                    uploadSuccess.value = true
                } else {
                    uploadSuccess.value = false
                    hasError.value = true
                }
            }            
        } catch (e) {
            hasError.value = true
        }
    }

    const uploadData = async () => {
        try {
            isLoading.value = true
            uploadClicked.value = true
            uploadSuccess.value = false
            hasError.value = false
            errorMessage.value = ''
            const content = await validate()
            
            if ((file.value.size / (1024*1024)) > 10) {
                throw Error('Filesize exceeded')    
            }
            
            if (content && emptyFile.value == false) {
                const uploadResult = await executeUpload({
                    file: file.value,
                    additionalData: content
                })
                parseUploadResult(uploadResult)
            }
        }
        catch (e) {
            hasError.value = true
            errorMessage.value = e.message
        } finally {
            isLoading.value = false
        }
    }

    const validate: () => Promise<CounterContent | undefined> = async () => {
        errorClasses.clear()
        const content = toContent();

        emptyFile.value = !file.value

        try {
            return await uploadCounterContentSchema.validate(content, { abortEarly: false })
        } catch (e) {
            const validationError = e as yup.ValidationError;
            if (validationError) {
                errorClasses.parseValidationError(validationError)
            }
        }
    }

    const tenantWatch = watch(tenant, () => {
        if (uploadClicked.value) {
            validate()
        }
    })

    const plotWatch = watch(plot, () => {
        if (uploadClicked.value) {
            validate()
        }
    })

    const fileWatch = watch(file, () => {
        if (uploadClicked.value) {
            validate()
        }
    })

    return {
        plots,
        plot,
        tenant,
        counterValue,
        file,
        hasError,
        sendConfirmationMail,
        clearFile,
        preview,
        uploadData,
        errors: errorClasses.errorClasses,
        emptyFile,
        isFinished,
        isLoading,
        uploadSuccess,
        errorMessage
    }
}