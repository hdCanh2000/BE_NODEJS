const models = require('../../models/index');
var bcrypt = require("bcrypt");

exports.findUser = async (user_id) =>{
    try {
        const findUser = await models.userModel.findOne({where:{user_id: user_id}});
        return findUser;
    } catch (error) {
        console.log(error);
    }
};

exports.updateUserById = async(email, name, address, phone, dateOfBirth, user_id) =>{
    try {
        const updateUser = await models.userModel.update({
            email:email,
            name: name,
            phone: phone,
            address: address,
            dateOfBirth: dateOfBirth,
          },{where: {user_id: user_id}});
        return updateUser;
    } catch (error) {
        console.log(error);
    }
};

// exports.changePassword = async(oldPassword, newPassword, newPassword2, user_id ) =>{
//     try {
//         const user = await models.userModel.findOne({where:{user_id: user_id}});
//         const changePassword = bcrypt.compare(oldPassword, user.password, async ( same) => {
//             if (same) {
//               if (user == newPassword) {
//                 console.log("Same old password");
//               } else if (newPassword.length < 4) {
//                 console.log("Password must be at least 4 characters !!!");
//               } else if (newPassword != newPassword2) {
//                 console.log("Confirm password wrong !");
//               } else {
//                 await models.userModel.update(
//                   {password: newPassword},{where:{user_id: user_id}}
//                 );
//                 console.log("Change Password Success !");
//               }
//             } else {
//                 console.log("Wrong Current Password !");
//             }
//           });
//         return changePassword;
//     } catch (error) {
//         console.log(error)
//     }
// };

exports.createUser = async (email, password) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
      const newUser = await models.userModel.create({
          email: email,
          password: hashPassword,
      });
      return newUser;
  } catch (error) {
      console.log(error);
  }
};