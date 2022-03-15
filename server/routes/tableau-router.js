const express = require('express')

const TableauCtrl = require('../controllers/tableau-ctrl')

const router = express.Router()

// define routes, to be used by postman or other apps
router.post('/tableau', TableauCtrl.createTableau)
router.get('/tableau/:id', TableauCtrl.getTableauById)

module.exports = router