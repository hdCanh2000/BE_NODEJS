const model = require('../../models/index')

const getAllRecordsByReportId = async (keyReportId) => {
    const data = await model.keyRecord.findAll({ where: { keyReportId } });
    return { data };
}

const addNewRecord = async (data) => {
    const add = await model.keyRecord.create(data);
    return add;
}

module.exports = {
    getAllRecordsByReportId,
    addNewRecord
}