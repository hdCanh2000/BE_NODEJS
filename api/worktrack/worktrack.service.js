const { Op } = require('sequelize');
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

const getWorkTrackByAdmin = async (start, end) => {
    const conditions = [];
    if (start && end) {
        conditions.push({
            createdAt: {
                [Op.between]: [new Date(`${start} 00:00:01`), new Date(`${end} 23:59:59`)],
            },
        });
    }
    try {
        const data = await model.workTracks.findAll({
            where: {
                [Op.and]: conditions,
            },
            order: [
                ['id', 'ASC'],
            ],
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
                    model: model.keys,
                },
                {
                    model: model.workTrackLogs,
                },
            ],
        });
        return data;
    } catch (error) {
        return error;
    }
};

const getWorkTrackByManager = async (id, start, end) => {
    const conditions = [];
    if (start && end) {
        conditions.push({
            createdAt: {
                [Op.between]: [new Date(`${start} 00:00:01`), new Date(`${end} 23:59:59`)],
            },
        });
    }
    try {
        const data = await model.users.findOne({
            where: {
                id,
            },
            include: [
                model.departments,
                {
                    model: model.workTracks,
                    order: [
                        ['id', 'ASC'],
                    ],
                    where: {
                        [Op.and]: conditions,
                    },
                    include: [
                        model.users,
                        model.kpiNorms,
                        model.missions,
                        model.keys,
                        model.workTrackLogs,
                    ],
                },
            ],
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

const getAllResourceByUserId = async (user_id, start, end) => {
    const conditions = [];
    if (start && end) {
        conditions.push({
            createdAt: {
                [Op.between]: [new Date(`${start} 00:00:01`), new Date(`${end} 23:59:59`)],
            },
        });
    }
    try {
        const data = await model.users.findOne({
            where: {
                id: user_id,
            },
            include: [
                {
                    model: model.departments,
                },
                {
                    model: model.workTracks,
                    order: [
                        ['id', 'ASC'],
                    ],
                    where: {
                        [Op.and]: conditions,
                    },
                    include: [
                        model.kpiNorms,
                        model.missions,
                        model.keys,
                        {
                            model: model.workTrackLogs,
                            include: model.workTracks,
                        },
                    ],
                },
            ],
        });
        return data;
    } catch (error) {
        return error;
    }
};

const findWorkTrackByKpiNormAndUser = async (kpiNorm_id, user_id) => {
    const result = await model.users.findAll({
        where: {
            id: user_id,
        },
        include: {
            model: model.workTracks,
            where: { kpiNorm_id },
            include: { model: model.kpiNorms },
        },
    });
    return result;
};

const updateParentId = async (id, parentId) => {
    const result = model.workTracks.update({ parent_id: parentId }, {
        where: {
            id,
        },
    });
    return result;
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

const updateStatusWorktrack = async (id, status) => {
    const result = await model.workTracks.update({ status }, {
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

const getWorkTrackByStatus = async (status) => {
    try {
        const workTrackByStatus = await model.workTracks.findAll({
            where: { status },
            order: [
                ['id', 'ASC'],
            ],
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
        return workTrackByStatus;
    } catch (error) {
        return error;
    }
};

const getWorkTrackByDepartment = async (status, department_id) => {
    try {
        const workTrackByStatus = await model.workTracks.findAll({
            where: { status },
            order: [
                ['id', 'ASC'],
            ],
            include: [
                {
                    model: model.kpiNorms,
                },
                {
                    model: model.users,
                    where: { department_id },
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
        return workTrackByStatus;
    } catch (error) {
        return error;
    }
};

// report
const reportWorktrackUser = async (workTrackId, start, end) => {
    let endDate = null;
    const conditions = [];
    if (start) {
        conditions.push({
            createdAt: {
                [Op.gte]: new Date(start),
            },
        });
    }
    if (end) {
        endDate = new Date().setDate(new Date(end).getDate());
        conditions.push({
            createdAt: {
                [Op.lte]: new Date(endDate),
            },
        });
    }
    try {
        const worktrack = await model.workTracks.findOne({
            where: {
                id: workTrackId,
            },
        });
        if (worktrack) conditions.push({ workTrack_id: workTrackId });
        const workTrackLogByWorktrackIds = await model.workTrackLogs.findAll({
            where: {
                [Op.and]: conditions,
            },
            attributes: ['id', 'status', 'date', 'quantity', 'workTrack_id'],
        });
        const totalQuantity = workTrackLogByWorktrackIds.reduce((prev, curr) => prev + curr.quantity, 0);
        const percentCompleted = Math.round((totalQuantity / worktrack.quantity) * 100) || 0;
        return { quantity: worktrack.quantity, total: totalQuantity, progress: percentCompleted, workTrackLogs: workTrackLogByWorktrackIds };
    } catch (error) {
        return error;
    }
};

const reportAllWorktrackUser = async (userId, startDate, endDate) => {
    try {
        const workTracks = await getAllResourceByUserId(userId);
        const result = [];
        await workTracks.workTracks.forEach(async (workTrack) => {
            const worktrack = await getResourceById(workTrack.id);
            try {
                const workTrackLogs = await model.workTrackLogs.findAll({
                    where: {
                        [Op.and]: {
                            workTrack_id: workTrack.id,
                            date: {
                                [Op.between]: [startDate, endDate],
                            },
                        },
                    },
                    attributes: ['id', 'status', 'date', 'quantity', 'workTrack_id'],
                });
                const totalQuantity = workTrackLogs.reduce((prev, curr) => prev + curr.quantity, 0);
                const percentCompleted = Math.round((totalQuantity / worktrack.quantity) * 100) || 0;
                result.push({
                    ...workTrack,
                    progress: percentCompleted,
                    total: totalQuantity,
                });
            } catch (error) {
                return error;
            }
        });
        return { quantity: 0, workTrackLogs: result };
    } catch (error) {
        return error;
    }
};

module.exports = {
    getWorkTrackByDepartment,
    getWorkTrackByStatus,
    getAllResource,
    getResourceById,
    getAllResourceByUserId,
    findWorkTrackByKpiNormAndUser,
    createResource,
    updateResourceById,
    updateStatusWorktrack,
    deleteResourceById,
    createWorkTrackUser,
    findUser,
    deleteWorkTrackUser,
    getWorkTrackByAdmin,
    getWorkTrackByManager,
    updateParentId,
    // report
    reportWorktrackUser,
    reportAllWorktrackUser,
};
