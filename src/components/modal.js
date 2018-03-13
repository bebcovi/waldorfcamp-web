// @flow
/* eslint-env browser */
import * as React from 'react'
import { createPortal } from 'react-dom'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled, { css } from 'react-emotion'
import { transparentize } from 'polished'
import Text from '../components/text'
import * as Icon from '../components/icons'
import { modalRoot } from '../class-names'
import { z, EL } from '../utils/z'

const TRANSITION_DURATION = 150

const disableScroll = css`
  overflow: hidden;
`

const BackDrop = styled.div`
  position: fixed;
  z-index: ${z(EL.MODAL)};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${transparentize(0.15, '#000')};
  transition: opacity ${TRANSITION_DURATION}ms;
  &.fade-appear {
    opacity: 0;
  }
  &.fade-appear-active {
    opacity: 1;
  }
`

const Container = styled.div`
  position: relative;
  max-width: ${props => props.theme.screenWidth.sm}px;
  margin: 0.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 0.25rem;
  ${props => props.theme.boxShadow};
  ${props => props.theme.mq.sm} {
    margin: 2rem auto;
    padding: 1.5rem;
    padding-top: 1rem;
  }
  ${props => props.theme.mq.md} {
    margin: 3rem auto;
  }
`

const Header = styled.div``

const Close = styled.button`
  ${props => props.theme.resetButton};
  float: right;
  margin: -0.65rem;
  margin-right: -1rem;
  margin-left: 0;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.5);
  &:hover,
  &:focus {
    color: #000;
  }
  svg {
    display: block;
  }
`

const Title = styled.h3`
  white-space: nowrap;
`

type Props = {
  title: string,
  children: React.Node,
  onClose: () => any,
}

class Modal extends React.Component<Props> {
  rootEl = document.querySelector(`.${modalRoot}`)
  containerEl = document.createElement('div')

  componentDidMount() {
    if (document.body != null) {
      document.body.classList.add(disableScroll)
    }
    if (this.rootEl == null) throw new Error("Root element doesn't exist")
    this.rootEl.appendChild(this.containerEl)
  }

  componentWillUnmount() {
    if (document.body != null) {
      document.body.classList.remove(disableScroll)
    }
    if (this.rootEl == null) throw new Error("Root element doesn't exist")
    this.rootEl.removeChild(this.containerEl)
  }

  render() {
    const { title, children, onClose } = this.props
    return createPortal(
      <CSSTransition appear in timeout={TRANSITION_DURATION} classNames="fade">
        <BackDrop onClick={onClose}>
          <Container
            onClick={event => {
              event.stopPropagation()
            }}
          >
            <Header>
              <Close type="button" onClick={onClose}>
                <Icon.Close size={32} />
              </Close>
              <Text>
                <Title>{title}</Title>
              </Text>
            </Header>
            {children}
          </Container>
        </BackDrop>
      </CSSTransition>,
      this.containerEl,
    )
  }
}

export default Modal
