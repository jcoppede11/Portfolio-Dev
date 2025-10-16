import { z } from 'zod';
import { isValidName, sanitizeInput } from './sanitizers/sanitizers';
import { capitalize } from './text/capitalize';

export const requiredString = () =>
    z.string({
        required_error: 'Campo requerido',
        invalid_type_error: 'Ingresar un valor válido',
    }).trim();

export const validateInputText = (min: number, max: number, field: string) =>
    requiredString()
        .min(min, `${field} es requerido y debe tener al menos ${min} caracteres`)
        .max(max, `${field} no puede exceder los ${max} caracteres`)
        .refine(isValidName, { message: `${field} contiene caracteres no permitidos` })
        .transform((val) => capitalize(sanitizeInput(val)));

export const validateEmail = (min: number, max: number, field: string) =>
    requiredString()
        .min(min, `${field} es requerido y debe tener al menos ${min} caracteres`)
        .max(max, `${field} no puede exceder los ${max} caracteres`)
        .email('Formato de correo inválido')
        .transform((val) => sanitizeInput(val).toLowerCase());

export const validateInquiryDetails = (min: number, max: number, field: string) =>
    requiredString()
        .min(min, `${field} debe tener al menos ${min} caracteres`)
        .max(max, `${field} no puede exceder los ${max} caracteres`)
        .transform((val) => sanitizeInput(val).replace(/[ \t]+/g, ' '))
