const updateUser = require('../model/updateUser.js');

exports.updateUser = async (req, res) => {

    const response = await updateUser.user(req.body);
    
    res.json(response);
};