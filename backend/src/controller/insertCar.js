const insertCar = require('../model/insertCar.js');

exports.insertCar = async (req, res) => {

    const response = await insertCar.car(req.body);
    
    res.json(response);
};