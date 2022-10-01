const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const model = require('../../models/index');
const authService = require('./auth.service');

dotenv.config();

exports.signup = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash('123456', salt);
  const user = await model.userModel.create({
    email: 'Steven.tran@tbht.vn',
    password: hashPassword,
    role: 'admin',
  });
  return res.send(user);
};

exports.login = async (req, res) => {
  try {
    const user = await model.userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: 'The email does not exist or has been locked !!!' });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Wrong Password', data: {} });
    }
    const { accessToken, refreshToken } = await authService.signToken(user);
    await model.tokenModel.create({ data_token: refreshToken, user_id: user.id });
    return res.status(200).json({ message: 'Success!', data: [accessToken, refreshToken] });
  } catch (error) {
    return res.status(404).json({ message: 'Error!' });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const data = await authService.destroyToken(refreshToken);
    return res.status(200).json({ message: 'Success!', data });
  } catch (error) {
    return res.status(404).json({ message: 'Error!' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) return res.sendStatus(401).json({ message: 'Error!' });
    const token = await model.tokenModel.findOne({
      where: {
        data_token: refreshToken,
      },
    });
    if (!token) return res.sendStatus(403).json({ message: 'Token not found!' });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      // eslint-disable-next-line no-console
      console.log('--------------------------------------------', decoded);
      if (err) return res.sendStatus(403).json({ message: 'Expired' });
      const accessToken = jwt.sign({ user_id: decoded.user_id, email: decoded.email, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
      });
      const reFreshToken = jwt.sign({ user_id: decoded.user_id, email: decoded.email, role: decoded.role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
      });
      await model.tokenModel.update({ data_token: refreshToken }, { where: { token_id: token.id } });
      return res.status(200).json({ message: 'Success!!', data: [accessToken, reFreshToken] });
    });
  } catch (error) {
    return res.status(404).json({ message: 'Error!' });
  }
};
