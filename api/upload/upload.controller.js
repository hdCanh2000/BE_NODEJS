const uploadService = require('./upload.service')
const uploadFile = require('../../middleware/upload')
const fs = require('fs')
exports.uploadFile = async (req, res) => {
  try {
    // uploadService.uploadFile(req, res);
    await uploadFile(req, res)
    if (req.files === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }
    //get first file
    const file = req.files[0]
    const mimetypeBlackList = [
      'application/x-msdownload',
      'application/x-msdos-program',
      'application/x-msdos-windows',
      'application/javascript',
      'text/javascript',
      //php file
      'application/x-httpd-php',
      'application/x-httpd-php-source',
      'application/x-php',
    ]
    if (mimetypeBlackList.includes(file.mimetype)) {
      await fs.unlinkSync(file.path)
      throw new Error('File type not allowed')
    }
    // chmod 777
    await fs.chmodSync(file.path, 0o777)

    // upload file to storage
    const uploadRes = await uploadService.uploadFile(file, req)
    // delete file
    await fs.unlinkSync(file.path)
    res.send(uploadRes)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: `Could not upload the file: ${err.message}`,
    })
  }
}
