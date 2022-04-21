const Item = require('../models/Item.js')

const createItem = (body) => {
    if (!body.name) {
        throw new Error('No name provided in the body');
    }
    const item = new Item({name: body.name});
    return item.save();
}

const listItems = () => {
    return Item.find({});
}

const deleteOneItem = (where) => {
    return Item.deleteOne(where);
};

const updateOneItem = (payload, where) => {
    return Item.updateOne(where, payload);
};

module.exports = {
    createItem: createItem,
    listItems: listItems,
    deleteOneItem,
    updateOneItem
};