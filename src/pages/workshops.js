// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import GatsbyLink from 'gatsby-link'
import { transparentize } from 'polished'
import Container from '../components/container'
import Text from '../components/text'
import * as Icon from '../components/icons'
import cl from '../utils/cloudinary'

const Grid = styled.div`
  max-width: ${props => props.theme.screenWidth.xxl}px;
  margin-bottom: 1rem;
  ${props => props.theme.mq.md} {
    display: flex;
    flex-wrap: wrap;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  ${props => props.theme.mq.xxl} {
    margin-left: auto;
    margin-right: auto;
  }
`

const Item = styled.div`
  margin-bottom: 1rem;
  ${props => props.theme.mq.md} {
    margin-bottom: 0;
    padding: 0.5rem;
    width: ${100 / 2}%;
  }
  ${props => props.theme.mq.xl} {
    width: ${100 / 3}%;
  }
`

const Link = styled(GatsbyLink)`
  display: block;
  flex: 1 1 0%;
`

const Name = styled.h2`
  align-self: stretch;
  padding: 0.25rem 0;
  background: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.fontFamily.display};
  font-weight: 300;
  font-size: 2rem;
  color: #fff;
  text-align: center;
  ${props => props.theme.fontSmoothing};
  ${props => props.theme.mq.lg} {
    font-size: 2rem;
  }
`

const Image = styled.div`
  position: relative;
  height: 16rem;
  background: url(${props =>
      cl.url(props.id, {
        width: 512,
        crop: 'scale',
      })})
    center / cover no-repeat;
  box-shadow: inset 0 0 0.75rem 0 rgba(0, 0, 0, 0.5);
`

const IconCoin = styled(Icon.Coin)`
  ${props =>
    props.inline
      ? css`
          display: inline-block;
          vertical-align: -2px;
        `
      : null};
`
const Cost = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background: ${props => transparentize(0.15, props.theme.colors.primary)};
  color: #fff;
  text-transform: lowercase;
  font-variant: small-caps;
  ${props => props.theme.fontSmoothing};
`

const Leader = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.75);
  color: #000;
  text-align: center;
`

type Props = {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            path: string,
            title: string,
            leaders: string[],
            image: {
              id: string,
              width: number,
              height: number,
            },
            cost: ?string,
          },
        },
      }>,
    },
  },
}

const WorkshopsPage = ({ data: { allMarkdownRemark: { edges } } }: Props) => (
  <React.Fragment>
    <Container>
      <Text>
        <h1>Workshops</h1>
        <p>
          Workshops are one of the best parts of Waldorf Camp, they are a way
          for you and other participants to connect and learn something
          together. If you have an idea for a workshop that you want to lead,
          you're very welcome to propose it! At the end of the camp we will have
          a performance, demonstrating all that we learned.
        </p>
        <p />
        <p>
          Most of these workshops are included in the participation fee. Those
          that cost extra are marked with “<IconCoin inline size={18} />”
        </p>
      </Text>
    </Container>

    <Grid>
      {edges.map(
        ({ node: { frontmatter: { path, title, leaders, image, cost } } }) => (
          <Item key={path}>
            <Link to={path}>
              <Name>{title}</Name>
              <Image {...image}>
                {leaders.length > 1 ? (
                  <Leader>
                    {leaders.slice(0, leaders.length - 1).join(', ')}
                    {' & '}
                    {leaders[leaders.length - 1]}
                  </Leader>
                ) : (
                  <Leader>{leaders[0]}</Leader>
                )}
                {cost != null ? (
                  <Cost>
                    <IconCoin size={18} />
                  </Cost>
                ) : null}
              </Image>
            </Link>
          </Item>
        ),
      )}
    </Grid>
  </React.Fragment>
)

export const query = graphql`
  query WorkshopsPageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { active: { eq: true } } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            leaders
            image {
              id
              width
              height
            }
            cost
          }
        }
      }
    }
  }
`

export default WorkshopsPage
