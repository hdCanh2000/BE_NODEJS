const model = require('../../models/index');

exports.createUnit = async (data) => {
    try {
        const createDepartment = await model.unitModel.create(data);
        return createDepartment;
    } catch (error) {
        return error;
    }
};

exports.updateUnitById = async (id, data) => {
    try {
        const update = await model.unitModel.update(data, {
            where: {
                id,
            },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.getUnitById = async (id) => {
    try {
        const detail = await model.unitModel.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.deleteUnitById = async (id) => {
    try {
        const deleteUnitById = await model.unitModel.destroy({
            where: { id },
        });
        return deleteUnitById;
    } catch (error) {
        return error;
    }
};
