const model = require('../../models/index');

exports.addMission = async (name, unit_id, description, quantity, kpiValue, startTime, endTime, manday) => {
    try {
        const addMission = await model.missionModel.create(name, unit_id, description, quantity, kpiValue, startTime, endTime, manday);
        return addMission;
    } catch (error) {
        return error;
    }
};
exports.addDepartmentMission = async (department_id, mission_id, isResponsible) => {
    try {
        const addDepartmentMission = await model.departmentMission.create(department_id, mission_id, isResponsible);
        return addDepartmentMission;
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
        const getMissionById = await model.missionModel.findOne({
            where: { id },
        });
        return getMissionById;
    } catch (error) {
        return error;
    }
};
