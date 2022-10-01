const kpiNormService = require('./kpiNorm.service');
const model = require('../../models/index');

exports.addKpiNorm = async (req, res) => {
    const { name, description, manday, hr, unit_id, department_id, position_id } = req.body;
    try {
        const kpiNorm = await kpiNormService.createKpiNorm(name, description, manday, hr, unit_id, department_id);
        const positionKpi = await model.kpiNormPosition.create({ kpiNorm_id: kpiNorm.id, positions_id: position_id });
        return res.status(200).json({ message: 'Create KpiNorm Success!', data: [kpiNorm, positionKpi] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.updateKpiNorm = async (req, res) => {
    const { name, description, manday, hr, unit_id, department_id } = req.body;
    const { id } = req.params;
    try {
        const updateItem = await kpiNormService.updateKpiNormById(id, name, description, manday, hr, unit_id, department_id);
        return res.status(200).json({ message: 'Update KpiNorm Success!!', data: [updateItem] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.getAllKpiNorm = async (req, res) => {
    try {
        const data = await kpiNormService.allKpiNorm();
        return res.status(200).json({ message: 'Get All KpiNorm Success!', data: [data] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.getKpiNormDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const kpiNormDetail = await kpiNormService.detailKpiNorm(id);
        return res.status(200).json({ message: 'Get Detail KpiNorm Success!!', data: [kpiNormDetail] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};
