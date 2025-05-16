import { FieldError, FieldErrors, useFormContext } from 'react-hook-form';
import { AddressField, US_STATES } from '@awg/web-services';
import { Grid } from '@mui/material';

import { AwgSelectField } from '../input-fields/SelectField';
import { AwgTextField } from '../input-fields/TextField';
import { AwgZipcodeField } from '../input-fields/ZipcodeField';

type AwgAddressFormProps = {
    /** The parent props.addressSchemaName of the addresses the schema. ex: physicalAddress, mailingAddress */
    addressSchemaName: string;
    fieldLabels: Partial<Record<AddressField, string>>;
    required?: boolean;
    disabled?: boolean;
};

/**
 * Address fields. This is designed to be used in the context of a parent form.
 */
export function AwgAddressForm(props: AwgAddressFormProps) {
    const {
        register,
        formState: { errors },
        control,
        setValue,
    } = useFormContext();

    const addressErrors = errors[props.addressSchemaName] as FieldErrors;
    return (
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <AwgTextField
                    label={props.fieldLabels.addressLine1 ?? 'Address Line 1'}
                    schemaName={`${props.addressSchemaName}.addressLine1`}
                    register={register}
                    error={(addressErrors?.addressLine1 as FieldError)?.message}
                    required={props.required}
                    disabled={props.disabled}
                />
            </Grid>
            {props.fieldLabels.addressLine2 && (
                <Grid size={{ xs: 12, md: 6 }}>
                    <AwgTextField
                        label={props.fieldLabels.addressLine2 ?? 'Address Line 2'}
                        schemaName={`${props.addressSchemaName}.addressLine2`}
                        register={register}
                        error={(addressErrors?.addressLine2 as FieldError)?.message}
                        disabled={props.disabled}
                    />
                </Grid>
            )}
            <Grid size={{ xs: 12, md: 7 }}>
                <AwgTextField
                    label={props.fieldLabels.city ?? 'City'}
                    schemaName={`${props.addressSchemaName}.city`}
                    register={register}
                    error={(addressErrors?.city as FieldError)?.message}
                    required={props.required}
                    disabled={props.disabled}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <AwgSelectField
                    label={props.fieldLabels.state ?? 'State'}
                    schemaName={`${props.addressSchemaName}.state`}
                    control={control}
                    register={register}
                    options={[{ id: '', display: '' }].concat(US_STATES)}
                    error={(addressErrors?.state as FieldError)?.message}
                    required={props.required}
                    disabled={props.disabled}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
                <AwgZipcodeField
                    label={props.fieldLabels.zip ?? 'Zipcode'}
                    schemaName={`${props.addressSchemaName}.zip`}
                    register={register}
                    error={(addressErrors?.zip as FieldError)?.message}
                    setValue={setValue}
                    required={props.required}
                    disabled={props.disabled}
                />
            </Grid>
        </>
    );
}
