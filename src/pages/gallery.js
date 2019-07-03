// @flow
import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'
import Layout from '../components/layout'
import Container from '../components/container'
import Text from '../components/text'

// masonry layout with vanilla CSS
// https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/#article-header-id-0

const List = styled.ul`
  columns: 2;
  column-gap: 0.5rem;
  @media (min-width: 768px) {
    columns: 3;
  }
`

const Item = styled.li`
  display: inline-block;
  margin-bottom: 0.5rem;
`

const Link = styled.a`
  display: block;
  position: relative;
  height: 0;
`

const Image = styled.img`
  display: block;
`

type Props = {
  data: {
    allCloudinaryResource: {
      edges: Array<{
        node: {
          public_id: string,
          version: number,
          aspect_ratio: number,
        },
      }>,
    },
  },
}

function GalleryPage({ data }: Props) {
  return (
    <Layout>
      <Container>
        <Text>
          <h1>Gallery</h1>
        </Text>
        <List>
          {data.allCloudinaryResource.edges
            .map(edge => ({
              publicId: edge.node.public_id,
              version: edge.node.version,
              aspectRatio: edge.node.aspect_ratio,
            }))
            .map(({ publicId, version, aspectRatio }) => (
              <Item key={publicId}>
                <Link
                  href={`https://res.cloudinary.com/waldorf-camp-hr/image/upload/v${version}/${publicId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    paddingBottom: `${(1 / aspectRatio) * 100}%`,
                  }}
                >
                  <Image
                    alt=""
                    src={`https://res.cloudinary.com/waldorf-camp-hr/image/upload/c_scale,w_500/v${version}/${publicId}`}
                  />
                </Link>
              </Item>
            ))}
        </List>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query GalleryPageQuery {
    allCloudinaryResource(limit: 100) {
      edges {
        node {
          public_id
          version
          aspect_ratio
        }
      }
    }
  }
`

export default GalleryPage
