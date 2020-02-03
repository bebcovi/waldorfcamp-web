// @flow
import * as React from 'react'

const code = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-157613905-1');
`

const GoogleAnalytics = () =>
  process.env.NODE_ENV === 'production' ? (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-157613905-1"
      />
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{ __html: code }} />
    </>
  ) : null

export default GoogleAnalytics
