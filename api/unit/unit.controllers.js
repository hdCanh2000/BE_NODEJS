const unitService = require('./unit.service');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.addUnit = async (req, res) => {
    try {
        const addUnit = await unitService.createUnit(req.body);
        return res.status(200).json({ msg: 'Create Unit Success!', data: addUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

exports.updateUnit = async (req, res) => {
    const { id } = req.params;
    try {
        const updateUnit = await unitService.updateUnitById(id, req.body);
        if (updateUnit) {
            const result = await unitService.getUnitById(id);
            return res.status(200).json({ message: 'Success!', data: result });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

exports.deleteUnit = async (req, res) => {
    const { id } = req.params;
    try {
        const updateMissionById = async (mission_id) => {
            await unitService.updateMission(mission_id);
        };
        const findMission = await unitService.findMissionByUnitId(id);
        findMission.forEach((e) => {
            updateMissionById(e.id);
        });
        const updateKpiNormById = async (mission_id) => {
            await unitService.updateKpiNorm(mission_id);
        };
        const findKpiNorm = await unitService.findKpiNormByUnitId(id);
        findKpiNorm.forEach((e) => {
            updateKpiNormById(e.id);
        });
        if (!findMission || !findKpiNorm) {
            throw new ApiError(404, 'Not Found');
        }
            const deleteUnit = await unitService.deleteUnitById(id);
            return res.status(200).json({ msg: 'Delete Unit Success!', data: deleteUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

exports.getAllUnit = async (req, res) => {
    try {
        const getUnit = await model.units.findAll({});
        return res.status(200).json({ msg: 'Success', data: getUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};
