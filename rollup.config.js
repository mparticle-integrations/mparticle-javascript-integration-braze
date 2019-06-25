import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
    input: 'src/AppboyKit-dev.js',
    output: {
        file: 'AppboyKit.js',
        format: 'umd',
        exports: 'named',
        name: 'mp-appboy-kit',
        strict: false
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs()
    ]
},
{
    input: 'src/AppboyKit-dev.js',
    output: {
        file: 'dist/AppboyKit.js',
        format: 'umd',
        exports: 'named',
        name: 'mp-appboy-kit'
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs()
    ]
}
]
