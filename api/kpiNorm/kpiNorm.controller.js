const kpiNormService = require('./kpiNorm.service');
const ApiError = require('../../utils/ApiError');

exports.addKpiNorm = async (req, res) => {
    try {
        const kpiNorm = await kpiNormService.createKpiNorm(req.body);
        return res.status(200).json({ message: 'Create KpiNorm Success!', data: kpiNorm });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.updateKpiNorm = async (req, res) => {
    const { id } = req.params;
    try {
        const updateItem = await kpiNormService.updateKpiNormById(id, req.body);
        if (updateItem) {
            const result = await kpiNormService.detailKpiNorm(id);
            return res.status(200).json({ message: 'Update KpiNorm Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllKpiNorm = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const result = await kpiNormService.allKpiNorm(req.user.id);
            return res.status(200).json({ message: 'Get All KpiNorm Success!', data: result });
        }
        if (req.user.role === 'manager') {
            const result = await kpiNormService.getKpiNormByDepartment(req.user.department_id);
            return res.status(200).json({ message: 'Get All KpiNorm Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getKpiNormDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const kpiNormDetail = await kpiNormService.detailKpiNorm(id);
        return res.status(200).json({ message: 'Get Detail KpiNorm Success!!', data: kpiNormDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.deleteKpiNorm = async (req, res) => {
    const { id } = req.params;
    try {
        const updateWorkTrackByKpiNorm = async (kpiNorm_id) => {
            await kpiNormService.updateWorkTrack(kpiNorm_id);
        };
        const getWorkTrackByKpiNorm = await kpiNormService.getWorkTrackByKpiNorm(id);
        if (!getWorkTrackByKpiNorm) {
            throw new ApiError(404, 'Not Found');
        }
        getWorkTrackByKpiNorm.forEach((element) => {
            updateWorkTrackByKpiNorm(element.id);
        });
        const deletekpi = await kpiNormService.deleteById(id);
        return res.status(200).json({ message: 'Success!', data: deletekpi });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};
