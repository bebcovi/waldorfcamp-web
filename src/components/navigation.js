// @flow
import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import classNames from 'classnames'
import Container from './container'
import * as Icon from './icons'
import { z, EL } from '../utils/z'
import type { NavigationLinks } from '../types'

export const HEIGHT = '3rem'

const BREAKPOINT = 'sm'

const Nav = styled.nav`
  position: fixed;
  z-index: ${z(EL.NAVIGATION)};
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  ${props => props.theme.mq.sm} {
    display: block;
  }
`

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -1rem;
`

const Anchor = styled.a`
  position: relative;
  height: ${HEIGHT};
  display: flex;
  align-items: center;
  padding: 0 0.35rem;
  cursor: pointer;
  color: #fff;
  border: 0.2rem solid transparent;
  &:hover {
    color: #fff;
  }
  &.active {
    color: #fff;
    border-bottom-color: #fff;
  }
  ${props => props.theme.mq.sm} {
    padding: 0 0.75rem;
  }
  ${props => props.theme.mq.md} {
    color: rgba(255, 255, 255, 0.75);
    &:hover,
    &:focus {
      color: #fff;
    }
  }
`
const HomeAnchor = styled(Anchor)`
  ${props => props.theme.mqMax[BREAKPOINT]} {
    display: none;
  }
`

const List = styled.ol`
  list-style: none;
  display: flex;
  align-items: center;
`

type Props = {
  links: NavigationLinks,
}

const Navigation = ({ links }: Props) => {
  const router = useRouter()
  return (
    <Nav>
      <Container>
        <Inner>
          <Link href="/" passHref>
            <HomeAnchor>
              <Icon.Home />
            </HomeAnchor>
          </Link>
          <List>
            {links.map(({ name, path }) => (
              <li key={name}>
                <Link href={path} passHref>
                  <Anchor
                    className={classNames({
                      active: router.pathname === path,
                    })}
                  >
                    {name}
                  </Anchor>
                </Link>
              </li>
            ))}
          </List>
        </Inner>
      </Container>
    </Nav>
  )
}

export default Navigation
