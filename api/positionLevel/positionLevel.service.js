const positionLevelModel = require('../../models/positionLevel.model');
const ApiError = require('../../utils/ApiError');

const getAllResource = async () => {
    const data = await positionLevelModel.findAll({});
    return data;
};

const getResourceById = async (id) => {
    const data = await positionLevelModel.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const existedEntity = await positionLevelModel.findOne({
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
    const result = positionLevelModel.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await positionLevelModel.update(data, {
    }, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await positionLevelModel.findOne({
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
