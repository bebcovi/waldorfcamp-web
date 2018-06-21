module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.cache'],
  testURL: 'https://waldorfcamp.net',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/test/transformer.js',
  },
}
