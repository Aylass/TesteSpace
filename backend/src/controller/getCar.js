const getCarModel = require('../model/getUsers.js');

exports.getCar = async (req, res) => {
    //let id = req.params.id;

    const cars = await getCarModel.users();
    console.log(cars);
    
    res.json(cars)
};