import babel from 'rollup-plugin-babel';
import minimist from 'minimist';
import uglify from 'rollup-plugin-uglify-es';
import vue from 'rollup-plugin-vue';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'build/index.js',
  output: {
    name: 'Selectize',
    exports: 'named',
    globals: {
      jquery: 'jQuery',
    },
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpersWhitelist: ['objectSpread'],
      plugins: ['transform-object-rest-spread'],
      presets: [['env', { modules: false }]],
    }),
  ],
  external: ['jquery'],
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify());
}

export default config;
