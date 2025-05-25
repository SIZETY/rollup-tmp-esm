import { banner, getCompiler, pkgName } from './rollup.js'

export default {
	input: 'src/index.js',
	output: {
		name: pkgName,
		file: 'dist/bundle.js',
		format: 'cjs',
		banner,
	},
	plugins: [...getCompiler()],
}
