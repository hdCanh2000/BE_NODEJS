const dotenv = require('dotenv');
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

exports.allDepartment = async () => {
    try {
        const data = await model.departments.findAll({
            include: [{
                model: model.users,
                // where: { isDelete: false },
            }],
        });
        return data;
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
