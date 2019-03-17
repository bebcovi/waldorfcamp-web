// @flow
import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'
import Layout from '../components/layout'
import Container from '../components/container'
import Text from '../components/text'

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  ${props => props.theme.mq.md} {
    flex-direction: row;
  }
`
const Photo = styled.img`
  box-sizing: content-box;
  display: block;
  max-width: none;
  max-width: 100%;
  max-height: 240px;
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
      },
    },
  },
}

const ContactPage = ({ data }: Props) => {
  const { email } = data.site.siteMetadata
  return (
    <Layout>
      <Container>
        <Text>
          <h1>Contact</h1>
          <p>
            Planning a family vacation is a big deal, so we're to help with any
            questions you might have. You can contact us by sending an email to{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
        </Text>
        <Profile>
          <Photo
            src="https://res.cloudinary.com/waldorf-camp-hr/image/upload/c_fill,g_face,h_426,w_706/v1552854643/37936605_1954214804600660_8206543760796942336_n_qeotfj.jpg"
            alt="Helena Ivetić"
          />
          <Info>
            <Name>Emir Češo</Name>
            <PhoneNumber href="tel:‭+385 91 5688 472‬">
              ‭+385 91 5688 472‬
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
      }
    }
  }
`

export default ContactPage
