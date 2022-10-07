const model = require('../../models/index');
const userService = require('./user.service');

exports.addUser = async (req, res) => {
    const data = req.body;
    try {
        const user = await model.userModel.findOne({
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
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const updateInfo = await userService.updateUserById(id, req.body);
        return res.status(200).json({ msg: 'Update Profile success!!', data: updateInfo });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, newPassword2 } = req.body;
    try {
        const changePassword = await userService.changePassword(oldPassword, newPassword, newPassword2, req.user.id);
        return res.status(200).json({ msg: 'Success', data: changePassword });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

exports.getUserDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const userDetail = await userService.findUser(id, false);
        return res.status(200).json({ message: 'Get User Detail Success!!', data: userDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const getUserById = await model.userModel.findOne({ where: { id: req.user.id, isDelete: false } });
        if (getUserById.role === 'admin') {
            const allUser = await model.userModel.findAll({
                include: [
                    {
                        model: model.departmentModel,
                    },
                    {
                        model: model.positionModel,
                    },
                    {
                        model: model.workTrackModel,
                    },
                ],
                where: { isDelete: false },
            });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
        if (getUserById.role !== 'admin') {
            const allUser = await model.userModel.findAll({
                include: [
                    {
                        model: model.departmentModel,
                    },
                    {
                        model: model.positionModel,
                    },
                    {
                        model: model.workTrackModel,
                    },
                ],
                where: { department_id: getUserById.department_id, isDelete: false },
            });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.getAllUserByDepartmentId = async (req, res) => {
    const { department_id } = req.params;
    try {
        const getUserById = await model.userModel.findOne({ where: { id: req.user.id, isDelete: false } });
        if (getUserById.role === 'admin') {
            const allUser = await model.userModel.findAll({
                where: { department_id, isDelete: false },
                include: [
                    {
                        model: model.departmentModel,
                    },
                    {
                        model: model.positionModel,
                    },
                    {
                        model: model.workTrackModel,
                    },
                ],
            });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
        if (getUserById.role !== 'admin') {
            const allUser = await model.userModel.findAll({ where: { department_id: getUserById.department_id, isDelete: false } });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const destroyUser = await userService.deleteById(id);
        return res.status(200).json({ message: 'Delete User Success!', data: destroyUser });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};
