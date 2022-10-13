const model = require('../../models/index');

exports.createPosition = async (data) => {
    try {
        const create = await model.positions.create(data);
        return create;
    } catch (error) {
        return error;
    }
};

exports.updateById = async (id, data) => {
    try {
        const update = await model.positions.update(data, {
            where: { id },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.allPosition = async () => {
    try {
        const data = await model.positions.findAll({
            include: [
                {
                    model: model.positionLevels,
                },
                {
                    model: model.departments,
                },
                {
                    model: model.requirements,
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
        const detail = await model.positions.findOne({
            where: { id },
            include: [
                {
                    model: model.requirements,
                },
                {
                    model: model.kpiNorms,
                },
            ],
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.getPositionRequirement = async (id) => {
    try {
        const detail = await model.positionRequirement.findAll({
            where: { positionId: id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.deletePositionRequirement = async (id) => {
    try {
        const deletePR = await model.positionRequirement.destroy({ where: { positionId: id } });
        return deletePR;
    } catch (error) {
        return error;
    }
};
