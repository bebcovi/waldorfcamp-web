import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import Section from '../../components/section'
import Container from '../../components/container'
import Text from '../../components/text'
// import Photos from '../../components/photos'
import { z, EL } from '../../utils/z'

const PhotosContainer = styled.div`
  position: relative;
  height: 26rem;
  margin-top: 2rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: ${z(EL.GRID_GRADIENT)};
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }
`

const WorkshopsSection = () => (
  <Section>
    <Container>
      <Text>
        <h2>Workshops</h2>
        <p>
          Workshops are one of the best things about Waldorf Camp. We prepared
          many this year, <Link to="/workshops">check them out</Link>. At the
          end of the camp we will have a performance, demonstrating all that we
          learned.
        </p>
      </Text>
      <PhotosContainer>{/* <Photos tags={['workshop']} /> */}</PhotosContainer>
    </Container>
  </Section>
)

export default WorkshopsSection
