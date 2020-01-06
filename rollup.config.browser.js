import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.globalModule,
            format: 'iife',
            exports: 'named',
            name: 'TfsoAuth'
        }
    ],
    plugins: [
        resolve({browser: true}),
        commonjs({
            namedExports: {'node_modules/ably/browser/static/ably-commonjs.js': ['Realtime']}
        }),
        typescript({
            tsconfig: 'tsconfig-browser.json'
        })
    ]
}