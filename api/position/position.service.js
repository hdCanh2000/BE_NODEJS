const model = require('../../models/index');

exports.createPosition = async (name, description, address, manager, position_levels_id, department_id) => {
    try {
        const create = await model.positionModel.create({
            name,
            description,
            address,
            manager,
            position_levels_id,
            department_id,
        });
        return create;
    } catch (error) {
        return error;
    }
};

exports.updateById = async (id, name, description, address, manager, position_levels_id) => {
    try {
        const update = await model.positionModel.update({
            id,
            name,
            description,
            address,
            manager,
            position_levels_id,
        }, {
            where: { id },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.allPosition = async () => {
    try {
        const data = await model.positionModel.findAll({});
        return data;
    } catch (error) {
        return error;
    }
};

exports.getDetail = async (id) => {
    try {
        const detail = await model.positionModel.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};
