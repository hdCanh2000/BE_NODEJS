const positionService = require('./position.service');
const requirementService = require('../requirement/requirement.service');
// const kpiNormService = require('../kpiNorm/kpiNorm.service');

exports.addPosition = async (req, res) => {
    const { name, description, address, manager, position_levels_id, department_id, requirement_id } = req.body;
    try {
        const addPosition = await positionService.createPosition(name, description, address, manager, position_levels_id, department_id);

        const addRequirementForPosition = async (id) => {
            const findRequirement = await requirementService.getResourceById(id);
            await addPosition.addRequirement(findRequirement);
        };
        if (requirement_id) {
            requirement_id.forEach((element) => {
                addRequirementForPosition(element);
            });
        }
        return res.status(200).json({ message: 'Create Position Success!', data: addPosition });
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
        const detail = await positionService.getPositionById(id);
        // const findKpiByPosition = await kpiNormService.allKpiNorm({ position_id: detail.id });
        return res.status(200).json({ message: 'Get Detail Position Success!!', data: detail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};
