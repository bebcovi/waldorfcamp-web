// @flow
import styled from 'styled-components'

const ButtonBase = styled.div`
  padding: 0.75rem 1.25rem;
  background: ${props => props.theme.colors.primary};
  border-radius: 0.5rem;
  color: #fff;
  white-space: nowrap;
  font-weight: bold;
  text-shadow: none;
  ${props => props.theme.fontSmoothing};

  > * + * {
    margin-left: 0.5rem;
  }

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.primaryDarker};
    color: #fff;
  }

  ${props => props.theme.mq.sm} {
    padding: 1rem 1.5rem;
  }
`

const ResetButton = styled.button`
  ${props => props.theme.resetButton};
`

const ButtonAsA = ButtonBase.withComponent('a')
const ButtonAsButton = ButtonBase.withComponent(ResetButton)

export const ButtonLink = styled(ButtonAsA)`
  display: inline-flex;
  align-items: center;
`

export const Button = styled(ButtonAsButton)`
  > * {
    display: inline-block;
    vertical-align: middle;
  }
`
