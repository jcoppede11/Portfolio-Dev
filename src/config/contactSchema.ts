import { z } from 'zod';

// Esquema de validación para el formulario de contacto
export const contactSchema = z.object({
    name: z
        .string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras y espacios'),

    email: z
        .string()
        .email('Por favor, ingresa un email válido')
        .max(100, 'El email no puede exceder 100 caracteres'),

    subject: z
        .string()
        .min(5, 'El asunto debe tener al menos 5 caracteres')
        .max(100, 'El asunto no puede exceder 100 caracteres'),

    message: z
        .string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres')
        .max(1000, 'El mensaje no puede exceder 1000 caracteres'),

    // Campo honeypot para detectar bots (debe estar vacío)
    website: z.string().max(0, 'Campo no válido').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Esquema para validación del lado del cliente (menos estricto)
export const clientContactSchema = contactSchema.omit({ website: true });

export type ClientContactFormData = z.infer<typeof clientContactSchema>;