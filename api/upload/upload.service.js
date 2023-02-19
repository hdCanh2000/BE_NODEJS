const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')
const uploadFile = async (file, req) => {
  const uploadUrl = 'https://report.sweetsica.com/api/report/upload'
  const formData = new FormData()
  formData.append('files', fs.createReadStream(file.path))
  if (req.query.userId) {
    formData.append('userId', req.query.userId)
  }
  const uploadRes = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })
  if (!uploadRes.ok) {
    throw new Error('Upload file failed')
  }
  const uploadResJson = await uploadRes.json()
  return uploadResJson
}

module.exports = {
  uploadFile,
}
