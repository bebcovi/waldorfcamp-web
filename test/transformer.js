module.exports = require('babel-jest').createTransformer({
  presets: ['gatsby', '@babel/flow'],
  plugins: [
    [
      'emotion',
      {
        hoist: true,
        autoLabel: true,
      },
    ],
  ],
})
