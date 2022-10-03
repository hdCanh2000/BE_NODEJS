const bcrypt = require('bcrypt');
const model = require('../../models/index');

exports.findUser = async (id) => {
    try {
        const findUser = await model.userModel.findOne({ where: { id },
            attributes: ['email', 'role', 'name', 'dateOfBirth', 'dateOfJoin', 'phone', 'address', 'position'],
        });
        return findUser;
    } catch (error) {
        return error;
    }
};

exports.updateUserById = async (email, name, address, phone, dateOfBirth, id) => {
    try {
        const updateUser = await model.userModel.update({
            email,
            name,
            phone,
            address,
            dateOfBirth,
        }, { where: { id } });
        return updateUser;
    } catch (error) {
        return error;
    }
};

exports.createUser = async (email, password) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = await model.userModel.create({
            email,
            password: hashPassword,
        });
        return newUser;
    } catch (error) {
        return error;
    }
};
