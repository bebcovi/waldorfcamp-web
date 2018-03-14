module.exports = require('babel-jest').createTransformer({
  presets: [
    // built-in
    [
      'env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
        exclude: ['transform-regenerator', 'transform-es2015-typeof-symbol'],
      },
    ],
    'stage-0',
    'react',
    // custom
    'flow',
  ],
  plugins: [
    // built-in
    'gatsby/dist/utils/babel-plugin-extract-graphql',
    'add-module-exports',
    'transform-object-assign',
    // custom
    'lodash',
    'polished',
    'date-fns',
    [
      'emotion',
      {
        sourceMap: true,
        autoLabel: true,
      },
    ],
  ],
})
