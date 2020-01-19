// @flow
import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Section from '../../section'
import Container from '../../container'
import RegistrationButton from '../../registration-button'

const Center = styled.div`
  margin-top: 2rem;
  text-align: center;
`

type Props = {
  accepting: boolean,
  deadline: string,
  email: string,
  links: {
    register: string,
    newsletter: string,
  },
}

const Registration = ({ accepting, deadline, email, links }: Props) => (
  <Section>
    <Container>
      <h2>Registration</h2>
      {accepting ? (
        <>
          <p>To register for participation you need to:</p>
          <ol>
            <li>fill out the registration form for you and your family</li>
            <li>
              pay the{' '}
              <Link href="/pricing">
                <a>participation fee</a>
              </Link>{' '}
              (that way weʼll know for sure that youʼre coming)
            </li>
            <li>
              send us the payment confirmation to{' '}
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ol>
          <Center>
            <RegistrationButton href={links.register} deadline={deadline} />
          </Center>
        </>
      ) : (
        <p>
          We're still in the organization phase, we'll let you know when we're
          ready to receive registrations. You can subscribe to{' '}
          <a href={links.newsletter}>our newsletter</a> if you want to get
          notified by email.
        </p>
      )}
    </Container>
  </Section>
)

export default Registration
