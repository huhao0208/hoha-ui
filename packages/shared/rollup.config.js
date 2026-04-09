import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

const input = 'src/index.ts'

export default [
  // ESM build
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    plugins: [resolve(), commonjs(), typescript({ tsconfig: '../../tsconfig.json' })],
    external: []
  },

  // CJS build
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [resolve(), commonjs(), typescript({ tsconfig: '../../tsconfig.json' })],
    external: []
  },

  // Type declarations
  {
    input,
    output: {
      file: pkg.types,
      format: 'esm'
    },
    plugins: [dts.default()]
  }
]
