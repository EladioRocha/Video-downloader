const express = require('express');

//Initializations
const router = express.Router();
const controller = require('../api/controllers/index')

router.get('/', controller.index);
router.post('/receiveData', controller.receiveData);
router.get('/downloadVideo/:folder/:video', controller.downloadVideo)

module.exports = router;