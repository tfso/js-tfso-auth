import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/TfsoAuth.js',
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