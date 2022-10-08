const requirementModel = require('../../models/requirement.model');
const ApiError = require('../../utils/ApiError');

const getAllResource = async () => {
    const data = await requirementModel.findAll({});
    return data;
};

const getResourceById = async (id) => {
    const data = await requirementModel.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const result = requirementModel.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await requirementModel.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await requirementModel.findOne({
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
