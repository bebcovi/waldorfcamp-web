// @flow
// @preval
const fs = require('fs-extra')
const path = require('path')

// https://github.com/zeit/next.js/blob/9352392f4f374e4883c24e9409bc353fc36cb9e0/examples/blog-starter/posts/get-blog-posts.js

const DIR = path.join(path.join(process.cwd(), 'src/pages/workshops'))
const META = /export\s+const\s+meta\s+=\s+({[\s\S]*?\n})/

const files = fs
  .readdirSync(DIR)
  .filter(file => file.endsWith('.mdx'))
  .map(file => {
    const name = path.join(DIR, file)
    const content = fs.readFileSync(name)
    const match = META.exec(content)


    if (!match || typeof match[1] !== 'string') {
      throw new Error(`${name} needs to export const meta = {}`)
    }

    //run evaluation
    const meta = eval(`(${match[1]})`)
    
    return {
      ...meta,
      path: `/workshops/${file.replace(/\.mdx?$/, '')}`,
    }
  })

module.exports = files
