const model = require('../../models/index');

exports.createKpiNorm = async (name, description, manday, hr, unit_id, department_id, parent_id, position_id) => {
    try {
        const kpiNorm = {
            name,
            description,
            manday,
            hr,
            unit_id,
            department_id,
            parent_id,
            position_id,
        };
        const createKpi = await model.kpiNormModel.create(kpiNorm);
        return createKpi;
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
            attributes: ['name', 'description', 'manday', 'hr', 'unit_id', 'department_id', 'parent_id', 'position_id'],
        });
        return data;
    } catch (error) {
        return error;
    }
};
