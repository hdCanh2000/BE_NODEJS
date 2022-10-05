const bcrypt = require('bcrypt');
const model = require('../../models/index');

exports.findUser = async (id) => {
    try {
        const findUser = await model.userModel.findOne({
            where: { id },
            include: [
                {
                    model: model.departmentModel,
                },
                {
                    model: model.positionModel,
                },
            ],
        });
        return findUser;
    } catch (error) {
        return error;
    }
};

exports.updateUserById = async (id, email, name, address, phone, role, dateOfBirth, dateOfJoin, position_id, department_id) => {
    try {
        const updateUser = await model.userModel.update({
            email,
            name,
            phone,
            role,
            address,
            dateOfBirth,
            dateOfJoin,
            position_id,
            department_id,
        }, { where: { id } });
        return updateUser;
    } catch (error) {
        return error;
    }
};

exports.changePassword = async (oldPassword, newPassword, newPassword2, id) => {
    const salt = await bcrypt.genSalt();
    const hashNewPassword = await bcrypt.hash(newPassword, salt);
    try {
        const findUser = await model.userModel.findOne({ where: { id } });
        if (findUser) {
            const changePassword = await bcrypt.compare(oldPassword, findUser.password);
            if (changePassword === true) {
                if (findUser.password === newPassword) {
                    return ('Same old password');
                } if (newPassword.length < 4) {
                    return ('Password must be at least 4 characters !!!');
                } if (newPassword !== newPassword2) {
                    return ('Confirm password wrong !');
                }
                await model.userModel.update({ password: hashNewPassword }, { where: { id } });
                return ('Change Password Success !', changePassword);
            }
            if (changePassword === false) {
                return ('Wrong Current Password !');
            }
        }
    } catch (error) {
        return (error);
    }
};

exports.createUser = async (data) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    try {
        const newUser = await model.userModel.create({
            ...data,
            password: hashPassword,
        });
        return newUser;
    } catch (error) {
        return error;
    }
};
