// @flow
import * as React from 'react'
import Container from '../components/container'
import Text from '../components/text'

const NotFoundPage = () => (
  <Container>
    <Text>
      <h1>Page Not Found</h1>
      <p>
        This page doesn't exist anymore, but it's likely that the content you're
        looking for still exists elsewhere on the site.
      </p>
    </Text>
  </Container>
)

export default NotFoundPage
