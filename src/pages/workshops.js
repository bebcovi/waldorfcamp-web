// @flow
import * as React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Container from '../components/container'
import Text from '../components/text'
import Alert from '../components/alert'
import cl from '../utils/cloudinary'
import site from '../site'
import workshops from '../data/workshops'

const Grid = styled.div`
  max-width: ${props => props.theme.screenWidth.xxl}px;
  margin-bottom: 1rem;
  ${props => props.theme.mq.md} {
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
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

const Anchor = styled.a`
  display: block;
  flex: 1 1 0%;
`

const Name = styled.h2`
  align-self: stretch;
  padding: 0.75rem 0;
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
    #ddd center / cover no-repeat;
  box-shadow: inset 0 0 0.75rem 0 rgba(0, 0, 0, 0.5);
`

const ExtraCost = styled.div`
  position: absolute;
  top: 0;
  right: 0.5rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-indent: -0.25rem;
  width: 2rem;
  height: 2rem;
  background: #fff;
  border-radius: 50%;
  color: ${props => props.theme.colors.secondary};
  font-weight: bold;
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

const WorkshopsPage = () => (
  <>
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
        <p>
          We're happy to announce that this year we have a new workshop,{' '}
          <Link href="/workshops/water-activities">
            <a>water activities</a>
          </Link>
          , where you will have an opportunity to learn the basics of
          windsurfing, kayaking and standup paddleboarding. You will also learn
          how to tie basic knots needed for sailing, about winds, sea currents
          and lots more!
        </p>
        <p>Workshops are included in the participation fee.</p>
        {site.areWorkshopsWip ? (
          <Alert type="warning">
            <p>
              We're still working out some details, this list of workshops is
              not final!
            </p>
          </Alert>
        ) : null}
      </Text>
    </Container>

    <Grid>
      {workshops
        .filter(({ active }) => active)
        .sort((w1, w2) => {
          if (w1.title < w2.title) {
            return -1
          }
          if (w1.title > w2.title) {
            return 1
          }
          return 0
        })
        .map(({ path, title, image, leaders, cost }) => (
          <Item key={path}>
            <Link href={path} passHref>
              <Anchor>
                <Name>{title}</Name>
                <Image {...image}>
                  {!site.areWorkshopsWip &&
                    (leaders.length > 1 ? (
                      <Leader>
                        {leaders.slice(0, leaders.length - 1).join(', ')}
                        {' & '}
                        {leaders[leaders.length - 1]}
                      </Leader>
                    ) : (
                      <Leader>{leaders[0]}</Leader>
                    ))}
                  {cost != null && title !== 'Painting' ? (
                    <ExtraCost>€</ExtraCost>
                  ) : null}
                </Image>
              </Anchor>
            </Link>
          </Item>
        ))}
    </Grid>
  </>
)

export default WorkshopsPage
