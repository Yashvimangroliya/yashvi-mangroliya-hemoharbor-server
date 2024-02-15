const express = require('express')
const { dataController } = require('../controllers/dataControllers')

const router = express.Router()

router.get('/', dataController)

module.exports = router;