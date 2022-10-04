const worktrackKpiNormService = require('./worktrackKpiNorm.service');
const ApiError = require('../../utils/ApiError');

const getAll = async (req, res) => {
    try {
        const worktracks = await worktrackKpiNormService.getAllResource();
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackKpiNormService.getResourceById(id);
        if (!worktrack) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error });
    }
};

const getAllByWorktrackId = async (req, res) => {
    const { worktrack_id } = req.params;
    try {
        const worktracks = await worktrackKpiNormService.getAllResourceByWorktrackId(worktrack_id);
        if (!worktracks) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error });
    }
};

const create = async (req, res) => {
    try {
        const worktrack = await worktrackKpiNormService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackKpiNormService.updateResourceById(id, req.body);
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackKpiNormService.deleteResourceById(id);
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

module.exports = { getAll, getById, getAllByWorktrackId, create, updateById, deleteById };
