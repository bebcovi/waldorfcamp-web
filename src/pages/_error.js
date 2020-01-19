// @flow
import * as React from 'react'
import Link from 'next/link'
import Container from '../components/container'
import Text from '../components/text'

type Props = {
  statusCode: number,
}

const Error = ({ statusCode }: Props) => (
  <>
    <Container>
      {statusCode === 404 ? (
        <Text>
          <h1>Page Not Found</h1>
          <p>
            This page doesn't exist anymore, but it's likely that the content
            you're looking for still exists elsewhere on the site.
          </p>
        </Text>
      ) : (
        <Text>
          <h1>We encountered a problem</h1>
          <p>
            Something went wrong, but we don't know what, sorry.{' '}
            <span role="img" aria-label="shrug">
              🤷‍♂️
            </span>
          </p>
          <p>
            <Link href="/">
              <a>← Go to home.</a>
            </Link>
          </p>
        </Text>
      )}
    </Container>
  </>
)

Error.getInitialProps = ({ res, err }) => {
  let statusCode
  if (res) {
    statusCode = res.statusCode
  } else if (err) {
    statusCode = res.statusCode
  } else {
    statusCode = 404
  }
  return { statusCode }
}

export default Error
