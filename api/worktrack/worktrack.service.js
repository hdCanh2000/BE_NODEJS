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

const getWorkTrackByAdmin = async () => {
    try {
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
    } catch (error) {
        return error;
    }
};
const getWorkTrackByManager = async (id) => {
    try {
        const data = await model.workTracks.findAll({
            where: {
                createdBy: id,
            },
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
            },
            {
                model: model.users,
                include: {
                    model: model.departments,
                },
            },
        ],
    });
    return data;
};

const getAllResourceByUserId = async (user_id) => {
    const user = await model.users.findOne({
        where: { id: user_id },
        include: [
            {
                model: model.workTracks,
                include: [
                    model.kpiNorms,
                    model.missions,
                    model.workTrackLogs,
                ],
            },
            {
                model: model.departments,
            },
        ],
    });
    if (!user) {
        throw new ApiError(404, 'User not found!');
    }
    return user;
};

const createResource = async (data, id) => {
    // eslint-disable-next-line no-param-reassign
    data.createdBy = id;
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

const deleteWorkTrackUser = async (user_id, workTrack_id) => {
    try {
        const deleteWorkTrack = await model.workTrackUsers.destroy({ where: { userId: user_id, workTrackId: workTrack_id } });
        return deleteWorkTrack;
    } catch (error) {
        return error;
    }
};

const deleteWorkTrackUserWithWorkTrack = async (workTrack_id) => {
    try {
        const deleteWorkTrack = await model.workTrackUsers.destroy({ where: { workTrackId: workTrack_id } });
        return deleteWorkTrack;
    } catch (error) {
        return error;
    }
};

module.exports = { getAllResource, getResourceById, getAllResourceByUserId, createResource, updateResourceById, deleteResourceById, createWorkTrackUser, findUser, deleteWorkTrackUser, deleteWorkTrackUserWithWorkTrack, getWorkTrackByAdmin, getWorkTrackByManager };
