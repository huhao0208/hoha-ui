import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'temp/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'HohaUtils',
      sourcemap: true,
      globals: {}
    }
  ],
  plugins: [
    resolve({
      preferBuiltins: false
    }),
    commonjs()
  ]
}
