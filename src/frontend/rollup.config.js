import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

// Used to produce a client bundle such that the browser can download one file
// Takes the transpiled js from temp, and creates an ES5 bundle
export default {
  input: 'temp/index.js',
  output: {
    file: 'dist/public/scripts/index.js',
    format: 'iife',
  },
  context: 'window',
  plugins: [
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'esmExternals',
    }),
    json(),
    resolve({ preferBuiltins: true, browser: true }),
    terser({ ie8: true, safari10: true, format: { comments: false } }),
  ],
}
