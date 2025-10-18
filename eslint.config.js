// eslint.config.js - Astro + TypeScript + React Islands, ESLint 9 compatible

import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import astro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'

export default [
    // 🚫 Archivos ignorados (reemplaza .eslintignore)
    {
        ignores: ['dist/**', 'node_modules/**'],
    },

    // 🟣 Reglas para archivos .astro
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tsParser, // permite TypeScript dentro de .astro
                extraFileExtensions: ['.astro'],
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        plugins: { astro },
        rules: {
            ...astro.configs.recommended.rules
        },
    },

    // 🔵 Reglas para TypeScript y React (.ts / .tsx)
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true // 👈 Reconocer JSX/TSX para React Islands
                }
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,

            // ✅ Permitir "any" como warning, no error
            '@typescript-eslint/no-explicit-any': 'warn',

            // ✅ Evitar errores innecesarios al inicio
            'no-undef': 'off', // Astro a veces genera esto con window/document
        }
    }
]
