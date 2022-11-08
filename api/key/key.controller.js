const ApiError = require('../../utils/ApiError');
const keyService = require('./key.service');

const getAll = async (req, res) => {
    const { page, limit, text } = req.query;
    try {
        const keys = await keyService.getAllResource(page, limit, text);
        return res.status(200).json(keys);
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const key = await keyService.getResourceById(id);
        if (!key) {
            throw new ApiError(404, 'Key not found!');
        }
        return res.status(200).json({ message: 'Success!', data: key });
    } catch (error) {
        return res.status(404).json({ message: 'Key not found!', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const key = await keyService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: key });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const key = await keyService.updateResourceById(id, req.body);
        if (key) {
            const result = await keyService.getResourceById(id);
            return res.status(200).json({ message: 'Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const key = await keyService.deleteResourceById(id);
        return res.status(200).json({ message: 'Success!', data: key });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };
