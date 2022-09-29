const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");
const ScoreBoard = require("../models/scoreModel");
const User = require("../models/userModel");
const UserToken = require("../models/userToken_Model");
const { Sequelize } = require('sequelize');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { submit, getScoreById, updateUserById } = require("../service/userService");

exports.getRandomQuestions = async (req, res) => {
    try {
        const listOfQuestion = await Question.findAll({
            order: Sequelize.literal('random()')
            ,
            limit: 10,
            include: [
                {
                    model: CorrectAnswer,
                    attributes: ["question_id", "content"]
                },
                {
                    model: InCorrectAnswer,
                    attributes: ["question_id", "content"]
                },
            ]
        })
        return res.status(200).json({ msg: "Submit Question Success", listOfQuestion });
    } catch (error) {
        console.log(error);
    }
};

exports.submitQuestion = async (req, res) => {
    const { answers } = req.body;
    const correct = [];
    const { id } = req.params;
    try {
        const correctAnswer = await CorrectAnswer.findAll({
            attributes: ["question_id", "content"]
        });
        correctAnswer.filter((item) => {
            correct.push(item.dataValues);
        });

        const checkResult = correct.filter((a) =>
            answers.some((b) => {
                return a.question_id === b.question_id && a.content === b.content;
            }
            ));
        const totalScore = checkResult.length * 10;
        const result = await submit(id, totalScore);

        return res.status(200).json({ msg: "Submit Question Success", result, totalScore });
    } catch (error) {
        console.log(error);
    }
};

exports.getScoreBoard = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getScoreById(id);
        return res.status(200).json({ msg: "Get Score Success", result });
    } catch (error) {
        console.log(error);
    }
};

exports.updateProfile = async (req, res) => {
    const { email, fullname, phone } = req.body;
    const { id } = req.params;
    try {
        const updateInfo = await updateUserById(id, email, fullname, phone);
        return res.status(200).json({ msg: "Update Profile success!!", updateInfo });
    } catch (error) {
        console.log(error);
    }
};


