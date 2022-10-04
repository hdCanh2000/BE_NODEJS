const missionService = require('./mission.service');

exports.addMission = async (req, res) => {
    const { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday, responsibleDepartment_id, relatedDepartment_id } = req.body;
    try {
        const addMission = await missionService.addMission(name, unit_id, description, quantity, kpiValue, startTime, endTime, manday);
        const findResponsibleDepartment = await missionService.getDepartmentById(responsibleDepartment_id);
        const findRelatedDepartment = await missionService.getDepartmentById(relatedDepartment_id);
        if (findResponsibleDepartment) {
            await addMission.addDepartment(findResponsibleDepartment, { through: { isResponsible: true } });
        }
        if (findRelatedDepartment) {
            await addMission.addDepartment(findRelatedDepartment, { through: { isResponsible: false } });
        }
        return res.status(200).json({ msg: 'Success!', data: addMission });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.getMission = async (req, res) => {
    try {
    const getAllMission = await missionService.getAllMission();
    return res.status(200).json({ msg: 'Success!', data: getAllMission });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.updateMission = async (req, res) => {
    const { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday, responsibleDepartment_id, relatedDepartment_id } = req.body;
    try {
        const getMissionById = await missionService.getMissionById(req.params.id);
        const updateMission = await missionService.updateMission(getMissionById.id, name, unit_id, description, quantity, kpiValue, startTime, endTime, manday);
        const findResponsibleMissionDepartment = await missionService.getDepartmentMissionById(getMissionById.id, true);
        const findResponsibleDepartment = await missionService.getDepartmentById(responsibleDepartment_id);
        if (findResponsibleMissionDepartment) {
            const deleteMissionDepartment = await missionService.deleteDepartmentMission(findResponsibleMissionDepartment.id);
            if (deleteMissionDepartment) {
                await getMissionById.addDepartment(findResponsibleDepartment, { through: { isResponsible: true } });
            }
        }
        const findRelatedMissionDepartment = await missionService.getDepartmentMissionById(getMissionById.id, false);
        const findRelatedDepartment = await missionService.getDepartmentById(relatedDepartment_id);
        if (findRelatedMissionDepartment) {
            const deleteMissionDepartment = await missionService.deleteDepartmentMission(findRelatedMissionDepartment.id);
            if (deleteMissionDepartment) {
                await getMissionById.addDepartment(findRelatedDepartment, { through: { isResponsible: false } });
            }
        }
        return res.status(200).json({ msg: 'Success!', data: updateMission });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
};
