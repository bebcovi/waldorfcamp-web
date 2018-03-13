import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import * as Icon from './icons'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Container = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const IconSpinner = styled(Icon.Spinner)`
  animation: 1s steps(12) infinite ${spin};
`

const Spinner = () => (
  <Container>
    <IconSpinner />
  </Container>
)

export default Spinner
