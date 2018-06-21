// @flow
/* eslint-disable react/no-danger */
import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'
import Container from '../components/container'
import Text from '../components/text'
import * as Icon from '../components/icons'
import cl from '../utils/cloudinary'

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: -1rem;
  color: ${props => props.theme.colors.primary};
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.primaryDarker};
  }
  > *:first-child {
    margin-right: 0.5rem;
  }
`

const Image = styled.div`
  height: 20rem;
  margin-bottom: 1rem;
  ${props => props.theme.imageFrame};
  background: url(${props =>
      cl.url(props.id, {
        width: 1024,
        crop: 'scale',
      })})
    center / cover no-repeat rgba(0, 0, 0, 0.15);
  ${props => props.theme.mq.md} {
    width: 20rem;
    float: right;
    margin-left: 1rem;
  }
  ${props => props.theme.mq.lg} {
    width: 26rem;
  }
`

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string,
        image: {
          id: string,
        },
        cost: ?string,
      },
      html: string,
    },
  },
}

const WorkshopTemplate = ({ data }: Props) => {
  const {
    frontmatter: { title, image, cost },
    html,
  } = data.markdownRemark
  return (
    <Container>
      <Text>
        <BackLink to="/workshops">
          <Icon.ArrowLeft /> Workshops
        </BackLink>
        <h1>{title}</h1>
        <Image {...image} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {cost != null ? (
          <p>
            <strong>Cost</strong>: {cost}.
          </p>
        ) : null}
      </Text>
    </Container>
  )
}

export const pageQuery = graphql`
  query WorkshopsByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        image {
          id
        }
        cost
      }
    }
  }
`

export default WorkshopTemplate
