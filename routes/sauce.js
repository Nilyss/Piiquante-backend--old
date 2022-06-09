const express = require('express');

const router = express.Router();

const Sauce = require('../models/sauce');
const sauceController = require('../controllers/sauce');
const auth = require('../middleware/auth');

router.post('/', auth, sauceController.createSauce);
router.get('/', auth, sauceController.getAllsauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.put('/:id', auth, sauceController.updateOneSauce);
router.delete('/:id', auth,  sauceController.deleteOneSauce);

module.exports = router;