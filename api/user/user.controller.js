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
        return res.status(200).json({ message: 'Register success!', data: newUser });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.updateProfile = async (req, res) => {
    const { email, name, address, phone, dateOfBirth, dateOfJoin, position, department_id } = req.body;
    const { id } = req.params || req.body;
    try {
        const updateInfo = await userService.updateUserById(email, name, address, phone, dateOfBirth, dateOfJoin, position, department_id, id);
        return res.status(200).json({ msg: 'Update Profile success!!', data: updateInfo });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.getUserDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const userDetail = await userService.findUser(id);
        return res.status(200).json({ message: 'Get User Detail Success!!', data: userDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const getUserById = await model.userModel.findOne({ where: { id: req.user.id } });
        const allUser = await model.userModel.findAll({ where: { department_id: getUserById.department_id } }, {
            attributes: ['email', 'role', 'name', 'dateOfBirth', 'dateOfJoin', 'phone', 'address', 'position', 'department_id'],
        });
        return res.status(200).json({ message: 'Get All User Success!', data: allUser });
    } catch (error) {
        return res.status(404).json({ message: 'Error!' });
    }
};
