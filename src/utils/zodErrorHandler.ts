import { ZodError } from 'zod';

export function handleZodError(error: unknown) {
    if (error instanceof ZodError) {
        throw {
            status: 400,
            code: "VALIDATION_ERROR",
            message: "Error de validación en los datos enviados.",
            errors: error.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        };
    }
    throw error;
}