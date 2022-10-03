const departmentService = require('./department.service');
const model = require('../../models/index');

exports.addDepartment = async (req, res) => {
  const { name, description, slug, address, parent_id } = req.body;
  try {
    const departments = await departmentService.createDepartment(name, description, slug, address, parent_id);
    return res.status(200).json({ msg: 'Create Department Success!', data: [departments] });
  } catch (error) {
    return res.status(404).json({ message: 'Error!' });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id, name, description, slug, address, parent_id } = req.body;
  try {
    const updateItem = await departmentService.updateDepartmentById(id, name, description, slug, address, parent_id);
    return res.status(200).json({ message: 'Update Department Success!!', data: [updateItem] });
  } catch (error) {
    return res.status(404).json({ message: 'Error!' });
  }
};

exports.getAllDepartment = async (req, res) => {
  try {
    const data = await model.departmentModel.findAll({
      attributes: ['name', 'description', 'slug', 'address', 'parent_id'],
    });
    return res.status(200).json({ message: 'Get All Department Success!', data: [data] });
  } catch (error) {
    return res.status(404).json({ message: 'Error!' });
  }
};

exports.getDepartmentDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const departmentDetail = await departmentService.detailDepartment(id);
    return res.status(200).json({ message: 'Get Detail Department Success!!', data: [departmentDetail] });
  } catch (error) {
    return res.status(404).json({ message: 'Error!' });
  }
};
