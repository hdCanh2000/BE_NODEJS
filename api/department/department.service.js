const dotenv = require('dotenv');
const model = require('../../models/index');

dotenv.config();

exports.createDepartment = async (name, description, slug, address, parent_id) => {
    try {
        const department = {
            name,
            description,
            slug,
            address,
            parent_id,
        };
        const createDepartment = await model.departmentModel.create(department);
        return createDepartment;
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
