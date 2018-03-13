import * as React from 'react'
import styled from 'react-emotion'
import Container from '../components/container'
import Text from '../components/text'
// import Photos from '../components/photos'

const Spacer = styled.div`
  height: 1rem;
`

const GalleryPage = () => (
  <div>
    <Container>
      <Text>
        <h1>Gallery</h1>
      </Text>
    </Container>
    {/* <Photos tags={['gallery']} perPage={30} doesScroll /> */}
    <Spacer />
  </div>
)

export default GalleryPage
