const util = require('util');
const multer = require('multer');

const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // eslint-disable-next-line no-undef
        cb(null, `${__basedir}/resources/static/uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
});

const uploadFile = multer({
    storage,
    limits: { fileSize: maxSize },
}).array('files', 10);

const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
