const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

const getAllResource = async (page, limit, text) => {
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    else searchValue = '';

    const total = await model.keys.count({
        where: {
            [Op.or]: [
                sequelize.where(sequelize.fn('LOWER', sequelize.col('keys.name')), 'LIKE', `%${searchValue}%`),
            ],
        },
    });

    const data = await model.keys.findAndCountAll({
        offset: (page - 1) * limit || 0,
        limit,
        order: [
            ['id', 'DESC'],
        ],
        where: {
            [Op.or]: [
                sequelize.where(sequelize.fn('LOWER', sequelize.col('keys.name')), 'LIKE', `%${searchValue}%`),
            ],
        },
        include: [
            {
                model: model.units,
                attributes: ['id', 'name', 'code'],
            },
        ],
    });
    return { data: data.rows, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.rows.length, total } };
};

const getResourceById = async (id) => {
    const data = await model.keys.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const existedEntity = await model.keys.findOne({
        where:
        {
            name: data.name,
        },
    });
    if (existedEntity) {
        return {
            message: 'Tên chỉ số key đã tồn tại!',
            existed: true,
        };
    }
    const result = model.keys.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await model.keys.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await model.keys.findOne({
        where:
        {
            id,
        },
    });
    if (!resource) {
        throw new ApiError(404, 'Không tìm thấy chỉ số key!');
    }
    await resource.destroy();
    return resource;
};

module.exports = { getAllResource, getResourceById, createResource, updateResourceById, deleteResourceById };
