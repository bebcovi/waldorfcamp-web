// @flow
import * as React from 'react'
import styled from 'styled-components'
import Container from './container'
import site from '../site'

const Wrapper = styled.footer`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.secondaryDarker};
  color: #fff;

  a {
    color: #fff;
    opacity: 0.75;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
`
const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Item = styled.li``
const Link = styled.a`
  display: block;
  padding: 1rem;
`

const Footer = () => (
  <Wrapper>
    <Container>
      <List>
        {site.links.social.map(({ name, url, Icon }) => (
          <Item key={name}>
            <Link href={url}>
              <Icon size={48} />
            </Link>
          </Item>
        ))}
      </List>
    </Container>
  </Wrapper>
)

export default Footer
