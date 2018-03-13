import { css } from 'react-emotion'

const BASE_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const SCREEN_WIDTH = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1440,
}

const BOX_SHADOW = css`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`

export const theme = {
  fontFamily: {
    display: `"Waldorf SLO", ${BASE_FONT_FAMILY}`,
  },
  textShadow: css`
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.75);
  `,
  fontSmoothing: css`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  `,
  colors: {
    primary: '#d35400',
    primaryDarker: '#aa2e00',
    secondary: '#3498db',
    secondaryDarker: '#205d86',
  },
  screenWidth: {
    xs: SCREEN_WIDTH.XS,
    sm: SCREEN_WIDTH.SM,
    md: SCREEN_WIDTH.MD,
    lg: SCREEN_WIDTH.LG,
    xl: SCREEN_WIDTH.XL,
    xxl: SCREEN_WIDTH.XXL,
  },
  mq: {
    xs: `@media (min-width: ${SCREEN_WIDTH.XS}px)`,
    sm: `@media (min-width: ${SCREEN_WIDTH.SM}px)`,
    md: `@media (min-width: ${SCREEN_WIDTH.MD}px)`,
    lg: `@media (min-width: ${SCREEN_WIDTH.LG}px)`,
    xl: `@media (min-width: ${SCREEN_WIDTH.XL}px)`,
    xxl: `@media (min-width: ${SCREEN_WIDTH.XXL}px)`,
  },
  mqMax: {
    xs: `@media (max-width: ${SCREEN_WIDTH.XS - 1}px)`,
    sm: `@media (max-width: ${SCREEN_WIDTH.SM - 1}px)`,
    md: `@media (max-width: ${SCREEN_WIDTH.MD - 1}px)`,
    lg: `@media (max-width: ${SCREEN_WIDTH.LG - 1}px)`,
    xl: `@media (max-width: ${SCREEN_WIDTH.XL - 1}px)`,
    xxl: `@media (max-width: ${SCREEN_WIDTH.XXL - 1}px)`,
  },
  resetButton: css`
    -webkit-appearance: none !important;
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
  `,
  boxShadow: BOX_SHADOW,
  imageFrame: css`
    border: 1rem solid #fff;
    ${BOX_SHADOW};
  `,
}
