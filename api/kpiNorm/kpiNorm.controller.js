const kpiNormService = require('./kpiNorm.service');

exports.addKpiNorm = async (req, res) => {
    try {
        const kpiNorm = await kpiNormService.createKpiNorm(req.body);
        return res.status(200).json({ message: 'Create KpiNorm Success!', data: kpiNorm });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
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
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.getAllKpiNorm = async (req, res) => {
    try {
        const result = await kpiNormService.allKpiNorm(req.user.id);
        return res.status(200).json({ message: 'Get All KpiNorm Success!', data: result });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.getKpiNormDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const kpiNormDetail = await kpiNormService.detailKpiNorm(id);
        return res.status(200).json({ message: 'Get Detail KpiNorm Success!!', data: kpiNormDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.deleteKpiNorm = async (req, res) => {
    const { id } = req.body;
    try {
        const deletekpi = await kpiNormService.deleteById(id);
        return res.status(200).json({ message: 'Success!', data: deletekpi });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};
