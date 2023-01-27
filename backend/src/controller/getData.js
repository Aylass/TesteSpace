const getUsersModel = require('../model/getUsers.js');
const getCarModel = require('../model/getCar.js');
const getJobModel = require('../model/getJob.js');

exports.getData = async (req, res) => {
    //let id = req.params.id;

    const user = await getUsersModel.users();
    const car = await getCarModel.car();
    const job = await getJobModel.job();

    const response = {
        user, car, job
    }
    
    res.json(response)
};