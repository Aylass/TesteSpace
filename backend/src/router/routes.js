const express = require('express');
const router = express.Router();
const getData = require('../controller/getData').getData;
const getCar = require('../controller/getCar').getCar;

router.get('/getData', getData);


module.exports = router;