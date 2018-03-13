// @flow
import styled, { css } from 'react-emotion'

const Text = styled.div`
  h1 {
    margin: 1rem 0;
    font-family: ${props => props.theme.fontFamily.display};
    font-weight: bold;
    font-size: 2.25rem;
    line-height: 1.25;
    ${props => props.theme.mq.sm} {
      font-size: 2.75rem;
    }
    ${props => props.theme.mq.lg} {
      font-size: 3.5rem;
    }
  }

  h2 {
    margin-bottom: 1rem;
    font-family: ${props => props.theme.fontFamily.display};
    font-weight: bold;
    font-size: 1.75rem;
    ${props => props.theme.mq.sm} {
      font-size: 2rem;
    }
    ${props => props.theme.mq.md} {
      font-size: 2.5rem;
    }
  }

  h3 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fontFamily.display};
    font-weight: normal;
    font-size: 1.75rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ol,
  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  ol {
    list-style: decimal;
  }
  ul {
    list-style: disc;
  }

  a:not([class]) {
    color: ${props => props.theme.colors.primary};
    border-bottom: 1px solid currentColor;
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primaryDarker};
    }
  }

  ${props =>
    props.inverted
      ? css`
          color: #fff;
          ${props.fontSmoothing};

          a:not([class]) {
            color: inherit;
            opacity: 0.6;
            &:hover,
            &:focus {
              color: inherit;
              opacity: 1;
            }
          }
        `
      : null};
`

export default Text
