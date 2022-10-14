const ApiError = require('../../utils/ApiError');
const requirementService = require('./requirement.service');

const getAll = async (req, res) => {
    try {
        const requirements = await requirementService.getAllResource();
        return res.status(200).json({ message: 'Success!', data: requirements });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.getResourceById(id);
        if (!requirement) {
            throw new ApiError(400, 'Requirement not found');
        }
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

const create = async (req, res) => {
    try {
        const requirement = await requirementService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.updateResourceById(id, req.body);
        if (requirement) {
            const result = await requirementService.getResourceById(id);
            return res.status(200).json({ message: 'Success!', data: result });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const findRequirement = await requirementService.getResourceById(id);
        if (!findRequirement) {
            throw new ApiError(404, 'Requirement not found');
        }
        await requirementService.deleteRequirementWithPosition(findRequirement.id);
        const requirement = await requirementService.deleteResourceById(findRequirement.id);
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };
