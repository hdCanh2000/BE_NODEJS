const worktrackModel = require('../../models/workTrack.model');
const userModel = require('../../models/user.model');
const ApiError = require('../../utils/ApiError');
const { kpiNormModel, missionModel, workTrackLogModel, departmentModel } = require('../../models');

const getAllResource = async (id) => {
    const getUserById = await userModel.findOne({ where: { id } });
    try {
        if (getUserById.role === 'admin') {
            const data = await worktrackModel.findAll({
                include: [
                    {
                        model: kpiNormModel,
                    },
                    {
                        model: userModel,
                        include: {
                            model: departmentModel,
                        },
                    },
                    {
                        model: missionModel,
                    },
                    {
                        model: workTrackLogModel,
                    }],
            });
            return data;
        }
        if (getUserById.role === 'manager') {
            const data = await worktrackModel.findAll({
                include: [
                    {
                        model: kpiNormModel,
                    },
                    {
                        model: userModel,
                        include: {
                            model: departmentModel,
                        },
                    },
                    {
                        model: missionModel,
                    },
                    {
                        model: workTrackLogModel,
                    }],
            });
            return data;
        }
    } catch (error) {
        return error;
    }
};

const getResourceById = async (id) => {
    const data = await worktrackModel.findOne({
        where: {
            id,
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
    const result = await worktrackModel.update(data, {
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
