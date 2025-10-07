import type { APIRoute } from 'astro';
import { contactSchema } from '../../config/contactSchema';

export const POST: APIRoute = async ({ request }) => {
    try {
        // Verificar Content-Type
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Content-Type debe ser application/json'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Parsear y validar datos
        const formData = await request.json();
        const result = contactSchema.safeParse(formData);

        if (!result.success) {
            const errors = result.error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));

            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Datos de formulario inválidos',
                    details: errors
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Verificar honeypot (campo website debe estar vacío)
        if (result.data.website) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Solicitud no válida'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Rate limiting básico por IP (en producción usar Redis o similar)
        const clientIP = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Aquí puedes implementar rate limiting más sofisticado
        console.log(`Formulario enviado desde IP: ${clientIP}`);

        // Datos validados
        const { name, email, subject, message } = result.data;

        // TODO: Aquí enviarías el email o guardarías en base de datos
        // Ejemplo con servicio de email (nodemailer, resend, etc.)

        console.log('Formulario de contacto recibido:', {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
            ip: clientIP
        });

        // Simular envío de email (reemplazar con tu lógica de envío real)
        await simulateEmailSend({ name, email, subject, message });

        return new Response(
            JSON.stringify({
                success: true,
                message: '¡Mensaje enviado con éxito! Te contactaré pronto.'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error procesando formulario de contacto:', error);

        return new Response(
            JSON.stringify({
                success: false,
                error: 'Error interno del servidor. Inténtalo más tarde.'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};

// Función simulada de envío de email (reemplazar con tu servicio real)
async function simulateEmailSend(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    // Simular delay de envío
    await new Promise(resolve => setTimeout(resolve, 1000));

    // En producción, aquí implementarías el envío real:
    // - Nodemailer con SMTP
    // - Servicio como Resend, SendGrid, etc.
    // - Guardar en base de datos para revisión manual

    return true;
}