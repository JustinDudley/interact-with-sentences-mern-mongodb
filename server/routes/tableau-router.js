const express = require('express')

const TableauCtrl = require('../controllers/tableau-ctrl')

const router = express.Router()

router.post('/tableau', TableauCtrl.createTableau)
router.get('/tableau/:id', TableauCtrl.getTableauById)

module.exports = router