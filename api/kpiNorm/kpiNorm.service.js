const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.createKpiNorm = async (data) => {
    try {
        const result = model.kpiNormModel.create(data);
        return result;
    } catch (error) {
        return error;
    }
};

exports.updateKpiNormById = async (id, data) => {
    try {
        const update = await model.kpiNormModel.update(data, {
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

exports.allKpiNorm = async (id) => {
    const getUserById = await model.userModel.findOne({ where: { id } });
    try {
        if (getUserById.role === 'admin') {
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
        }
        if (getUserById.role === 'manager') {
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
                where: { department_id: getUserById.department_id },
            });
            return data;
        }
    } catch (error) {
        return error;
    }
};

exports.deleteById = async (id) => {
    const resource = await model.kpiNormModel.findOne({
        where: { id },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};
