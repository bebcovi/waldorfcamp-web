module.exports = {
  presets: ['next/babel', '@babel/flow'],
  plugins: [
    'lodash',
    'polished',
    'date-fns',
    ['styled-components', { ssr: true }],
    'preval',
  ],
}
