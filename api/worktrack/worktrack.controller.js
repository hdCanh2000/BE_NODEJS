const worktrackService = require('./worktrack.service');
const ApiError = require('../../utils/ApiError');

const getAll = async (req, res) => {
    try {
        const worktracks = await worktrackService.getAllResource(req.user.id);
        return res.status(200).json({ message: 'Success!', data: worktracks });
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

const getAllByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const worktracks = await worktrackService.getAllResourceByUserId(user_id);
        if (!worktracks) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error });
    }
};

const addKpiNormForUser = async (req, res) => {
    try {
        const workTrack = await worktrackService.createResource(req.body);
        const findUser = await worktrackService.findUser(req.body.user_id);
        if (findUser) {
            await workTrack.addUser(findUser, { through: { isResponsible: true } });
        }
        return res.status(200).json({ message: 'Success!', data: workTrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.updateResourceById(id, req.body);
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const findWorkTrack = await worktrackService.getResourceById(id);
        await worktrackService.deleteWorkTrackUserWithWorkTrack(findWorkTrack.id);
        const worktrack = await worktrackService.deleteResourceById(findWorkTrack.id);
        return res.status(200).json({ message: 'Delete Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

module.exports = { getAll, getById, getAllByUserId, addKpiNormForUser, updateById, deleteById };
