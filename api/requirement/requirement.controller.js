const ApiError = require('../../utils/ApiError');
const requirementService = require('./requirement.service');

const getAll = async (req, res) => {
    try {
        const requirements = await requirementService.getAllResource();
        return res.status(200).json({ message: 'Success!', data: requirements });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.getResourceById(id);
        if (!requirement) {
            throw new ApiError(404, 'Requirement not found');
        }
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(404).json({ message: 'Requirement not found!' });
    }
};

const create = async (req, res) => {
    try {
        const requirement = await requirementService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(404).json({ message: error });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.updateResourceById(id, req.body);
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.deleteResourceById(id);
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };
