const express = require('express');
const router = express.Router();
const getData = require('../controller/getData').getData;
const insertData = require('../controller/insertCar').insertCar;
const updateUser = require('../controller/updateUser').updateUser;

router.get('/getData', getData);
router.post('/insertCar', insertData);
router.post('/updateUser', updateUser);


module.exports = router;