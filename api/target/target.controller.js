const ApiError = require('../../utils/ApiError');
const targetService = require("./target.service");

exports.getTarget = async (req, res) => {
  try {
    const targets = await targetService.searchTargets(req.query);
    res.send(targets);
  } catch (err) {
    res.status(500).send(err);
  }
};
