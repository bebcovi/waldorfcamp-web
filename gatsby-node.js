/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  presets: [...babelrc.presets, 'flow'],
  plugins: [
    ...babelrc.plugins,
    'lodash',
    'polished',
    'date-fns',
    [
      'emotion',
      process.env.NODE_ENV === 'production'
        ? {
            hoist: true,
          }
        : {
            sourceMap: true,
            autoLabel: true,
          },
    ],
  ],
})

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const workshopTemplate = path.join(
    __dirname,
    'src',
    'templates',
    'workshop.js',
  )
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: workshopTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}
