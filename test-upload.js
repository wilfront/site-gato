const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function streamUpload(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    stream.on('error', (err) => reject(err))
    stream.end(buffer)
  })
}

async function test() {
  try {
    const buffer = fs.readFileSync('./public/gato.jpg')
    const result = await streamUpload(buffer, {
      resource_type: 'auto',
      folder: 'painel_test',
    })
    console.log('Upload OK:', result.secure_url)
  } catch (err) {
    console.error('Erro no upload:', err)
  }
}

test()
