// @flow
import * as React from 'react'
import styled from 'styled-components'
import Container from '../components/container'
import Text from '../components/text'
import cl from '../utils/cloudinary'
import images from '../data/gallery-images.json'

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
`

const Item = styled.li`
  display: inline-block;
`

const Link = styled.a`
  display: block;
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 100%;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
    transition: background-color 0.2s;
  }
  &:hover,
  &:focus {
    &::after {
      background: rgba(0, 0, 0, 0.5);
    }
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

type Props = {
  error?: string,
}

function GalleryPage({ error }: Props) {
  return (
    <main>
      <Container>
        <Text>
          <h1>Gallery</h1>
        </Text>
        {typeof error !== 'undefined' ? <p>{error}</p> : null}
      </Container>
      <List>
        {images.map(({ publicId, version }) => (
          <Item key={publicId}>
            <Link
              href={`https://res.cloudinary.com/waldorf-camp-hr/image/upload/v${version}/${publicId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt=""
                src={cl.url(publicId, {
                  crop: 'fill',
                  width: 500,
                  height: 500,
                })}
              />
            </Link>
          </Item>
        ))}
      </List>
    </main>
  )
}

export default GalleryPage
