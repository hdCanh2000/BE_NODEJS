const model = require('../../models/index');

exports.createKpiNorm = async (data) => {
    try {
        const result = model.kpiNormModel.create(data);
        return result;
    } catch (error) {
        return error;
    }
};

exports.updateKpiNormById = async (id, name, description, manday, hr, unit_id, department_id, parent_id, position_id) => {
    try {
        const update = await model.kpiNormModel.update({
            name,
            description,
            manday,
            hr,
            unit_id,
            department_id,
            parent_id,
            position_id,
        }, {
            where: { id },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.detailKpiNorm = async (id) => {
    try {
        const detail = await model.kpiNormModel.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.allKpiNorm = async () => {
    try {
        const data = await model.kpiNormModel.findAll({
            include: [
                {
                    model: model.unitModel,
                },
                {
                    model: model.departmentModel,
                },
                {
                    model: model.positionModel,
                },
            ],
        });
        return data;
    } catch (error) {
        return error;
    }
};
