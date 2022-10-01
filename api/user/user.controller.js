const model = require('../../models/index');
const userService = require('./user.service');

exports.addUser = async (req, res) => {
    const { email, password, confPassword } = req.body;
    try {
        const user = await model.userModel.findOne({
            where: {
                email,
            },
        });
        if (user) {
            return res.status(400).json({ message: 'Email has already existed !' });
        } if (password !== confPassword) {
            return res.status(400).json({ message: 'Confirm Password Error!' });
        }
        const newUser = await userService.createUser(email, password);
        return res.status(200).json({ message: 'Register success!', data: [newUser] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.updateProfile = async (req, res) => {
    const { email, name, address, phone, dateOfBirth } = req.body;
    const { id } = req.params;
    try {
        const updateInfo = await userService.updateUserById(email, name, address, phone, dateOfBirth, id);
        return res.status(200).json({ msg: 'Update Profile success!!', data: [updateInfo] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, newPassword2 } = req.body;
    const { id } = req.user.id;
    try {
        const changePassword = await userService.changePassword(oldPassword, newPassword, newPassword2, id);
        return res.status(200).json({ msg: 'Success', data: [changePassword] });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

exports.getUserDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const userDetail = await userService.findUser(id);
        return res.status(200).json({ message: 'Get User Detail Success!!', data: [userDetail] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const data = await model.userModel.findAll({
            attributes: ['email', 'role', 'name', 'dateOfBirth', 'dateOfJoin', 'phone', 'address', 'position'],
        });
        return res.status(200).json({ message: 'Get All User Success!', data: [data] });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};
