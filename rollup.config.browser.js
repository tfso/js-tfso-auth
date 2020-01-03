import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

export default {
    input: 'dist/index.js',
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
        })
    ]
}