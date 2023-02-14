const deleteItem = require('../model/deleteItem.js');
exports.deleteItem = async (req, res) => {
    let item;

    item = await deleteItem.deleteItem(req.body);
    const response = {
        item
    }

    item.json(response);
};