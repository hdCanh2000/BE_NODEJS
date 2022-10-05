const model = require('../../models/index');

exports.addMission = async (name, unit_id, description, quantity, kpiValue, startTime, endTime, manday) => {
    try {
        const addMission = await model.missionModel.create({ name, unit_id, description, quantity, kpiValue, startTime, endTime, manday });
        return addMission;
    } catch (error) {
        return error;
    }
};

exports.getAllMission = async () => {
    try {
        const getAllMission = await model.missionModel.findAll({ include: model.departmentModel });
        return getAllMission;
    } catch (error) {
        return error;
    }
};

exports.updateMission = async (id, name, unit_id, description, quantity, kpiValue, startTime, endTime, manday) => {
    try {
        const updateMission = await model.missionModel.update(
            { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday },
            {
                where: {
                    id,
                },
            },
        );
        return updateMission;
    } catch (error) {
        return error;
    }
};

exports.getMissionById = async (id) => {
    try {
        const getMissionById = await model.missionModel.findOne(
        { include: model.departmentModel },
        {
            where: { id },
        },
        );
        return getMissionById;
    } catch (error) {
        return error;
    }
};

exports.getDepartmentById = async (id) => {
    try {
        const detail = await model.departmentModel.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.getDepartmentMissionById = async (id, isResponsible) => {
    try {
        const getMissionById = await model.departmentMission.findOne({
            where: { missionId: id, isResponsible },
        });
        return getMissionById;
    } catch (error) {
        return error;
    }
};

exports.deleteDepartmentMission = async (id) => {
    try {
        const deleteMission = await model.departmentMission.destroy({ where: { id } });
        return deleteMission;
    } catch (error) {
        return error;
    }
};
