// @flow

export const EUR_TO_HRK = 7.385014

export const fromHrkToEur = (amountHrk: number): number =>
  Math.round(amountHrk / EUR_TO_HRK)
