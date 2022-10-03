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

exports.updateDepartmentById = async (id, name, description, slug, address, parent_id) => {
    try {
        const update = await model.departmentModel.update({
            name,
            description,
            slug,
            address,
            parent_id,
        }, {
            where: { id },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.allDepartment = async () => {
    try {
        const data = await model.departmentModel.findAll({});
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
