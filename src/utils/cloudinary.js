// @flow
import { Cloudinary } from 'cloudinary-core'

export const CLOUD_NAME = 'waldorf-camp-hr'

const cl = new Cloudinary({
  cloud_name: CLOUD_NAME,
  secure: true,
})

export default cl
