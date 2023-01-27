const getUsersModel = require('../model/getUsers.js');

exports.getData = async (req, res) => {
    //let id = req.params.id;

    const user = await getUsersModel.users();
    console.log(user);
    
    res.json(user)
};