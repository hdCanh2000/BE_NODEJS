const model = require('../../models/index');
const keyRecordServices = require('./keyRecord.service');

const getAllByTargetLogId = async(req, res) => {
    try {
        const result = await keyRecordServices.getAllRecordsByTargetLogId(req.params.targetLogId);
        res.status(200).json({message: 'Successfully', result});
    } catch (error) {
        console.log('err', error);
        res.status(400).json({message: 'ERROR!', error});
    }
}

const addRecord = async(req, res) => {
    try {
        const result = await keyRecordServices.addNewRecord(req.body);
        res.status(200).json({message: 'Successfully!', result});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'ERROR!', error});
    }
}

module.exports = {
    getAllByTargetLogId,
    addRecord
}