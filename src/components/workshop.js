// @flow
/* eslint-disable react/no-danger */
import * as React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Container from './container'
import Text from './text'
import * as Icon from './icons'
import cl from '../utils/cloudinary'

const BackLink = styled.a`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: -1rem;
  color: ${props => props.theme.colors.primary};
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.primaryDarker};
  }
  > *:first-child {
    margin-right: 0.5rem;
  }
`

const Image = styled.div`
  height: 20rem;
  margin-bottom: 1rem;
  ${props => props.theme.imageFrame};
  background: url(${props =>
      cl.url(props.id, {
        width: 1024,
        crop: 'scale',
      })})
    center / cover no-repeat rgba(0, 0, 0, 0.15);
  ${props => props.theme.mq.md} {
    width: 20rem;
    float: right;
    margin-left: 1rem;
  }
  ${props => props.theme.mq.lg} {
    width: 26rem;
  }
`

type Props = {
  title: string,
  image: {
    id: string,
    width: number,
    height: number,
  },
  cost: ?string,
  children: React.Node,
}

const WorkshopTemplate = ({ title, image, cost, children }: Props) => {
  return (
    <>
      <Container>
        <Text>
          <Link href="/workshops" passHref>
            <BackLink>
              <Icon.ArrowLeft /> Workshops
            </BackLink>
          </Link>
          <h1>{title}</h1>
          <Image {...image} />
          {children}
          {cost != null ? (
            <p>
              <strong>Cost</strong>: {cost}.
            </p>
          ) : null}
        </Text>
      </Container>
    </>
  )
}

export default WorkshopTemplate
