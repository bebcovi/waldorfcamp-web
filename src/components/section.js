// @flow
import styled, { css } from 'styled-components'
import Text from './text'
import site from '../site'

const TextSection = Text.withComponent('section')

const Section = styled(TextSection)`
  padding: 2rem 0;

  ${site.registrations.accepting &&
    css`
      padding-top: 5rem;
    `}

  *:last-child {
    margin-bottom: 0;
  }

  ${props => props.theme.mq.md} {
    padding: 3rem 0;
  }
`

export default Section
