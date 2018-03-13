import styled from 'react-emotion'
import Text from './text'

const TextSection = Text.withComponent('section')

const Section = styled(TextSection)`
  padding: 2rem 0;

  &:first-child {
    padding-top: 5rem;
  }

  *:last-child {
    margin-bottom: 0;
  }

  ${props => props.theme.mq.md} {
    padding: 3rem 0;
  }
`

export default Section
