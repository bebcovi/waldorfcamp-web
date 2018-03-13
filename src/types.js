// @flow
import { theme } from './theme'

export type NavigationLinks = Array<{
  name: string,
  path: string,
}>

export type ScreenSizeName = $Keys<typeof theme.screenWidth>

export type Discounts = {
  [service: string]: {
    byAge: Array<{
      age: { min: number, max: number },
      discount: number,
    }>,
    byOrder: Array<{
      order: number,
      discount: number,
    }>,
  },
}

export type Price = {
  participationFee: number,
  accommodation: {
    min: number,
    max: number,
  },
  touristTax: number,
  lunch: number,
  dinner: number,
  discounts: Discounts,
}
