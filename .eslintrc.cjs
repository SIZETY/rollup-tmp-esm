module.exports = {
	parser: '@typescript-eslint/parser',
	settings: {
		'import/resolver': {
			typescript: {
				// 指定 tsconfig.json 路径（默认会查找项目根目录的 tsconfig.json）
				project: './tsconfig.json',
			},
			// 如果你使用了路径别名（如 `@/*`），还需要 node 解析器
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
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
