const unitService = require('./unit.service');
const model = require('../../models/index');

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
        return res.status(200).json({ msg: 'Update Unit Success!', data: updateUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

exports.deleteUnit = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUnit = await unitService.deleteUnitById(id);
        return res.status(200).json({ msg: 'Delete Unit Success!', data: deleteUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};

exports.getAllUnit = async (req, res) => {
    try {
        const getUnit = await model.unitModel.findAll({});
        return res.status(200).json({ msg: 'Success', data: getUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error });
    }
};
