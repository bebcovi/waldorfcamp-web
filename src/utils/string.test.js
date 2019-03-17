// @flow
import { capitalize } from './string'

describe('utils', () => {
  describe('capitalize()', () => {
    it('converts first letter to uppercase', () => {
      expect(capitalize('price in HRK')).toBe('Price in HRK')
    })
  })
})
