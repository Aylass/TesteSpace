const getUsersModel = require('../model/getUsers.js');
const getCarModel = require('../model/getCar.js');
const getJobModel = require('../model/getJob.js');
const getAccessModel = require('../model/getAccess.js');
const getAddressModel = require('../model/getAddress.js');
const getProductsModel = require('../model/getProductsBuyed');

exports.getData = async (req, res) => {

    const user = await getUsersModel.users();
    const car = await getCarModel.car();
    const job = await getJobModel.job();
    const access = await getAccessModel.access();
    const address = await getAddressModel.address();
    const products = await getProductsModel.products();

    const response = {
        user, car, job, access, address, products
    }
    
    res.json(response)
};