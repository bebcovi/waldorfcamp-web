// @flow
import type { ScreenSizeName } from '../types'

export const getScreenSizeName = ({
  width,
  theme,
}: {
  width: number,
  theme: { mq: { [ScreenSizeName]: number } },
}): ScreenSizeName => {
  if (width >= theme.mq.xl) {
    return 'xl'
  }
  if (width >= theme.mq.lg) {
    return 'lg'
  }
  if (width >= theme.mq.md) {
    return 'md'
  }
  if (width >= theme.mq.sm) {
    return 'sm'
  }
  return 'xs'
}
