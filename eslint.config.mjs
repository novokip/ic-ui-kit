import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import {globalIgnores} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    globalIgnores(['webpack.config.ts', 'eslint.config.mjs', 'dist/*', 'tsconfig.json', '**/.node_modules/', 'build-config/*', '.storybook/*']),
    {
        files: ['src/**/*.{d.ts,ts,tsx}'],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {languageOptions: {globals: globals.browser, parserOptions: {project: ['tsconfig.json']}}},
    {
        plugins: {
            'react-hooks': pluginReactHooks,
        },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'react/no-unknown-property': ['error', {ignore: ['css']}],
        },
    },
];
