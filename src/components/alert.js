// @flow
import React from 'react'
import styled from 'styled-components'
import { tint, shade } from 'polished'

const Container = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: ${props => tint(0.15, props.theme.colors[props.type])};
  border-left: 0.25rem solid ${props => props.theme.colors[props.type]};
  color: ${props => shade(0.8, props.theme.colors[props.type])};

  > *:last-child {
    margin-bottom: 0;
  }
`

type Props = {
  type: 'info' | 'warning' | 'error',
}

const Alert = (props: Props) => <Container {...props} />

export default Alert
