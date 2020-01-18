// @flow
import * as React from 'react'
import styled from 'react-emotion'
import Section from '../../components/section'
import Container from '../../components/container'
import { theme } from '../../theme'

const WAVES_MIN_WIDTH = '50rem'
const WAVES_HEIGHT = 80

const SectionWithBg = styled(Section)`
  position: relative;
  margin-top: 5rem;
  margin-bottom: -1rem;
  padding-top: 0;
  padding-bottom: 7rem;
  background: ${props => props.theme.colors.secondary};
  ${props => props.theme.fontSmoothing};
  ${props => props.theme.mq.sm} {
    padding-top: 0;
    padding-bottom: 7rem;
  }
`

type PathProps = Array<{|
  fill: string,
|}>
const Waves = ({ pathProps }: { pathProps: PathProps }) => {
  const paths = [
    'M495.878,59.217l0,-51.88c-6.342,-3.734 -29.88,-15.675 -54.012,2.368c-15.448,11.551 -37.33,-10.915 -56.973,-2.32c-6.429,2.814 -30.322,16.301 -40.203,11.6c-58.42,-27.796 -53.873,9.156 -82.818,-5.762c-39.522,-20.37 -43.195,21.575 -95.545,-2.988c-20.87,-9.792 -42.629,6.279 -63.579,6.963c-31.142,1.016 -38.033,-21.921 -60.008,-9.432c-8.067,4.585 -26.322,7.689 -36.051,1.235c-1.848,-1.226 -4.203,-2.318 -6.689,-3.067l0,53.283l495.878,0Z',
    'M0,76.871l0,-53.501c7.077,-4.276 11.486,-4.025 18.753,-1.87c23.56,6.987 47.899,5.961 71.192,-4.809c27.113,-12.537 42.606,5.545 64.608,8.193c15.185,1.827 33.174,-15.662 53.475,-12.695c23.646,3.455 32.837,20.906 70.517,1.082c11.751,-6.182 40,11.942 59.199,11.942c36.084,0 27.235,-23.582 75.704,-3.976c35.495,14.357 65.113,-28.177 82.43,-13.9l0,69.534l-495.878,0Z',
    'M0,81.356l0,-38.436c34.541,-4.817 40.052,-38.802 77.806,-18.004c35.032,19.298 54.193,-12.033 106.391,5.481c23.228,7.794 39.71,-29.668 77.027,-8.799c49.487,27.675 58.132,-31.749 91.827,-1.666c17.476,15.603 29.496,14.129 48.78,0.499c10.478,-7.407 25.053,-5.013 36.477,0.605c20.003,9.834 26.061,-18.467 56.797,6.997c0.181,0.151 0.446,0.342 0.773,0.563l0,52.76l-495.878,0Z',
    'M0,81.356l0,-32.918c6.341,-3.32 17.969,-12.605 54.011,-1.592c19.422,5.934 36.56,-14.142 56.202,-6.497c6.429,2.503 30.676,8.57 40.975,5.22c51.476,-16.746 53.873,8.144 82.817,-5.125c39.522,-18.12 43.196,19.191 95.546,-2.658c20.869,-8.71 42.628,5.585 63.579,6.193c31.141,0.904 38.032,-19.498 60.007,-8.389c8.068,4.078 26.323,6.839 36.052,1.098c1.847,-1.09 4.203,-2.062 6.689,-2.727l0,47.395l-495.878,0Z',
  ]
  return (
    <svg
      viewBox="0 0 496 81"
      preserveAspectRatio="none"
      width="100%"
      height={WAVES_HEIGHT}
      style={{ display: 'block', minWidth: WAVES_MIN_WIDTH }}
    >
      {paths.map((d, i) => (
        <path key={d} d={d} {...pathProps[paths.length - 1 - i]} />
      ))}
    </svg>
  )
}
const WavesContainer = ({ pathProps, ...props }: { pathProps: PathProps }) => (
  <div {...props}>
    <Waves pathProps={pathProps} />
  </div>
)
const TopWaves = styled(WavesContainer)`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);
`
const BottomWaves = styled(WavesContainer)`
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const Row = styled.div`
  ${props => props.theme.mq.md} {
    display: flex;
  }
`
const Column = styled.div`
  & + & {
    margin-top: 1rem;
  }
  ${props => props.theme.mq.md} {
    flex: 1 1 0%;
    padding: 0 1rem;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
    & + & {
      margin-top: 0;
    }
  }
`

const Transfer = () => (
  <SectionWithBg inverted>
    <TopWaves
      pathProps={[
        { fill: theme.colors.secondary },
        { fill: '#2184c5' },
        { fill: '#1e77b3' },
        { fill: theme.colors.secondaryDarker },
      ]}
    />
    <Container>
      <h2>Transfer</h2>
      <p>We strongly recommend buying traveling insurance!</p>
      <Row>
        <Column>
          <h3>Ferry</h3>
          <p>
            You can take a ferry from Zadar which will only take about two
            hours. You may check for ferry schedules at{' '}
            <a href="http://www.jadrolinija.hr/en/ferry-croatia">Jadrolinija</a>{' '}
            to avoid any inconvenience (District of Zadar: Zadar – Premuda/Mali
            Lošinj).
          </p>
        </Column>
        <Column>
          <h3>Catamaran</h3>
          <p>
            You can also take the catamaran{' '}
            <a href="http://www.miatours.hr/summer-timetable-olib-silba-premuda-zadar-line-9401/">
              Miatours
            </a>{' '}
            which is faster, but it cannot transfer cars, bikes are allowed with
            the extra cost 50 HRK (about 6.72 €). On catamaran there is also a
            baggage limit—one piece of baggage is allowed per person. We
            recommend buying a ticket for the ferry or catamaran in advance.
          </p>
        </Column>
      </Row>
    </Container>
    <BottomWaves
      pathProps={[
        { fill: '#fff' },
        { fill: '#d5eeff' },
        { fill: '#8ac4ea' },
        { fill: '#5faee3' },
      ]}
    />
  </SectionWithBg>
)

export default Transfer
