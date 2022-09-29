const departmentService = require('./departmentService');
const model = require('../../models/index');

exports.addDepartment = async (req, res) => {
    const { name, description, slug, address } = req.body;
    try {
        const departments = await departmentService.createDepartment(name, description, slug, address);
        return res.status(200).json({ msg: "Create Department Success!", data:[departments] })
    } catch (error) {
        console.log(error);
    }
};

exports.updateDepartment = async (req, res) => {
    const { department_id, name, description, slug, address } = req.body;
    try {
        const updateItem = await departmentService.updateDepartmentById(department_id, name, description, slug, address);
        return res.status(200).json({ message: "Update Product Success!!", data:[updateItem] });
    } catch (error) {
        res.status(404).json({ message: "Error!" });
        console.log(error);
    }
};

exports.getAllDepartment = async (req, res) => {
    try {
        const data = await model.departmentModel.findAll({
            attributes: ['name', 'description','slug','address']
        });
        return res.status(200).json({ message: "Get All Department Success!", data:[data] });
    } catch (error) {
        res.status(404).json({ message: "Error!" });
        console.log(error);
    }
};

exports.getDepartmentDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const departmentDetail = await departmentService.detailDepartment(id);
        return res.status(200).json({ message: "Get Detail Question Success!!", data: [departmentDetail] });
    } catch (error) {
        res.status(404).json({ message: "Error!" });
        console.log(error);
    }
};









