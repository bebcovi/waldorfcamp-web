// @flow
import * as React from 'react'
import Hero from '../components/hero'
import SectionWhen from '../components/sections/home/when'
import SectionAbout from '../components/sections/home/about'
import SectionLocation from '../components/sections/home/location'
// import SectionWorkshops from '../components/sections/home/workshops'
import SectionTransfer from '../components/sections/home/transfer'
import SectionRegistration from '../components/sections/home/registration'
import site from '../site'

const HomePage = () => {
  return (
    <>
      <Hero
        title={site.title}
        subTitle={site.tagline}
        links={site.links}
        registrations={site.registrations}
      />
      <main>
        <SectionWhen
          startDate={site.startDate}
          durationInDays={site.durationInDays}
        />
        <SectionAbout />
        <SectionLocation />
        {/* <SectionWorkshops /> */}
        <SectionTransfer />
        <SectionRegistration
          {...site.registrations}
          email={site.email}
          links={site.links}
        />
      </main>
    </>
  )
}

export default HomePage
