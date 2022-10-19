const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.createKpiNorm = async (data) => {
    try {
        const result = model.kpiNorms.create(data);
        return result;
    } catch (error) {
        return error;
    }
};

exports.updateKpiNormById = async (id, data) => {
    const update = await model.kpiNorms.update(data, {
        where: { id },
    });
    return update;
};

exports.detailKpiNorm = async (id) => {
    try {
        const detail = await model.kpiNorms.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
exports.allKpiNorm = async ({ userId, query }) => {
    const { page = 1, limit, text = '' } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    const conditions = [{
        [Op.or]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('kpiNorms.name')), 'LIKE', `%${searchValue}%`),
        ],
    }];

    try {
        const data = await model.kpiNorms.findAll({
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
                    model: model.units,
                    attributes: ['id', 'name', 'code'],
                },
                {
                    model: model.departments,
                    attributes: ['id', 'name', 'code', 'organizationLevel', 'parent_id'],
                },
                {
                    model: model.positions,
                    attributes: ['id', 'name', 'code'],
                },
            ],
        });
        return data;
    } catch (error) {
        return error;
    }
};

exports.getKpiNormByDepartment = async (id) => {
    try {
        const data = await model.kpiNorms.findAll({
            where: { department_id: id },
            include: [model.units, model.departments, model.positions],
        });
        return data;
    } catch (error) {
        return error;
    }
};

exports.deleteById = async (id) => {
    const resource = await model.kpiNorms.findOne({
        where: { id },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};

// exports.getWorkTrackByKpiNorm = async (id) => {
//     try {
//         const getWorkTrackByKpiNorm = await model.workTracks.findAll({ where: { kpiNorm_id: id } });
//         return getWorkTrackByKpiNorm;
//     } catch (error) {
//         return error;
//     }
// };

// exports.updateWorkTrack = async (id) => {
//     try {
//         const updateWorkTrack = await model.workTracks.update(
//             { kpiNorm_id: null },
//             { where: { id } },
//         );
//         return updateWorkTrack;
//     } catch (error) {
//         return error;
//     }
// };
