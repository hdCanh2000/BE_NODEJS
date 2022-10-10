const departmentService = require('./department.service');

exports.addDepartment = async (req, res) => {
  try {
    const departments = await departmentService.createDepartment(req.body);
    return res.status(200).json({ msg: 'Create Department Success!', data: departments });
  } catch (error) {
    return res.status(404).json({ message: 'Error!', error });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const updateItem = await departmentService.updateDepartmentById(id, req.body);
    if (updateItem) {
      const result = await departmentService.detailDepartment(id);
      return res.status(200).json({ message: 'Update Department Success!', data: result });
    }
  } catch (error) {
    return res.status(404).json({ message: 'Error!', error });
  }
};

exports.getAllDepartment = async (req, res) => {
  try {
    const result = await departmentService.allDepartment({});
    return res.status(200).json({ message: 'Get All Department Success!', data: result });
  } catch (error) {
    return res.status(404).json({ message: 'Error!', error });
  }
};

exports.getDepartmentDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const departmentDetail = await departmentService.detailDepartment(id);
    return res.status(200).json({ message: 'Get Detail Department Success!!', data: departmentDetail });
  } catch (error) {
    return res.status(404).json({ message: 'Error!', error });
  }
};
