const insertCar = require('../model/insertCar.js');
const updateUser = require('../model/updateUser.js');

exports.updateUsersCars = async (req, res) => {

    let user, car; 
    async function fetchAsync() {
        // await response of fetch call
        console.log("entro")
        car = await insertCar.car(req.body.newCar);
        return car;
    }
    // trigger async function
    fetchAsync()
        // log response or catch error of fetch promise
        .then(
            async (car) =>{ 
            user = await updateUser.user(req.body);
            }
        )
        .catch((reason) => console.log("Message:" + reason.message));
    const response = {
        car, user
    }

    res.json(response);
};

