/* eslint-disable no-undef */
const fs = require('fs');
const uploadFile = require('../../middleware/upload');

const baseUrl = '/files/';

// upload file
const upload = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.files === undefined) {
            return res.status(400).send({ message: 'Please upload a file!' });
        }
        const dataFiles = req.files ? req.files.map((file) => `${file.filename}`) : [];
        res.status(200).json({
            message: 'Uploaded the file successfully',
            data: dataFiles,
        });
    } catch (error) {
        res.status(500).send({
            message: `Could not upload the file: ${error}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = `${__basedir}/resources/static/uploads/`;
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            res.status(500).send({
                message: 'Unable to scan files!',
            });
        }

        const fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

// upload multiple file
const uploadMultiple = async (req, res) => {
    res.send('Upload Multiple');
};

// dowload file
const dowloadFile = async (req, res) => {
    const fileName = req.params.name;
    const directoryPath = `${__basedir}/resources/static/uploads/`;

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: `Could not download the file. ${err}`,
            });
        }
    });
};

// delete file
const deleteFile = async (req, res) => {
    const fileName = req.params.name;
  const directoryPath = `${__basedir}/resources/static/uploads/`;

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: `Could not delete the file. ${err}`,
      });
    }

    res.status(200).send({
      message: 'File is deleted.',
    });
  });
};

module.exports = { upload, uploadMultiple, dowloadFile, getListFiles, deleteFile };
