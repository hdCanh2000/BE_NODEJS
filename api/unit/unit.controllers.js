const unitService = require('./unit.service');
const model = require('../../models/index');

exports.addUnit = async (req, res) => {
    const { name, code } = req.body;
    try {
        const addUnit = await unitService.createUnit(name, code);
        return res.status(200).json({ msg: 'Create Unit Success!', data: addUnit });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.updateUnit = async (req, res) => {
    const { id, code, name } = req.body;
    try {
        const updateUnit = await unitService.updateUnitById(id, name, code);
        return res.status(200).json({ msg: 'Update Unit Success!', data: updateUnit });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.deleteUnit = async (req, res) => {
    const { id } = req.body;
    try {
        const deleteUnit = await unitService.deleteUnitById(id);
        return res.status(200).json({ msg: 'Delete Unit Success!', data: deleteUnit });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.getAllUnit = async (req, res) => {
    try {
        const getUnit = await model.unitModel.findAll({});
        return res.status(200).json({ msg: 'Success', data: getUnit });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};
