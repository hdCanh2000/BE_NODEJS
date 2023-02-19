const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

const getAllRecordsByTargetLogId = async (targetLogId) => {
    const data = await model.keyRecord.findAll({ where: { targetLogId } });
    return { data };
}

const addNewRecordByTgLogId = async (data) => {
    const add = await model.keyRecord.create(data);
    return add;
}

module.exports = {
    getAllRecordsByTargetLogId,
    addNewRecordByTgLogId
}