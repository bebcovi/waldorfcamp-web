const withPlugins = require('next-compose-plugins')
const mdx = require('@zeit/next-mdx')
const smartypants = require('@silvenon/remark-smartypants')
const env = require('dotenv-safe').config()

module.exports = withPlugins(
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
    exportTrailingSlash: true,
  },
)
