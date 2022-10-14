const departmentService = require('./department.service');
const ApiError = require('../../utils/ApiError');

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
    const result = await departmentService.allDepartment(req.query);
    return res.status(200).json(result);
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

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const updateUserByDepartmentId = async (department_id) => {
      await departmentService.updateUser(department_id);
    };
    const updateKpiNormByDepartmentId = async (department_id) => {
      await departmentService.updateKpiNorm(department_id);
    };
    const updatePositionByDepartmentId = async (department_id) => {
      await departmentService.updatePosition(department_id);
    };
    const getUser = await departmentService.getUserByDepartmentId(id);
    const getKpiNorm = await departmentService.getKpiNormByDepartmentId(id);
    const getPosition = await departmentService.getPositionByDepartmentId(id);
    if (!getUser || !getKpiNorm || !getPosition) {
      throw new ApiError(404, 'Not Found');
    }
    getUser.forEach((e) => {
      updateUserByDepartmentId(e.id);
    });
    getKpiNorm.forEach((e) => {
      updateKpiNormByDepartmentId(e.id);
    });
    getPosition.forEach((e) => {
    updatePositionByDepartmentId(e.id);
    });
    await departmentService.deleteMissionDepartment(id);
    const deleteDepartment = await departmentService.deleteDepartment(id);
    return res.status(200).json({ msg: 'Delete Unit Success!', data: deleteDepartment });
  } catch (error) {
    return res.status(404).json({ message: 'Error!', error });
  }
};
