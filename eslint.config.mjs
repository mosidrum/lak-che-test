import globals from 'globals';
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended
});

export default [
    {
        ignores: [
            '**/commitlint.config.js',
            '**/dist/',
            '**/jest.config.ts',
            '**/eslint.config.mjs',
            '**/src/migrations/**'
        ]
    },

    // ✅ Only safe legacy configs here
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ),

    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
            unicorn,
            sonarjs,
            import: fixupPluginRules(_import),
            'prefer-arrow-functions': fixupPluginRules(preferArrowFunctions)
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser
            },
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                project: ['./tsconfig.json', './test/tsconfig.json'],
                tsconfigRootDir: __dirname
            }
        },

        rules: {
            // ✅ Inject recommended rules directly (Flat Config compliant)
            ...unicorn.configs.recommended.rules,
            ...sonarjs.configs.recommended.rules,

            'object-shorthand': ['error', 'always'],
            'max-params': ['error', 3],
            'prefer-arrow-functions/prefer-arrow-functions': 'error',

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    types: ['boolean'],
                    format: ['PascalCase'],
                    prefix: ['is', 'should', 'has', 'can', 'did', 'will']
                }
            ],

            // Custom Relaxations
            'unicorn/filename-case': 'off',
            'unicorn/no-null': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-anonymous-default-export': 'off',
            'unicorn/prefer-string-replace-all': 'off',
            'unicorn/no-nested-ternary': 'off',

            'import/prefer-default-export': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/order': 'off',
            'import/extensions': 'off',

            'no-console': 'error',
            'no-restricted-syntax': 'off',
            'no-underscore-dangle': 'off',
            'spaced-comment': 'off',
            'comma-dangle': 'off',
            'no-duplicate-imports': 'error',

            '@typescript-eslint/comma-dangle': 'off',
            '@typescript-eslint/indent': 'off',
            '@typescript-eslint/lines-between-class-members': 'off',
            '@typescript-eslint/no-namespace': 'off',

            indent: 'off',
            'react/jsx-filename-extension': 'off',
            'unicorn/no-array-callback-reference': 'off'
        }
    }
];
