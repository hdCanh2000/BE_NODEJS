const model = require('../../models/index')

const getAllRecordsByReportId = async (keyReportId) => {
    const data = await model.keyRecord.findAll({ where: { keyReportId } });
    return { data };
}

module.exports = {
    getAllRecordsByReportId
}