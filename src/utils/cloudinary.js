import cloudinary from 'cloudinary-core'

const cl = cloudinary.Cloudinary.new()
cl.config('cloud_name', 'waldorf-camp-hr')

export default cl
