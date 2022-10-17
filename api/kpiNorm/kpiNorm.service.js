const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.createKpiNorm = async (data) => {
    try {
        const result = model.kpiNorms.create(data);
        return result;
    } catch (error) {
        return error;
    }
};

exports.updateKpiNormById = async (id, data) => {
    try {
        const update = await model.kpiNorms.update(data, {
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
        const detail = await model.kpiNorms.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.allKpiNorm = async () => {
    try {
        const data = await model.kpiNorms.findAll({
            include: [
                {
                    model: model.units,
                },
                {
                    model: model.departments,
                },
                {
                    model: model.positions,
                },
            ],
        });
        return data;
    } catch (error) {
        return error;
    }
};

exports.getKpiNormByDepartment = async (id) => {
    try {
        const data = await model.kpiNorms.findAll({
            where: { department_id: id },
            include: [model.units, model.departments, model.positions],
        });
        return data;
    } catch (error) {
        return error;
    }
};

exports.deleteById = async (id) => {
    const resource = await model.kpiNorms.findOne({
        where: { id },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};

exports.getWorkTrackByKpiNorm = async (id) => {
    try {
        const getWorkTrackByKpiNorm = await model.workTracks.findAll({ where: { kpiNorm_id: id } });
        return getWorkTrackByKpiNorm;
    } catch (error) {
        return error;
    }
};

exports.updateWorkTrack = async (id) => {
    try {
        const updateWorkTrack = await model.workTracks.update(
            { kpiNorm_id: null },
            { where: { id } },
        );
        return updateWorkTrack;
    } catch (error) {
        return error;
    }
};
