const worktrackLogModel = require('../../models/workTrackLog.model');
const worktrackModel = require('../../models/workTrack.model');
const ApiError = require('../../utils/ApiError');

const getAllResource = async () => {
    const data = await worktrackLogModel.findAll({});
    return data;
};

const getResourceById = async (id) => {
    const data = await worktrackLogModel.findOne({
        where: {
            id,
        },
    });
    return data;
};

const getAllResourceByWorktrackId = async (workTrack_id) => {
    const worktrack = await worktrackModel.findOne({
        id: workTrack_id,
    });
    if (!worktrack) {
        throw new ApiError(404, 'Worktrack not found!');
    }
    const data = await worktrackLogModel.findAll({
        where: {
            workTrack_id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const result = worktrackLogModel.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await worktrackLogModel.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await worktrackLogModel.findOne({
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
