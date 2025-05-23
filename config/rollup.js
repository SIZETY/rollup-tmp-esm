import { readFileSync } from 'fs'
import bable from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'

const pkg = JSON.parse(
	readFileSync(new URL('../package.json', import.meta.url), 'utf8')
)

export const banner = `/**
* ${pkg.name} ${pkg.version}
* Licensed under MIT
*/`

export const getCompiler = () => {
	return [
		json(),

		bable({
			babelrc: false,
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
	]
}

export const pkgName = 'rollupTest'

/**
 * 相关依赖
 * rollup-plugin-babel -> @rollup/plugin-babel
 * @babel/preset-env
 * @babel/plugin-transform-runtime
 * @babel/core
 * @babel/runtime-corejs3
 * @rollup/plugin-json
 */
