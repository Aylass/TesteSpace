const getUsersModel = require('../model/getUsers.js');
const getCarModel = require('../model/getCar.js');
const getJobModel = require('../model/getJob.js');
const getAccessModel = require('../model/getAccess.js');

exports.getData = async (req, res) => {
    //let id = req.params.id;

    const user = await getUsersModel.users();
    const car = await getCarModel.car();
    const job = await getJobModel.job();
    const access = await getAccessModel.access();

    const response = {
        user, car, job, access
    }
    
    res.json(response)
};