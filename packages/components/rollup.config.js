import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import vue from 'rollup-plugin-vue'
import less from 'rollup-plugin-less'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' }

const input = 'src/index.ts'

const extensions = ['.mjs', '.js', '.ts', '.tsx', '.json', '.vue']

export default [
  // ESM build
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: '../../tsconfig.json' }),
      vue(),
      less({ output: 'dist/style.css' })
    ],
    external: ['vue', '@vue/composition-api', '@hoha/utils', '@hoha/shared']
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
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: '../../tsconfig.json' }),
      vue(),
      less({ output: 'dist/style.css' })
    ],
    external: ['vue', '@vue/composition-api', '@hoha/utils', '@hoha/shared']
  },

  // UMD build
  {
    input,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'HohaComponents',
      sourcemap: true,
      globals: {
        vue: 'Vue',
        '@vue/composition-api': 'VueCompositionAPI'
      }
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: '../../tsconfig.json' }),
      vue(),
      less({ output: 'dist/style.css' }),
      terser()
    ],
    external: ['vue', '@vue/composition-api']
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
