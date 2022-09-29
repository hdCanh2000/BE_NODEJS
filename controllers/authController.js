const User = require("../models/userModel");
const model = require('../models/index');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { authService } = require('../services/index');
dotenv.config();

exports.Signup = async (req, res) => {
    const user = User({
      username: "Steven.tran@tbht.vn",
      password: "123456",
      role: "admin",
    });
    await user.save();
    console.log(user);
    return res.send(user);
};

exports.Register = async (req, res) => {
    const { email, password, confPassword } = req.body;
    try {
        const usr = await model.userModel.findOne({
            where: {
                email: email
            }
        });
        if (usr) {
            return res.status(400).json({ message: "Email has already existed !" });
        } else if (password !== confPassword) {
            return res.status(400).json({ message: "Confirm Password Error!" });
        } else {
            const newUser = await authService.createUser(email, password);
            res.status(200).json({ message: "Register success!", data:[newUser] });
        };
    } catch (error) {
        console.log(error);
    };
};

exports.Login = async (req, res) => {
    try {
        const user = await model.userModel.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user){
            return res.status(400).json({ message: "The email does not exist or has been locked !!!" });
        }
        if (user.isEmailVerified === false){
            return res.status(401).json({message:'Your Email has not been verified. Please click on resend'});
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

exports.Logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const result = await authService.destroyToken(refreshToken);
        return res.status(200).json({ msg: "Success!", result});
    } catch (error) {
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
