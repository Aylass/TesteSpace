const express = require('express');
const router = express.Router();
const getData = require('../controller/getData').getData;
const updateUsersCars = require('../controller/updateUsersCars').updateUsersCars;

router.get('/getData', getData);
router.post('/updateUsersCars', updateUsersCars);


module.exports = router;