const dotenv = require('dotenv');
const model = require('../../models/index');

dotenv.config();

exports.createDepartment = async (name, description, slug, address) => {
    try {
        const department = {
            name,
            description,
            slug,
            address,
        };
        const createDepartment = await model.departmentModel.create(department);
        return createDepartment;
    } catch (error) {
        return error;
    }
};

exports.updateDepartmentById = async (department_id, name, description, slug, address) => {
    try {
        const update = await model.productModel.update({
            name,
            description,
            slug,
            address,
        }, {
            where: {
                department_id,
            },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.detailDepartment = async (id) => {
    try {
        const detail = await model.departmentModel.findOne({
            where: { department_id: id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};
