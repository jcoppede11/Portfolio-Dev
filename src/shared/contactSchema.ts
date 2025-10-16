import { z } from 'zod';
import { validateInputText, validateEmail } from '../utils/zodHelpers';

export const contactSchema = z.object({
    name: validateInputText(3, 100, "El nombre"),
    email: validateEmail(6, 254, "El email"),
    subject: validateInputText(5, 100, "El asunto"),
    message: validateInputText(10, 1000, "El mensaje"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Esquema para validación del lado del cliente (menos estricto)
// export const clientContactSchema = contactSchema.omit({ website: true });