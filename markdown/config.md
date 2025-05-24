# 项目配置

配置 Eslint, Typescript, Prettier, Hasky 等

## 1 Eslint

### 1.1 安装插件

```shell
yarn add eslint globals @eslint/js @rollup/plugin-eslint eslint-plugin-import  -D
```

### 1.2 配置 rollup

```js
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import { readFileSync } from 'fs'
const pkg = JSON.parse(
	readFileSync(new URL('./package.json', import.meta.url), 'utf8')
)

export default {
	input: 'src/index.js',
	output: [
		{ file: 'dist/index.js', format: 'cjs' },
		{ file: 'dist/index.esm.js', format: 'es' },
		{ file: 'dist/index.aio.js', name: pkg.name, format: 'umd' },
	],
	plugins: [
		commonjs({ include: /node_modules/ }),
		nodeResolve(),
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
		}),
	],
}
```

### 1.3 配置 eslint

```js
module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:import/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['import'],
	rules: {
		'no-console': 'off',
	},
}
```

## 2 Typescript

```shell
yarn add typescript typescript-eslint @typescript-eslint/parser rollup-plugin-typescript2 -D
```

### 2.1 typescript 配置

```json
// tsconfig.json
{
	"compilerOptions": {
		/* Visit https://aka.ms/tsconfig to read more about this file */

		/* Projects */
		// "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
		// "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
		// "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
		// "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
		// "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
		// "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

		/* Language and Environment */
		"target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
		"lib": [
			"ES2018",
			"DOM"
		] /* Specify a set of bundled library declaration files that describe the target runtime environment. */,
		// "jsx": "preserve",                                /* Specify what JSX code is generated. */
		// "libReplacement": true,                           /* Enable lib replacement. */
		// "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
		// "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
		// "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
		// "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
		// "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
		// "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
		// "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
		// "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
		// "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

		/* Modules */
		"module": "ES2022" /* Specify what module code is generated. */,
		"rootDir": "." /* Specify the root folder within your source files. */,
		// "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
		// "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
		// "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
		// "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
		// "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
		// "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
		// "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
		// "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
		// "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
		// "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
		// "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
		// "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
		// "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
		// "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
		// "resolveJsonModule": true,                        /* Enable importing .json files. */
		// "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
		// "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

		/* JavaScript Support */
		"allowJs": true /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */,
		"checkJs": true /* Enable error reporting in type-checked JavaScript files. */,
		// "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

		/* Emit */
		"declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
		"declarationMap": true /* Create sourcemaps for d.ts files. */,
		// "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
		"sourceMap": true /* Create source map files for emitted JavaScript files. */,
		// "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
		// "noEmit": true,                                   /* Disable emitting files from a compilation. */
		// "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
		"outDir": "./" /* Specify an output folder for all emitted files. */,
		// "removeComments": true,                           /* Disable emitting comments. */
		// "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
		// "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
		// "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
		// "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
		// "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
		// "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
		// "newLine": "crlf",                                /* Set the newline character for emitting files. */
		// "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
		// "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
		// "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
		// "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
		// "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

		/* Interop Constraints */
		// "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
		// "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
		// "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
		// "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
		// "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
		"esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
		// "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
		"forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

		/* Type Checking */
		"strict": true /* Enable all strict type-checking options. */,
		// "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
		// "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
		// "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
		// "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
		// "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
		// "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
		// "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
		// "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
		// "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
		// "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
		// "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
		// "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
		// "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
		// "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
		// "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
		// "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
		// "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
		// "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
		// "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

		/* Completeness */
		// "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
		"skipLibCheck": true /* Skip type checking all .d.ts files. */
	}
}
```

## 2.2 eslint 配置

```js
// .eslint.cjs
{

   parser: '@typescript-eslint/parser',
   ...,
   extends: {
    ...,
    'plugin:@typescript-eslint/recommended',
   },
   plugins: [..., '@typescript-eslint'],
   rulers: {
      ...,
    	'@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
        },
      ],
   }
}
```

## 2.3 rollup 配置

```js
// rollup.config.js
import typescript from 'rollup-plugin-typescript2'
{
  ...,
  plugins: [
    ...,
    typescript({ tsconfig: './tsconfig.json' }),
    eslint({
      ...,
			overrideConfig: {
				rules: {
          ...,
					'@typescript-eslint/no-unused-expressions': [
						'error',
						{ allowShortCircuit: true },
					],
				},
			},
		}),
  ],

}
```

## 3 prettier 配置

### 3.1 安装插件

```shell
yarn add prettier eslint-config-prettier eslint-plugin-prettier rollup-plugin-prettier -D
```

### 3.2 增加 prettier 配置文件

```json
// .prettierrc
{
	"useTabs": true,
	"tabWidth": 2,
	"printWidth": 80,
	"singleQuote": true,
	"trailingComma": "es5",
	"semi": false
}
```

### 3.3 增加 .editorconfig

```shell
root=true

[*]
charset = utf-8
indent_style = tab
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true


[*.{html}]
indent_style = tab
indent_size = 2

[*.{js}]
indent_style = tab
indent_size = 2

[*.{yml}]
indent_style = tab
indent_size = 2

[*.{md}]
indent_size = 4
indent_style = tab
```

### 3.4 配置 eslint

```js
{
	...,
	extends: [
		...,
		'plugin:prettier/recommended',
	],
	rules: {
		...,
		'prettier/prettier': 'error',
	}
}
```

## 4 配置 hasky

### 4.1 安装

```shell
# 1. 自动安装
npx husky-init

# 2. 手动安装
yarn add husky -D
npx husky install
npm set-script prepare "husky install"
```

```shell
# 安装 pretty-quick
yarn add pretty-quick -D

# 安装 lint-staged
yarn add lint-staged -D
# 注 v15 以后 的版本可能需要 node 20
```

### 4.2 添加 prettier hasky

添加完成后在 git 提交时就可以自动格式化代码

```shell
# 增加配置
npx husky set .husky/pre-commit 'npx pretty-quick --staged'
```

### 4.3 新增 `.lintstagedrc.js`

```js
// .lintstagedrc.js
module.exports = {
	'**/*.js': ['eslint --cache'],
}
```

如果 eslint 是 v9+ 需要配置 `eslint.config.cjs`，可以通过官方的转码工具来一键操作：

```shell
npx @eslint/migrate-config .eslintrc.cjs

# 还需要安装一个 包
yarn add @eslint/compat -D
```

## 完成
