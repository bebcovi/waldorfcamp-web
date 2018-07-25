// @flow
/* eslint-env browser */
import * as React from 'react'
import ReactModal from 'react-modal'
import styled, { css } from 'react-emotion'
import { transparentize } from 'polished'
import Text from './text'
import * as Icon from './icons'
import { theme } from '../theme'
import { z, EL } from '../utils/z'

// avoid breaking Gatsby's build
if (ReactModal.setAppElement != null) {
  ReactModal.setAppElement('#___gatsby')
}

const overlayClassName = css`
  position: fixed;
  z-index: ${z(EL.MODAL)};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: ${transparentize(0.15, '#000')};
`

const preventScrollClassName = css`
  overflow: hidden;
`

const contentClassName = css`
  position: relative;
  max-width: ${theme.screenWidth.sm}px;
  margin: 0.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 0.25rem;
  ${theme.boxShadow};
  ${theme.mq.sm} {
    margin: 2rem auto;
    padding: 1.5rem;
    padding-top: 1rem;
  }
  ${theme.mq.md} {
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
  onRequestClose: () => any,
}

const Modal = ({ title, children, ...props }: Props) =>
  ReactModal.setAppElement != null ? (
    <ReactModal
      {...props}
      className={contentClassName}
      overlayClassName={overlayClassName}
      bodyOpenClassName={preventScrollClassName}
      htmlOpenClassName={preventScrollClassName}
    >
      <Header>
        <Close type="button" onClick={props.onRequestClose}>
          <Icon.Close size={32} />
        </Close>
        <Text>
          <Title>{title}</Title>
        </Text>
      </Header>
      {children}
    </ReactModal>
  ) : null

export default Modal
