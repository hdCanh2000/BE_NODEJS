const model = require('../../models/index');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const authService = require('./authService');
dotenv.config();

exports.signup = async (req, res) => {
    const user = model.userModel.create({
        email: "Steven.tran@tbht.vn",
        password: "123456",
        role: "admin",
    });
    await user.save();
    console.log(user);
    return res.send(user);
};

exports.login = async (req, res) => {
    try {
        const user = await model.userModel.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user){
            return res.status(400).json({ message: "The email does not exist or has been locked !!!" });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match){ 
            return res.status(400).json({ message: "Wrong Password",data :{} });
        }
        const { accessToken, refreshToken } = await authService.signToken(user);
        const newToken = await model.tokenModel.create({data_token: refreshToken, user_id: user.user_id});
        return res.status(200).json({ message: "Success!", data: [accessToken, refreshToken]});
    } catch (error) {
        res.status(404).json({ message: "Error!" });
        console.log(error);
    }
};

exports.logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const data = await authService.destroyToken(refreshToken);
        return res.status(200).json({ message: "Success!", data});
    } catch (error) {
        res.status(404).json({ message: "Error!" });
        console.log(error);
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) return res.sendStatus(401).json({ message: "Error!" });;
        const token = await model.tokenModel.findOne({
            where: {
                data_token: refreshToken
            }
        });
        if (!token) return res.sendStatus(403).json({ message: "Token not found!" });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            console.log("--------------------------------------------", decoded)
            if (err) return res.sendStatus(403).json({ message: "Expired" });
            const accessToken = jwt.sign({ user_id: decoded.user_id, email: decoded.email, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });
            const refreshToken = jwt.sign({ user_id: decoded.user_id, email: decoded.email, role: decoded.role }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            const newToken = await model.tokenModel.update({ data_token: refreshToken }, { where: { token_id: token.token_id } });
            return res.status(200).json({ message: "Success!!", data: [accessToken, refreshToken]});
        });
    } catch (error) {
        res.status(404).json({ message: "Error!" });
        console.log(error);
    }
};
