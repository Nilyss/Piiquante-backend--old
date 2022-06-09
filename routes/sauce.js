const express = require('express');

const router = express.Router();

const Sauce = require('../models/sauce');
const sauceController = require('../controllers/sauce');

router.post('/', sauceController.createSauce);
router.get('/', sauceController.getAllsauce);
router.get('/:id', sauceController.getOneSauce);
router.put('/:id', sauceController.updateOneSauce);
router.delete('/:id', sauceController.deleteOneSauce);

module.exports = router;