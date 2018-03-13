import * as React from 'react'
import styled from 'react-emotion'
import Section from '../../components/section'
import Container from '../../components/container'
import cl from '../../utils/cloudinary'

const BG_URL = cl.url('9678644007_078cd3420b_o_nq54mp', {
  width: 1600,
  crop: 'scale',
})

const SectionWithBg = styled(Section)`
  background: url(${BG_URL}) center / cover no-repeat #fff;
  ${props => props.theme.fontSmoothing};
`

const highlight = styled.div`
  display: inline-block;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  ${props => props.theme.mqMax.sm} {
    margin-left: -1rem;
    margin-right: -1rem;
  }
`

const H2 = highlight.withComponent('h2')
const P = highlight.withComponent('p')

const LocationSection = () => (
  <SectionWithBg inverted>
    <Container>
      <H2>Location</H2>
      <P>
        Olib is one of the most beautiful Croatian islands located in the Zadar
        archipelago just east if the island Silba and west of the island Pag.
        Olib area is only 26km², and there is only one village on the island
        that dates back to Roman times, but has many lovely and hidden coves, as
        well as the wide, sandy and shallow beaches offering great oportunities
        for bathing, boating and playing.Olib is also very green fertile island
        with many kinds of produce including good wine, olives, fish and a very
        good sheep's cheese. There are no cars and the island has a quiet,
        relaxing and friendly atmosphere. There are a few restaurants, a bar, a
        shop, post office, exchange office and tourist board office. Olib island
        is a great place for cycling!
      </P>
    </Container>
  </SectionWithBg>
)

export default LocationSection
