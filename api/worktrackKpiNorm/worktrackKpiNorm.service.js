const worktrackKpiNormModel = require('../../models/worktrackKpiNorm.model');
const ApiError = require('../../utils/ApiError');
const { workTrackModel } = require('../../models');

const getAllResource = async () => {
    const data = await worktrackKpiNormModel.findAll({});
    return data;
};

const getResourceById = async (id) => {
    const data = await worktrackKpiNormModel.findOne({
        where: {
            id,
        },
    });
    return data;
};

const getAllResourceByWorktrackId = async (worktrack_id) => {
    const worktrack = await workTrackModel.findOne({
        id: worktrack_id,
    });
    if (!worktrack) {
        throw new ApiError(404, 'worktrack not found!');
    }
    const data = await worktrackKpiNormModel.findAll({
        where: {
            worktrack_id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const result = worktrackKpiNormModel.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await worktrackKpiNormModel.update({
        kpiNorm_id: data.kpiNorm_id,
        note: data.note,
        quantity: data.quantity,
        description: data.description,
        user_id: data.user_id,
    }, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await worktrackKpiNormModel.findOne({
        where:
        {
            id,
        },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};

module.exports = { getAllResource, getResourceById, getAllResourceByWorktrackId, createResource, updateResourceById, deleteResourceById };
