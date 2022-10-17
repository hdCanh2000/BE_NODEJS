const model = require('../../models/index');
const userService = require('./user.service');

exports.addUser = async (req, res) => {
    const data = req.body;
    try {
        const user = await model.users.findOne({
            where: {
                email: data.email,
            },
        });
        if (user) {
            return res.status(400).json({ message: 'Email has already existed !' });
        }
        const newUser = await userService.createUser({ ...data });
        return res.status(200).json({ message: 'Register success!', data: newUser });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const updateInfo = await userService.updateUserById(id, req.body);
        if (updateInfo) {
            const result = await userService.findUser(id);
            return res.status(200).json({ msg: 'Update Profile success!!', data: result });
          }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, newPassword2 } = req.body;
    try {
        const changePassword = await userService.changePassword(oldPassword, newPassword, newPassword2, req.user.id);
        return res.status(200).json({ msg: 'Success', data: changePassword });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getUserDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const userDetail = await userService.findUser(id);
        return res.status(200).json({ message: 'Get User Detail Success!!', data: userDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const data = await userService.findAll({ userId: req.user.id, query: req.query });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllUserByDepartmentId = async (req, res) => {
    const { department_id } = req.params;
    try {
        const getUserById = await model.users.findOne({ where: { id: req.user.id, isDelete: false } });
        if (getUserById.role === 'admin') {
            const allUser = await model.users.findAll({
                where: { department_id, isDelete: false },
                include: [
                    {
                        model: model.departments,
                    },
                    {
                        model: model.positions,
                    },
                ],
            });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
        if (getUserById.role !== 'admin') {
            const allUser = await model.users.findAll({ where: { department_id: getUserById.department_id, isDelete: false } });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        const destroyUser = await userService.deleteById(id);
        return res.status(200).json({ message: 'Delete User Success!', data: destroyUser });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};
