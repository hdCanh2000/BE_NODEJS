const worktrackModel = require('../../models/workTrack.model');
const userModel = require('../../models/user.model');
const ApiError = require('../../utils/ApiError');
const { kpiNormModel, missionModel, workTrackLogModel } = require('../../models');

const getAllResource = async () => {
    const data = await worktrackModel.findAll({
        // include: {
        //     model: workTrackKpiNormModel,
        // },
    });
    return data;
};

const getResourceById = async (id) => {
    const data = await worktrackModel.findOne({
        where: {
            id,
        },
    });
    return data;
};

const getAllResourceByUserId = async (user_id) => {
    const user = await userModel.findOne({
        where: { id: user_id },
    });
    if (!user) {
        throw new ApiError(404, 'User not found!');
    }
    const data = await worktrackModel.findAll({
        where: {
            user_id: user.id,
        },
        include: [
            {
                model: kpiNormModel,
            },
            {
                model: missionModel,
            },
            {
                model: workTrackLogModel,
            }],
    });
    return data;
};

const createResource = async (data) => {
    const result = worktrackModel.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await worktrackModel.update({
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
    const resource = await worktrackModel.findOne({
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

module.exports = { getAllResource, getResourceById, getAllResourceByUserId, createResource, updateResourceById, deleteResourceById };
