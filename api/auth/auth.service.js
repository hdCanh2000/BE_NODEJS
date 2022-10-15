const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const dotenv = require('dotenv');
const model = require('../../models/index');

dotenv.config();

exports.signToken = async (user) => {
  try {
    // sign token
    const accessToken = await jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const refreshToken = await jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    console.log({ accessToken, refreshToken, user });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error)
    return error;
  }
};

exports.destroyToken = async (value) => {
  try {
    const token = await model.tokens.findOne({
      where: {
        data_token: value,
      },
    });
    if (token) {
      const result = await token.destroy({
        where: {
          [Op.or]: [{ user_id: value }, { data_token: value }],
        },
      });
      return result;
    }
  } catch (error) {
    return error;
  }
};
