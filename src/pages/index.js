// @flow
import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import SectionWhen from '../sections/home/when'
import SectionAbout from '../sections/home/about'
import SectionLocation from '../sections/home/location'
// import SectionWorkshops from '../sections/home/workshops'
import SectionNationalEvenings from '../sections/home/national-evenings'
import SectionTransfer from '../sections/home/transfer'
import SectionRegistration from '../sections/home/registration'

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
    <Layout>
      <Hero
        title={title}
        subTitle={tagline}
        links={links}
        deadline={registrations.deadline}
      />
      <main>
        <SectionWhen startDate={startDate} durationInDays={durationInDays} />
        <SectionAbout />
        <SectionLocation />
        {/* <SectionWorkshops /> */}
        <SectionNationalEvenings />
        <SectionTransfer />
        <SectionRegistration {...registrations} email={email} links={links} />
      </main>
    </Layout>
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
