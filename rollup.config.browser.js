import path from 'node:path'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import config from './tsconfig-browser.json'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: path.join(config.compilerOptions.outDir || '', 'TfsoAuth.js'),
            format: 'iife',
            exports: 'named',
            name: 'TfsoAuth'
        }
    ],
    plugins: [
        resolve({browser: true}),
        commonjs(),
        typescript({
            sourceMap: true,
            tsconfig: 'tsconfig-browser.json',
        })
    ]
}