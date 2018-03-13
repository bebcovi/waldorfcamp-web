// @flow
import * as React from 'react'
import Hero from '../components/hero'
import * as Section from '../sections/home'

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string,
        tagline: string,
        registrations: {
          accepting: boolean,
          deadline: string,
        },
        startDate: string,
        durationInDays: number,
        email: string,
        links: {
          register: string,
          facebook: string,
          newsletter: string,
        },
      },
    },
  },
}

const HomePage = ({ data }: Props) => {
  const {
    title,
    tagline,
    registrations,
    startDate,
    durationInDays,
    email,
    links,
  } = data.site.siteMetadata
  return (
    <div>
      <Hero
        title={title}
        subTitle={tagline}
        links={links}
        deadline={registrations.deadline}
      />
      <main>
        <Section.When startDate={startDate} durationInDays={durationInDays} />
        <Section.About />
        <Section.Location />
        {/* <Section.Workshops /> */}
        <Section.NationalEvenings />
        <Section.Transfer />
        <Section.Registration {...registrations} email={email} links={links} />
      </main>
    </div>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        tagline
        registrations {
          accepting
          deadline
        }
        startDate
        durationInDays
        email
        links {
          register
          facebook
          newsletter
        }
      }
    }
  }
`

export default HomePage
