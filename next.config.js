const withPlugins = require('next-compose-plugins')
const mdx = require('@next/mdx')
const smartypants = require('@silvenon/remark-smartypants')
const { PHASE_EXPORT } = require('next/constants')

if (!process.env.CI) {
  require('dotenv-safe').config()
}

module.exports = (phase, ...args) =>
  withPlugins(
    [
      mdx({
        options: {
          remarkPlugins: [smartypants],
        },
      }),
      {
        pageExtensions: ['js', 'jsx', 'md', 'mdx'],
      },
    ],
    {
      env: {
        CLOUDINARY_URL: process.env.CLOUDINARY_URL,
      },
      exportTrailingSlash: phase === PHASE_EXPORT,
    },
  )(phase, ...args)
