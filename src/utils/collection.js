// @flow

export const getIndexFrom2d = ({
  columnIndex,
  rowIndex,
  columnCount,
}: {
  columnIndex: number,
  rowIndex: number,
  columnCount: number,
}) => rowIndex * columnCount + columnIndex

export const getPagesInRange = ({
  startIndex,
  stopIndex,
  perPage,
}: {
  startIndex: number,
  stopIndex: number,
  perPage: number,
}) => {
  const pages = []
  pages.push(Math.floor((startIndex + 1) / perPage) + 1)
  if (pages[0] * perPage < stopIndex + 1) {
    pages.push(pages[0] + 1)
  }
  return pages
}
