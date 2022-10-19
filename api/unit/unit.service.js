const model = require('../../models/index');

exports.createUnit = async (data) => {
    try {
        const createDepartment = await model.units.create(data);
        return createDepartment;
    } catch (error) {
        return error;
    }
};

exports.updateUnitById = async (id, data) => {
    try {
        const update = await model.units.update(data, {
            where: {
                id,
            },
        });
        return update;
    } catch (error) {
        return error;
    }
};

exports.getUnitById = async (id) => {
    try {
        const detail = await model.units.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.deleteUnitById = async (id) => {
    try {
        const deleteUnitById = await model.units.destroy({
            where: { id },
        });
        return deleteUnitById;
    } catch (error) {
        return error;
    }
};

// exports.findMissionByUnitId = async (id) => {
//     try {
//         const findMissionByUnitId = await model.missions.findAll({ where: { unit_id: id } });
//         return findMissionByUnitId;
//     } catch (error) {
//         return error;
//     }
// };

// exports.updateMission = async (id) => {
//     try {
//         const updateMission = await model.missions.update(
//             { unit_id: null },
//             {
//                 where: {
//                     id,
//                 },
//             },
//         );
//         return updateMission;
//     } catch (error) {
//         return error;
//     }
// };

// exports.findKpiNormByUnitId = async (id) => {
//     try {
//         const findKpiNormByUnitId = await model.kpiNorms.findAll({ where: { unit_id: id } });
//         return findKpiNormByUnitId;
//     } catch (error) {
//         return error;
//     }
// };

// exports.updateKpiNorm = async (id) => {
//     try {
//         const updateKpiNorm = await model.kpiNorms.update(
//             { unit_id: null },
//             {
//                 where: {
//                     id,
//                 },
//             },
//         );
//         return updateKpiNorm;
//     } catch (error) {
//         return error;
//     }
// };
