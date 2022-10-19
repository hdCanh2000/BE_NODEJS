const model = require('../../models/index');

exports.createUnit = async (data) => {
    try {
        const createDepartment = await model.units.create(data);
        return createDepartment;
    } catch (error) {
        return error;
    }
};

exports.updateUnitById = async (id, data) => {
    try {
        const update = await model.units.update(data, {
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
        const detail = await model.units.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.deleteUnitById = async (id) => {
    try {
        const deleteUnitById = await model.units.destroy({
            where: { id },
        });
        return deleteUnitById;
    } catch (error) {
        return error;
    }
};
