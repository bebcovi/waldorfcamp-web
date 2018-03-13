// @flow
import * as React from 'react'
import styled from 'react-emotion'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: ${props => props.ratio * 100}%;

  > * {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

type Props = {
  height: number,
  width: number,
  children: React.Node,
}

const IntrinsicRatio = ({ width, height, children }: Props) => (
  <Container ratio={height / width}>{children}</Container>
)

export default IntrinsicRatio
