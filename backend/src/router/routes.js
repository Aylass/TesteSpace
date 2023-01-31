const express = require('express');
const router = express.Router();
const getData = require('../controller/getData').getData;
const insertData = require('../controller/insertCar').insertCar;

router.get('/getData', getData);
router.post('/insertCar', insertData);


module.exports = router;