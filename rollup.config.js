import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import typescript from 'rollup-plugin-typescript2'
import { readFileSync } from 'fs'
const pkg = JSON.parse(
	readFileSync(new URL('./package.json', import.meta.url), 'utf8')
)

export default {
	input: 'src/index.ts',
	output: [
		{ file: 'dist/index.js', format: 'cjs' },
		{ file: 'dist/index.esm.js', format: 'es' },
		{ file: 'dist/index.aio.js', name: pkg.name, format: 'umd' },
	],
	plugins: [
		commonjs({ include: /node_modules/ }),
		nodeResolve(),
		typescript({ tsconfig: './tsconfig.json' }),
		babel({
			babelrc: false,
			extensions: ['.js', '.jsx', '.ts'],
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							browsers:
								'last 2 version, > 1%, ie >= 8, Chrome >= 45, safari >= 10',
							node: '0.12',
						},
						modules: false,
						loose: true,
					},
				],
			],
			plugins: [
				[
					'@babel/plugin-transform-runtime',
					{
						corejs: 3,
					},
				],
			],
			exclude: 'node_modules/**',
			babelHelpers: 'runtime',
		}),
		eslint({
			fix: false,
			throwOnError: true,
			exclude: ['node_modules/**', 'dist/**'],
			overrideConfig: {
				rules: {
					'@typescript-eslint/no-unused-expressions': [
						'error',
						{ allowShortCircuit: true },
					],
				},
			},
		}),
	],
}
