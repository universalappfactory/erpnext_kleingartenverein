import { Ref, ref } from "vue"
import * as yup from 'yup';

export const DEFAULT_ERROR_CLASS = 'border-red-600 focus:outline-none focus:ring-0 focus:border-red-600'

export interface ErrorClassOptions {
    isError?: (error: string) => undefined | [string, string]
}

export function useErrorClasses(options?: ErrorClassOptions) {
    const errorClasses = ref<Record<string, string>>({})

    const clear = () => {
        for (const k in errorClasses.value) {
            delete errorClasses.value[k]
        }
    }

    const parseValidationError = (error: yup.ValidationError) => {
        clear()
        for (const err of error.errors) {

            if (options.isError) {
                const custom = options.isError(err)
                if (custom) {
                    errorClasses.value[custom[0]] = custom[1]
                    continue
                }
            }

            errorClasses.value[err] = DEFAULT_ERROR_CLASS
        }
    }

    return { parseValidationError, errorClasses, clear }
}