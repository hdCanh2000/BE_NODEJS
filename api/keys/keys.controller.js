const keysServices = require('./keys.service');

const getAllReportByDepartmentId = async (req, res) => {
    try {
        const result = await keysServices.getAllKeyReportsByDepartmentId(req.user.id);
        res.status(200).json({ message: 'Successfully!', result });
    } catch (error) {
        res.status(404).json({ message: 'ERROR!', error });
    }
};

module.exports = {
    getAllReportByDepartmentId,
};
