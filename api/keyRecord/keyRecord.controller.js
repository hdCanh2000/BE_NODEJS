const model = require('../../models/index');
const keyRecordServices = require('./keyRecord.service');

const getAllByReportId = async(req, res) => {
    try {
        const result = await keyRecordServices.getAllRecordsByReportId(req.params.keyReportId);
        res.status(200).json({message: 'Successfully', result});
    } catch (error) {
        console.log('err', error);
        res.status(400).json({message: 'ERROR!', error});
    }
}

module.exports = {
    getAllByReportId
}