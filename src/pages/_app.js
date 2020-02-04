// @flow
import * as React from 'react'
import App from 'next/app'
import Helmet from 'react-helmet'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Navigation, { HEIGHT as NAV_HEIGHT } from '../components/navigation'
import Footer from '../components/footer'
import { theme } from '../theme'
import GoogleAnalytics from '../components/google-analytics'
import { Gauges } from '../components/gauges'
import site from '../site'
import '../styles/fonts.css'
import '../styles/reboot.css'
import '../styles/minireset.css'

const GlobalStyle = createGlobalStyle`
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

const Wrapper = styled.div`
  min-height: calc(100vh - ${NAV_HEIGHT});
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding-top: 0.25rem;
  flex: 1 1 0%;
`

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <>
          <Helmet>
            <html lang="en" />
            <title>{site.title}</title>
            <meta name="description" content={site.tagline} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="google-site-verification"
              content="Yrlr8TcWuVrSfUteACE6qjOWW9tfeAvXPhuRA8gjQY4"
            />
            <GoogleAnalytics />
          </Helmet>
          <GlobalStyle />
          <Wrapper>
            <Navigation links={site.links.navigation} />
            <Content>
              <Component {...pageProps} />
            </Content>
            <Footer />
          </Wrapper>
          <Gauges />
        </>
      </ThemeProvider>
    )
  }
}

export default MyApp
