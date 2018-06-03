// @flow
import * as React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'
import styled, { injectGlobal } from 'react-emotion'
import Navigation, { HEIGHT as NAV_HEIGHT } from '../components/navigation'
import { theme } from '../theme'
import { TrackingCode } from '../components/tracking-code'
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
  data: {
    site: {
      siteMetadata: {
        title: string,
        tagline: string,
        links: {
          navigation: NavigationLinks,
        },
      },
    },
  },
  children: () => React.Node,
}

const DefaultTemplate = ({ data, children }: Props) => {
  const { title, tagline, links } = data.site.siteMetadata

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
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={tagline} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="google-site-verification"
            content="Yrlr8TcWuVrSfUteACE6qjOWW9tfeAvXPhuRA8gjQY4"
          />
          <link rel="icon" href={favicon} />
        </Helmet>
        <Navigation links={links.navigation} />
        <Spacer />
        {children()}
        <TrackingCode />
      </React.Fragment>
    </ThemeProvider>
  )
}

export const query = graphql`
  query DefaultLayoutQuery {
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
`

export default DefaultTemplate
