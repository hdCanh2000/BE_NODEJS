const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

const getAllResource = async () => {
    const data = await model.requirements.findAll({});
    return data;
};

const getResourceById = async (id) => {
    const data = await model.requirements.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const result = model.requirements.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await model.requirements.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await model.requirements.findOne({
        where:
        {
            id,
        },
    });
    if (!resource) {
        throw new ApiError(404, 'Position Level not found');
    }
    await resource.destroy();
    return resource;
};

module.exports = { getAllResource, getResourceById, createResource, updateResourceById, deleteResourceById };
