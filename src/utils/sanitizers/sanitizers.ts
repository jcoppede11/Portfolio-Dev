type SanitizeOptions = {
    preserveLineBreaks?: boolean;
};

const isValidString = (input: unknown): input is string => {
    return typeof input === 'string' && input.trim() !== '';
}

export const isValidName = (input: string): boolean => {
    const nameRegex = /^[\p{L}\p{M}\s'-]+$/u; // Permite letras, espacios, guiones y apóstrofes
    return nameRegex.test(input);
}

const baseSanitize = (input: string): string => {
    return input
        .replace(/<[^>]+>[^<]*<\/[^>]+>/g, '')  // Elimina bloques tipo <tag>contenido</tag>
        .replace(/<[^>]+\/?>/g, '')             // Elimina etiquetas sueltas <br>, <img/>, etc.
        .replace(/&nbsp;/gi, ' ')               // Reemplaza &nbsp; por espacio
        .replace(/[\u200B-\u200D\uFEFF]/g, ''); // Elimina caracteres invisibles Unicode
}

const normalizeWhitespace = (input: string, options: SanitizeOptions): string => {
    let result = input;

    if (options.preserveLineBreaks) {
        result = result
            .replace(/[ \t]{2,}/g, ' ')         // Reduce espacios horizontales
            .replace(/\r\n/g, '\n')             // Normaliza saltos de línea
            .replace(/\n{3,}/g, '\n\n');        // Máximo 2 saltos de línea seguidos
    } else {
        result = result.replace(/\s+/g, ' ');   // Colapsa todo tipo de espacios (incluye saltos de línea)
    }

    return result.trim();
}

export const sanitizeInput = (input: unknown): string => {
    if (!isValidString(input)) return '';
    const cleaned = baseSanitize(input);
    return normalizeWhitespace(cleaned, { preserveLineBreaks: false });
}

export const sanitizeTextarea = (input: unknown): string => {
    if (!isValidString(input)) return '';
    const cleaned = baseSanitize(input);
    return normalizeWhitespace(cleaned, { preserveLineBreaks: true });
}
