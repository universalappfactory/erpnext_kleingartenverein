import { useResource } from "./resource";
import { onMounted, ref, computed } from "vue";
import { useUpload } from "./upload";
import { useInputValidation } from "./input_validation";
export interface Plot {
    name: string,
    value: string
}

export function useCounterUpload() {

    

    const plots = useResource<Plot>({
        url: "http://localhost:8000/api/method/erpnext_kleingartenverein.public_api.get_plot_list",
        mapFn: (input: any) => {
            return {
                name: input.plot_number,
                value: input.plot_number
            }
        }
    })

    const upload = useUpload({
        url: "http://localhost:8000/api/method/erpnext_kleingartenverein.public_api.upload_counter_value"
    })

    const plot = ref<Plot | undefined>();
    const tenant = ref<string | undefined>()
    const counterValue = ref("");
    const file = ref<File | undefined>();
    const hasError = ref(false);
    const sentConfirmationMail = ref(false);

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

    const validation = useInputValidation({
        fields: {}
    })

    const executeUpload = () => {
        console.log('YEAH')
        validation.validate()
    }


    return { plots, plot, tenant, counterValue, file, hasError, sentConfirmationMail, clearFile, preview, executeUpload }
}