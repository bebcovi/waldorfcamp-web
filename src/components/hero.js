// @flow
import * as React from 'react'
import styled from 'react-emotion'
import RegistrationButton from './registration-button'
import { z, EL } from '../utils/z'
import cl from '../utils/cloudinary'
import { BG_COLOR } from '../sections/home/when'

const Container = styled.header`
  position: relative;
  z-index: ${z(EL.HERO)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem 3rem;
  background: url(${cl.url('Foto_12-08-16_10_56_55_vzpvxq', {
      transformation: [
        {
          crop: 'scale',
          y: 0,
          width: 1600,
          height: 1432,
        },
        {
          crop: 'crop',
          gravity: 'north',
          width: 1600,
          height: 860,
          effect: 'gamma:-30',
        },
      ],
    })})
    center / cover no-repeat #223e77;
  color: #fff;
  text-align: center;
  ${props => props.theme.fontSmoothing};
  ${props => props.theme.mq.sm} {
    padding: 3rem 1rem 4rem;
  }
`

const Title = styled.h1`
  margin: 0;
  font-family: ${props => props.theme.fontFamily.display};
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 1.25;
  ${props => props.theme.textShadow};
  ${props => props.theme.mq.sm} {
    font-size: 3rem;
  }
`

const TagLine = styled.p`
  max-width: 10em;
  margin: 0;
  margin-top: 1rem;
  font-family: ${props => props.theme.fontFamily.display};
  font-size: 1.75rem;
  line-height: 1.25;
  ${props => props.theme.textShadow};
  ${props => props.theme.mq.sm} {
    max-width: none;
    font-size: 2rem;
  }
`

const Center = styled.div`
  position: absolute;
  bottom: -1.75rem;
  right: 50%;
  transform: translate(50%, 50%);
  ${props => props.theme.mq.sm} {
    bottom: -1rem;
  }
`

const BorderedRegistrationButton = styled(RegistrationButton)`
  box-shadow: 0 0 0 0.35rem ${BG_COLOR};
`

type Props = {
  title: string,
  subTitle: string,
  links: {
    register: string,
  },
  deadline: string,
}

const Hero = ({ title, subTitle, links, deadline }: Props) => (
  <Container>
    <Title>{title}</Title>
    <TagLine>{subTitle}</TagLine>
    <Center>
      <BorderedRegistrationButton href={links.register} deadline={deadline} />
    </Center>
  </Container>
)

export default Hero
