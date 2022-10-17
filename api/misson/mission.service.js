const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');

exports.addMission = async (name, unit_id, description, quantity, kpiValue, startTime, endTime, manday) => {
    try {
        const addMission = await model.missions.create({ name, unit_id, description, quantity, kpiValue, startTime, endTime, manday });
        return addMission;
    } catch (error) {
        return error;
    }
};

exports.getAllMission = async (query) => {
    const { page = 1, limit, text = '' } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    const conditions = [{
        [Op.or]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${searchValue}%`),
        ],
    }];

    try {
        const total = await model.missions.count();
        const data = await model.missions.findAll({
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
                    model: model.departments,
                },
                {
                    model: model.units,
                    attributes: ['id', 'name', 'code'],
                },
            ],
         });
         return { data, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.length, total } };
    } catch (error) {
        return error;
    }
};

exports.updateMission = async (id, name, unit_id, description, quantity, kpiValue, startTime, endTime, manday) => {
    const updateMission = await model.missions.update(
        { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday },
        {
            where: {
                id,
            },
        },
    );
    return updateMission;
};

exports.getMissionById = async (id) => {
    try {
        const getMissionById = await model.missions.findOne(
            {
                where: { id },
                include: [
                    {
                        model: model.departments,
                    },
                    {
                        model: model.units,
                        attributes: ['id', 'name', 'code'],
                    },
                ],
            },
        );
        return getMissionById;
    } catch (error) {
        return error;
    }
};

exports.getMissionDetail = async (id) => {
    try {
        const getMissionDetail = await model.missions.findOne({
            where: { id },
            include: [
                {
                    model: model.departments,
                },
                {
                    model: model.units,
                    attributes: ['id', 'name', 'code'],
                },
            ],
        });
        return getMissionDetail;
    } catch (error) {
        return error;
    }
};

exports.getDepartmentById = async (id) => {
    try {
        const detail = await model.departments.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.getDepartmentMissionById = async (id, isResponsible) => {
    try {
        const getMissionById = await model.missionDepartments.findOne({
            where: { missionId: id, isResponsible },
        });
        return getMissionById;
    } catch (error) {
        return error;
    }
};

// exports.getDepartmentMission = async (id) => {
//     try {
//         const getMissionById = await model.missionDepartments.findOne({
//             where: { missionId: id },
//         });
//         console.log(getMissionById);
//         return getMissionById;
//     } catch (error) {
//         return error;
//     }
// };

exports.deleteDepartmentMission = async (id) => {
    try {
        const deleteMission = await model.missionDepartments.destroy({ where: { missionId: id } });
        return deleteMission;
    } catch (error) {
        return error;
    }
};

exports.deleteDepartmentMissionWithResponsible = async (id, isResponsible) => {
    try {
        const deleteMission = await model.missionDepartments.destroy({ where: { missionId: id, isResponsible } });
        return deleteMission;
    } catch (error) {
        return error;
    }
};

exports.deleteMission = async (id) => {
    try {
        const getMissionById = await model.missions.findOne(
            {
                where: { id },
            },
        );
        const deleteMissionById = await model.missions.destroy({ where: { id: getMissionById.id } });
        return deleteMissionById;
    } catch (error) {
        return error;
    }
};

// exports.deleteMultiDepartmentMission = async (id) => {
//     try {
//         const deleteMultiDepartmentMission = await model.missionDepartments.destroy({ where: { id } });
//         return deleteMultiDepartmentMission;
//     } catch (error) {
//         return error;
//     }
// };
