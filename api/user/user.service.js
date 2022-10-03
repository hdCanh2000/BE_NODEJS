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

exports.updateUserById = async (email, name, address, phone, dateOfBirth, dateOfJoin, position, department_id, id) => {
    try {
        const updateUser = await model.userModel.update({
            email,
            name,
            phone,
            address,
            dateOfBirth,
            dateOfJoin,
            position,
            department_id,
        }, { where: { id } });
        return updateUser;
    } catch (error) {
        return error;
    }
};

// exports.changePassword = async (oldPassword, newPassword, newPassword2, id) => {
//     try {
//         const changePassword = bcrypt.compare(oldPassword, user.password, async (same) => {
//             if (same) {
//               if (user === newPassword) {
//                 console.log('Same old password');
//               } else if (newPassword.length < 4) {
//                 console.log('Password must be at least 4 characters !!!');
//               } else if (newPassword !== newPassword2) {
//                 console.log('Confirm password wrong !');
//               } else {
//                 await model.userModel.update({ password: newPassword }, { where: { id } });
//                 console.log('Change Password Success !');
//               }
//             } else {
//                 console.log('Wrong Current Password !');
//             }
//           });
//         return changePassword;
//     } catch (error) {
//         return (error);
//     }
// };

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
