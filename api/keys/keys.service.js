const model = require('../../models/index')
const { Op } = require('sequelize')
const sequelize = require('sequelize');
const ApiError = require('../../utils/ApiError');

const getAllKeyReportsByDepartmentId = async (userId) => {
    const getUserById = await model.users.findOne({
        where: {id: userId, isDelete: false}
    });
    if(!getUserById){
        throw new ApiError(404, 'Not Found!');
    }
    const departmentId = getUserById.department_id;
    const data = await model.keyReport.findAll({
        where: {departmentId: departmentId}
    });
    return { data }
}



const createKeyReport = async (data) => {
    const createReport = await model.keyReport.create(data)
    return createReport;
};

const updateKeyReportById = async (id, data) => {
    const getKeyReport = await model.keyReport.findOne({ where: { id } });
    if (!getKeyReport) {
        throw new ApiError(404, 'Not Found!')
    }
    const updateReport = await model.keyReport.update(data, { where: { id } })
    return updateReport;
};

const deleteKeyReportById = async (id) => {
    const getKeyReport = await model.keyReport.findOne({ where: { id } });
    if (!getKeyReport) {
        throw new ApiError(404, 'Not Found!');
    }
    const deleteReport = await model.keyReport.destroy({ where: { id } });
    return deleteReport;
}

module.exports = {
    getAllKeyReportsByDepartmentId,
    createKeyReport,
    updateKeyReportById,
    deleteKeyReportById,
}