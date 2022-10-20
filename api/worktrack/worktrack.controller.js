const worktrackService = require('./worktrack.service');
const ApiError = require('../../utils/ApiError');

const getAll = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const workTracks = await worktrackService.getWorkTrackByAdmin(req.user.id);
            return res.status(200).json({ message: 'Success!', data: workTracks });
        }
        if (req.user.role === 'manager') {
            const workTracks = await worktrackService.getWorkTrackByManager(req.user.id);
            return res.status(200).json({ message: 'Success!', data: workTracks });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.getResourceById(id);
        if (!worktrack) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error });
    }
};

const getWorkTrackOfMe = async (req, res) => {
    try {
        const getWorkTrackMe = await worktrackService.getAllResourceByUserId(req.user.id);
        if (!getWorkTrackMe) {
            throw new ApiError(404, 'Not Found');
        }
        const check = getWorkTrackMe.dataValues?.workTracks;
        for (let i = 0; i < check.length; i++) {
            const checkResponsible = check[i].dataValues?.workTrackUsers?.dataValues?.isResponsible;
            if (!(checkResponsible === true)) {
                check.splice(i, 1);
            }
        }
        return res.status(200).json({ message: 'Success!', data: getWorkTrackMe });
    } catch (error) {
        return error;
    }
};

const getAllByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const worktracks = await worktrackService.getAllResourceByUserId(user_id);
        if (!worktracks) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error: error.message });
    }
};

const addKpiNormForUser = async (req, res) => {
    try {
        const workTrack = await worktrackService.createResource(req.body);
        const findUser = await worktrackService.findUser(req.body.user_id);
        const userCreate = await worktrackService.findUser(req.user.id);
        if (findUser) {
            const addUser = await workTrack.addUser(findUser, { through: { isResponsible: true } });
            const addUserCreate = await workTrack.addUser(userCreate, { through: { isCreated: true } });
            if (!addUser || !addUserCreate) {
                throw new ApiError(400, 'Bad Request');
            }
        }
        return res.status(200).json({ message: 'Create Success!', data: workTrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const updateWorkTrackById = async (req, res) => {
    const { id } = req.params;
    try {
        const getWorkTrackById = await worktrackService.getResourceById(id);
        await worktrackService.updateResourceById(id, req.body);
        const findUser = await worktrackService.findUser(req.body.user_id);
        if (findUser) {
            await worktrackService.deleteWorkTrackUser(getWorkTrackById.users[0]?.id, id);
            await getWorkTrackById.addUser(findUser, { through: { isResponsible: true } });
        }
        const newWorkTrack = await worktrackService.getResourceById(id);
        return res.status(200).json({ message: 'Update Success!', data: newWorkTrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.deleteResourceById(id);
        return res.status(200).json({ message: 'Delete Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const getWorkTrackByStatus = async (req, res) => {
    const { status } = req.body;
    try {
        if (req.user.role === 'admin') {
            const workTrack = await worktrackService.getWorkTrackByStatus(status);
            return res.status(200).json({ message: 'Delete Success!', data: workTrack });
        }

        if (req.user.role === 'manager') {
            const workTrack = await worktrackService.getWorkTrackByStatus(status, req.user.id);
            return res.status(200).json({ message: 'Delete Success!', data: workTrack });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

module.exports = { getWorkTrackByStatus, getAll, getById, getAllByUserId, addKpiNormForUser, updateWorkTrackById, deleteById, getWorkTrackOfMe };
