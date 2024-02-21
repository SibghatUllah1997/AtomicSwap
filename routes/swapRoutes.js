const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');

router.post('/', swapController.processSwap);

module.exports = router;
