import { FieldValues } from 'react-hook-form';
import { ZodError, ZodTypeAny } from 'zod';

/**
 * Gets the list of required fields from zod by doing a validate dry run.
 *
 * Pass in the default object. This will run the schema validation, including advanced rules, refine / superRefine rules and indicate which fields are required.
 */
export function zGetRequiredFieldMap(schema: ZodTypeAny, defaultValues: FieldValues): Record<string, boolean> {
    const result = schema.safeParse(defaultValues);
    if (result.success) return {};

    const error = result.error as ZodError;
    const requiredFields: Record<string, true> = {};

    for (const issue of error.issues) {
        const path = issue.path.join('.');
        requiredFields[path] = true;
    }

    return requiredFields;
}
