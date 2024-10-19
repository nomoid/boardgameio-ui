import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import ttypescript from 'ttypescript';
import tsPlugin from 'rollup-plugin-typescript2';

const env = process.env.NODE_ENV;

const plugins = [
  postcss(),
  babel({ exclude: '**/node_modules/**' }),
  filesize(),
];

const globals = {
  immer: 'immer',
  react: 'React',
  redux: 'Redux',
  'react-cookies': 'Cookies',
  'prop-types': 'PropTypes',
  'react-dragtastic': 'ReactDragtastic',
  mousetrap: 'Mousetrap',
  'socket.io-client': 'io',
  flatted: 'Flatted',
};

export default [
  // UMD and ES versions.
  {
    input: 'packages/main.js',
    external: Object.keys(globals),
    output: [
      { file: pkg.main, format: 'umd', name: 'BoardgameIO-UI', globals },
      { file: pkg.module, format: 'es', globals },
    ],
    plugins: plugins.concat([
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    ]),
  },

  // Browser minified version.
  {
    input: 'packages/main.js',
    external: ['react'],
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'BoardgameIO-UI',
        globals,
      },
    ],
    plugins: plugins.concat([
      builtins(),
      resolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ]),
  },
];