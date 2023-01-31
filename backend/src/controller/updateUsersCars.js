const insertCar = require('../model/insertCar.js');
const updateUser = require('../model/updateUser.js');

exports.updateUsersCars = async (req, res) => {

    const car = await insertCar.car(req.body.newCar);
    console.log("carro--------------------",req.body.newCar)
    const user = await updateUser.user(req.body);

    const response = {
        user, car
    }

    res.json(response);
};