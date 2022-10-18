const dotenv = require('dotenv');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');

dotenv.config();

exports.createDepartment = async (data) => {
    const result = model.departments.create(data);
    return result;
};

exports.updateDepartmentById = async (id, data) => {
    const update = await model.departments.update(data, {
        where: { id },
    });
    return update;
};

exports.allDepartment = async (query) => {
    const { page = 1, limit, text = '', isActive, organizationLevel } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    // sequelize.where(sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('name'))), 'LIKE', `%${searchValue}%`),
    // sequelize.where(sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('code'))), 'LIKE', `%${searchValue}%`),
    // sequelize.where(sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('description'))), 'LIKE', `%${searchValue}%`),
    const conditions = [{
        [Op.or]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${searchValue}%`),
            sequelize.where(sequelize.fn('LOWER', sequelize.col('code')), 'LIKE', `%${searchValue}%`),
        ],
    }];
    if (isActive) conditions.push({ isActive });
    if (organizationLevel) conditions.push({ organizationLevel });
    try {
        const total = await model.departments.count();
        const data = await model.departments.findAndCountAll({
            offset: (page - 1) * limit || 0,
            limit,
            order: [
                ['id', 'ASC'],
            ],
            where: {
                [Op.and]: conditions,
            },
        });
        return { data: data.rows, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.rows.length, total } };
    } catch (error) {
        return error;
    }
};

exports.detailDepartment = async (id) => {
    const detail = await model.departments.findOne({
        where: { id },
    });
    return detail;
};

exports.deleteDepartment = async (id) => {
    const deleteDepartment = await model.departments.destroy({ where: { id } });
    return deleteDepartment;
};

exports.getUserByDepartmentId = async (id) => {
    const getUser = await model.users.findAll({ where: { department_id: id } });
    return getUser;
};

exports.getKpiNormByDepartmentId = async (id) => {
    const getKpiNorm = await model.kpiNorms.findAll({ where: { department_id: id } });
    return getKpiNorm;
};

exports.getPositionByDepartmentId = async (id) => {
    const getPosition = await model.positions.findAll({ where: { department_id: id } });
    return getPosition;
};

exports.updateUser = async (id) => {
    const updateUser = await model.users.update(
        { department_id: null },
        { where: { id } },
    );
    return updateUser;
};

exports.updatePosition = async (id) => {
    const updatePosition = await model.positions.update(
        { department_id: null },
        { where: { id } },
    );
    return updatePosition;
};

exports.updateKpiNorm = async (id) => {
    const updateKpiNorm = await model.kpiNorms.update(
        { department_id: null },
        { where: { id } },
    );
    return updateKpiNorm;
};

exports.deleteMissionDepartment = async (id) => {
    const deleteMissionDepartment = await model.missionDepartments.destroy({ where: { departmentId: id } });
    return deleteMissionDepartment;
};

// exports.getAllDepartment = async (id) => {
//     try {
//         const allDepartment = await model.departments.findAll({ where: { parent_id: id } });
//         return allDepartment;
//     } catch (error) {
//         return error;
//     }
// };
