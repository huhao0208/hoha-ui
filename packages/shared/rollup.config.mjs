import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { transformSync } from '@babel/core'

export default {
  input: 'src/index.ts',
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
    }
  ],
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
    resolve({
      preferBuiltins: false
    }),
    commonjs()
  ]
}
