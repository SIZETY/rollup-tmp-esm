module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['import', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '^_',
			},
		],
		'no-console': 'off',
	},
}
