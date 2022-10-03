const express = require('express');
const requirementController = require('./requirement.controller');

const router = express.Router();

router.get('/', requirementController.getAll);
router.get('/:id', requirementController.getById);
router.post('/', requirementController.create);
router.put('/:id', requirementController.updateById);
router.delete('/:id', requirementController.deleteById);

module.exports = router;
