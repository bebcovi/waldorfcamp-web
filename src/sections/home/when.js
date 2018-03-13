// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { format, addDays, getYear } from 'date-fns'
import { shade } from 'polished'
import Section from '../../components/section'
import Container from '../../components/container'
import * as Icon from '../../components/icons'

export const BG_COLOR = shade(0.95, '#fff')
const DATE_FORMAT = 'MMMM Do'

const SectionBg = styled(Section)`
  background: ${BG_COLOR};
`

const Lead = styled.p`
  display: flex;
  margin-bottom: 0.25rem;
  align-items: center;
  font-size: 1.25rem;
  ${props => props.theme.mq.sm} {
    font-size: 1.75rem;
  }
`

const Note = styled.p`
  margin-top: -0.25rem;
  margin-left: 3.15rem;
  opacity: 0.7;
`

const IconCalendar = styled(Icon.Calendar)`
  margin-right: 1rem;
`

type Props = {
  startDate: string,
  durationInDays: number,
}

const WhenSection = ({ startDate, durationInDays }: Props) => {
  const startDateObj = new Date(startDate)
  const from = format(startDateObj, DATE_FORMAT)
  const to = format(addDays(startDateObj, durationInDays), DATE_FORMAT)
  const year = getYear(startDateObj)
  return (
    <SectionBg>
      <Container>
        <h2>When?</h2>
        <Lead>
          <IconCalendar size={40} />
          <span>
            {from} to {to}, {year}
          </span>
        </Lead>
        <Note>(from Sunday to Sunday)</Note>
      </Container>
    </SectionBg>
  )
}

export default WhenSection
