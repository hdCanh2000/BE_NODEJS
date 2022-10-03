const positionService = require('./position.service');
// const model = require('../../models/index');

exports.addPosition = async (req, res) => {
    const { name, description, address, manager, position_levels_id, department_id } = req.body;
    try {
        const positions = await positionService.createPosition(name, description, address, manager, position_levels_id, department_id);
        // const requiment = await model.positionRequirement.bulkCreate([{ requirement_id: req.body.requirement_id, positions_id: positions.id }]);
        return res.status(200).json({ message: 'Create Position Success!', data: positions });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.updatePosition = async (req, res) => {
    const { name, description, address, manager, position_levels_id, department_id } = req.body;
    const { id } = req.params;
    try {
        const updateItem = await positionService.updateById(id, name, description, address, manager, position_levels_id, department_id);
        return res.status(200).json({ message: 'Update Position Success!!', data: updateItem });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.getAllPosition = async (req, res) => {
    try {
        const result = await positionService.allPosition({});
        return res.status(200).json({ message: 'Get All Position Success!', data: result });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.getPositionDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const detail = await positionService.getDetail(id);
        return res.status(200).json({ message: 'Get Detail Position Success!!', data: detail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};
