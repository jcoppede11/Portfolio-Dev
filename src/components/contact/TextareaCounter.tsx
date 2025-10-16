import React, { useEffect, useState } from 'react';

interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    maxlength?: number;
    rows?: number;
    className?: string;
    required?: boolean;
    label?: string;
}

const TextareaCounter: React.FC<Props> = ({
    id = 'message',
    name = 'message',
    placeholder = 'Cuéntame sobre tu proyecto...',
    maxlength = 1000,
    rows = 5,
    className = '',
    required = false,
    label = 'Mensaje',
}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        // Sync initial count with existing DOM if any
        const el = document.getElementById(id) as HTMLTextAreaElement | null;
        if (el) setValue(el.value || '');
    }, [id]);

    useEffect(() => {
        const textarea = document.getElementById(id) as HTMLTextAreaElement | null;
        const countEl = document.getElementById('message-count');
        if (countEl) countEl.textContent = value.length.toString();

        // Keep textarea value in sync for form submission
        if (textarea && textarea.value !== value) textarea.value = value;
    }, [value, id]);

    return (
        <div className="form-group full-width">
            <label htmlFor={id} className="form-label">
                {label} {required && <span className="required">*</span>}
            </label>

            <textarea
                id={id}
                name={name}
                required={required}
                maxLength={maxlength}
                rows={rows}
                className={`form-textarea ${className} w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm leading-normal focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <span className="error-message text-xs text-red-600 mt-1" id={`${name}-error`} />

            <div className="char-counter text-xs text-gray-500 mt-1">
                <span id="message-count">0</span>/{maxlength} caracteres
            </div>
        </div>
    );
};

export default TextareaCounter;
