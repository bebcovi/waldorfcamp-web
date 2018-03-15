// @flow
/* eslint-env browser */
import * as React from 'react'
import { createPortal } from 'react-dom'
import ScrollLock from 'react-scrolllock'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled from 'react-emotion'
import { transparentize } from 'polished'
import Text from '../components/text'
import * as Icon from '../components/icons'
import { modalRoot } from '../class-names'
import { z, EL } from '../utils/z'

const TRANSITION_DURATION = 150

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
  _rootEl = document.querySelector(`.${modalRoot}`)
  _containerEl = document.createElement('div')
  _backDrop: ?HTMLDivElement

  componentDidMount() {
    if (this._rootEl == null) throw new Error("Root element doesn't exist")
    this._rootEl.appendChild(this._containerEl)
  }

  componentWillUnmount() {
    if (this._rootEl == null) throw new Error("Root element doesn't exist")
    this._rootEl.removeChild(this._containerEl)
  }

  render() {
    const { title, children, onClose } = this.props
    return createPortal(
      <CSSTransition appear in timeout={TRANSITION_DURATION} classNames="fade">
        <BackDrop
          ref={node => {
            this._backDrop = node
          }}
          onClick={onClose}
        >
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
          <ScrollLock touchScrollTarget={this._backDrop} />
        </BackDrop>
      </CSSTransition>,
      this._containerEl,
    )
  }
}

export default Modal
