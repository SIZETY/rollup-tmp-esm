const { defineConfig } = require('eslint/config')

// eslint-disable-next-line
const tsParser = require('@typescript-eslint/parser')
const globals = require('globals')

const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat')

const _import = require('eslint-plugin-import')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

module.exports = defineConfig([
	{
		languageOptions: {
			parser: tsParser,

			globals: {
				...globals.browser,
				...globals.commonjs,
			},

			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {},
		},

		extends: fixupConfigRules(
			compat.extends(
				'eslint:recommended',
				'plugin:import/recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:prettier/recommended'
			)
		),

		plugins: {
			import: fixupPluginRules(_import),
			'@typescript-eslint': fixupPluginRules(typescriptEslint),
		},

		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_',
				},
			],

			'no-console': 'off',
		},
	},
])
