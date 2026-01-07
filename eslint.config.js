import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
    {
        // Ignore directories
        ignores: [
            '**/node_modules/**',
            '**/.quasar/**',
            '**/dist/**',
            '**/public/**',
            '**/src-cordova/**',
            '**/src-capacitor/**',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
            },
        },
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ga: 'readonly',
                cordova: 'readonly',
                __statics: 'readonly',
                __QUASAR_SSR__: 'readonly',
                __QUASAR_SSR_SERVER__: 'readonly',
                __QUASAR_SSR_CLIENT__: 'readonly',
                __QUASAR_SSR_PWA__: 'readonly',
                Capacitor: 'readonly',
                chrome: 'readonly',
            },
        },
        rules: {
            'prefer-promise-reject-errors': 'off',
            'quotes': ['warn', 'single', { avoidEscape: true }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'semi': ['warn', 'always'],
            'vue/multi-word-component-names': 'off',
            'no-extra-boolean-cast': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
        },
    },
    prettierConfig,
);
