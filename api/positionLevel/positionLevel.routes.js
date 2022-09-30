const express = require('express');
const positionLevelController = require('./positionLevel.controller');

const router = express.Router();

router.get('/', positionLevelController.getAll);
router.get('/:id', positionLevelController.getById);
router.post('/', positionLevelController.create);
router.put('/:id', positionLevelController.updateById);
router.delete('/:id', positionLevelController.deleteById);

module.exports = router;
