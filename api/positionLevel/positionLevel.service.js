const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

const getAllResource = async () => {
    const data = await model.positionLevels.findAll({});
    return data;
};

const getResourceById = async (id) => {
    const data = await model.positionLevels.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const existedEntity = await model.positionLevels.findOne({
        where:
        {
            code: data.code,
        },
    });
    if (existedEntity) {
        return {
            message: 'Mã vị trí đã tồn tại trên hệ thống',
            existed: true,
        };
    }
    const result = model.positionLevels.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await model.positionLevels.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await model.positionLevels.findOne({
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
