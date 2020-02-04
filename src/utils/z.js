// @flow

// z-index

export const EL = {
  HERO: 'HERO',
  PHOTO_GRID: 'PHOTO_GRID',
  PLACEHOLDER_GRID: 'PLACEHOLDER_GRID',
  GRID_GRADIENT: 'GRID_GRADIENT',
  NAVIGATION: 'NAVIGATION',
  MODAL: 'MODAL',
}

const ITEMS = [
  EL.HERO,
  EL.PHOTO_GRID,
  EL.PLACEHOLDER_GRID,
  EL.GRID_GRADIENT,
  EL.NAVIGATION,
  EL.MODAL,
]

export function z(item: $Values<typeof EL>) {
  const index = ITEMS.indexOf(item)
  if (index === -1) {
    throw new Error(`"${item}" doesn't exist in the list of z-indices.`)
  }
  return index
}
