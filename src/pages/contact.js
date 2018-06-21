// @flow
import * as React from 'react'
import styled from 'react-emotion'
import Layout from '../components/layout'
import Container from '../components/container'
import Text from '../components/text'
import imgHelena from '../images/helena.jpg'

const List = styled.ul`
  list-style: disc;
  padding-left: 1rem;
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  ${props => props.theme.mq.sm} {
    flex-direction: row;
  }
`
const Photo = styled.img`
  box-sizing: content-box;
  display: block;
  max-width: none;
  width: 262px;
  height: 262px;
  ${props => props.theme.imageFrame};
  margin-bottom: 0.5rem;
`
const Info = styled.div`
  margin-left: 1rem;
`
const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
`
const PhoneNumber = styled.a`
  display: inline-block;
  color: inherit;
  opacity: 0.6;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    opacity: 1;
    border-bottom-color: currentColor;
  }
`

type Props = {
  data: {
    site: {
      siteMetadata: {
        email: string,
        links: {
          facebook: string,
        },
      },
    },
  },
}

const ContactPage = ({ data }: Props) => {
  const { email, links } = data.site.siteMetadata
  return (
    <Layout>
      <Container>
        <Text>
          <h1>Contact</h1>
          <p>
            Planning a family vacation is a big deal, so we're to help with any
            questions you might have. You can contact us by:
          </p>
          <List>
            <li>
              sending an email to <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              sending a message to our{' '}
              <a href={links.facebook}>Facebook page</a>
            </li>
          </List>
        </Text>
        <Profile>
          <Photo src={imgHelena} alt="Helena Ivetić" />
          <Info>
            <Name>Helena Ivetić</Name>
            <PhoneNumber href="tel:+385 92 1765 555‬">
              +385 92 1765 555‬
            </PhoneNumber>
          </Info>
        </Profile>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ContactPageQuery {
    site {
      siteMetadata {
        email
        links {
          facebook
        }
      }
    }
  }
`

export default ContactPage
