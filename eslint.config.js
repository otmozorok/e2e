import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{ files: ['./src/**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
	{ files: ['./src/**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
	tseslint.configs.recommended,
	{
		files: ['./src/**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { 'import-x': importX },
		extends: ['import-x/flat/recommended'],
		rules: {
			'import-x/no-unresolved': 'off',
			'import-x/named': 2,
			'import-x/namespace': 2,
			'import-x/default': 2,
			'import-x/export': 2,
			'import-x/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type'
					],
					alphabetize: {
						order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
						caseInsensitive: true /* ignore case. Options: [true, false] */
					}
				}
			]
		}
	}
]);
