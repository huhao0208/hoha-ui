import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import less from 'rollup-plugin-less'
import { transformSync } from '@babel/core'

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      dir: 'dist/esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: 'chunks/[name]-[hash].mjs'
    },
    {
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      dir: 'dist/lib',
      entryFileNames: '[name].js',
      chunkFileNames: 'chunks/[name]-[hash].js'
    }
  ],
  external: ['vue', '@vue/composition-api', '@hohaya/hoho-utils', '@hohaya/shared', 'vue-router'],
  plugins: [
    {
      name: 'typescript-transform',
      transform(code, id) {
        if (id.endsWith('.ts') && !id.endsWith('.d.ts')) {
          const result = transformSync(code, {
            filename: id,
            presets: [
              ['@babel/preset-typescript', {
                isTSX: false,
                allExtensions: true
              }]
            ]
          })
          return {
            code: result.code,
            map: result.map
          }
        }
      }
    },
    vue({
      css: false,
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('ho-')
      }
    }),
    less({
      output: 'dist/style.css',
      sourcemap: true,
      sourceMap: true
    }),
    resolve({
      preferBuiltins: false
    }),
    commonjs()
  ]
}
