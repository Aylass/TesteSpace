const updateUser = require('../model/updateUser.js');

exports.updateUser = async (req, res) => {

    let user;

        user = await updateUser.user(req.body);
    const response = {
        user
    }

    res.json(response);
};

