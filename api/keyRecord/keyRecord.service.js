const model = require('../../models/index')

const getAllRecordsByTargetLogId = async (targetLogId) => {
    const data = await model.keyRecord.findAll({ where: { targetLogId } });
    console.log(data);
    return { data };
}

const addNewRecord = async (data) => {
    const add = await model.keyRecord.create(data);
    return add;
}

module.exports = {
    getAllRecordsByTargetLogId,
    addNewRecord
}