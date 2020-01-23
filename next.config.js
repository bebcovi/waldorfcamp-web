const withPlugins = require('next-compose-plugins')
const mdx = require('@zeit/next-mdx')
const smartypants = require('@silvenon/remark-smartypants')
const env = require('dotenv-safe').config()
const { PHASE_EXPORT } = require('next/constants')

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
      env,
      exportTrailingSlash: phase === PHASE_EXPORT,
    },
  )(phase, ...args)
