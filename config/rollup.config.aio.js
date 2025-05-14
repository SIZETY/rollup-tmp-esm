import { banner, getCompiler, pkgName } from "./rollup.js";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: {
    name: pkgName,
    file: "dist/bundle.aio.js",
    format: "umd",
    banner,
    plugins: [terser()],
  },
  plugins: [
    ...getCompiler(),
    commonjs({ include: /node_modules/ }),
    nodeResolve(),
  ],
};

/**
 * 依赖
 * rollup-plugin-node-resolve -> @rollup/plugin-node-resolve
 * rollup-plugin-commonjs -> @rollup/plugin-commonjs
 * rollup-plugin-terser -> @rollup/plugin-terser
 */
