import cloudinary from 'cloudinary-core'

const cl = cloudinary.Cloudinary.new()
cl.config('cloud_name', 'waldorf-camp-hr')
cl.config('secure', true)

export default cl
