// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { format } from 'date-fns'
import { ButtonLink } from './button'
import * as Icon from './icons'

const Deadline = styled.div`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
`

type Props = {
  href: string,
  deadline: string,
}

const RegistrationButton = ({ deadline, ...props }: Props) => (
  <>
    <ButtonLink {...props}>
      <Icon.Pen />
      <div>Register for participation</div>
    </ButtonLink>
    <Deadline>
      Accepting registrations until{' '}
      <strong>{format(new Date(deadline), 'MMMM Do, YYYY')}</strong>
    </Deadline>
  </>
)

export default RegistrationButton
