const model = require('../models/index');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Op } = require("sequelize");
dotenv.config();


exports.signToken = async (user) => {
    try {
        // sign token
        const accessToken = jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
};

exports.destroyToken = async (value) => {
    try {
        const token = await model.tokenModel.findOne({
            where: {
                data_token: value
            }
        });
        if (token) {
            const result = await token.destroy({
                where: {
                    [Op.or]: [{ user_id: value }, { data_token: value }]
                },
            });
            return result;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.createUser = async (email, password) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = await model.userModel.create({
            email: email,
            password: hashPassword,
        });
        return newUser;
    } catch (error) {
        console.log(error);
    }
};

