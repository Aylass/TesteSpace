const express = require('express');
const router = express.Router();
const getData = require('../controller/getData').getData;
const updateUsersCars = require('../controller/updateUsersCars').updateUsersCars;
const updateUser = require('../controller/updateUser').updateUser;


router.get('/getData', getData);
router.post('/updateUsersCars', updateUsersCars);
router.post('/updateUser', updateUser);


module.exports = router;