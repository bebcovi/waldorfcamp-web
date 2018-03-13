import { getIndexFrom2d } from './collection'

describe('collection', () => {
  it('getIndexFrom2d()', () => {
    expect(
      getIndexFrom2d({
        columnIndex: 2,
        rowIndex: 1,
        columnCount: 4,
      }),
    ).toBe(6)
    expect(
      getIndexFrom2d({
        rowIndex: 0,
        columnIndex: 1,
        columnCount: 3,
      }),
    ).toBe(1)
    expect(
      getIndexFrom2d({
        rowIndex: 3,
        columnIndex: 0,
        columnCount: 2,
      }),
    ).toBe(6)
  })
})
