const ApiError = require('../../utils/ApiError');
const model = require('../../models/index');

const getAllResource = async (id) => {
    const getUserById = await model.users.findOne({ where: { id } });
    try {
        if (getUserById.role === 'admin') {
            const data = await model.workTracks.findAll({
                include: [
                    {
                        model: model.kpiNorms,
                    },
                    {
                        model: model.users,
                        include: {
                            model: model.departments,
                        },
                    },
                    {
                        model: model.missions,
                    },
                    {
                        model: model.workTrackLogs,
                    }],
            });
            return data;
        }
        if (getUserById.role === 'manager') {
            const data = await model.workTracks.findAll({
                include: [
                    {
                        model: model.kpiNorms,
                    },
                    {
                        model: model.users,
                        include: {
                            model: model.departments,
                        },
                    },
                    {
                        model: model.missions,
                    },
                    {
                        model: model.workTrackLogs,
                    }],
            });
            return data;
        }
    } catch (error) {
        return error;
    }
};

const getResourceById = async (id) => {
    const data = await model.workTracks.findOne({
        where: {
            id,
        },
        include: [
            {
                model: model.kpiNorms,
            },
            {
                model: model.missions,
            },
            {
                model: model.workTrackLogs,
            }],
    });
    return data;
};

const getAllResourceByUserId = async (user_id) => {
    const user = await model.users.findOne({
        where: { id: user_id },
    });
    if (!user) {
        throw new ApiError(404, 'User not found!');
    }
    const data = await model.workTracks.findAll({
        where: {
            user_id: user.id,
        },
        include: [
            {
                model: model.kpiNorms,
            },
            {
                model: model.missions,
            },
            {
                model: model.workTrackLogs,
            }],
    });
    return data;
};

const createResource = async (data) => {
    const result = model.workTracks.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await model.workTracks.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await model.workTracks.findOne({
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

const createWorkTrackUser = async (data) => {
    try {
        const createWorkTrackUsers = await model.workTrackUsers.create(data);
        if (!createWorkTrackUsers) {
            throw new ApiError(404, 'Not Found!');
        }
        return createWorkTrackUsers;
    } catch (error) {
        return error;
    }
};

const findUser = async (id) => {
    try {
        const findOneUser = await model.users.findOne({ where: { id } });
        if (!findOneUser) {
            throw new ApiError(404, 'Not Found!');
        }
        return findOneUser;
    } catch (error) {
        return error;
    }
};

module.exports = { getAllResource, getResourceById, getAllResourceByUserId, createResource, updateResourceById, deleteResourceById, createWorkTrackUser, findUser };
