const express = require('express');
const router = express.Router();
const getData = require('../controller/getData').getData;

router.get('/getData', getData);


module.exports = router;