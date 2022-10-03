const ApiError = require('../../utils/ApiError');
const positionLevelService = require('./positionLevel.service');

const getAll = async (req, res) => {
    try {
        const positionLevels = await positionLevelService.getAllResource();
        return res.status(200).json({ message: 'Success!', data: positionLevels });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const positionLevel = await positionLevelService.getResourceById(id);
        if (!positionLevel) {
            throw new ApiError(404, 'Position Level not found');
        }
        return res.status(200).json({ message: 'Success!', data: positionLevel });
    } catch (error) {
        return res.status(404).json({ message: 'Position Level not found!', error });
    }
};

const create = async (req, res) => {
    try {
        const positionLevel = await positionLevelService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: positionLevel });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const positionLevel = await positionLevelService.updateResourceById(id, req.body);
        return res.status(200).json({ message: 'Success!', data: positionLevel });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const positionLevel = await positionLevelService.deleteResourceById(id);
        return res.status(200).json({ message: 'Success!', data: positionLevel });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };
