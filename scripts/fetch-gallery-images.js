const fs = require('fs-extra')
const { argv } = require('yargs')
const chalk = require('chalk')

if (!process.env.CI) {
  require('dotenv-safe').config()
}

const FILE = `${process.cwd()}/src/data/gallery-images.json`

const fetchGalleryImages = async () => {
  if (!argv.force && (await fs.pathExists(FILE))) {
    return
  }

  try {
    const cloudinary = require('cloudinary').v2
    const { resources } = await cloudinary.search
      .expression(`resource_type:image NOT tags=exclude-from-gallery `)
      .max_results(100)
      .execute()
    const images = resources.map(r => ({
      publicId: r.public_id,
      version: r.version,
      aspectRatio: r.aspect_ratio,
    }))
    await fs.outputJson(FILE, images, { spaces: 2 })
    console.log(`\n🖼  ${chalk.green('Images downloaded!')}`)
  } catch (err) {
    console.error(chalk.red(err))
  }
}

fetchGalleryImages()
