const model = require('../../models/index');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

exports.createDepartment = async (name, description, slug, address) => {
    try {
        const department = { 
            name: name,
            description: description,
            slug: slug,
            address: address
         };
        const createDepartment = await model.departmentModel.create(department);
        return createDepartment;
    } catch (error) {
        console.log(error);
    }
};

exports.updateDepartmentById = async (department_id, name, description, slug, address) => {
    try {
        const update = await model.productModel.update({
            name: name,
            description: description,
            slug: slug,
            address: address
        }, {
            where: {
                department_id: department_id
            }
        });
        return update;
    } catch (error) {
        console.log(error);
    }
};

exports.detailDepartment = async (id) => {
    try {
        const detail = await model.departmentModel.findOne({
            where: { department_id: id }
        });
        return detail;
    } catch (error) {
        console.log(error);
    }
};




