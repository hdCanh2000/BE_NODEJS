const dotenv = require('dotenv');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');

dotenv.config();

exports.createDepartment = async (data) => {
    try {
        const result = model.departmentModel.create(data);
        return result;
    } catch (error) {
        return error;
    }
};

exports.updateDepartmentById = async (id, data) => {
    try {
        const update = await model.departments.update(data, {
            where: { id },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.allDepartment = async (query) => {
    const { page = 1, limit, text = '', isActive, organizationLevel } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
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
    try {
        const detail = await model.departments.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.deleteDepartment = async (id) => {
    try {
        const deleteDepartment = await model.departments.destroy({ where: { id } });
        return deleteDepartment;
    } catch (error) {
        return error;
    }
};

exports.getUserByDepartmentId = async (id) => {
    try {
        const getUser = await model.users.findAll({ where: { department_id: id } });
        return getUser;
    } catch (error) {
        return error;
    }
};

exports.getKpiNormByDepartmentId = async (id) => {
    try {
        const getKpiNorm = await model.kpiNorms.findAll({ where: { department_id: id } });
        return getKpiNorm;
    } catch (error) {
        return error;
    }
};

exports.getPositionByDepartmentId = async (id) => {
    try {
        const getPosition = await model.positions.findAll({ where: { department_id: id } });
        return getPosition;
    } catch (error) {
        return error;
    }
};

exports.updateUser = async (id) => {
    try {
        const updateUser = await model.users.update(
            { department_id: null },
            { where: { id } },
        );
        return updateUser;
    } catch (error) {
        return error;
    }
};

exports.updatePosition = async (id) => {
    try {
        const updatePosition = await model.positions.update(
            { department_id: null },
            { where: { id } },
        );
        return updatePosition;
    } catch (error) {
        return error;
    }
};

exports.updateKpiNorm = async (id) => {
    try {
        const updateKpiNorm = await model.kpiNorms.update(
            { department_id: null },
            { where: { id } },
        );
        return updateKpiNorm;
    } catch (error) {
        return error;
    }
};

exports.deleteMissionDepartment = async (id) => {
    try {
        const deleteMissionDepartment = await model.missionDepartments.destroy({ where: { departmentId: id } });
        return deleteMissionDepartment;
    } catch (error) {
        return error;
    }
};
