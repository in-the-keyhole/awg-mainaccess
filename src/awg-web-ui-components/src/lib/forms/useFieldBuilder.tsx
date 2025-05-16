import { Control, FieldValues, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { AwgNumericTextField } from '../input-fields/NumericTextField';
import { AwgPhoneField } from '../input-fields/PhoneField';
import { AwgSelectField } from '../input-fields/SelectField';
import { AwgTextField } from '../input-fields/TextField';

/**
 * Helper functions to build standard fields based on the rhf and zod schema binding.
 *
 * These are just for convenience, consumers may directly instantiate the fields for more intensive use cases.
 */
export type UseFieldBuilderParams<T extends FieldValues> = {
    register: UseFormRegister<T>;
    control: Control<T>;
    setValue: UseFormSetValue<T>;
    errors: Partial<Record<keyof T, { message?: string }>>;
    requiredFieldMap?: Partial<Record<keyof T, boolean>>;
};

export function useFieldBuilder<T extends FieldValues>(params: UseFieldBuilderParams<T>) {
    const { register, control, setValue, errors, requiredFieldMap } = params;

    const getTextField = (label: string, schemaName: Path<T>, maxNumericLength?: number, disabled?: boolean) => {
        const error = errors[schemaName]?.message;
        const required = requiredFieldMap ? requiredFieldMap[schemaName] : false;

        return maxNumericLength ? (
            <AwgNumericTextField
                label={label}
                schemaName={schemaName}
                register={register}
                error={error}
                maxLength={maxNumericLength}
                setValue={setValue}
                required={required}
                disabled={disabled}
            />
        ) : (
            <AwgTextField
                label={label}
                schemaName={schemaName}
                register={register}
                error={error}
                required={required}
                disabled={disabled}
            />
        );
    };

    const getSelectField = (
        label: string,
        schemaName: Path<T>,
        options: { id: string; display: string }[],
        disabled?: boolean
    ) => {
        const required = requiredFieldMap ? requiredFieldMap[schemaName] : false;

        return (
            <AwgSelectField
                label={label}
                schemaName={schemaName}
                control={control}
                register={register}
                options={options}
                error={errors[schemaName]?.message}
                required={required}
                disabled={disabled}
            />
        );
    };

    const getPhoneField = (label: string, schemaName: Path<T>, disabled?: boolean) => {
        const required = requiredFieldMap ? requiredFieldMap[schemaName] : false;

        return (
            <AwgPhoneField
                label={label}
                schemaName={schemaName}
                register={register}
                setValue={setValue}
                required={required}
                error={errors[schemaName]?.message}
                disabled={disabled}
            />
        );
    };

    return { getTextField, getSelectField, getPhoneField };
}
