const model = require('../../models/index');
const keysServices = require('./keys.service');

const getAllReportByDepartmentId = async(req, res) => {
    try {
        const user1 = req.user;
        const result = await keysServices.getAllKeyReportsByDepartmentId(req.user.id);
        res.status(200).json({message: 'Successfully!', result});
    } catch (error) {
        console.log('err', error);
        res.status(404).json({message: 'ERROR!', error});
    }
};

module.exports = {
    getAllReportByDepartmentId
}