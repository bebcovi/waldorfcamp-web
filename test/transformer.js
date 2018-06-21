module.exports = require('babel-jest').createTransformer({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-lodash',
    'babel-plugin-polished',
    'babel-plugin-date-fns',
    [
      'babel-plugin-emotion',
      {
        hoist: true,
        autoLabel: true,
      },
    ],
  ],
})
