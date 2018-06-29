// @flow
import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'
import styled, { injectGlobal } from 'react-emotion'
import Navigation, { HEIGHT as NAV_HEIGHT } from './navigation'
import { theme } from '../theme'
import { TrackingCode } from './tracking-code'
import type { NavigationLinks } from '../types'
// $FlowFixMe
import favicon from '../images/favicon.ico'
import '../styles/fonts.css'
import '../styles/reboot.css'
import '../styles/minireset.css'

const Spacer = styled.div`
  height: calc(${NAV_HEIGHT} + 0.25rem);
`

type Props = {
  children: React.Node,
}
type StaticData = {
  site: {
    siteMetadata: {
      title: string,
      tagline: string,
      links: {
        navigation: NavigationLinks,
      },
    },
  },
}

const DefaultTemplate = ({ children }: Props) => {
  // eslint-disable-next-line no-unused-expressions
  injectGlobal`
    html {
      font-size: 16px;
      line-height: 1.6;
      ${theme.mq.sm} {
        font-size: 18px;
      }      
    }

    a {
      text-decoration: none !important;
    }
  `

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
              tagline
              links {
                navigation {
                  name
                  path
                }
              }
            }
          }
        }
      `}
      render={(staticData: StaticData) => {
        const { title, tagline, links } = staticData.site.siteMetadata
        return (
          <ThemeProvider theme={theme}>
            <>
              <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={tagline} />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <meta
                  name="google-site-verification"
                  content="Yrlr8TcWuVrSfUteACE6qjOWW9tfeAvXPhuRA8gjQY4"
                />
                <link rel="icon" href={favicon} />
              </Helmet>
              <Navigation links={links.navigation} />
              <Spacer />
              {children}
              <TrackingCode />
            </>
          </ThemeProvider>
        )
      }}
    />
  )
}

export default DefaultTemplate
