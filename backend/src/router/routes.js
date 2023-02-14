const express = require('express');
const router = express.Router();
const getData = require('../controller/getData').getData;
const updateUsersCars = require('../controller/updateUsersCars').updateUsersCars;
const updateUser = require('../controller/updateUser').updateUser;
const deleteItem = require('../controller/deleteItem').deleteItem;


router.get('/getData', getData);
router.post('/updateUsersCars', updateUsersCars);
router.post('/updateUser', updateUser);
router.delete('/deleteItem', deleteItem);


module.exports = router;