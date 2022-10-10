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
        const update = await model.departmentModel.update(data, {
            where: { id },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.allDepartment = async () => {
    try {
        const data = await model.departmentModel.findAll({
            include: [{
                model: model.userModel,
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
        const detail = await model.departmentModel.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};
