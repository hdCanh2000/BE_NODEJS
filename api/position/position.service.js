const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');

exports.createPosition = async (data) => {
    try {
        const create = await model.positions.create(data);
        return create;
    } catch (error) {
        return error;
    }
};

exports.updateById = async (id, data) => {
    const update = await model.positions.update(data, {
        where: { id },
    });
    return update;
};

exports.allPosition = async (query) => {
    const { page = 1, limit, text = '' } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    else searchValue = '';

    const conditions = [{
        [Op.or]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('positions.name')), 'LIKE', `%${searchValue}%`),
            sequelize.where(sequelize.fn('LOWER', sequelize.col('positions.code')), 'LIKE', `%${searchValue}%`),
        ],
    }];

    try {
        const total = await model.positions.count();
        const data = await model.positions.findAll({
            offset: (page - 1) * limit || 0,
            limit,
            order: [
                ['id', 'ASC'],
            ],
            where: {
                [Op.and]: conditions,
            },
            include: [
                {
                    model: model.positionLevels,
                    attributes: ['id', 'name', 'code'],
                },
                {
                    model: model.departments,
                    attributes: ['id', 'name', 'code', 'parent_id', 'organizationLevel'],
                },
                {
                    model: model.requirements,
                    attributes: ['id', 'name'],
                },
            ],
        });
        return { message: 'Get All Position Success!', data, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.length, total } };
    } catch (error) {
        return error;
    }
};

exports.getPositionById = async (id) => {
    try {
        const detail = await model.positions.findOne({
            where: { id },
            include: [
                {
                    model: model.requirements,
                },
                {
                    model: model.kpiNorms,
                },
            ],
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.getPositionRequirement = async (id) => {
    try {
        const detail = await model.positionRequirements.findAll({
            where: { positionId: id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.deletePositionRequirement = async (id) => {
    try {
        const deletePR = await model.positionRequirements.destroy({ where: { positionId: id } });
        return deletePR;
    } catch (error) {
        return error;
    }
};

exports.deletePosition = async (id) => {
    try {
        const deleteP = await model.positions.destroy({ where: { id } });
        return deleteP;
    } catch (error) {
        return error;
    }
};
