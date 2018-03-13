/* eslint-disable global-require */

module.exports = {
  setupFiles: ['<rootDir>/test/setup/enzyme.js'],
  testPathIgnorePatterns: ['<rootDir>/.cache'],
  testURL: 'https://waldorfcamp.net',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/test/transformer.js',
  },
}
