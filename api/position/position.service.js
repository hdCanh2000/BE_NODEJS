const model = require('../../models/index');

exports.createPosition = async (data) => {
    try {
        const create = await model.positionModel.create(data);
        return create;
    } catch (error) {
        return error;
    }
};

exports.updateById = async (id, data) => {
    try {
        const update = await model.positionModel.update(data, {
            where: { id },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.allPosition = async () => {
    try {
        const data = await model.positionModel.findAll({
            include: [
                {
                    model: model.positionLevelModel,
                },
                {
                    model: model.departmentModel,
                },
                {
                    model: model.requirementModel,
                },
            ],
        });
        return data;
    } catch (error) {
        return error;
    }
};

exports.getPositionById = async (id) => {
    try {
        const detail = await model.positionModel.findOne({
            where: { id },
            include: [
                {
                    model: model.requirementModel,
                },
                {
                    model: model.kpiNormModel,
                },
            ],
        });
        return detail;
    } catch (error) {
        return error;
    }
};
