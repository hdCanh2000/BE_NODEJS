const missionService = require('./mission.service');

exports.addMission = async (req, res) => {
    const { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday, department_id } = req.body;
    try {
        const addMission = await missionService.addMission(name, unit_id, description, quantity, kpiValue, startTime, endTime, manday);
        const addDepartmentToMission = await missionService.addDepartmentMission(department_id, addMission.id);
        return res.status(200).json({ msg: 'Success!', data: [addMission, addDepartmentToMission] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};
