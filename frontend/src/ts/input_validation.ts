import { Ref } from "vue"



export enum InputValidationType
{
    NotUndefinedOrEmpty
}

export interface InputValidationField<T>
{
    field: Ref<T>
}

export interface InputValidationOptions
{
    fields: Record<string, InputValidationField<T>>
}

export function useInputValidation(options: InputValidationOptions)
{
    const validate = () => {
        console.log('validate')
    }

    const isValid = () => {
        return false
    }

    return { validate, isValid }
}