/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv-safe').config()
}

const cloudinary = require('cloudinary').v2

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  switch (stage) {
    case 'build-html':
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /react-modal/,
              loader: 'null-loader',
            },
          ],
        },
      })
      break
    default:
  }
}

exports.onCreateBabelConfig = ({ actions, stage }) => {
  actions.setBabelPreset({
    name: '@babel/preset-flow',
    stage,
  })
  actions.setBabelPlugin(
    {
      name: 'babel-plugin-lodash',
      stage,
    },
    {
      name: 'babel-plugin-polished',
      stage,
    },
    {
      name: 'bable-plugin-date-fns',
      stage,
    },
    {
      name: 'babel-plugin-emotion',
      stage,
      options:
        stage === 'build-html'
          ? {
              hoist: true,
            }
          : {
              sourceMap: true,
              autoLabel: true,
            },
    },
  )
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { resources } = await cloudinary.search
    .expression('resource_type:image NOT tags:exclude-from-gallery ')
    .max_results(100)
    .execute()
  resources.forEach(resource => {
    const nodeId = createNodeId(`cloudinary-resource-${resource.public_id}`)
    actions.createNode({
      ...resource,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'CloudinaryResource',
        content: JSON.stringify(resource),
        contentDigest: createContentDigest(resource),
      },
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
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
